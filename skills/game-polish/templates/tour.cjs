// 巡覽範本：每個畫面走一遍、逐張截圖、收頁面錯誤。每一輪跑同一份，截圖照輪次存（r0、r1……）。
//
//   node tour.cjs <網址或 Artifact 的 html 檔> <輸出資料夾> [輪次] [--locales]
//
// 標 TODO 的地方換成這個遊戲的選擇器與步驟。原則：
// - 點按鈕用 getByRole('button', { name }) 或穩定的 class／id；**點不到（逾時）本身就是 bug 訊號**。
// - 點完按鈕再按一次遊戲鍵，確認遊戲真的收到（焦點可能還留在按鈕上）。
// - 要一局打完就讓自動玩家玩：讀除錯模式的提示或核心的答案；用真實時間玩的結果每次會差一點，比數字用核心的自動玩家。
const { launch, open, shooter, wrapArtifact, report } = require('./_pw.cjs');

const [target, out = '/tmp/tour', round = 'r0'] = process.argv.slice(2).filter((a) => !a.startsWith('--'));
const url = /^https?:/.test(target) ? target : wrapArtifact(target);
// TODO：這個遊戲的語系（無頭瀏覽器預設英文，一定要設）
const LOCALES = process.argv.includes('--locales') ? ['zh-TW', 'zh-CN', 'ja', 'en'] : ['zh-TW'];
const VIEWS = ['m', 'l', 'd'];

(async () => {
  const browser = await launch();
  const errors = [];
  const shot = shooter(out, round);
  for (const locale of LOCALES) {
    for (const view of VIEWS) {
      const { ctx, page } = await open(browser, view, locale, url, errors);
      const s = (name, ms) => shot(page, view, locale, name, ms);
      await s('01-title', 1200);

      // TODO：選單／設定
      // await page.locator('.menu-button').click(); await s('02-menu'); await page.keyboard.press('Escape');

      // TODO：教學或規則說明的第一張
      // await page.getByRole('button', { name: /教學|Tutorial/ }).click(); await s('03-tutorial');

      // TODO：開一局，截開場、遊戲中幾個代表時刻（段落切換、連續成功、關鍵事件、最後幾秒）
      // await page.getByRole('button', { name: /開始|Start/ }).click(); await s('04-start', 3500);
      // for (let n = 0; n < 40; n++) { await page.waitForTimeout(400); await page.keyboard.press('ArrowRight'); if (n === 20) await s('05-mid'); }

      // TODO：結算演出（途中、高潮那一刻）與結算詳情
      // await page.locator('.next').waitFor({ timeout: 30000 }); await s('06-result');

      await ctx.close();
    }
  }
  await browser.close();
  report(errors);
})();
