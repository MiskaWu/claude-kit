# 俯視角 ARPG「AAA 級呈現」驗收準則（類型參考）

2026-10-19 為一個 UE 俯視 ARPG demo 整理（使用者要求「具體 3A 的驗證標準，查當前的遊戲去收集」），2026-10-20 收進 game-art 當類型參考。
參考作品：Diablo IV、Path of Exile 2、Last Epoch、Hades／Hades II、Lost Ark、火炬之光：無限、黑神話：悟空，東亞武術動作另參考臥龍、隻狼、影之刃零。

**怎麼用**：挑對得上的條目抄進專案自己的驗收清單，記目前狀態；提案值可以依專案改，改了寫在專案那份。
這份只放類型通用的研究，專案的狀態與截圖不回寫這裡。

**標記**：【一手】官方頁、官方 patch notes、GDC 講座頁或摘要、平台規範（Xbox XAG、Epic 文件）；【訪談】具名開發者在媒體的原話；
【二手】媒體轉述、wiki、攻略站、datamine、第三方測量。**提案值**＝業界沒有可引用數字、為原 demo 自訂的門檻，**對外不可說成業界標準**。

**限制**：幾個最可能有硬數字的付費 GDC Vault 講座（D4「The Pillars of Hell」「The Art of Open World Sanctuary」「Living Audio」「H2O in H3LL」、
Eiserloh 的鏡頭講座）只讀到摘要；PoE2 ExileCon 2023「Rendering Path of Exile 2」影片尚未看。

## 先講結論

1. 手感類數字（hit-stop 幀數、震屏振幅、鏡頭俯角／FOV／距離、Boss 開場秒數、telegraph 前搖毫秒）在所有參考遊戲裡**都沒有公開的一手數值**。
2. 有硬數字的只有：效能目標、UI 字級與對比（XAG）、閃光安全（XAG 118）、UE5 Lumen 預算、內容與資產數量、掉落過濾規格。
3. 能引用的多半是**規則**（D4 的 VFX 規則、Riot 的 clarity 規則、Valve 的 Dota 2 俯視角可讀性指南），這些都改寫成了可驗收的測試。

---

## A. 戰鬥手感與命中回饋

### A1 Hit-stop 分級
- 參考：Lost Ark 命中時「battles pause for a split second」【訪談，Soomin Park】、「each hit pauses the action for a few frames」【二手，Kotaku】；
  Lost Ark 公測簡報把受擊效果（피폭효과）定為打擊感核心【一手內容，經媒體】；櫻井政博：hit-stop 期間被打者要震動【二手】。
  D4、PoE2、Last Epoch、Hades 查無公開說明。
- 數字：**ARPG 無可引用數字**。格鬥遊戲量級：Smash Ultimate hitlag ≈ ⌊傷害×0.65+6⌋ 幀、上限 30 幀【二手，datamine】；SF2 約 10 幀【二手】。命中頻率差太多，不能直接套。
- 來源：https://www.gamegrin.com/articles/lost-ark-interview/ 、https://kotaku.com/lost-ark-review-amazon-steam-diablo-mmo-rpg-hands-on-1848518837 、
  https://www.gamemeca.com/view.php?gid=1492905 、https://nintendowire.com/news/2022/12/12/this-week-in-sakurai-12-5-12-11-fine-tuning-hit-stop-and-cheating-the-system/ 、
  https://www.ssbwiki.com/Hitlag 、https://critpoints.net/2017/05/17/hitstophitfreezehitlaghitpausehitshit/
- 測試（提案值，60 fps 錄影逐幀）：至少 3 檔且由資料驅動；普攻 ≤ 3 幀（50 ms）、重擊 4–8 幀；凍結期間被打者可見震動；一次 AoE 打 N 隻只觸發一次；清一波 20 隻的累計凍結 ≤ 5%。

### A2 受擊反應與死亡表現
- 參考：D4 命中效果依攻擊方向、可打飛身體，怪物有骨骼加肌肉結構、支援技能決定的死亡方式（斬首、腰斬）【一手】；製作人提到「death kits」【二手】。
  Last Epoch 第 4 季：「enemies now visually react to your hits through new additive animations explicitly crafted for each enemy type」【一手】。
  Last Epoch 開發者：命中回饋由 on-hit VFX、hit flash、when-hit VFX 各占 1/3，on-hit 太亮會蓋掉另外兩者【一手】。Lost Ark 首次 CBT 打擊感被批，原因是缺受擊動畫【二手】。
- 數字：受擊動畫、死亡變體數量無可引用數字。
- 來源：https://news.blizzard.com/diablo4/23746639 、https://forum.lastepoch.com/t/looking-ahead-in-last-epoch/80230/1 、
  https://devtrackers.gg/last-epoch/p/78a49e29-make-the-game-more-accessibility-for-people-with-disabilities-flash-on-hit 、https://www.inews24.com/view/976618
- 測試：每個敵人原型 additive 受擊 ≥ 1、方向化受擊 ≥ 2 向、死亡變體 ≥ 2（提案值）；命中後 0–1 幀內 hit flash、受擊 VFX、受擊動畫同時出現；灰階下 hit flash 不被 on-hit VFX 蓋掉。

### A3 判定範圍與視覺一致
- 參考：D4 傷害跨多幀播放並與 VFX 對齊（Whirlwind「applies damage every couple of frames」）【一手】；Riot：特效與 hitbox 不一致會「frustrating」【一手】；
  Hades II Patch 2「Attack visual FX better match the hitbox」【二手】；PoE2 0.4.0 修正 Ice Nova 視覺與範圍不一致【一手】。
- 來源：https://news.blizzard.com/diablo4/23746639 、https://www.leagueoflegends.com/en-us/news/dev/clarity-in-league/ 、
  https://shacknews.com/article/140086/hades-2-patch-2-notes-early-access 、https://www.pathofexile.com/forum/view-thread/3883495
- 測試（提案值）：debug 畫出每個技能與 Boss 招式的判定形狀疊在 VFX 上，外緣差 ≤ 10%；持續範圍技傷害 tick 與視覺脈衝同幀 ±1。

### A4 操控權與動作取消
- 參考：PoE2「Generally speaking, you never lose control of your character」，閃避「no cooldown, no limitation」但非無敵，施法「you can cancel at any time」，角色可同時播 22 個動畫【訪談】；
  PoE2 0.4.0 把某些技能不能取消當 bug 修【一手】；Last Epoch 1.1 Evade 2 充能、無無敵幀、所有職業補閃避動畫【一手】。
- 來源：https://www.pcgamesn.com/path-of-exile-2/exilecon-preview 、
  https://www.mmorpg.com/interviews/interview-path-of-exile-2s-game-director-jonathan-rogers-chats-gameplay-intentions-inclusions-and-improvements-2000130901 、
  https://forum.lastepoch.com/t/last-epoch-harbingers-of-ruin-patch-notes/71790
- 測試：每個技能出手後任何一幀按閃避都能取消；按鍵到開始位移 ≤ 3 幀 @60 fps（提案值）；每位英雄有專屬閃避動畫。

### A5 敵方前搖（telegraph）的語意
- 參考：PoE2 Boss「They're all telegraphed, you can dodge」【訪談】；D4 VFX 要讓「monster telegraphs, traps, damage areas」看得懂【一手】；
  Riot「If something is dodgeable, it should draw more attention」、硬控要有音效前搖【一手】；影之刃零：藍眼必須彈反、紅眼只能閃【訪談】；
  隻狼紅色「危」字【二手】；Lost Ark 可反擊攻擊發藍光【二手】；Last Epoch 1.1 指示有語意分級（「for theming (not meant to be dodged if in range)」）【一手】。
- 數字：前搖時長無可引用數字；東亞慣例「紅＝閃、藍＝彈反或反擊」。
- 來源：https://maxroll.gg/poe/news/pax-west-path-of-exile-2-interview-with-jonathan-rogers 、
  https://gamesbeat.com/how-phantom-blade-zero-is-an-accessible-soulslike-game-soulframe-liang-interview/ 、https://sekiroshadowsdietwice.wiki.fextralife.com/Combat 、
  https://mein-mmo.de/en/lost-ark-how-to-counter-attacks-from-bosses,787486
- 測試：telegraph 語意 ≤ 3 種（提案值），每種綁固定顏色、形狀、音效，每個 Boss 招式對到一格；逐幀量「指示出現 → 傷害幀」列表；5 名新測試者停在指示幀，≥ 4 人答得出該閃還是該擋。

### A6 鏡頭震動
- 參考：Eiserloh GDC 2016：trauma 0–1 累加衰減、震幅＝trauma² 或 ³、Perlin noise、3D 只用旋轉震動避免穿牆【二手轉述】；
  God of War (2018) 大幅降低震動保可讀性【二手】；Last Epoch 第 3 季調低某爆炸的震動【一手】。
- 數字：振幅與時長無可引用數字。
- 來源：https://www.gamedeveloper.com/programming/video-sprucing-up-cameras-with-math 、https://blog.playstation.com/?p=370399 、
  https://forum.lastepoch.com/t/last-epoch-beneath-ancient-skies-patch-notes/78635
- 測試（提案值）：普攻不觸發震動；最大 trauma 時主角始終在畫面中央 50% 安全框；選單有強度滑桿可到 0。

### A7 閃光、慢動作與光敏安全
- 參考：XAG 118：亮度變化 ≥ 10% 算一次閃光；每秒 > 約 3 次或面積 ≥ 約 20% 畫面不合格；飽和紅另有更嚴規則；建議 Harding FPA 檢測【一手】。
  Hades II Patch 2「Reduced some full-screen flashing or strobing, such as from time-slow effects」【二手】——對應多殺慢動作這類效果。
- 來源：https://devdocs.xbox.com/build/game-principles/accessibility/xag-deep-dives/xag-118-photosensitivity.md
- 測試：錄 60 秒最激烈片段（含慢動作、Boss 大招、掉落光柱、連續 hit flash），Harding FPA 或 PEAT 掃描失敗項 0。

---

## B. 動畫

### B1 動畫量與重量感
- 參考：GGG（PoE1）「Just in basic attacks alone the number of animations range from 40 - 80 depending on the character」、「1 or 2 frame changes can make huge difference」【一手】；
  PoE2 為同時支援 WASD 與點擊移動，「The amount of animations you need to make this work is extreme」【訪談】；Hades 出貨規模 942,489 幀角色與敵人動畫【訪談】。
- 來源：https://www.pathofexile.com/forum/view-thread/1657701 、https://www.pcgamesn.com/path-of-exile-2/wasd-movement 、
  https://mcvuk.com/business-news/behind-the-art-of-hades-we-value-artistic-integrity-and-excellence-in-artistic-craft-at-supergiant-however-were-first-and-foremost-a-game-design-lead-team/
- 測試：每位可玩英雄普攻連段至少 3 段不同動畫，另有移動、停止、轉身、閃避、受擊、死亡；外購的角色與動畫素材逐一檢查無穿模、接地腳水平位移 ≤ 2 cm（提案值）。

### B2 轉身與混合
- 參考：Hades II 改即時 3D 後「we were able to add proper turn animations and subtle leaning blends」【一手，具名工程師】。
- 來源：https://www.digipen.edu/showcase/news/hades-2-graphic-programmer
- 測試：逐幀看 180° 急轉與跑動中 90° 轉向：沒有單幀瞬轉，看得到轉身或傾斜混合。

### B3 武術動作的來源
- 參考：臥龍每種武器以真人武術家動捕為基礎【二手】、要「一瞬で攻守が切り替わるような、中国のアクションらしいバトルシステム」【一手，4Gamer】；
  影之刃零由甄子丹團隊以實戰速度動捕【二手】；隻狼「We have to actually tweak frame by frame the animations」【訪談】。
- 來源：https://www.4gamer.net/games/637/G063793/20220608016/ 、https://80.lv/articles/phantom-blade-zero-uses-authentic-kung-fu-motion-capture 、
  https://gamingbolt.com/sekiro-shadows-die-twice-dev-talks-about-how-combat-differs-from-dark-souls-and-the-challenges-of-developing-it
- 測試（提案）：盤點每位角色的動作有多少比例來自武術（動捕、武術動畫包或手 K）；至少主角招牌技與 Boss 招式要武術化。

---

## C. 角色

### C1 俯視可讀性：輪廓、明暗、飽和度
- 參考：Valve《Dota 2 Character Art Guide》（專為俯視鏡頭寫）【一手】：輪廓「must be clearly identifiable at first glance」並看得出朝向；
  明暗「darkest at feet/lower body to lightest at the upper body and head」，飽和度下身低上身高；「Absolute white and black should not be used」，不用單一通道打滿的純色；
  細節只佔小部分；避開地圖主色；上色後轉灰階、放到不同區域與日夜複查。D4「bigger shapes on the armor… reduce things that affect readability」、「The game camera is one of our top priorities」【一手】。
- 來源：https://help.steampowered.com/faqs/view/0688-7692-4D5A-1935 、https://news.blizzard.com/en-us/article/23665024/diablo-iv-quarterly-updatejune-2021 、
  https://gamedeveloper.com/design/gdc-2012-diablo-iii-s-art-director-shows-off-design-process
- 測試：遊戲鏡頭截圖轉灰階：主角上身平均亮度高於下身；主角上身對腳下地面相對亮度對比 ≥ 3:1（借用 XAG 102 大型元素標準），最亮與最暗房間都要過；
  albedo 無大片單通道 255、無大面積純黑純白；8 方向朝向盲測正確率 ≥ 90%（提案值）；最忙戰鬥灰階截圖 5 人中 ≥ 4 人 1 秒內指出主角（提案值）。

### C2 敵人家族與分工
- 參考：D4 Drowned 家族 5 個原型、Cannibal 4 個且刻意不放遠程【一手】；D4 移除精英顏色區分以換沉浸感【二手】；PoE2 600 種怪、100 個 Boss【一手，Steam】。
- 來源：https://news.blizzard.com/en-us/article/23308274/diablo-iv-quarterly-updatefebruary-2020 、https://store.steampowered.com/app/2694490/Path_of_Exile_2/
- 測試（提案值）：每家族 ≥ 3 個功能原型，遊戲鏡頭像素尺寸的灰階縮圖輪廓兩兩可分；精英至少用 2 種管道區分（體型、光環或描邊、名牌）。

### C3 角色狀態回饋（加分）
- 參考：D4 角色淋雨會濕、依技能沾血，植被對角色起反應【一手】。https://news.blizzard.com/en-us/article/23964183
- 測試：至少一種環境→角色狀態回饋（濕、血、塵其一）截圖可見。

---

## D. 環境與場景佈置

### D1 模組化程序地城
- 參考：D4 150+ 地城用可重用 tile-set 組成，主題層「can be turned on or off」【一手】；PoE2 戰役 100 個環境【一手】。
- 來源：https://news.blizzard.com/en-us/article/23788294/diablo-iv-quarterly-updatemarch-2022
- 測試（提案值）：盤點迷宮房間模組 ≥ 8、轉接件 ≥ 3、主題層 ≥ 3；連續生成 3 次，重複出現的模組套用不同主題層組合。

### D2 依固定鏡頭分配細節、處理遮擋
- 參考：D4 用固定鏡頭決定「where to add or remove detail to help the readability of the gameplay space」，前景物件不擋可玩空間【一手】；
  D4 GDC 2024「avoiding distracting highlights caused by the fixed camera angle」【一手摘要】。
- 來源：同 D1、https://gdcvault.com/play/1034490/Technical-Artist-Summit-H2O-in
- 測試：灰階下可走地面與牆、坑有明確亮度斷層；牆、屋頂、城垛擋到主角時淡出或顯示透視輪廓，主角完全看不見 > 0.5 s 的次數為 0；亮度 > 0.95 的地面高光面積 ≤ 1%（提案值）。

### D3 可互動 props
- 參考：D4 Drowned 道具套件「all interactable or breakable」，破壞有音效加碎片層【一手】。
- 來源：同 D1、https://news.blizzard.com/en-us/article/23731236/diablo-iv-quarterly-updateoctober-2021
- 測試：每房間小型 props 可破壞比例 ≥ 30%（提案值）；破壞時音效、碎片、物理同幀出現。

---

## E. 光影與氛圍

### E1 美術方向與光影語法
- 參考：D4 兩大支柱「old masters」（Rembrandt）與「a return to darkness」，「believability, not realism」；地城「oppressively dark, very selective lighting scheme」；燈光用真實單位【一手】；
  Last Epoch 1.0 調整成「less washed out, have higher contrast」【一手】。
- 來源：D4 2022-03 季度更新、https://news.blizzard.com/en-us/article/23964183 、https://forum.lastepoch.com/t/last-epoch-1-0-patch-notes/62536
- 測試：每段落指得出主光方向與焦點光；最忙戰鬥截圖最亮 5% 像素落在主角、敵方 telegraph、掉落物上（遮罩比對，提案值）。

### E2 暗環境下的 VFX 自發光
- 參考：D4 VFX 多數做成 emissive，只靠環境光可讀性會「muddied, particularly in dark environments」【一手】；Last Epoch 依畫質封頂 VFX 光源數【一手】。
- 測試：最暗房間 A5 與 F1 照樣通過；profiler 記錄同時動態光源數並確認有上限。

### E3 UE5 Lumen 預算
- 參考：Epic 官方：主機 1080p 內部解析度，Lumen GI＋反射＋體積霧 60 fps（High）預算 4 ms、30 fps（Epic）8 ms【一手】。
- 來源：https://dev.epicgames.com/documentation/en-us/unreal-engine/lumen-performance-guide-for-unreal-engine
- 測試：目標硬體上 stat gpu／Unreal Insights，60 fps 目標時 Lumen 相關 pass 合計 ≤ 4 ms。

### E4 風格化後處理（以水墨為例）與可讀性
- 參考：墨境 Realm of Ink「The purely Chinese ink-and-wash art style is not suitable for games」，寫意讓該有細節處沒細節，改走工筆、迭代 5–6 輪【訪談】；
  黑神話第六回片尾先試水墨，最後改連環畫風（李公麟白描）【二手】；大神獲 CEDEC AWARDS 2009「不靠 toon shader 的獨創墨繪技法」【一手】；
  網易《繪真·妙筆千山》把《千里江山圖》拆成 25 個模組【二手】。
- 數字：**沒有任何已上市 3D 遊戲公開過水墨後處理的一手技術拆解。**
- 來源：https://rogueliker.com/realm-of-ink-interview/ 、https://www.chinadailyhk.com/article/596762 、https://animeanime.jp/article/2009/09/05/5269.html 、
  https://news.17173.com/content/06052018/105438053.shtml
- 測試：水墨開、關各截一張最忙戰鬥，C1、A5、F1 的測試在「開」時全部通過；telegraph、主角描邊、UI、傷害數字不受水墨的邊緣、紙紋、去飽和影響（或以遮罩排除）；
  主角與敵方 telegraph 用水墨世界裡不存在的色相（提案值，對應 Dota「避開地圖主色」）。

---

## F. VFX 語言與可讀性

### F1 強度分級
- 參考：D4 首席 VFX Daniel Briggs「We reserve visually loud FX for powerful skills, like ultimate abilities」，特效要「readable in all areas and lighting conditions」【一手】；
  Riot「the amount of attention an ability grabs should match its level of importance」、「noise should be kept minimal」，投射物靜止畫面也要看出方向【一手】；
  Riot VFX 指南摘要：避開 0% 與 100% 明度飽和度、一主色配一副色、特效要短【二手】。
- 來源：https://news.blizzard.com/diablo4/23746639 、https://www.leagueoflegends.com/en-us/news/dev/clarity-in-league/ 、https://www.vfxapprentice.com/blog/10-league-of-legends-vfx-design-tips
- 測試：VFX 分級表（普攻、技能、大招、敵方 telegraph、環境），每級規定螢幕佔比、峰值亮度、持續時間上限（提案：普攻 ≤ 5% 畫面、≤ 0.5 s）；
  所有 Niagara 特效逐一截圖對照；投射物靜止截圖 5 人中 ≥ 4 人判斷得出方向。

### F2 密度上限與清晰度選項
- 參考：PoE2「600 projectiles a second… you don't have any ability to respond to boss mechanics」，正式版刻意放慢【訪談】；
  Lost Ark 約 8 人起守護者攻擊開始模糊【一手】；PoE2 0.4.0 Delirium 霧在玩家周圍加清晰半徑【一手】；Last Epoch 1.2.5 新增「toggle hit VFX」【一手】；火炬之光：無限預告技能特效透明度選項【一手】。
- 來源：https://www.pcgamesn.com/path-of-exile-2/combat 、https://www.inven.co.kr/webzine/news/?news=197963&site=lostark 、
  https://forum.lastepoch.com/t/last-epoch-patch-1-2-5-notes/77977 、https://www.taptap.io/ru/post/4668326
- 測試：壓力場景（精英＋20 小怪＋主角全開）30 秒錄影，停在 Boss／精英前搖幀，5 人中 ≥ 4 人 2 秒內指出前搖；Niagara 同時 active 上限寫進 scalability 並記錄峰值；至少一項清晰度選項。

### F3 敵我色彩分離
- 參考：**沒有任何參考 ARPG 公開過玩家特效與敵方特效的色彩規則**；最接近的是 Riot 形狀語言一致、XAG 102 提醒紅綠色盲【一手】。
- 來源：https://devdocs.xbox.com/build/game-principles/accessibility/xag-deep-dives/xag-102-contrast.md
- 測試（提案）：敵方傷害區與玩家技能用不重疊的色相區段與不同形狀語言；Color Oracle 色盲模擬仍可區分。

---

## G. 攝影機

- **沒有任何參考遊戲公開俯角、FOV 或鏡頭距離。**專案自訂的俯角與鏡頭距離，對外不要說「與 Diablo 相同」。
- G1 情境鏡頭：D4 與 NPC 對話拉近但「maintaining an overall isometric feel」【一手】、世界 Boss 拉遠【二手】、第 4 季 Standard／Far 兩檔【二手】；
  Lost Ark 覺醒技鏡頭拉近再拉遠【一手】；Hades II Boss 戰有腳本化拉近【二手】。
  來源：https://news.blizzard.com/en-us/diablo4/23463858/diablo-iv-quarterly-update-june-2020 、https://www.pcgamesn.com/diablo-4/season-4-camera-distance 、
  https://lostark.game.onstove.com/News/Notice/Views/12874 、https://gamerant.com/hades-2-all-patch-notes-updates-hotfixes/
- 測試：Boss 戰鏡頭自動調整，Boss 與它最大 AoE 100% 在畫面內；所有轉換插值、無跳切；至少 2 檔距離設定。

## H. UI 與字體

- H1 字級：XAG 101 最小字高 PC 1080p 18 px／4K 36 px，主機 1080p 26 px／4K 52 px【一手】；D4 3 檔字級、50 項以上無障礙功能【一手】。
  來源：https://devdocs.xbox.com/build/game-principles/accessibility/xag-deep-dives/xag-101-text-display.md 、https://news.blizzard.com/diablo4/23954932
  測試：HUD、傷害數字、物品名 @1080p 字高 ≥ 18 px（電視展示 ≥ 26 px）；至少 2 檔字級。
- H2 對比：XAG 102 一般文字 4.5:1、大字 3:1，在最低對比處量【一手】。測試：最忙戰鬥截圖中傷害數字與 HUD 數字最差處 ≥ 4.5:1（大字 ≥ 3:1）。
- H3 風格化字型與圖示：黑神話客製行書「漢儀黑神話體」【二手】；D4 圖示從 3D 模型渲染、降低背景亮度飽和、稀有度靠邊框【一手】。
  測試：風格化字型（例如書法）只用在標題、名卡、章節，內文與數字用無襯線；圖示光向與背景一致。
- H4 掉落呈現：PoE item filter：光柱 11 色、小地圖圖示 3 尺寸 11 色 12 形、提示音 16 種【一手】；Last Epoch 圖示色跟著光柱色【一手】；D4 依稀有度不同掉落音效【一手】。
  來源：https://www.pathofexile.com/item-filter/about 、https://forum.lastepoch.com/t/last-epoch-beneath-ancient-skies-patch-notes/78635
  測試：稀有度 ≥ 3 級，每級光柱色、地面標籤色、小地圖圖示色、掉落音效一致；同時掉 30 件無 > 33 ms 卡頓。

## I. 與視覺綁定的音效

- I1：D4「Living Audio」每個音效有實例上限與 importance system，音效確認輸入也預告傷害【一手】；PoE2 Boss 有音效前搖、命中音依材質【二手】；Riot 硬控要有音效前搖【一手】。
  測試：每個 Boss 大招有獨立前搖音效；30 隻怪同時死亡時 Boss 前搖音仍高於背景；命中音至少 2 種材質。
- I2：ITU-R BT.1359 可察覺門檻：聲音領先 45 ms、落後 125 ms【二手摘要，跨領域標準】。測試：命中音 onset 在視覺衝擊幀 −45～+125 ms 內（建議收緊到 ±1 幀）。
- I3：Hades 曲目分 drum／bass／其他三個 stem，開戰加鼓、Boss 切高潮段、清場接收尾【訪談】；臥龍用二胡等傳統樂器【一手】。
  來源：https://gameplay.co/hades-game-music-sound-design-darren-korb-supergiant-games/ 、https://news.xbox.com/en-us/?p=189328
  測試：錄「小怪 → 清場 → 精英 → Boss」列出音樂層切換時間戳，與遊戲事件對齊；清場有收尾段不是硬切。

## J. 效能目標

- J1：D4 Series X 4K/60 等官方目標【一手】，DF 實測 PS5／XSX「mostly solid 60fps」【二手】；Hades PS5 4K/60【一手】；Hades II PC 推薦 RTX 2060【一手】；
  PoE2 推薦 RTX 2060，第三方 RTX 4070 1080p 平均 117、1% low 92【二手】；黑神話 PS5 效能模式靠 frame generation 才到 60（反例）【二手】。
  來源：https://news.blizzard.com/en-us/article/23964183 、https://www.supergiantgames.com/blog/hades-xbox-playstation-coming-soon/ 、
  https://store.steampowered.com/app/1145350/Hades_II/ 、https://store.steampowered.com/app/2694490/Path_of_Exile_2/ 、https://www.pcgamesn.com/path-of-exile-2/best-settings-pc
  測試：RTX 2060 級與 demo 實機，1080p 最忙 60 秒戰鬥：平均 ≥ 60 fps、1% low ≥ 平均 80%（提案值）、不開 frame generation。
- J2：Last Epoch 1.2.5、PoE2 0.4.0 都在修卡頓【一手】。測試：Unreal Insights 錄完整一輪，載入以外 > 50 ms 的幀數為 0（提案值）；PSO 預快取後第一輪無 shader 編譯卡頓。
  常見來源【本專案實測】：一格生成整群敵人（UE 5.8 打包版 10 隻 91 ms）→ 排隊、每格一隻；執行中試載不存在的套件（每次觸發同步載入）→ 先問存在再載。
  J1 用出貨的幀率上限量；不設上限時平均越高，1% low 對平均的比例反而越難看，兩種都記。
- J3：火炬之光：無限是參考清單中唯一用 Unreal（UE4）的俯視 ARPG，適合作效能與 UI 對照【一手】。

## K. 過場與 Boss 登場

- **沒有任何參考遊戲公開 Boss 開場秒數。**
- K1：D4 世界 Boss 各有專屬登場動畫、場地封閉、頭部與貼圖為俯視鏡頭反覆修改，「Stagger must be interesting and helpful but never required」【一手】；
  PoE2 Boss 形態揭露、場地「becomes completely dark」、登場後逐漸減弱的 anti-burst 減傷【一手】。
  來源：https://blog.playstation.com/?p=377084 、https://news.xbox.com/en-us/?p=211264 、https://www.pathofexile.com/forum/view-thread/3883495
  測試：專屬登場動畫（不是直接 idle）；書法名卡；場地封閉；取回控制後 1 秒內 Boss 不出手（提案值）；遊戲俯角下 Boss 輪廓可辨。
- K2：Lost Ark 非必要過場皆可跳過【一手，經媒體】；D4 過場顯示玩家當下裝備、用玩家的解析度與畫質【一手】。
  測試：第二次起可跳過；主角穿著與裝備一致；過場與遊戲同解析度與後處理；黑邊進出有插值。

---

## 查無可引用數字（不要當成業界標準對外說）

ARPG hit-stop 幀數；震屏振幅與時長；hit flash 時長；任何參考遊戲的鏡頭俯角、FOV、距離；Boss 開場秒數；telegraph 前搖毫秒與 D4／PoE2 的顏色慣例；
每角色動畫數（PoE1「普攻 40–80」除外）；場景 props 密度；UI 實際字級（D4 只說 3 檔）；水墨 3D 後處理的一手技術拆解；PoE2 主機 fps 目標；黑神話的打擊回饋參數。

## 最能區分「獨立原型」與「AAA」的 15 條（依評審最先察覺的程度排序）

1. 受擊反應齊全（三件同步＋依技能決定的死亡）（A2）——Diablo IV
2. 判定範圍等於視覺範圍（A3）——Diablo IV；PoE2、Hades II 都以 patch 修過
3. Boss telegraph 語意一致：顏色、形狀、音效（A5）——PoE2；東亞語彙看影之刃零
4. VFX 強度分級，大場面特效只給大招（F1）——Diablo IV
5. 高密度下仍看得到 Boss 前搖（F2）——PoE2（每秒 600 發投射物的教訓）
6. 主角俯視可讀性：頭亮腳暗、輪廓看得出朝向、灰階下找得到（C1）——Diablo IV；規則出自 Valve Dota 2 指南
7. 風格化後處理不犧牲可讀性（E4）——教訓來自墨境；武俠美術方向看黑神話
8. 操控權永不喪失：可取消、專屬閃避動畫（A4）——PoE2
9. 選擇性光影＋暗環境中 VFX 自發光（E1、E2）——Diablo IV
10. 穩定 60 fps：1% low 達標、無卡頓、不靠 frame generation（J1、J2）——Hades II、Diablo IV；反例黑神話 PS5 效能模式
11. Boss 登場儀式：專屬登場動畫、封場、名卡、登場後保護期（K1）——PoE2
12. 情境鏡頭：Boss 戰拉遠、大招拉近、全部插值（G1）——Lost Ark
13. 掉落分級呈現一致：光柱、標籤、小地圖圖示、音效同色同級（H4）——Path of Exile、Last Epoch
14. 程序迷宮模組＋可開關主題層＋可破壞 props（D1、D3）——Diablo IV
15. UI 字級與對比、光敏安全（H1、H2、A7）——Diablo IV、Hades II
