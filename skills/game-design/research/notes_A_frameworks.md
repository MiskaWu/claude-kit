# 筆記 A：經典遊戲設計理論框架（玩法設計與審查用）

研究日期：2026-10-21。範圍：只談經典理論框架；業界實務流程、類型應用屬另外兩路，這裡不碰。

## 來源等級與查證方式

- 【一手】作者本人的書、論文、演講、部落格；【訪談】；【二手】書摘、課程講義、媒體轉述；【學術】同儕審查論文；【推論】我自己的整合。
- **Schell 透鏡的英文原文**取自 Schell 官方網頁版 *Game Design: A Deck of Lenses*（deck.artofgamedesign.com，介面標示 "Tenth Anniversary Edition"），2026-10-21 直接下載它的 `assets/strings/en.json`，共 116 張。→【一手】。牌組文字可能和書中方框文字有細微差異（例如牌組有錯字 "How may verbs"、"What the are the puzzles"，原樣保留）。
- **Schell 第三版（2019）的章節、小節標題與每個透鏡所在章節**取自 GitHub `leonlee/deck-of-lenses` 的 `book/source-index.json`，作者聲明是從第三版 EPUB（ISBN 9781351803632）的導覽與 Table of Lenses 抽出、每個錨點都核對過。→ 標【二手：第三方 EPUB 目錄索引】。可信度高（是標題原文、不是摘要），而且和 O'Reilly 第三版 Table of Lenses 頁在搜尋結果露出的條目（#2 Essential Experience、#7 Endogenous Value、#8 Problem Solving、#9 Elemental Tetrad、#10 Holographic Design、#13 Infinite Inspiration、#14 Problem Statement、#15 Eight Filters）吻合。O'Reilly 頁本身被 403 擋，沒讀到。
- **透鏡編號跟版本走**：牌組編號等於第三版書中編號（書的 ∞ 對應牌組 113；67½、93½、95½ 是書中原有的半號）。舊版編號不同，例如 CIRCA 書摘寫「#1 Lens of Experience、#2 Surprise、#3 Fun」，第三版則是 #1 Emotion、#2 Essential Experience、#4 Surprise、#5 Fun。GitHub 上各家筆記的 Triangularity 編號也有 #33、#36、#40 三種。**引用透鏡時一定要寫版本。**

---

## 1. Jesse Schell《The Art of Game Design: A Book of Lenses》（第三版，2019）

### 1.1 主張

**體驗與遊戲的關係**
- 第 2 章有一節叫 "The Game Is Not the Experience"，同章結尾是 "Essential Experience" 與 "All That's Real Is What You Feel"。【二手：第三方 EPUB 目錄索引】常見引句 "The game is not the experience. It is the facilitator of the experience."【二手：antoinebuteau.com 轉引 bookey.app，未核到原文】
- 設計者的工作是先想體驗、再回推遊戲。Lens #2 Essential Experience 的引言："stop thinking about your game, and start thinking about the experience of the player."【一手：Deck】
- 第 4 章（"So What Is a Game?" "No, Seriously, What Is a Game?" "Problem Solving 101"）。常見引用的定義："A game is a problem-solving activity, approached with a playful attitude." 以及 "fun is pleasure with surprises"。【二手：多個書摘與課程投影片；目錄結構與 #4 Surprise、#5 Fun、#8 Problem Solving 都在第 4 章，可以佐證】

**元素四分（Elemental Tetrad）**
- 第 5 章 "The Four Basic Elements"、"Skin and Skeleton"。Lens #9 問："Is my game design using elements of all four types (Aesthetics, Technology, Mechanics and Story)? … Are the four elements in harmony, reinforcing each other, and working together toward a common theme?"【一手：Deck】
- Lens #10 Holographic Design：要同時看到遊戲結構和玩家體驗。【一手：Deck】
- 常見說法是四元素依「玩家可見度」排序（美術最顯眼、技術最不顯眼）。【未核實，本輪沒找到原文】

**迭代、風險、原型**（第 8 章）
- 小節依序是：Choosing an Idea → **The Eight Filters** → **The Rule of the Loop** → 軟體工程簡史（Waterfall、Boehm、Agile Manifesto）→ **Risk Assessment and Prototyping**（範例 *Prisoners of Bubbleville*：Design Brief → Risk List → Risk Mitigation）→ **Ten Tips for Productive Prototyping** → Closing the Loop（三輪 loop 範例）→ How Much Is Enough?【二手：第三方 EPUB 目錄索引】
- Rule of the Loop 常見引文："The more times you test and improve your design, the better your game will be."【二手：常見轉述，本輪沒核到原文】
- 八道濾網的問句（Lens #15）："Does this game feel right? / Will the intended audience like this game enough? / Is this a well-designed game? / Is this game novel enough? / Will this game sell? / Is it technically possible to build this game? / Does this game meet our social and community goals? / Do the playtesters enjoy this game enough?" 前言："Your design is only finished when it can pass through all eight filters without requiring a change."【一手：Deck；Schell Games 官方部落格 2025-03-03〈Lens of The Eight Filters〉同文】
- 濾網名稱依序是 Artistic Impulse、Demographics、Experience Design、Innovation、Business and Marketing、Engineering、Social/Community、Playtesting。【二手：搜尋摘要轉述 CIRCA wiki 與 Schell Games 部落格；名稱跟上面八個問句一一對得上。另一份華盛頓大學講義只列六個，數量依版本而異】
- 風險：Lens #16 Risk Mitigation："stop thinking positively, and start to seriously consider the things that could go horribly wrong… What could keep this game from being great? How can we stop that from happening?"【一手：Deck】
- 十個原型建議（標題原文）：#1 Answer a Question、#2 Forget Quality、#3 Don't Get Attached、#4 Prioritize Your Prototypes、#5 Parallelize Prototypes Productively、#6 It Doesn't Have to Be Digital（例：Tetris、Halo 的紙上原型）、#7 It Doesn't Have to Be Interactive、#8 Pick a "Fast Loop" Game Engine、#9 Build the Toy First、#10 Seize Opportunities for More Loops。【二手：第三方 EPUB 目錄索引】
- Lens #17 The Toy："stop thinking about whether your game is fun to play, and start thinking about whether it is fun to play WITH."【一手：Deck】

**玩家、玩家心智、動機**（第 9–11 章）
- 第 9 章：Demographics、Psychographics、**LeBlanc's Taxonomy of Game Pleasures**、**Bartle's Taxonomy of Player Types**、"More Pleasure: MORE!"。【二手：目錄】
- 第 10 章〈The Experience Is in the Player's Mind〉只有四節：**Modeling、Focus、Empathy、Imagination**；**Lens #21 Flow 在這一章**，所以 flow 是放在 Focus 底下談的。【二手：目錄＋透鏡所在章節】
- 第 11 章〈The Player's Mind Is Driven by the Player's Motivation〉：Needs…、…And More Needs、**Intrinsic vs. Extrinsic Motivation**、**Wanna vs. Hafta**、Novelty、Judgment。【二手：目錄】Lens #22 Needs 同時問 Maslow 和 SDT："On which levels of Maslow's hierarchy is my game operating? Does it fill the needs of competence, autonomy, and relatedness?"【一手：Deck】可見 Schell 第三版已經把 SDT 三需求收進來。
- Lens #25 Judgment："What does my game judge about the players? … Do players feel the judgment is fair? … Does the judgment make them want to improve?"【一手：Deck】

**機制分類**（第 12 章）——**第三版是七類，不是六類**
- Mechanic 1: Space（Nested Spaces、Zero Dimensions）
- Mechanic 2: Time（Discrete and Continuous Time、Clocks and Races、Controlling Time）
- Mechanic 3: Objects（含 Secrets）——對應的透鏡是 #28 State Machine（objects → attributes → states → triggers）
- Mechanic 4: Actions（Emergent Gameplay）
- Mechanic 5: Rules（Parlett's Rule Analysis、Modes、Enforcer、Cheatability、The Most Important Rule）
- Mechanic 6: Skill（Real vs. Virtual Skills、Enumerating Skills）
- Mechanic 7: Chance（Ten Rules of Probability、Expected Value、The Human Element、Skill and Chance Get Tangled）
- 【二手：目錄】早期版本是六類、沒有 Time，這點只是記憶、未核實。

**平衡的 12 種類型**（第 13 章 "The Twelve Most Common Types of Game Balance"）——名稱已核實：
1 Fairness（Symmetrical / Asymmetrical、Biplane Battle、Rock Paper Scissors）
2 Challenge vs. Success
3 Meaningful Choices（含 Triangularity）
4 Skill vs. Chance
5 Head vs. Hands
6 Competition vs. Cooperation
7 Short vs. Long
8 Rewards
9 Punishment
10 Freedom vs. Controlled Experience
11 Simple vs. Complex（含 Natural vs. Artificial Balancing、Elegance、Character）
12 Detail vs. Imagination
之後還有 Game Balancing Methodologies、Balancing Game Economies、Dynamic Game Balancing、The Big Picture。【二手：目錄】Lens #53 Balance 只問一句："Does my game feel right?"【一手：Deck】

**謎題原則**（第 14 章，十條）：Make the Goal Easily Understood／Make It Easy to Get Started／Give a Sense of Progress／Give a Sense of Solvability／Increase Difficulty Gradually／Parallelism Lets the Player Rest／Pyramid Structure Extends Interest／Hints Extend Interest／Give the Answer!／Perceptual Shifts Are a Double-Edged Sword。【二手：目錄】

**介面與回饋**（第 15 章）：The Loop of Interaction、Juiciness、Primality、Channels of Information（四步驟）、Modes（三條建議）、Interface Tips ×10。【二手：目錄】

**興趣曲線**（第 16 章）
- 小節：Interest Curves、Patterns inside Patterns（碎形）、What Comprises Interest? → Factor 1 Inherent Interest、Factor 2 Poetry of Presentation、Factor 3 Projection。【二手：目錄】
- Lens #69 的問句等於曲線的形狀："Does it have a hook? Is there gradually rising interest, punctuated by periods of rest? Is there a grand finale, more interesting than everything else? … Is there a fractal structure…? … If I ask playtesters to draw an interest curve, what does it look like?"【一手：Deck】

**間接控制**（第 18 章）：The Feeling of Freedom → 六個方法：#1 Constraints、#2 Goals、#3 Interface、#4 Visual Design、#5 Characters、#6 Music → Collusion。【二手：目錄】Lens #81 把六法逐條變成問句，最後一句："Is there some other method I can use to coerce players towards ideal behavior without impinging on their feeling of freedom?"【一手：Deck】

### 1.2 要設計者注意什麼
- 先寫下要的體驗與情緒（#1 Emotion、#2 Essential Experience），再回推元素；四元素要服務同一個主題（#9、#11 Unification）。
- 迭代次數決定品質；每個原型都要回答一個具體問題，最大的風險先驗；先做「沒有目標也好玩」的玩具。
- 玩法相關的主軸透鏡：目標（#32）、行動（#31）、技巧（#34）、機率與期望值（#35、#36）、公平（#37）、挑戰（#38）、有意義的選擇（#39）、三角關係（#40）、獎懲（#46、#47）、簡單／複雜與優雅（#48、#49）、回饋與手感（#63、#64）、興趣曲線（#69）。
- 玩家會被「評判」——遊戲在評判什麼、玩家覺不覺得公平、想不想進步（#25）。

### 1.3 可直接拿來審設計的問題（Schell，英文原文見附錄 A）
- 本質：What experience do I want the player to have? What is essential to the experience? How can my game capture that essence?（#2）
- 玩具：If my game had no goal, would it be fun at all?（#17）
- 心流：Does my game have clear goals? Are the goals of the player the same goals I intended? Does my game provide a steady stream of gradually increasing challenges? Are the player's skills improving as expected?（#21）
- 選擇：What choices am I asking the players to make? Are they meaningful? … Are there any dominant strategies in my game?（#39）
- 風險報酬：Do I have triangularity now? … are the rewards commensurate with the risks?（#40）
- 機率：What in my game is truly random? What parts just feel random? Does the randomness give the players positive feelings of excitement and challenge, or negative feelings of hopelessness and lack of control?（#36）
- 公平 vs 量測：Which is more important: that my game is a reliable measure of who has the most skill, or that it provide an interesting challenge to all players?（#37）
- 技巧 vs 機率：Are my players here to be judged (skill), or to take risks (chance)?（#41）
- 動腦 vs 動手：If "1" means all physical, and "10" means all mental, what number would my game get?（#42）
- 優雅：What are the purposes of each element? … For elements with only one or two purposes, can some of these be combined into each other, or removed altogether?（#49）
- 湧現：How may [sic] verbs do my players have? How many objects can each verb act on? How many ways can players achieve their goals?（#30）
- 獎勵：Do my players understand their rewards? Are the rewards my game gives out too regular? … How are my rewards building? Too fast, too slow, just right?（#46）
- 懲罰：Why am I punishing the players? … Is there a way to turn these punishments into rewards and get the same, or a better effect?（#47）
- 回饋：What do players need to know at this moment? What do players want to know at this moment?（#63）
- 手感：Is my interface giving the player continuous feedback for their actions? … When I give the player a reward, how many ways am I simultaneously rewarding them?（#64）
- 進度：What progress is visible, and what progress is hidden?（#55）
- 時間：Are my players frustrated because the game ends too early, or bored because the game is too long? … Would a hierarchy of time structures help my game?（#27）
- 興趣曲線：#69 全部。
- 終檢：八道濾網（#15）；"Does my game feel right?"（#53）

### 1.4 限制與常見誤用
- 透鏡是一大堆問句，本身不告訴你優先順序；116 張全部套一遍只會淹沒重點。Schell 自己提供的收斂工具是 #53 Balance 的那一句（"Does my game feel right?"）和試玩。【推論】
- 透鏡之間會互相拉扯（例如 #49 Elegance 要刪減元素，#30 Emergence 要增加動詞與物件），書裡用「平衡類型」處理，但沒有給決策規則。【推論】
- 編號隨版本變動（見開頭說明）。
- 牌組裡的問句不等於書中完整論述（書裡每個透鏡前後都有說明與例子），重要判斷要回頭看章節。【推論】

### 1.5 來源
- Deck：https://deck.artofgamedesign.com/ （下載 `assets/strings/en.json`）【一手】
- 第三版目錄：https://github.com/leonlee/deck-of-lenses （`book/source-index.json`、`book/README.md`）【二手：第三方 EPUB 目錄索引】
- Schell Games 部落格〈Lens of The Eight Filters〉https://schellgames.com/blog/lens-of-the-eight-filters 【一手：公司官方】
- 濾網名稱：搜尋摘要（CIRCA wiki https://circa.cs.ualberta.ca/index.php/CIRCA:The_Art_of_Game_Design_-_Jesse_Schell ，本輪連不上）【二手】

---

## 2. MDA（Hunicke, LeBlanc, Zubek 2004）

### 2.1 主張【一手：論文 PDF https://users.cs.northwestern.edu/~hunicke/MDA.pdf】
- 三層的原文定義：
  - "**Mechanics** describes the particular components of the game, at the level of data representation and algorithms."
  - "**Dynamics** describes the run-time behavior of the mechanics acting on player inputs and each others outputs over time."
  - "**Aesthetics** describes the desirable emotional responses evoked in the player, when she interacts with the game system."
- 遊戲比較像人造物而不是媒體："the content of a game is its behavior — not the media that streams out of it towards the player." 遊戲「被消費」的過程本身難以預測。
- **看的方向相反**："From the designer's perspective, the mechanics give rise to dynamic system behavior, which in turn leads to particular aesthetic experiences. From the player's perspective, aesthetics set the tone, which is born out in observable dynamics and eventually, operable mechanics." 同時考慮兩邊，"encourages experience-driven (as opposed to feature-driven) design."
- 每一層都可以當成一個 lens，彼此分開但有因果關係，小改動會在層之間連鎖擴散。
- 要把「fun」換成更有方向的詞彙。八種美感（論文原文、原順序）：
  1. Sensation — Game as sense-pleasure
  2. Fantasy — Game as make-believe
  3. Narrative — Game as drama
  4. Challenge — Game as obstacle course
  5. Fellowship — Game as social framework
  6. Discovery — Game as uncharted territory
  7. Expression — Game as self-discovery
  8. Submission — Game as pastime
  原文說這份分類 "includes but is not limited to"。例子：Charades = Fellowship, Expression, Challenge；Quake = Challenge, Sensation, Competition, Fantasy（注意 "Competition" 不在八類裡，論文自己就沒有嚴格守住分類）；The Sims = Discovery, Fantasy, Expression, Narrative；Final Fantasy = Fantasy, Narrative, Expression, Discovery, Challenge, Submission。
- **美感模型 → 動態模型 → 機制調整**：競爭型遊戲需要對手、各方都想贏、清楚看得出誰在領先；"If the player doesn't see a clear winning condition, or feels like they can't possibly win, the game is suddenly a lot less interesting." Challenge 來自 "time pressure and opponent play"；Fellowship 來自團隊共享資訊、單打很難達成的勝利條件；Expression 來自留下個人印記的系統；戲劇張力來自 "a rising tension, a release, and a denouement"。
- **Monopoly 範例**：領先者越來越有錢、懲罰別人越來越有效，"As the gap widens, only a few (and sometimes only one) of the players is really invested. Dramatic tension and agency are lost." 修法有補助落後者、對領先者課稅、加時間壓力；然後 **tuning**：迭代調整數值，同時注意「稅的計算太複雜，玩家反而追不到自己的處境」。
- 2d6 的機率模型可以用來預估遊戲長度、評估盤面改動的影響。

### 2.2 要注意什麼
- 討論玩法要先講要哪幾種美感、各自佔多少比重，再談動態，最後才是機制。
- 留意回饋迴圈（強者恆強）會不會讓落後者失去投入感。
- 判斷一個元件好不好，一定要看它在系統中產生的行為，不能單獨評估（論文的 AI 保母範例："game components cannot be evaluated in vacuo"）。

### 2.3 審查問題
- 這份設計的主要美感是哪 2–3 種？誰是主、誰是輔？（Charades "emphasizes Fellowship over Challenge"）【一手】
- 每個目標美感各由哪些動態撐起？那些動態又由哪些機制產生？有沒有哪個機制找不到它服務的美感？【一手＋推論】
- 有沒有正回饋迴圈讓落後者提早出局？要不要補助落後者或抑制領先者？【一手】
- 玩家看得出勝利條件、看得出誰在領先嗎？【一手】
- 修補的機制會不會讓計算變複雜，反而削弱玩家對局勢的掌握？【一手】

### 2.4 限制與批評
- **Wolfgang Walk〈From MDA to DDE〉（Game Developer 部落格，2015-11-11）**【一手：Walk 本人】，主要論點：MDA 放不進敘事設計；"Mechanics" 太廣（資料表現常是圖像或聲音，本質上屬於美術；他引 Frank Lantz 的解讀，說 mechanics 包含設計者能控制的一切）；"Aesthetics" 這個詞有歧義，也漏了核心的「體驗」；M→D→A 的順序讀起來像時間軸，但實際上三層同時發生；沒有製作流程與玩家旅程的視角；沒談衝突與對抗。他提出 **DDE**：Design（Blueprint／Mechanics／Interface）→ Dynamics（引用 Sicart 的 player-subject）→ Experience（感官、情緒、智性三條旅程；把動態當成玩家的 antagonist）。Walk 把它定位為升級版，不是否定 MDA。https://www.gamedeveloper.com/design/from-mda-to-dde
- 本輪沒核到 DDE 的正式學術版本（常被引為 Walk, Görlich & Barrett 2017，收錄於 Springer 的 *Game Dynamics*）。【未核實】
- 維基百科整理的批評：八種美感缺少基礎理論；太偏重機制、忽略其他設計面向，不適合遊戲化或以體驗為主的設計。【二手：https://en.wikipedia.org/wiki/MDA_framework 】
- 常見誤用：把 Aesthetics 當成「美術」；把 MDA 當成線性生產流程（先寫機制再看美感）。【推論，與 Walk 的批評一致】

---

## 3. Raph Koster《A Theory of Fun for Game Design》（2004；10 週年版 2013）

### 3.1 主張
- 樂趣就是學習：書中名句 "That's what games are, in the end. Teachers. Fun is just another word for learning."【二手：Goodreads 引文頁、多個書評】
- "Boredom is the opposite of learning."【二手：Goodreads 引文，未核到原文】
- 好遊戲的定義（書評轉引）："one that teaches everything it has to offer before the player stops playing."【二手：chadprevost.com 2014 文章轉引】
- Koster 自己把「樂趣」定義得很窄，把它和其他享受分開：**fun（書中稱 kfun）** = "the positive feedback given by the brain for cognitive learning"；**delight**（美感欣賞）是 "primarily an act of recognition"；另外還有 **visceral reactions** 和 **social status maneuvers**。他也承認不該把 flow 和 fun 畫上等號，說自己 "tired of people saying that 'flow' = 'fun'"。【一手：Koster 部落格〈Sorts of fun, sorts of kfun?〉2005-11-01 https://www.raphkoster.com/2005/11/01/sorts-of-fun-sorts-of-kfun/ 】
- 10 年後（GDC Online 2012 主題演講）：新的科學證據只讓理論更站得住（"the more science that has come out over the last ten years, the more this entire thing has been validated"）；他把多巴胺說成 "a teaching signal to the brain"；也承認很多人討厭這種「機械化的化約」，並反問 "How do you write a game about the taste of a peach?"【二手：Game Developer 2012 報導 https://gamedeveloper.com/design/raph-koster-s-theory-of-fun-ten-years-on 】
- 搜尋摘要提到 Koster 的 10 年回顧投影片承認原始表述是 "fun is the emotional response to learning"，"just another word for learning" 是 Crawford 式的濃縮說法。【二手：搜尋摘要；投影片 PDF（138 頁、19 MB，https://www.raphkoster.com/wp-content/uploads/2026/07/Theory-of-Fun-10-Years-Later.pdf ）抓得到但抽不出文字，沒讀到】

### 3.2 要注意什麼
- 玩家精通某個模式之後就會無聊，遊戲得持續提供可以學的新模式，或讓已學會的技能有新用途。
- 不是所有享受都是 kfun；審查時要分清楚這份設計靠的是學習、美感、身體反應還是社交地位。

### 3.3 審查問題
- 玩家在第 1、10、100 局各在學什麼？學完之後還剩什麼可學？【推論，依 Koster】
- 遊戲有沒有在玩家停玩之前，把它所有能教的都教完？（還是太早教完，或根本教不完）【二手引文】
- 這份設計的享受主要來自 kfun、delight、visceral 還是 social status？比重合不合目標？【一手：Koster 2005】

### 3.4 限制
- 定義刻意收窄，把 MDA 的 Submission、Fellowship 這類享受排除在 kfun 之外；拿它當「好玩」的全部標準會誤判放鬆型、社交型的遊戲。【推論】
- 批評者反對「把人化約成模式辨識機器」。【二手：搜尋摘要】

---

## 4. Dan Cook（Lostgarden）

### 4.1〈The Chemistry of Game Design〉（Gamasutra，2007-07-19）【一手：https://www.gamedeveloper.com/design/the-chemistry-of-game-design 】
- **Skill atom**："a self contained atomic feedback loop"，由四部分組成：**Action**（玩家做動作）→ **Simulation**（遊戲狀態更新）→ **Feedback**（"The game provides some form of feedback to the player to let them know how the simulation has changed state"）→ **Modeling**（玩家吸收回饋、修正心智模型；進步帶來樂趣，精通帶來更大的喜悅，白費力氣帶來無聊或挫折）。玩家常要繞好幾圈才真正懂。
- **Skill chain**："a directed graph of atoms"，前一個 atom 產出的技能是後面 atom 的動作基礎；卡在前面的玩家碰不到後面。
- 原子的狀態：Mastered、Partially mastered、Unexercised、Active（精通後當工具反覆使用＝"the Grind"）、**Burned out**（失去興趣）。
- 玩家模型：玩家（不論是否自覺）都被驅動去學「感知價值高」的新技能；精通的樂趣會隨重複遞減，但技能本身仍然有用。
- 無聊與倦怠的來源：學會了卻沒有有趣的用處（burnout）；早期倦怠會切斷所有下游；後期倦怠讓既有技能失去目的；對玩家「已有技能」的假設錯了，造成挫折；已經會的玩家被冗長教學弄煩。
- 診斷用途：試玩時逐個 atom 追蹤倦怠，用記錄工具看哪些 atom 亮起、哪些熄滅；畫出技能鏈，找出需要的前置技能、需要回饋的地方、樂趣發生的位置；管理早期倦怠就是在管理學習曲線。

### 4.2〈Loops and Arcs〉（Lostgarden，2012-04-30）【一手：https://lostgarden.com/2012/04/30/loops-and-arcs/ 】
- **Loop**：心智模型 → 對系統行動 → 回饋 → 更新模型；是碎形的，各層級都有；"deliver value through the act of being exercised"，累積成可以遷移到新情境的「wisdom」。
- **Arc**："An arc is a broken loop you exit immediately." 不是設計來重複使用的，傳遞的是預先處理好的資訊（回饋佔 99%）；交付完重玩價值就掉下去。arc 一個接一個可以延長留存，但會掉進「content treadmill」——一停產就失敗。
- 核心問題："What repeats and what does not?" 建議：把一個類型裡的 arc（謎題、任務、不影響玩法的敘事）剝掉，看剩下的 loop 撐不撐得住；拿掉會被「破關」、或重玩就變無聊的元素。他也提醒別搞成「loop 派 vs arc 派」的對立，arc 很重的傳統設計也可能是對的選擇。

### 4.3 審查問題
- 列出這份設計要玩家學會的每一個技能，各自的 action／simulation／feedback／modeling 齊全嗎？哪一環缺了？【一手】
- 技能鏈的起點假設玩家已經會什麼？假設錯了，誰會被卡住？【一手】
- 哪個技能學會之後沒有新用途（會倦怠）？倦怠出現在鏈的早段還是晚段？【一手】
- 什麼會重複、什麼不會？把 arc 剝掉之後，loop 本身還好玩嗎？【一手】

### 4.4 限制
- Skill atom 用學習來解釋樂趣，和 Koster 一樣偏重 kfun；對社交、表達、放鬆的解釋力比較弱。【推論】
- 「感知價值」怎麼量化，文中沒有給方法。【推論】

---

## 5. Salen & Zimmerman《Rules of Play》（MIT Press，2003/2004）

### 5.1 主張
- **Meaningful play（描述性定義）**：意義從「玩家行動」和「系統結果」之間的關係中浮現。【二手：維基百科 https://en.wikipedia.org/wiki/Meaningful_play 】
- **評價性定義**（p.34）："Meaningful play occurs when the relationships between actions and outcomes in a game are both discernable and integrated into the larger context of the game."【二手：Paolo Pedercini 課程頁 https://mycours.es/egd/?p=1134 、維基百科等多處引用，頁碼一致】
  - **Discernable**：玩家感知得到「我做了什麼、發生了什麼」（回饋、結果）。
  - **Integrated**：這個結果在遊戲更大的走向裡有影響（書中用語是 "affects the play experience at a later point in the game"）。【二手】
- **三層規則**（第 12 章 "Rules on Three Levels"）：**Constituative**（底層的數學、邏輯結構）、**Operational**（規則書上寫的、引導玩家行為的規則）、**Implicit**（禮儀、運動家精神這類沒寫出來的規則）。【二手：TOC 轉述與課程頁】
- **Magic circle**（第 9 章）：遊戲劃出一個有界的時空與意義範圍；摘要說可以在三個層次運作：時空界線、對遊戲內物件意義的重新詮釋、遊戲內社會關係的重塑；也被描述成一種社會契約。【二手：書評轉述】
- 課程頁延伸出 **null choices** 的概念："a choice that is predetermined, random, irrelevant, or dominated by an obvious option."（這是 Pedercini 的整理，不是書中原文）【二手】

### 5.2 審查問題
- 每個主要動作做下去，玩家當下分得出結果嗎？（discernable）【二手】
- 這個結果三回合、三十秒、三局之後還有影響嗎？（integrated）【二手】
- 有沒有 null choice：答案早就決定好、純隨機、不影響結果、或明顯有一個選項壓倒其他？【二手：Pedercini】
- 有哪些 implicit rules（禮儀、默契）在左右體驗？要不要寫進正式規則？（可以和 Schell #33 Rules 的 "house rules" 問題對照）【推論】

### 5.3 限制
- 本輪沒讀到書中原文，以上全部是二手。
- Discernable 和 integrated 是必要條件，但不是充分條件：兩者都滿足的選擇，仍然可能因為有優勢策略而變得無聊（要配合 Schell #39）。【推論】
- Magic circle 在遊戲研究裡爭議很大（界線其實是會滲透的），本輪沒有查證細節。【未核實】

---

## 6. Tracy Fullerton《Game Design Workshop: A Playcentric Approach》（第 5 版）

### 6.1 主張
- 出版社目錄【一手：Routledge 第 5 版頁 https://www.routledge.com/link/link/p/book/9781032607016 】：Part I Game Design Basics（Ch1 The Role of the Game Designer／Ch2 The Structure of Games／**Ch3 Working with Formal Elements／Ch4 Working with Dramatic Elements／Ch5 Working with System Dynamics**）；Part II Designing a Game（Ch6 Ideation／**Ch7 Prototyping／Ch8 Digital Prototyping／Ch9 Playtesting／Ch10 Functionality, Completeness, and Balance／Ch11 Fun and Accessibility**）；Part III Working as a Game Designer。第 5 版強調 playcentric 的「以情緒為核心的體驗目標」（emotion-focused experience goals）。
- **Formal elements（8 個）**：Players、Objectives、Procedures、Rules、Resources、Conflict、Boundaries、Outcome。【二手：TUM 圖書館目錄轉述的章節小節、Nottingham G54GAM 講義】Conflict 是在玩家依規則追求目標、規則與程序擋住直接路徑時產生的。【二手：Nottingham 講義】
- **Dramatic elements**：Challenge、Play、Premise、Character、Story（書評說這章先談 challenge 與 play，再談 premise、dramatic arc 怎麼在遊戲裡出現）。【二手：GBGames 部落格 2014】
- **System dynamics**：系統的物件、屬性、關係、湧現、回饋循環；書評提到資源交換、湧現系統、回饋循環。【二手：GBGames 書評；細項未核到原文】
- **原型四階段**：Foundation → Structure → Formal Details → Refinement；先自己一個人玩核心玩法，需要時才加規則。【二手：GBGames，第 3 版的練習 7.9】
- **試玩**：從招募玩家、安排場次談起；第 10、11 章的標題就是試玩要驗的東西——功能、完整、平衡；樂趣、易上手。【一手：目錄＋二手：書評】

### 6.2 審查問題
- 八個 formal element 逐項填得出來嗎？哪一格是空的或含糊的？（特別是 Conflict 和 Outcome）【二手】
- 玩家體驗目標寫成一句情緒描述了嗎？每次試玩都拿它來對照嗎？【一手：出版社描述】
- 現在這個原型在四階段的哪一階？是不是在 Foundation 還沒穩的時候就去磨 Formal Details？【二手】
- 這一輪試玩要驗的是功能、完整、平衡、樂趣、易上手當中的哪一項？【一手：目錄】

### 6.3 限制
- 書的內文幾乎都只能透過二手材料確認；formal elements 有些摘要只列七項（漏了 Resources），要以章節小節為準。
- 是教學流程書，對「為什麼某個機制好玩」的理論解釋不多，需要搭配 MDA、Koster、Cook。【推論】

---

## 7. 決定、運氣與不確定性

### 7.1 Elias, Garfield, Gutschera《Characteristics of Games》（MIT Press 2012；平裝 2020）
- Eric Zimmerman 的序【一手：序文作者本人 https://www.ericzimmerman.com/assets/pdfs/Characteristics_of_Games_foreword.pdf ，PDF 字型編碼特殊，我用替換解碼讀出全文】：這本書刻意不談「遊戲會改變世界」，而是 "the nuts and bolts minutia of how games actually work"；作者們嘗試替技巧與運氣的比重**打出具體數字**（例如比較 Chess、Poker、Roulette），也替「決策密度隨時間的變化」畫圖，用來理解高潮與收尾在系統中如何成形。
- **Catch-Up**（序文轉述書中概念）："in order to stay engaged, game players need to feel like the possibility exists for them to win, even up until the very end of a game… But at the same time players can't feel that only the end of the game matters — they need to sense that their actions have meaning from the very start, that all of their choices accumulate…"
- 目錄有 Ch2 Multiplayer Games、Ch5 Indeterminacy。【二手：零售商目錄轉述】出版社介紹的分析軸包括玩家人數、規則、需要多少運氣與技巧、reward/effort ratio。【二手：書店頁】
- Skaff Elias 在 GDC Next 2013 的場次〈Luck and Skill in Games〉：開頭就說 "Luck and skill are commonly thought of as opposing characteristics of games"，主張兩者並非簡單的對立面，因為兩者都可能來自玩家、也可能來自遊戲本身。【一手：GDC Vault 場次說明 https://gdcvault.com/play/1019678/Luck-and-Skill-in 】

### 7.2 Richard Garfield 的運氣觀【二手】
- 技巧和運氣最好當成兩條軸，而不是一條光譜的兩端；運氣多，讓玩家總覺得能從落後中翻盤，更願意玩；撲克每手牌只有幾分鐘，所以技巧在相對短的時間內就會顯現出來。【二手：轉述 Garfield〈Design Lessons from Poker〉演講的課堂 devlog https://vigentian.itch.io/devlogs/devlog/623570/devlog-9 ；演講場合未核實】
- 運氣是一種「社交平衡器」：純技巧遊戲的受眾比較窄，也比較難找到實力相當的對手。【二手：Tom Sloper 專欄 https://sloperama.com/mahjongg/column2/column808.html 】
- 他也被轉述說西洋棋裡有運氣，因為結果無法確定地預測。【二手：論壇轉述，有爭議】

### 7.3 Sid Meier「A game is a series of interesting decisions」（GDC 2012〈Interesting Decisions〉）
- 場次說明【一手：GDC Vault https://gdcvault.com/play/1015756/Interesting 】：重談 1989 年 GDC 提出的說法，檢視哪些決定本質上有趣、怎麼辨認或加入這類決定、節奏的影響、玩家需要哪些資訊與回饋。錄影：https://www.youtube.com/watch?v=WggIdtrqgKg （61 分鐘；自動字幕抓不下來）
- 演講內容【二手：Leigh Alexander，Gamasutra 2012-03-07 https://www.gamedeveloper.com/design/gdc-2012-sid-meier-on-how-to-see-games-as-sets-of-interesting-decisions 】：
  - 用「缺席」來定義比較容易：玩家永遠選第一個選項，或選擇純隨機，就不有趣。他也說這個框架對節奏類、輸入型解謎遊戲比較不適用。
  - 有趣的決定通常有**取捨**（大劍要 500 金；最快的車最難操控）。
  - "Good decisions are **situational**"：選項的價值隨當下局勢而變。
  - 讓玩家表達**個人風格**（保守蓋防守、積極打進攻）；不要假設大家都和設計者一樣玩。
  - **持續性**：好的決定會影響遊戲一段有意義的時間，前提是玩家有足夠的資訊；可能毀掉後期的早期決定要小心呈現。
  - 類型：risk vs. reward；short vs. long term（奇觀蓋很久、影響深遠，戰車很快、影響小）；《文明》疊了短、中、長期的事件。
  - 小的客製化選擇（城市命名、車子顏色）可以加深連結。
  - **資訊**：寧可給太多，不要太少；熟悉的類型慣例讓人安心；熟悉的操作出現意外結果最讓人不安。
  - **回饋**："The worst thing you can do is just move on." 一個音效就有用；回饋也在強化玩家的幻想。
  - **節奏**：複雜決定接連出現，玩家會失控；簡單決定放在慢的時段，玩家會無聊。
  - 調整槓桿：風險報酬平衡、影響力、資訊、時間限制、選項數量；試過的東西大約三分之一以上最後被拿掉。

### 7.4 Greg Costikyan《Uncertainty in Games》（MIT Press 2013）
- 核心主張：不確定性是遊戲吸引力的根本，可預測會扼殺樂趣。【二手：出版社介紹與 Publishers Weekly 書評】
- 不確定性的來源（第 5 章 Sources of Uncertainty）。本輪**核實到的名稱**：performative uncertainty、analytic complexity、narrative anticipation【二手：書介】；hidden information、development anticipation、uncertainty of perception【二手：書評】；solver's uncertainty（"the challenge of figuring out how to solve a highly constrained problem with a limited set of resources"）、hidden information、narrative anticipation【學術：To, Ali, Kaufman & Hammer, "Integrating Curiosity and Uncertainty in Game Design", DiGRA/FDG 2016 https://dl.digra.org/index.php/dl/article/view/793 】；另外 randomness（luck）有獨立討論。
- **數量有出入**：To 等人說 Costikyan "unpacks the concept of uncertainty into ten different concepts"；另一份文獻摘要寫 11 種。我記憶中的 player unpredictability、schedule uncertainty、semiotic uncertainty 本輪沒核到。【未核實】

### 7.5 Input randomness vs output randomness
- Keith Burgun〈Randomness and Game Design〉（Game Developer 部落格，2014）【一手】：
  - "**Output randomness** is noise injected between the player's decision and the outcome."（Risk、Memoir '44 的骰子戰鬥，X-Com、FTL 的命中判定）
  - "**Input randomness** — this type of randomness informs the player before he makes his decision."（《文明》、Rogue 的地圖生成，Puerto Rico、Agricola 翻開的板塊）
  - 兩者 "technically exist on a continuum"；如果玩家沒時間回應新資訊，或每局產生的問題難度差太多，input randomness 也會出現類似 output randomness 的問題。
  - 他的立場是 output randomness 不屬於策略遊戲：決定論系統讓湧現複雜度「最有效」，因為每個局面都承載完整的歷史脈絡；隨機會「切斷時間線」。他也區分 unpredictability 和 randomness：西洋棋有前者、沒有後者。
  - 他在後續文章說這組術語不是他發明的，出自 Ludology Podcast。【二手：搜尋摘要轉述 keithburgun.net】
  - https://www.gamedeveloper.com/design/randomness-and-game-design

### 7.6 審查問題（本節綜合）
- 每個決定的取捨是什麼？最佳解會隨局勢改變嗎？有沒有永遠選它就對的選項？【Meier 二手；Schell #39 一手】
- 玩家做決定的時候，資訊夠嗎？（寧多勿少）決定之後立刻有回饋嗎？【Meier 二手】
- 決定的節奏：複雜決定有沒有擠在一起？慢的時段是不是只剩無聊的小決定？【Meier 二手】
- 落後的人到最後一刻還覺得有機會嗎？同時，前面的決定還算數嗎？（Catch-Up 的兩難）【CoG 序文 一手】
- 隨機發生在決定之前（input，給你問題）還是之後（output，改變結果）？玩家有沒有時間回應新的隨機資訊？【Burgun 一手】
- 這款遊戲的不確定性主要從哪裡來：手的表現、解題、對手、隨機、分析複雜度、隱藏資訊、敘事期待？哪一種是主力？【Costikyan 二手/學術】
- 技巧要多久才顯現得出來？一局夠不夠長，讓技巧蓋過運氣？還是本來就希望弱者偶爾能贏？【Garfield 二手】

### 7.7 限制
- Meier 的內容只透過媒體轉述確認；他自己說這個框架不適合節奏類遊戲。
- Burgun 的立場只針對「策略遊戲」，而且很強硬；對派對、社交、短局遊戲不能直接套。【推論】
- Characteristics of Games 的正文本輪沒讀到，只有序文和目錄。

---

## 8. Tynan Sylvester《Designing Games: A Guide to Engineering Experiences》（O'Reilly 2013）

### 8.1 主張【二手：GBGames 書評 2014 https://www.gbgames.com/2014/05/07/book-review-designing-games-by-tynan-sylvester/ ；目錄來自零售商頁】
- 遊戲是 "an artificial system for generating experiences"，要把遊戲想成「體驗引擎」（engine of experience）；書評批評這個定義太寬（連迪士尼遊樂設施都算）。
- **Mechanics → Events → Emotions**：機制是規則（可以跑）；事件是規則與遊玩交會時實際發生的事（真的在跑）；遊戲只能間接創作事件。事件的分量來自它引發的情緒，而情緒來自「改變了玩家在乎的某個價值」（《Minecraft》的危險→安全，《Lemonade Stand》的貧窮→富有，WoW 公會的陌生人→朋友）；連續事件的分量可以遞增（Pac-Man 連吃鬼）。
- 目錄：Ch1 Engines of Experience；Ch2 **Elegance**、Ch3 **Skill**、Ch4 Narrative、Ch5 **Decisions**、Ch6 **Balance**、Ch7 Multiplayer、Ch8 Motivation and Fulfillment、Ch9 Interface、Ch10 The Market；Part 3 Process（Planning and Iteration、Knowledge Creation、Dependencies、Authority、Motivation、Complex Decisions、Values）。
- Elegance 章談「用少數機制產生湧現的複雜度」；Skill 章談技巧同時決定入門門檻和深度（井字棋對大人已經被解掉，西洋棋的技巧上限沒有人碰到過）。
- **Apophenia**（"our tendency to see patterns in complex data"）：給夠多的線索，玩家會自己編出湧現的故事；最簡單的技巧是**命名**——兩隻一模一樣的怪物，叫 Poindexter 和 Grunt，看起來就像聰明程度不同。
- 流程：借用 *The Lean Startup* 的「計畫 → 建造 → 測試」迴圈；用實驗消除不確定性；dependency stack 決定先做什麼，並找出最底層的核心玩法。

### 8.2 審查問題
- 每個機制會產生哪些事件？那些事件改變了玩家在乎的哪個價值？【二手】
- 技巧門檻多低、技巧上限多高？中間的人會在哪裡失去興趣？【二手】
- 有沒有用命名或標籤這類低成本手段，讓玩家替系統行為腦補意義？【二手】
- 依賴堆疊的最底層是什麼？那一層驗證過了嗎？【二手】

### 8.3 限制與找不到
- 本輪沒找到書中對 elegance 的正式定義、「emotional triggers」的清單、skill 章的 skill range／elastic challenge 等細節；書評也說書中沒有討論 MDA。

---

## 9. 動機與心流

### 9.1 Csikszentmihalyi 的心流條件（經 Jenova Chen 引述）
- Chen 的論文引 *Flow* (1990)，列出八個組成：1 A challenging activity that requires skills；2 The merging of action and awareness；3 Clear goals；4 Direct feedback；5 Concentration on the task at hand；6 The sense of control；7 The loss of self-consciousness；8 The transformation of time。"Not all of these components are needed for flow to be experienced."【二手：Chen 引述 Csikszentmihalyi；Chen 本人是一手】

### 9.2 Jenova Chen〈Flow in Games〉（CACM 50(4), 2007；USC 碩士論文 2006）【一手：https://www.jenovachen.com/flowingames/ 下的 p31-chen.pdf、Flow_in_games_final.pdf】
- Chen 把八項收斂成遊戲的三個核心要素：遊戲本身值得玩、挑戰和能力相符、玩家感到能掌控；結果是玩家忘了時間和自我意識。
- **Flow Zone**：挑戰超過能力就焦慮，挑戰不夠就無聊、離開；有一段「模糊的安全區」可以容忍暫時刺激不足，"assuming we are given hope that more is on the way"。
- 不同玩家的 flow zone 不同；多數遊戲只提供一條狹窄、靜態的難度線，老手和新手都不會覺得好玩。
- 但選項不能硬塞："simply increasing the number of choices is costly. Too many choices overwhelm the user… Being required to make frequent choices could also be annoying"。
- 四步方法論："Mix and match the components of Flow; Keep the user's experience within the user's Flow Zone; Offer adaptive choices, allowing different users to enjoy the Flow in their own way; and Embed choices inside the core activities to ensure the Flow is never interrupted."
- 論文區分 **passive DDA**（系統監測玩家、自動調整；問題在 "No direct data"——遊戲讀不到玩家在想什麼，而且 DDA 會把控制權從設計者手上拿走）和 **active DDA**（把難度選擇嵌進核心玩法，讓玩家用「玩」來選）。
- flOw 的設計要點（作者網站）："Transparent and meaningful choices"、"Small risk, small reward; Big risk, big reward"、"Minimal penalty, no Flow breakers"、極簡操作讓新手進得來，速度和轉向之間的取捨讓老手有東西可以精通。

### 9.3 SDT 與 PENS（Ryan, Rigby & Przybylski 2006；Rigby & Ryan《Glued to Games》2011）
- Ryan, Rigby & Przybylski, "The Motivational Pull of Video Games: A Self-Determination Theory Approach", *Motivation and Emotion* 30:347–363 (2006)【學術：摘要】：四個研究；遊戲內的 autonomy 和 competence 知覺，和享受、偏好、遊玩前後的幸福感變化相關；competence 與 autonomy 也和「操作直覺」以及 presence/immersion 有關；在線上多人玩家當中，autonomy、competence、relatedness 各自獨立預測享受和未來遊玩意願。PENS 量表就是從這批研究發展出來的。
- Schell 第三版 Lens #22 直接問 "Does it fill the needs of competence, autonomy, and relatedness?"【一手：Deck】
- 本輪沒拿到 PENS 量表本身（selfdeterminationtheory.org 回 403），也沒讀到《Glued to Games》。【未核實】

### 9.4 Nicole Lazzaro〈Why We Play Games: Four Keys to More Emotion Without Story〉（XEODesign 白皮書，2004）【一手：http://www.xeodesign.com/xeodesign_whyweplaygames.pdf 】
- 方法：15 名硬核玩家＋15 名休閒玩家在自己常玩的環境玩 90–120 分鐘，另訪談 15 名非玩家；45 小時錄影、2,000 多筆觀察做親和圖分析。作者自己聲明 "beyond the methodology and scope of this study to produce statistically significant results"。
- **2004 年版的四把鑰匙原名**：
  1. **Hard Fun**：有意義的挑戰、策略、謎題 → Frustration、**Fiero**（克服逆境的個人勝利感）。
  2. **Easy Fun**：好奇與沉浸（模糊、不完整、細節）→ Wonder、Awe、Mystery。
  3. **Altered States**：遊戲改變玩家的內在狀態（清空腦袋、感覺比較好）→ Excitement、Relief。
  4. **The People Factor**：競爭、合作、表演、觀看 → Amusement、Schadenfreude、Naches。
  - 後來常見的說法是 Hard Fun／Easy Fun／Serious Fun／People Fun，那是後期改名，本輪沒核到出處。【未核實】
- 暢銷遊戲至少在四把鑰匙中的三把產生情緒；多人一起玩時，情緒表現的頻率和強度都明顯更高。

### 9.5 Quantic Foundry Gamer Motivation Model（Nick Yee、Nic Ducheneaut）【一手：https://quanticfoundry.com/2015/07/20/how-we-developed-the-gamer-motivation-profile-v2/ 】
- v2（2015）用 3 萬名玩家的資料做因素分析＋階層分群，得到 **12 個動機、兩兩一對，共 6 組**：
  - Action：Destruction（混亂、爆破）、Excitement（快節奏、腎上腺素）
  - Social：Competition、Community
  - Mastery：Challenge、Strategy
  - Achievement：Completion、Power
  - Immersion：Fantasy、Story
  - Creativity：Design（表達與深度客製）、Discovery（探索、拆解、實驗）
- 再往上歸成三大分支：Immersion-Creativity（文中寫 "Immersion-Exploration"）、Achievement-Mastery、Action-Social（作者用 Big Five 的外向性來解釋 Action-Social 為什麼會湊在一起）。
- 美國+加拿大、印尼、歐盟三區分開做因素分析，因素結構完全相同（不代表偏好強度相同）。
- 官方模型頁現在寫的樣本是 "over 140,000 gamers"。【一手：https://quanticfoundry.com/gamer-motivation-model/ 】

### 9.6 Bartle 玩家類型（1996）【一手：〈Hearts, Clubs, Diamonds, Spades: Players Who Suit MUDs〉https://mud.co.uk/richard/hcds.htm 】
- 兩條軸：x 軸是重視 players ↔ world，y 軸是 acting (on) ↔ interacting (with)。四象限：Achievers（act on world）、Explorers（interact with world）、Socialisers（interact with players）、Killers（act on players）。
- 來源：1989 年 11 月到 1990 年 5 月，一個英國商業 MUD 的資深玩家（wizzes）之間的長篇爭論，**不是問卷或統計**。
- 作者自己劃了範圍：對社交型 MUD、重角色扮演的 MUD 比較不適用；論文重點是玩家人口的動態平衡（改變一型的比例會牽動其他型）。
- 限制：Bartle 2009 年的章節〈Understanding the Limits of Theory〉說這是最常被誤解、誤用的理論【二手：搜尋摘要】；「Bartle Test」不是 Bartle 本人做的【二手】；類型專屬於 MUD／MMO，玩家的類型也會隨遊玩歷程改變【二手：Tuts+、gamified.uk】。

### 9.7 審查問題（本節）
- 挑戰的升級速度跟得上玩家的能力成長嗎？太快、太慢分別會在哪裡發生？【Chen 一手；Schell #21 一手】
- 不同程度的玩家能不能「用玩來選」自己的難度（例如冒險與否），而不是靠選單？【Chen 一手】
- 失敗的懲罰會不會打斷心流？（"Minimal penalty, no Flow breakers"）【Chen 一手】
- 玩家在哪裡感到勝任、自主、和別人有連結？操作直不直覺？【Ryan et al. 學術；Schell #22 一手】
- 這份設計主打四把鑰匙的哪幾把？至少有三把嗎？【Lazzaro 一手】
- 目標玩家在 12 個動機裡最看重哪 2–3 個？設計有沒有在服務它們？【Quantic Foundry 一手】

---

## 10. 共通骨架【推論，標出每一步分別由誰支撐】

把這些框架疊起來，會看到兩個巢狀的迴圈，加上一條時間軸。

### 10.1 外圈：設計者的迴圈
**體驗目標 → 結構 → 試玩觀察 → 修正 → 再試**
- 體驗目標：Schell #1/#2、MDA 的 aesthetics、Fullerton 的 player experience goals、Lazzaro 的情緒、Sylvester 的 events → emotions。
- 結構：Schell 的四元素／七類機制、MDA 的 mechanics、Fullerton 的 formal elements。
- 中間那層「實際跑起來的行為」才是體驗的來源，設計者只能間接控制：MDA 的 dynamics、Fullerton 的 system dynamics、Sylvester 的 events、Walk 的 Dynamics。
- 迭代：Schell 的 Rule of the Loop 與「先驗最大風險」、MDA 的 tuning、Fullerton 的四階段原型與試玩、Sylvester 的 plan-build-test、Cook 的逐 atom 追蹤倦怠。

### 10.2 內圈：玩家的迴圈
**目標 → 決定 → 行動 → 回饋 → 更新心智模型（學習）→ 精通 → 新的挑戰（或倦怠）**
| 步驟 | 支撐框架 |
|---|---|
| 目標清楚 | Csikszentmihalyi/Chen 的 clear goals；Schell #21、#32；MDA「看得到勝利條件」 |
| 有取捨的決定 | Meier（取捨、隨局勢變、可表達風格、有持續性）；Schell #39、#40；Fullerton 的 conflict |
| 行動 | Schell 的 Actions、#31；Cook 的 action |
| 可辨識的回饋 | Rules of Play 的 discernable；Cook 的 feedback；Schell #63、#64；Meier 的 "just move on"；Chen 的 direct feedback |
| 結果整合進大局 | Rules of Play 的 integrated；Meier 的持續性；Catch-Up 的「前面的決定要算數」 |
| 更新心智模型＝學習 | Cook 的 modeling；Koster 的 fun = learning；Schell 第 10 章的 Modeling；Burgun 的「recording skill」 |
| 精通 → 需要新挑戰 | Koster（精通後無聊）；Cook 的 skill chain 與 burnout；Chen 的 flow zone；Schell #38 |
| 不確定性讓結果保持開放 | Costikyan；Schell #36、#41；Catch-Up；Garfield |

### 10.3 時間軸：體驗的形狀
**鉤子 → 上升，中間穿插休息 → 高潮 → 收尾，而且是碎形（大曲線裡有小曲線）**
- Schell #69 的興趣曲線；MDA 的「rising tension, release, denouement」；Meier 的決定節奏；Cook 的 loop（可以重複）vs arc（只用一次）；Zimmerman 序文提到的「決策密度隨時間的曲線」。

### 10.4 驅動力：為什麼玩家在乎
- 人類需求（SDT 的勝任、自主、連結；Schell #22）× 個別差異（Quantic Foundry 的 12 動機、Lazzaro 的四把鑰匙、Bartle、MDA 的美感組合）。
- 共識：先決定**為誰、提供哪幾種**享受，再談機制；沒有一款遊戲要全部都給。

### 10.5 一句話版
**為特定玩家選定少數幾種體驗 → 用少數元素讓它們湧現（優雅）→ 讓每個決定有取捨、有可辨識且長期有效的回饋 → 讓玩家一直有東西可學、挑戰跟著能力升級 → 用不確定性讓結局保持開放、但讓前面的努力算數 → 整體的興趣曲線有鉤子、有起伏、有高潮 → 靠一輪又一輪的試玩去逼近它。**

---

## 11. 框架之間的衝突與張力

1. **「好玩」是單一還是多元？** Koster 刻意把 fun 收窄成學習（kfun），把 delight、visceral、社交地位都排除在外；MDA 有八種美感（包含 Submission「消遣」）、Lazzaro 四把鑰匙、Quantic Foundry 12 動機都主張多元。拿 Koster 的標準審放鬆型或社交型的遊戲會誤判。【推論，依各自一手】

2. **隨機：要排除還是當工具？** Burgun 認為 output randomness 不屬於策略遊戲、會削弱湧現的效果；Garfield 認為運氣是社交平衡器、讓人願意玩；Costikyan 認為不確定性是遊戲吸引力的根本；Schell 把 skill vs chance 列為要調的平衡，並問「你要可靠地量出誰最強，還是讓每個人都有有趣的挑戰」（#37）。**化解的關鍵是先回答 #37 和 #41**：遊戲是量測工具，還是共享的體驗？【推論】

3. **心流要平順，還是要有起伏與痛？** Chen 要 "Minimal penalty, no Flow breakers"，盡量讓玩家留在 zone 裡；Schell 的興趣曲線要 "periods of rest" 和 "grand finale"，Lens #47 說懲罰 "will make your game more meaningful"；Lazzaro 的 Hard Fun 是先挫折、再 Fiero。心流是**局內**的狀態，興趣曲線是**整段體驗**的形狀，兩者在不同時間尺度上，但在「失敗要多痛」這點確實衝突。【推論】

4. **難度由系統自動調，還是由玩家選？** Chen 批評 passive DDA（沒有直接資料、把控制權從設計者手上拿走），主張把選擇嵌進核心玩法；Schell 第 13 章有一節 "Dynamic Game Balancing"（內容沒核到）；在競技情境裡，DDA 會和 #37/#43 的「公平量測技巧」衝突。【推論】

5. **資訊透明 vs 不確定性。** Rules of Play 要結果可辨識，Meier 要資訊「寧多勿少」，Chen 要 "Transparent and meaningful choices"；Costikyan 的 hidden information、Schell 的 #29 Secrets 則靠資訊不對稱製造張力。化解方式：**規則與因果要透明，未來的局面可以不確定**——這和 Burgun 對 input 和 output randomness 的區分是同一件事。【推論】

6. **MDA 的方向與完整性。** MDA 說設計者從機制往上看、玩家從美感往下看；Walk 說三層同時發生、不是時間軸，而且 MDA 放不進敘事與介面；Schell 的四元素把 Story、Technology 當成同等的元素，#10 要「全像地」同時看結構和體驗。【一手各自】

7. **簡潔 vs 湧現。** Schell #49 Elegance 要合併或刪掉只有一兩個用途的元素；#30 Emergence 要增加動詞、物件、達成目標的途徑；Sylvester 說用少數機制產生湧現。兩邊共同的目標是「低固有複雜度、高湧現複雜度」（#48 的 innate vs emergent），但增減方向在個案裡會打架。【推論】

8. **獎勵怎麼發？** Schell #46 問 "Are the rewards my game gives out too regular? Can they be given out in a more variable way?"；SDT 文獻（本輪只查了 PENS 摘要）強調勝任與自主帶來的內在動機。外在、變動式獎勵和內在動機之間可能有張力。這點本輪沒有查證 SDT 對外在獎勵的具體主張。【推論，未核實】

9. **玩家分類的證據等級差很多。** Bartle 來自一場 MUD 論壇爭論、而且限定 MUD；Lazzaro 是 45 人的質性研究、作者聲明不具統計顯著性；Quantic Foundry 是數萬到十幾萬份問卷的因素分析；SDT 是同儕審查的心理學理論。**拿來做設計決策時要按證據強度加權。**【推論，依各自一手】

10. **Loop vs Arc。** Cook 提醒 arc 會快速倦怠、讓人陷入內容跑步機；Schell 的故事與興趣曲線、Fullerton 的戲劇元素都在經營 arc。這是取捨不是對錯，Cook 自己也說別搞成對立。【一手】

---

## 12. 找不到／未核實

- **Schell 書中原文**：Rule of the Loop 的原句、game 與 fun 的定義原句、四元素可見度的排序、八道濾網的名稱（只有二手）、第 9 章 "More Pleasure: MORE!" 補充了哪些快感、第 13 章 Dynamic Game Balancing 的立場。O'Reilly 第三版目錄頁被 403 擋，CIRCA wiki 連不上。
- **舊版與第三版的差異**（機制從六類變七類？透鏡從 100 → 113 → 116？）：只有記憶，沒核實。
- **DDE 的學術版本**（Walk, Görlich & Barrett 2017）：沒找到原文。
- **Koster** 原書中「精通後無聊」「chunking」的原句；10 週年投影片 PDF 抓得到，但抽不出文字。
- **Rules of Play** 全部只有二手；magic circle 的爭論沒查。
- **Fullerton** 內文（system dynamics 的細項、試玩方法論）只有二手。
- **Characteristics of Games** 正文、Garfield 演講的原始出處與場合。
- **Sid Meier** 演講逐字稿（YouTube 自動字幕需要權杖，抓不下來）；內容只有媒體轉述。
- **Costikyan** 完整的來源清單與數量（10 還是 11），以及 player unpredictability、schedule、semiotic 這三項。
- **Sylvester** 對 elegance 的正式定義、emotional triggers 清單、skill 章細節。
- **PENS 量表題目**與《Glued to Games》內容（SDT 中心網站回 403）。
- **Lazzaro** 後期的 Serious Fun／People Fun 改名出處。
- **Bartle** 2009〈Understanding the Limits of Theory〉原文（只看到搜尋摘要）。
- **Dan Cook** 後期對 skill atom 的修正（如果有的話）：沒查。

---

## 13. 給 game-design 技能的落地建議【推論】

- 審查清單可以照第 10 節的骨架排成五段：**體驗目標 → 結構與湧現 → 決定與回饋 → 學習曲線與挑戰 → 不確定性與興趣曲線**，最後用動機與證據等級做交叉檢查。每段挑 4–6 題（見附錄 A 與各節的審查問題），不要 116 張透鏡全套。
- 每題都附出處與版本（透鏡寫「第三版 #編號」）。
- 只要牽涉第 11 節的衝突（隨機、懲罰、DDA、獎勵發放），技能要先問使用者這款遊戲的定位（量測技巧，還是共享體驗；局長多長），再下判斷，不要給一套通用答案。

---

## 附錄 A：Schell 第三版中與玩法相關的透鏡（英文原文，取自官方 Deck of Lenses）

說明：標題是第三版書中的寫法（來自第三方 EPUB 索引），內文與問句取自官方 Deck（"Tenth Anniversary Edition"），原樣保留，包括牌組的錯字。

#### #1 The Lens of Emotion
（第三版 CH2〈The Designer Creates an Experience〉；Deck 分類：Experience）

> People may forget what you said, but they'll never forget how you made them feel. -Maya Angelou To make sure the emotions you create are the right ones, ask yourself these questions:

- What emotions would I like my player to experience? Why?
- What emotions are players (including me) having when they play now? Why?
- How can I bridge the gap between the emotions players are having and the emotions I'd like them to have?

#### #2 The Lens of Essential Experience
（第三版 CH2〈The Designer Creates an Experience〉；Deck 分類：Experience）

> To use this lens, stop thinking about your game, and start thinking about the experience of the player. Ask yourself these questions:

- What experience do I want the player to have?
- What is essential to the experience?
- How can my game capture that essence?

#### #4 The Lens of Surprise
（第三版 CH4〈The Experience Rises Out of a Game〉；Deck 分類：Experience）

> Surprise is so basic that we can easily forget about it. Use this lens to remind yourself to fill your game with interesting surprises. Ask yourself these questions:

- What will surprise players when they play my game?
- Does the story in my game have surprises? Do the game rules? Does the artwork? The technology?
- Do your rules give players ways to surprise each other?
- Do your rules give players ways to surprise themselves?

#### #5 The Lens of Fun
（第三版 CH4〈The Experience Rises Out of a Game〉；Deck 分類：Experience）

> Fun is desirable in nearly every game, though sometimes fun defies analysis. To maximize your game's fun, ask yourself these questions:

- What parts of my game are fun?
- What parts need to be more fun?

#### #6 The Lens of Curiosity
（第三版 CH4〈The Experience Rises Out of a Game〉；Deck 分類：Experience）

> To use this lens, think about the player's true motivations - not just the goals your game has set forth, but the reason the player wants to achieve those goals. Ask yourself these questions:

- What questions does my game put into the player's mind?
- What am I doing to make them care about these questions?
- What can I do to make them invent even more questions?

#### #7 The Lens of Endogenous Value
（第三版 CH4〈The Experience Rises Out of a Game〉；Deck 分類：Game）

> To use this lens, think about your players' feelings about items, objects, and scoring in your game. Ask yourself these questions:

- What is valuable to the players in my game?
- How can I make it more valuable to them?
- What is the relationship between value in the game and the players' motivations?

#### #8 The Lens of Problem Solving
（第三版 CH4〈The Experience Rises Out of a Game〉；Deck 分類：Game）

> Every game has problems to solve. To use this lens, think about the problems your players must solve to succeed at your game. Ask yourself these questions:

- What problems does my game ask the players to solve?
- Are there hidden problems to solve that arise as part of gameplay?
- How can my game generate new problems so that players keep coming back?

#### #9 The Lens of the Elemental Tetrad
（第三版 CH5〈The Game Consists of Elements〉；Deck 分類：Game）

> To use this lens, take stock of what your game is truly made of. Consider each element separately, and then all of them together as a whole. Ask yourself these questions:

- Is my game design using elements of all four types (Aesthetics, Technology, Mechanics and Story)?
- Could my design be improved by enhancing elements in one or more of the categories?
- Are the four elements in harmony, reinforcing each other, and working together toward a common theme?

#### #10 The Lens of Holographic Design
（第三版 CH5〈The Game Consists of Elements〉；Deck 分類：Process）

> To use this lens, you must simultaneously see your game structure and the player experience. You may shift your focus from one to the other, but it is far better to view your game and experience holographically. 

- What elements of the game make the experience enjoyable?
- What elements of the game may detract from the experience?
- How can I change game elements to improve the experience?

#### #15 The Lens of the Eight Filters
（第三版 CH8〈The Game Improves through Iteration〉；Deck 分類：Process）

> To use this lens, you must consider the many constraints on your design. Your design is only finished when it can pass through all eight filters without requiring a change. Ask yourself these questions:

- Does this game feel right?
- Will the intended audience like this game enough?
- Is this a well-designed game?
- Is this game novel enough?
- Will this game sell?
- Is it technically possible to build this game?
- Does this game meet our social and community goals?
- Do the playtesters enjoy this game enough?

#### #16 The Lens of Risk Mitigation
（第三版 CH8〈The Game Improves through Iteration〉；Deck 分類：Process）

> Because the sage always confronts difficulties, he never experiences them. - Tao Te Ching To use this lens, stop thinking positively, and start to seriously consider the things that could go horribly wrong with your game. Ask yourself these questions:

- What could keep this game from being great?
- How can we stop that from happening?

#### #17 The Lens of the Toy
（第三版 CH8〈The Game Improves through Iteration〉；Deck 分類：Game）

> To use this lens, stop thinking about whether your game is fun to play, and start thinking about whether it is fun to play WITH. Ask yourself these questions:

- If my game had no goal, would it be fun at all? If not, how can I change that?
- When people see my game, do they want to start interacting with it, even before they know what to do? If not, how can I change that?

#### #19 The Lens of the Player
（第三版 CH9〈The Game Is Made for a Player〉；Deck 分類：Player）

> To use this lens, stop thinking about your game, and start thinking about your player. Ask yourself these questions about the people who will play your game:

- In general, what do they like?
- What don't they like? Why?
- What do they expect to see in a game?
- If I were in their place, what would I want to see in a game?
- What will they like or dislike about my game in particular?

#### #20 The Lens of Pleasure
（第三版 CH9〈The Game Is Made for a Player〉；Deck 分類：Player）

> To use this lens, think about the kinds of pleasure your game does and does not provide. Ask yourself these questions:

- What pleasures does my game give to players? Can these be improved?
- What pleasures are missing from my game's experience? Why? Can they be added?

#### #21 The Lens of Flow
（第三版 CH10〈The Experience Is in the Player’s Mind〉；Deck 分類：Player）

> To use this lens, consider what is holding your player's focus. Ask yourself these questions:

- Does my game have clear goals? If not, how can I fix that?
- Are the goals of the player the same goals I intended?
- Do parts of the game distract players so they forget their goal? If so, can these distractions be reduced, or tied into the game goals?
- Does my game provide a steady stream of gradually increasing challenges?
- Are the player's skills improving as expected? If not, how can I change that?

#### #22 The Lens of Needs
（第三版 CH11〈The Player’s Mind Is Driven by the Player’s Motivation〉；Deck 分類：Player）

> To use this lens, stop thinking about your game, and start thinking about what basic human needs it fulfills. Ask yourself these questions:

- On which levels of Maslow's hierarchy is my game operating?
- Does it fill the needs of competence, autonomy, and relatedness?
- How can I make my game fulfill more basic needs than it already does?
- For the needs my game is already filling, how can it fill those needs even better?

#### #23 The Lens of Motivation
（第三版 CH11〈The Player’s Mind Is Driven by the Player’s Motivation〉；Deck 分類：Player）

> Every game is a complex ecosystem of motivations. To examine them more closely, ask yourself these questions:

- What motivations do players have to play my game?
- Which motivations are most internal? Which are most external?
- Which are pleasure seeking? Which are pain avoiding?
- Which motivations support each other?
- Which motivations are in conflict?

#### #24 The Lens of Novelty
（第三版 CH11〈The Player’s Mind Is Driven by the Player’s Motivation〉；Deck 分類：Player）

> Different isn't always better, but better is always different. - Scotty Meltzer To ensure you harness the powerful motivation of novelty, ask yourself these questions:

- What is novel about my game?
- Does my game have novelties throughout or just at the beginning?
- Do I have the right mix of the novel and the familiar?
- When the novelty wears off, will players still enjoy my game?

#### #25 The Lens of Judgment
（第三版 CH11〈The Player’s Mind Is Driven by the Player’s Motivation〉；Deck 分類：Player）

> To decide if your game is a good judge of the players, ask yourself these questions:

- What does my game judge about the players?
- How does it communicate this judgment?
- Do players feel the judgment is fair?
- Do they care about the judgment?
- Does the judgment make them want to improve?

#### #26 The Lens of Functional Space
（第三版 CH12〈Some Elements Are Game Mechanics〉；Deck 分類：Game）

> To use this lens, think about the space in which your game really takes place when all surface elements are stripped away. Ask yourself these questions:

- Is the space of this game discrete or continuous?
- How many dimensions does it have?
- What are the boundaries of the space?
- Are there sub-spaces? How are they connected?
- Is there more than one useful way to abstractly model the space of this game?

#### #27 The Lens of Time
（第三版 CH12〈Some Elements Are Game Mechanics〉；Deck 分類：Game）

> It is said that "timing is everything". Our goal as designers is to create experiences, and experiences are easily spoiled when they are too short or too long. Ask yourself these questions to make yours just the right length:

- What is it that determines the length of my gameplay activities?
- Are my players frustrated because the game ends too early, or bored because the game is too long?
- Setting a time limit can make gameplay more exciting. Is it a good idea for my game?
- Would a hierarchy of time structures help my game?

#### #28 The Lens of the State Machine
（第三版 CH12〈Some Elements Are Game Mechanics〉；Deck 分類：Game）

> To use this lens, think about what information changes during your game. Ask yourself these questions: 

- What are the objects in my game?
- What are the attributes of the objects?
- What are the possible states for each attribute?
- What triggers the state changes for each attribute?

#### #29 The Lens of Secrets
（第三版 CH12〈Some Elements Are Game Mechanics〉；Deck 分類：Experience/Game）

> Change who has what information, and you change your game completely. To use this lens, think about who knows what and why.

- What is known by the game only?
- What is known by all players?
- What is known by some or only one player?
- Would changing who knows what information improve my game in some way?

#### #30 The Lens of Emergence
（第三版 CH12〈Some Elements Are Game Mechanics〉；Deck 分類：Game）

> To make sure your game has interesting qualities of emergence, ask yourself these questions:

- How may verbs do my players have?
- How many objects can each verb act on?
- How many ways can players achieve their goals?
- How many subjects do the players control?
- How do side effects change constraints?

#### #31 The Lens of Action
（第三版 CH12〈Some Elements Are Game Mechanics〉；Deck 分類：Game）

> To use this lens, think about what your players can do and what they can't, and why. Ask yourself these questions:

- What are the basic actions in my game?
- What are the strategic actions?
- What strategic actions would I like to see? How can I change my game in order to make those possible?
- Am I happy with the ratio of strategic to basic actions?
- What actions do players wish they could do in my game that they cannot? Can I somehow enable these, either as basic or strategic actions?

#### #32 The Lens of Goals
（第三版 CH12〈Some Elements Are Game Mechanics〉；Deck 分類：Game）

> To ensure the goals of your game are appropriate and well balanced, ask yourself these questions:

- What is the ultimate goal of my game?
- Is that goal clear to players?
- If there are a series of goals, do the players understand that?
- Are the different goals related to each other in a meaningful way?
- Are my goals concrete, achievable and rewarding?
- Do I have a good balance of short and long term goals?
- Do players have a chance to decide their own goals?

#### #33 The Lens of Rules
（第三版 CH12〈Some Elements Are Game Mechanics〉；Deck 分類：Game）

> To use this lens, look deep into your game until you can make out its most basic structure. Ask yourself these questions:

- What are the foundational rules of my game? How do these differ from the operational rules?
- Are there "laws" or "house rules" that are forming as the game develops? Should these be incorporated into my game directly?
- Are there different modes in my game? Do they make things simpler, or more complex? Would the game be better with more or less modes?
- Who enforces the rules?
- Are the rules easy to understand, or are they confusing? If confusing, should I change the rules or explain them more clearly?

#### #34 The Lens of Skill
（第三版 CH12〈Some Elements Are Game Mechanics〉；Deck 分類：Game）

> To use this lens, stop looking at your game, and start looking at the skills you are asking of the players. Ask yourself these questions:

- What skills does my game require from the player?
- Are there categories of skill that this game is missing?
- Which skills are dominant?
- Are these skills creating the experience I want?
- Are some players much better at these skills than others?
- Does this make the game feel unfair?
- Can players improve their skills with practice?
- Does this game demand the right level of skill?

#### #35 The Lens of Expected Value
（第三版 CH12〈Some Elements Are Game Mechanics〉；Deck 分類：Game）

> To use this lens, think about the chance of different events occurring in your game, and what those mean to your player. Ask yourself these questions:

- What is the actual chance of a certain event occurring?
- What is the perceived chance?
- What value does the outcome of that event have? Can the value be quantified? Are there intangible aspects of value that I am not considering?
- Each action a player can take has a different expected value. Am I happy with these values? Do they give the player interesting choices? Are they too rewarding, or too punishing?

#### #36 The Lens of Chance
（第三版 CH12〈Some Elements Are Game Mechanics〉；Deck 分類：Game）

> To use this lens, focus on the parts of your game that involve randomness and risk, keeping in mind that those two things are not the same. Ask yourself these questions:

- What in my game is truly random? What parts just feel random?
- Does the randomness give the players positive feelings of excitement and challenge, or negative feelings of hopelessness and lack of control?
- Would changing my probability distribution curves improve my game?
- Do players have the opportunity to take interesting risks?
- What is the relationship between chance and skill in my game?

#### #37 The Lens of Fairness
（第三版 CH13〈Game Mechanics Must Be in Balance〉；Deck 分類：Game）

> To use this lens, evaluate the game from each player's point of view and skill level. Find a way to give each player a chance of winning that each will consider to be fair. Ask yourself these questions:

- Should my game be symmetrical? Why?
- Should my game be asymmetrical? Why?
- Which is more important: that my game is a reliable measure of who has the most skill, or that it provide an interesting challenge to all players?
- If I want players of different skill levels to play together, what means will I use to make the game interesting and challenging for everyone?

#### #38 The Lens of Challenge
（第三版 CH13〈Game Mechanics Must Be in Balance〉；Deck 分類：Game）

> Challenge is at the core of almost all gameplay. You could even say that a game is defined by its goals and challenges. When examining the challenges of your game, ask yourself these questions:

- What are the challenges in my game?
- Are they too easy, too hard, or just right?
- Can my challenges accommodate a wide variety of skill levels?
- How does the level of challenge increase as the player succeeds?
- Is there enough variety in the challenges?
- What is the maximum level of challenges in my game?

#### #39 The Lens of Meaningful Choices
（第三版 CH13〈Game Mechanics Must Be in Balance〉；Deck 分類：Game）

> When we make meaningful choices, it lets us feel like the things we do matter. To use this lens, ask yourself these questions:

- What choices am I asking the players to make?
- Are they meaningful? How?
- Am I giving the player the right number of choices? Would more make them feel more powerful? Would fewer make the game clearer?
- Are there any dominant strategies in my game?

#### #40 The Lens of Triangularity
（第三版 CH13〈Game Mechanics Must Be in Balance〉；Deck 分類：Game）

> Giving a player the choice to play it safe for a low reward, or to take a risk for a big reward is a great way to make your game interesting and exciting. To use this lens, ask yourself these questions:

- Do I have triangularity now? If not, how can I get it?
- Is my attempt at triangularity balanced? That is, are the rewards commensurate with the risks?

#### #41 The Lens of Skill vs. Chance
（第三版 CH13〈Game Mechanics Must Be in Balance〉；Deck 分類：Game）

> To help determine how to balance skill and chance in your game, ask yourself these questions:

- Are my players here to be judged (skill), or to take risks (chance)?
- Skill tends to be more serious that chance: Is my game serious or casual?
- Are parts of my game tedious? If so, will adding elements of chance enliven them?
- Do parts of my game feel too random? If so, will replacing elements of chance with elements of skill and strategy make the players feel more in control?

#### #42 The Lens of Head and Hands
（第三版 CH13〈Game Mechanics Must Be in Balance〉；Deck 分類：Game）

> To make sure your game has a good balance of mental and physical elements, use this lens. Ask yourself these questions:

- Are my players looking for mindless action, or an intellectual challenge?
- Would adding more places that involve puzzle solving in my game make it more interesting?
- Are there places where the player can relax their brain, and just play the game without thinking?
- Can I give the player a choice - either succeed by exercising a high level of dexterity, or by finding a clever strategy that works with a minimum of physical skill?
- If "1" means all physical, and "10" means all mental, what number would my game get?

#### #43 The Lens of Competition
（第三版 CH13〈Game Mechanics Must Be in Balance〉；Deck 分類：Game）

> Competitive games can satisfy the basic human urge to determine who is the most skilled. Use this lens to ensure that people want to win your game. Ask yourself these questions:

- Does my game give a fair measurement of player skill?
- Do people want to win my game? Why?
- Is winning this game something people can be proud of? Why?
- Can novices meaningfully compete at my game?
- Can experts meaningfully compete at my game?
- Can experts generally be sure they will defeat novices?

#### #44 The Lens of Cooperation
（第三版 CH13〈Game Mechanics Must Be in Balance〉；Deck 分類：Game）

> Collaborating and succeeding as a team is a special pleasure that can create lasting social bonds. Use this lens to study the cooperative aspects of your game. Ask yourself these questions:

- Cooperation requires communication. Do my players have enough opportunity to communicate? How could communication be enhanced?
- Are my players friends already, or are they strangers? If they are strangers, can I help them break the ice?
- Is there synergy (2+2=5) or antergy (2+2=3) when the players work together? Why?
- Do all the players have the same role, or do they have special jobs?

#### #45 The Lens of Competition vs. Cooperation
（第三版 CH13〈Game Mechanics Must Be in Balance〉；Deck 分類：Game）

> Balancing competition and cooperation can be done in many interesting ways. Use this lens to decide whether they are balanced properly in your game. Ask yourself these questions:

- If "1" is Competition and "10" is Cooperation, what number should my game get?
- Can I give players a choice whether to play cooperatively or competitively?
- Does my audience prefer competition, cooperation, or a mix?
- Is my team competition something that makes sense for my game? Is my game more fun with team competition, or with solo competition?

#### #46 The Lens of Reward
（第三版 CH13〈Game Mechanics Must Be in Balance〉；Deck 分類：Game）

> Ask these questions to determine if your game is giving out the right rewards in the right amounts at the right times:

- What rewards is my game giving out now? Can it give out others as well?
- Are players excited when they get rewards in my game, or are they bored by them? Why?
- Getting a reward you don't understand is like getting no reward at all. Do my players understand their rewards?
- Are the rewards my game gives out too regular? Can they be given out in a more variable way?
- How are my rewards related to one another? Is there a way they could be better connected?
- How are my rewards building? Too fast, too slow, just right?

#### #47 The Lens of Punishment
（第三版 CH13〈Game Mechanics Must Be in Balance〉；Deck 分類：Game）

> Punishment must be used delicately. Balanced appropriately, it will make your game more meaningful, and provide successful players with a real sense of pride. To examine the punishment in your game, ask yourself these questions:

- What are the punishments in my game?
- Why am I punishing the players? What do I hope to achieve by it?
- Do my punishments seem fair to the players? Why or why not?
- Is there a way to turn these punishments into rewards and get the same, or a better effect?
- Are my strong punishments balanced against commensurately strong rewards?

#### #48 The Lens of Simplicity/Complexity
（第三版 CH13〈Game Mechanics Must Be in Balance〉；Deck 分類：Game）

> Striking the right balance between simplicity and complexity is difficult. Use this lens to help your game become one in which meaningful complexity rises out of a simple system. Ask yourself these questions:

- What elements of innate complexity do I have in my game?
- Is there a way this innate complexity could be turned into emergent complexity?
- Do elements of emergent complexity arise from my game? If not, why not?
- Are there elements of my game that are too simple?

#### #49 The Lens of Elegance
（第三版 CH13〈Game Mechanics Must Be in Balance〉；Deck 分類：Game）

> Most "classic games" are considered to be masterpieces of elegance. Use this lens to make your game as elegant as possible. Ask yourself these questions:

- What are the elements of my game?
- What are the purposes of each element? Count these up to give the element an "elegance rating."
- For elements with only one or two purposes, can some of these be combined into each other, or removed altogether?
- For elements with several purposes, is it possible for them to take on even more?

#### #51 The Lens of Imagination
（第三版 CH13〈Game Mechanics Must Be in Balance〉；Deck 分類：Player）

> All games have some element of imagination, and some element of reality. Use this lens to help find the balance between detail and imagination. Ask yourself these questions:

- What must the player understand to play my game?
- Can some element of imagination help them understand that better?
- What high quality, realistic details can we provide in this game?
- What details would be low quality if we provided them? Can imagination fill the gap instead?
- Can I give details that the imagination will be able to reuse again and again?
- Which details inspire imagination? Which stifle it?

#### #52 The Lens of Economy
（第三版 CH13〈Game Mechanics Must Be in Balance〉；Deck 分類：Game）

> Giving a game an economy can give it a surprising depth and a life all its own. But like all living things, it can be difficult to control. Use this lens to keep your economy in balance:

- How can my players earn money? Should there be other ways?
- What can my players buy? Why?
- Is money too easy to get? Too hard? How can I change this?
- Are choices about earning and spending meaningful ones?
- Is a universal currency a good idea in my game, or should there be specialized currencies?

#### #53 The Lens of Balance
（第三版 CH13〈Game Mechanics Must Be in Balance〉；Deck 分類：Game）

> There are many types of game balance, and each is important. However, it is easy to get lost in the details, and forget the big picture. Use this simple lens to get out of the mire, and ask yourself the only important question:

- Does my game feel right?

#### #54 The Lens of Accessibility
（第三版 CH14〈Game Mechanics Support Puzzles〉；Deck 分類：Game）

> When you present a puzzle (or a game of any kind) to the players, they should be able to clearly visualize what their first few steps would be. Ask yourself these questions:

- How will players know how to begin solving my puzzle, or playing my game? Do I need to explain it, or is it self-evident?
- Does my puzzle or game act like something they have seen before? If it does, how can I draw attention to that similarity? If it does not, how can I make them understand how it behaves?
- Does my puzzle or game draw people in, and make them want to touch it and manipulate it? If not, how can I change it so that it does?

#### #55 The Lens of Visible Progress
（第三版 CH14〈Game Mechanics Support Puzzles〉；Deck 分類：Game）

> Players need to see that they are making progress when solving a difficult problem. To make sure they are getting this feedback, ask yourself these questions:

- What does it mean to make progress in my game?
- Is there enough progress in my game? Is there a way I can add more interim steps of progressive success?
- What progress is visible, and what progress is hidden? Can I find a way to reveal what is hidden?

#### #56 The Lens of Parallelism
（第三版 CH14〈Game Mechanics Support Puzzles〉；Deck 分類：Game）

> Parallelism in your puzzle brings parallel benefits to the player's experience. To use this lens, ask yourself these questions:

- Are there bottlenecks in my design where players are unable to proceed if they cannot solve a particular challenge? Could parallel challenges help?
- Are my parallel challenges different enough from each other to give players the benefit of variety?
- Can my parallel challenges be connected somehow? Is there a way that making progress on one can make it easier to solve the others?

#### #57 The Lens of the Pyramid
（第三版 CH14〈Game Mechanics Support Puzzles〉；Deck 分類：Game）

> Pyramids fascinate us because they have a singular highest point. To give your puzzle the allure of the ancient pyramids, ask yourself these questions:

- Is there a way all the pieces of my puzzle can feed into a singular challenge at the end?
- Big pyramids are often made of little pyramids - can I have a hierarchy of ever more challenging puzzle elements, gradually leading to a final challenge?
- Is the challenge at the top of my pyramid interesting, compelling, and clear? Does it make people want to work in order to get to it?

#### #58 The Lens of the Puzzle
（第三版 CH14〈Game Mechanics Support Puzzles〉；Deck 分類：Game）

> Puzzles make the player stop and think. To ensure your puzzles are doing everything you want to shape the player experience, ask yourself these questions:

- What the are the puzzles in my game?
- Should I have more puzzles, or less? Why?
- Which of the ten puzzle principles apply to each of my puzzles?
- Do I have incongruous puzzles? How can I better integrate them into the game?

#### #59 The Lens of Control
（第三版 CH15〈Players Play Games through an Interface〉；Deck 分類：Player）

> This lens has uses beyond just examining your interface, since meaningful control is essential for immersive interactivity. To use this lens, ask yourself these questions:

- When players use the interface, does it do what they expected? If not, why not?
- Intuitive interfaces give a feeling of control. Is my interface easy to master, or hard to master?
- Do my players feel they have a strong influence over the outcome of the game? If not, how can I change that?
- Feeling powerful = feeling in control. Do my players feel powerful? Can I make them feel more powerful somehow?

#### #62 The Lens of Transparency
（第三版 CH15〈Players Play Games through an Interface〉；Deck 分類：Game）

> The ideal interface becomes invisible to the player letting the player's imagination be completely immersed in the game world. To ensure invisibility, ask yourself these questions:

- Does the interface let the players do what they want?
- Do new players find the interface intuitive?
- Can players learn to use it without thinking?
- Can players continue to use the interface during stressful situations?
- Does something confuse players about the interface? On which of the six interface arrows is it happening?
- Do players feel a sense of immersion when using the interface?

#### #63 The Lens of Feedback
（第三版 CH15〈Players Play Games through an Interface〉；Deck 分類：Game/Player）

> The player's feedback from the game comes from many things: judgment, reward, instruction, encouragement, and challenge. Use this lens to be sure your feedback loop is creating the experience you want by continuously asking these questions:

- What do players need to know at this moment?
- What do players want to know at this moment?
- What do I want players to feel at this moment? How can I give feedback that creates that feeling?
- What do the players want to feel at this moment? Is there an opportunity for them to create a situation where they will feel that?
- What is the player's goal at this moment? What feedback will help them toward that goal?

#### #64 The Lens of Juiciness
（第三版 CH15〈Players Play Games through an Interface〉；Deck 分類：Game）

> Juicy interfaces are fun the moment you pick them up. To maximize juiciness, ask yourself these questions:

- Is my interface giving the player continuous feedback for their actions? If not, why not?
- Is second-order motion created by the actions of the player? Is this motion powerful and interesting?
- Juicy systems reward the player many ways at once. When I give the player a reward, how many ways am I simultaneously rewarding them? Can I find more ways?

#### #65 The Lens of Primality
（第三版 CH15〈Players Play Games through an Interface〉；Deck 分類：Game/Player）

> Some actions and interfaces are so intuitive that animals were doing them millions of years ago. To capture the power of primality, ask yourself these questions:

- What parts of my game are so primal an animal could play? Why?
- What parts of my game could be more primal?

#### #68 The Lens of Moments
（第三版 CH16〈Experiences Can Be Judged by Their Interest Curves〉；Deck 分類：Experience）

> Memorable moments are stars that make up the constellation of your interest curve. To chart what is most important, ask yourself these questions:

- What are the key moments in my game?
- How can I make each moment as powerful as possible?

#### #69 The Lens of the Interest Curve
（第三版 CH16〈Experiences Can Be Judged by Their Interest Curves〉；Deck 分類：Experience）

> What captivates the human mind often seems different for every person - but in fact it is remarkably similar for everyone. To see how a player's interest in your experience changes over time, ask yourself these questions:

- If I draw an interest curve of my experience, how is it shaped?
- Does it have a hook?
- Is there gradually rising interest, punctuated by periods of rest?
- Is there a grand finale, more interesting than everything else?
- What changes would give me a better interest curve?
- Is there a fractural structure to my interest curve? Should there be?
- Do my intuitions about the interest curve match the observed interest of the players? If I ask playtesters to draw an interest curve, what does it look like?

#### #70 The Lens of Inherent Interest
（第三版 CH16〈Experiences Can Be Judged by Their Interest Curves〉；Deck 分類：Experience）

> Some things are just interesting. Use this lens to be sure your game has inherently interesting qualities by asking these questions:

- What aspects of my game will capture the interest of the player immediately?
- Does my game let the player see or do something they have never seen or done before?
- What base instincts does my game appeal to? Can it appeal to more of them?
- What higher instincts does my game appeal to? Can it appeal to more of those?
- Does dramatic change and anticipation of dramatic change happen in my game? How can it be more dramatic?

#### #79 The Lens of Freedom
（第三版 CH18〈Story and Game Structures Can Be Artfully Merged with Indirect Control〉；Deck 分類：Experience）

> A feeling of freedom is one of the things that separates games from other forms of entertainment. To make sure your players feel as free as possible, ask yourself these questions:

- When do my players have freedom of action? Do they feel free at these times?
- When are they constrained? Do they feel constrained at these times?
- Are there any places I can let them feel more free than they do now?
- Are there any places where they are overwhelmed by too much freedom?

#### #80 The Lens of Help
（第三版 CH18〈Story and Game Structures Can Be Artfully Merged with Indirect Control〉；Deck 分類：Experience）

> Deep down, everyone wants to be helpful. To channel this helpful spirit toward engaging gameplay, ask yourself these questions:

- Within the context of the game, who is the player helping?
- Can I make the player feel more connected to the characters who need help?
- Can I better tell the story of how meeting game goals helps someone?
- How can the helped characters show their appreciation?

#### #81 The Lens of Indirect Control
（第三版 CH18〈Story and Game Structures Can Be Artfully Merged with Indirect Control〉；Deck 分類：Game/Player）

> Every designer has a vision of what they would like the players to do to have an ideal play experience. To help ensure the players do these things of their own free will, ask yourself these questions:

- Ideally, what would I like the players to do?
- Can constraints get players to do it?
- Can goals get the players to do it?
- Can interface get the players to do it?
- Can visual design get players to do it?
- Can game characters get players to do it?
- Can music or sound get players to do it?
- Is there some other method I can use to coerce players towards ideal behavior without impinging on their feeling of freedom?

#### #103 The Lens of Playtesting
（第三版 CH28〈Good Games Are Created through Playtesting〉；Deck 分類：Designer/Player）

> Playtesting is your chance to see your game in action. To ensure your playtests are as good as they can be, ask yourself these questions:

- Why are we doing a playtest?
- Who should be there?
- Where should we hold it?
- What will we look for?
- How will we get the information we need?


## 附錄 B：第三版全部 116 個透鏡（編號、名稱、所在章節、Deck 分類）

來源：編號、名稱、章節取自第三方第三版 EPUB 索引；分類取自官方 Deck。

| # | 名稱 | 章 | Deck 分類 |
|---|---|---|---|
| 1 | The Lens of Emotion | CH2 | Experience |
| 2 | The Lens of Essential Experience | CH2 | Experience |
| 3 | The Lens of the Venue | CH3 | Experience |
| 4 | The Lens of Surprise | CH4 | Experience |
| 5 | The Lens of Fun | CH4 | Experience |
| 6 | The Lens of Curiosity | CH4 | Experience |
| 7 | The Lens of Endogenous Value | CH4 | Game |
| 8 | The Lens of Problem Solving | CH4 | Game |
| 9 | The Lens of the Elemental Tetrad | CH5 | Game |
| 10 | The Lens of Holographic Design | CH5 | Process |
| 11 | The Lens of Unification | CH6 | Process |
| 12 | The Lens of Resonance | CH6 | Experience |
| 13 | The Lens of Infinite Inspiration | CH7 | Process |
| 14 | The Lens of the Problem Statement | CH7 | Process |
| 15 | The Lens of the Eight Filters | CH8 | Process |
| 16 | The Lens of Risk Mitigation | CH8 | Process |
| 17 | The Lens of the Toy | CH8 | Game |
| 18 | The Lens of Passion | CH8 | Designer |
| 19 | The Lens of the Player | CH9 | Player |
| 20 | The Lens of Pleasure | CH9 | Player |
| 21 | The Lens of Flow | CH10 | Player |
| 22 | The Lens of Needs | CH11 | Player |
| 23 | The Lens of Motivation | CH11 | Player |
| 24 | The Lens of Novelty | CH11 | Player |
| 25 | The Lens of Judgment | CH11 | Player |
| 26 | The Lens of Functional Space | CH12 | Game |
| 27 | The Lens of Time | CH12 | Game |
| 28 | The Lens of the State Machine | CH12 | Game |
| 29 | The Lens of Secrets | CH12 | Experience/Game |
| 30 | The Lens of Emergence | CH12 | Game |
| 31 | The Lens of Action | CH12 | Game |
| 32 | The Lens of Goals | CH12 | Game |
| 33 | The Lens of Rules | CH12 | Game |
| 34 | The Lens of Skill | CH12 | Game |
| 35 | The Lens of Expected Value | CH12 | Game |
| 36 | The Lens of Chance | CH12 | Game |
| 37 | The Lens of Fairness | CH13 | Game |
| 38 | The Lens of Challenge | CH13 | Game |
| 39 | The Lens of Meaningful Choices | CH13 | Game |
| 40 | The Lens of Triangularity | CH13 | Game |
| 41 | The Lens of Skill vs. Chance | CH13 | Game |
| 42 | The Lens of Head and Hands | CH13 | Game |
| 43 | The Lens of Competition | CH13 | Game |
| 44 | The Lens of Cooperation | CH13 | Game |
| 45 | The Lens of Competition vs. Cooperation | CH13 | Game |
| 46 | The Lens of Reward | CH13 | Game |
| 47 | The Lens of Punishment | CH13 | Game |
| 48 | The Lens of Simplicity/Complexity | CH13 | Game |
| 49 | The Lens of Elegance | CH13 | Game |
| 50 | The Lens of Character | CH13 | Game |
| 51 | The Lens of Imagination | CH13 | Player |
| 52 | The Lens of Economy | CH13 | Game |
| 53 | The Lens of Balance | CH13 | Game |
| 54 | The Lens of Accessibility | CH14 | Game |
| 55 | The Lens of Visible Progress | CH14 | Game |
| 56 | The Lens of Parallelism | CH14 | Game |
| 57 | The Lens of the Pyramid | CH14 | Game |
| 58 | The Lens of the Puzzle | CH14 | Game |
| 59 | The Lens of Control | CH15 | Player |
| 60 | The Lens of Physical Interface | CH15 | Game |
| 61 | The Lens of Virtual Interface | CH15 | Game |
| 62 | The Lens of Transparency | CH15 | Game |
| 63 | The Lens of Feedback | CH15 | Game/Player |
| 64 | The Lens of Juiciness | CH15 | Game |
| 65 | The Lens of Primality | CH15 | Game/Player |
| 66 | The Lens of Channels and Dimensions | CH15 | Game |
| 67 | The Lens of Modes | CH15 | Game |
| 67½ | The Lens of Metaphor | CH15 | Game |
| 68 | The Lens of Moments | CH16 | Experience |
| 69 | The Lens of the Interest Curve | CH16 | Experience |
| 70 | The Lens of Inherent Interest | CH16 | Experience |
| 71 | The Lens of Beauty | CH16 | Experience |
| 72 | The Lens of Projection | CH16 | Experience |
| 73 | The Lens of the Story Machine | CH17 | Experience |
| 74 | The Lens of the Obstacle | CH17 | Experience |
| 75 | The Lens of Simplicity and Transcendence | CH17 | Experience |
| 76 | The Lens of the Hero’s Journey | CH17 | Experience |
| 77 | The Lens of the Weirdest Thing | CH17 | Experience |
| 78 | The Lens of Story | CH17 | Experience |
| 79 | The Lens of Freedom | CH18 | Experience |
| 80 | The Lens of Help | CH18 | Experience |
| 81 | The Lens of Indirect Control | CH18 | Game/Player |
| 82 | The Lens of Collusion | CH18 | Game |
| 83 | The Lens of Fantasy | CH19 | Experience/Player |
| 84 | The Lens of the World | CH19 | Game |
| 85 | The Lens of the Avatar | CH20 | Player/Game |
| 86 | The Lens of Character Function | CH20 | Game |
| 87 | The Lens of Character Traits | CH20 | Experience |
| 88 | The Lens of the Interpersonal Circumplex | CH20 | Experience |
| 89 | The Lens of the Character Web | CH20 | Experience |
| 90 | The Lens of Status | CH20 | Experience |
| 91 | The Lens of Character Transformation | CH20 | Experience |
| 92 | The Lens of Inner Contradiction | CH21 | Experience |
| 93 | The Lens of The Nameless Quality | CH21 | Experience |
| 93½ | The Lens of Presence | CH22 | Experience |
| 94 | The Lens of Atmosphere | CH23 | Experience |
| 95 | The Lens of Spectation | CH24 | Game |
| 95½ | The Lens of Cheatability | CH24 | Player |
| 96 | The Lens of Friendship | CH25 | Experience |
| 97 | The Lens of Expression | CH25 | Player |
| 98 | The Lens of Community | CH25 | Player |
| 99 | The Lens of Griefing | CH25 | Player |
| 100 | The Lens of Love | CH26 | Designer |
| 101 | The Lens of the Team | CH26 | Designer |
| 102 | The Lens of Documentation | CH27 | Designer/Player |
| 103 | The Lens of Playtesting | CH28 | Designer/Player |
| 104 | The Lens of Technology | CH29 | Game |
| 105 | The Lens of the Crystal Ball | CH29 | Experience |
| 106 | The Lens of Utopia | CH29 | Experience/Designer |
| 107 | The Lens of the Client | CH30 | Designer |
| 108 | The Lens of the Pitch | CH31 | Designer |
| 109 | The Lens of Profit | CH32 | Process |
| 110 | The Lens of Transformation | CH33 | Player |
| 111 | The Lens of Responsibility | CH34 | Designer |
| 112 | The Lens of the Raven | CH35 | Designer |
| ∞ | The Lens of Your Secret Purpose | CH35 | Designer |

## 附錄 C：來源清單

**一手**
- Schell 官方 Deck of Lenses：https://deck.artofgamedesign.com/ （`assets/strings/en.json`）
- Schell Games 部落格〈Lens of The Eight Filters〉(2025-03-03)：https://schellgames.com/blog/lens-of-the-eight-filters
- Hunicke, LeBlanc, Zubek (2004) MDA：https://users.cs.northwestern.edu/~hunicke/MDA.pdf
- Walk (2015)〈From MDA to DDE〉：https://www.gamedeveloper.com/design/from-mda-to-dde
- Koster (2005)〈Sorts of fun, sorts of kfun?〉：https://www.raphkoster.com/2005/11/01/sorts-of-fun-sorts-of-kfun/
- Cook (2007)〈The Chemistry of Game Design〉：https://www.gamedeveloper.com/design/the-chemistry-of-game-design
- Cook (2012)〈Loops and Arcs〉：https://lostgarden.com/2012/04/30/loops-and-arcs/
- Fullerton 第 5 版目錄（Routledge）：https://www.routledge.com/link/link/p/book/9781032607016
- Zimmerman《Characteristics of Games》序：https://www.ericzimmerman.com/assets/pdfs/Characteristics_of_Games_foreword.pdf
- GDC Vault：Elias〈Luck and Skill in Games〉(GDC Next 2013) https://gdcvault.com/play/1019678/Luck-and-Skill-in ；Meier〈Interesting Decisions〉(GDC 2012) https://gdcvault.com/play/1015756/Interesting
- Burgun (2014)〈Randomness and Game Design〉：https://www.gamedeveloper.com/design/randomness-and-game-design
- Chen (2007) CACM〈Flow in Games〉與論文摘要：https://www.jenovachen.com/flowingames/ （p31-chen.pdf、Flow_in_games_final.pdf、flowing.htm）
- Lazzaro (2004)〈Why We Play Games〉：http://www.xeodesign.com/xeodesign_whyweplaygames.pdf
- Quantic Foundry (Yee 2015) v2 模型：https://quanticfoundry.com/2015/07/20/how-we-developed-the-gamer-motivation-profile-v2/ ；模型頁 https://quanticfoundry.com/gamer-motivation-model/
- Bartle (1996)：https://mud.co.uk/richard/hcds.htm

**學術**
- Ryan, Rigby & Przybylski (2006) *Motivation and Emotion* 30:347–363（只讀了摘要）
- To, Ali, Kaufman & Hammer (2016) DiGRA/FDG：https://dl.digra.org/index.php/dl/article/view/793

**二手**
- 第三版目錄索引：https://github.com/leonlee/deck-of-lenses （book/source-index.json）
- Leigh Alexander (2012) Meier 演講報導：https://www.gamedeveloper.com/design/gdc-2012-sid-meier-on-how-to-see-games-as-sets-of-interesting-decisions
- Koster 10 週年報導：https://gamedeveloper.com/design/raph-koster-s-theory-of-fun-ten-years-on
- Pedercini 課程頁（meaningful play、null choices）：https://mycours.es/egd/?p=1134
- 維基百科 MDA framework、Meaningful play
- GBGames（Fullerton 系列文、Sylvester 書評）：https://www.gbgames.com/category/game-design-workshop-wednesdays/ ；https://www.gbgames.com/2014/05/07/book-review-designing-games-by-tynan-sylvester/
- Nottingham G54GAM 講義（Fullerton formal elements）：https://people.cs.nott.ac.uk/pszmdf/g54gam/g54gam_lecture04.pdf
- Garfield 轉述：https://vigentian.itch.io/devlogs/devlog/623570/devlog-9 ；https://sloperama.com/mahjongg/column2/column808.html
- Bartle 誤用相關：https://code.tutsplus.com/bartles-taxonomy-of-player-types-and-why-it-doesnt-apply-to-everything--gamedev-4173a ；https://www.gamified.uk/2017/09/13/the-trouble-with-types/
