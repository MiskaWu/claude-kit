# 好玩的鏈與框架

2026-10-21 研究整理；原始筆記 `research/notes_A_frameworks.md`。Schell 透鏡編號一律是第三版（2019），舊版編號不同。

## 玩家的鏈

把 Schell、MDA、Koster、Cook、Rules of Play、Meier、Chen 疊起來，各家講的是同一條鏈的不同環【推論】。

| 環 | 是什麼 | 斷掉時玩家說 | 支撐 |
|---|---|---|---|
| 1 目標 | 現在要做什麼、怎樣算贏，一眼看得出 | 「不知道要幹嘛」 | Csikszentmihalyi／Chen 的 clear goals；Schell #21 #32；MDA「看得到勝利條件」 |
| 2 決定 | 選項各有代價，哪個好要看當下局勢 | 「隨便按都一樣」 | Meier；Schell #39 #40；Fullerton 的 conflict |
| 3 回饋 | 當下看得出（discernable）、之後算數（integrated）、知道是自己哪個決定造成的 | 「剛剛怎麼了」「這遊戲在搞我」 | Rules of Play；Cook；Schell #63 #64；Juul；Valve Cabal |
| 4 學習 | 修正腦中對規則的理解，下次做得更好 | 「全靠運氣」 | Cook 的 modeling；Koster |
| 5 新挑戰 | 挑戰跟著能力升級，學會的東西有新用途 | 「膩了」「太難了」 | Koster（精通後無聊）；Cook 的 burnout；Chen 的 flow zone；Schell #38 |

貫穿整圈的兩件事：

- **不確定性**：結局要保持開放到最後，前面的決定又要算數（Characteristics of Games 序文的 Catch-Up 兩難【一手】）。
  隨機在決定之前是給題目，在決定之後是改答案（Burgun【一手】）。
- **時間的形狀**：一局、一關、一整段都要有鉤子、起伏與休息、更高的結尾，而且是碎形（Schell #69【一手】；MDA 的 rising tension, release, denouement【一手】）。

一句話版【推論】：為特定玩家選定少數幾種體驗 → 用少數元素讓它們湧現 → 每個決定有取捨、有看得出且長期有效的回饋 →
玩家一直有東西可學、挑戰跟著能力升級 → 不確定性讓結局保持開放、但前面的努力算數 → 整體曲線有鉤子、起伏、高潮 → 靠一輪又一輪試玩逼近它。

## 設計者的迴圈：MDA

Hunicke, LeBlanc, Zubek 2004【一手】https://users.cs.northwestern.edu/~hunicke/MDA.pdf

- Mechanics：資料表示與演算法層級的元件。Dynamics：機制碰上玩家輸入、彼此輸出之後，隨時間跑出的行為。
  Aesthetics：玩家跟系統互動時被喚起的情緒反應。
- 「From the designer's perspective, the mechanics give rise to dynamic system behavior, which in turn leads to particular aesthetic experiences.
  From the player's perspective, aesthetics set the tone, which is born out in observable dynamics and eventually, operable mechanics.」
- 八種美感（原文說「includes but is not limited to」）：Sensation 感官、Fantasy 幻想、Narrative 敘事、Challenge 挑戰、
  Fellowship 同伴、Discovery 發現、Expression 表達、Submission 消遣。Charades「emphasizes Fellowship over Challenge」：要排主次。
- 元件要看它在系統裡跑出的行為，「game components cannot be evaluated in vacuo」。
- Monopoly 例：領先者越來越有錢、懲罰別人越來越有效，「As the gap widens, only a few … of the players is really invested.」
  修法有補助落後者、對領先者課稅、加時間壓力；修補不要複雜到玩家追不到自己的處境。
- 批評：Walk〈From MDA to DDE〉2015【一手】—— 三層同時發生、不是時間順序；放不進敘事與介面；Aesthetics 一詞有歧義。
  常見誤用：把 Aesthetics 當美術；當成「先寫機制再看體驗」的生產流程。

設計者的迴圈因此是：寫下體驗目標 → 改機制 → 試玩看動態 → 對照目標 → 再改。Schell 叫它 Rule of the Loop【二手：常見轉述】。

## 各家說的「好玩」

| 框架 | 好玩來自 | 審查時問 | 證據 |
|---|---|---|---|
| Koster《A Theory of Fun》 | 學會一個模式；精通後就無聊。他把 fun（kfun）收窄成學習帶來的正回饋，delight、visceral、社交地位另算 | 第 1、10、100 局各在學什麼？學完還剩什麼？ | 【一手：部落格 2005】https://www.raphkoster.com/2005/11/01/sorts-of-fun-sorts-of-kfun/ ；書中名句【二手】 |
| Cook〈The Chemistry of Game Design〉2007 | skill atom：Action → Simulation → Feedback → Modeling；atom 串成 skill chain，前面卡住後面全斷；學會卻沒用處就 burnout | 每個技能四段齊嗎？哪個學會後沒用處？鏈的起點假設玩家會什麼？ | 【一手】https://www.gamedeveloper.com/design/the-chemistry-of-game-design |
| Cook〈Loops and Arcs〉2012 | loop 靠反覆練習產生價值；arc 是「a broken loop you exit immediately」，用完價值就掉；全靠 arc 會變成內容跑步機 | What repeats and what does not? | 【一手】https://lostgarden.com/2012/04/30/loops-and-arcs/ |
| Salen & Zimmerman《Rules of Play》 | meaningful play：動作與結果的關係 discernable 且 integrated（p.34） | 當下分得出結果嗎？三十秒後、下一局還有影響嗎？ | 【二手】 |
| Pedercini 的 null choice | 答案早已決定、純隨機、無關緊要、或被一個明顯選項壓倒的選擇 | 有沒有 null choice？ | 【二手：課程頁】https://mycours.es/egd/?p=1134 |
| Sid Meier GDC 2012 | 一連串有趣的決定：有取捨、看情境（situational）、能表現風格、影響持續；資訊寧多勿少；「The worst thing you can do is just move on」；複雜決定別擠在一起；試過的東西三分之一以上會被拿掉 | 玩家會不會永遠選第一個？ | 【二手：Gamasutra 報導】；他說這個框架對節奏類不太適用 |
| Csikszentmihalyi／Chen〈Flow in Games〉2007 | 值得玩、挑戰與能力相符、有掌控感；flow zone 因人而異；主張 active DDA（把難度選擇嵌進玩法）而非 passive DDA；「Minimal penalty, no Flow breakers」 | 不同程度的玩家能不能用玩的方式選難度？ | 【一手】https://www.jenovachen.com/flowingames/ |
| SDT（Ryan, Rigby & Przybylski 2006） | 勝任、自主、連結；三者預測享受與想再玩 | 玩家在哪裡感到勝任、自主、跟人有連結？操作直覺嗎？ | 【學術】；Schell #22 已收進 |
| Lazzaro 2004 | 四把鑰匙：Hard Fun（挫折 → Fiero）、Easy Fun（好奇、驚奇）、Altered States（改變內在狀態）、The People Factor（競爭、合作、觀看）；暢銷作至少觸發三把 | 主打哪幾把？ | 【一手】；45 人質性研究，作者聲明不具統計顯著性 |
| Quantic Foundry | 12 動機 6 組：Action（Destruction、Excitement）、Social（Competition、Community）、Mastery（Challenge、Strategy）、Achievement（Completion、Power）、Immersion（Fantasy、Story）、Creativity（Design、Discovery） | 目標玩家最看重哪兩三個？ | 【一手】十幾萬份問卷的因素分析 |
| Bartle 1996 | Achievers、Explorers、Socialisers、Killers | 少用 | 【一手】來自 MUD 論壇爭論、限定 MUD；作者說是最常被誤用的理論 |
| Costikyan《Uncertainty in Games》 | 不確定性是吸引力的根本：手的表現、解題、分析複雜度、隱藏資訊、敘事期待、隨機…… | 這款的懸念主要從哪來？ | 【二手】清單有 10、11 種兩種說法 |
| Juul《The Art of Failure》 | 失敗讓人覺得「我不夠好」，玩家為擺脫它而變強 | 輸的人想再來，還是想走？ | 【學術】 |
| Sylvester《Designing Games》 | Mechanics → Events → Emotions：情緒來自「改變了玩家在乎的某個價值」；apophenia：給線索玩家就會自己編故事，最便宜的技巧是命名 | 每個機制產生哪些事件、改變玩家在乎的哪個價值？ | 【二手：書評】 |
| Fullerton《Game Design Workshop》 | 8 個 formal elements：Players、Objectives、Procedures、Rules、Resources、Conflict、Boundaries、Outcome；原型四階段 Foundation → Structure → Formal Details → Refinement | 八格都填得出來嗎？是不是在 Foundation 沒穩時就磨細節？ | 【二手】 |

**證據強度**：SDT、Quantic Foundry ＞ Lazzaro ＞ Bartle。拿來做決定時照這個順序加權。

## 框架互相打架的地方

| 衝突 | 兩邊 | 化解 |
|---|---|---|
| 好玩只有一種？ | Koster 只算學習；MDA、Lazzaro、Quantic Foundry 主張多種 | 先寫下主打哪幾種；放鬆型、社交型用 Koster 的尺量會誤判 |
| 隨機該不該有？ | Burgun 反對策略遊戲裡決定後的隨機；Garfield：運氣讓弱者有機會贏、是社交平衡器；Costikyan：不確定性是根本 | 先回答 Schell #37：量出誰最強，還是讓每個人都有好挑戰？ |
| 失敗要多痛？ | Chen：Minimal penalty；Schell #47：懲罰讓成功有意義；Lazzaro：Hard Fun 先挫折再 Fiero | 心流是局內、興趣曲線是整段，尺度不同；輕重跟著定位走 |
| 難度誰調？ | Chen 批評 passive DDA（讀不到玩家想什麼、拿走設計者的控制）；競技情境裡 DDA 跟公平衝突 | 能嵌進玩法就嵌進玩法（冒險與否由玩家選） |
| 透明還是神祕？ | Rules of Play、Meier、Chen 要結果看得出；Costikyan、Schell #29 Secrets 靠資訊不對稱 | 規則與因果透明，未來的局面可以不確定【推論】 |
| 簡潔還是湧現？ | Schell #49 刪掉只有一兩個用途的元素；#30 要更多動詞、途徑 | 規則少、變化多（#48 innate vs emergent complexity） |
| loop 還是 arc？ | Cook 警告 arc 會快速倦怠；Schell 的故事、Fullerton 的戲劇元素都在經營 arc | 取捨不是對錯；先確保 loop 撐得住 |

## Schell 第三版：跟玩法有關的章節

章節與透鏡位置取自第三版 EPUB 目錄的第三方索引【二手】；透鏡問句取自官方 Deck of Lenses【一手】https://deck.artofgamedesign.com/

| 章 | 講什麼 | 透鏡 |
|---|---|---|
| 2 體驗 | 遊戲不是體驗，是產生體驗的東西 | #1 Emotion、#2 Essential Experience |
| 4 遊戲是什麼 | 帶著玩心的解題；fun 是帶驚喜的愉悅【二手】 | #4 Surprise、#5 Fun、#6 Curiosity、#7 Endogenous Value、#8 Problem Solving |
| 5 四元素 | 機制、故事、美學、技術服務同一主題 | #9 Elemental Tetrad、#10 Holographic Design |
| 8 迭代 | 八道濾網、Rule of the Loop、風險排序、十個原型建議（#1 Answer a Question … #9 Build the Toy First） | #15 Eight Filters、#16 Risk Mitigation、#17 Toy |
| 9–11 玩家、心智、動機 | LeBlanc、Bartle；Modeling、Focus、Empathy、Imagination；內在與外在動機、Wanna vs Hafta | #19 Player、#20 Pleasure、#21 Flow、#22 Needs、#23 Motivation、#25 Judgment |
| 12 機制（七類） | Space、Time、Objects、Actions、Rules、Skill、Chance | #26–#36 |
| 13 平衡（十二類） | Fairness、Challenge vs Success、Meaningful Choices、Skill vs Chance、Head vs Hands、Competition vs Cooperation、Short vs Long、Rewards、Punishment、Freedom vs Controlled Experience、Simple vs Complex、Detail vs Imagination | #37–#53 |
| 14 謎題 | 十條原則 | #56–#58 |
| 15 介面 | 互動迴圈、juiciness、資訊管道 | #59、#62–#65 |
| 16 興趣曲線 | 鉤子、起伏與休息、高潮、碎形 | #69、#70 |
| 18 間接控制 | 約束、目標、介面、視覺、角色、音樂 | #79 Freedom、#81 Indirect Control |
| 28 試玩 | 誰來玩、在哪玩、看什麼 | #103 Playtesting |

透鏡是一大堆問句，本身不給優先順序；116 張全套會淹沒重點。先找斷掉的環，再挑那一環的透鏡。
