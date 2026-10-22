#!/usr/bin/env bash
# gitlab-api-guard.py 的回歸測試。改動 hook 之後跑一次：
#
#     bash ~/.claude/hooks/gitlab-api-guard.test.sh
#
# 不碰網路，也不呼叫 glab —— 只把 PreToolUse 的 payload 餵給 hook，
# 看它回 allow（不出聲）、ask（要使用者確認）還是 deny（擋下）。
set -u

HOOK="$(cd "$(dirname "$0")" && pwd)/gitlab-api-guard.py"
GL=https://gitlab.example.com/api/v4
export GITLAB_API_GUARD_HOSTS=gitlab.example.com
pass=0; fail=0

# run <期望 allow|ask|deny> <指令> <說明>
run() {
  local want="$1" cmd="$2" desc="$3" out got
  out=$(jq -n --arg c "$cmd" '{tool_name:"Bash",tool_input:{command:$c},cwd:"/tmp"}' \
        | /usr/bin/python3 "$HOOK" 2>&1)
  if printf '%s' "$out" | grep -q '"permissionDecision": *"deny"'; then got=deny
  elif printf '%s' "$out" | grep -q '"permissionDecision": *"ask"'; then got=ask
  elif [ -z "$out" ]; then got=allow
  else got="error"; fi
  if [ "$got" = "$want" ]; then
    pass=$((pass+1)); printf '  ok   %-5s %s\n' "$got" "$desc"
  else
    fail=$((fail+1)); printf '  FAIL want=%s got=%s  %s\n      cmd: %s\n' "$want" "$got" "$desc" "$cmd"
    [ -n "$out" ] && printf '      out: %s\n' "$(printf '%s' "$out" | head -c 300)"
  fi
}

echo "== 讀：直接放行 =="
run allow 'glab api user'                                          '查自己'
run allow 'glab api projects/42/pipelines'                         '列 pipeline'
run allow "glab api --paginate 'projects/acme%2Fcore%2Fserver/pipelines?ref=main'"  '分頁列 pipeline'
run allow 'glab api -X GET projects/42/pipelines -f ref=main'      '明寫 GET，-f 變查詢參數'
run allow 'glab api projects/42/jobs/9/trace'                      '讀 job log'
run allow "glab api graphql -f query='query { currentUser { username } }'"  'GraphQL 查詢'
run allow 'glab ci list -R acme/core/server'                   'glab ci list'
run allow 'glab ci trace 123'                                      'glab ci trace'
run allow 'glab ci status'                                         'glab ci status'
run allow 'glab mr list'                                           'glab mr list'
run allow 'glab mr view 12'                                        'glab mr view'
run allow 'glab -R acme/core/server mr diff 12'                '前置 -R 再接 mr diff'
run allow 'glab issue list -R acme/docs/backlogs'              'glab issue list'
run allow 'glab auth status'                                       'glab auth status（不印 token）'
run allow 'glab config get host'                                   'glab config get 非 token'
run allow 'glab version'                                           'glab version'
run allow 'glab mr'                                                '只打資源名＝看說明'
run allow "curl -s $GL/version"                                    'curl GET GitLab'
run allow "curl -sG $GL/projects/42/pipelines -d ref=main"         'curl -sG（合寫）：-d 變查詢參數'
run allow "curl -sSL $GL/version"                                  'curl 合寫的布林旗標'
run allow "curl -so out.json $GL/projects/42"                      'curl -so 合寫、帶輸出檔'
run allow 'curl -d a=b https://example.com/hook'                   'curl 寫別的網站，不歸這裡管'
run allow 'echo "glab api -X DELETE projects/1"'                   '字串裡的假指令'
run allow 'git commit -m "glab mr merge 3"'                        'commit 訊息裡的假指令'
run allow 'ls -la ~/.config/glab-cli/'                             '列設定資料夾（沒讀到檔案內容）'

echo
echo "== 寫：要使用者確認 =="
run ask 'glab api -X POST projects/42/pipeline'                    'api -X POST'
run ask 'glab api projects/42/issues -f title=x'                   '沒寫 -X 但帶 -f＝自動變 POST'
run ask 'glab api projects/42/issues --raw-field=title=x'          '--raw-field= 形式'
run ask 'glab api projects/42/issues -Ftitle=x'                    '-F 黏在一起的形式'
run ask 'glab api --input body.json projects/42/issues'            '--input 帶 body'
run ask 'glab api --method DELETE projects/42/repository/branches/foo'  'api --method DELETE'
run ask 'glab api -XDELETE projects/42/repository/branches/foo'    '-XDELETE 黏在一起'
run ask 'glab api --method=PUT projects/42/protected_branches/main' '--method=PUT'
run ask 'glab api projects/42/variables'                           '讀 CI 變數（GET 也問）'
run ask 'glab api groups/7/variables/GITLAB_HOSTKEY_FP'            '讀單一 group 變數'
run ask "glab api graphql -f query='mutation { mergeRequestAccept(input:{}) { errors } }'"  'GraphQL mutation'
run ask 'glab api graphql -F query=@q.graphql'                     'GraphQL 從檔案讀，看不出是什麼'
run ask 'glab ci run -b main'                                      'glab ci run'
run ask 'glab ci retry 123'                                        'glab ci retry'
run ask 'glab ci cancel 123'                                       'glab ci cancel'
run ask 'glab mr merge 12'                                         'glab mr merge'
run ask 'glab mr approve 12'                                       'glab mr approve'
run ask 'glab mr create --fill'                                    'glab mr create'
run ask 'glab issue create -t x'                                   'glab issue create'
run ask 'glab issue note 5 -m hi'                                  'glab issue note'
run ask 'glab variable list'                                       'glab variable（list 也問）'
run ask 'glab release create v1.0.0'                               'glab release create'
run ask 'glab repo delete x/y'                                     'glab repo delete'
run ask 'glab auth login'                                          'glab auth login'
run ask 'glab config set token x'                                  'glab config set'
run ask 'glab schedule run 3'                                      '沒列在讀清單的動詞一律問'
run ask 'bash -c "glab mr merge 1"'                                '包在 bash -c 裡'
run ask 'cd /tmp && glab api -X DELETE projects/1'                 '串在 && 後面'
run ask 'sudo glab ci delete 9'                                    '前面有 sudo'
run ask "curl -X DELETE $GL/projects/42/repository/branches/foo"   'curl -X DELETE'
run ask "curl --request POST $GL/projects/42/pipeline"             'curl --request POST'
run ask "curl -d ref=main $GL/projects/42/pipeline"                'curl -d＝自動 POST'
run ask "curl -sXDELETE $GL/projects/42/repository/branches/foo"   'curl -sXDELETE（合寫）'
run ask "curl -sd a=b $GL/projects/42/issues"                      'curl -sd（合寫）＝自動 POST'
run ask "curl --json '{}' $GL/projects/42/issues"                  'curl --json'
run ask "curl $GL/projects/42/variables"                           'curl 讀 CI 變數'
run ask "wget --method=DELETE $GL/projects/42/repository/branches/foo"  'wget --method=DELETE'
run ask "wget --post-data=a=b $GL/projects/42/issues"              'wget --post-data'
run ask "curl -X DELETE https://gitlab.example.com/acme/repo"        'GITLAB_API_GUARD_HOSTS 列的自架主機，不帶 /api/v4 也算'
run allow "curl -X DELETE https://example.org/thing"                 '不是 GitLab 的網址不管'

echo
echo "== 印 token：擋下 =="
run deny 'cat ~/.config/glab-cli/config.yml'                       '讀 token 設定檔'
run deny 'grep token ~/.config/glab-cli/config.yml'                'grep token 設定檔'
run deny 'glab auth status --show-token'                           'auth status --show-token'
run deny 'glab auth status -t'                                     'auth status -t'
run deny 'glab auth git-credential get'                            'auth git-credential'
run deny 'glab config get token -h gitlab.example.com'       'config get token'
run deny 'echo $GITLAB_TOKEN'                                      '展開 token 環境變數'
run deny "curl -H \"PRIVATE-TOKEN: \${GITLAB_TOKEN}\" $GL/user"    'curl 帶 token 環境變數'
run deny 'glab mr list && glab auth status --show-token'           '後面才印 token 也擋'
run deny 'cat ~/.config/glab-cli-issues/config.yml'                '讀第二支 token 的設定檔'
run deny 'glab-issues auth status -t'                              'glab-issues 印 token'
run deny 'GLAB_CONFIG_DIR=~/.config/glab-cli-issues glab config get token' '指定設定資料夾再印 token'

echo
echo "== glab-issues（只能寫 backlogs 那支 token）照 glab 的規則 =="
run allow 'glab-issues issue list -R acme/docs/backlogs'       'glab-issues 讀 issue'
run allow 'glab-issues api user'                                   'glab-issues 查自己'
run ask   'glab-issues issue create -t x'                          'glab-issues 開單也要問'
run ask   'glab-issues api -X POST projects/42/issues'             'glab-issues 寫入要問'

echo
echo "== 任何 glab-* 包裝指令自動受管（新增時不用登記）=="
run ask   'glab-agent api -X DELETE projects/42/repository/branches/x' '還不存在的 glab-agent 寫入也要問'
run allow 'glab-agent ci list'                                     'glab-agent 讀照樣放行'
run deny  'glab-agent auth status --show-token'                    'glab-agent 印 token 照樣擋'

echo
echo "結果：$pass 通過、$fail 失敗"
[ "$fail" -eq 0 ]
