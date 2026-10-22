// 照分鏡輸出短片：無頭瀏覽器開導演頁（src/video/director.ts）、虛擬時鐘一幀一幀推、每幀截圖送進 ffmpeg，
// 另開一頁不截圖、只跑聲音（遊戲音效＋配樂在同一個離線 AudioContext），最後合成、響度標準化。
//
//   npm run build:video                                   先打包導演頁（dist-video/director/）
//   node scripts/video/render.mjs <分鏡.json…> [--locale zh-Hant,en] [--out dist-video] [--jobs 6] [--fps 60]
//   例：PLAYWRIGHT=… CHROME=… node scripts/video/render.mjs scripts/video/boards/*.json
//
// 一支片切成 --jobs 段平行截（每段先從頭跑到自己的起點、不截圖，結果確定所以接得起來）。
// 輸出 <out>/<分鏡 id>-<語系>.mp4（1080×1920、H.264 High、AAC 48k、-14 LUFS）、同名 -sheet.png（每秒一格的接觸表）、同名 .json。
// Playwright 不進相依套件：PLAYWRIGHT 指到 playwright-core、CHROME 指到瀏覽器（見 ../tour/_pw.cjs）。
import { spawn } from 'node:child_process';
import { createReadStream, existsSync, mkdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs';
import http from 'node:http';
import { createRequire } from 'node:module';
import os from 'node:os';
import path from 'node:path';

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT ?? 'playwright-core');

const WEB = new URL('../..', import.meta.url).pathname;
const SITE = path.join(WEB, 'dist-video/director');
const VCLOCK = readFileSync(new URL('./vclock.js', import.meta.url), 'utf8');
/** 540×960 的 CSS 像素、2 倍像素比 → 1080×1920。版面照手機直放 */
const VIEW = { viewport: { width: 540, height: 960 }, deviceScaleFactor: 2, hasTouch: true, isMobile: true };

const args = process.argv.slice(2);
const opt = (name, dflt) => {
  const i = args.indexOf(`--${name}`);
  if (i < 0) return dflt;
  const v = args[i + 1];
  args.splice(i, 2);
  return v;
};
const locales = opt('locale', '');
const outDir = path.resolve(opt('out', path.join(WEB, 'dist-video')));
const jobs = Math.max(1, Number(opt('jobs', String(Math.min(6, Math.max(1, os.cpus().length >> 1))))));
const outFps = Number(opt('fps', '60'));
const boards = args;
if (!boards.length) {
  console.error('用法：render.mjs <分鏡.json…> [--locale zh-Hant,en] [--out dist-video] [--jobs 6] [--fps 60|30]');
  process.exit(2);
}
if (!existsSync(path.join(SITE, 'video.html'))) {
  console.error('找不到導演頁：先跑 npm run build:video');
  process.exit(2);
}
mkdirSync(outDir, { recursive: true });

// ---- 靜態伺服器（導演頁用 ES module，file:// 載不進來） ----
const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.wasm': 'application/wasm' };
const server = http.createServer((req, res) => {
  const p = path.join(SITE, decodeURIComponent(new URL(req.url, 'http://x').pathname));
  if (!p.startsWith(SITE) || !existsSync(p) || statSync(p).isDirectory()) {
    res.writeHead(404).end();
    return;
  }
  res.writeHead(200, { 'content-type': TYPES[path.extname(p)] ?? 'application/octet-stream' });
  createReadStream(p).pipe(res);
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const URL_ = `http://127.0.0.1:${server.address().port}/video.html`;

const run = (cmd, argv, input) =>
  new Promise((res, rej) => {
    const p = spawn(cmd, argv, { stdio: [input ? 'pipe' : 'ignore', 'pipe', 'pipe'] });
    let err = '';
    p.stderr.on('data', (d) => (err += d));
    p.on('close', (c) => (c === 0 ? res() : rej(new Error(`${cmd} 結束碼 ${c}：${err.slice(-800)}`))));
    if (input) input(p.stdin);
  });

async function openDirector(browser, board, locale) {
  const ctx = await browser.newContext({ ...VIEW, locale });
  await ctx.addInitScript(VCLOCK);
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => m.type() === 'error' && errors.push(`console: ${m.text()}`));
  await page.goto(URL_);
  await page.waitForFunction(() => window.director !== undefined);
  await page.evaluate(() => document.fonts.ready);
  // 字型是外部載入的：先在每種字重、語系上量一次字，確定都下載好了
  await page.evaluate(async () => {
    const fams = ['900 40px "Noto Sans TC"', '900 40px "Noto Sans SC"', '900 40px "Noto Sans JP"', '800 40px Inter', '800 40px "JetBrains Mono"', '700 40px "Noto Sans TC"'];
    await Promise.all(fams.map((f) => document.fonts.load(f, '慘烈度摔爛のABC123')));
  });
  const info = await page.evaluate(([b, l]) => window.director.load(b, l), [board, locale]);
  return { ctx, page, info, errors };
}

const DT = 1000 / 60 + 1e-7;

/** 截 [from, to) 這幾幀（之前的幀照樣跑、不截），寫成一段中間檔 */
async function renderChunk(browser, board, locale, from, to, file) {
  const { ctx, page, errors } = await openDirector(browser, board, locale);
  await page.evaluate(
    ([n, dt]) => {
      for (let f = 0; f < n; f++) {
        __vt.advance(dt);
        window.director.render(f);
      }
    },
    [from, DT],
  );
  const cdp = await ctx.newCDPSession(page);
  const clip = { x: 0, y: 0, width: VIEW.viewport.width, height: VIEW.viewport.height, scale: VIEW.deviceScaleFactor };
  await run(
    'ffmpeg',
    ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', '60', '-c:v', 'png', '-i', '-',
      '-vf', 'scale=out_color_matrix=bt709:out_range=tv,format=yuv420p', '-c:v', 'libx264', '-preset', 'fast', '-crf', '8',
      '-colorspace', 'bt709', '-color_primaries', 'bt709', '-color_trc', 'bt709', file],
    async (stdin) => {
      for (let f = from; f < to; f++) {
        await page.evaluate(([f, dt]) => (__vt.advance(dt), window.director.render(f)), [f, DT]);
        const { data } = await cdp.send('Page.captureScreenshot', { format: 'png', optimizeForSpeed: true, clip });
        if (!stdin.write(Buffer.from(data, 'base64'))) await new Promise((r) => stdin.once('drain', r));
      }
      stdin.end();
    },
  );
  await ctx.close();
  return errors;
}

/** 不截圖、整支跑一遍，把聲音算出來 */
async function renderAudio(browser, board, locale, frames, file) {
  const { ctx, page, errors } = await openDirector(browser, board, locale);
  const a = await page.evaluate(
    async ([n, dt]) => {
      for (let f = 0; f < n; f++) {
        __vt.advance(dt);
        window.director.render(f);
      }
      const start = window.director.audioStart();
      return __vt.audio(start, start + (n * 1000) / 60);
    },
    [frames, DT],
  );
  await ctx.close();
  const pcm = Buffer.from(a.b64, 'base64');
  const h = Buffer.alloc(44);
  h.write('RIFF', 0);
  h.writeUInt32LE(36 + pcm.length, 4);
  h.write('WAVEfmt ', 8);
  h.writeUInt32LE(16, 16);
  h.writeUInt16LE(1, 20);
  h.writeUInt16LE(a.channels, 22);
  h.writeUInt32LE(a.rate, 24);
  h.writeUInt32LE(a.rate * a.channels * 2, 28);
  h.writeUInt16LE(a.channels * 2, 32);
  h.writeUInt16LE(16, 34);
  h.write('data', 36);
  h.writeUInt32LE(pcm.length, 40);
  writeFileSync(file, Buffer.concat([h, pcm]));
  return errors;
}

function measureLoudness(file) {
  return new Promise((res, rej) => {
    const p = spawn('ffmpeg', ['-hide_banner', '-i', file, '-af', 'loudnorm=I=-14:TP=-1.5:LRA=11:print_format=json', '-f', 'null', '-']);
    let err = '';
    p.stderr.on('data', (d) => (err += d));
    p.on('close', (c) => {
      const m = err.match(/\{[^{}]*"input_i"[^{}]*\}/);
      if (c !== 0 || !m) rej(new Error(`量不到響度：${err.slice(-400)}`));
      else res(JSON.parse(m[0]));
    });
  });
}

const launch = () => chromium.launch(process.env.CHROME ? { executablePath: process.env.CHROME.replace(/^~/, os.homedir()) } : {});

let failed = 0;
for (const boardFile of boards) {
  const board = JSON.parse(readFileSync(boardFile, 'utf8'));
  for (const locale of (locales || board.locale || 'zh-Hant').split(',')) {
    const name = `${board.id}-${locale}`;
    try {
    const tmp = path.join(outDir, `.tmp-${name}`);
    rmSync(tmp, { recursive: true, force: true });
    mkdirSync(tmp, { recursive: true });
    const started = Date.now();
    // 一段一個瀏覽器：同一個瀏覽器裡的分頁共用一條合成管線，截圖會互相排隊
    const probe = await launch();
    const { ctx, info, errors: loadErrors } = await openDirector(probe, board, locale);
    await ctx.close();
    await probe.close();
    const frames = info.frames;
    const n = Math.min(jobs, Math.max(1, Math.floor(frames / 120)));
    const cuts = Array.from({ length: n + 1 }, (_, i) => Math.round((frames * i) / n));
    const browsers = await Promise.all(Array.from({ length: n + 1 }, launch));
    const results = await Promise.all([
      ...cuts.slice(0, -1).map((from, i) => renderChunk(browsers[i], board, locale, from, cuts[i + 1], path.join(tmp, `part${i}.mp4`))),
      renderAudio(browsers[n], board, locale, frames, path.join(tmp, 'audio.wav')),
    ]);
    await Promise.all(browsers.map((b) => b.close()));
    const errors = [...loadErrors, ...results.flat()];

    // 響度兩段式：先量、再照量到的值線性校正到 -14 LUFS（單段的動態模式會差好幾 dB）
    const loud = await measureLoudness(path.join(tmp, 'audio.wav'));
    const af = `loudnorm=I=-14:TP=-1.5:LRA=11:measured_I=${loud.input_i}:measured_TP=${loud.input_tp}:measured_LRA=${loud.input_lra}:measured_thresh=${loud.input_thresh}:offset=${loud.target_offset}:linear=true,aresample=48000`;
    writeFileSync(path.join(tmp, 'parts.txt'), cuts.slice(0, -1).map((_, i) => `file 'part${i}.mp4'`).join('\n') + '\n');
    const out = path.join(outDir, `${name}.mp4`);
    const vf = outFps === 60 ? 'null' : `fps=${outFps}`;
    await run('ffmpeg', [
      '-y', '-loglevel', 'error', '-f', 'concat', '-safe', '0', '-i', path.join(tmp, 'parts.txt'), '-i', path.join(tmp, 'audio.wav'),
      '-vf', vf, '-af', af,
      '-c:v', 'libx264', '-profile:v', 'high', '-preset', 'slow', '-crf', '18', '-maxrate', '16M', '-bufsize', '32M', '-pix_fmt', 'yuv420p',
      '-g', String(outFps / 2), '-bf', '2', '-colorspace', 'bt709', '-color_primaries', 'bt709', '-color_trc', 'bt709',
      '-c:a', 'aac', '-b:a', '192k', '-ar', '48000', '-shortest', '-movflags', '+faststart', out,
    ]);
    // 接觸表：每秒一格
    await run('ffmpeg', ['-y', '-loglevel', 'error', '-i', out, '-vf', `fps=1,scale=216:-1,tile=${Math.min(10, Math.ceil(info.duration))}x${Math.ceil(info.duration / 10)}:padding=4`, '-frames:v', '1', path.join(outDir, `${name}-sheet.png`)]);
    rmSync(tmp, { recursive: true, force: true });
    writeFileSync(path.join(outDir, `${name}.json`), JSON.stringify({ board: board.id, locale, ...info, errors }, null, 2));
    const secs = ((Date.now() - started) / 1000).toFixed(0);
    console.log(`${errors.length ? '✗' : '✓'} ${name}.mp4：${info.duration.toFixed(1)} 秒、${frames} 幀、${n} 段平行、花了 ${secs} 秒${errors.length ? `；頁面錯誤：${errors.join(' | ')}` : ''}`);
    for (const [k, t] of Object.entries(info.takes)) console.log(`    ${k}：${t.grade}／${t.crash}，分數 ${t.score}、慘烈度 ${t.carnage}`);
    if (errors.length) failed++;
    } catch (e) {
      failed++;
      console.error(`✗ ${name}：${e.message.split('\n')[0]}`);
    }
  }
}
server.close();
process.exit(failed ? 1 : 0);
