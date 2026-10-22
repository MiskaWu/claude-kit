// 分鏡（storyboard）的格式與時間換算。一支片＝一份 JSON（web/scripts/video/boards/），全部宣告式：
// 鏡頭照順序接起來就是時間軸；長度用拍（"4b"）或秒（"1.5s"）寫，用拍寫的切點自然落在配樂的拍子上。
// 鏡頭的切入點寫成「劇本裡的事件 ± 秒」（"touchdown-1.2"），事件時間由導演頁先空跑一遍那條劇本量出來。
import type { Locale } from '../lib/i18n';

/** 一段字：單一字串，或各語系各一份（找不到目前語系就報錯，不默默用別的語系） */
export type Text = string | Partial<Record<Locale, string>>;
/** 長度或時間點：數字是秒；"4b" 是拍、"1.5s" 是秒 */
export type Dur = number | string;

export type CameraMode = 'auto' | 'follow' | 'loop' | 'pad' | 'wide' | 'game';
export interface CameraSpec {
  mode: CameraMode;
  /** 畫面高度看得到幾公尺（越小越近） */
  height?: number;
  /** 往車速方向多看幾秒的距離 */
  lead?: number;
  /** 地面最高放在畫面的哪裡（0 頂端、1 底部）：車在地上時不會露出一大片地底 */
  ground?: number;
  /** 平滑的時間常數（秒）；0 是硬跟 */
  tau?: number;
  dx?: number;
  dy?: number;
}

export type CaptionStyle = 'hook' | 'beat' | 'big' | 'small' | 'counter' | 'tag' | 'meter';
export interface Caption {
  /** 時間點：鏡頭內的 Dur，或劇本事件（"touchdown+0.2"） */
  at: Dur;
  len: Dur;
  /** 可用 **粗體強調**；{score}、{carnage}、{grade} 換成這個鏡頭那一局的真實成績；{height}、{speed} 每幀照核心狀態更新（meter 樣式）。counter 不用寫 */
  text?: Text;
  /**
   * counter 樣式跳哪個數字（那一局的真實成績）。標籤用遊戲自己的詞（核心的 texts().score／carnage，結算與分享卡同一份），
   * 分鏡裡不另寫，免得和遊戲的叫法分岔（日文是「大破度」）
   */
  value?: 'score' | 'carnage';
  style?: CaptionStyle;
  /** 垂直位置（0–1，字卡中心）；不給照樣式的預設 */
  y?: number;
}

export type SfxKind = 'impact' | 'whoosh' | 'riser' | 'tick' | 'crash' | 'stop' | 'rewind';
export interface Sfx {
  at: Dur;
  kind: SfxKind;
}

export interface Shot {
  /** 劇本名（src/video/takes.ts）。cont 或片尾不用給 */
  take?: string;
  /** 接著上一個鏡頭的那一局繼續跑（不重來）：換速度、凍結再放開都用這個 */
  cont?: boolean;
  /** 切入點："go"、"air-0.5"、"touchdown+1"；數字是從按下開始（含倒數）算的秒 */
  from?: Dur;
  len: Dur;
  /** 讓某個事件剛好發生在鏡頭內的這個時間點（會改掉 from）：例如觸地落在第 2 拍 */
  align?: { event: string; at: Dur };
  /** 播放速度（0.5 是半速）。遊戲自己的落地慢動作照樣會疊上去 */
  speed?: number;
  /** 整個鏡頭停在同一格（物理不動、特效不動） */
  freeze?: boolean;
  camera?: CameraMode | CameraSpec;
  /** 畫面下方的四顆裝置鈕（亮＝裝置真的在作動）；不給照整支片的設定 */
  buttons?: boolean;
  /** 切進來時的白閃 */
  flash?: boolean;
  /** 切進來時拉近多少（0.2 是近 20%），0.35 秒內回到原本 */
  punch?: number;
  say?: Caption[];
  sfx?: Sfx[];
  /** 片尾卡 */
  end?: EndCard;
}

export interface EndCard {
  title?: Text;
  line?: Text;
  cta?: Text;
  url?: string;
}

export type MusicPart = 'intro' | 'groove' | 'drop' | 'break' | 'stop' | 'outro';
export interface Board {
  id: string;
  note?: string;
  bpm: number;
  /** 預設的語系；錄影時可以換 */
  locale?: Locale;
  /** 車門上的字 */
  carName?: Text;
  buttons?: boolean;
  /** 配樂段落：從哪一拍開始換成哪一段 */
  music?: { at: Dur; part: MusicPart }[];
  /** 整支片的音量（配樂、遊戲音效） */
  mix?: { music?: number; game?: number };
  shots: Shot[];
  /** 不屬於某個鏡頭的字卡（時間點相對整支片） */
  captions?: Caption[];
  sfx?: Sfx[];
}

export function seconds(d: Dur, bpm: number): number {
  if (typeof d === 'number') return d;
  const s = d.trim();
  let total = 0;
  // "2b+0.25s" 這種組合也接受
  for (const part of s.replace(/\s+/g, '').match(/[+-]?[^+-]+/g) ?? []) {
    const m = /^([+-]?\d*\.?\d+)\s*(b|s)?$/.exec(part.trim());
    if (!m) throw new Error(`看不懂的時間：${d}`);
    const n = Number(m[1]);
    total += m[2] === 'b' ? (n * 60) / bpm : n;
  }
  return total;
}

/** "touchdown-1.2"、"air+2b" → { event, offset（秒） }；純時間回傳 null */
export function eventRef(d: Dur, bpm: number): { event: string; offset: number } | null {
  if (typeof d !== 'string') return null;
  const m = /^([a-z]+)\s*([+-].*)?$/i.exec(d.trim());
  if (!m) return null;
  return { event: m[1]!, offset: m[2] ? seconds(m[2], bpm) : 0 };
}

export function textFor(t: Text, locale: Locale): string {
  if (typeof t === 'string') return t;
  const v = t[locale];
  if (v === undefined) throw new Error(`字卡缺 ${locale}：${JSON.stringify(t)}`);
  return v;
}
