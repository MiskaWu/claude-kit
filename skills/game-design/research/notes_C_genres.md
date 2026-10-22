# 研究筆記 C：分類型的玩法重點與失敗模式

> 用途：給 `game-design` 技能的「設計玩法／審視玩法」用。這一路只管「使用者手上這幾類玩法該注意什麼、常見怎麼壞」。
> 經典框架（Schell、MDA、Koster）與業界流程（原型、審查、試玩、平衡、手感、節奏）在另外兩份筆記，這裡只在需要時引用。
>
> 來源等級：【一手】設計師本人的演講、部落格、官方文件／GDC Vault 官方摘要；【訪談】媒體訪談中本人原話；【二手】媒體報導、整理、粉絲 wiki、AI 摘要；【學術】論文、學術書；【推論】本筆記自己的推論（沒有來源直接講）。
> 「本輪未查證」= 我知道有這份資料，但這次沒打開核對，引用時要小心。
>
> 額度紀錄：WebSearch 用 34 次、WebFetch 約 25 次。
>
> 勘誤：任務說明寫 Soren Johnson〈Water Finds a Crack〉是 2010；實際是《Game Developer》雜誌 2011 年 3 月號專欄，作者部落格 2011-06-12 轉貼。【一手】https://www.designer-notes.com/game-developer-column-17-water-finds-a-crack/

---

## 0. 跨類型的總原則（先讀這段）

1. **體驗核心先講成一句話，再談系統。** 每一類的核心都不一樣：A 是「一個動詞的立即回饋＋可分享的結局」，B 是「下注之後看懸念揭曉」，C 是「發現組合＋有代價的取捨」，D 是「讀招、回應、變強」。審查時先問：這一局裡，玩家**做了哪幾個決定**、**感覺到什麼**？說不出來就不必往下看數字。【推論】
2. **平衡不等於好玩。** Sirlin：「Balance itself doesn't make a game fun」，他把平衡排在風味（flavor）、動態（dynamics）、優雅（elegance）之後：「If you allow balance to rank higher than those things, you get a terrible feeling game.」【一手】https://sirlin.net/articles/game-balance-and-yomi （2014-08-20）
   LocalThunk（Balatro）：「If the picture FEELS level but actually isn't, that is better than it being technically level but feeling askew.」【訪談】https://rogueliker.com/balatro-interview/ （2024-03-07）
3. **玩家會把樂趣優化掉。** 「Given the opportunity, players will optimize the fun out of a game.」任何設計縫隙都會被反覆利用（Civ 團隊稱為 water finds a crack）。【一手】Soren Johnson，同上。
4. **自動玩家量得到「規則層」，量不到「感受層」。** 勝率、局長、主導策略、運氣佔比都能用模擬量；但「前三秒懂不懂」「輸了是笑還是罵」「想不想再來」「會不會分享」只有真人看得到。每一節都分開列。【推論】

---

## A. 60 秒一局的手機網頁小遊戲

例：貓在剛洗好的車上踩出作品 → 60 秒後翻到車內視角出作品卡；迷因交易（看盤、25 倍全押、抱到底或按跑）；車子自己開上迴圈，玩家只負責吸附／噴射／翻轉。

### A-1 體驗核心

- **一個動詞＋立刻有回報。** Voodoo 發行經理 Corentin Selz 的五條準則：snackable（「the session length is short and gives a lot of reward」）、intuitive（「players can understand them in a few seconds」）、Youtubable（「very dynamic and there's a lot of action going on」）、forgiving（例：Roller Splat「you can't even die」）、gameplay first（「gameplay is always the most important thing. The visuals come second.」）。他也反對熔岩、流沙這類一碰就死的危險物，因為會讓遊戲變得有壓力、要求快速反應。【一手】https://www.gameanalytics.com/blog/voodoo-guide-mobile-game-design-keep-things-simple
- **失敗的意義是「我還不夠好」，而玩家會為了擺脫這種感覺再玩一局。** Juul《The Art of Failure》（MIT Press，2013）：遊戲裡的失敗代表「我們」（不是角色）不夠好；遊戲又驅使我們繼續玩來擺脫這種不足感，而靠變強來擺脫失敗正是遊戲樂趣的核心。所以失敗要**能歸因到自己**，「再一局」才成立。【學術】https://cms.mit.edu/jesper-juul-the-pain-of-playing-video-games ；https://bigthink.com/neuropsych/play-video-games-to-fail/
- **結局是一件可以拿出去給人看的成品。** Wordle 的 emoji 方格原本是玩家自己手打出來的，Wardle 只是把它做成內建功能：不暴雷、可以炫耀。他刻意不放連結，覺得連結看起來「trashy」，也沒有方格那種神祕感；一天一題則是為了「leave people wanting more」，不想跟玩家有「intense relationship」。【訪談】https://www.boston.com/news/national-news/2022/01/04/he-made-wordle-for-his-partner-now-its-an-online-hit/ ；https://techcrunch.com/?p=2256733

### A-2 設計重點

1. **前三秒＝一個動詞、一個目標、一個看得見的回饋。** 不要先講規則。超休閒發行商先測 CPI（看了廣告的人願不願意裝），其實就是在測「看一眼就懂，而且想玩」。Supersonic 稱 CPI「reflects the marketability power of your concept」。【一手】https://supersonic.com/learn/blog/the-3-most-important-kpis-for-testing-your-hyper-casual-prototype/
   網頁小遊戲沒有廣告漏斗，對應的指標是：**首次有效輸入的時間**、**第一局完成率**。【推論】
2. **「再一局」三要素：重來零摩擦、失敗能歸因、差一點就成功。**
   - Flappy Bird 一開始比較簡單，Dong Nguyen 覺得無聊才調難；開發過程中他自己愈玩愈好，就一路調高難度（Gamelab 2014 的轉述）。【二手】https://en.wikipedia.org/wiki/Flappy_Bird
   - Crossy Road 的 GDC 2015 講演〈Crossy Road: A Whale of a Time〉（Andy Sum 談設計、Matt Hall 談收入）。Sum：「We wanted to make the next Flappy Bird」。報導指他們大量用 GameAnalytics 追蹤玩家卡在哪裡、在哪裡第一次付費。【一手：Vault 頁】https://gdcvault.com/play/1021897 【二手：報導】https://www.cultofmac.com/news/crossy-road-developers-made-10-million-90-days ；https://blog.unity.com/community/crossy-road-and-unity-ads
   - 「Voodoo 要 forgiving」和「Flappy Bird 很嚴苛」並不衝突：嚴苛要成立，前提是**重來是瞬間的**，而且**死因一眼看得出來**（撞到了就是撞到了）。真正的雷區是「懲罰重」加上「死因不明」（隨機、畫面外、判定模糊）同時出現。【推論】
3. **60 秒內要有起承轉合。** 1 分鐘也夠走一次「介紹動詞 → 加壓或變奏 → 一個意外 → 收尾揭曉」（Hayashida 的起承轉結，見第 5 節）。「翻到車內視角出作品卡」本身就是「轉＋結」：視角翻轉帶來意外，作品卡收尾。【推論】
4. **沒有失敗條件的「玩具型」遊戲（貓踩車）要靠表達與揭曉撐起來。** Roller Splat「不會死」也能成立。但沒有失敗條件時，張力只能來自**限制**（時間、腳印墨量、車身面積）和**揭曉**（最後才看到全貌）。作品卡要呈現「我做的這一個」有什麼獨特之處，例如風格標籤、稀有度、和別人的比較。【一手：Selz】【推論】
5. **推運氣（push-your-luck）型（迷因交易）要讓「抱或跑」是個真正的決定。** 價格如果是純隨機漫步，玩家手上沒有資訊，「按跑」就只是猜硬幣，最佳解會退化成「固定第 N 秒跑」。要給**決定之前看得到的訊號**（input randomness：K 線型態、新聞跑馬燈、量能），而且最後的爆倉／暴富要誇張好笑（失敗變成笑點，不是挫折）。【推論，依據 Burgun 的 input/output randomness，見 C 節】
6. **時機型（迴圈車）：每次失敗都要看得懂差在哪。** 吸附或噴射的判定窗、物理結果要穩定可預期。同樣的輸入出現不同結果，玩家就學不會，也就不會再來一局。【推論】
7. **分享物要能「沒有上下文也看得懂」，而且要能引起「我也要試」。** Wordle 方格的三個性質：不暴雷、每個人的結果都不一樣、看起來神祕。【訪談：Wardle】【推論】

### A-3 常見失敗

| 失敗 | 為什麼 | 來源 |
|---|---|---|
| 第一局先跳教學文字或規則說明 | 違反「幾秒內就懂」；玩家在讀完之前就走了 | 【一手：Selz】 |
| 死了之後要點好幾下、看過場或等待才能重來 | 重來摩擦會殺掉「再一局」 | 【推論】 |
| 死因看不出來（隨機陷阱、畫面外的東西、判定太寬或太窄） | 失敗無法歸因到自己，Juul 說的「擺脫不足感」的動機就不成立 | 【學術：Juul】【推論】 |
| 同一個節奏撐滿 60 秒 | 沒有起承轉合，第 30 秒就膩了 | 【推論】 |
| 最佳策略退化（例如固定時間按跑、永遠全押） | 玩家會把樂趣優化掉 | 【一手：Soren Johnson】 |
| 分享卡只放一個分數 | 沒有個性，也沒有「我也要試」的鉤子 | 【推論；對照 Wardle】 |
| 畫面元素太多、聲光太吵 | Selz 警告元素太多、太吵太複雜會讓玩家受不了 | 【一手：Selz】 |
| 先花時間做美術，核心手感還不對 | 「gameplay first, visuals second」 | 【一手：Selz】 |

### A-4 怎麼量

**超休閒發行商公開的門檻（注意年代與平台；這些是 app store、靠廣告營收的基準，不是網頁小遊戲的基準）：**

- Voodoo（Youssef Gasmi，原刊 LinkedIn，GameAnalytics 轉載）：舊的經驗法則是「55% D1、22% D7、CPI 低於 $0.25」，後來被認為短視；調降為「45% D1、13% D7、$0.20 CPI」。評分也納入產品面的 retention、playtime、**win rates、game length**、未來玩法深度潛力，以及行銷面的 CPI、CTR。反例：Aquapark.io 的 D7 只有 17%，卻是 2019 年下載量第一。【一手（發行商自述，推估是 2019–2020 年的數字）】https://www.gameanalytics.com/blog/how-voodoo-diversified-and-lowered-game-product-kpis
- Voodoo 2020 年把測試擴到 Android 時的門檻（報導）：Android 約 $0.10 CPI／38% D1／8% D7，iOS 約 $0.20／45%／13%。【二手】https://wnhub.io/news/other/item-17705
- Supersonic（Rae Steinbach，2021-08-24，引 Danielle Cohen Reich）：CPI 目標「under $0.30」；Android D1「38% or higher」；APPU D7（每位使用者平均遊玩秒數，當作 LTV 的代理指標）「over 2000s」才有足夠的變現力進軟上市。案例 Draw the Line：初測 D1 51%、CPI $0.38；迭代廣告素材與變現後，CPI $0.21、D1 46%、D7 超過 12%、playtime 超過 900 秒。【一手（發行商自述）】https://supersonic.com/learn/blog/the-3-most-important-kpis-for-testing-your-hyper-casual-prototype/
- 不同來源的數字互相矛盾，而且都是 2019–2021 年 IDFA 變更前後的時空。**拿來當「量級感」可以，當門檻不行。** 【推論】

**自動玩家／模擬量得到的：**

- 局長分布、死亡時間點分布（第一次死亡發生在第幾秒）、死亡位置熱圖。
- 「技巧天花板」：隨機策略 vs 簡單規則策略 vs 搜尋／最佳化策略的分數差距。差距太小 = 技巧不重要；差距太大，新手會被打爆。
- 運氣佔比：同一個策略換不同亂數種子，看分數的變異。
- 退化策略偵測：讓最佳化器自己找最高期望值的策略，再看它是不是「無聊」的策略（固定時間按跑、從頭到尾按住）。
- 迷因交易：「抱」和「跑」的期望值曲線是否隨盤面訊號改變。如果某個時間點之後永遠應該跑，這就不是一個決定。【推論】

**只有真人試玩才看得到的：**

- 前三秒：第一個輸入什麼時候發生、做得對不對（錄螢幕、不給說明）。
- 失敗那一刻的表情和聲音：是笑、是「啊差一點」，還是罵「什麼鬼」？
- 會不會**自己**按下再一局（不提示）。連續局數是最直接的指標。
- 會不會截圖、轉傳、念出結果給旁邊的人聽；旁觀的人會不會想接手。
- 分享卡給沒玩過的人看，他看得懂嗎？會想點進來嗎？

---

## B. 物理模擬對戰原型（東方二創陀螺對戰：選型別＋丟法 → 交給物理決定勝負）

### B-1 體驗核心

- **選擇是一次下注，模擬是懸念與揭曉。** 玩家的能動性集中在開打前（型別、丟法），之後是「看自己的判斷有沒有對」。所以兩件事都要做好：**決定要有份量**，**觀看要好看**。【推論】
- **規則一句話就懂，結果卻有深度。** Beyblade X 團隊：Kusayama「'Whoever stops spinning first loses' is a rule that needs no explanation.」；Takaoka「the outcome is intuitive and easy for anyone to understand, yet it offers deep strategic depth」、「the outcome changes depending on bey combinations, how the bey is shot, and strategic maneuvering」。X Dash（陀螺尖端齒輪咬住場地內的軌道後瞬間加速）的目的是「achieving unprecedented speed and intensity」，要讓陀螺更像「competitive, sports-like experience」。【訪談】https://www.animenewsnetwork.com/interview/2026-08-31/the-power-of-spin-an-with-the-beyblade-x-team/.240616
- **自走棋的經驗：能動性在選擇和管理運氣，不在操作。** TFT 設計支柱（Volty，2019-06-18）把「Fortune」定義成技能：「the skill of managing luck and unpredictable outcomes, both good and bad」；明說 TFT「won't reward you for having the click accuracy…」；觀戰是「shared spectacle」（「you'll know someone else saw it too」）。【一手】https://teamfighttactics.leagueoflegends.com/en-gb/news/dev/dev-design-pillars-of-tft
  GDC 2020 David Abecassis 的 TFT 講演：限制同時上場的單位數，加上同種單位合成升級，讓玩家在「留哪隻」上做艱難取捨，而不是比操作。【二手：報導】https://gdconf.com/news/get-key-game-design-insights-riots-teamfight-tactics-gdc-2020 ；https://www.pockettactics.com/teamfight-tactics-design

### B-2 設計重點

1. **「平衡」的定義：夠多的選項在高手手上都可行。** Sirlin：「A multiplayer game is balanced if a reasonably large number of options available to the player are viable」；公平（fairness）只要求「開局就鎖定的選項」彼此公平。型別是開局鎖定的選項，所以型別之間要公平；丟法如果是當下的技巧輸入，就不必完全對等。【一手】https://www.sirlin.net/articles/balancing-multiplayer-games-part-1-definitions
2. **相剋表的目標：沒有一格比 7-3 更懸殊。** Sirlin 用「兩位高手打 10 場的預期勝場」來寫對戰表（6-4、7-3）。他的 Yomi 在 210 組對戰裡「0 matchups of 7-3 or worse」，並把幾款格鬥遊戲的對戰表拿來比（例如 Super Turbo 的分數範圍大約 +27 到 -22.5）。修的順序：先削 God tier，再補 Garbage tier，最後把各層壓近；目標不是消滅分層，因為「The goal isn't to eliminate tiers」。【一手】https://sirlin.net/articles/game-balance-and-yomi
   → 套到陀螺：**硬相剋（例如 9-1）會讓選角等於勝負**，對戰退化成剪刀石頭布的擲硬幣；軟相剋（6-4 上下）才會留空間給丟法和物理去翻盤。【推論】
3. **模擬的勝率要在「各自用最佳回應丟法」的前提下算。** Sirlin 不信任非高手的數據：「it's likely to be worse than ignoring it because they probably aren't playing the match well enough」。他也算過樣本量的陷阱：真實是 5-5 的兩位高手打 20 場，剛好 10-10 的機率只有約 18%，打出 14 勝以上的機率約 12%。【一手：同上】
   → 模擬可以跑上萬場，樣本量的問題消失了，但「誰在玩」的問題變成「bot 用什麼丟法」。用隨機丟法算出來的相剋表 ≠ 玩家看完對手型別、挑最佳丟法之後的相剋表。要算三層：(a) 型別 × 型別 × 丟法 × 丟法 的完整勝率；(b) 每一格的最佳回應；(c) 選型別這一步的納許均衡混合策略。如果均衡裡某一型的權重接近 1，它就是主導型別。【推論】
4. **剪刀石頭布要有「不對等的報酬」和「難以比較的價值」。** Sirlin：「Just about every competitive game has a form of rock, paper, scissors in it」；但報酬應該「extremely difficult to compare or even to compute」，玩家才需要估值的技巧；而且「Games with perfect information and no randomness inevitably degenerate into more and more memorization」。【一手】https://sirlin.net/articles/designing-yomi （2014-08-21）
   → 陀螺：如果物理是決定性的、雙方選擇又公開，玩家會背出一張查表。對策有三種：同時暗選（讀心，yomi）、丟法帶有技巧誤差（輸入端的雜訊）、勝利方式不只一種而且價值不同（見第 6 點）。【推論】
5. **Counterplay：被克制的一方要有回應手段。** Riot 的 Morello：「Counter-play within the game is a core value, and it's more important than many other values within 'fun.'」；他承認低 counterplay「is MORE fun for the person playing it in the moment」，但仍「willing to sacrifice experiences that have low counter-play」，因為它會讓對手的技巧變得看不見。【二手：粉絲站轉貼的官方紅字發言，2013】https://www.surrenderat20.net/2013/08/red-post-collection-morello-on-design.html
   → 陀螺的 counterplay 就是：**看到對手的型別之後，選丟法能不能明顯改變勝率？** 可以把它當成一個指標來量（B-4 的「能動性指數」）。【推論】
6. **讓「怎麼贏」有好幾種，而且價值不同。** Beyblade X 的 Xtreme Stadium：從角落「Over Zone」出界記 2 分，從中央「Xtreme Zone」出界記 3 分（粉絲 wiki，官方規則書未查證）。不同的終結方式會讓每場都有一個「故事」，也讓型別特色（攻擊型追求擊飛、耐久型追求轉到最後）有各自的勝利條件。【二手】https://beyblade.fandom.com/wiki/Xtreme_Stadium 【推論】
7. **物理的混沌屬於 output randomness，要設上限。** 決定之後才注入的雜訊會削弱策略感（Burgun、Engelstein，見 C 節）。物理的不可預測帶來懸念，但它對勝率的影響要有上限：同一組選擇換種子重跑，勝率不該在 30% 到 70% 之間大幅擺盪。【推論】
8. **觀看要好看（模擬本身就是內容）：**
   - 狀態要看得見：轉速、耐力、重心偏移要顯示出來，觀眾才能追「誰領先」。有領先，才有「逆轉」。【推論】
   - 決定性的那一下要放大：關鍵碰撞用 hit-stop 或慢動作。Sakurai 講 hit stop 的影片裡也談到「boss stop」：打倒頭目的最後一擊會拉近鏡頭並停頓。【二手：報導】https://automaton-media.com/en/news/20220824-15208/
   - 局長要有上限：X Dash 本來就是為了提升速度與強度。兩顆耐久型轉到天荒地老是觀看上的失敗。【訪談：Beyblade X】【推論】
   - 物理的「怪」可以是魅力：Landfall（TABS）用物理驅動的動畫起家，Henriksson：「The wonky part is kind of cool」。但喜劇感要建立在**結果大方向可以理解**上。【訪談】https://gamedeveloper.com/design/how-landfall-games-finds-the-fun-in-physics-engines （2018-10-15）
   - 一起看：TFT 的配對觀戰讓「你知道對方也看到了」。【一手：TFT】

### B-3 常見失敗

- **主導型別**：某一型在納許均衡裡的權重接近 1，或者對所有型別都 ≥ 5-5。【推論；Sirlin 的 God tier】
- **硬相剋讓選角等於勝負**：看完雙方型別就知道結果，模擬只是播一段動畫。【推論】
- **平衡了，但沒有能動性**：每一格都接近 5-5，可是丟法幾乎不影響勝率，玩家感覺只是在擲硬幣。這是「公平但無聊」。【推論】
- **丟法有單一最佳解**：所有型別都用同一種丟法最好，選丟法就成了假選擇。【推論；Soren Johnson 的主導策略】
- **結果無法解釋**：玩家看完說不出「我為什麼輸」，下一場就不知道該改什麼。【推論；Stout：「If players don't know how to play your game, they can't actually play your game.」見 D 節】
- **模擬太長或太平淡**：雙方都在場中央轉，沒有碰撞、沒有領先交替。【推論】
- **只看非高手的資料**：用隨機丟法的 bot 算勝率，結論和實際玩家的體驗相反。【一手：Sirlin】【推論】
- **畫面和判定不同步**：物理步長、插值，或表演用的演出和真實模擬脫鉤，觀眾看到的不是實際發生的事。【推論】

### B-4 怎麼量

**模擬量得到的：**

- 完整勝率張量：型別 i × 型別 j × 丟法 a × 丟法 b，每格附 95% 信賴區間。
- 每一格的最佳回應丟法，以及**能動性指數** = 該格內「最佳丟法勝率 − 最差丟法勝率」。這個值太小，丟法就是裝飾；太大，選型別就不重要了。
- 選型別的納許均衡：均衡支撐集裡有幾種型別、權重分布如何。
- 最懸殊的一格（對照 Sirlin 的 7-3 上限）、每種型別的「最差對戰」。
- 種子變異：同一組選擇換 N 個種子，看勝率的分布（運氣佔比）。
- 局長分布、終結方式分布（出界／停轉／爆裂），每種型別「主要怎麼贏」。
- 戲劇性代理指標：領先交替次數、最大逆轉幅度、決定性碰撞發生的時間點。【推論】

**只有真人看得到的：**

- 開打 3 秒後，能不能預測誰會贏？（預測準確率太高 = 沒懸念；太低 = 看不懂）
- 輸了以後能不能說出原因，並且想換一個選擇再打一場。
- 觀看時的身體反應：前傾、喊叫、「欸欸欸」。
- 東方角色的型別印象和實際性能是否一致（風味和機制要對得上，見反模式「敘事與玩法打架」）。

---

## C. 規則／卡牌遊戲（東方二創：異變、卡牌、地點、曲線、黑幕規則）

### C-1 體驗核心

- **發現組合（synergy）的「原來可以這樣」＋有代價的取捨＋「這手我打得好」的掌控感。** Balatro 的核心迴圈是「score as many chips as possible to defeat an ever rising required score」，靠「synergies that steer you in interesting directions」推動。【訪談】https://rogueliker.com/balatro-interview/
- **每局都是不同的題目。** Path of Exile 的 GDC 2019 講演〈Designing 'Path of Exile' To Be Played Forever〉（Chris Wilson）列出的主題包括「how to employ multiple overlapping axes of randomness for additional replayability」。【一手：GDC Vault 摘要】https://gdcvault.com/play/1025784/Designing-Path-of-Exile-to ；https://80.lv/articles/gdc-designing-path-of-exile
  → 「異變」可以當成一整局的修飾軸，「地點」是另一條軸，「黑幕」是第三條；三條軸互相疊加，才能產生「這局不一樣」的感覺。【推論】
- **用熟悉的主題降低上手成本。** LocalThunk：「The poker theme was slapped on top of the game I was already creating mainly as an onboarding tool.」【訪談：同上】
  → 對東方玩家來說，「異變 → 解決 → 揪出黑幕」本來就是原作的標準結構，這是現成的上手框架。主題給的預期要和機制一致（見反模式「敘事與玩法打架」）。【推論】
- **Boss 是「改規則」，不只是「加血量」。** Balatro 的 boss blind 是為了滿足「rule of three」才加進來的。【二手：Podcast／TouchArcade 訪談轉述】https://gamemakersnotebook.libsyn.com/balatro-creator-localthunk-talks-inspirations-and-jokers ；https://toucharcade.com/2024/03/18/balatro-interview-mobile-port-localthunk-dlc-plans-updates-new-jokers-demo-feedback/
  → 「黑幕規則」最適合做成改規則的 boss：在最後打破玩家已經建立的策略，逼他調整，就像起承轉結的「轉」。【推論】

### C-2 設計重點

1. **每張卡都要有它的位置，但不必一樣強。** Slay the Spire 的 GDC 2019 講演〈'Slay the Spire': Metrics Driven Design and Balance〉（Anthony Giovannetti，Mega Crit）：開發早期就以指標為核心，Early Access 期間一路大量使用資料。【一手：GDC Vault 摘要】https://www.gdcvault.com/browse/gdc-19/play/1025731 ；預告 https://www.gamedeveloper.com/design/learn-i-slay-the-spire-i-s-metrics-driven-approach-to-game-balancing-at-gdc-2019
   第三方摘要的說法：每張卡應有明確的角色而不是等強；Ascension 同時是調校工具；指標若解讀不慎會誤導。【二手：AI 生成摘要，可信度低】
2. **一張卡吃掉周邊所有策略，就該處理。** LocalThunk 描述過一張卡「just too good and cannibalises all the adjacent strategies around it」，結果是出 patch 再重新評估；「Every Joker has gone through some kind of balance change」；調整多半是小幅改數字。【訪談】https://rogueliker.com/balatro-interview/
3. **隨機要放在決定之前（input），不要放在決定之後（output）。** Keith Burgun（2014）：input randomness 是「noise that informs the player before he makes his decision」，output randomness 是「noise injected between the player's decision and the outcome」，他主張策略遊戲應該避免後者。【一手】https://gamedeveloper.com/design/randomness-and-game-design ；https://keithburgun.net/three-types-of-bad-randomness-and-one-good-one/
   Geoff Engelstein 也有相近的主張；Mark Brown 則指出調得好的 output randomness 可以加分、調不好的 input randomness 也會傷害遊戲（兩者皆經論文轉述）。【二手：經學術論文轉述】【學術：CCG 的隨機性與滿意度研究，本輪未讀全文】https://arxiv.org/pdf/2107.08437
   Balatro 作者自己承認：「There is a lot of randomness, possibly too much.」，但看到玩家愈來愈重視風險管理，覺得是好事。【訪談：同上】
   → 抽牌、商店、獎勵選項屬於 input randomness，要搭配緩解手段（重抽、跳過、預覽、保留）；「出牌後擲骰判定成敗」屬於 output randomness，要少用，或只用在低賭注的地方。【推論】
4. **難度不要靠「讓玩家輕鬆穿過去」。** Hades 的 God Mode：Kasavin 說目標是「how to take the sting of failure and reduce that as much as possible」，而不是一般的簡單模式，因為「If you could just blow through it, what's interesting about the game goes away」。做法是一個 Boon：受到的傷害先減 20%，每死一次多 2%，上限 80%（數字是記者描述）。【訪談】https://www.inverse.com/gaming/hades-god-mode-interview （2021-08-11）
5. **Early Access／試玩回饋的用法。** Hades 團隊：一件物品的回饋一旦停了，就不再動它。【二手：報導】https://www.pcgamer.com/uk/a-journey-through-early-access-helped-make-hades-a-masterpiece/
   Balatro：「This game really became the strategy game it is now because of the iteration I was able to do with the community over time.」【訪談：轉述】同上 Podcast／TouchArcade。
6. **「有趣的決定」：選擇要有取捨，要看情境。** Sid Meier 在 GDC 2012 的〈Interesting Decisions〉重新檢視「gameplay is a series of interesting decisions」。【一手：Vault 頁，具體判準本輪未看影片】https://www.gdcvault.com/play/1015756/Interesting
   Soren Johnson 提供了更好操作的判準：要保留一片寬的灰色地帶，讓同一個選擇在某些情境下是對的、在另一些情境下是錯的。【一手】designer-notes，同上。
7. **程序生成要先保證可解，再加變化。** Derek Yu《Spelunky》（Boss Fight Books，2016）談到關卡生成器：先在房間格上鋪一條保證可通過的路徑，再用房間樣板填滿。【一手：書，依記憶，本輪未查證】
   Tanya Short & Tarn Adams 編《Procedural Generation in Game Design》（CRC Press，2017）可作為延伸閱讀。【一手：書，本輪未查證章節】
8. **「曲線」：費用曲線和威脅曲線都要能讀。** 這段沒有找到專門的一手來源，是推論：
   - 前期的手牌要有可打的選項，避免「死回合」。
   - 異變的威脅要逐步升高，而且玩家事先就看得到（input）。
   - 黑幕的規則要在中段就埋線索，不要到最後才突然出現。

### C-3 常見失敗

- **單一流派主導**：某套組合的勝率和選取率都最高，其他流派在高難度下全部不成立。【一手：Balatro「cannibalises」】
- **陷阱卡**：看起來很強，但要湊齊 5 件才有用，實際上幾乎湊不出來，選取率高、勝率低。【推論】
- **前三個選項決定整局**：開局拿到的牌和整局勝率高度相關，後面的決定都不重要（滾雪球）。【推論】
- **出牌後擲骰決勝負**：規劃半天，最後輸在一次擲骰，玩家會覺得被騙。【一手：Burgun】
- **假的三選一**：其中一個選項永遠最好。【一手：Soren Johnson（主導策略）】【推論】
- **關鍵字與資訊過載**：每回合要讀的東西太多，玩家把時間花在查規則，不是做決定。【推論】
- **數字膨脹但沒有決定**：後期的計分變成自動跑，玩家只是看數字往上跳。【推論】
- **固定解**：完全公開、沒有隨機的對戰會退化成背譜。【一手：Sirlin「degenerate into more and more memorization」】
- **黑幕規則和前面學到的東西無關**：轉折沒有在前面鋪陳，玩家只覺得被突襲，而不是「被考倒」。【推論；對照 Hayashida 的「轉」】

### C-4 怎麼量

**自動玩家量得到的：**

- **技巧天花板**：隨機 bot、貪婪 bot、搜尋 bot（MCTS 或展開數步）的勝率差距。差距太小 = 決定不重要。
- **卡牌層級**：選取率、「有這張 vs 沒這張」的勝率差。選取率高、勝率差也高 = 可能吃掉其他策略；選取率高、勝率差為負 = 陷阱卡。
- **流派勝率**：用卡組的特徵分群後，算各群的勝率與分布寬度（build 多樣性）。
- **早期運氣的影響**：前 N 個獎勵選項的品質與最終勝率的相關性。
- **決定品質**：每回合最佳選項和次佳選項的價值差。差距很大的回合比例 = 「明擺著的決定」佔比。
- 死回合頻率（沒有可打的牌）、平均回合數、逆轉率。
- 異變 × 地點 × 黑幕各種組合的勝率矩陣：有沒有哪個組合必勝或必敗。
- 上述指標都是【推論】：把 StS 的指標導向方法和 Sirlin 的對戰表方法搬到 bot 上；StS 實際用了哪些指標，本輪找不到一手細節。

**只有真人看得到的：**

- 他們有沒有**自己發現**組合（「欸，這兩張可以一起用！」），還是要看攻略。
- 能不能解釋自己為什麼輸。
- 會不會主動冒險（選菁英戰、押稀有牌），還是只走安全路線。
- 每個決定花多少時間、多常回頭查規則（讀取負擔）。
- 主題的預期和機制的感受是否一致（例如東方粉絲對某角色「該強在哪裡」的直覺）。

---

## D. UE 俯視 ARPG（類 Diablo、Hades）

### D-1 體驗核心

- **力量幻想＋讀招與回應的節奏＋變強的期待。** DOOM（2016）的 GDC 2018 講演〈Embracing Push Forward Combat in DOOM〉（Kurt Loudy、Jake Campbell，id Software）：拿掉回血、換彈、掩體這些類型標配，改成玩家要從敵人身上「拿」到需要的資源；DOOM 是「the ultimate celebration of the player; a power fantasy run amok」。【一手：GDC Vault 摘要】https://gdcvault.com/play/1024940/Embracing-Push-Forward-Combat-in ；免費影片見 https://www.gamedeveloper.com/design/video-the-combat-design-of-i-doom-i-
- **敵人在「發問」，玩家在「回答」。** Mike Stout（曾在 Insomniac 任職的設計師）把敵人想成「The Questions the enemy is asking players」；「it is crucially important that players understand the questions they are being asked in the moment of attack」；「If players don't know how to play your game, they can't actually play your game.」【一手】https://gamedeveloper.com/design/enemy-attacks-and-telegraphing （2015-09-02）

### D-2 設計重點

1. **前搖（telegraph）讓攻擊變公平。** Stout：攻擊前需要「a small delay」，有了它「It becomes fair.」；前搖可以用動畫、音效、語音、特效組合傳達。寫實風格也可以很克制，只用一個音效、一個上膛動作、一句台詞。【一手：同上】
2. **攻擊的完整結構與「輪流出手」。** Isaiah Everin Cooper（AAA 動作遊戲的敵人設計師）把一次攻擊拆成十個階段：察覺目標、指派攻擊角色、決定方向、選擇招式、準備、前搖幀、命中幀、多段之間的間隔幀、收招幀、回到待機。Attack tickets「exist at a high level to make it so that enemies have to take turns」：每個目標有固定數量的「預約位」，敵人要繳足票才能出手；票價可以依距離或方位調整，例如站在玩家背後出手要繳更多票。【一手：業界設計師部落格】https://signalsandlight.substack.com/p/what-is-an-enemy-attack （2024-03-23）
   → 俯視視角的特有問題：**畫面外的攻擊**。畫面外的敵人應該繳更高的票價，或者攻擊前在畫面邊緣給提示。【推論】
3. **每種敵人有自己的「正解武器」，用資源經濟逼玩家往前打。** GAME Watch（Impress）的講演報導：DOOM 的目標是「動個不停，否則就會死」的戰鬥；榮耀擊殺（glory kill）一口氣回很多血，是明確的獎勵；電鋸不只是近戰武器，而是有限但強力的彈藥補給手段；每種敵人都設計成有明確的對應武器；敵人的攻擊用機率分布「瞄準但故意打偏」，兼顧壓迫感和爽快感；難度靠調敵人的準度與攻擊力；敵人被打到弱化時會發光、硬直，提示可以榮耀擊殺。【二手：講演報導】https://game.watch.impress.co.jp/docs/news/1113403.html
4. **掉落：少一點但好一點、看得懂、和職業有關。**
   - Diablo III 的 Loot 2.0（2014）：整體掉落變少但變好、加入 Smart Drop 讓掉落貼合拾取者的職業；同時關閉拍賣場，John Hight 說拍賣場「ultimately undermines Diablo's core game play: kill monsters to get cool loot」；Kevin Martens 承認先前「Mathematically… You could get a yellow item that was more powerful even though the legendary had a cool power」，所以全面強化傳奇裝。【一手（官方聲明）／訪談，經報導】https://www.shacknews.com/article/83266/diablo-3-patch-201-deploys-with-loot-20 ；https://gamebanshee.com/kpdww
   - Diablo IV 第 4 季「Loot Reborn」（2024-05-14）：詞綴變少，移除冷門、看情境才有用的詞綴，讓物品「easier for players to parse through」；稀有與傳奇裝少一條詞綴，但每條更有價值；Colin Finer 說以前要在上百件物品裡翻找一件強的，感覺像「chore」；同時加入 Tempering／Masterworking，讓玩家更能掌控裝備成長。【訪談／二手】https://Gamespot.com/articles/how-diablo-4-loot-reborn-update-will-make-its-items-and-players-more-powerful-than-ever/1100-6523061/ ；https://www.dexerto.com/diablo/diablo-4-patch-notes-1-4-0-itemization-crafting-2676111/ ；https://news.blizzard.com/en-gb/article/24077227/catch-up-on-our-latest-developer-update
   → 「會改變技能行為」的裝備（傳奇威能），價值遠高於只是加數值的裝備。玩家需要靠過濾器才能撿東西，本身就是掉落太多的症狀。【推論】
5. **長期遊玩：多條隨機軸疊加＋可預期的賽季節奏。** PoE 的 GDC 2019 講演主題也包括「how to structure releases into seasons with predictable release dates and scope」。【一手：Vault 摘要】同上。
6. **受擊回饋：hit-stop、震動、後座力。**
   - Sakurai 的 YouTube 頻道「Masahiro Sakurai on Creating Games」（2022 年開台）早期就有一集專談 hit stop，比較有無 hit stop 的差別；後續一集整理多種 hit stop 技巧，包括讓被打的角色抖動得更厲害、維持判定框不動、在受擊姿勢之間插值等。【二手：報導】https://automaton-media.com/en/news/20220824-15208/ ；（原報導 nintendowire 本輪 403）
   - Vlambeer 的 Jan Willem Nijman〈The Art of Screenshake〉（2013）。轉述 RPS 訪談：Nuclear Throne 開一槍，鏡頭往瞄準的反方向退 6 像素、螢幕震動值 +4 並快速衰減，同時有彈殼飛出、槍枝貼圖後座又迅速歸位。【二手】https://infovore.org/?p=5275 ；https://kenney.nl/learn/must-see-videos-for-indie-developers
   - 俯視 ARPG 的特殊性：一次打中 30 隻小怪時，如果每一下都做全域 hit-stop，手感會變成卡頓。hit-stop 要依「單發重擊 vs 範圍清怪」分級，或只停被打的單位。【推論】
7. **閃避與無敵幀：** 本輪沒有找到一手來源。推論的要點：
   - 無敵幀窗口、閃避冷卻、敵人前搖長度、同時出手的票數，這四個數字要一起調。
   - 閃避太強會讓所有前搖都失去意義（每個問題的答案都是「按閃避」）。
   - Hades 那種多段衝刺的設計，需要用敵人的範圍攻擊、地形傷害等不同類型的「問題」來平衡。【推論】
8. **難度靠調行為，不要只灌血。** DOOM 的難度靠準度與攻擊力（見上）。Hades 的 God Mode 給玩家一個「變更強」的框架，而不是「敵人變弱」：Kasavin 選這個名字，是因為它符合主角「powerful and capable」的主題。【訪談】https://www.inverse.com/gaming/hades-god-mode-interview

### D-3 常見失敗

- **子彈海綿**：敵人之間只差數值，沒有不同的「問題」。【推論；Stout】
- **前搖看不出來**：特效太滿、敵人的顏色和背景太近、前搖動畫太短。（畫面可讀性見 game-art 技能。）【推論】
- **畫面外或背後的傷害**：俯視鏡頭的視野有限，死因不明。【推論；Cooper 的背後加價】
- **一群敵人同時出手**：沒有 ticket／輪流機制，傷害不可閃避。【一手：Cooper】
- **閃避萬能解**：無敵幀太長、冷卻太短。【推論】
- **掉落洪水**：大量只差數值的雜訊裝，翻找變成苦差事。【訪談：D4 Finer】
- **傳奇裝不如黃裝**：特殊威能的價值被數值碾過，玩家只撿數值。【訪談：D3 Martens】
- **交易或捷徑破壞核心迴圈**：例如 D3 的拍賣場。【一手：Hight】
- **hit-stop 造成卡頓**：多目標時全域凍結，輸入感覺延遲。【推論】
- **成長曲線碾過內容**：玩家強到敵人不構成問題，遭遇失去意義。【推論】

### D-4 怎麼量

**自動玩家／遙測量得到的：**

- 各敵人在各裝備層級下的擊殺時間（TTK）；玩家受傷的**來源分解**（哪一招打中最多次，代表它的前搖可能有問題）。
- 「畫面外命中」比例、「多敵同時命中」比例。
- 閃避成功率依攻擊類型分列（某一招幾乎閃不掉 = 前搖或判定有問題）。
- 各 build 的 DPS 分布與清關時間分布（build 多樣性）；主導 build 偵測。
- 掉落的「裝備率」：掉落中有多少件曾被裝上，代表雜訊佔比。兩次升級之間的間隔時間。
- 遭遇時長、資源經濟（血量與藥水是否長期見底或長期全滿）。
- 以上皆【推論】。

**只有真人看得到的：**

- 玩家會不會用「行為」叫敵人（「那個會衝過來的」），代表敵人有個性。
- 死後問他「怎麼死的」：說得出來 = 前搖成立。
- 打擊感：看手部動作和表情，以及有沒有「爽」的出聲反應。
- 會不會讀裝備說明，還是直接比數字或乾脆忽略。
- 特效、數字、掉落光柱有沒有蓋掉前搖。

---

## 5. 教學與難度（全類型）

### 5-1 不用文字教玩法

- **Super Mario Bros. 1-1**：宮本茂與手塚卓志在 2015 年的 Eurogamer 訪談說，目標是讓玩家不看說明書就能自然學會所有基本操作。第一個敵人原本是 Koopa，但「we thought it might be a little too difficult for the player to jump on and then kick it」，所以改成「bad mushroom」（Goomba）；蘑菇的擺放讓新手很難避開（水管擋路、蘑菇從上方掉下來）。【二手：經 Wikipedia／GameRevolution 轉述】https://en.wikipedia.org/wiki/World_1-1 ；https://www.gamerevolution.com/features/362525-perfect-level-super-mario-bros-world-1-1-changed-everything
- **起承轉結（kishōtenketsu）**：林田宏一（Super Mario 3D Land 導演）在 2012 年 Gamasutra 訪談**親口**提到這個詞：「introduce a concept, and then in the next panel you develop the idea a little bit more」、「in the third panel there's something of a change-up, and then in the fourth panel you have your conclusion」，轉折要「something crazy happens that makes you think about it in a way you weren't expecting」，最後讓玩家「demonstrate… what sort of mastery」。【訪談】https://www.gamedeveloper.com/design/the-secret-to-i-mario-i-level-design （2012-04-13）
  GMTK 把它整理成 3D World 的四步驟關卡法。【二手】https://kotaku.com/what-made-super-mario-3d-world-so-great-1691916400
- 套用到各類：
  - A：60 秒就是一次起承轉結。
  - B：第一場只開放 2 種型別，第二場加入丟法，第三場遇到「剋你的那一型」（轉）。
  - C：前幾場固定牌組，逐步解鎖異變。
  - D：每種新敵人先單獨出場，再和已知的敵人組合，最後在不利地形出現。
  （皆為【推論】）
- **Mega Man X 開場、Portal 的測試房**：常被引用（Egoraptor〈Sequelitis〉、Valve 的開發者評論），本輪未查證。

### 5-2 動態難度與節奏

- **Left 4 Dead 的 AI Director**：Mike Booth〈The AI Systems of Left 4 Dead〉（AIIDE 2009，Valve 投影片）的目標之一是「Generate Dramatic Game Pacing」。【一手：PDF】https://cdn.fastly.steamstatic.com/apps/valve/2009/ai_systems_of_l4d_mike_booth.pdf
  依記憶（**本輪 PDF 是字型編碼，抽不出文字，未能核對**）：導演追蹤每位倖存者的「intensity」（受傷、倒地、附近擊殺會讓它上升，之後隨時間衰減），並依 Build Up → Sustain Peak → Peak Fade → Relax 的循環調整敵人數量。重點是**調的是節奏，不是難度**。【一手，待查證】
  2007 年的 Game*Spark 訪談：戰況平靜時導演會安排新一波攻擊，激戰持續太久就讓局勢冷卻。【訪談】https://www.gamespark.jp/article/2007/04/10/11866.html
- **Resident Evil 4 的隱藏難度**：Capcom 從未正式承認；唯一的官方出處是遊戲發售近一年後出的官方攻略本。據玩家與媒體整理，玩得好時敵人更兇、傷害更高，玩得差時會放鬆。【二手】https://www.engadget.com/2015-06-03-resident-evil-4-difficulty.html
  → 隱藏 DDA 的風險：玩家發現後會覺得「被操控」，或者故意放水來刷。【推論】
- **Celeste 的 Assist Mode**：Matt Thorson 原本叫它「Cheat Mode」，覺得太「judgmental」才改名，後來看到 Mario Odyssey 也用「Assist Mode」覺得安心。可調的項目有遊戲速度、體力、空中衝刺次數、能否死亡。他承認「Assist Mode breaks the game」，但目標是「empower the player」；遊戲內建議第一次遊玩不要開。【訪談】https://www.vice.com/en/article/celeste-difficulty-assist-mode （2018-02-07）；遊戲內文字見 https://uxdesign.cc/designing-accessible-video-games-f4c9824a9182 【二手】
- **Hades 的 God Mode**：見 C-2 第 4 點；把輔助框成「變更強」，而不是「敵人變弱」。【訪談】
- **Flow channel**：Csikszentmihalyi 的心流；Jenova Chen〈Flow in Games (and Everything Else)〉（Communications of the ACM，2007）主張讓玩家自己選擇挑戰強度。【學術，本輪未查證】
  實務上的轉譯：
  - A：用局內加速維持心流。
  - B：用天梯配對維持心流。
  - C：用 Ascension 類的階梯（StS 摘要裡也提到 Ascension 是調校工具）。
  - D：用 Heat 或世界層級。
  （皆為【推論】）

### 5-3 檢查清單

- 不看任何文字，第一個動作是否自然會發生？（1-1 原則）
- 每個新機制是否先在安全的環境單獨出現，再加變化、再轉折？（起承轉結）
- 難度調的是節奏（L4D），還是數值？玩家是否知道自己開了輔助？（RE4 的隱藏 vs Celeste 的明示）
- 輔助功能的命名與文案有沒有在羞辱玩家？（Celeste 的命名過程）

---

## 6. 反模式（症狀 → 為什麼會發生 → 怎麼檢查 → 怎麼修）

### 6-1 主導策略／退化策略

- **症狀**：高段玩家都用同一套（同一型陀螺、同一個流派、同一個 build、固定秒數按跑），其他選項只在新手局出現。
- **為什麼**：「Games lose their dynamic quality once a strategy emerges that dominates under all conditions.」設計者對自己遊戲的理解常常不如玩家。【一手：Soren Johnson】https://www.designer-notes.com/game-developer-column-17-water-finds-a-crack/
- **怎麼檢查**：用最佳化 bot 或搜尋 bot 找最高期望值的策略；B 類算納許均衡；C、D 類看選取率與勝率的分布。
- **怎麼修**：讓強策略付出隨規模上升的代價（Civ 4 用「依城市總數遞增的維護費」修 Infinite City Sleaze）；保留「某些情境對、某些情境錯」的灰色地帶；先削頂端，再補底部，最後壓縮層級（Sirlin）。

### 6-2 玩家把樂趣優化掉（最佳解很無聊）

- **症狀**：最強的玩法是重複、乏味的操作（Civ 3 反覆砍樹再種回去、Morrowind 撞牆練技能、微調稅率避免溢出浪費）。
- **為什麼**：玩家低估自己的時間，願意拿大量時間換小額低風險的報酬。【一手：Soren Johnson】
- **怎麼檢查**：看 bot 找到的最佳策略「好不好玩」；觀察真人有沒有做出重複又沒有決定的操作。
- **怎麼修**：把無聊的最佳化自動化或直接移除（Civ 4 讓溢出的食物、生產、研究自動結轉到下一項）；不是破壞遊戲的捷徑可以保留（例如瑪利歐的無限 1UP 是刻意的）。

### 6-3 硬相剋讓選角等於勝負

- **症狀**：看完雙方選擇就知道誰贏；對戰變成擲硬幣；輸的一方說「選錯而已」。
- **為什麼**：把「剪刀石頭布」照字面做成等值硬相剋；Sirlin 說字面版的 RPS 很淺，因為選項在功能上完全相同。【一手】https://sirlin.net/articles/designing-yomi
- **怎麼檢查**：對戰表中最懸殊的一格；能動性指數（開局後的選擇能把勝率移動多少）。
- **怎麼修**：所有對戰壓在 7-3 以內（Sirlin 的 Yomi 標準）；報酬不對等、難以直接比較；被剋的一方要有回應手段（counterplay）。

### 6-4 沒有 counterplay 的機制

- **症狀**：用的人很爽，被用的人只能接受；高手和新手面對它的結果差不多。
- **為什麼**：設計者只從使用者的角度評估爽感。Morello：低 counterplay 對使用者來說當下「MORE fun」，但會讓對手的技巧消失。【二手：粉絲站轉貼】https://www.surrenderat20.net/2013/08/red-post-collection-morello-on-design.html
- **怎麼檢查**：問「被這招打的人，有什麼決定可以做？」；量技巧高低對這招成功率的影響。
- **怎麼修**：加前搖或可見的條件（D 類的 telegraph）、給反制的時間窗口、讓強招有可預讀的冷卻或代價。

### 6-5 輸出隨機決定勝負

- **症狀**：規劃完美卻輸在一次擲骰；玩家把勝負歸因於運氣，不想再試。
- **為什麼**：隨機被放在決定之後。【一手：Burgun 2014】https://gamedeveloper.com/design/randomness-and-game-design
- **怎麼檢查**：同一個策略換種子跑，看結果的變異；看最後一次隨機事件對勝負的決定比例。
- **怎麼修**：把隨機挪到決定之前（抽到什麼、商店出什麼、異變是什麼都事先公開）；給緩解手段（重抽、預覽、保底）；保留的 output 隨機要設上下限（物理混沌也一樣）。

### 6-6 假選擇／無意義的選擇

- **症狀**：三選一裡永遠選同一個；選項之間只是換皮；做完選擇什麼都沒變。
- **為什麼**：為了「看起來有內容」而增加選項，沒有設計取捨。【推論；Sid Meier GDC 2012「interesting decisions」的出發點】https://www.gdcvault.com/play/1015756/Interesting
- **怎麼檢查**：每個選擇點最佳和次佳選項的價值差；真人的選擇分布（某一項超過 80% = 可疑）。
- **怎麼修**：讓每個選項在不同情境下各自最好；砍掉沒有差異的選項。少一點但真的選擇，勝過多一點的假選擇。

### 6-7 資訊過載／教學文字牆

- **症狀**：玩家停下來讀、查規則；第一局就要看說明；畫面上同時有十種東西在閃。
- **為什麼**：把「說清楚」誤解成「講更多」；功能疊加之後沒有回頭刪。Selz 警告元素太多太吵會讓玩家受不了。【一手】Stout：「If players don't know how to play your game, they can't actually play your game.」【一手】
- **怎麼檢查**：不給任何說明的盲測，看第一次有效輸入的時間；數每回合需要讀的文字量。
- **怎麼修**：用關卡教（1-1、起承轉結）；一次只引入一個新概念；D4 的做法是減少詞綴、移除只在特定情境才有用的詞綴。

### 6-8 獎勵稀釋（掉落洪水）

- **症狀**：掉落很多卻沒有期待感；玩家不讀說明就直接分解；需要過濾器才能玩。
- **為什麼**：用「量」代替「意義」；數值詞綴組合爆炸。
- **怎麼檢查**：掉落裝備率（有多少件曾被裝上）、兩次升級之間的間隔、玩家停下來比較裝備的比例。
- **怎麼修**：少而好、貼合職業（D3 Loot 2.0、Smart Drop）；減少詞綴、提高每條詞綴的價值（D4 S4）；讓特殊威能贏過單純的數值（D3 強化傳奇裝）。

### 6-9 功能蔓延

- **症狀**：核心動詞還沒好玩，就先加商店、每日任務、收集冊、第二種貨幣。
- **為什麼**：用加系統來掩蓋核心不夠有趣；每個系統各自看起來合理。
- **怎麼檢查**：拿掉所有外圍系統，只留核心迴圈，還有人想再玩一局嗎？
- **怎麼修**：Voodoo 的「find one nugget of gameplay that works」、「everything comes second」；Sirlin 把優雅排在平衡之前。超休閒的教訓是先證明核心，再談外圍。【一手：Selz、Sirlin】

### 6-10 強迫循環取代內在樂趣

- **症狀**：玩家回來是因為「不回來會虧」（每日登入、限時、連續天數），不是因為想玩；停掉獎勵就沒人玩。
- **為什麼**：把操作制約的排程（行為主義）當成主要動力。John Hopson〈Behavioral Game Design〉（Gamasutra，2001）是把強化排程引進遊戲設計討論的早期文章。【一手：本輪未開啟原文，出處經二手確認；網址依記憶，待核對】https://www.gamedeveloper.com/design/behavioral-game-design
  自我決定論觀點：Ryan, Rigby & Przybylski（2006, *Motivation and Emotion*）〈The Motivational Pull of Video Games〉指出勝任、自主、關聯三種需求是樂趣的來源。【學術：本輪未查證】
- **怎麼檢查**：關掉所有外在獎勵（每日、連續、成就）做 A/B，看留存掉多少；問玩家「為什麼回來」。
- **怎麼修**：讓回來的理由是「想看今天的題目」或「想試新的組合」。Wordle 刻意一天一題、不推播、「doesn't want an intense relationship」，是反向的示範。【訪談】

### 6-11 暗黑模式（時間、金錢、社交）

- **症狀**：玩家事後後悔花的時間或錢；因為社交義務而玩；不知道自己花了多少。
- **為什麼**：Zagal、Björk、Lewis（FDG 2013）的定義是「A dark game design pattern is a pattern used intentionally by a game creator to cause negative experiences for players without those players' consent.」他們分成時間類（例：grinding、playing by appointment）、金錢類（例：pay to skip、pre-delivered content）和社交資本類（例：social pyramid schemes、impersonation）。【學術】https://gup.ub.gu.se/file/101018 ；https://research.chalmers.se/en/publication/177148
- **怎麼檢查**：用論文給的問題自問（原文）：
  - 時間：「Can the player develop a sense of the time commitment necessary…?」「How likely are players to feel they wasted their time?」
  - 金錢：「How likely is the player to regret having spent money…?」「…lose track of how much money he spends…?」「Is the player aware of what she is getting in return…?」
  - 社交：「Could the player's social standing… be diminished…?」「How likely is the player to feel that she must play primarily because of a sense of social obligation?」
- **怎麼修**：時間成本事先揭露；不賣「跳過挑戰」；分享是炫耀，不是勒索（不要「邀 3 個朋友才能繼續」）。
  迷因交易遊戲：雖然沒有真錢，若日後要變現，「25 倍全押」不要和真實付費接在一起，避免近似賭博的設計。【推論】

### 6-12 敘事和玩法打架（ludonarrative dissonance）

- **症狀**：故事說 A，最佳玩法卻是 B。例如迷因交易的主題是「鑽石手抱到底」，最佳解卻永遠是早早跑；東方卡牌的主題是「解決異變」，最佳解卻是拖延不解；某個角色的設定是高速，陀螺性能卻是耐久型。
- **為什麼**：Clint Hocking（2007）分析 BioShock：遊戲規則鼓勵自利（ludic contract），劇情卻要求你幫 Atlas（narrative contract），兩者互相矛盾。【一手：原文 clicknothing.typepad.com/click_nothing/2007/10/ludonarrative-d.html，Typepad 已下線、archive 無法存取，內容依記憶】
- **怎麼檢查**：把 bot 找到的最佳策略用一句話講出來，再和主題的一句話並排比較。
- **怎麼修**：調機制讓主題行為成為好策略（例如抱到底有額外的報酬倍率，但要承擔可預讀的風險）；或者改主題去貼合機制。

### 6-13 失敗不可歸因（挫折型失敗）

- **症狀**：玩家輸了罵遊戲，而不是罵自己；不想再來一局。
- **為什麼**：死因不明（隨機、畫面外、判定模糊）時，Juul 說的「失敗＝我不夠好 → 想變強」動機就斷了。【學術：Juul】
- **怎麼檢查**：失敗當下問「你怎麼輸的？」說不出來的比例；受傷來源分解。
- **怎麼修**：前搖、死亡重播或回放、把關鍵的那一下放大；讓失敗本身好笑（Voodoo 的 forgiving、TABS 的物理喜劇）。

### 6-14 平衡壓過手感

- **症狀**：數據上很平衡，但大家都覺得某個東西「怪怪的」或「很弱」；為了對稱，把每個選項的特色都磨平。
- **為什麼**：把平衡排在風味、動態、優雅之前（Sirlin）；只信數字，不看感受（LocalThunk 的「掛畫」比喻）。
- **怎麼檢查**：問試玩者「哪個最強、哪個最弱」，再和數據對照；兩者不一致就是感知問題。
- **怎麼修**：先保住特色，再用數值微調；處理「感覺不平衡」本身就是一件工作。【一手：Sirlin】【訪談：LocalThunk】

---

## 7. 找不到／沒查到（下輪可補）

- **Kwalee** 公開的原型測試方法與門檻：額度不夠，沒查。
- **網頁（非 app store）小遊戲**的公開留存與再玩率基準：沒找到。上面的超休閒門檻都是 app 加廣告的情境。
- **Crossy Road GDC 2015** 講演內容：Vault 要登入，只有報導。
- **Flappy Bird** 作者本人談「再一局」的設計理由：沒找到一手。
- **Juul《The Art of Failure》**對失敗類型（好笑、悲劇等）的細分：沒讀原書，只有出版社與書評摘要。
- **Sirlin〈Rock, Paper, Scissors in Strategy Games〉**原文：猜的網址 404，改用〈Designing Yomi〉與〈Game Balance and Yomi〉。
- **Sirlin〈Balancing Multiplayer Games〉**系列的發表年份：沒有核對，筆記裡沒寫年份。
- **Riot 的 counterplay** 官方原文：只找到粉絲站轉貼的紅字發言，以及 Morello 2014 年 Dev Blog 的法文轉述。
- **TFT GDC 2020**（David Abecassis）講演細節：只有報導。
- **Gladiabots、Robot Arena** 等「設定後交給模擬」遊戲的設計訪談：沒查。
- **Beyblade X** 官方規則書（Spin／Burst 終結的計分）與開發者談型別相剋：只有粉絲 wiki 的 Over 2 分、Xtreme 3 分；訪談沒談相剋。
- **Slay the Spire GDC 2019** 的具體指標（選取率、勝率等）：只有 AI 生成摘要，不可靠。
- **Hades** 的 boon、Duo boon、衝刺的設計理由：沒找到一手；只有 God Mode 的訪談。
- **Inscryption、Monster Train** 設計訪談：沒查。
- **Derek Yu《Spelunky》、Short & Adams《Procedural Generation in Game Design》**：本輪沒有重新查證章節內容，只依記憶引用生成器的「先保證路徑」。
- **GMTK** 專談敵人設計的影片：沒找到吻合的標題，只確認有〈How Cuphead's Bosses (Try to) Kill You〉。
- **Mark Brown「兩種隨機」影片**：只見於 arXiv 論文的轉述，沒有直接核對影片。
- **Left 4 Dead AI Director** 投影片細節（強度公式、Relax 秒數）：PDF 是字型編碼，抽不出文字，筆記中標了待查證。
- **Hocking 2007 原文**：Typepad 已下線，web.archive.org 無法存取。
- **Sid Meier〈Interesting Decisions〉**（GDC 2012）的具體判準：沒看影片（約 37:00–44:37 一段）。
- **Sakurai hit stop** 影片的具體幀數與技巧全表：報導站 403。
- **「Juice it or lose it」**（Jonasson & Purho）講演的年份與場合：沒查證，筆記中未引用細節。
- **Joseph Kim 的 compulsion loop 文章**：沒找到，改引 Hopson 2001。
- **Mega Man X、Portal** 教學設計的一手來源：沒查。
- **閃避與無敵幀**的設計一手來源（例如 Souls 系列、Hades 的訪談）：沒找到，D 節相關內容都是推論。
- **Diablo III／IV** 的戰鬥手感講座（GDC）：沒查。
