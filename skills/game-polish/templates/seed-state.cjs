// 存檔狀態範本：載入前先塞好 localStorage（例如舊版的存檔、已經玩過的玩家、關掉音效），固定成某個狀態再截圖。
// 用 sessionStorage 的旗標只塞一次：頁面自己重新整理（或換語系重載）時不會又被蓋回去。
// 例：驗證改名前的存檔（外觀、暱稱、靜音）搬家後還在；或塞「教學已完成」看第二次來的首頁。
//
//   node seed-state.cjs <網址或 Artifact 的 html 檔> <輸出資料夾>
const { launch, shooter, wrapArtifact, report } = require('./_pw.cjs');

const [target, out = '/tmp/seed'] = process.argv.slice(2);
const url = /^https?:/.test(target) ? target : wrapArtifact(target);

// TODO：要塞的存檔（鍵名照遊戲的）
const STATE = {
  // 'qm-trained': '1',
  // 'qm-sound': 'off',
};

(async () => {
  const browser = await launch();
  const errors = [];
  const shot = shooter(out, 'seed');
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, locale: 'zh-TW' });
  await ctx.addInitScript((state) => {
    if (sessionStorage.getItem('__seeded')) return;
    sessionStorage.setItem('__seeded', '1');
    localStorage.clear();
    for (const [k, v] of Object.entries(state)) localStorage.setItem(k, v);
  }, STATE);
  const page = await ctx.newPage();
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto(url);
  const keys = await page.evaluate(() => Object.fromEntries(Object.keys(localStorage).sort().map((k) => [k, localStorage.getItem(k).slice(0, 40)])));
  console.log('localStorage：', JSON.stringify(keys));
  await shot(page, 'm', 'zh-TW', 'title', 1000);
  await browser.close();
  report(errors);
})();
