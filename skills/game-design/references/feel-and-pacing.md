# 回饋、手感、節奏、教學與難度

2026-10-21 研究整理；原始筆記 `research/notes_B_practice.md` 第 5、6 節、`notes_C_genres.md` 第 5 節。
這份講設計層的原則。網頁小遊戲上把回饋一層層做出來、截圖自評的迴圈在 game-polish 的 `checklist.md`；
前搖與特效看不看得見、會不會搶戲在 game-art。

## 回饋與手感

- **Swink《Game Feel》2008**【一手書，經二手引用】：「real-time control of virtual objects in a simulated space, with interactions emphasized by polish」。
  書評說「即時」指 100 ms 以內的修正循環（沒對照原書）。2006 年文章〈Principles of Virtual Sensation〉七條：Predictable Results、Novelty、
  Traction（Good Feedback）、Low Skill Floor/High Skill Ceiling、Context、Impact and Satisfying Resolution、Appealing Reaction【一手】。
- **Juice it or lose it**（Jonasson & Purho，約 2012）【一手】：juicy 的遊戲「feels alive and responds to everything you do」。https://github.com/grapefrukt/juicy-breakout
- **Schell #64 Juiciness**【一手】：輸入有沒有持續回饋？給一個獎勵時同時用了幾種方式？
- **Meier**【二手】：決定之後沒有回饋就直接往下走，是最糟的。
- **Nuclear Throne 的一槍**【二手：RPS 訪談轉述】：鏡頭往瞄準反方向退 6 像素、螢幕震動 +4 快速衰減、彈殼飛出、槍貼圖後座再歸位。

## 寬容：把判定偷偷偏向玩家

Maddy Thorson〈Celeste & Forgiveness〉【一手】https://maddymakesgames.com/articles/celeste_and_forgiveness/ ：
「everything is fudged a tiny bit in the player's favor」，所以遊戲「can feel kind even though it's very difficult」。技巧包括 coyote time、jump buffering、
按住跳鍵時頂點重力減半、跳躍與衝刺撞角修正、移動平台動量保留幾幀、離牆 2 像素就能蹬牆跳。她說這些都不是她發明的，部分玩家很難察覺。

原始碼常數【一手】https://github.com/NoelFB/Celeste/blob/master/Source/Player/Player.cs ：
`JumpGraceTime = 0.1f`（離地 0.1 秒內還能跳）、`VarJumpTime = .2f`、`UpwardCornerCorrection = 4`、`DashCornerCorrection = 4`（像素）、
`DashTime = .15f`、`DashCooldown = .2f`。jump buffer 的時長定義在 Input 類別，沒讀到。
這些可以當初始值，再依自己的解析度與速度重調【推論】。

## hit-stop

櫻井政博，Fami 通專欄 vol.490（粉絲翻譯）【一手】https://sourcegaming.info/2015/11/11/thoughts-on-hitstop-sakurais-famitsu-column-vol-490-1/ ：
- 打中的瞬間攻防雙方停住**相同時間**；傷害越大停越久，但有上限。
- 個別招式可以加權（劍尖多、劍身少；飛行道具較少）；攻擊方也微幅震動；地面角色水平震、空中角色垂直震。
- 震幅隨鏡頭距離調整、逐格衰減；hurtbox 不跟著震，避免判定不一致。
- 風險：多人時停頓給第三人插手的空檔；一次打很多人時停頓累積，拖慢整體速度。
- 一次打中很多目標的類型（俯視 ARPG 清怪），hit-stop 要依「單發重擊或範圍清怪」分級，或只停被打的單位【推論】。

## 節奏

- **Left 4 Dead AI Director**（Booth 2009，Valve 投影片）【一手】https://cdn.fastly.steamstatic.com/apps/valve/2009/ai_systems_of_l4d_mike_booth.pdf
  - 「Constant, unchanging combat is fatiguing / Long periods of inactivity are boring」。
  - Survivor Intensity：受傷依傷害等比增加；倒地、被拉下或推下邊緣時增加；附近有敵人死亡時依距離反比增加。隨時間衰減，但交戰中不衰減。取四人中的最大值。
  - Build Up（放出完整威脅直到超過峰值門檻）→ Sustain Peak（再維持 3–5 秒）→ Peak Fade（降到最低威脅，讓交戰打完）→ Relax（最低威脅 30–45 秒，或走得夠遠）→ Build Up。
  - 屍潮在 Normal 每 90–180 秒隨機一次；75% 從後方來；Boss 洗牌發放不連續重複，Boss 不受節奏調節。
  - 「Amplitude (difficulty) is not changed, frequency (pacing) is」；「Survivor Intensity estimation is crude, yet the resulting pacing works」。
  - 可以縮到 60 秒一局：四個狀態、峰後喘息、只調頻率不調振幅都能寫成程式，秒數重新量【推論】。
- **Schell #69 Interest Curve**【一手】：有鉤子嗎？中間有起伏與休息嗎？有比前面都高的結尾嗎？是碎形嗎？請試玩者畫一條。
- **Valve 的 experiential density**【一手】：每單位時間、每單位面積，玩家做了什麼、遇到什麼。
- **Meier**【二手】：複雜決定別擠在一起，慢的時段別只剩小決定。
- 工作室內部的興趣曲線或 beat chart 實例本輪沒找到；L4D 是最接近的量化版本。

## 教學

- **起承轉合**：林田宏一（Super Mario 3D Land 導演）2012【訪談】https://www.gamedeveloper.com/design/the-structure-of-fun-learning-from-i-super-mario-3d-land-i-s-director
  「introduce a concept, and then in the next panel you develop the idea a little bit more」，第三格「something crazy happens that makes you think about it in a way you weren't expecting」，
  第四格收束，讓玩家展示精通。一關一個概念；宮本茂每次追問轉折在哪。
- **Super Mario Bros. 1-1**【二手：Eurogamer 2015 訪談轉述】：目標是不看說明書就學會基本操作；第一個敵人從 Koopa 改成 Goomba，因為踩了還要踢對新手太難。
- **Cook 的技能鏈**【一手】：前面的 atom 卡住，後面全部碰不到；早期倦怠會切斷所有下游；已經會的玩家會被冗長教學弄煩。
- **Stout**【一手】：「If players don't know how to play your game, they can't actually play your game.」
- 套用【推論】：短局遊戲 60 秒就是一次起承轉合；對戰類第一場只開兩種選項、第二場加執行方式、第三場遇到剋你的；
  卡牌前幾場固定牌組、逐步解鎖規則軸；動作類每種新敵人先單獨出場、再跟已知敵人組合、最後在不利地形出現。

## 難度

- **Chen**【一手】：passive DDA 讀不到玩家在想什麼、把控制權從設計者手上拿走；active DDA 把難度選擇嵌進核心玩法，讓玩家用玩的方式選（冒險與否）。
- **隱藏的動態難度**（Resident Evil 4）：官方從未正式承認，只見於官方攻略本【二手】。玩家發現後會覺得被操控，或故意放水來刷【推論】。
- **Celeste Assist Mode**【訪談】：原名 Cheat Mode，覺得太評判才改名；可調遊戲速度、體力、空中衝刺次數、無敵；
  「maximal impact for the player but minimal consequences to the system」；遊戲內建議第一次不要開。Thorson 原本是團隊裡最反對的人。
- **Hades God Mode**【訪談】：目標是「take the sting of failure and reduce that as much as possible」，不是簡單模式，
  因為「If you could just blow through it, what's interesting about the game goes away」。框成「你變強」而不是「敵人變弱」。
- **DOOM**【二手：講演報導】：難度靠調敵人的準度與攻擊力，不只灌血。
- 各類的心流階梯【推論】：短局用局內加速、對戰用配對、卡牌用 Ascension 式階梯、動作用 Heat 或世界層級。
