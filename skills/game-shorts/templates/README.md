# 範本

從一個實際專案抽出來（2026-10）。複製到專案時照專案的結構放，例如 `web/scripts/video/`（vclock、render、分鏡 JSON）
與 `web/src/video/`（board、music、導演頁、樣式）。

| 檔案 | 通用程度 | 要改什麼 |
|---|---|---|
| `vclock.js` | 通用 | 不用改 |
| `render.mjs` | 通用 | 導演頁的路徑（`SITE`）、輸出尺寸（`VIEW`）、要預先載入的字型清單 |
| `music.ts` | 通用 | 和聲進行、音色；段落與剪輯音效的種類跟 `board.ts` 對齊 |
| `board.ts` | 大致通用 | 事件名稱（劇本裡有哪些事件）、字卡樣式清單 |
| `director.css` | 參考 | 字卡、裝置鈕、片尾卡的樣子，照遊戲的設計語彙改 |
| `board-example.json` | 參考 | 一份真的分鏡（差一點 → 完美落地） |

導演頁本身（`web/src/video/director.ts`、`camera.ts`、`takes.ts` 這類檔案）和遊戲綁很深，不放範本，照 pipeline.md 的說明對照著寫。
`render.mjs` 對導演頁的要求只有：

```ts
window.director.load(board, locale)  // → { frames, fps, duration, takes: { 劇本名: { score, carnage, grade, … } } }
window.director.render(frame)        // 畫第 frame 格（呼叫前 __vt.advance 推好時間）
window.director.audioStart()         // 第 0 格的虛擬時間（毫秒），聲音從這裡切
```
