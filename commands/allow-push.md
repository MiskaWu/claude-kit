---
description: 開放／收回本 repo 的 worktree push 權限（印出指令給使用者自己執行）
disable-model-invocation: true
allowed-tools: Bash(git config --get:*), Bash(git config --list:*), Bash(git remote:*), Bash(git rev-parse:*), Bash(git branch:*)
---

## 現況

- 工作目錄：!`pwd`
- git-dir：!`git rev-parse --git-dir 2>/dev/null || echo "(不是 git repo)"`
- git-common-dir（設定會寫進這裡的 config）：!`git rev-parse --path-format=absolute --git-common-dir 2>/dev/null || echo "-"`
- remote：!`git remote -v 2>/dev/null | grep '(push)' || echo "(沒有 remote)"`
- 目前放行狀態：!`git config --get claude.worktreePushRemote || echo "(未設定 —— worktree 一律封鎖)"`
- 參數：$ARGUMENTS

## 這個指令在做什麼

`~/.claude/hooks/git-push-guard.py` 預設擋掉所有從 worktree 發出的 push，理由見
`git-push-guard.py` 開頭的說明。唯一的例外開關是把 `claude.worktreePushRemote = <remote>`
寫進**這個 repo 的** `.git/config`，之後 hook 才會放行推到該 remote 的 push。

**這個指令不替使用者寫那個 key。** 它負責檢查、確認、把後果講清楚，然後印出一行
指令交給使用者自己執行。你（agent）在任何情境下都不設定或修改
`claude.worktreePushRemote` —— 包括這個指令執行期間，也包括使用者在對話裡口頭說
「你可以推」的時候。

理由有兩層。一是 hook 讀的狀態如果你寫得到，這道防線就等於不存在。二是規則的形狀：
「除了 /allow-push 以外都不准」留給你的是「現在算不算那個情境」的判斷空間，而你其實
無從確定；無例外的規則才沒有空間可鑽。frontmatter 的 `allowed-tools` 已經只給唯讀的
git 指令，寫入本來就不在你的授權範圍內。

## 你的任務

依參數決定動作。沒給參數 = 開啟，`off` = 關閉，`status` = 只回報現況不動手。

### 開啟

1. **先確認目標 remote。** 參數有指定就用指定的；沒指定就用 `origin`。
   remote 清單裡不存在該名稱就停手，列出實際有哪些 remote 讓我選。

2. **確認這是可以弄髒的遠端。** 把該 remote 的 URL 唸出來給我確認，並明講
   「放行後 agent 可以從 worktree 直接推分支到這裡，雜訊由你自己清」。
   如果 remote 清單裡同時有 `upstream`，這是典型 fork 工作流——照樣只放行指定的那一個，
   並且明講 `upstream` 仍然被擋。**不要**因為看起來像 fork 就自作主張多放行一個。

3. **印出指令，不要執行。** 輸出成單獨一行、可以整行複製的樣子：

   ```
   ! git -C <repo 根目錄絕對路徑> config set --comment="允許 agent 從 worktree push 到此 remote；移除本行即恢復封鎖。詳見 ~/.claude/hooks/git-push-guard.py" claude.worktreePushRemote <remote>
   ```

   - `<repo 根目錄絕對路徑>` 用上面 git-common-dir 去掉結尾 `/.git` 的絕對路徑。
     寫死路徑是為了讓使用者不管 cwd 在主 checkout 還是哪個 worktree，都寫進同一份
     共用的 `.git/config` —— 同一個 repo 的所有 worktree 共用一份，設一次就好。
   - 註解一定要帶，這是給未來翻到 `.git/config` 的人看的。
   - 開頭的 `!` 是 Claude Code 的前綴：使用者在輸入框貼上送出，指令就在本 session
     執行、輸出回到對話。**要告訴使用者這件事**，別讓對方以為得另開一個終端。
   - **不要寫 `--global`。** hook 讀的是 `--local`，全域設定不會生效（見
     git-push-guard.py 的說明），但那行會留在 `~/.gitconfig` 裡誤導後來的人。

4. 使用者跑完之後，用 `git config --get claude.worktreePushRemote` 確認值正確，
   然後回報：寫進了哪個檔案、放行哪個 remote、以及**仍然被擋的三件事**——
   沒指名 remote 的裸 `git push`、推到 main／master、`--all`／`--mirror`。

### 關閉

一樣印出指令、不要代跑（收回權限跟給出權限同一個道理，都該由使用者的鍵盤送出）：

```
! git -C <repo 根目錄絕對路徑> config --unset claude.worktreePushRemote
```

整行連同註解會一起消失，`.git/config` 回到沒設定過的樣子。使用者跑完後確認並回報
已恢復封鎖。

### 順帶一提

想知道自己在哪些 repo 開過放行：

```
find ~/projects -name config -path '*/.git/*' -not -path '*/worktrees/*' -exec grep -l -i worktreepushremote {} +
```

git 存檔時把 key 轉小寫，所以 grep 要用小寫。舊版寫成
`grep -rl worktreepushremote ~/projects/*/.git/config`，那個 glob 只涵蓋
`~/projects/<repo>` 這一層 —— 像 `~/projects/acme/server` 這種擺在子目錄的 repo
會整個漏掉，回傳空的看起來卻像「沒有任何 repo 放行過」。
