// 虛擬時鐘（注入頁面的 init script）：接管 performance.now、Date、requestAnimationFrame、計時器、
// CSS／Web Animations、Math.random、AudioContext，讓錄影端一幀一幀推進時間。
// 錄得再慢，畫面上的時間照樣是均勻的 1/fps 秒一格，不會掉幀；同一組輸入錄兩次，像素一樣。
//
// 由 capture.mjs 用 page.addInitScript 注入，在頁面任何腳本之前跑。頁面上留下 window.__vt：
//   __vt.advance(ms)   推進時間：先跑到期的計時器，再跑一輪 rAF，最後把 CSS 動畫對到新時間
//   __vt.now           目前的虛擬時間（毫秒，從頁面載入起算）
//   __vt.audioContext()  頁面裡唯一的（離線）AudioContext
//   __vt.audio(a, b)   把整段 WebAudio 離線算完，回傳 a～b 毫秒的 { rate, channels, b64 }（16-bit PCM）
(() => {
  let now = 0;
  const EPOCH = 1767225600000; // 2026-01-01，Date.now() 從這裡起跳

  // ---- 時間 ----
  performance.now = () => now;
  const RealDate = Date;
  class VDate extends RealDate {
    constructor(...args) {
      if (args.length === 0) super(EPOCH + now);
      else super(...args);
    }
    static now() {
      return EPOCH + now;
    }
  }
  window.Date = VDate;

  // ---- 計時器 ----
  let seq = 0;
  const timers = new Map();
  const addTimer = (fn, ms, args, every) => {
    const id = ++seq;
    timers.set(id, { fn, at: now + Math.max(0, Number(ms) || 0), args, every: every ? Math.max(1, Number(ms) || 0) : 0, seq: id });
    return id;
  };
  window.setTimeout = (fn, ms, ...args) => addTimer(fn, ms, args, false);
  window.setInterval = (fn, ms, ...args) => addTimer(fn, ms, args, true);
  window.clearTimeout = window.clearInterval = (id) => timers.delete(id);

  const rafs = new Map();
  window.requestAnimationFrame = (cb) => {
    const id = ++seq;
    rafs.set(id, cb);
    return id;
  };
  window.cancelAnimationFrame = (id) => rafs.delete(id);

  // ---- 亂數：固定種子（特效的粒子、鏡頭震動才會每次一樣） ----
  let s = 0x9e3779b9;
  Math.random = () => {
    s |= 0;
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  // ---- 音訊：所有 AudioContext 換成同一個離線的，currentTime 跟著虛擬時鐘走 ----
  const RATE = 48000;
  const MAX_SEC = 180;
  let vac = null;
  const Offline = window.OfflineAudioContext;
  if (Offline) {
    // 頁面裡 new 幾次都是同一個（遊戲音效與導演頁的配樂要混在同一條時間軸上）。
    // destination 換成一條匯流排（導演頁拿來調遊戲音效的音量），真正的出口是 realDestination。
    class VirtualAudioContext extends Offline {
      constructor() {
        if (vac) return vac;
        super(2, RATE * MAX_SEC, RATE);
        vac = this;
        this.__bus = super.createGain();
        this.__bus.connect(super.destination);
      }
      get destination() {
        return this.__bus;
      }
      get realDestination() {
        return super.destination;
      }
      get currentTime() {
        return now / 1000;
      }
      get state() {
        return 'running';
      }
      resume() {
        return Promise.resolve();
      }
      suspend() {
        return Promise.resolve();
      }
      close() {
        return Promise.resolve();
      }
    }
    window.AudioContext = VirtualAudioContext;
    window.webkitAudioContext = VirtualAudioContext;
  }

  // ---- CSS 動畫與轉場：第一次看到就記下虛擬起點、暫停，之後每幀照虛擬時間定位 ----
  const born = new WeakMap();
  function syncAnimations() {
    if (!document.getAnimations) return;
    for (const a of document.getAnimations()) {
      if (!born.has(a)) {
        born.set(a, now - (a.currentTime ?? 0));
        a.pause();
      }
      a.currentTime = now - born.get(a);
    }
  }

  window.__vt = {
    get now() {
      return now;
    },
    advance(ms) {
      const end = now + ms;
      // 到期的計時器照時間順序跑（計時器裡再排的也算）
      for (;;) {
        let next = null;
        for (const t of timers.values()) if (t.at <= end && (!next || t.at < next.at || (t.at === next.at && t.seq < next.seq))) next = t;
        if (!next) break;
        now = Math.max(now, next.at);
        if (next.every) next.at += next.every;
        else timers.delete(next.seq);
        try {
          typeof next.fn === 'function' ? next.fn(...next.args) : 0;
        } catch (e) {
          setTimeoutError(e);
        }
      }
      now = end;
      const cbs = [...rafs.values()];
      rafs.clear();
      for (const cb of cbs) {
        try {
          cb(now);
        } catch (e) {
          setTimeoutError(e);
        }
      }
      syncAnimations();
    },
    audioContext() {
      return vac;
    },
    async audio(fromMs = 0, toMs = now) {
      if (!vac) return null;
      const buf = await vac.startRendering();
      const a = Math.floor((fromMs / 1000) * RATE);
      const b = Math.min(buf.length, Math.ceil((toMs / 1000) * RATE));
      const ch = [buf.getChannelData(0), buf.getChannelData(1)];
      const pcm = new Int16Array((b - a) * 2);
      for (let i = a, j = 0; i < b; i++) {
        for (const c of ch) pcm[j++] = Math.max(-32768, Math.min(32767, Math.round(c[i] * 32767)));
      }
      const bytes = new Uint8Array(pcm.buffer);
      let bin = '';
      for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000));
      return { rate: RATE, channels: 2, b64: btoa(bin) };
    },
  };
  // 回呼裡丟出的錯誤照樣讓錄影端的 pageerror 收到，不要吞掉
  function setTimeoutError(e) {
    queueMicrotask(() => {
      throw e;
    });
  }
})();
