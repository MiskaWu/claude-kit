# 流程與試玩

2026-10-21 研究整理；原始筆記 `research/notes_B_practice.md`。

## 從點子到確定好玩：七步

「多快」沒有業界通用的數字：Cook「as soon as humanly possible」、林田「very early, very rough」、Rami Ismail 反對拖一年半才給人看。
搜尋範圍內沒有工作室公開的原型時限。

| 步 | 產出 | 過關看什麼 | 根據 |
|---|---|---|---|
| 0 寫成假設 | 一頁設計：體驗一句話、核心循環、這個原型要回答的一個問題、生死判準（範本 `design-brief.md`） | 一頁講得完；問題能被一場試玩推翻 | Valve「Game designs are hypotheses / Playtests are experiments」【一手】；Librande〈One-Page Designs〉GDC 2010【二手】；Cook 的 concept【一手】 |
| 1 玩具原型 | 只有核心動作，最粗最快，不先建架構 | 做的人自己玩，覺得「這裡有東西」 | Cook；林田；Schell 原型建議 #9 Build the Toy First【二手：目錄】；Ismail：工程師先搞懂整個架構的直覺「probably the worst impulse」【一手，付費牆】 |
| 2 剝掉外圍 | 只剩會重複的那一圈 | 拿掉 arc 與外圍系統後還成立 | Cook〈Loops and Arcs〉【一手】；Into the Breach「Cut all that, and just focus on the part that does work」【訪談】 |
| 3 觀察試玩 | 每場的試玩筆記與待辦 | 不說話不提示，看行為與表情；連續幾位沒有新的卡關問題 | Valve Cabal【一手】；RITE【學術】；Nintendo【訪談】 |
| 4 代表片段 | 一關或一局打磨到上市品質 | 拿它判生死，不好就整個重來 | Half-Life 1997 重做【一手】；Cerny 的 publishable first playable【二手】 |
| 5 量化 | 遙測：局長、死亡點、選用率、勝率 | 指標與門檻事先定；對照觀察解讀；看個別紀錄 | Valve【一手】；Slay the Spire GDC 2019【一手：議程摘要】；Riot【一手經二手】 |
| 6 小規模公開 | 留存、回饋 | 門檻事先寫；測試期長到量得到 | Hades 搶先體驗【二手】；Supercell【一手經二手】 |

丟掉的兩種機制：
- **品質樣本**：做一個打磨到位的代表片段，不好就整個重來（Half-Life、Cerny）。
- **數據門檻**：留存沒過就關（Supercell）。Squad Busters 第一次封測 D7 29% 沒達標；改版後 D1 61%、D3 44%、D7 38%。
  CEO 檢討一個月的軟上市量不到 D7 以後的數字。

### 具名案例

- **Valve Half-Life（1997）**：到 9 月底內容很多但「wasn't any fun」，延後重做。一個小組花一個月把最好的點子做成一個原型關卡，以它為標準重建。
  三個核心概念：experiential density（每單位時間、面積內玩家做的與遇到的事）、世界回應玩家（「if the world ignores the player, the player won't care about the world」）、
  讓玩家把失敗歸咎自己。Cabal 是跨職能、每月輪換、沒有專職設計師的小組，一人專門記錄；「Don't push pet ideas that the group rejects」。
  Birdwell 1999【一手】https://www.gamedeveloper.com/design/the-cabal-valve-s-design-process-for-creating-i-half-life-i-
- **Nintendo 林田宏一**：很早做很粗的關卡；一關一個概念；起承轉合；試玩找員工家人或隔壁辦公室；不用問卷（「they become too subjective」），看臉。
  有位試玩者卡在一個小縫，團隊把狸貓裝的取得點往前移。Nutt 2012【訪談】
- **Into the Breach**：三、四次各丟掉約六個月的成果，砍掉約 60%（城市建造、多支小隊、研究樹、事件）；Ma 迭代、Davis 當 gut check。Kotaku 2019【訪談】
- **Blizzard**：遊戲可以玩之後，每隔幾週請別組的人組 strike team 來玩；polish 從第一天做。休息系統從懲罰改成加成（先 200%，後降回 100%）。Pardo GDC 2010【二手】

## 試玩怎麼看

Valve 投影片（Ambinder GDC 2009）【一手】https://cdn.fastly.steamstatic.com/apps/valve/2009/GDC2009_ValvesApproachToPlaytesting.pdf

- 目標是好玩：「Playtesting Goal: Fun / Not bug testing / Not game balancing / DEFINITELY not focus testing」。每場要有一個設計目標。
- **直接觀察**看做了什麼，不聽說了什麼。缺點：觀察者在場會造成偏差、顯眼事件會帶歪解讀、行為仍要詮釋。
- **放聲思考**：「Unprompted and uncorrected」；適合問為什麼，但干擾遊玩、不一定準。
- **Q&A**：「People don't know why they do what they do」。順序是問卷 → 個別 Q&A → 團體 Q&A。
- **統計**：「Averages hide extreme examples」「Miss nuance」「Can see 'illusory' patterns」。
- 強迫選擇（排序、1–7 量表）用來比較條件，能揭露偏好。

Half-Life 的規則【一手】：每場兩小時一位外部玩家；觀察者坐在後面，只負責開遊戲和當機重啟，其餘時間不說話、只記筆記；一場約 100 個待辦；超過 200 場。後期加儀器記錄找無聊、太易、太難的區段。

RITE（Medlock 等 2002，Age of Empires II）【學術】：找到問題、解法明確就立刻改，再測下一位。前 10 人迭代，接著連續 6 人都不必再改才算驗證完成。
MeasuringU 的分析：連續 6 位沒新問題，大約代表影響四分之一以上族群的問題已排除；只連續 1 位不夠。https://measuringu.com/rite-method/

其他：
- 林田與 Valve 看似相反（不用問卷／先問卷），可以並存：問卷比較兩個版本，表情判斷有沒有樂趣。
- GEQ 在 N=633 的驗證裡找不到宣稱的 7 因子結構（Law, Brühlmann, Mekler, CHI PLAY 2018）【學術】。不要拿它判斷好不好玩。
- 玩家指出的問題常常是對的，給的解法常常不對；Blizzard 休息系統被抗議的是「懲罰」這個框架。
- Riot：勝率混雜了強度與玩家技術；英雄進免費輪替時勝率會掉【一手經二手】。
- Bungie Halo 3：路徑散布圖、死亡熱圖；兩個改動是新目標出現時閃示、在太多人摔死的公路加護欄【二手】。

## 數據：哪些指標、哪些陷阱

| 指標 | 用法 | 陷阱 |
|---|---|---|
| 第二局率、連續局數 | 網頁小遊戲最便宜的「好不好玩」訊號【推論】 | 樣本小時看個別紀錄 |
| 一局時長、在第幾秒放棄 | 找出流失點 | 平均藏住極端 |
| D1／D7 留存 | Supercell 以留存決定上市或關閉 | 測試期太短量不到；沒有投放流量時不太能當門檻 |
| 死亡位置、熱圖 | TF2、Halo 3 | 會看到虛幻的模式 |
| 勝率（依技術分層） | Riot 把玩家分 Average、Skilled、Elite、Professional | 免費輪替期間失真；高分段樣本少 |
| 選用率 | 「多少選項在比賽裡可行」（Sirlin） | 選用率低不一定太弱，可能只是不好懂 |

## 設計日誌

Cook〈Game Design Logs〉2011【一手】https://lostgarden.com/2011/05/03/game-design-logs/ ：
最底下是 2–10 頁的 concept（只講第一個要原型化的核心循環），中間是可玩原型，上面是每日一條，最新在最上面，每條約五分鐘讀完。
每條：日期、試玩筆記（哪裡有效、哪裡無效，每個問題附提案）、排序過的下一步、完成的工作、大膽的實驗。
「A written plan that stretches months into the future is like a stake through the heart of a good game process.」

格式見 `design-brief.md`。跟 Claude 協作時每輪由 Claude 在最上面追加一條；使用者的試玩原話直接進試玩筆記【推論】。

## 一人加 Claude 的改法【推論】

- **評論者沒有決定權**：Pixar 的 Braintrust 沒有權力，決定權在導演【二手】；King 讓設計批評會帶上放行權後，它變質成產品審查【二手】。
  Claude 逐題審、列證據，使用者拍板。
- **新眼睛**：開一個沒上下文的 subagent，只給一頁設計與可玩版，先讓它寫「我以為這個遊戲要我做什麼」，再對照設計意圖（Blizzard strike team 的替代）。
- **做的和判的分開**（Subset）：寫程式的 session 與審查的 session 分開，或使用者只玩不看程式碼。
- **試玩人數少**：每輪 3–5 人的 RITE 小輪；人數少於 6 時回報寫明信心有限。手機試玩請對方開前鏡頭錄或在旁邊看。
- **生死判準事先寫**；不達標就丟，不要拖。
- 照搬不了的：生理量測、大樣本 A/B、多個月的 Cabal、高手層的平衡樣本（只能用強化的自動玩家近似，並標明是近似）。
