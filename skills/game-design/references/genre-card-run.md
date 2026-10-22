# 規則、卡牌、run-based

2026-10-21 研究整理；原始筆記 `research/notes_C_genres.md` C 節。標【推論】的最需要驗證。

## 體驗核心

發現組合的「原來可以這樣」、有代價的取捨、「這手打得好」的掌控感；每局都是不同的題目。

- Balatro（LocalThunk）【訪談】https://rogueliker.com/balatro-interview/ ：核心迴圈是「score as many chips as possible to defeat an ever rising required score」，
  靠「synergies that steer you in interesting directions」推動。撲克主題「was slapped on top … mainly as an onboarding tool」。
- Path of Exile GDC 2019（Chris Wilson）【一手：Vault 摘要】：「how to employ multiple overlapping axes of randomness for additional replayability」。
- Balatro 的 boss blind 改規則，是為了滿足「rule of three」才加的【二手：訪談轉述】。

## 要注意

1. **主題拿來降低上手門檻**，主題給的預期要跟機制一致。原作有現成的結構（例如「異變 → 解決 → 揪出黑幕」）就借來當框架【推論】。
2. **魔王改規則，不只加血量。** 最後打破玩家已建立的策略、逼他調整，是起承轉合的「轉」；轉折要在中段埋線索，否則玩家只覺得被突襲【推論】。
3. **每張卡都要有位置，但不必一樣強。** Slay the Spire 從開發早期就以指標為核心（GDC 2019〈Metrics Driven Design and Balance〉【一手：議程摘要】；具體指標本輪沒找到）。
4. **一張卡吃掉周邊所有策略就處理**：「just too good and cannibalises all the adjacent strategies around it」→ patch；「Every Joker has gone through some kind of balance change」【訪談】。
5. **隨機放在決定之前。** 抽牌、商店、獎勵是 input，配重抽、跳過、預覽、保留；「出牌後擲骰定成敗」是 output，少用或只放在低賭注處（Burgun【一手】）【推論】。
   LocalThunk 自己承認「There is a lot of randomness, possibly too much.」，但看到玩家越來越重視風險管理。
6. **多條隨機軸疊加**（PoE）：一整局的修飾軸、地點軸、魔王規則軸互相疊，產生「這局不一樣」【推論】。
7. **難度輔助是減輕失敗的刺痛，不是讓人直接穿過去**（Hades God Mode：受傷先減 20%、每死一次多 2%、上限 80%，數字是記者描述）【訪談】。
8. **有趣的決定**：保留寬的灰色地帶，同一個選擇在某些情境對、在另一些情境錯（Johnson【一手】）。
9. **程序生成先保證可解，再加變化**：Spelunky 先在房間格上鋪一條保證可通過的路，再用樣板填滿（Derek Yu《Spelunky》【一手：書，依記憶未查證】）。
10. **曲線要讀得懂**【推論】：前期手牌要有可打的選項（避免死回合）；威脅逐步升高且事先看得到；魔王規則中段就埋線索。

## 常見失敗

- 單一流派主導：某套組合的勝率與選用率都最高，其他流派在高難度下全部不成立。
- 陷阱卡：看起來很強但要湊齊很多件，選用率高、勝率低。
- 前三個選項決定整局（滾雪球）。
- 出牌後擲骰決勝負：規劃半天輸在一次擲骰。
- 假的三選一：其中一個永遠最好。
- 關鍵字與資訊過載：時間花在查規則，不是做決定。
- 數字膨脹但沒有決定：後期計分自動跑，玩家只是看數字往上跳。
- 完全公開、沒有隨機的對戰退化成背譜（Sirlin）。
- 魔王規則跟前面學到的東西無關：被突襲，而不是被考倒。

## 怎麼量

自動玩家（做法在 decisions-and-balance.md）：
- 技巧天花板：亂玩、貪婪、搜尋（MCTS 或展開數步）三種的勝率差。差太小＝決定不重要。
- 每張卡的選用率、有它與沒它的勝率差；選用高、勝率差為負＝陷阱卡。
- 用卡組特徵分群後各流派的勝率與分布寬度（build 多樣性）。
- 前 N 個獎勵的品質與最終勝率的相關（早期運氣的影響）。
- 每回合最佳與次佳選項的價值差；差很大的回合比例＝明擺著的決定佔比。
- 死回合頻率、平均回合數、逆轉率。
- 規則軸組合（修飾 × 地點 × 魔王）的勝率矩陣：有沒有必勝或必敗的組合。

只有真人看得到：
- 有沒有自己發現組合（「欸，這兩張可以一起用」），還是要看攻略。
- 能不能解釋自己為什麼輸。
- 會不會主動冒險（選菁英戰、押稀有牌），還是只走安全路線。
- 每個決定花多少時間、多常回頭查規則。
- 主題的預期與機制的感受是否一致（例如粉絲對某角色「該強在哪」的直覺）。
