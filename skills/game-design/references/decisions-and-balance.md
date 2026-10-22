# 決定、隨機與平衡

2026-10-21 研究整理；原始筆記 `research/notes_A_frameworks.md` 第 7 節、`notes_B_practice.md` 第 4 節、`notes_C_genres.md` 的 B、C 節與反模式。

## 有趣的決定

- **Sid Meier GDC 2012**【二手：Alexander, Gamasutra 2012-03-07】https://www.gamedeveloper.com/design/gdc-2012-sid-meier-on-how-to-see-games-as-sets-of-interesting-decisions
  - 用反面定義比較容易：玩家永遠選第一個，或選擇純隨機，就不有趣。
  - 有取捨（大劍要 500 金；最快的車最難操控）；**situational**：價值隨局勢變；能表現個人風格；影響持續一段有意義的時間。
  - 類型：risk vs reward；short vs long term（奇觀蓋很久影響深遠、戰車很快影響小）；《文明》疊了短、中、長期事件。
  - 資訊寧多勿少；熟悉的操作出現意外結果最讓人不安。回饋：「The worst thing you can do is just move on.」
  - 節奏：複雜決定接連出現會失控，慢的時段只剩簡單決定會無聊。
  - 調整槓桿：風險報酬、影響力、資訊、時間限制、選項數量；試過的東西三分之一以上最後被拿掉。
- **Schell #39 Meaningful Choices、#40 Triangularity**【一手】：有沒有主導策略；低風險低報酬與高風險高報酬並存，報酬配得上風險。
- **Soren Johnson**【一手】：保留一片寬的灰色地帶，讓同一個選擇在某些情境對、在另一些情境錯。https://www.designer-notes.com/game-developer-column-17-water-finds-a-crack/
- **null choice**（Pedercini 整理 Rules of Play）【二手】：答案早已決定、純隨機、無關緊要、被一個明顯選項壓倒。
- **Chen**【一手】：選項不能硬塞，「Too many choices overwhelm the user… Being required to make frequent choices could also be annoying」。

## 隨機

- **Burgun 2014**【一手】https://www.gamedeveloper.com/design/randomness-and-game-design
  - 「Output randomness is noise injected between the player's decision and the outcome.」（Risk、X-Com 的命中判定）
  - 「Input randomness — this type of randomness informs the player before he makes his decision.」（Rogue 的地圖、翻開的板塊）
  - 兩者是連續的；玩家沒時間回應新資訊、或每局題目難度差太多時，input 也會出現 output 的問題。
  - 他主張策略遊戲避免 output randomness；對派對、社交、短局遊戲不能直接套【推論】。
- **Into the Breach**【訪談】：逐步操作確定、敵人先預告，每回合變成謎題；隨機留給多局之間的組合。
- **Garfield**【二手】：技巧與運氣是兩條軸，不是一條光譜的兩端；運氣讓落後的人覺得能翻盤、更願意玩，是社交平衡器。
- **Costikyan**【二手】：不確定性是吸引力的根本；來源有手的表現、解題、分析複雜度、隱藏資訊、敘事期待、隨機等。
- **Schell #36 Chance**【一手】：什麼是真的隨機、什麼只是感覺隨機？帶來興奮與挑戰，還是無望與失控？
- **先問定位**：Schell #37「Which is more important: that my game is a reliable measure of who has the most skill, or that it provide an interesting challenge to all players?」；
  #41「Are my players here to be judged (skill), or to take risks (chance)?」
- 緩解手段：重抽、預覽、保留、保底；保留下來的 output 隨機（含物理混沌）設上下限【推論】。

## 平衡

- **Sirlin〈Balancing Multiplayer Games〉**【一手】https://www.sirlin.net/articles/balancing-multiplayer-games-part-1-definitions
  - 「A multiplayer game is balanced if a reasonably large number of options available to the player are viable」，特別是高手的高階對戰。
  - 公平：同等技術的玩家勝率大致相等，只適用於開局就鎖定的選項（角色、陣營、型別）。
  - 「The worst thing you can have in a competitive multiplayer game is a dominant move」；「moves need to have counters」。
  - Yomi 層：缺少第 3 層回應就是主導招式的徵兆；通常不需要第 4 層，因為又回到原本那招。
  - 檢驗選項數：比賽裡可行的有幾個；不可行的是 chaff，「omit needless words, mechanics, characters, and choices」。
  - 雙盲同時出招讓較弱的招也變得可行。
  - 「all the theory in the world does not substitute for playtesting」；試玩者可能只找到局部最佳解、常常過度反應。
- **Sirlin〈Game Balance and Yomi〉**【一手】https://sirlin.net/articles/game-balance-and-yomi
  - 對戰表寫成「兩位高手打 10 場的預期勝場」（6-4、7-3）。Yomi 的 210 組對戰「0 matchups of 7-3 or worse」。
  - 修的順序：先削 God tier，再補 Garbage tier，最後壓近各層；「The goal isn't to eliminate tiers」。
  - 不信任非高手的數據：「it's likely to be worse than ignoring it」。樣本陷阱：真實 5-5 的兩人打 20 場，剛好 10-10 的機率約 18%，打出 14 勝以上約 12%。
  - 「Balance itself doesn't make a game fun」；把平衡排在風味、動態、優雅之上，「you get a terrible feeling game」。
- **Sirlin〈Designing Yomi〉**【一手】：報酬要「extremely difficult to compare or even to compute」；「Games with perfect information and no randomness inevitably degenerate into more and more memorization」。
- **LocalThunk（Balatro）**【訪談】：「If the picture FEELS level but actually isn't, that is better than it being technically level but feeling askew.」
  一張卡「cannibalises all the adjacent strategies around it」就出 patch；每張小丑牌都改過平衡，多半小幅改數字。https://rogueliker.com/balatro-interview/
- **Schreiber & Romero《Game Balance》2021**【一手：目錄】：遞移機制用成本曲線（所有成本與效益折成同一單位），非遞移機制用收益矩陣。試算表模擬的細節本輪沒讀到。
- **Riot 平衡框架**【一手經二手】：受眾分 Average、Skilled、Elite、Professional 四群各訂勝率門檻；ban rate 不是好的強度訊號。
- **Pardo（Blizzard）**【二手】：Make Everything Overpowered，不要為了平衡全部削平。
- **Morello（Riot）**【二手：轉貼】：counterplay 比很多其他樂趣重要；低 counterplay「is MORE fun for the person playing it in the moment」，但讓對手的技巧消失。
- **強者恆強與 Catch-Up**：MDA 的 Monopoly 例【一手】；Characteristics of Games 序：落後者到最後都要覺得有機會，但前面的決定也要算數【一手】。
- **主導策略的修法**：讓強策略付出隨規模上升的代價（Civ 4 依城市總數加維護費修 Infinite City Sleaze）；把無聊的最佳化自動化（Civ 4 溢出自動結轉）【一手：Johnson】。

## 設計層的自動玩家量法

業界依據：Zook, Harrison, Riedl（FDG 2015）用不同技術等級的 MCTS 代理人代替玩家產生大量對局、找設計缺陷【學術】https://faculty.cc.gatech.edu/~riedl/pubs/zook-fdg15.pdf ；
L4D 的 SurvivorBot 定位成「Competent Human Player Proxies」【一手】。工作室在量產中用 bot 做平衡的一手證據本輪沒找到。

以下量法都是【推論】（把 Sirlin 的對戰表、StS 的指標導向搬到自動玩家上）。底層的人設、固定種子、可玩性底線測試照 game-polish 的 `rules-layer.md`。

- **技巧天花板**：亂玩、簡單規則（貪婪）、搜尋或最佳化三種的分數或勝率差。差太小＝決定不重要；差太大＝新手會被打爆。
- **主導策略偵測**：讓最佳化器找最高期望值的策略，再問：它是不是「固定秒數按」「從頭按到尾」「永遠全押」這種無聊的策略？跟主題矛盾嗎？
- **運氣佔比**：同一策略換 N 個種子，看結果的分布；最後一次隨機事件對勝負的決定比例。
- **選項死活**：每個選項的選用率；有它和沒它的勝率差。選用高、勝率差高＝可能吃掉其他策略；選用高、勝率差為負＝陷阱。
- **決定品質**：每個選擇點最佳與次佳選項的價值差；差很大的比例就是「明擺著的決定」佔比。
- **早期運氣**：前 N 個獎勵的品質與最終勝率的相關（開局決定整局？）。
- **對戰類三層**：
  1. 完整勝率表：選項 i × 選項 j × 執行方式 a × 執行方式 b，每格附 95% 信賴區間。
  2. 每一格雙方的最佳回應（不是隨機執行方式）。用隨機執行方式算的表，跟玩家看完對手、挑最佳回應之後的表不一樣。
  3. 選擇這一步的納許均衡混合策略：支撐集裡有幾個選項、權重分布；某個權重接近 1 就是主導選項。
- **能動性指數**：同一格裡最佳執行方式減最差執行方式的勝率差。太小，執行是裝飾；太大，開局的選擇不重要。
- **最懸殊的一格**對照 7-3；每個選項的最差對戰。
- **戲劇性代理**：領先交替次數、最大逆轉幅度、決定性事件發生的時間點、局長分布。

回報數字一律附：跑了幾局、幾個種子、哪一種自動玩家、指令。
