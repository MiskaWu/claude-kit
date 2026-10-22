# 素材顏色統一

混搭素材包（免費包、不同工作室）時，讓顏色看起來出自同一個世界。2026-10-19 研究，2026-10-20 整理；沒標來源的數字是提案。

## 方法

1. **底色明度範圍**：先把所有材質的 base color 夾進合理範圍。
   - Epic PBR 實測（線性）：木炭 0.02、裸土 0.13、草 0.21、新混凝土 0.51、新雪 0.81【一手】https://dev.epicgames.com/documentation/en-us/unreal-engine/physically-based-materials-in-unreal-engine
   - DONTNOD：非金屬 sRGB 50–243、金屬 186–255【一手】https://seblagarde.wordpress.com/2014/04/14/dontnod-physically-based-rendering-chart-for-unreal-engine-4/ ；
     Unity Material Validator 同範圍【一手】https://docs.unity.cn/Components/MaterialValidator.html ；
     Adobe PBR Guide：暗端 30–50、亮端 240，base color 不含 AO【一手】https://www.adobe.com/learn/substance-3d-designer/web/the-pbr-guide-part-2
   - UE：Buffer Visualization → Base Color；`HighResShot bDumpBufferVisualizationTargets 1` 匯出 G-buffer【一手】https://dev.epicgames.com/documentation/en-us/unreal-engine/taking-screenshots-in-unreal-engine
   - 風格化專案只把這組範圍當護欄。
2. **母材質加共用上色函式，所有素材走同一個節點**：KILL KNIGHT 全素材共用模組化 subgraph，「heavy emphasis on set value ranges across all elements」
   【一手】https://unity.com/en/blog/how-playside-studios-built-kill-knight-visual-identity ；
   TF2：近寫實但提高飽和與明度對比，大面積 muted、小面積飽和【一手】https://www.cs.princeton.edu/courses/archive/fall07/cos597B/papers/mitchell-team-fortress.pdf
   - 做法：建「材質類別」註冊表（石、灰泥、木、漆木、瓦、土地、金屬、布、植被……），每類一組顏料與明度範圍，貼圖只對應到類別。
   - **沒歸到類別的貼圖讓測試失敗**，不要靜默保留原色；退回原材質的也要列出來。
   - 檢查：沒走母材質的 mesh 數 0。
3. **調色盤映射（gradient map）**：每類一條「暗 → 主色 → 亮」的漸層，暗部可以偏冷。UE 用 Curve Atlas 加 Curve Atlas Row Parameter，材質實例換列；
   atlas 在編譯時烘死【一手】https://dev.epicgames.com/documentation/en-us/unreal-engine/curve-atlases-in-unreal-engine-materials
4. **全域調色放最後**：LUT（256×16，輸出後套用；Epic 建議改用 Color Grading）【一手】；Color Correct Regions 可以依 stencil 排除 actor
   【一手】https://dev.epicgames.com/documentation/en-us/unreal-engine/color-correct-regions-in-unreal-engine （跟專案其他 stencil 用途可能衝突，先試）；
   Firewatch 分色帶霧【二手】。全域調色縮小不了素材之間的差距。
5. **美術規範與審查**：Dota 2 角色指南（腳暗頭亮、不用純黑純白、避開地圖主色、上色後轉灰階在不同區域複查）【一手】https://help.steampowered.com/faqs/view/0688-7692-4D5A-1935 ；
   TF2 GDC 2008（Color Swatch、Read Hierarchy、腳暗胸亮）【一手】https://cdn.fastly.steamstatic.com/apps/valve/2008/GDC2008_StylizationWithAPurpose_TF2.pdf ；
   Diablo III 三層、背景 stylizing and dimming【二手】。
6. **批次風格 pass**：UE Texture 的 adjust_brightness／saturation／vibrance／hue（Python API）【一手】https://dev.epicgames.com/documentation/en-us/unreal-engine/python-api/class/Texture ；
   Substance Sampler 的 PBR Validate【一手】。
7. **特效顏色另一張表**：灰階貼圖乘色帶；只有特效可以超過世界的飽和上限；敵方用世界沒有的色相。

## 寫實角色與風格化場景並存

1. **往中間拉**：去掉高頻細節（TF2；Kuwahara 這類濾鏡把寫實明暗攤成色塊）。
2. **不求一樣，求層級**：Diablo III 壓暗背景、Dota 2 角色避開地圖主色。
3. **共用收尾層**：同一張紙紋、同一套線、同一組光色、同一套顏料。只做前兩項，角色仍會像「貼在場景上」。

## 素材進場流程

指定材質類別 → 中性光下的 line-up 截圖 → 跑檢查 → line-up、遊戲鏡頭、灰階三張圖進視覺審查文件。

## 檢查

- 非金屬 base color sRGB 50–243（線性 0.032–0.896，暗端最多放寬到 30）；金屬 180–255【一手：DONTNOD、Unity】。
- 超出範圍的像素 ≤ 2%。
- 同類材質跨素材包的明度中位數差 ≤ 25（sRGB）。
- 淡彩類風格：95% 像素飽和 ≤ 0.35、點綴 ≤ 10%。
- 飽和 > 0.15 的像素，12 格色相的前 3 格 ≥ 80%。
- 角色上身對地 ≥ 3:1（Dota 2 角色指南）。

## 找不到

Naughty Dog、Guerrilla、Ubisoft 的 art bible；City Sample 的統一方法；Quixel 的校色流程；飽和上限與主色相數的公開數字。
