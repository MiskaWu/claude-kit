// 巡覽範本共用的部分：啟動瀏覽器、三種尺寸、收頁面錯誤、照輪次命名截圖、把 Artifact 單檔版包成平台上的樣子。
// 複製到專案時連同這支一起複製（例如 web/scripts/）。
//
// Playwright 不進專案的相依套件，用環境變數指到現成的那一份：
//   PLAYWRIGHT  playwright 或 playwright-core 套件的路徑（沒給就 require('playwright-core')）
//   CHROME      瀏覽器執行檔（沒給就用套件自己的）。本機現成的：
//               ~/.cache/ms-playwright/chromium_headless_shell-1234/chrome-headless-shell-linux64/chrome-headless-shell
// 例：npm i --prefix <scratchpad> playwright-core，PLAYWRIGHT=<scratchpad>/node_modules/playwright-core CHROME=…
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { chromium } = require(process.env.PLAYWRIGHT ?? 'playwright-core');

/** 手機直放、手機橫放、桌機。 */
const VIEWS = {
  m: { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, hasTouch: true, isMobile: true },
  l: { viewport: { width: 844, height: 390 }, deviceScaleFactor: 2, hasTouch: true, isMobile: true },
  d: { viewport: { width: 1280, height: 720 }, deviceScaleFactor: 1 },
};

function launch() {
  return chromium.launch(process.env.CHROME ? { executablePath: process.env.CHROME.replace(/^~/, os.homedir()) } : {});
}

/** 開一個 context＋頁面：**一定要設 locale**（無頭瀏覽器預設英文），收 pageerror 與 console.error 進 errors。 */
async function open(browser, view, locale, url, errors) {
  const ctx = await browser.newContext({ ...VIEWS[view], locale });
  const page = await ctx.newPage();
  const tag = `${view} ${locale}`;
  page.on('pageerror', (e) => errors.push(`[${tag}] ${e.message}`));
  page.on('console', (m) => m.type() === 'error' && errors.push(`[${tag}] console: ${m.text()}`));
  await page.goto(url);
  return { ctx, page };
}

/** 截圖命名：<輪次>-<尺寸>-<語系>-<名字>.png，前後輪才比得出差別。截之前等 CSS 動畫跑完一點。 */
function shooter(outDir, round) {
  fs.mkdirSync(outDir, { recursive: true });
  return async (page, view, locale, name, settleMs = 400) => {
    await page.waitForTimeout(settleMs);
    await page.screenshot({ path: path.join(outDir, `${round}-${view}-${locale}-${name}.png`) });
  };
}

/** 把 Artifact 單檔版包上平台發佈時會加的外框，回傳可以用 file:// 開的網址（畫面才跟線上一致）。 */
function wrapArtifact(htmlFile) {
  let html = fs.readFileSync(htmlFile, 'utf8');
  if (!/^\s*<!doctype/i.test(html)) {
    html =
      '<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">' +
      '<style>[hidden]{display:none!important}</style></head><body>' +
      html +
      '</body></html>';
  }
  const out = path.join(os.tmpdir(), `artifact-${process.pid}.html`);
  fs.writeFileSync(out, html);
  return 'file://' + out;
}

/** 一輪跑完的報告：沒有錯誤也要明講。 */
function report(errors) {
  console.log(errors.length ? `頁面錯誤 ${errors.length}：\n${errors.join('\n')}` : '沒有頁面錯誤');
}

module.exports = { VIEWS, launch, open, shooter, wrapArtifact, report };
