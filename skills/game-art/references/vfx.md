# 特效

2026-10-19 研究，2026-10-20 整理。業界沒有公開的幀數與畫面佔比標準，下面的數字都是提案。

## 方法

1. **主元素與次元素**：主元素就是判定形狀的外緣，明度範圍高、對比強、剪影清楚；次元素只負責烘托。
   重要性階梯：待機 < 防禦 < 普攻 < 傷害技 < 大招，吸引的注意力要配得上重要性。
   - Riot VFX Style Guide p6–11【一手】https://web.archive.org/web/2019/https://nexus.leagueoflegends.com/wp-content/uploads/2017/10/VFX_Styleguide_final_public_hidpjqwx7lqyx0pjj3ss.pdf
   - Riot Clarity in League【一手】https://www.leagueoflegends.com/en-us/news/dev/clarity-in-league/
   - D4 Daniel Briggs：「We reserve visually loud FX for powerful skills」，特效要在任何區域、任何光線下都讀得出來
     【一手】https://news.blizzard.com/en-us/article/23746639/diablo-iv-quarterly-updatedecember-2021
2. **三段節奏**：前搖、命中、消散都要有；消散是次元素（降明度、飽和、不透明）；節奏非線性，縮短停留。
   Riot p32–36；VFX Apprentice（節奏 > 60 BPM 具攻擊性）【二手】https://www.vfxapprentice.com/blog/the-soul-of-effects-what-is-timing-in-vfx ；
   Julian Love GDC 2013「The VFX of Diablo III」【一手，付費】https://www.gdcvault.com/play/1017660/ 。
   UE 慢放：`fx.Niagara.Debug.PlaybackMode 2`、`PlaybackRate 0.1`。
3. **明度與色彩**：不用 0% 或 100% 的明度與飽和；相鄰色為主，互補色一主一次；我方與敵方提示用不同色票（Riot p13–26）。
   D4：特效多做成自發光，暗處才讀得到。先用黑白做明度，最後上色。
   亮底上 additive 會被洗掉，焦點改用 premultiplied（realtimevfx 社群）。UE 用 Curve Atlas 做漸層上色
   【一手】https://dev.epicgames.com/documentation/en-us/unreal-engine/curve-atlases-in-unreal-engine-materials
4. **形狀語言**：手繪、細節精簡、軟硬混用；避免照片質感與過多細節（Riot p28–30）。
   高速粒子要有方向形或動態模糊；投射物在靜止畫面也要看得出方向（Riot Clarity）。
5. **程序筆觸與 alpha erosion**：Diablo III 多層捲動雜訊相乘 ×2（JangaFX 2026【二手】https://jangafx.com/insights/diablo-3-vfx-experiments ）；
   SmoothStep erosion 加 Dynamic Parameter 隨壽命 https://vfxdoc.readthedocs.io/en/latest/shaders/alpha-erosion/ ；
   80.lv UE5 墨捲軸【二手】https://80.lv/articles/see-how-to-set-up-stylish-ink-scroll-vfx-in-unreal-engine/ ；
   UE 的 Texture Graph、Niagara Flipbook Baker【一手】。
6. **逐格與 smear**：Guilty Gear Xrd GDC 2015 講稿：關閉插值、每幀刻意變形【一手】https://www.ggxrd.com/Motomura_Junya_GuiltyGearXrd.pdf 。
   UE：`floor(Time×12)/12`、SubUV 關幀間混合、erosion 門檻量化成 3–4 階；smear 用 1–2 幀拉長的弧形 mesh。smear 特效的專門一手來源沒找到。
7. **預算**：Shader Complexity／Quad Overdraw、Niagara Debugger、`fx.budget.enabled`、Effect Types 預算【一手】；
   避免 warmup、分散 burst、少量大實例；能用 masked 或不透明就不用半透明。
8. **審查**：Riot 式「ACCURATE／INACCURATE」正反例並排。每個特效截前搖峰值、命中、消散、結束四張 × 灰階 × 風格化後處理開關。

## 檢查

- 每個招式在資料裡寫三段幀數與主元素的判定形狀，由測試驗證。
- 命中峰值與傷害同幀 ±1；消散的不透明度峰值 ≤ 命中的 60%。
- 分級與同時存在上限，例如 minor 12、major 4、signature 1。
- 畫面佔比：minor ≤ 5%、major ≤ 15%、signature ≤ 35%；普攻 ≤ 0.5 s。
- 敵方前搖不被風格化後處理吃掉（用 stencil 或 Before Translucency 排除，A/B 驗證）。
- 敵方傷害區用世界裡沒有的色相；色盲模擬（Color Oracle）下仍分得出來。

## 找不到

Overwatch 的 VFX GDC 專題；Hades、黑神話、影之刃零的特效拆解；大神的技術細節；業界的幀數與畫面佔比標準。
