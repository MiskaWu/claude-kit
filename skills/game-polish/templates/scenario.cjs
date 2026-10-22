// 情境範本：固定一個情境，截事件發生那一刻與之後，桌機與手機各一組。
// 用確定性的輸入（一直按住某個鍵、固定種子），每次都截到同一個狀態，前後輪才比得出差別。
// 例子：一直按住空白鍵 → 失控摔毀，截慢動作中、0.7 秒後、結算；印出桌機與手機的評價與慘烈度（要一樣）。
//
//   node scenario.cjs <網址或 Artifact 的 html 檔> <輸出資料夾> [名字]
const { launch, open, shooter, wrapArtifact, report } = require('./_pw.cjs');

const [target, out = '/tmp/scenario', name = 'crash'] = process.argv.slice(2);
const url = /^https?:/.test(target) ? target : wrapArtifact(target);

(async () => {
  const browser = await launch();
  const errors = [];
  const shot = shooter(out, name);
  for (const view of ['d', 'm']) {
    const { ctx, page } = await open(browser, view, 'zh-TW', url, errors);
    // TODO：開局
    // await page.click('#start');
    // TODO：固定的輸入。桌機用鍵盤；手機對觸控鈕送 pointerdown（不放開＝按住）
    // if (view === 'd') await page.keyboard.down('Space');
    // else await page.locator('[data-device=grip]').dispatchEvent('pointerdown', { pointerId: 9, bubbles: true });
    // TODO：等到事件那一刻（讀畫面上的狀態，不要用固定秒數）
    // await page.waitForFunction(() => document.getElementById('phase').textContent === '落地', null, { timeout: 30000 });
    await shot(page, view, 'zh-TW', '1-moment', 250);
    await shot(page, view, 'zh-TW', '2-after', 700);
    // TODO：結算，印出關鍵數字（桌機與手機要相同）
    // await page.waitForSelector('#result:not([hidden])'); await shot(page, view, 'zh-TW', '3-result', 900);
    // console.log(view, await page.textContent('#r-grade'));
    await ctx.close();
  }
  await browser.close();
  report(errors);
})();
