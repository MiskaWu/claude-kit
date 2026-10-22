# 動作、俯視 ARPG

2026-10-21 研究整理；原始筆記 `research/notes_C_genres.md` D 節。標【推論】的最需要驗證。
前搖、特效、掉落看不看得見是畫面問題，照 game-art（含俯視 ARPG 的 AAA 驗收準則）。

## 體驗核心

力量幻想、讀招與回應的節奏、變強的期待。

- DOOM（2016）GDC 2018〈Embracing Push Forward Combat in DOOM〉【一手：Vault 摘要】：拿掉回血、換彈、掩體，玩家要從敵人身上「拿」到需要的資源；
  「the ultimate celebration of the player; a power fantasy run amok」。https://gdcvault.com/play/1024940/Embracing-Push-Forward-Combat-in
- Mike Stout【一手】https://gamedeveloper.com/design/enemy-attacks-and-telegraphing ：敵人是「The Questions the enemy is asking players」；
  「it is crucially important that players understand the questions they are being asked in the moment of attack」。

## 要注意

1. **前搖讓攻擊變公平**：攻擊前要「a small delay」，有了它「It becomes fair.」；用動畫、音效、語音、特效組合傳達，寫實風也可以很克制（Stout【一手】）。
2. **讓敵人輪流出手**（Cooper【一手】https://signalsandlight.substack.com/p/what-is-an-enemy-attack ）：一次攻擊拆成十段（察覺、指派角色、決定方向、選招、準備、前搖、命中、多段間隔、收招、回待機）；
   attack tickets「exist at a high level to make it so that enemies have to take turns」，每個目標有固定的預約位，站在玩家背後出手要繳更多票。
   俯視鏡頭的特有問題是畫面外的攻擊：畫面外的敵人票價更高，或攻擊前在畫面邊緣提示【推論】。
3. **每種敵人有自己的正解武器，資源經濟逼玩家往前打**（DOOM，GAME Watch 講演報導【二手】）：榮耀擊殺回很多血；電鋸是有限但強力的彈藥補給；
   敵人的攻擊「瞄準但故意打偏」，兼顧壓迫感和爽快感；被打到弱化時會發光、硬直，提示可以處決。
4. **掉落少而好、看得懂**：
   - D3 Loot 2.0（2014）：掉落變少但變好，Smart Drop 貼合職業；關閉拍賣場，Hight 說它「ultimately undermines Diablo's core game play: kill monsters to get cool loot」；
     Martens 承認黃裝在數學上可能比有酷炫威能的傳奇裝強，於是全面強化傳奇裝【一手／訪談，經報導】。
   - D4 第 4 季 Loot Reborn（2024）：減少詞綴、移除冷門和看情境才有用的詞綴，讓物品「easier for players to parse through」；Finer：以前在上百件裡翻一件強的像「chore」【訪談】。
   - 會改變技能行為的裝備，價值遠高於只加數值的；玩家要靠過濾器才能撿東西，本身就是掉落太多的症狀【推論】。
5. **長期遊玩**：多條隨機軸疊加，加上可預期的賽季節奏（PoE GDC 2019【一手：摘要】）。
6. **hit-stop**：照 feel-and-pacing.md 的櫻井原則；一次打中三十隻時全域停頓會像卡頓，依單發重擊或範圍清怪分級，或只停被打的單位【推論】。
7. **閃避與無敵幀**：本輪沒找到一手來源。前搖長度、無敵幀、閃避冷卻、同時出手的票數這四個要一起調；閃避太強，每個問題的答案都是按閃避，前搖就失去意義；
   多段衝刺要用範圍攻擊、地形傷害這類不同的「問題」平衡【推論】。
8. **難度靠調行為，不只灌血**：DOOM 調準度與攻擊力；Hades 的 God Mode 框成「你變強」，符合主角「powerful and capable」的主題【訪談】。

## 常見失敗

- 子彈海綿：敵人之間只差數值，沒有不同的「問題」。
- 前搖看不出來：特效太滿、敵人顏色跟背景太近、前搖動畫太短。
- 畫面外或背後的傷害：死因不明。
- 一群敵人同時出手：沒有輪流機制，傷害不可閃避。
- 閃避萬能解：無敵幀太長、冷卻太短。
- 掉落洪水；傳奇裝不如黃裝；交易或捷徑破壞「殺怪拿寶」的核心。
- hit-stop 造成卡頓。
- 成長曲線碾過內容：玩家強到敵人不構成問題，遭遇失去意義。

## 怎麼量

自動玩家與遙測【推論】：
- 各敵人在各裝備層級下的擊殺時間；玩家受傷的來源分解（哪一招打中最多次，代表它的前搖可能有問題）。
- 畫面外命中、多敵同時命中的比例。
- 閃避成功率依攻擊類型分列（某一招幾乎閃不掉＝前搖或判定有問題）。
- 各 build 的輸出與清關時間分布；主導 build 偵測。
- 掉落裝備率（掉的東西有多少件曾被裝上）；兩次升級之間的間隔。
- 遭遇時長；資源經濟（血量與藥水是不是長期見底或長期全滿）。

只有真人看得到：
- 會不會用行為叫敵人（「那個會衝過來的」），代表敵人有個性。
- 死後問「怎麼死的」，說得出來＝前搖成立。
- 打擊感：手部動作、表情，有沒有「爽」的出聲反應。
- 會不會讀裝備說明，還是直接比數字或乾脆忽略。
- 特效、數字、掉落光柱有沒有蓋掉前搖。
