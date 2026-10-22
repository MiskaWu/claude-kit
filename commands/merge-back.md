---
description: 把當下 worktree 的分支合併回預設分支、清掉 worktree 與分支（不 push）。無引數＝squash 成單一 commit；ff＝保留分支上原本每個 commit
argument-hint: [ff]
disable-model-invocation: true
allowed-tools: Bash(git worktree:*), Bash(git merge:*), Bash(git branch:*), Bash(git status:*), Bash(git merge-base:*), Bash(git rev-parse:*), Bash(git log:*), Bash(git rev-list:*), Bash(git commit:*), Bash(git diff:*), ExitWorktree
---

## 現況

- git-dir：!`git rev-parse --path-format=absolute --git-dir`
- git-common-dir：!`git rev-parse --path-format=absolute --git-common-dir`
- 當下 worktree 路徑：!`git rev-parse --show-toplevel`
- 當下分支：!`git rev-parse --abbrev-ref HEAD`
- 當下工作目錄狀態：!`git status --porcelain`
- 預設分支：!`git symbolic-ref --short refs/remotes/origin/HEAD 2>/dev/null | sed 's|^origin/||' | grep . || echo main`

## 範圍

**只收尾當下這個 worktree 和它的分支**，其他 worktree、其他分支一律不碰，
也不要列出來問我要不要順便處理 —— 要一次收多個的時候我會明講。

真的需要查 `git worktree list` 的時候（下面第 2 項要看 locked 標記），那份清單
只是查詢用，不是待辦清單。

## 模式

引數：`$ARGUMENTS`

- 空 → **squash 模式**（預設）：把這條分支整理成預設分支上的**單一 commit**。
- `ff` → **ff 模式**：`--ff-only` 合併，保留分支上的每個 commit。
- 其他值 → 停下來問我要哪一種，不要猜。

## 你的任務

**先判斷位置**，兩種結果：

- git-dir **等於** git-common-dir → 現在在主 checkout，沒有「當下 worktree」可收。
  停手告訴我，要收哪一個由我指定 —— 不要自己挑一條分支來合併。
- 兩者**不同** → 在 worktree 內 → **先用 ExitWorktree（`action: "keep"`）退回主 checkout**，
  再照下面的流程繼續。合併確實不在 worktree 裡做（worktree 是拋棄式的工作區），但這不需要停手
  —— 退出去就在主 checkout 了。三件事：

  - **一定用 `keep`，不要 `remove`。** 這個時間點分支還沒合併，`remove` 會連同還沒進預設
    分支的 commit 一起丟掉。工具本身會擋，**不要用 `discard_changes` 繞過它**。
  - **這一步同時解掉你自己造成的 lock。** EnterWorktree 開的 worktree 在 session 活著的時候
    是 `locked` 的，所以「agent 在自己開的 worktree 裡跑這個指令」必然會被下面第 2 項擋下來
    —— 那不是別的 session 佔用，是你自己。退出去 lock 就沒了，該 worktree 才輪得到被合併。
  - ExitWorktree **只認得這個 session 用 EnterWorktree 開的** worktree；不是的話它會回
    no-op。那種情況才真的停手，告訴我該回哪個主 checkout 執行。

主 checkout 路徑＝git-common-dir 去掉結尾的 `/.git`。

遇到下列任一情況就停手回報原因，不要試著繞過：

0. 「當下分支」是 `HEAD` → detached，沒有分支可合併。
1. 上面的「當下工作目錄狀態」非空 → 有未 commit 變更。那份 porcelain 是退出 worktree
   前跑的，看的就是這個 worktree。**絕不 `--force`。**
2. 退出之後 `git worktree list --porcelain` 裡這個 worktree 仍標著 `locked` →
   不是你鎖的，可能有別的 session 正在用。
3. `git merge-base --is-ancestor <預設分支> <branch>` 失敗 → 預設分支已前進，
   ff 不成立。列出該分支相對預設分支的 ahead/behind 與 commit 標題，讓我決定
   rebase／merge commit／squash。**不要自己 rebase。**

四項檢查**兩種模式都要過** —— squash 模式也一樣要求第 3 項的 ff 前提成立：
分支是預設分支的嚴格後裔時，squash 不可能產生衝突，後面的樹相等驗證也才有意義。
ff 不成立時一律照第 3 項回報，不要在 squash 模式硬併。

全部過關才動手。

**squash 模式**（預設）的順序：

- 分支只領先 1 個 commit 時改走 ff 模式的三步 —— 結果相同，還保留原本的
  message 與作者資訊，squash 反而是損失。
- 先確認**主 checkout 本身**乾淨（`git -C <主checkout> status --porcelain` 空）——
  squash 會動 index 與工作目錄，髒的 checkout 不動手，回報後停手。
- `git -C <主checkout> merge --squash <branch>`
- `git -C <主checkout> commit`，message 自己寫：第一行總結這條分支做了什麼，
  空一行後條列原本各 commit 的標題（`git log --format='- %s'` 的內容），
  讓歷史被壓掉之後還查得到原貌。
- **刪除前必驗**：`git -C <主checkout> diff --quiet <branch> HEAD` —— HEAD 的樹要和
  分支的樹完全相同，代表內容一個不漏地進了預設分支。不相等就停手回報，
  worktree 和分支都留著。
- 驗過才 `git worktree remove <path>`，然後 `git branch -D <branch>`。
  這裡必須用大寫 `-D`：squash 不留合併祖先關係，`-d` 一定會拒絕 —— 它擋不出
  意義，安全性由上一步的樹相等驗證取代。**沒驗過樹相等，絕不 `-D`。**

**ff 模式**（`ff` 引數）的順序：

- `git -C <主checkout> merge --ff-only <branch>`
- 成功後 `git worktree remove <path>`
- `git branch -d <branch>`（小寫 `-d`，未合併會自己擋下來）

收尾跑一次 `git worktree prune`。

**不要 push。** 預設分支領先 origin 幾個 commit 就照實回報，我自己推。

最後回報：分支名、worktree 路徑、commit 數、結果（已合併並清除／停手原因）；
squash 模式再加上壓成的 commit hash 與標題。單一分支不必排表格。
