# 燈光

2026-10-19 研究，2026-10-20 整理；沒標來源的數字是提案。

## 方法

1. **固定量尺**：曝光固定、光用物理單位，否則每盞光都在跟自動曝光打架。D4 以物理為基礎打光【一手】https://news.blizzard.com/en-us/article/23788294/diablo-iv-quarterly-updatemarch-2022 。
   - UE：1 cd = 625 unitless【一手】https://dev.epicgames.com/documentation/en-us/unreal-engine/using-physical-lighting-units-in-unreal-engine 。
     **C++ 建立的點光預設是 Unitless**（UE 5.8 `LocalLightComponent.cpp`），數值要換算再比較。工具：HDR 直方圖、Pixel Inspector。
2. **由大到小**：天空 → 主光 → 霧 → probe → 次要光 → 後處理。Ubisoft Bruno Fontan【一手】https://cgmasteracademy.com/blog/bruno-fontan.html ；
   Hardsuit Labs Adam Alexander【一手】https://80.lv/articles/working-on-lighting-for-video-games 。
   UE：`viewmode lightingonly`／`lit_detaillighting`。檢查：只看光就指得出主光方向。
3. **Key／Fill／Rim**：「沒幫到形體、對比或焦點的光就不需要」——Yon Lee【一手】https://80.lv/articles/lighting-in-3d-art-why-it-matters-how-to-improve-it/
4. **明暗分 3–4 組**：D4 參考 Rembrandt 控制明暗範圍【一手】；Fontan：避免純黑純白，用去飽和的截圖檢查【一手】。遊戲業的分組一手文獻沒找到。
5. **用光引導視線**：路線外的亮點會把玩家引到無趣處（Fontan【一手】）；Diablo III 角色高對比光、背景壓暗【二手】。
   檢查：每段最亮的光池在出口或主路線上。
6. **可讀性打光**：D4「silhouetting the player space」、地城「oppressively dark, very selective lighting」【一手】；
   V Rising 用後處理壓暗、靠鏡頭附掛的物件，體積霧影響最大【一手】https://unity.com/resources/stunlock-studios-v-rising
7. **選擇性陰影與光源預算**：
   - PoE 同時投影約三盞，其餘改螢幕空間點光陰影【一手】https://pathofexile.com/forum/view-thread/2198905
   - Epic：3 盞投影的可移動點光，陰影深度 > 14 ms，快取後約 1 ms【一手】https://dev.epicgames.com/documentation/en-us/unreal-engine/movable-light-mobility-in-unreal-engine
   - `viewmode lightcomplexity`；MaxDrawDistance、MaxDistanceFadeRange 淡出；MegaLights（UE 5.8 Production Ready）省 GPU，不解 CPU 瓶頸【一手】。
   - 雜兵的即時陰影最貴：UE 5.8 虛擬陰影下，44 隻骨架網格雜兵每幀約 7 ms 渲染執行緒、6 ms GPU（陰影 draw 687 → 121）；
     改回 CSM 反而更慢。雜兵改用腳下的柔邊接地影（貼花），主角、精英、首領保留真陰影【實測，2026-10】。
8. **量渲染執行緒**：
   - `stat initviews`：「Visible section count is the single most important stat with respect to rendering thread performance」【一手】https://dev.epicgames.com/documentation/en-us/unreal-engine/stat-commands-in-unreal-engine
   - 靜態網格的繪製指令會快取；粒子與骨架網格每幀重跑【一手】https://dev.epicgames.com/documentation/en-us/unreal-engine/mesh-drawing-pipeline-in-unreal-engine
   - Niagara 成本隨 renderer 與 view 數增加，System／Emitter 腳本在 CPU，用 Effect Type 剔除【一手】。
   - Unreal Insights：`-trace=default,gpu,rhicommands,rendercommands -statnamedevents`；CsvProfile；用 Test 組態量。
   - A/B 用 ABAB 交替、取中位數，差距要超過雜訊才算。固定場景（敵人站定不動、不會死），基準夾在每個變體之間看漂移；
     邊打邊量的場景會隨敵人死亡而變，前後變體不可比【本專案實測】。
   - 跨次比較看計數（draw call、圖元、陰影 draw、同步載入），不只看 fps：同一台機器兩次之間可以整體差 15–20%【本專案實測】。

## 光池半徑的算法

用照度換算「比環境光亮的半徑」。例：月光地面照度約 1.36 lux 時，28.8 cd 的火把約 2.8 m 內比月光亮，約 7.8 m 降到月光的十分之一；
衰減半徑設得比這遠，外圈幾乎沒有貢獻、只花成本。（推算，要實測）

## 檢查

- 成品截圖 3–4 個明暗組，暗組 ≥ 30%；純黑（< 2%）與純白（> 98%）的像素各 ≤ 1%。
- 光池中心對環境 ≥ 3:1。
- 最暗的區域刷滿敵人，灰階下主角對地仍 ≥ 3:1。
- Light Complexity 大部分 ≤ 3。

## 找不到

ARPG 每畫面的光源數、PC draw call 的官方建議、Lost Ark 的打光講座、Diablo III 的 deferred 講座（Hades 是預渲染，不適用）。
