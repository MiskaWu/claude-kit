#!/usr/bin/env python3
"""Block `git push` from inside a git worktree, unless the repo opted in.

The user does ask for pushes in their normal checkout -- that stays allowed.
What must never happen is an agent pushing the throwaway branch it created in
a worktree onto a remote other people watch and pull: those pile up as noise,
and the user consolidates that work into a target branch and pushes it themselves.

So the gate is positional, not absolute: identify a push, then decide by where
it would run. There is deliberately no settings.json deny rule for push --
permission rules match on the command string and cannot see the working
directory, so a deny would also block the pushes the user asks for.

The opt-out: on a fork nobody pulls from, worktree branches cost nothing --
the user prunes them themselves. Such a repo is marked by a local git config key,

    claude.worktreePushRemote = <remote>

set once per clone by the user themselves: /allow-push runs the checks and then
prints the command for them to execute via the `!` prefix, instead of executing
it. That way the model never writes the very key that gates it -- the rule it
must follow is the unconditional "never write this key", with no in-context
exception it could talk itself into.

`git config` is read here rather than an autodetected "is this a fork" signal
because the real predicate is "this remote is mine alone to tidy", which no
remote URL reveals: the user's own canonical repos and their forks are both
under the same GitHub account.

The read uses --local, so only this repo's own .git/config counts. Plain --get
falls through to global and system, and one stray `git config --global
claude.worktreePushRemote origin` would then open every repo on the machine at
once -- the only bypass costing a single action rather than one per push, and
until now the only thing forbidding it was a line of prose. In a linked
worktree --local still resolves to the shared .git/config (reaching the
per-worktree file needs --worktree), so opting in works exactly as before.

The key stays untracked so it never reaches a commit, and carries an inline
comment explaining itself, so whoever finds it later knows what it does and
that deleting it restores the block.

Three narrowings apply even in an opted-in repo, because the key says "this
remote is disposable", not "anything goes":

  * the push must name its remote -- a bare `git push` follows tracking config
    and can land on an upstream the key never covered;
  * the destination ref must not be main/master -- until now that was only an
    instruction to the model, with nothing enforcing it;
  * --all/--mirror are refused, since they sweep main along with everything.

Where the push runs is followed the way the shell would move: the
sub-commands are walked in order, a `cd`/`pushd` moves the directory, a
subshell's `( ... )` puts it back, and the push's own `git -C` options apply
last. An earlier version guessed instead -- the first `-C` anywhere in the
line, else the session's cwd, plus a substring test for the worktree marker
over the whole command -- which blocked `cd <own checkout> && git push` from a
session sitting in a worktree, and let through `git -C <checkout> status &&
git push` and `cd <worktree> && git push` (2026-10-06). A `cd` whose target
cannot be read off the line (a variable, `cd -`, a substitution) leaves the
directory unknown, and an unknown directory is refused: the agent can always
restate the path literally.

Detection order is cost-driven: parsing the command is pure python and runs on
every Bash call, while the `git rev-parse` that authoritatively identifies a
linked worktree only runs once we already know the command is a push.

Recognises push forms a naive matcher misses: `git -C <dir> push`,
`sudo git push`, `bash -c "git push"`, env-prefixed invocations, compound
commands. The payload is parsed with python3, not jq: python3 ships in the
Ubuntu base image and is always present, while jq is an opt-in package
(dev-env-ansible keeps it in dev_env_packages) that a box may simply lack.
"""

import json
import os
import re
import shlex
import subprocess
import sys

# where Claude Code puts the worktrees it creates
WORKTREE_MARKER = "/.claude/worktrees/"

# repo-local key naming the one remote a worktree may push to
ALLOW_KEY = "claude.worktreePushRemote"

# never pushed from a worktree, opted in or not
PROTECTED_BRANCHES = {"main", "master"}

# git global options that consume the following token as their value
GIT_VALUE_OPTS = {"-C", "-c", "--git-dir", "--work-tree", "--namespace",
                  "--exec-path", "--config-env"}
# `git push` options that consume the following token as their value
PUSH_VALUE_OPTS = {"-o", "--push-option", "--receive-pack", "--exec", "--repo"}
# `git push` options that push many refs at once, main among them
BULK_OPTS = {"--all", "--mirror"}

WRAPPERS = {"sudo", "command", "env", "nohup", "time", "xargs"}
SHELLS = {"bash", "sh", "zsh", "dash", "ksh"}


SEPARATORS = {"&&", "||", ";", "|", "&", "\n"}


def tokenize(part):
    try:
        return shlex.split(part)
    except ValueError:
        return part.split()


PUNCT = set("();<>|&")


def explode(token):
    """Split a run of shell punctuation so parentheses stand alone.

    shlex with punctuation_chars returns `);` or `)&&` as one token, which
    would hide both the subshell's end and the separator after it.
    """
    if not token or any(ch not in PUNCT for ch in token):
        return [token]
    out, run = [], ""
    for ch in token:
        if ch in "()":
            if run:
                out.append(run)
                run = ""
            out.append(ch)
        else:
            run += ch
    if run:
        out.append(run)
    return out


def split_commands(command):
    """Split a shell command line into sub-commands, respecting quoting.

    Quote-aware so that a literal `&& git push origin main` sitting inside a
    quoted argument (a commit message, a grep pattern, a heredoc) is not
    mistaken for a real invocation. Falls back to a crude regex split when the
    line will not lex, which over-matches -- the safe direction.
    """
    try:
        lexer = shlex.shlex(command, posix=True, punctuation_chars=True)
        lexer.whitespace_split = True
        tokens = [piece for token in lexer for piece in explode(token)]
    except ValueError:
        return [tokenize(p) for p in re.split(r"&&|\|\||[;\n|]", command)]

    parts, current = [], []
    for token in tokens:
        if token in SEPARATORS:
            parts.append(current)
            current = []
        else:
            current.append(token)
    parts.append(current)
    return parts


def strip_prefix(tokens):
    """Drop wrappers and VAR=value assignments in front of the real command."""
    while tokens and (tokens[0] in WRAPPERS
                      or re.match(r"^[A-Za-z_]\w*=", tokens[0])):
        tokens = tokens[1:]
    return tokens


def change_dir(cwd, target):
    """Directory after `cd <target>` from `cwd`; None when it cannot be known.

    `target` None is a bare `cd` (home). A target that is not a directory
    leaves the shell where it was -- the cd fails, and after `;` or `||` the
    next command still runs there.
    """
    if cwd is None:
        return None
    if target is None:
        return os.path.expanduser("~")
    if target == "-":
        return None
    path = os.path.expandvars(os.path.expanduser(target))
    if "$" in path or "`" in path:
        return None
    path = os.path.normpath(os.path.join(cwd, path))
    return path if os.path.isdir(path) else cwd


def parse_push(tokens, cwd):
    """If `tokens` invokes `git push`, describe it; else return None.

    The description is {"repo": str, "refspecs": [str], "bulk": bool,
    "directory": str | None}, where repo is "" when the command named no
    remote (git would fall back to the branch's upstream) and directory is
    where git runs: `cwd` moved by the push's own `-C` options, each relative
    to the one before it, as git applies them.
    """
    tokens = strip_prefix(tokens)
    if not tokens:
        return None

    argv0 = argv0_name(tokens[0])
    if argv0 in SHELLS:
        return None  # handled by scan(), which recurses into -c strings
    if argv0 != "git":
        return None

    # skip git's own global options to reach the subcommand
    i = 1
    directory = cwd
    while i < len(tokens):
        t = tokens[i]
        if t == "-C" and i + 1 < len(tokens):
            directory = change_dir(directory, tokens[i + 1])
            i += 2
        elif t in GIT_VALUE_OPTS:
            i += 2
        elif t.startswith("-"):
            i += 1
        else:
            break
    if i >= len(tokens) or tokens[i] != "push":
        return None

    args = tokens[i + 1:]
    positionals = []
    repo_opt = None
    bulk = False
    j = 0
    while j < len(args):
        a = args[j]
        if a in BULK_OPTS:
            bulk = True
            j += 1
        elif a.startswith("--repo="):
            repo_opt = a.split("=", 1)[1]
            j += 1
        elif a in PUSH_VALUE_OPTS:
            if a == "--repo" and j + 1 < len(args):
                repo_opt = args[j + 1]
            j += 2
        elif a.startswith("-"):
            j += 1
        else:
            positionals.append(a)
            j += 1

    # git: the command-line argument wins over --repo=
    if positionals:
        return {"repo": positionals[0], "refspecs": positionals[1:],
                "bulk": bulk, "directory": directory}
    return {"repo": repo_opt or "", "refspecs": [], "bulk": bulk,
            "directory": directory}


def argv0_name(token):
    """Command name behind a token, seeing through `$(`, backticks and paths."""
    return os.path.basename(token.lstrip("$(`"))


def scan(command, cwd, depth=0):
    """Return a description of the first `git push` found, else None.

    Walks the sub-commands in order carrying the shell's directory: `cd` and
    `pushd` move it, `popd` makes it unknown, `( ... )` restores it on close,
    and `bash -c` gets a copy that never leaks back out.
    """
    saved = []
    for tokens in split_commands(command):
        while tokens and tokens[0] in ("(", "{"):
            if tokens[0] == "(":
                saved.append(cwd)
            tokens = tokens[1:]
        closes = 0
        while tokens and tokens[-1] in (")", "}"):
            closes += tokens[-1] == ")"
            tokens = tokens[:-1]

        tokens = strip_prefix(tokens)
        argv0 = argv0_name(tokens[0]) if tokens else ""
        if argv0 in ("cd", "pushd"):
            operands = [a for a in tokens[1:] if a == "-" or not a.startswith("-")]
            cwd = change_dir(cwd, operands[0] if operands else None)
        elif argv0 == "popd":
            cwd = None
        elif argv0 in SHELLS and depth < 3:
            for k, t in enumerate(tokens[1:], start=1):
                if t == "-c" and k + 1 < len(tokens):
                    found = scan(tokens[k + 1], cwd, depth + 1)
                    if found is not None:
                        return found
        elif tokens:
            push = parse_push(tokens, cwd)
            if push is not None:
                return push

        for _ in range(closes):
            if saved:
                cwd = saved.pop()
    return None


def git_output(directory, args):
    """Stripped stdout of a git command, or None if it failed to produce any."""
    try:
        probe = subprocess.run(["git", "-C", directory] + args,
                               capture_output=True, text=True, timeout=5)
    except (OSError, subprocess.SubprocessError):
        return None  # no git, or it hung -- do not block on a guess
    if probe.returncode != 0:
        return None
    return probe.stdout.strip()


def in_worktree(directory):
    """True when the push would run inside a linked git worktree.

    The cheap marker test covers the worktrees Claude Code creates. The
    rev-parse is the authoritative one and also catches worktrees added by
    hand: in a linked worktree --git-dir points at .git/worktrees/<name>
    while --git-common-dir points at the shared .git, and the two differ.
    """
    if WORKTREE_MARKER in os.path.realpath(directory):
        return True
    out = git_output(directory, ["rev-parse", "--git-dir", "--git-common-dir"])
    if out is None:
        return False  # not a repository; the push would fail on its own
    paths = out.splitlines()
    if len(paths) < 2:
        return False
    resolved = [os.path.realpath(os.path.join(directory, p)) for p in paths[:2]]
    return resolved[0] != resolved[1]


def destination_branch(refspec):
    """Branch a refspec would write on the remote.

    Covers `branch`, `src:dst`, `+src:dst` (force) and `:dst` (delete); the
    `refs/heads/` prefix is stripped so every spelling of main compares equal.
    """
    ref = refspec.lstrip("+").strip()
    if ":" in ref:
        ref = ref.split(":", 1)[1]
    if ref.startswith("refs/heads/"):
        ref = ref[len("refs/heads/"):]
    return ref


def destinations(push, directory):
    """Remote branches this push would write.

    With no refspec git pushes the current branch, so HEAD is resolved to name
    it. A detached HEAD yields "HEAD", which matches nothing protected -- such
    a push would fail on its own.
    """
    if push["refspecs"]:
        return [destination_branch(r) for r in push["refspecs"]]
    head = git_output(directory, ["rev-parse", "--abbrev-ref", "HEAD"])
    return [head] if head else []


def deny(reason):
    print(json.dumps({
        "hookSpecificOutput": {
            "hookEventName": "PreToolUse",
            "permissionDecision": "deny",
            "permissionDecisionReason": reason,
        }
    }))
    sys.exit(0)


def main():
    try:
        payload = json.load(sys.stdin)
    except (json.JSONDecodeError, ValueError):
        sys.exit(0)  # never break the session on a malformed payload

    command = (payload.get("tool_input") or {}).get("command") or ""
    push = scan(command, payload.get("cwd") or os.getcwd())
    if push is None:
        sys.exit(0)  # not a push -- the common path, costs no subprocess

    directory = push["directory"]
    if directory is None:
        deny(
            "看不出這個 push 會在哪個目錄執行：前面的 cd 目標是變數、`cd -`、"
            "命令替換或 popd。\n"
            "請把路徑寫成字面值（`cd /路徑 && git push ...`），"
            "或改用 `git -C /路徑 push ...`。"
        )
    if not in_worktree(directory):
        sys.exit(0)  # user's own checkout: pushing there is something they ask for

    # --local：只認這個 repo 自己 .git/config 裡的設定。少了它，git 會沿
    # local → global → system 一路找下去，於是一次 `git config --global
    # claude.worktreePushRemote origin` 就讓整台機器每個 repo 的 worktree 一起
    # 放行 —— 其餘繞過都得每次 push 重來一遍，只有這條是一次到位。
    # linked worktree 裡 --local 讀的仍是共用的 .git/config（要碰 per-worktree
    # 的那份得用 --worktree），所以放行照常生效。
    allowed = git_output(directory, ["config", "--local", "--get", ALLOW_KEY])
    if not allowed:
        deny(
            "規則：worktree 裡的分支不推。這個 push 會從 worktree 發出去 "
            f"（{directory}），而 worktree 分支堆在別人會 pull 的遠端只會變成雜訊。\n"
            "請改為：完成 commit，然後回報分支名稱、worktree 路徑與 commit 摘要，"
            "由使用者自己整理／合併到目標分支後再推。\n"
            "（在一般 checkout 裡 push 不受此限 —— 使用者本來就會要求你推。）\n"
            f"若這個 repo 是使用者自己的 fork、希望開放 worktree 直接推，請使用者執行"
            f" /allow-push —— 它會做完檢查後印出一行指令，由**使用者自己**用 ! 前綴執行。"
            f"agent 在任何情境下都不設定 {ALLOW_KEY}，包括 /allow-push 之內。"
        )

    if not push["repo"]:
        deny(
            f"這個 repo 已放行 worktree push 到 `{allowed}`，但這次沒有指名 remote。\n"
            "裸 `git push` 會跟著 tracking 設定跑，可能落到放行範圍外的 remote"
            "（fork 工作流常同時有 origin 和 upstream）。\n"
            f"請明確寫成 `git push {allowed} <分支>`。"
        )

    if push["repo"] != allowed:
        deny(
            f"這個 repo 只放行 worktree push 到 `{allowed}`，"
            f"這次的目標是 `{push['repo']}`。\n"
            f"要推別的 remote，請由使用者重新執行 /allow-push 指定，"
            "或在一般 checkout 裡推。"
        )

    if push["bulk"]:
        deny(
            "--all／--mirror 會把包含 main 在內的所有分支一次推出去，"
            f"超出 `{allowed}` 的放行範圍。\n"
            "請逐一指名要推的分支。"
        )

    blocked = [d for d in destinations(push, directory) if d in PROTECTED_BRANCHES]
    if blocked:
        deny(
            f"放行 `{allowed}` 不包含 {'／'.join(sorted(set(blocked)))}。\n"
            "worktree 的工作請推成自己的分支名稱；main／master 由使用者自己推。"
        )

    sys.exit(0)  # opted-in remote, named explicitly, not a protected branch


if __name__ == "__main__":
    main()
