#!/usr/bin/env python3
"""Ask before anything that writes to GitLab; refuse anything that prints the token.

Why this exists. git-push-guard only sees `git push`. Once glab carries a token
that can do more than read issues, the same agent can delete a branch, merge an
MR, run a deploy job or read CI variables through `glab api` / `glab <cmd>` /
`curl`, and none of that goes through the push guard. This hook is the matching
seatbelt for the API side:

  * reads pass silently -- seeing pipelines, jobs and logs is the whole point;
  * writes stop at a permission prompt (decision "ask"), so the user confirms
    each one -- deny would also block the writes they ask for, and a settings
    permission rule cannot tell `glab api x` (GET) from `glab api x -f a=b`
    (POST), which is exactly the trap below;
  * printing the token is refused (decision "deny"): once a token is in the
    conversation it has leaked, and no confirmation makes that acceptable.

The trap that makes string rules useless: `glab api <endpoint>` is GET only
while no field is given -- any -f/-F/--field/--raw-field/--input silently turns
it into POST ("the default HTTP request method is GET if no parameters are
added, and POST otherwise", glab api --help). So the method is computed the way
glab computes it, not guessed from the words on the line.

What counts as a read is an allowlist (READ_VERBS); any glab subcommand not on
it asks. A new glab version adding a destructive verb therefore asks too,
instead of slipping through an incomplete denylist.

CI variables are asked even for GET: their values are secrets, and a read puts
them into the conversation. Same for `glab variable` in every form.

Scope of the guarantee. This catches mistakes and confused instructions, not a
deliberate evasion -- a python one-liner that calls the API itself is not
parsed. The real boundary is the token's own permissions; keep those narrow.

Command-line parsing (sub-commands, quoting, `bash -c`, wrappers) is reused
from git-push-guard.py so both hooks read a command line the same way.
"""

import importlib.util
import json
import os
import re
import sys

_HERE = os.path.dirname(os.path.realpath(__file__))
_spec = importlib.util.spec_from_file_location(
    "git_push_guard", os.path.join(_HERE, "git-push-guard.py"))
shell = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(shell)

# where glab keeps a token: the default config dir, and any other dir chosen
# through GLAB_CONFIG_DIR (a wrapper such as glab-issues can keep a narrower token in its own dir)
TOKEN_FILE = re.compile(r"glab-cli[\w.-]*/config\.yml")
# expanding any of these prints or ships the token itself
TOKEN_ENV = re.compile(
    r"\$\{?(GITLAB_TOKEN|GLAB_TOKEN|GITLAB_ACCESS_TOKEN|GITLAB_PRIVATE_TOKEN|CI_JOB_TOKEN)\b")
# URLs that reach a GitLab API: gitlab.com, any self-hosted instance listed in
# GITLAB_API_GUARD_HOSTS (comma-separated host names), and anything under /api/v4/
GITLAB_HOSTS = ["gitlab.com"] + [
    h.strip() for h in os.environ.get("GITLAB_API_GUARD_HOSTS", "").split(",") if h.strip()]
GITLAB_URL = re.compile(
    r"https?://(" + "|".join(re.escape(h) for h in GITLAB_HOSTS) + r")(/|$)|/api/v4/")

# `glab <resource> <verb>` verbs that only read GitLab
READ_VERBS = {
    "list", "ls", "view", "show", "status", "diff", "get", "trace", "lint",
    "search", "checkout", "clone", "download", "artifact", "contributors",
}
# top-level glab commands that never touch GitLab state
HARMLESS_TOP = {"version", "help", "check-update", "completion",
                "--version", "-v", "--help", "-h"}
# glab flags (before the resource/verb) that take a value
GLAB_VALUE_FLAGS = {"-R", "--repo", "-g", "--group", "--hostname"}
# `glab api` flags that take a value but do not add a body
API_VALUE_FLAGS = {"-H", "--header", "--hostname", "-R", "--repo",
                   "--per-page", "--page", "--output", "--jq", "--template"}
API_FIELD_FLAGS = {"-f", "-F", "--field", "--raw-field"}

# curl flags that send a body (and so default the method to POST)
CURL_BODY_FLAGS = {"-d", "--data", "--data-raw", "--data-binary",
                   "--data-urlencode", "--json", "-F", "--form", "--form-string"}
CURL_UPLOAD_FLAGS = {"-T", "--upload-file"}
# short curl options that take a value: in a cluster like `-sXPOST` or `-sd x`
# the rest of the cluster (or the next argument) is that value
CURL_SHORT_VALUE = set("XdFTHouAeKrwCEmbcxyYz")
WGET_BODY_FLAGS = ("--post-data", "--post-file", "--body-data", "--body-file")

READ_METHODS = {"GET", "HEAD"}

DENY, ASK = "deny", "ask"


def secret_endpoint(endpoint):
    """True for endpoints whose GET returns secret values (CI variables)."""
    path = endpoint.split("?", 1)[0].rstrip("/")
    return path.endswith("/variables") or "/variables/" in path or path == "variables"


def classify_api(args):
    """Decision for `glab api <args>`: None (allow), or (decision, reason)."""
    method = None
    has_body = False
    endpoint = ""
    i = 0
    while i < len(args):
        a = args[i]
        if a in ("-X", "--method"):
            if i + 1 < len(args):
                method = args[i + 1].upper()
            i += 2
            continue
        if a.startswith("--method="):
            method = a.split("=", 1)[1].upper()
        elif a.startswith("-X") and len(a) > 2:
            method = a[2:].upper()
        elif a in API_FIELD_FLAGS:
            has_body = True
            i += 2
            continue
        elif a.startswith(("--field=", "--raw-field=")) or (
                a[:2] in ("-f", "-F") and len(a) > 2):
            has_body = True
        elif a == "--input":
            has_body = True
            i += 2
            continue
        elif a.startswith("--input="):
            has_body = True
        elif a in API_VALUE_FLAGS:
            i += 2
            continue
        elif not a.startswith("-") and not endpoint:
            endpoint = a
        i += 1

    effective = method or ("POST" if has_body else "GET")

    if endpoint.strip("/") == "graphql":
        text = " ".join(args)
        if re.search(r"\bmutation\b", text):
            return ASK, f"GitLab 寫入：glab api graphql 帶 mutation（{text[:120]}）"
        if re.search(r"(^|[\s=])@", text):
            return ASK, "glab api graphql 從檔案讀查詢內容，看不出是不是 mutation，先確認"
        return None

    if effective in READ_METHODS:
        if secret_endpoint(endpoint):
            return ASK, (f"讀 CI 變數：glab api {endpoint}。變數值是機密，讀了就會進到對話裡，先確認")
        return None
    return ASK, f"GitLab 寫入：glab api {effective} {endpoint or '(未指名 endpoint)'}"


def classify_glab(args):
    """Decision for `glab <args>`: None (allow), or (decision, reason)."""
    positionals = []
    i = 0
    while i < len(args):
        a = args[i]
        if not positionals and a in GLAB_VALUE_FLAGS:
            i += 2
            continue
        if not a.startswith("-") or (not positionals and a in HARMLESS_TOP):
            positionals.append(a)
        if positionals and positionals[0] == "api":
            break
        if len(positionals) >= 2:
            break
        i += 1

    if not positionals:
        return None
    top = positionals[0]
    verb = positionals[1] if len(positionals) > 1 else None
    rest = args

    if top in HARMLESS_TOP:
        return None
    if top == "api":
        return classify_api(args[args.index("api") + 1:])
    if top == "auth":
        if verb == "status":
            if "-t" in rest or "--show-token" in rest:
                return DENY, "glab auth status --show-token 會把 token 印出來"
            return None
        if verb == "git-credential":
            return DENY, "glab auth git-credential 會把 token 印出來"
        return ASK, f"glab auth {verb or ''}：會改登入狀態或 token，先確認"
    if top == "config":
        if verb == "get":
            if "token" in rest:
                return DENY, "glab config get token 會把 token 印出來"
            return None
        if verb in ("set", "edit"):
            return ASK, f"glab config {verb}：會改 glab 設定，先確認"
        return None
    if top == "variable":
        return ASK, (f"glab variable {verb or ''}：CI 變數是機密，讀會把值帶進對話、"
                     "寫會改部署設定，一律先確認")
    if verb is None or verb in READ_VERBS:
        return None
    return ASK, f"GitLab 寫入：glab {top} {verb}"


def classify_curl(args):
    urls = [a for a in args if GITLAB_URL.search(a)]
    if not urls:
        return None
    method = None
    get_flag = False
    has_body = False
    upload = False
    i = 0
    while i < len(args):
        a = args[i]
        if a in ("-X", "--request"):
            if i + 1 < len(args):
                method = args[i + 1].upper()
            i += 2
            continue
        if a in ("-G", "--get"):
            get_flag = True
        elif a in CURL_BODY_FLAGS or any(a.startswith(f + "=") for f in CURL_BODY_FLAGS
                                         if f.startswith("--")):
            has_body = True
            i += 2 if a in CURL_BODY_FLAGS else 1
            continue
        elif a in CURL_UPLOAD_FLAGS:
            upload = True
        elif a.startswith("-") and not a.startswith("--") and len(a) > 2:
            # a cluster of short options: `-sG`, `-sXPOST`, `-sd ref=main`
            for k, ch in enumerate(a[1:], start=1):
                if ch == "G":
                    get_flag = True
                elif ch in CURL_SHORT_VALUE:
                    value = a[k + 1:]
                    if not value and i + 1 < len(args):
                        value = args[i + 1]
                        i += 1
                    if ch == "X":
                        method = value.upper()
                    elif ch in "dF":
                        has_body = True
                    elif ch == "T":
                        upload = True
                    break
        i += 1
    effective = method or ("GET" if get_flag else "POST" if has_body
                           else "PUT" if upload else "GET")
    return http_decision("curl", effective, urls[0])


def classify_wget(args):
    urls = [a for a in args if GITLAB_URL.search(a)]
    if not urls:
        return None
    method = None
    has_body = False
    i = 0
    while i < len(args):
        a = args[i]
        if a == "--method" and i + 1 < len(args):
            method = args[i + 1].upper()
            i += 2
            continue
        if a.startswith("--method="):
            method = a.split("=", 1)[1].upper()
        elif a.startswith(WGET_BODY_FLAGS):
            has_body = True
        i += 1
    return http_decision("wget", method or ("POST" if has_body else "GET"), urls[0])


def http_decision(tool, method, url):
    if method in READ_METHODS:
        if secret_endpoint(url.split("/api/v4/", 1)[-1]):
            return ASK, f"讀 CI 變數：{tool} {url}。變數值是機密，讀了就會進到對話裡，先確認"
        return None
    return ASK, f"GitLab 寫入：{tool} {method} {url}"


CLASSIFIERS = {"glab": classify_glab, "curl": classify_curl, "wget": classify_wget}


def classifier_for(argv0):
    """Classifier for a command name, or None.

    Every `glab-<something>` counts as glab: those are thin wrappers that only
    swap GLAB_CONFIG_DIR to pick another token (e.g. a glab-issues that can only
    write issues). Matching the
    prefix instead of listing names means a new wrapper is guarded the moment
    it exists, instead of slipping past until someone remembers to register it.
    """
    if argv0.startswith("glab-"):
        return classify_glab
    return CLASSIFIERS.get(argv0)


def scan(command, depth=0):
    """Every (decision, reason) found in the command line, in order."""
    found = []
    for tokens in shell.split_commands(command):
        while tokens and tokens[0] in ("(", "{"):
            tokens = tokens[1:]
        while tokens and tokens[-1] in (")", "}"):
            tokens = tokens[:-1]
        tokens = shell.strip_prefix(tokens)
        if not tokens:
            continue
        argv0 = shell.argv0_name(tokens[0])
        if argv0 in shell.SHELLS and depth < 3:
            for k, t in enumerate(tokens[1:], start=1):
                if t == "-c" and k + 1 < len(tokens):
                    found.extend(scan(tokens[k + 1], depth + 1))
            continue
        classify = classifier_for(argv0)
        if classify:
            result = classify(tokens[1:])
            if result:
                found.append(result)
    return found


def decide(command):
    """(decision, reason) for the whole command line, or None to allow."""
    # Both checks look at the raw line on purpose, heredoc bodies and quoted text
    # included: `python3 - <<'EOF'` with an open() inside is a real read, and
    # telling that apart from prose that merely names the file is not worth the
    # hole. Prose can say "glab's token file" instead of the path.
    if TOKEN_FILE.search(command):
        return DENY, ("這個指令碰到 glab 的 token 設定檔。"
                      "如果只是在文字裡（記憶、文件、commit 訊息）提到它，"
                      "改寫成「glab 的 token 設定檔」這類不含完整路徑的說法")
    if TOKEN_ENV.search(command):
        return DENY, ("這個指令會展開 GitLab token 環境變數，token 會出現在指令或輸出裡。"
                      "如果只是在文字裡提到變數名，拿掉前面的 $")
    results = scan(command)
    for decision in (DENY, ASK):
        reasons = [r for d, r in results if d == decision]
        if reasons:
            return decision, "；".join(dict.fromkeys(reasons))
    return None


def emit(decision, reason):
    if decision == DENY:
        reason += ("。\ntoken 進到對話就等於外洩，這類指令一律擋下。"
                   "要確認 token 能不能用，請改打實際的 API（例如 `glab api user`）。")
    else:
        reason += "。\n這會改 GitLab 上的狀態（或讀到機密），請使用者確認後才執行。"
    print(json.dumps({
        "hookSpecificOutput": {
            "hookEventName": "PreToolUse",
            "permissionDecision": decision,
            "permissionDecisionReason": reason,
        }
    }, ensure_ascii=False))
    sys.exit(0)


def main():
    try:
        payload = json.load(sys.stdin)
    except (json.JSONDecodeError, ValueError):
        sys.exit(0)  # never break the session on a malformed payload
    command = (payload.get("tool_input") or {}).get("command") or ""
    if not command:
        sys.exit(0)
    result = decide(command)
    if result:
        emit(*result)
    sys.exit(0)


if __name__ == "__main__":
    main()
