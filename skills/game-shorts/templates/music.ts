// 配樂與剪輯音效：全部用 WebAudio 合成（不用音檔，沒有授權問題），照分鏡的 BPM 與段落一次排進離線的 AudioContext。
// 遊戲自己的音效（lib/game/audio.ts）跑在同一個 context 上，所以混音、對齊都在同一條時間軸，不用事後對時。
// 和聲走 A 小調 vi–IV–I–V（Am–F–C–G），一小節一個和弦；段落：intro（帽＋墊）、groove（四拍底鼓、拍手、貝斯）、
// drop（再加琶音與開帽）、break（只剩墊、尾巴接 riser）、stop（全停，留給撞擊）、outro（墊＋最後一擊）。
import type { MusicPart, SfxKind } from './board';

const PROGRESSION = [
  { root: 45, chord: [57, 60, 64] }, // Am
  { root: 41, chord: [53, 57, 60] }, // F
  { root: 48, chord: [55, 60, 64] }, // C
  { root: 43, chord: [55, 59, 62] }, // G
];
const hz = (midi: number) => 440 * Math.pow(2, (midi - 69) / 12);

export interface MusicPlan {
  bpm: number;
  /** 段落（秒，相對影片開頭），照時間排好 */
  parts: { at: number; part: MusicPart }[];
  /** 剪輯音效（秒，相對影片開頭） */
  sfx: { at: number; kind: SfxKind }[];
  /** 影片總長（秒） */
  length: number;
}

export function scheduleMusic(ctx: BaseAudioContext, out: AudioNode, t0: number, plan: MusicPlan, volume: number) {
  const noise = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
  {
    const d = noise.getChannelData(0);
    // 固定種子的雜訊：同一份分鏡每次輸出的聲音都一樣
    let s = 12345;
    for (let i = 0; i < d.length; i++) {
      s = (s * 1103515245 + 12345) >>> 0;
      d[i] = (s / 4294967296) * 2 - 1;
    }
  }
  const bus = ctx.createGain();
  bus.gain.value = volume;
  const comp = ctx.createDynamicsCompressor();
  comp.threshold.value = -16;
  comp.ratio.value = 4;
  comp.attack.value = 0.005;
  comp.release.value = 0.15;
  bus.connect(comp).connect(out);
  // 簡單的殘響：衰減的雜訊當脈衝響應
  const verb = ctx.createConvolver();
  {
    const len = Math.floor(ctx.sampleRate * 1.6);
    const ir = ctx.createBuffer(2, len, ctx.sampleRate);
    for (let c = 0; c < 2; c++) {
      const d = ir.getChannelData(c);
      let s = 777 + c;
      for (let i = 0; i < len; i++) {
        s = (s * 1103515245 + 12345) >>> 0;
        d[i] = ((s / 4294967296) * 2 - 1) * Math.pow(1 - i / len, 3);
      }
    }
    verb.buffer = ir;
  }
  const wet = ctx.createGain();
  wet.gain.value = 0.22;
  verb.connect(wet).connect(bus);

  const env = (g: GainNode, t: number, peak: number, attack: number, decay: number) => {
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(peak, t + attack);
    g.gain.exponentialRampToValueAtTime(0.0001, t + attack + decay);
  };
  const noiseSrc = (t: number, dur: number) => {
    const src = ctx.createBufferSource();
    src.buffer = noise;
    src.loop = true;
    src.start(t, (t * 7.3) % 1.5);
    src.stop(t + dur + 0.05);
    return src;
  };
  const tone = (type: OscillatorType, f: number, t: number, dur: number) => {
    const o = ctx.createOscillator();
    o.type = type;
    o.frequency.setValueAtTime(f, t);
    o.start(t);
    o.stop(t + dur + 0.05);
    return o;
  };

  // ---- 鼓組 ----
  const kick = (t: number, v = 1) => {
    const o = tone('sine', 150, t, 0.4);
    o.frequency.exponentialRampToValueAtTime(42, t + 0.12);
    const g = ctx.createGain();
    env(g, t, 0.9 * v, 0.003, 0.35);
    o.connect(g).connect(bus);
  };
  const clap = (t: number, v = 1) => {
    const f = ctx.createBiquadFilter();
    f.type = 'bandpass';
    f.frequency.value = 1700;
    f.Q.value = 0.9;
    const g = ctx.createGain();
    env(g, t, 0.5 * v, 0.002, 0.16);
    noiseSrc(t, 0.25).connect(f).connect(g);
    g.connect(bus);
    g.connect(verb);
  };
  const hat = (t: number, open: boolean, v = 1) => {
    const f = ctx.createBiquadFilter();
    f.type = 'highpass';
    f.frequency.value = 7500;
    const g = ctx.createGain();
    env(g, t, (open ? 0.16 : 0.12) * v, 0.001, open ? 0.22 : 0.04);
    noiseSrc(t, open ? 0.3 : 0.08).connect(f).connect(g).connect(bus);
  };

  // ---- 音高的聲部 ----
  const bass = (t: number, midi: number, dur: number) => {
    const o = tone('sawtooth', hz(midi), t, dur);
    const f = ctx.createBiquadFilter();
    f.type = 'lowpass';
    f.frequency.setValueAtTime(900, t);
    f.frequency.exponentialRampToValueAtTime(180, t + dur);
    const g = ctx.createGain();
    env(g, t, 0.32, 0.005, dur);
    o.connect(f).connect(g).connect(bus);
  };
  const pad = (t: number, notes: number[], dur: number, v = 1) => {
    for (const n of notes) {
      for (const detune of [-7, 7]) {
        const o = tone('sawtooth', hz(n), t, dur + 0.6);
        o.detune.value = detune;
        const f = ctx.createBiquadFilter();
        f.type = 'lowpass';
        f.frequency.value = 1300;
        const g = ctx.createGain();
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(0.035 * v, t + 0.25);
        g.gain.setValueAtTime(0.035 * v, t + dur);
        g.gain.exponentialRampToValueAtTime(0.0001, t + dur + 0.6);
        o.connect(f).connect(g);
        g.connect(bus);
        g.connect(verb);
      }
    }
  };
  const pluck = (t: number, midi: number, v = 1) => {
    const o = tone('square', hz(midi), t, 0.25);
    const f = ctx.createBiquadFilter();
    f.type = 'lowpass';
    f.frequency.setValueAtTime(4200, t);
    f.frequency.exponentialRampToValueAtTime(600, t + 0.2);
    const g = ctx.createGain();
    env(g, t, 0.075 * v, 0.002, 0.2);
    o.connect(f).connect(g);
    g.connect(bus);
    g.connect(verb);
  };

  // ---- 剪輯音效 ----
  const FX: Record<SfxKind, (t: number) => void> = {
    impact(t) {
      const o = tone('sine', 80, t, 1.4);
      o.frequency.exponentialRampToValueAtTime(26, t + 0.9);
      const g = ctx.createGain();
      env(g, t, 1.0, 0.004, 1.3);
      o.connect(g).connect(bus);
      const f = ctx.createBiquadFilter();
      f.type = 'lowpass';
      f.frequency.setValueAtTime(3200, t);
      f.frequency.exponentialRampToValueAtTime(150, t + 0.7);
      const g2 = ctx.createGain();
      env(g2, t, 0.7, 0.002, 0.8);
      noiseSrc(t, 1).connect(f).connect(g2);
      g2.connect(bus);
      g2.connect(verb);
      FX.crash(t);
    },
    crash(t) {
      const f = ctx.createBiquadFilter();
      f.type = 'highpass';
      f.frequency.value = 4500;
      const g = ctx.createGain();
      env(g, t, 0.22, 0.002, 1.6);
      noiseSrc(t, 1.8).connect(f).connect(g);
      g.connect(bus);
      g.connect(verb);
    },
    whoosh(t) {
      const f = ctx.createBiquadFilter();
      f.type = 'bandpass';
      f.Q.value = 1.4;
      f.frequency.setValueAtTime(300, t);
      f.frequency.exponentialRampToValueAtTime(2600, t + 0.18);
      f.frequency.exponentialRampToValueAtTime(500, t + 0.4);
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.45, t + 0.16);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.42);
      noiseSrc(t, 0.45).connect(f).connect(g).connect(bus);
    },
    riser(t) {
      // 從 t 往前兩拍爬升，t 剛好到頂
      const dur = (2 * 60) / plan.bpm;
      const s = Math.max(0, t - dur);
      const f = ctx.createBiquadFilter();
      f.type = 'bandpass';
      f.Q.value = 2;
      f.frequency.setValueAtTime(400, s);
      f.frequency.exponentialRampToValueAtTime(7000, t);
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.0001, s);
      g.gain.exponentialRampToValueAtTime(0.35, t);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.05);
      noiseSrc(s, t - s + 0.1).connect(f).connect(g).connect(bus);
    },
    tick(t) {
      const o = tone('square', 1900, t, 0.03);
      const g = ctx.createGain();
      env(g, t, 0.08, 0.001, 0.03);
      o.connect(g).connect(bus);
    },
    stop(t) {
      // 唱盤煞車：音高往下掉
      const o = tone('sawtooth', 420, t, 0.5);
      o.frequency.exponentialRampToValueAtTime(35, t + 0.45);
      const f = ctx.createBiquadFilter();
      f.type = 'lowpass';
      f.frequency.value = 1800;
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.18, t);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.48);
      o.connect(f).connect(g).connect(bus);
    },
    rewind(t) {
      const f = ctx.createBiquadFilter();
      f.type = 'bandpass';
      f.Q.value = 3;
      f.frequency.setValueAtTime(3500, t);
      f.frequency.exponentialRampToValueAtTime(250, t + 0.5);
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.4, t + 0.05);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.55);
      noiseSrc(t, 0.6).connect(f).connect(g).connect(bus);
    },
  };

  // ---- 排段落：以 16 分音符為格，從影片開頭算第幾格（和弦進行跨段落連續） ----
  const step = 60 / plan.bpm / 4;
  const parts = [...plan.parts].sort((a, b) => a.at - b.at);
  for (let i = 0; i < parts.length; i++) {
    const { at, part } = parts[i]!;
    const end = Math.min(plan.length, parts[i + 1]?.at ?? plan.length);
    for (let n = Math.ceil(at / step - 1e-6); n * step < end - 1e-6; n++) {
      const t = t0 + n * step;
      const s16 = n % 16;
      const bar = PROGRESSION[Math.floor(n / 16) % PROGRESSION.length]!;
      const barStart = s16 === 0;
      const barLeft = Math.min(16, Math.round((end - n * step) / step));
      switch (part) {
        case 'intro':
          if (s16 % 2 === 0) hat(t, false, s16 % 4 === 2 ? 1 : 0.6);
          if (barStart || n === Math.ceil(at / step - 1e-6)) pad(t, bar.chord, Math.min(barLeft, 16 - s16) * step, 0.9);
          if (s16 % 4 === 0) pluck(t, bar.chord[(n / 4) % 3]! + 12, 0.6);
          break;
        case 'groove':
        case 'drop':
          if (s16 % 4 === 0) kick(t);
          if (s16 === 4 || s16 === 12) clap(t);
          if (part === 'drop' || s16 % 2 === 0) hat(t, false, s16 % 2 === 0 ? 1 : 0.55);
          if (part === 'drop' && s16 % 4 === 2) hat(t, true);
          if (s16 % 2 === 0) bass(t, bar.root + (s16 % 8 === 6 ? 12 : 0), step * 1.8);
          if (part === 'drop') pluck(t, bar.chord[n % 3]! + (Math.floor(n / 3) % 2 ? 12 : 0));
          else if (s16 % 4 === 2) pluck(t, bar.chord[(n / 2) % 3]! + 12, 0.7);
          if (barStart || n === Math.ceil(at / step - 1e-6)) pad(t, bar.chord, Math.min(barLeft, 16 - s16) * step, part === 'drop' ? 0.8 : 0.6);
          break;
        case 'break':
          if (barStart || n === Math.ceil(at / step - 1e-6)) pad(t, bar.chord, Math.min(barLeft, 16 - s16) * step, 1);
          if (s16 % 8 === 0) pluck(t, bar.chord[0]! + 12, 0.5);
          break;
        case 'outro':
          if (n === Math.ceil(at / step - 1e-6)) {
            kick(t);
            FX.crash(t);
            pad(t, PROGRESSION[0]!.chord, Math.max(step, end - at - 0.2), 1);
            bass(t, PROGRESSION[0]!.root, Math.max(step, end - at - 0.2));
          }
          break;
        case 'stop':
          break;
      }
    }
  }
  for (const { at, kind } of plan.sfx) FX[kind](t0 + at);
}
