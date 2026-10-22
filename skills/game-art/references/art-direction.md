# 美術指導與配色

2026-10-19 研究，2026-10-20 整理。標記：【一手】官方、講座、本人；【訪談】具名開發者在媒體的原話；【二手】轉述；【學術】辭典、論文。
沒標來源的數字是提案。

## 方法

1. **明度先行（value study／notan）**：先用兩到三階明度排畫面，再上色。「tonal design in two or three values as a separate step」
   「Color can't save a bad value design」——Gurney【一手】https://jamesgurney.substack.com/p/value-before-color 。
   Diablo III 背景暗、角色高對比【二手】https://www.gamedeveloper.com/design/gdc-2012-diablo-iii-s-art-director-shows-off-design-process ；
   Ghost of Tsushima【一手】https://vfxvoice.com/creating-the-way-of-the-warrior-for-ghost-of-tsushima/ 。
   - UE：Lighting Only（Alt+6）只看光，Unlit 只看 Base Color【一手】https://dev.epicgames.com/documentation/en-us/unreal-engine/viewport-modes-in-unreal-engine
   - 產出灰階截圖與三階縮圖；檢查主角落在自己的明度群。
2. **色彩腳本（color script）**：每段一張小圖排成一條，看整局的情緒起伏，抓出怪的段落。
   TLOU2 John Sweeney【一手】https://cookandbecker.com/en/article/250/art-directing-the-last-of-us-part-ii.html ；
   Hades 整局 color script「catch any oddities or weakness」【一手】https://mcvuk.com/?p=216051 ；
   Beast Breaker 把色彩腳本做成色彩詞彙（黃＝安全、洋紅只給敵人核心）【一手】https://www.gamedeveloper.com/art/how-color-scripting-conveyed-the-emotional-arcs-of-beast-breaker
3. **Mood board**：PureRef，內建切灰階 https://www.pureref.com/
4. **Paintover 翻回參數**：在遊戲截圖上畫出目標，再翻成引擎參數。TLOU2 後期概念組用 paintover【一手】。
   UE 的 LUT 流程【一手】https://dev.epicgames.com/documentation/unreal-engine/using-lookup-tables-for-color-grading-in-unreal-engine 。
   注意：風格化後處理放在 tonemap 之後時，LUT 會被它再處理一次；paintover 的結果要翻成那一層的參數，不走 LUT。
5. **調色盤要成群**：D4「colors need to group well」【一手】https://news.blizzard.com/en-us/article/23665024/diablo-iv-quarterly-updatejune-2021 ；
   D4 的 old masters、return to darkness、grounded natural palette【一手】https://news.blizzard.com/en-us/article/23788294/diablo-iv-quarterly-updatemarch-2022 ；
   Riot 的分層：背景對比最低 < 角色 < 特效 < UI【二手】https://www.surrenderat20.net/2014/11/red-post-collection-defining-rifts.html ；
   Gurney 的 gamut mask【一手】https://gurneyjourney.blogspot.com/2008/01/color-wheel-masking-part-1.html （Krita 內建）。
   60-30-10 法則沒有遊戲業的一手來源。
6. **語意色保留**：敵方、主角、掉落各用固定色相，環境材質不准落在那幾段。Riot 我方與敵方提示用不同色票【一手】；
   Dota 2 角色避開地圖主色【一手】。（細節見 colour-unification.md、vfx.md）
7. **形狀語言**：Riot「Silhouettes are the single most important thing」【一手】。
8. **把傳統畫法翻成渲染參數**（以中國工筆、淡彩為例）：
   - 淺絳＝以墨為主、淡上赭石花青【學術】https://projects.mcah.columbia.edu/jaanus/record/sengosansui ；
     青綠＝石青石綠，「陽面塗金，陰面加藍」【二手】；工筆順序：白描 → 打底 → 分染 → 罩色【國立臺灣藝術教育館】https://www.arte.gov.tw/pro1_exh_past.asp?KeyID=1457 ；謝赫六法「隨類賦彩」。
   - 對照：白描＝線寬與濃度；墨分染＝打光加材質去色；罩染＝保留材質色、限制光的飽和；隨類賦彩＝依材質類別上顏料；
     陽金陰藍＝暖主光、冷陰影；提染＝只提亮焦點；留白＝最亮是紙色、最暗是墨色。
   - 墨境：純寫意「no details where details are needed」，改走工筆、迭代五六輪【一手】https://rogueliker.com/realm-of-ink-interview/

## 檢查

- 灰階主角對地 ≥ 3:1（借 XAG 102；Dota 2 角色指南）。
- 最亮 5% 落在焦點。
- 1/8 縮圖的三階明度稿 ≤ 3 個大明度群。
- 保留色相在環境裡佔 ≤ 1%；環境飽和 95 百分位 ≤ 0.5，語意色 ≥ 0.75。
- 冷底 ≥ 60%、暖輔 20–35%、點綴 ≤ 10%（夜景類）。
- 相鄰材質灰階差 ≥ 0.1。
- PBR 底色 0.02–0.81（線性）【一手】https://dev.epicgames.com/documentation/en-us/unreal-engine/physically-based-materials-in-unreal-engine
- 色彩腳本：相鄰兩段在主光溫度、整體明度、點綴色至少一項不同。

## 常見坑

- 憑感覺把世界整片去色或壓黑。先做明度稿，把三個明度群排出來，再決定顏色。
- 環境材質剛好落在語意色相（紅木 ≈ 敵人紅、金飾 ≈ 首領金），讓玩家誤判；量出來就改材質，不改語意色。
- 想用全域調色解決素材之間的差距：縮小不了，放最後。

## 找不到

D4 與 Riot 的具體色彩數值、Hades 色彩的一手資料、黑神話的美術流程、大神的技術拆解、Gurney 書本內文。
