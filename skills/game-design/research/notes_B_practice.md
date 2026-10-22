# 研究筆記 B：業界設計師與工作室的實際做法

範圍：流程、文件、檢查、具名案例。理論框架（Schell、MDA、Koster）與類型反模式由另外兩路負責，這裡不重講。

來源等級：【一手】本人的演講／投影片／部落格／書／原始碼；【訪談】本人受訪；【二手】媒體轉述、書摘、粉絲整理；【學術】同儕審查論文；【推論】我自己的推論。
額度：WebSearch 用了 42 次（上限 45），WebFetch 約 27 次。兩份 Valve 投影片 PDF 是用自寫的 zlib 解壓腳本抽出文字，所以引文是投影片原文。

---

## 1. 找到樂趣（find the fun）與原型

### 1.1 做法（各家共通的骨架）

- **把設計當假設、把試玩當實驗。** Valve 的投影片原文：「Game designs are hypotheses / Playtests are experiments / Evaluate designs off playtest results / Repeat」，另外還有「Get data early, get data often」「We don't know what's best (players do)」。【一手】Ambinder, *Valve's Approach to Playtesting: The Application of Empiricism*, GDC 2009, https://cdn.fastly.steamstatic.com/apps/valve/2009/GDC2009_ValvesApproachToPlaytesting.pdf
- **原型越早越粗越好，先能玩再談結構。**
  - Daniel Cook：「Make something you can play as soon as humanly possible.」原型要回答的是 concept 裡寫的核心互動循環；凡是擋住「對遊戲做出反應」的東西都先砍掉。【一手】Cook, *Game Design Logs*, Lostgarden, 2011-05-03, https://lostgarden.com/2011/05/03/game-design-logs/
  - 林田宏一說：「we mock up stages very early, and these are very rough versions that we'll try and play through.」【訪談】Christian Nutt, *The Structure of Fun: Learning from Super Mario 3D Land's Director*, Game Developer, 2012-04-13, https://www.gamedeveloper.com/design/the-structure-of-fun-learning-from-i-super-mario-3d-land-i-s-director
  - Rami Ismail 認為，工程師「先搞懂整個系統的結構與基礎」這種直覺，是「probably the worst impulse you could have when it comes to being an effective prototyper」。【一手（付費牆，只讀到開頭）】*Ask Rami: Prototyping Pros*, 2024-03-09, https://ltpf.ramiismail.com/ask-rami-prototyping-pros/ 。他在 DevGAMM 也觀察到：很多獨立團隊花一年半到兩年做第一個原型，才拿給任何玩家或發行商看。【二手】（搜尋摘要，原文未讀）
- **一個原型（或一關）只承載一個概念。** 林田說：「it's really important to decide on a core concept in level design」，而《Super Mario 3D Land》開始嚴格執行：「a clear concept in the beginning, and that's carried through absolutely all the way」。關卡以起承轉合（kishōtenketsu）展開：先學會機制，再給稍微複雜的情境，接著「something crazy happens that makes you think about it in a way you weren't expecting」，最後收束。宮本茂每次都會追問「這一關的轉折（payoff/twist）是什麼」。【訪談】同上；另見 https://www.gamedeveloper.com/design/the-secret-to-i-mario-i-level-design
- **找到能動的那一塊，其餘全砍。** Justin Ma 談《Into the Breach》：「Cut all that, and just focus on the part that does work.」【訪談】見 1.2。
- **留下有希望的，丟掉不好的，不要中間地帶。** 林田：「if something's bad, certainly we'll throw it out」「if something shows a bit of promise, we'll hold onto it and keep polishing it」。【訪談】同上。

### 1.2 具名案例

| 案例 | 做了什麼 | 等級／來源 |
|---|---|---|
| **Valve《Half-Life》重做（1997）** | 原定 1997 年 11 月上市。到 9 月底內容做了很多，但「wasn't any fun」，於是不出貨、全部重做。一個小組花一個月，把現有最好的點子做成**一個**原型關卡（「Die Hard meets Evil Dead」），再以它為標準重建。核心概念有三個：experiential density（每單位時間、每單位地圖面積內，發生在玩家身上和玩家做出的「事」的量）、讓世界回應玩家（「if the world ignores the player, the player won't care about the world」）、讓玩家把失敗歸咎於自己而不是遊戲。 | 【一手】Ken Birdwell, *The Cabal: Valve's Design Process For Creating Half-Life*, 1999-12-10, https://www.gamedeveloper.com/design/the-cabal-valve-s-design-process-for-creating-i-half-life-i- |
| **Nintendo《Super Mario 3D Land》** | 很早就做很粗的關卡 mockup；一關一個概念；用起承轉合推進；試玩找員工家人或隔壁辦公室的人；**不用問卷**（「they become too subjective」），改看臉（「the expressions on people's faces」），說這是跟宮本學的。實例：有位試玩者卡在一個小縫，團隊因此把狸貓裝的取得點往前移。 | 【訪談】Nutt 2012（同上） |
| **Nintendo《薩爾達 曠野之息》** | GDC 2017 演講〈Change and Constant: Breaking Conventions with The Legend of Zelda: Breath of the Wild〉（藤林秀麿、堂田卓宏、瀧澤智）展示了一個 2D 紅白機風格的原型，用來說明「更自由的體驗」與多重互動。NOA 推文說它其實是 3D 引擎加 2D 外觀。 | 【二手】https://www.tomsguide.com/uk/us/zelda-breath-wild-design,news-24586.html ；原型細節只部分確認 |
| **Subset Games《Into the Breach》** | 先找到看起來有意思的戰鬥，接著花很久想在它外面包一層 meta-game。前後有三、四次把大約六個月的成果整包丟掉。被砍的有城市建造、多支小隊、研究樹、城市修復、FTL 式文字事件；Ma 估計砍掉約 60%。「It was literally years of just banging our head against the wall」。Davis 是團隊的「gut check」：「There is an element of just an intuition that this doesn't feel right.」設計方向是讓逐步操作更有確定性（相對於 XCOM 與 FTL 的機率），敵人先預告攻擊，每回合因此變成一道謎題；隨機性留給「多輪之間的組合」去撐耐玩度。 | 【訪談】Maddy Myers, Kotaku, 2019-03-22, https://kotaku.com/the-creators-of-into-the-breach-came-very-close-to-givi-1833498295 ；PC Gamer 預覽 https://pcgamer.com/into-the-breach-preview ；GDC 2019〈'Into the Breach' Design Postmortem〉https://gdcvault.com/play/1025772/-Into-the-Breach-Design |
| **Mark Cerny "Method"（DICE 2002）** | 前製以「publishable first playable」為目標：一個已經打磨到可以決定專案生死的關卡。前製與量產「as night and day」，前製無法排時程，硬排的團隊不是被砍案，就是把沒定案的設計帶進量產。目的是把風險全部集中在前製。據說《Crash Bandicoot》的關卡公式是在第四輪循環才成形。 | 【二手】https://www.slideshare.net/holtt/cerny-method 及各家整理；原演講逐字稿未找到 |
| **Daniel Cook / Spry Fox 的 design log** | 用一份「活的、有日期的」文件取代長篇設計文件。最底下是 2–10 頁的 concept（聚焦第一個要做原型的核心互動循環），中間是可玩原型，上面是每日條目（最新的在最上面），每條約五分鐘讀得完。條目包含：日期、**play notes**（玩最新版本的反應：哪裡有效、哪裡無效，每個問題附提案）、排序過的下一步、完成的工作、大膽的 experiments。原文：「A written plan that stretches months into the future is like a stake through the heart of a good game process.」 | 【一手】Cook 2011（同上） |
| **Mega Crit《Slay the Spire》** | GDC 2019〈'Slay the Spire': Metrics Driven Design and Balance〉（Anthony Giovannetti）。官方摘要說團隊從開發早期就以數據為重心，整個搶先體驗期間持續做資料驅動開發，同時處理社群的平衡回饋，並在一年多的持續更新中維持手感與難度。二手摘要提到：內部 Slack 頻道加 metric server、每週更新、Discord 回饋，以及「指標沒仔細解讀會誤導」。 | 【一手：議程摘要】https://www.gamedeveloper.com/design/learn-i-slay-the-spire-i-s-metrics-driven-approach-to-game-balancing-at-gdc-2019 ；GDC Vault https://www.gdcvault.com/play/1025731 ；【二手】podwise／glasp 摘要。具體數字未找到 |
| **Supergiant《Hades》** | 這是 Supergiant 第一款走搶先體驗的作品（前作都是完成後才發行）。Kasavin 的說法是：先快速放出小版本，從結果學習，再和社群一起把其餘部分做完。他也說大量玩家幫忙抓問題，團隊可以靠試玩數據決定平衡與內容，迭代更快；劇情方面則看哪些角色與支線引起共鳴。 | 【訪談→二手摘要】https://www.pcgamer.com/uk/a-journey-through-early-access-helped-make-hades-a-masterpiece/ （正文抓取失敗，內容來自搜尋摘要） |
| **Supercell 軟上市（Squad Busters）** | 第一次封測（2023 年 2 月，5,000 人）的 D7 是 29%，「didn't meet its goals」。改版後第二次封測（2023 年 5 月，14 萬人以上）是 D1 61%、D3 44%、D7 38%。CEO 事後檢討：「a one-month soft launch didn't leave room for testing of the meta and long-term retention and monetisation beyond D7」。另一個例子是 Rush Wars 關閉時，官方說即使繼續做也「wouldn't hit this goal」。 | 【一手經二手轉述】PocketGamer.biz, Craig Chapple, 2026-02-10, http://www.pocketgamer.biz/pressure-to-launch-a-new-game-led-to-squad-busters-global-release/ ；「以 30 日留存為主要內部門檻」與「砍案由團隊自己決定」只有二手部落格說法，未核對：https://invertedpassion.com/?p=2081 |

### 1.3 能量的檢查

- **原型要回答的問題寫得出來嗎？** Valve 把每場試玩定義為「Have a design goal」。投影片的 Direct Observation 頁寫了這一條。【一手】
- **「不好玩」的判定**：Half-Life 的判準是一個能代表全作水準的關卡做不做得出來；Cerny 的判準是 publishable first playable。兩者都是用**一個打磨到位的樣本**來判生死，不是看功能清單完成多少。【一手／二手】
- **整包丟掉的勇氣有沒有制度化？** Into the Breach 丟了三、四次各約六個月的成果；Half-Life 整個第一版重做。【訪談／一手】
- **核心以外的東西拿掉之後還成立嗎？** Cook 在〈Loops and arcs〉建議：把不餵給循環的謎題、任務、敘事都拿掉，看核心是否還能運作，他說通常可以。判斷問句是「What repeats and what does not?」【一手】Cook, 2012-04-30, https://lostgarden.com/2012/04/30/loops-and-arcs/

### 1.4 原型該多快、什麼時候丟

- 「多快」沒有業界通用數字。各家只給**方向**：Cook 說「as soon as humanly possible」；林田說「very early, very rough」；Ismail 反對拖到一年半才給人看。【一手／訪談／二手】
- 「什麼時候丟」有兩種具體機制：
  1. **品質樣本機制**（Half-Life、Cerny）：做一個打磨到位的代表性片段，不好就整個重來。
  2. **數據門檻機制**（Supercell）：軟上市留存沒過門檻就關。Squad Busters 的教訓是測試期太短，D7 之後的數字根本量不到。
- 時間上限：搜尋範圍內沒有找到任何工作室公開的原型時限（例如「兩週」）。見「找不到」。

---

## 2. 設計文件與設計審查

### 2.1 設計支柱（design pillars）

- **寫法**：通常三到四條核心陳述，在開發早期定下；描述玩家的**感受**而不是功能；不是功能清單。【二手】課程與部落格整理：https://gamedevsjourney.substack.com/p/design-pillars-whats-your-game-really 、https://www.raspberrypi.com/news/how-pillars-and-triangles-can-focus-your-game-design/
- **公開過的實例**（都只找到二手轉述，沒找到原始投影片）：
  - God of War（2018）：combat、father and son、exploration。【二手】
  - Diablo III：approachable、powerful heroes、highly customizable、great item game、endlessly replayable、strong setting、cooperative multiplayer。【二手】
  - Destiny 的世界支柱寫成玩家會問的問句：「Is this world cool? Do I want to stay here? Do I want to learn more about it?」【二手】
- **怎麼用來砍功能**：用作過濾器，對每個提案問「它有沒有服務某一條支柱」。例如支柱裡有「孤獨感」，多人模式的提案就要過「它會不會加強孤獨感」這一關。【二手】
- Barlog 在 GDC 2019 講過〈Reinventing God of War〉，但搜尋結果沒有列出支柱原文。【一手：議程】https://gdconf.com/news/see-cory-barlog-deconstruct-development-god-war-gdc-2019

### 2.2 One-Page Designs（Stone Librande, GDC 2010）

- 問題：傳統設計聖經和 wiki 沒人讀，大多數人只看第一頁。
- 做法：一張頁面，用帶註解的圖把設計講清楚；留大量白；有一個強的中心圖像，小註記標出元素之間的關係；也可以用分鏡、流程圖、矩陣，只要同樣清楚；要**標日期**，才知道哪一版是最新的；印出來貼在牆上，讓團隊買單。
- 範例：Diablo III、The Simpsons Game、Spore、SimCity。
- 衍生判準：一張紙講不清楚的功能，可能還不能開工。這是評論者的引申，不是 Librande 原話。
- 來源：【二手】https://www.gamedeveloper.com/design/video-one-page-designs 、https://www.gamedeveloper.com/design/-the-goal-of-design-is-to-efficiently-communicate-ideas- ；GDC Vault https://gdcvault.com/play/1012356/One-Page ；投影片 http://stonetronix.com/gdc-2010/ （12MB pptx，未下載）

### 2.3 核心循環、三層循環、vertical slice、design brief

- **Loops and arcs**（Cook 2012）：loop 是「更新心智模型 → 對系統行動 → 得到回饋」的重複循環，價值來自被反覆練習；arc 是「a broken loop you exit immediately」，價值在第一次之後急降。偏重 arc 的遊戲會變成內容跑步機。【一手】
- **三層循環（秒／分／小時）**：搜尋範圍內沒找到明確的一手出處（例如哪個工作室、哪場演講）。見「找不到」。
- **Vertical slice**：最接近的一手概念是 Cerny 的 publishable first playable：一個打磨到可發行品質、用來判生死的關卡。「vertical slice」這個詞本身沒有找到權威的一手定義。【二手】
- **Design brief**：Cook 的 concept 段（2–10 頁，聚焦第一個要做原型的核心循環）有同樣的功能。【一手】

### 2.4 工作室的設計審查與批評流程

| 流程 | 審查時問什麼／做什麼 | 誰決定 | 怎麼避免變成意見大會 | 等級／來源 |
|---|---|---|---|---|
| **Valve Cabal（Half-Life）** | 每週四天、每天六小時，連開五個月，之後斷續開到專案結束。一場至少五、六人。成員有三位工程師、一位關卡設計、一位編劇、一位動畫，**沒有專職設計師**，而且要在遊戲裡做過東西。成員大約每月輪換，以防倦怠。一人負責記錄、一人負責畫草圖；產出超過 200 頁的文件。 | 小組共識加上試玩結果 | 「Write everything down」；「Don't push pet ideas that the group rejects」；在試玩前沒準備好的功能就早早砍掉；不做只服務遊戲中單一地點的一次性工程。 | 【一手】Birdwell 1999 |
| **Valve 試玩當仲裁** | 投影片把「Solve design arguments」列為試玩的附帶效益 | 玩家行為 | 用實驗結果取代爭論 | 【一手】Ambinder 2009 |
| **Blizzard strike team** | 遊戲做到可以玩之後，從其他團隊找美術、程式、設計組成小組，新手與老手都有，請他們來**玩**並給回饋。Pardo 說「We do it every couple of weeks」。Dustin Browder（Heroes of the Storm）形容那是「the most brutally honest experience you could possibly have in your life」。polish 從一開始就做，不留到最後；「you can't really iterate until you have some stuff built」。 | 開發團隊自己 | 審的是可玩版本，不是文件；請外部的新眼睛 | 【二手】https://www.gamedeveloper.com/game-platforms/dice-team-blizzard-on-building-its-17-year-success 、https://dwlt.net/blog/2014/07/07/blizzards-design-rules/ （個人筆記，措辭未核對） |
| **Blizzard 的設計原則（Pardo, GDC 2010）** | Gameplay First（但不等於「設計先於一切」）；Easy to Learn, Difficult to Master；Make Everything Overpowered（「take everything to 11」）；Play, Don't Tell；Make It a Bonus：WoW 的休息系統原本是「玩太久經驗值減少」的懲罰，beta 玩家「screaming bloody murder」，改成先 200% 再降回 100% 的加成。 | — | — | 【二手】Frank Cifaldi, 2010-03-11, https://www.gamedeveloper.com/game-platforms/gdc-blizzard-s-core-game-design-concepts |
| **Pixar Braintrust 與遊戲業的移植** | 找專案外的同事看片、和導演討論問題 | **Braintrust 沒有權力，由導演決定**要採納什麼 | 會議中人人平等，但不拍板 | 【二手：Catmull《Creativity, Inc.》的摘要】https://www.shortform.com/blog/?p=21508 |
| King 的嘗試 | 美術和程式的 Braintrust 運作順利；但設計與產品的 Braintrust 每次都**變質成產品審查**：團隊向專家小組簡報，再由小組放行。 | 變成由小組放行 | 反例：讓批評會帶有放行權，它就不再是批評會 | 【二手，前員工轉述，軼事】https://elitegamedevelopers.substack.com/p/egd-news-134-braintrust-greenlight |
| **Ubisoft editorial team** | 中央編輯部在各遊戲的里程碑檢查；2019 年的報導批評它導致「一兩個人的想法被放進每一款遊戲」、作品同質化（Division 2 與 Breakpoint 互相吃掉銷量），之後改組為每個 IP 一位 VP、分權決策；2020 年 Hascoët 因不當行為指控離職後全面改組。 | 中央編輯部 | 反例：集中的品味閘門會讓作品變得千篇一律 | 【二手】https://mcvuk.com/?p=181176 、https://www.kitguru.net/gaming/matthew-wilson/ubisoft-reportedly-revamps-editorial-team-to-make-its-games-more-unique/ |
| **Nintendo** | 宮本追問：這一關的轉折是什麼？玩家臉上有沒有表情？ | 導演 | 看臉，不看問卷 | 【訪談】Nutt 2012 |
| **Subset（兩人團隊）** | Ma 負責迭代，Davis 負責試玩、當 gut check | 兩人 | 角色分開：做的人和判的人不是同一個 | 【訪談】Kotaku 2019 |
| **Riot 英雄管線** | 腦力激盪 → 附草圖的短篇提案 → 角色創作團隊挑選 → 概念美術；管線長達數月。每個新英雄要有獨特之處（玩法、機制、主題或技能組），要擴大而不是排擠既有英雄。 | 角色團隊 | — | 【二手】https://www.pcgamer.com/uk/dev-diary-xin-zhao-league-of-legends-newest-champion 、https://afkgaming.com/esports/news/riot-games-reveals-how-it-validates-gameplay-and-plans-for-champion-releases ；Riot 內部 design review 的具體問題清單**沒找到** |

---

## 3. 試玩與玩家研究（Games User Research）

### 3.1 做法：Valve 投影片原文要點【一手】（Ambinder GDC 2009）

- **試玩的目標是好玩，不是別的**：「Playtesting Goal: Fun / Not bug testing / Not game balancing / DEFINITELY not focus testing」。
- **直接觀察**：模擬玩家在家裡玩的情境、每場要有一個設計目標。優點是「Importance of what people do—not what they say」；缺點有觀察者在場會造成偏差、顯眼事件會帶歪解讀、行為仍需要人去詮釋。
- **放聲思考（think aloud）**：「Unprompted and uncorrected」，搭配直接觀察使用。適合回答「為什麼」，但會干擾遊玩，也可能不準。
- **Q&A**：「People don't know why they do what they do」；有團體偏誤（錨定、社會壓力、顯著性）、題目可能有偏。Valve 的順序是：**先問卷 → 個別 Q&A → 團體 Q&A，並保持謹慎**。
- **統計收集**：死亡、關卡時間、友軍誤傷等；有 TF2 Dustbowl 的死亡熱圖。缺點是「Averages hide extreme examples」「Miss nuance」「Can see 'illusory' patterns」。
- **設計實驗**：比較兩個以上的條件，事先定義變數。
- **問卷範例（L4D）**：各種感染者的難度 1–7 量表、12 種武器的偏好排序。強迫選擇可以揭露偏好。
- **生理量測**：心率、皮膚電導、眼動、表情、EEG、EMG。共同缺點是昂貴、侵入性、經驗變得不自然。
- **上市後試玩照常繼續**：遊玩統計、論壇、玩家回饋。

### 3.2 Valve Cabal 的試玩規則【一手】（Birdwell 1999）

- 約第三個月開始試玩。每場兩小時、一位外部志願者（透過發行商 Sierra 招募）。
- 觀察者坐在玩家後面，只負責開遊戲和當機後重啟；**其餘時間不說話、只做筆記、不給提示**。
- 一場通常產出約 100 個 action items。總共超過 200 場，約一半是回鍋玩家。
- 後期加上儀器記錄（位置、生命值、事件），畫成圖找出無聊、太簡單、太難的區段。

### 3.3 RITE（Microsoft Games）

- Medlock、Wixon、Fulton、Terrano、Romero，2002（UPA 研討會），案例是 Age of Empires II。原則是一旦找到問題且解法明確，**立刻改**，再繼續測下一位。
- AoE II 案例：在 10 位受試者上快速迭代重設計，之後 **連續 6 位不需要再改**，作者稱為「verification step」。MeasuringU 用 80% 發現率的二項分佈分析：連續 6 位無新問題，大約代表「影響 25% 以上族群的問題」已大致排除；只連續 1 位不夠。最好讓所有利害關係人到場觀察；決策者太多是一種陷阱。
- 【二手／學術】https://measuringu.com/rite-method/ 、https://en.wikipedia.org/wiki/RITE_Method

### 3.4 Microsoft／Bungie《Halo》

- **TRUE**（Tracking Real-time User Experience）：把行為事件記錄和態度問卷、影片綁在同一條時間軸上的儀器方案。【學術】Kim, Gunn, Schuh, Phillips, Pagulayan, Wixon, CHI 2008, pp. 443–452, DOI 10.1145/1357054.1357126
- Halo 3 實驗室：單面鏡觀察、放聲思考、把多位玩家的路徑疊成散布圖。NPR 報導兩個由測試導出的修改：新目標出現時在畫面上閃示；在太多玩家飛車摔死的公路上加護欄。【二手】Wired, Clive Thompson, *Halo 3: How Microsoft Labs Invented a New Science of Play*, 15.09 (2007)（原文未讀）；NPR https://www.npr.org/transcripts/14649338
- Bungie 公開的死亡熱圖是用**線上對戰資料**做的，不是實驗室資料。【二手】https://gamesradar.com/where-not-to-stand-in-halo-3

### 3.5 其他

- **Celia Hodent**：遊戲 UX 分兩根柱子。usability 處理知覺、注意力、記憶造成的摩擦；**engage-ability** 拆成 Motivation、Emotion、Game flow。在 Epic 時用在 Fortnite。【二手】https://www.designative.info/2019/03/28/the-ux-of-fortnite-celia-hodent/ ；書：*The Gamer's Brain*（CRC）。
- **John Hopson〈Behavioral Game Design〉**（2001-04-27）：把增強時程搬進遊戲。變動比率時程「produce the highest overall rates of activity」；固定比率會在拿到獎勵後出現停頓，比率越長停頓越長，最後可能流失；突然降低獎勵率（例如謎題難度驟升）會讓人離開。他自己的但書是：這只是入門讀物，套用到複雜遊戲需要判斷。【一手】https://www.gamedeveloper.com/design/behavioral-game-design
- **問卷工具的效度**：GEQ 被大量使用，但 Law、Brühlmann、Mekler（CHI PLAY 2018）在 N=633 的驗證中**找不到**原本宣稱的 7 因子結構；回顧 73 篇論文後也發現心理計量資料回報不一致。【學術】DOI 10.1145/3242671.3242683 。PENS（Ryan, Rigby & Przybylski 2006, *Motivation and Emotion*）以自我決定論為基礎，本輪**沒有重新核對**原文。
- **Nintendo 反對問卷**（見 1.2），跟 Valve「先問卷」的做法相反。兩者可以並存：Valve 用強迫選擇與量表比較條件，Nintendo 用表情判斷有沒有樂趣。【訪談／一手】

### 3.6 分辨「玩家說的問題」和「真正的原因」

- Valve：「People don't know why they do what they do」；直接觀察看的是做了什麼，不是說了什麼；放聲思考適合問為什麼，但不準。【一手】
- Sirlin：試玩者常對改動過度反應，也可能只找到局部最佳解。【一手】見 4.2。
- Riot：勝率混雜了英雄強度與玩家技術；英雄進入免費輪替時勝率會下降，因為湧入大量不熟的玩家。【一手經二手】https://www.surrenderat20.net/2015/10/red-post-collection-dev-blog-on-data.html
- Blizzard 休息系統：玩家抗議的是「懲罰」這個框架，不是數值本身。改成加成之後，實際規則幾乎一樣，但被接受了。【二手】

### 3.7 數據：哪些指標反映好不好玩、哪些是陷阱

| 指標 | 業界用法 | 陷阱 |
|---|---|---|
| D1／D3／D7／D30 留存 | Supercell 以留存決定上市或關閉（Squad Busters：D7 29% 不達標；改版後 D1 61%／D3 44%／D7 38%） | 測試期太短就量不到 D7 以後（Supercell 自己的檢討） |
| 死亡位置／熱圖 | TF2 Dustbowl（Valve）、Halo 3（Bungie） | 平均值會藏起極端；會看到「虛幻的模式」（Valve） |
| 關卡時間、生命值軌跡 | Half-Life 後期的儀器記錄：找無聊、太簡單、太難的區段 | 需要搭配觀察才知道原因 |
| 勝率（依技術分層） | Riot 平衡框架 | ban rate 不是好的強度訊號；高分段樣本太少；免費輪替期間會失真 |
| 選用率 | Sirlin：「多少個選項在比賽裡可行」 | 選用率低不一定是太弱，可能只是不好懂 |
| 問卷分數 | Valve 用來比較不同條件 | GEQ 因子結構不成立；Nintendo 認為問卷太主觀 |

---

## 4. 平衡的實務

### 4.1 Schreiber & Romero《Game Balance》（CRC Press, 2021, 806 頁）

- 章節裡有「Transitive Mechanics and Cost Curves」和「Intransitive Mechanics and Payoff Matrices」。成本曲線的做法是：先建立一條成本曲線（線性或曲線），把所有成本與效益折算成同一個數值單位來比較。【一手：目錄經二手】https://www.routledge.com/Game-Balance/Romero-Schreiber/p/book/9781498799577 ；整理 https://mechanicsofmagic.com/?p=23836
- 書中試算表模擬的具體流程，本輪**沒有讀到原文**。

### 4.2 David Sirlin〈Balancing Multiplayer Games〉系列【一手】（sirlin.net，網頁日期 2014-08-15）

- 平衡的定義：「A multiplayer game is balanced if a reasonably large number of options available to the player are viable」，特別是在高手的高階對戰中。公平的定義是：同等技術的玩家勝率大致相等，只適用於開局可選的選項。https://www.sirlin.net/articles/balancing-multiplayer-games-part-1-definitions
- 「The worst thing you can have in a competitive multiplayer game is a dominant move」；「moves need to have counters」。**Yomi 層**：缺少第 3 層回應就是主導招式的徵兆；通常不需要第 4 層，因為那時又可以回到原本那招。
- 用「比賽裡可行的有幾個」來檢驗選項數量；不可行的選項是 chaff：「omit needless words, mechanics, characters, and choices」。
- **雙盲同時出招**讓較弱的招式也變得可行。
- 「all the theory in the world does not substitute for playtesting」；試玩者可能只找到局部最佳解，而且常常過度反應。https://sirlin.net/articles/balancing-multiplayer-games-part-2-viable-options

### 4.3 Riot 的平衡框架

- 把受眾分成四群：Average（單排前 10% 以外）、Skilled（前 10%，扣掉最頂端）、Elite（前 0.1%）、Professional。取代早年粗略的「balance for Plat+」。Elite 原本用 ban rate 判斷，後來改用勝率，並把範圍擴大到 Diamond 1+ 以取得足夠樣本。Elite 的勝率門檻比 Skilled 高 0.5%，因為頂尖玩家只能碰到比自己弱的對手。框架上線後 buff 遠多於 nerf，於是調低了判定過強的門檻。【一手經二手】https://na.leagueoflegends.com/en-us/news/dev/quick-gameplay-thoughts-march-20/ 、https://www.fragster.de/en/lol-riots-champion-balance-framework-explained/ 。門檻原始數值在 Riot 文章的圖片裡，**沒有讀到**。

### 4.4 用 AI／模擬平衡

- **Zook, Harrison, Riedl**（FDG 2015；arXiv 1908.01423）：用不同技術等級的 MCTS 代理人代替玩家產生大量對局，收集指標找設計缺陷。拿 Scrabble 描述平衡，拿自製卡牌遊戲 Cardonomicon 找出潛在缺陷。動機是人類試玩慢，也涵蓋不了整個行為空間。【學術】https://faculty.cc.gatech.edu/~riedl/pubs/zook-fdg15.pdf
- **L4D 的 SurvivorBot** 被定位成「Competent Human Player Proxies」，行為系統照真人玩家的決策重建。這是業界把 bot 當玩家代理人的一手例子，不過它的用途是補位，不是做平衡。【一手】Booth 2009（見 6）
- Slay the Spire、Hearthstone、Dominion 的開發團隊**是否在生產中用 bot 模擬平衡**，本輪沒有找到一手證據。Slay the Spire 公開的部分是真實玩家數據。見「找不到」。

---

## 5. 手感（game feel）

### 5.1 Steve Swink

- 定義：「real-time control of virtual objects in a simulated space, with interactions emphasized by polish」，三塊分別是即時控制、模擬空間、polish。【一手書，經二手引用】*Game Feel: A Game Designer's Guide to Virtual Sensation*（Morgan Kaufmann, 2008）；引用見 https://arxiv.org/pdf/2011.09201
- 書評說「即時」指 100 ms 以內的修正循環。【二手】https://lizengland.com/blog/review-game-feel-by-steve-swink/ （這個數字本輪沒有對照原書）
- 2006 年文章〈Principles of Virtual Sensation〉提出七條原則：Predictable Results、Novelty、Traction（Good Feedback）、Low Skill Floor/High Skill Ceiling、Context、Impact and Satisfying Resolution、Appealing Reaction。【一手】2006-11-14, https://www.gamedeveloper.com/design/principles-of-virtual-sensation

### 5.2 Celeste：寬容設計與公開數字

- Maddy Thorson 列的技巧【一手】*Celeste & Forgiveness*（原為 2020-03-13 的推文串），https://maddymakesgames.com/articles/celeste_and_forgiveness/ ：
  coyote time、jump buffering、按住跳鍵時頂點重力減半、跳躍撞角修正、衝刺撞角修正、半實心平台上彈、移動平台動量保留（平台停下後還保留「a few frames」）、離牆 2 像素就能蹬牆跳（320×180 解析度下約 1/4 格）、上衝刺蹬牆跳的判定約 5 像素、體力退還的寬限窗口。
  宗旨：「everything is fudged a tiny bit in the player's favor」，這也是遊戲「can feel kind even though it's very difficult」的原因。她也說部分技巧玩家很難察覺，而且這些都不是她發明的。
- **原始碼常數**【一手：原始碼】https://github.com/NoelFB/Celeste/blob/master/Source/Player/Player.cs
  - `JumpGraceTime = 0.1f`（coyote time 0.1 秒）
  - `VarJumpTime = .2f`（可變跳高的保持時間）
  - `UpwardCornerCorrection = 4`、`DashCornerCorrection = 4`（像素）
  - `WallJumpCheckDist = 3`（文章說 2 像素，推測是「< 3」的判定）【推論】
  - `HalfGravThreshold = 40f`（速度門檻）、`Gravity = 900f`、`MaxFall = 160f`
  - `DashTime = .15f`、`DashCooldown = .2f`
  - jump buffer 的時長定義在 Input 類別，不在 Player.cs，本輪**沒有讀到**。
- **Assist Mode**：Thorson 坦承當初團隊討論時她是「most against it」的人。選擇做輔助而不做難度分級，是因為分級要重做、重測每一關：「maximal impact for the player but minimal consequences to the system」。可以調遊戲速度、體力、空中衝刺次數、無敵。她現在把它看成既有可選挑戰（草莓、B 面）往難度低端的延伸。遊戲本身建議第一次遊玩不要開。【訪談】https://wireframe.raspberrypi.com/articles/the-new-normal-the-indie-developers-changing-our-conceptions-of-difficulty 、https://www.vice.com/en/article/celeste-difficulty-assist-mode

### 5.3 Juice

- **Jonasson & Purho〈Juice it or lose it〉**：在 Nordic Game Indie Night 發表（repo 的版權年份是 2012），示範專案是 juicy-breakout，影片 https://www.youtube.com/watch?v=Fy0aCDmgnxg 。README 的定義：juicy 的遊戲「feels alive and responds to everything you do」。【一手】https://github.com/grapefrukt/juicy-breakout
- **Jan Willem Nijman〈The art of screenshake〉**：INDIGO Classes 2013，https://www.youtube.com/watch?v=AJdEqssNZ-U 【一手：影片存在】。演講把效果一層一層疊上一個陽春的射擊遊戲；**逐項清單本輪沒有找到文字版可以核對**，所以這裡不列。

### 5.4 Hit-stop（櫻井政博）

- 打中的瞬間攻防雙方停住**相同時間**；傷害越大停越久，但有上限（鎚子、終極技也受限）；個別招式可以加權（Marth 劍尖多、劍身少；飛行道具較少；電擊屬性自動增加）；攻擊方也會微幅震動；地面角色水平震、空中角色垂直震（地面垂直震腳會陷進地板）；震幅隨鏡頭距離調整、逐格衰減；hurtbox 不跟著震，避免判定不一致。風險有兩個：多人亂鬥時停頓會給第三人插手的空檔；無雙類一次打很多人，停頓會累積，拖慢整體速度。【一手：Fami 通專欄 vol.490，粉絲翻譯】https://sourcegaming.info/2015/11/11/thoughts-on-hitstop-sakurais-famitsu-column-vol-490-1/
- 大亂鬥的具體 hit-stop 幀數公式，本輪**沒有找到**。

---

## 6. 節奏（pacing）

### 6.1 Left 4 Dead AI Director【一手】Michael Booth, *The AI Systems of Left 4 Dead*（Valve, 2009）https://cdn.fastly.steamstatic.com/apps/valve/2009/ai_systems_of_l4d_mike_booth.pdf

- 靈感來自 Counter-Strike 的節奏：「Constant, unchanging combat is fatiguing / Long periods of inactivity are boring」，不可預測的強度高低起伏才讓體驗耐玩。
- **Survivor Intensity** 的計算：受傷時依傷害等比增加；倒地、被拉下或推下邊緣時增加；附近有感染者死亡時，依距離反比增加。隨時間衰減，但**有感染者正在交戰時不衰減**。取四位倖存者中的最大值。
- 四個狀態：
  - **Build Up**：放出完整威脅，直到強度越過峰值門檻。
  - **Sustain Peak**：峰值後再維持 3–5 秒。
  - **Peak Fade**：降到最低威脅，讓正在進行的交戰打完。
  - **Relax**：最低威脅持續 30–45 秒，或直到倖存者往下一個安全屋走得夠遠，再回到 Build Up。
- 結構化的不可預測：屍潮在 Normal 難度每 90–180 秒隨機出現一次，Boomer 的嘔吐會強制觸發並重設計時；75% 的屍潮從後方來；Boss 是 Tank、Witch、Nothing 洗牌發放，不連續重複；Boss **不受**節奏調節。
- 「Algorithm adjusts pacing, not difficulty — Amplitude (difficulty) is not changed, frequency (pacing) is」；「Survivor Intensity estimation is crude, yet the resulting pacing works」。

### 6.2 其他

- Valve 的 experiential density 用「每單位時間、每單位面積發生的事」來衡量節奏（見 1.2）。【一手】
- 林田的關卡是「一個概念在短時間內被展示、發展、轉折、拋棄」（二手摘要說約五分鐘）。【二手】https://80.lv/articles/learning-level-design-with-super-mario/
- 業界公開的「興趣曲線」實際畫法（工作室內部的 beat chart 實例），本輪**沒有找到一手例子**，L4D 是最接近的量化版本。

---

## 7. 從點子到確定好玩的步驟（綜合）

每一步列出產出、過關判準、根據。最後一欄是給單人加 AI 團隊的對應做法。

| # | 步驟 | 產出 | 過關判準 | 根據 |
|---|---|---|---|---|
| 0 | 把點子寫成**假設** | 一頁設計（one-page）或 concept（≤10 頁），聚焦一個核心互動循環，**寫明這個原型要回答哪一個問題** | 一頁紙講得清楚；問題可以被一場試玩否證 | Valve「designs are hypotheses」、Librande、Cook concept |
| 1 | **玩具原型**（只做核心動作） | 最粗的可玩物，越快越好，不先建架構 | 做的人自己玩，gut check 有沒有「這裡有東西」 | Cook、林田「very rough」、Ismail、Into the Breach（Davis 當 gut check） |
| 2 | **找到能動的那一塊，其餘砍掉** | 去掉 arc 和 meta 之後的核心循環 | 拿掉包裝後核心仍然成立；「What repeats?」 | Cook loops/arcs、Into the Breach「Cut all that」 |
| 3 | **外部觀察試玩迴圈** | 每場的 play notes（Cook 格式）、action items | 不說話、不給提示，看行為和臉；連續幾位都沒有新的阻斷問題（RITE 用 6 位）；試玩者臉上有表情 | Valve Cabal、Ambinder、RITE、Nintendo |
| 4 | **可發行品質的代表片段**（first playable／vertical slice） | 一關或一局打磨到上市品質 | 拿來決定生死；不好就整個重來，不要硬推進量產 | Half-Life 1997 重做、Cerny |
| 5 | **儀器記錄與量化** | 死亡、時間、路徑、選用率、勝率等遙測；問卷用強迫選擇比較條件 | 預先定義指標與門檻；對照觀察結果解讀；平均值會藏起極端 | Valve stats、Half-Life 儀器記錄、Slay the Spire、Riot |
| 6 | **小規模公開**（搶先體驗、軟上市、公開試玩） | 留存曲線、社群回饋 | 預先寫好門檻（例如 D7）；測試期要長到量得到目標指標 | Hades、Slay the Spire、Supercell |
| 7 | **上市後照常試玩** | 統計、論壇 | 持續迭代 | Valve「Playtesting continues after we ship」 |

---

## 8. 審查清單（每題附出處）

### A. 問題與核心
1. 這個原型／設計要回答的**單一問題**是什麼？能被一場試玩否證嗎？——Valve「designs are hypotheses」、每場「Have a design goal」【一手】
2. 這一關／這一局的**核心概念只有一個**嗎？有沒有從頭貫徹到尾？——林田【訪談】
3. 它的**轉折**在哪？玩家在哪一刻會「用沒想過的方式」思考同一個機制？——林田、宮本【訪談】
4. 拿掉所有不重複的東西（劇情、任務、一次性內容）之後，核心還好玩嗎？什麼會重複、什麼不會？——Cook〈Loops and arcs〉【一手】
5. 如果核心能動、外圍不能動，你願意把外圍整包砍掉嗎？——Into the Breach【訪談】

### B. 支柱與範圍
6. 有三到四條描述**玩家感受**的支柱嗎？每個功能都能對應到一條嗎？對應不到的就砍。——pillars【二手】
7. 這個功能一張紙畫得出來嗎？那張紙有日期嗎？——Librande【二手】
8. 有沒有只服務遊戲裡**單一地點**的一次性工程？——Valve Cabal【一手】
9. 試玩前做不完的功能，有沒有早早砍掉？——Valve Cabal【一手】

### C. 體驗密度與回應
10. 每單位時間、每單位空間裡，玩家做了什麼、遇到了什麼？有沒有空白段？——experiential density【一手】
11. 世界有沒有回應玩家的行動？——「if the world ignores the player...」【一手】
12. 玩家失敗時會怪自己，還是怪遊戲？——Valve Cabal【一手】；Into the Breach「feel fair」【訪談】
13. 會懲罰玩家的機制，能不能改成加成來表達？——Blizzard 休息系統【二手】
14. 故事是靠玩出來的，還是靠文字告訴玩家的？——Pardo「Play, Don't Tell」【二手】

### D. 選擇與平衡
15. 有沒有**主導策略**？每個招式、選項都有反制嗎？Yomi 第 3 層存在嗎？——Sirlin【一手】
16. 在高手手裡，有多少選項是**真的可行**的？不可行的是不是 chaff？——Sirlin【一手】
17. 每個選項的成本與效益能折算到同一條成本曲線上嗎？非遞移的部分（剋制關係）有沒有收益矩陣？——Schreiber & Romero【一手：目錄】
18. 隨機性放在哪一層？逐步操作要確定、可預告，還是把隨機留給多局之間的組合？——Into the Breach【訪談】
19. 平衡是為哪一群玩家做的？各群的勝率門檻是多少？——Riot【一手經二手】
20. 每個東西都夠「強」嗎（take everything to 11），還是為了平衡全部削平了？——Pardo【二手】

### E. 手感
21. 輸入到回饋是即時的嗎（書評引的是 100 ms 修正循環）？——Swink【一手書／二手】
22. 有沒有把判定「往玩家有利的方向偷一點」？coyote time、input buffer、撞角修正、寬判定。——Celeste【一手】
23. 打擊有沒有 hit-stop？長度有沒有隨傷害變化並設上限？多人或多目標時會不會拖慢節奏？——櫻井【一手：粉絲翻譯】
24. 每個行動是否都有回應，「feels alive and responds to everything you do」？——Juice it or lose it【一手】
25. 輔助選項能不能「對玩家影響最大、對系統影響最小」？——Celeste Assist Mode【訪談】

### F. 節奏
26. 強度有沒有高低起伏？有沒有持續不斷的戰鬥（疲勞）或長時間的空檔（無聊）？——Booth【一手】
27. 調節的是頻率（節奏）還是振幅（難度）？——Booth【一手】
28. 高峰之後有沒有保證的喘息期？——Build Up／Sustain／Fade／Relax【一手】

### G. 證據
29. 這個判斷的根據是玩家**做了什麼**，還是**說了什麼**？——Valve【一手】
30. 試玩時有沒有人說話、給提示？——Valve Cabal【一手】
31. 連續幾位試玩者都沒有出現新的阻斷問題？——RITE【二手／學術】
32. 有沒有看玩家的臉？——Nintendo【訪談】
33. 用到的問卷有效度嗎？（GEQ 的因子結構不成立）——Law et al. 2018【學術】
34. 這個數據是平均值嗎？有沒有藏起極端個案？會不會是虛幻的模式？——Valve【一手】
35. 留存門檻有沒有**事先**寫下？測試期長到量得到嗎？——Supercell【一手經二手】

### H. 流程
36. 評論者有沒有決定權？（不應該有：Braintrust 沒有權力，決定權在導演）——Catmull【二手】；King 的反例【二手】
37. 審的是可玩版本，還是文件？評論者是不是新眼睛？——Blizzard strike team【二手】
38. 做的人和判的人有沒有分開？——Subset（Ma 做、Davis 判）【訪談】
39. 這個決定有沒有寫進當天的 design log？——Cook【一手】；Valve「Write everything down」【一手】

---

## 9. 小團隊（一人加 Claude）的改法【推論】

以下整節都是推論。

### 9.1 可以照搬的

- **Design log**（Cook）：最適合人加 AI 的協作文件。每輪迭代 Claude 都在最上面追加一條（日期、play notes、下一步、experiment），使用者試玩的感想直接寫進 play notes。
- **One-page design 與支柱**：讓 Claude 在砍功能時有一個可以引用的過濾器。
- **「一個原型回答一個問題」**：60 秒手遊、陀螺物理原型、卡牌規則都適合用這個節奏，一個 HTML 檔就是一個假設。
- **Celeste 的寬容常數**：可以當初始值，例如 coyote time 0.1 秒、撞角修正 4 像素，之後再依自己的解析度與速度重新調。
- **L4D 的強度狀態機**：可以縮到 60 秒一局。四個狀態、峰後的喘息期、只調頻率不調振幅，這些都能直接寫成程式。秒數要重新量。
- **用自動玩家代替玩家（L4D 的 bot 定位、Zook 的 MCTS）**：Claude 擅長這一塊，不同技術等級的自動玩家跑上千局，可以找主導策略、看每個選項的勝率與選用率、看一局長度的分佈、找出永遠不會被選的選項（chaff）。

### 9.2 要改的

- **沒有別人可以做設計審查時**：
  - 把 Claude 當 **Braintrust**：給它第 8 節的清單逐題審，但**不給決定權**，決定權在使用者（導演）。這正好避開 King 那種「審查變成放行」的失敗。
  - 模擬 **strike team 的新眼睛**：開一個沒有上下文的新 session，只給 one-page design 和可玩檔，讓它先說「我以為這個遊戲要我做什麼」，再對照設計意圖。
  - **Subset 式的角色分開**：讓同一個 session 寫程式、另一個 session 判斷，或者使用者只玩不看程式碼。
- **Claude 判斷不了好不好玩**：Claude 能審**結構**（主導策略、可讀性、節奏曲線、回饋延遲），不能審**樂趣**。樂趣的證據只能來自真人：使用者自己，再加上少量親友。
- **試玩人數少**：Valve 跑了 200 多場，小團隊做不到。改用 RITE 的小輪次：每輪 3–5 人，每位玩完就改，連續幾位沒有新問題才算過。人數比 RITE 的 6 位少時，回報要寫明信心有限。
- **看臉代替問卷（Nintendo）**：手機試玩時請對方開前鏡頭錄影，或在旁邊看；問卷只用來比較兩個版本（Valve 的強迫選擇），不用來判斷好不好玩。
- **網頁小遊戲的遙測**：最便宜的訊號是「第二局率」「一局時長分佈」「在哪一秒放棄」。樣本小時要看個別紀錄，不要只看平均（Valve 的警告）。D7、D30 留存需要流量，在沒有投放之前不太能當門檻。
- **生死判準要事先寫下**：照 Half-Life 和 Cerny 的思路，先定「做到什麼程度的代表片段、試玩者有什麼反應才繼續」。不達標就整包丟掉，不要拖。

### 9.3 照搬不了的

- 生理量測、大樣本 A/B、多個月的 Cabal 會議、中央編輯部。
- 多人對戰的「高手層平衡」：沒有高手樣本，只能用強化過的自動玩家近似，而且要標明這是近似。

---

## 10. 找不到

- **原型時限**：沒有找到任何工作室公開的原型時間上限（例如「兩週」）。
- **三層循環（秒／分／小時）**：沒有找到明確的一手出處。
- **Vertical slice**：沒有找到權威的一手定義（Cerny 的 publishable first playable 是最接近的）。
- **God of War（2018）、Diablo III 支柱的原始投影片**：只有二手轉述。
- **Riot 的 design review**：沒有找到審查時問的具體問題清單；平衡框架的門檻原始數值在圖片裡，沒有讀到。
- **Blizzard strike team**：沒有找到 Pardo 的原始投影片或逐字稿，只有二手筆記。
- **Insomniac 等工作室的 greenlight／gate 流程**：本輪沒有查到公開資料。
- **Slay the Spire 演講的具體指標與數字**：GDC Vault 要會員，只有議程摘要與二手摘要。
- **Hades 搶先體驗的具體做法**：PC Gamer 正文抓取失敗，只有搜尋摘要。
- **Supercell「以 30 日留存為主要門檻」「砍案由團隊決定」**：只有二手部落格說法。
- **〈The art of screenshake〉的逐項清單**：沒有找到可以核對的文字版。
- **Celeste 的 jump buffer 時長**：定義在 Input 類別，沒有讀到。
- **大亂鬥的 hit-stop 幀數公式**：沒有找到。
- **Swink 書中的 100 ms 數字**：只有書評引用，沒有對照原書。
- **Schreiber & Romero 書中的試算表模擬流程**：沒有讀到原文。
- **Slay the Spire、Hearthstone、Dominion 團隊是否在生產中用 bot 做平衡**：沒有找到一手證據。
- **工作室內部的興趣曲線／beat chart 實例**：沒有找到一手例子。
- **PENS 原文**：本輪沒有重新核對。
- **Wired 的 Halo 3 原文**：沒有讀到，只有轉述。
- **《Juice it or lose it》的確切年份**：README 只寫 Nordic Game Indie Night，年份是從版權行推得的 2012。
