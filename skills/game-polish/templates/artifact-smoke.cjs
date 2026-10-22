// 單檔版（claude.ai Artifact）的煙霧測試：發佈前確認開得起來、沒有頁面錯誤、主要按鈕都在。
// 會先包上平台發佈時會加的外框再用 file:// 開。對外 fetch 在 Artifact 裡會被 CSP 擋：拿不到要安靜退回，這裡就看得到有沒有報錯。
//
//   node artifact-smoke.cjs <html 檔> <輸出資料夾>
const { launch, open, shooter, wrapArtifact, report } = require('./_pw.cjs');

const [file, out = '/tmp/smoke'] = process.argv.slice(2);

(async () => {
  const browser = await launch();
  const errors = [];
  const shot = shooter(out, 'smoke');
  const { page } = await open(browser, 'm', 'zh-TW', wrapArtifact(file), errors);
  await shot(page, 'm', 'zh-TW', 'title', 1000);
  const buttons = await page.$$eval('button', (bs) => bs.map((b) => b.textContent.trim()).filter(Boolean).slice(0, 12));
  console.log('按鈕：', JSON.stringify(buttons));
  // TODO：點開始、玩幾下，確認遊戲真的動起來（例如計時器在跑、出現第一個物件）
  await browser.close();
  report(errors);
})();
