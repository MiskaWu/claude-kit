#!/usr/bin/env bash
# git-push-guard.py 的回歸測試。改動 hook 之後跑一次：
#
#     bash ~/.claude/hooks/git-push-guard.test.sh
#
# 不會真的 push，也不碰網路 —— 只把 PreToolUse 的 payload 餵給 hook，
# 看它回 allow 還是 deny。測試用的 repo 建在 mktemp 目錄，跑完自動刪除。
set -u

HOOK="$(cd "$(dirname "$0")" && pwd)/git-push-guard.py"
LAB=$(mktemp -d) || exit 1
trap 'rm -rf "$LAB"' EXIT

REPO="$LAB/repo"
git init -q -b main "$REPO"
git -C "$REPO" commit -q --allow-empty -m init
git -C "$REPO" remote add origin git@github.com:you/forked.git
git -C "$REPO" remote add upstream git@github.com:someoneelse/canonical.git
git -C "$REPO" branch -q master
git -C "$REPO" worktree add -q "$LAB/wt" -b wt-test
git -C "$REPO" worktree add -q "$LAB/wt-master" master
mkdir -p "$LAB/.claude/worktrees"
git -C "$REPO" worktree add -q "$LAB/.claude/worktrees/marked" -b marked

PLAIN="$REPO"                            # 一般 checkout
WT="$LAB/wt"                             # worktree，靠 rev-parse 判定
MARKED="$LAB/.claude/worktrees/marked"   # worktree，靠路徑 marker 判定

COMMENT="允許 agent 從 worktree push 到此 remote；移除本行即恢復封鎖。詳見 ~/.claude/hooks/git-push-guard.py"
pass=0; fail=0

# run <期望 allow|deny> <cwd> <指令> <說明>
run() {
  local want="$1" cwd="$2" cmd="$3" desc="$4" out got
  out=$(jq -n --arg c "$cmd" --arg d "$cwd" \
        '{tool_name:"Bash",tool_input:{command:$c},cwd:$d}' \
        | /usr/bin/python3 "$HOOK" 2>&1)
  if printf '%s' "$out" | grep -q '"permissionDecision": *"deny"'; then got=deny; else got=allow; fi
  if [ "$got" = "$want" ]; then
    pass=$((pass+1)); printf '  ok   %-6s %s\n' "$got" "$desc"
  else
    fail=$((fail+1)); printf '  FAIL want=%s got=%s  %s\n      cmd: %s\n' "$want" "$got" "$desc" "$cmd"
    [ -n "$out" ] && printf '      out: %s\n' "$(printf '%s' "$out" | head -c 300)"
  fi
}

echo "== 未放行（.git/config 沒有 claude.worktreePushRemote）=="
run allow "$PLAIN" 'git push origin main'          '一般 checkout 推 main —— 使用者本來就會要求'
run allow "$PLAIN" 'git push'                      '一般 checkout 裸推'
run deny  "$WT"    'git push origin wt-test'       'worktree 推工作分支'
run deny  "$WT"    'git push'                      'worktree 裸推'
run deny  "$MARKED" 'git push origin marked'       'worktree（路徑 marker 判定）'
run allow "$WT"    'git status'                    '不是 push'
run allow "$WT"    'git commit -m "&& git push origin main"'  'commit message 裡的假 push'
run allow "$WT"    'echo "git push origin main"'   '字串裡的假 push'

echo
echo "== push 在哪個目錄執行：照 shell 的移動走，不猜 =="
run allow "$MARKED" 'cd '"$PLAIN"' && git push origin main'      'worktree 的 session cd 進一般 checkout 推（2026-10-06 誤擋）'
run allow "$MARKED" 'bash -c "cd '"$PLAIN"' && git push origin main"' '同上，包在 bash -c 裡'
run allow "$WT"    '(cd '"$PLAIN"' && git push origin main)'      '子 shell 裡 cd 過去推'
run allow "$PLAIN" 'git commit -m "修 /.claude/worktrees/ 判斷" && git push origin main' '指令文字提到 worktree 路徑不算數'
run deny  "$PLAIN" 'cd '"$WT"' && git push origin wt-test'        '一般 checkout 的 session cd 進 worktree 推（原本漏放）'
run deny  "$WT"    'git -C '"$PLAIN"' status && git push origin wt-test' '別的指令的 git -C 不算數（原本漏放）'
run deny  "$WT"    'make -C '"$PLAIN"' && git push origin wt-test' 'make 的 -C 不算數（原本漏放）'
run deny  "$WT"    '(cd '"$PLAIN"' && git status) && git push origin wt-test' '子 shell 的 cd 出了括號就失效'
run deny  "$WT"    '(cd '"$PLAIN"'); git push origin wt-test'      '`);` 黏在一起也認得出子 shell 結束'
run deny  "$PLAIN" 'cd "$GUARD_TEST_UNSET_DIR" && git push origin main' 'cd 目標是變數：看不出在哪，擋下請改寫字面路徑'
run deny  "$PLAIN" 'cd - && git push origin main'                  'cd -：同上'
run allow "$WT"    'cd '"$LAB"'/no-such-dir; cd '"$PLAIN"' && git push origin main' 'cd 失敗的那次不移動，下一個 cd 照算'
run deny  "$WT"    'cd '"$LAB"'/no-such-dir; git push origin wt-test' 'cd 失敗就還在原地（worktree）'
run allow "$MARKED" 'git -C '"$LAB"' -C repo push origin main'      '多個 -C 依序疊加，落在一般 checkout'

echo
echo "== 放行 origin 之後 =="
git -C "$REPO" config set --comment="$COMMENT" claude.worktreePushRemote origin

run allow "$PLAIN" 'git push origin main'          '一般 checkout 不受影響'
run allow "$WT"    'git push origin wt-test'       '放行：指名 origin 推工作分支'
run allow "$WT"    'git push origin HEAD:wt-test'  '放行：HEAD:分支'
run allow "$WT"    'git push --force origin wt-test' '放行：force 推工作分支（amend 後重推）'
run allow "$WT"    'git push -u origin wt-test'    '放行：-u'
run allow "$WT"    'git push origin'               '放行：只給 remote，HEAD 是 wt-test'
run allow "$WT"    'git push origin v1.0'          '放行：推 tag'
run allow "$WT"    'cd '"$WT"' && git push origin wt-test' '放行：複合指令'
run allow "$WT"    'bash -c "git push origin wt-test"'     '放行：bash -c 包起來'
run allow "$PLAIN" 'git -C '"$WT"' push origin wt-test'    '放行：從外面 git -C 進 worktree'

echo
echo "== 放行之後仍然要擋的 =="
run deny  "$WT"    'git push'                      '裸推（沒指名 remote，可能落到 upstream）'
run deny  "$WT"    'git push upstream wt-test'     '推到放行範圍外的 remote'
run deny  "$WT"    'git push git@github.com:you/forked.git wt-test' '用 URL 繞過 remote 名稱'
run deny  "$WT"    'git push origin main'          '推 main'
run deny  "$WT"    'git push origin master'        '推 master'
run deny  "$WT"    'git push origin HEAD:main'     'HEAD:main'
run deny  "$WT"    'git push origin wt-test:main'  '改名推到 main'
run deny  "$WT"    'git push origin refs/heads/main' '全名 refs/heads/main'
run deny  "$WT"    'git push origin +wt-test:main' 'force refspec 推 main'
run deny  "$WT"    'git push origin :main'         '刪除遠端 main'
run deny  "$WT"    'git push --delete origin main' '--delete main'
run deny  "$WT"    'git push origin --all'         '--all 會把 main 一起掃出去'
run deny  "$WT"    'git push --mirror origin'      '--mirror'
run deny  "$WT"    'git push origin wt-test main'  '多個 refspec 夾帶 main'
run deny  "$WT"    'sudo git push origin main'     'sudo 包起來推 main'
run deny  "$WT"    'bash -c "git push origin main"' 'bash -c 包起來推 main'
run deny  "$WT"    'git push --repo=origin main'   '--repo= 形式推 main'
run deny  "$WT"    'git push --no-verify origin main' '--no-verify 繞不過 PreToolUse'
run deny  "$LAB/wt-master" 'git push origin'       '裸給 remote，但 HEAD 就是 master'

echo
echo "== 關閉放行之後 =="
git -C "$REPO" config --unset claude.worktreePushRemote
run deny  "$WT"    'git push origin wt-test'       '恢復封鎖'
printf '  .git/config 殘留 claude 相關行數：%s（應為 0）\n' \
  "$(grep -ci claude "$REPO/.git/config" || true)"

echo
echo "== 誤下 --global 不該放行（hook 讀 --local 的理由）=="
# 這個 repo 的 .git/config 上面剛 unset 過，所以放行與否完全取決於 global。
# GIT_CONFIG_GLOBAL 換成假檔，真正的 ~/.gitconfig 不會被碰到。
printf '[claude]\n\tworktreePushRemote = origin\n' > "$LAB/fake-global"
export GIT_CONFIG_GLOBAL="$LAB/fake-global"
run deny  "$WT"    'git push origin wt-test'       '只有 global 設了 key：仍封鎖'
run deny  "$MARKED" 'git push origin marked'       '同上，路徑 marker 判定的 worktree'
unset GIT_CONFIG_GLOBAL

echo
printf '通過 %d／失敗 %d\n' "$pass" "$fail"
[ "$fail" -eq 0 ]
