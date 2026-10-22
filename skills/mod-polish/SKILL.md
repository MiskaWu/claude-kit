---
name: mod-polish
description: 把 Claude Code mod 的面板做精緻：先出設計稿，桌面版用 SVG 畫成卡片（純函式 visual.ts）、終端機照舊用文字，深淺主題、截圖自檢後才交。做或改有畫面的 mod（/指令打開的面板 Pane、對話框上方的狀態列 AbovePrompt、狀態卡、清單）時使用，和 plugin-authoring 一起載入；使用者說面板「不夠精緻」「醜」「美觀」「像 braid 那樣」「用 SVG 畫」時也用。
---

# mod-polish —— mod 面板的美觀

從 [braid](https://github.com/MiskaWu/braid)（多帳號面板）和一個編輯器自動化工具的狀態面板（2026-10）帶出來的做法。
API 怎麼用看 plugin-authoring 技能；**這裡管長相**：使用者要的是面板一打開就像正式產品，不是一排 Text 和 Button。
只用文字和按鈕排的面板，使用者兩次都說「不夠精緻」——有畫面的 mod 一開始就照這裡做。

## 0. 先看有沒有現成的

mod 已經有 `hooks/visual.ts` 就照它的配色與積木延伸，不另起一套。沒有就從 [kit/visual-kit.ts](kit/visual-kit.ts) 複製一份當起手式。
參考實作（照抄形狀最快）：

| mod | 檔案 | 有什麼 |
|---|---|---|
| braid | [`mod/hooks/visual.ts`](https://github.com/MiskaWu/braid/blob/main/mod/hooks/visual.ts) | 帳號卡（頭像、標籤、用量量表＋門檻刻度）、流程圖、頁首用量條 |

## 1. 流程：設計稿 → 畫圖函式 → 截圖自檢 → 接進面板 → 給他看真畫面

1. **設計稿先行**。用 Artifact 的 Design 畫布畫每個畫面（面板 440 寬、可以點的情境），第二排放對話框上方的狀態列與 CLI 版。
   使用者看過說好才寫程式。
2. **寫 `hooks/visual.ts`**：純函式，給資料、回 `{ source, alt, height, animated? }`，不碰 `$`，可以單獨跑、單獨測。
3. **截圖自檢**（第 4 節）：深淺兩套、每個情境一張，自己讀 PNG 挑問題、改到沒問題才往下。
4. **接進 `register.tsx`**（第 2 節的版面規則），終端機留文字版。
5. **測試**（第 5 節）＋型別檢查。
6. **給他看真畫面**：外掛是從資料夾讀的（`claude plugin list` 顯示 `Read from:`），把改動放進那個資料夾後請他 `/reload-plugins`；
   否則 `claude --plugin-dir <mod>` 開一個對話。截圖用 SendUserFile 附上，他在手機上也看得到。

## 2. 面板的版面規則

- **圖只負責看，按的一律是 Button**。SVG 裡畫不出能按的東西（`isInteractive` 只開 hover、動畫、tooltip，不收點擊）。
- 一個區塊＝段落標題 `<Text bold dimColor>` ＋ 圓角外框 `<Box borderStyle="round" paddingX={1} paddingY={1} gap={1}>`，
  框裡是「一張圖＋一排按鈕」。狀態好／選中時外框染上語意色（`borderColor`）。
- 頁首一張圖：標誌＋名稱，右邊放最重要的狀態（工作方式、連線、用量）。
- **終端機沒有 Svg，要自己排除**：`const Svg = e.surface !== 'terminal' && 'Svg' in table ? table.Svg : undefined`。
  終端機的元件表裡**也有** `Svg`，畫下去整棵樹被拒、引擎改畫它自己的（面板一片空），而且不報錯。
- 終端機版照舊用 Text／Button，按鈕的 key 兩邊一樣（測試和使用者習慣都靠它）。
- 每張圖一定要 `alt`，而且要把圖上的資訊說完整：讀不到圖的介面只剩它，測試也靠它找字。
- 有動畫才給 `isInteractive`（例如「啟動中」的呼吸點），平常是靜態圖。`source` 上限 131072 字元。

## 3. 視覺語言（kit/visual-kit.ts 已經寫好，照用）

- **寬 420**（Svg 不給寬度，取圖本身的寬、最多到欄寬）。字級：標題 14～16 粗、內文 12～12.5、註記 11、路徑等寬 10.5～11。
- **文字三階** t1／t2／t3、細線 `hair`、淡底 `panel`、圖示線 `ink`；狀態 `ok`／`warn`／`crit`。
- **強調色 1～2 個、要有語意**（例如：直接改＝橘＝「你自己的 checkout」、工作副本＝藍；braid：每個帳號一個色）。
  每色四個 class：`.x` 實心、`.xS` 線、`.xK` 淡底、`.xT` 文字（深一階，淡底上也讀得清）。不要把一般文字塗成強調色。
- **深淺兩套寫在 SVG 自己的 `<style>`**，`@media (prefers-color-scheme: dark)` 切換；桌面 app 面板深色底約 `#1a1a19`。
- **狀態不只靠顏色**：點／圖示＋字（「● 已連線」「落後你的 main」）。
- 常用積木：`statusRow`（40×40 圖示底塊＋右下狀態點＋標題＋說明＋右側膠囊，高 48）、`pill`（膠囊，可左／中／右對齊）、
  `tile`、`hairline`、`icons`（線稿約 20×18、線寬 1.5～1.8）。示意圖用「框＋箭頭＋徽章」講清楚「在哪裡、指向誰」。
- 字型用系統字堆疊（Segoe UI／PingFang TC／微軟正黑體……），和桌面 app 本身一致；設計稿（HTML artifact）才用 artifact-fonts 規則的字型。

## 4. 截圖自檢

SVG 不會量字、不會換行，估錯就截斷或重疊，**不截圖看不出來**。工具在 [kit/](kit/)：

1. 把 `preview.mts`、`shoot.sh` 複製到 scratchpad（不放進 mod 的 repo），改 visual.ts 的路徑，照 register.tsx 的版面把每個情境排出來
   （空的、滿的、出錯的、動畫中的、還沒設定的）。
2. `node preview.mts`（node ≥ 23 直接跑 TS），`./shoot.sh <情境> light|dark [高度]`：Playwright 的 chrome-headless-shell、2 倍解析度。
3. 用 Read 看 PNG，逐張對這份清單：
   - 字有沒有被截、和別的東西重疊；路徑截前面留結尾（`fit(..., keepEnd)`）。
   - **線穿過標籤**（時間軸上的膠囊）：線要在標籤兩側斷開，不是靠底色蓋。
   - **標點跑到行首**：`wrap` 會把「，。、」接回上一行。
   - **孤字**（換行後下一行只剩一兩個字，例如「景）」）：改文案，或在文案裡用 `\n` 指定斷點、每段各自 `wrap`，
     讓每行是完整的一句；說明會長的卡片高度跟著行數變，不要固定成一行再截掉。
   - 深色主題下的對比（淡字、強調色字），選中／狀態的外框顏色對不對。
   - 留白：卡片上下不要擠也不要空一大塊；同一面板裡各卡左緣對齊。
4. 改完重截同一組比前後。給使用者看時附最關鍵的一兩張。

坑：`shoot.sh` 用相對路徑組 `file://` 會截到**全白**的頁、不報錯——kit 版已經用絕對路徑。

## 5. 測試（claude plugin test）

- 每個面板測試在 `['terminal', 'desktop']` 都 mount 一次。找字用「文字或圖的 alt」：
  `(await ui.find({ text })) !== undefined || (await ui.findAll({ type: 'Svg' })).some(el => text.test(String(el.props.alt ?? '')))`。
- 加一條**桌面有幾張圖、終端機 0 張**的斷言；有動畫的情境斷言那張圖 `isInteractive`。
  把「終端機排除 Svg」那行拿掉時這條要紅——用變異測試確認一次。
- `find({ text })` 比對單一字串子節點：`<Text>● 已連線（{root}）</Text>` 是三段，找不到；寫成模板字串 `` {`● 已連線（${root}）`} ``。
- 同一個測試裡桌面、終端機的 mount 用不同變數（型別不同，tsc 會擋）。
- 型別檢查：repo 外放一份 tsconfig（plugin-authoring 型別檔開頭那份），include 型別檔與 mod 的 `hooks`、`types`，
  `npx -y -p typescript@5.6.3 tsc -p <那份>`；`claude plugin validate <mod>` 也要過。
