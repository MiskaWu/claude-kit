# 風格化渲染（技術美術）

2026-10-19 研究，2026-10-20 整理。毫秒數是推估，要用 ProfileGPU 實測。

## 先找根源

後處理風格（水墨、卡通、繪本）常見三個症狀：角色與場景不一致、線條只來自深度、色塊感不足。多半是同一個根源：
**明暗與顏色都從最終的 SceneColor 取**，素材的高頻細節直接進了明暗分階。

解法是**把明暗與顏色拆開**：明暗 = SceneColor ÷ DiffuseColor，顏色 = G-buffer 的 BaseColor。
UE 注意：開著 Substrate 時，後處理讀 DiffuseColor 可能讀不到底色；實作前先驗證 SceneTexture 的可讀性
（或改用 Substrate Blendable GBuffer、關掉 Substrate）。

## 方法

1. **多來源邊緣**：深度（輪廓，用相對差）、法線（摺痕，1 − dot）、BaseColor 差（每類材質一種顏料時，等於免費的材質 ID 圖）、
   stencil（角色剪影）；3×3 取樣，約 0.2–0.4 ms，不吃渲染執行緒。
2. **筆性**：逐像素線寬（筆鋒方向夾角、背光加粗、低頻噪聲）；斷筆、飛白＝線遮罩 × 沿切線拉長的噪聲；噪聲用世界座標，避免 shower door。約 +0.1–0.3 ms。
3. **Inverted hull**：每個 mesh 多一個 draw（吃渲染執行緒），只給主角與首領。ASW CEDEC 2024：頂點色 A 控線寬、線寬 ∝ 相機距離 × tan(FOV/2)、
   平滑法線存在 Tangent【一手】https://docswell.com/s/ASW_Academy/5LVY67-GG-Toonline-Eng
4. **分階**：先去 albedo 再量化（tonemap 之前），smoothstep 分階；金屬的 DiffuseColor 是 0，要另外處理。
   台大 Yeh & Ouhyoung 的中國畫動物渲染用 0.4／0.6／0.9 三個閾值分四階【學術】。
5. **Anisotropic Kuwahara**：結構張量 → 模糊兩次 → 8 扇區濾波（Kyprianidis 2009）；限 stencil 或半解析度，全螢幕約 1–3 ms。
   用途：把寫實角色的明暗攤成色塊；代價是小細節（鉚釘）變淡，輪廓靠描邊撐。
6. **顏料模型**（MNPR，https://github.com/semontesdeoca/MNPR）：C' = pow(C, d)，d 是密度；邊緣暗化（wet edge）；gaps & overlaps。
   Curtis 1997 的 Kubelka-Munk glaze。
7. **紙**：紙紋 UV 隨相機平移，跟著地面走；宣紙滲化＝半解析度模糊的墨 × 纖維噪聲閾值。
8. **同一條管線兩組參數**：例如工筆（細勻連續的線、分染＝線遮罩 × AO、罩染）與淡彩（分階加筆性線為主、低密度淡色、可溢線、wet edge）。
9. **寫實角色融入**：角色 ID 遮罩查世界的顏料表、法線強度約 0.3、roughness 1、分階交給第 4 項。

## 套用順序

先做 A/B 工具（逐層開關、暫停加高解析截圖、`stat unit`、ProfileGPU）→ 拆明暗與顏色 → 多來源線 → 筆性 → 世界母材質收斂 → 色層 → 紙 →
角色 → 選配 inverted hull。效能目標（提案）：第 2–8 項合計 ≤ 3 ms GPU，不增加 draw call。

## 案例

- 大神：起初寫實，因一張水墨的天照轉向（Iwata Asks，神谷英樹【一手】）；CEDEC 2009 是頒獎，沒有技術講座【二手】https://game.watch.impress.co.jp/docs/news/312636.html
- Guilty Gear Xrd GDC 2015【一手】https://gdcvault.com/play/1022031/
- Sable：平塗 → 光 → 霧 → 線分層，線隨距離淡出【二手】https://www.gamedeveloper.com/marketing/how-shedworks-refined-the-art-of-sable-in-pursuit-of-readability
- Hi-Fi Rush：客製 deferred toon renderer【一手摘要】https://gdcvault.com/play/1034251/3D-Toon-Rendering-in-Hi
- 原神：PBR based stylized、不用 ACES、shader 模擬色相偏移【一手】https://docswell.com/s/UnityJapan/KWRPQ5-210617-unity-dojo20211mihoyozhenzhongyi
- 墨境：寫意在移動中失去空間感與邊緣，改「more like gongbi」【一手】https://rogueliker.com/realm-of-ink-interview/
- 學術：Bousseau 2006、Curtis 1997、Kyprianidis 2009、NPAR 2017 edge／substrate、Heritage Science 2022 水墨山體。
- UE 5.8 Release Notes：實驗性的 Substrate Toon Shading；Post Process Materials 文件【一手】。

## 找不到

User Scene Texture 的詳細用法、Overlay Material 的起始版本、Substrate 下各 SceneTexture 的可讀性、大神與 Arcane 的技術一手資料；
沒有任何已上市 3D 遊戲公開過水墨後處理的一手技術拆解。
