# claude-kit

讓 Claude Code 放手做事，又不會把遠端洗成雜訊、沒問過就改 GitLab、把 token 印進對話。給每天讓 agent 自己跑指令的人。

這是我日常讓 Claude Code 寫遊戲、做工具時整理出來的兩樣東西：

- **防護 hooks**：兩支 `PreToolUse` hook 和兩個指令，只需要 Python 3 標準函式庫。
- **技能（skills）**：遊戲從設計、美術、打磨、短影音到發行的職能方法，以及 Claude Code mod 面板的做法。可以只挑想要的裝。

## 用起來長這樣

裝好之後不用下任何指令。Claude 每次要跑 Bash，hook 會先看過這條指令，決定放行、問你、或擋下。被擋下時 Claude 會收到理由，裡面寫了該怎麼收尾；要問你時，理由會顯示在確認提示上。

| Claude 想跑的指令 | 結果 | hook 給的理由 |
|---|---|---|
| 在 worktree 裡 `git push origin fix-login` | 擋下 | 規則：worktree 裡的分支不推。這個 push 會從 worktree 發出去，而 worktree 分支堆在別人會 pull 的遠端只會變成雜訊。請改為：完成 commit，然後回報分支名稱、worktree 路徑與 commit 摘要，由使用者自己整理／合併到目標分支後再推。 |
| 在你自己的 checkout 裡 `git push origin main` | 放行 | |
| `git commit -m "docs: 說明 git push origin main 的限制"`（commit 訊息裡的 push 不算） | 放行 | |
| `glab api projects/42/pipelines` | 放行 | |
| `glab api projects/42/issues -f title=hello` | 問你 | GitLab 寫入：glab api POST projects/42/issues。這會改 GitLab 上的狀態（或讀到機密），請使用者確認後才執行。 |
| `glab issue close 7` | 問你 | GitLab 寫入：glab issue close。這會改 GitLab 上的狀態（或讀到機密），請使用者確認後才執行。 |
| `glab api projects/42/variables/DEPLOY_KEY` | 問你 | 讀 CI 變數：glab api projects/42/variables/DEPLOY_KEY。變數值是機密，讀了就會進到對話裡，先確認。 |
| `glab config get token` | 擋下 | glab config get token 會把 token 印出來。token 進到對話就等於外洩，這類指令一律擋下。要確認 token 能不能用，請改打實際的 API（例如 `glab api user`）。 |

<sub>表格是把 payload 餵給兩支 hook 實際跑出來的結果。理由取自 hook 的輸出，多行併成一行，第一列只留開頭並省略 worktree 路徑。</sub>

想在安裝前試一次，clone 下來把一筆 payload 餵給 hook 就好，不碰 Claude Code 的設定：

```console
$ echo '{"tool_name":"Bash","tool_input":{"command":"glab config get token"},"cwd":"/tmp"}' | python3 hooks/gitlab-api-guard.py
{"hookSpecificOutput": {"hookEventName": "PreToolUse", "permissionDecision": "deny", "permissionDecisionReason": "glab config get token 會把 token 印出來。\ntoken 進到對話就等於外洩，這類指令一律擋下。要確認 token 能不能用，請改打實際的 API（例如 `glab api user`）。"}}
```

技能也不用下指令，Claude 會依技能的說明判斷何時載入。例如你說「這個玩法為什麼不好玩」會用到 `game-design`，說「剪一支預告片」會用到 `game-shorts`。

## 安裝

```bash
git clone https://github.com/MiskaWu/claude-kit.git ~/claude-kit
mkdir -p ~/.claude/hooks ~/.claude/skills ~/.claude/commands
ln -s ~/claude-kit/hooks/*.py ~/.claude/hooks/
ln -s ~/claude-kit/skills/* ~/.claude/skills/
ln -s ~/claude-kit/commands/*.md ~/.claude/commands/
```

技能可以只挑想要的連結。hooks 要再掛進 `~/.claude/settings.json`：

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          { "type": "command", "command": "/usr/bin/python3 $HOME/.claude/hooks/git-push-guard.py", "timeout": 10 },
          { "type": "command", "command": "/usr/bin/python3 $HOME/.claude/hooks/gitlab-api-guard.py", "timeout": 10 }
        ]
      }
    ]
  }
}
```

改完開一個新的 Claude Code 對話讓設定生效。

`gitlab-api-guard.py` 會從自己所在的目錄載入 `git-push-guard.py`，兩支要放在一起（symlink 也可以）。只需要 Python 3 標準函式庫；跑測試另外需要 `jq`。

## 防護 hooks

兩支都是 `PreToolUse` hook，只看 Bash 指令，各附回歸測試。共同的立場是：**判斷依據放在「實際會發生什麼」，不放在指令字串長什麼樣子。** settings.json 的權限規則只比對字串，看不到工作目錄、也分不出 `glab api x`（GET）和 `glab api x -f a=b`（POST），所以這兩件事交給 hook 判斷。

### `hooks/git-push-guard.py`：worktree 裡的分支不推

agent 在 worktree 開的是拋棄式分支，全部推上去只會把別人在看的遠端洗成雜訊；在使用者自己的 checkout 推則照常放行。

- **照 shell 的實際行為追工作目錄**：依序走過每個子指令，`cd`／`pushd` 會移動、`( ... )` 子 shell 結束會回來、`git -C` 最後套用。讀不出目標的 `cd`（變數、`cd -`、命令替換）視為未知，未知一律擋。
- **放行只能由人開**：repo 本地的 `claude.worktreePushRemote = <remote>` 才放行推到那個 remote。`/allow-push` 只做檢查並印出指令，由使用者用 `!` 前綴親手執行；agent 在任何情境都不寫這把鑰匙。讀設定時用 `--local`，一行 `--global` 打不開整台機器。
- **放行後仍然擋三件事**：沒指名 remote 的裸 `git push`、推到 main／master、`--all`／`--mirror`。
- 測試 54 條：`bash hooks/git-push-guard.test.sh`

### `hooks/gitlab-api-guard.py`：GitLab 讀放行、寫入先問、印 token 擋下

- **照 glab 的規則算 HTTP 方法**：`glab api <endpoint>` 只要帶任何欄位就會從 GET 變成 POST。hook 用 glab 的算法判斷，不從字面猜。
- **讀放行、寫入問、印 token 拒絕**：寫入回 `ask`，讓使用者逐次確認；印出 token 回 `deny`，因為 token 一進對話就等於外洩，確認也無法補救。CI 變數連讀都要問，因為值本身是機密。
- **讀的動詞用允許清單**：glab 新版多出一個破壞性指令時，預設會被問，不會因為黑名單沒更新而溜過去。
- 指令列的拆解（子指令、引號、`bash -c`、包裝指令）沿用 git-push-guard，兩支 hook 讀指令的方式一致。
- 自架 GitLab：把主機名寫進 `GITLAB_API_GUARD_HOSTS`（逗號分隔），例如 `export GITLAB_API_GUARD_HOSTS=gitlab.example.com`。`gitlab.com` 與任何 `/api/v4/` 路徑預設就會檢查。
- 測試 84 條：`bash hooks/gitlab-api-guard.test.sh`

範圍說明：這兩支擋的是失誤和被誤導的指示，不是刻意的繞過（例如自己寫一段 Python 打 API）。真正的邊界是 token 本身的權限，請把權限開到最窄。

### 指令（`commands/`）

| 指令 | 做什麼 |
|---|---|
| `/allow-push` | 開放／收回本 repo 的 worktree push。只檢查、確認、印出指令，由使用者自己執行 |
| `/merge-back` | 把當下 worktree 的分支併回預設分支（預設 squash，`ff` 保留每個 commit），確認內容一個不漏進了預設分支才清掉 worktree 與分支；不 push |

兩個指令都設了 `disable-model-invocation`，只有使用者能叫。

## 技能

| 技能 | 用途 |
|---|---|
| [`game-design`](skills/game-design/SKILL.md) | 設計與審視玩法：體驗目標、核心循環、有趣的決定、回饋、節奏、平衡與相剋、反模式；原型與試玩流程。原始研究筆記附出處 |
| [`game-art`](skills/game-art/SKILL.md) | 遊戲畫面的職能方法：美術指導與配色、素材顏色統一、燈光、風格化渲染、特效、UI/UX，以及俯視 ARPG 的 AAA 驗收準則 |
| [`game-polish`](skills/game-polish/SKILL.md) | 打磨網頁小遊戲：自動玩家人設量規則層、無頭瀏覽器巡覽截圖、一輪一輪改到手機試玩說好；附 Playwright 範本 |
| [`game-shorts`](skills/game-shorts/SKILL.md) | 用遊戲本身的畫面做短影音：分鏡、虛擬時鐘逐幀擷取、程式化剪輯、合成配樂；附導演頁與輸出範本 |
| [`game-publish`](skills/game-publish/SKILL.md) | 把遊戲推出去並經營成粉絲：曝光、量測與歸因、自有名單、投放、願望清單；附品牌發行設定範本 |
| [`mod-polish`](skills/mod-polish/SKILL.md) | 把 Claude Code mod 的面板做精緻：先出設計稿、SVG 卡片（純函式）、深淺主題、截圖自檢；附起手 kit |

技能只寫做法與檢查點，不替專案做決定；各專案的答案（體驗目標、品牌規則、數字）留在專案自己的文件裡。

## 授權

[MIT](LICENSE)
