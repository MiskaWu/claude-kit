# 管線的技術細節與坑

## 為什麼不錄螢幕

即時錄影（screencast、MediaRecorder、OBS）照牆上的時鐘跑：機器一慢就掉幀、畫面沒變就不出幀、幀率漂移。
無頭瀏覽器的 canvas 是 CPU 光柵化，一格 1080×1920 要上百毫秒，即時錄一定掉。
做法是**虛擬時鐘**：頁面以為時間只過了 1/60 秒，其實我們等它畫完、截完圖才推下一格。

## 虛擬時鐘（templates/vclock.js）

用 `context.addInitScript` 在頁面任何腳本之前注入。接管：

| 東西 | 為什麼 |
|---|---|
| `performance.now`、`Date` | 遊戲主迴圈與特效用它算 dt |
| `requestAnimationFrame` | 排進佇列，`__vt.advance(ms)` 時才跑一輪 |
| `setTimeout`／`setInterval` | 照虛擬時間到期（例如落地後延遲 120 毫秒的音效） |
| CSS 動畫與轉場 | `document.getAnimations()`：第一次看到記下虛擬起點、暫停，之後每格把 `currentTime` 設成虛擬經過的時間 |
| `Math.random` | 固定種子：粒子、鏡頭震動每次一樣，分段平行錄才接得起來 |
| `AudioContext` | 換成**同一個** `OfflineAudioContext` 的子類別，`currentTime` 讀虛擬時間；`new` 幾次都回同一個（遊戲音效與配樂才在同一條時間軸）。`destination` 換成一條匯流排（調遊戲音效音量），真正的出口叫 `realDestination` |

坑：

- **Playwright 的 `page.clock` 不適用**：底層 fake-timers 的 rAF 每 16ms 一格，不是 1/60 秒，按 60fps 推會偶爾一格跑兩次或零次。
- **浮點累加器**：遊戲常寫 `acc += dt; while (acc >= step)`。每格剛好推 1000/60 毫秒時，浮點誤差會讓某些格少跑一步（畫面頓一下）。
  每格多推一點點（`1000/60 + 1e-7`），誤差就永遠落在「夠跑一步」那一側。
- `OfflineAudioContext.resume()` 在開始算之前呼叫會 reject：子類別覆寫成直接 resolve。
- 子類別的 constructor 要回傳既有的那一個時，**在 `super()` 之前 `return`**。

## 導演頁

- 只 import 遊戲本身的模組；導演自己只有：分鏡解析、錄影鏡頭、疊加層（字卡、裝置鈕、片尾卡、白閃）、配樂。
- **時間換算**：先把每條劇本空跑一遍（不出聲、不畫），量出各事件發生在第幾秒（含遊戲自己的落地慢動作）；
  分鏡的切入點寫「事件 ± 時間」，`align` 讓某個事件剛好落在鏡頭內的某一拍。
- **切到新的一局**：重置主迴圈、換成不出聲的音效、一步一步快轉到切入點、再把音效接回來；不然倒數的嗶聲會在切點一起響。
- **接著上一個鏡頭（cont）**：同一局不重來，只換速度、取景或凍結。變速就是每格推 `dt × speed`。
- 片尾卡疊在仍在跑的遊戲畫面上，用 `backdrop-filter: blur()` 模糊掉背景（飛過的零件會變成光點，不會像畫面壞掉）；代價是那幾格截圖慢一倍。
- 放在 `src/` 底下讓型別檢查涵蓋它：遊戲改了 renderer，導演頁編不過就會在 CI 紅，不會等到要出片才發現。
- 用 Vite 的另一個 mode 打包到不進版控的資料夾（例如 `vite build --mode video` → `dist-video/director/`），不跟著正式站出貨。

## 錄影鏡頭

- 給 renderer 的 `Frame` 加一個選用的 `camera`（中心的世界座標、畫面看得到幾公尺高），有給就不用遊戲自己的鏡頭。只加欄位，不改原本的行為。
- 跟拍：中心＝主角位置＋速度×前瞻秒數；遠近在對數空間內插；**地面最高只到畫面某個比例**，主角在地上時才不會露出半個畫面的地底。
- 高速（變速 3 倍）時平滑會追不上：那個鏡頭把平滑設成 0（硬跟），再加一點前瞻。
- 每個階段一個預設取景（auto）：貼軌跟車、倒置段拉近、飛行拉遠看落點、落地貼近看摔車。

## 截圖與輸出（templates/render.mjs）

- CDP 的 `Page.captureScreenshot` 預設是 **CSS 像素**：要 `clip.scale = deviceScaleFactor` 才是畫布的原生解析度。
  Playwright 的 `page.screenshot({ scale: 'device' })` 也行，但慢。
- **一段一個瀏覽器**：同一個瀏覽器裡的多個分頁共用一條合成管線，截圖會互相排隊（實測一個瀏覽器開 6 頁，每格慢將近一倍）。
- 分段平行：每段都從第 0 格跑到自己的起點（照畫、不截圖），狀態才跟單段跑的一模一樣。聲音另開一頁整支跑一遍（不截圖）。
- 導演頁用 ES module，`file://` 載不進來：輸出腳本自帶一個靜態伺服器。
- 字型從外部載入時，開錄前對每個字重與語系 `document.fonts.load()` 一次，等全部下載好。
- RGB 轉 YUV：`scale=out_color_matrix=bt709:out_range=tv,format=yuv420p`，並標 `-colorspace bt709 -color_primaries bt709 -color_trc bt709`，不然播放器會偏色。
- 中間檔用很低的 crf（畫質近乎無損）；成品照研究文件的平台規格（H.264 High、yuv420p、faststart、AAC 48k）。
- 響度：`loudnorm` 單段的動態模式會差好幾 dB；先 `print_format=json` 量一次，再把量到的值帶回去 `linear=true`。
  真峰值上限會擋住增益，結果可能比目標低一兩 dB，平台會再正規化，可以接受。

## 檢查

- 接觸表（每秒一格）看全片結構；抽關鍵幀（鉤子第一格、撞擊、數字跳完、片尾）看全尺寸。
- 量響度與峰值（`ebur128=peak=true`），短時響度每半秒印一次，看全停與撞擊有沒有出來。
- 每條劇本的成績印出來，和分鏡字卡上的數字對得上。
- 沒辦法驗的：好不好聽、真機上字夠不夠大。交給使用者。
