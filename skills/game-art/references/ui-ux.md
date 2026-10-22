# UI／UX

2026-10-19 研究，2026-10-20 整理；沒標來源的數字是提案或借用網頁標準。

## 方法

1. **玩家輪廓與任務流程**：每個任務寫成「觸發 → 看到 → 按 → 回饋 → 成功／失敗」。
   Blizzard Diablo UX 職缺：flows、mockups、prototypes、layouts，與 User Research、analytics 合作【二手】。
2. **啟發式評估**：Nielsen 10 條【一手】https://www.nngroup.com/articles/ten-usability-heuristics/ ；
   Hodent 易用性 7 支柱（signs & feedback、clarity、form follows function、consistency、minimum workload、error prevention、flexibility）
   加 engage-ability 3 支柱【一手】https://celiahodent.com/gamers-brain-part-3-ux-engagement-immersion-retention-gdc17-talk/ ；Pinelle CHI 2008、Desurvire HEP。
   - NN/g 的做法：3–5 人獨立評、兩輪、嚴重度 0–4，3、4 級清零【一手】https://www.nngroup.com/articles/how-to-conduct-a-heuristic-evaluation/ 、
     https://www.nngroup.com/articles/how-to-rate-the-severity-of-usability-problems/
   - 沒有多位評審時：隔天再評一次，加一個只看截圖的獨立 agent 評。
3. **線框 → 模型 → 原型**：D4「Visual polish is one of the last things we focus on」；技能列依易用性測試改回底部中央；
   圖示改 3D 渲染並降低背景飽和；稀有度用邊框，不只靠顏色【一手】https://news.blizzard.com/en-us/article/23308274/diablo-iv-quarterly-updatefebruary-2020 。
   UE 用 CommonUI 處理輸入路由【一手】。
4. **易用性測試**：5 人找出約 85% 的問題，3 輪 × 5 人優於一次 15 人【一手】https://www.nngroup.com/articles/why-you-only-need-to-test-with-5-users/ ；
   動作遊戲用回顧式放聲思考（錄影後陪看）【學術】https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7294419/
5. **遙測**：「Telemetry … WHAT is going on, but not easily WHY」（Hodent【二手引述】https://www.gamedeveloper.com/design/a-quick-ux-lesson-from-gdc-masterclass-teacher-celia-hodent ）；死亡熱圖。
   UX 事件（按了被拒、教學步驟、受擊時前搖在不在畫面內）要和畫面上的回饋從同一個呼叫送出，兩者才不會分岔。自動玩家的數據只當基線。
6. **HUD 層級**：diegetic／non-diegetic／spatial／meta（Chalmers 2009 與 DICE）【一手】https://odr.chalmers.se/handle/20.500.12380/111921 ；
   Riot：注意力對應重要性、shadow test【一手】；工作記憶約 4 組塊【一手】https://pubmed.ncbi.nlm.nih.gov/11515286/
   （推論：常駐要盯的資訊 ≤ 4 類，不是業界標準）。
7. **Style guide／design system**：色票、字級、間距、圖示、狀態集中成單一來源（UE 的 Text Style、Button Style【一手】）。
   **畫面上每個顏色都追溯得到色票名稱**；程式裡直接寫死的顏色是待修項目。繪製層只收代號，對比由繪製層保證。
8. **動效**：回饋約 100 ms、大變化 200–300 ms、一般 ≤ 400 ms，到 500 ms 就覺得拖；進場 ease-out，退場比進場短
   【一手】https://www.nngroup.com/articles/animation-duration/ ；0.1／1／10 秒反應時間【一手】。時間與曲線也進單一來源。
9. **無障礙**：XAG v3.2【一手】https://learn.microsoft.com/en-us/gaming/accessibility/guidelines ；GAG 基本級【一手】https://gameaccessibilityguidelines.com/basic/ ；
   D4 的無障礙選項【一手】https://news.blizzard.com/diablo4/23954932

## 檢查

- 最小字高：PC 1080p 18 px（量字形上伸到下伸；XAG 101），主機或電視 26 px；至少 2 檔字級。
- 200% 縮放不失內容。
- 中文每行 ≤ 40 字、行距 ≥ 1.5。
- 對比：一般 4.5:1、大字（≥ 36 px）3:1、停用 3:1、高對比模式 7:1，都在背景對比最低處量（XAG 102）。
  文字色疊在半透明底板上，底下分別墊純白與純黑都要過；灰階下危險狀態仍分得出來。
- 點擊目標 ≥ 24×24，重要的 44×44（借用網頁標準）。
- 輸入到可見回饋 ≤ 100 ms（60 fps 錄影 ≤ 6 幀）。
- 易用性測試每輪 5 人。
- 錄影自評：靜音、灰階、200%、離螢幕 2 公尺各看一次。

## 找不到

D4 的 UI GDC 演講；PoE2 與 Hades 的 HUD 流程；Ubisoft 公開的 UX 指南；Riot 的 UX 研究流程；3A 用 Figma 或眼動儀的一手案例；
遊戲專屬的點擊與動效數字。
