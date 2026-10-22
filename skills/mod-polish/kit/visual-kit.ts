// mod 面板畫圖的起手式：複製成 mod 的 hooks/visual.ts，刪掉用不到的、在下面加這個 mod 自己的卡片。
// 純函式：給資料、回 SVG 字串，不碰 $。桌面 app（與手機）用 Svg 畫，終端機照舊用文字（見 SKILL.md）。
// 來源：braid 的 visual.ts，以及另一個工具的狀態面板（2026-10）。
//
// 配色：文字三階（t1 主、t2 次、t3 淡）＋細線 hair＋淡底 panel＋狀態 ok／warn／crit；
// 強調色由 mod 自己決定 1–2 個，要有語意（例如：直接改＝橘、工作副本＝藍）。每個強調色產生四個 class：
//   .x 實心、.xS 線、.xK 淡底、.xT 文字（比實心深一階，淡底上也讀得清）。
// 深淺兩套寫在 SVG 自己的 <style>，用 prefers-color-scheme 切換——桌面 app 的面板跟著系統主題。

export type Drawing = { source: string; alt: string; height: number; animated?: boolean }
export type Accent = { light: string; dark: string; lightText: string; darkText: string }

// ↓ 換成這個 mod 的強調色（名字就是 class 名，用短字母）
export const ACCENTS: Record<string, Accent> = {
  a: { light: '#c2410c', dark: '#f08a4b', lightText: '#9a3412', darkText: '#f5a46e' }, // 橘
  b: { light: '#1f4fbf', dark: '#7fa6ff', lightText: '#163a8f', darkText: '#a9c3ff' }, // 藍
}
const STATUS: Record<string, Accent> = {
  ok: { light: '#0b8a3a', dark: '#3fbf6a', lightText: '#0a6b2e', darkText: '#6fd892' },
  warn: { light: '#d99a06', dark: '#f5b52e', lightText: '#7a5300', darkText: '#f5c451' },
  crit: { light: '#c8322f', dark: '#f06a63', lightText: '#9e2320', darkText: '#ff8f88' },
}

export const FONT = `'Segoe UI Variable Text','Segoe UI',-apple-system,BlinkMacSystemFont,'PingFang TC','Microsoft JhengHei UI','Microsoft JhengHei','Noto Sans TC','Noto Sans CJK TC',sans-serif`
export const MONO = `'Cascadia Mono','JetBrains Mono',Consolas,ui-monospace,monospace`

function classes(name: string, c: Accent, dark: boolean): string {
  const v = dark ? c.dark : c.light
  const t = dark ? c.darkText : c.lightText
  const k = dark ? 0.16 : 0.1
  return `.${name}{fill:${v}}.${name}S{stroke:${v}}.${name}K{fill:${v};fill-opacity:${k}}.${name}T{fill:${t}}`
}

export function style(): string {
  const all = { ...ACCENTS, ...STATUS }
  const light = Object.entries(all).map(([n, c]) => classes(n, c, false)).join('')
  const dark = Object.entries(all).map(([n, c]) => classes(n, c, true)).join('')
  return (
    `<style>` +
    `text{font-family:${FONT};}.m{font-family:${MONO};}` +
    `.t1{fill:#0b0b0b}.t2{fill:#52514e}.t3{fill:#77766f}.on{fill:#ffffff}` +
    `.hair{stroke:#e4e3de}.panel{fill:#f4f3ef}.ink{stroke:#3b3a36}` +
    light +
    `@media (prefers-color-scheme: dark){` +
    `.t1{fill:#f0efec}.t2{fill:#c3c2b7}.t3{fill:#97968e}` +
    `.hair{stroke:#34342f}.panel{fill:#24241f}.ink{stroke:#d6d5cd}` +
    dark +
    `}</style>`
  )
}

export function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;')
}

const wide = (ch: string) => /[ᄀ-ᅟ⺀-꓏가-힣豈-﫿︰-﹏＀-｠￠-￦]/.test(ch)

/** 估計的字寬（px）：中日韓一個字級寬；mono 每個半形 0.6 個字級。SVG 不會量字，靠它截斷與斷行。 */
export function textWidth(s: string, size: number, mono = false): number {
  let w = 0
  for (const ch of s) w += wide(ch) ? size : mono ? size * 0.6 : /[A-Z0-9@%]/.test(ch) ? size * 0.62 : size * 0.54
  return w
}

/** 超過寬度截斷加「…」；路徑用 keepEnd（從前面截，保留結尾——最後一層最有用）。 */
export function fit(s: string, size: number, max: number, mono = false, keepEnd = false): string {
  if (textWidth(s, size, mono) <= max) return s
  let out = ''
  if (keepEnd) {
    for (const ch of [...s].reverse()) {
      if (textWidth(`…${ch}${out}`, size, mono) > max) break
      out = ch + out
    }
    return `…${out}`
  }
  for (const ch of s) {
    if (textWidth(`${out}${ch}…`, size, mono) > max) break
    out += ch
  }
  return `${out}…`
}

/** 斷行：中文逐字、英文不切開單字、標點不放行首；超過 maxLines 的最後一行截斷。 */
export function wrap(s: string, size: number, max: number, maxLines = 3): string[] {
  const tokens = s.match(/[A-Za-z0-9._\-/\\:@]+|\s+|./gu) ?? []
  const closing = /^[，。、；：！？」』）】〉》,.;:!?)]/
  const lines: string[] = []
  let cur = ''
  for (const tok of tokens) {
    if (textWidth(cur + tok, size) > max && cur.trim() && !closing.test(tok)) {
      lines.push(cur.trimEnd())
      cur = tok.trimStart()
    } else {
      cur += tok
    }
  }
  if (cur.trim()) lines.push(cur.trimEnd())
  if (lines.length > maxLines) {
    const kept = lines.slice(0, maxLines)
    kept[maxLines - 1] = fit(`${kept[maxLines - 1]}${lines.slice(maxLines).join('')}`, size, max)
    return kept
  }
  return lines
}

export function svg(w: number, h: number, body: string): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${style()}${body}</svg>`
}

export function txt(x: number, y: number, cls: string, size: number, s: string, extra = ''): string {
  return `<text x="${x}" y="${y}" class="${cls}" font-size="${size}" ${extra}>${esc(s)}</text>`
}

/** 膠囊標籤：tone 是強調色或狀態的名字（'none'＝中性）；anchor 決定 x 是左緣、中線或右緣。回寬度。 */
export function pill(x: number, cy: number, tone: string, s: string, anchor: 'start' | 'middle' | 'end' = 'start'): { svg: string; w: number } {
  const w = Math.ceil(textWidth(s, 11)) + 16
  const left = anchor === 'end' ? x - w : anchor === 'middle' ? x - w / 2 : x
  const bg = tone === 'none' ? 'panel' : `${tone}K`
  const fg = tone === 'none' ? 't2' : `${tone}T`
  return { svg: `<rect x="${left}" y="${cy - 9.5}" width="${w}" height="19" rx="9.5" class="${bg}"/>` + txt(left + 8, cy + 4, fg, 11, s, 'font-weight="600"'), w }
}

/** 40×40 圓角淡底＋圖示＋右下角狀態點；animated 時狀態點呼吸（要配 Svg 的 isInteractive）。 */
export function tile(x: number, y: number, bg: string, icon: string, dot: string | null, animated = false): string {
  const pulse = animated ? `<animate attributeName="opacity" values="1;.25;1" dur="1.4s" repeatCount="indefinite"/>` : ''
  const d = dot ? `<circle cx="${x + 36}" cy="${y + 36}" r="5.5" class="${dot}">${pulse}</circle>` : ''
  return `<rect x="${x}" y="${y}" width="40" height="40" rx="10" class="${bg}"/>${icon}${d}`
}

/**
 * 一列狀態卡（最常用的形狀）：左邊圖示底塊、標題（14 粗）、說明（12 淡）、右邊可選的膠囊。高 48。
 * tone：'none' 時底塊是 panel、圖示用 ink。
 */
export function statusRow(
  d: { tone: string; icon: (x: number, y: number, cls: string) => string; title: string; sub: string; dot?: string | null; animated?: boolean; badge?: { tone: string; text: string } },
  w = 420,
): Drawing {
  const h = 48
  const badge = d.badge ? pill(w, 24, d.badge.tone, d.badge.text, 'end') : null
  const room = w - 54 - (badge ? badge.w + 10 : 0)
  let body = tile(0, 4, d.tone === 'none' ? 'panel' : `${d.tone}K`, d.icon(10, 14, d.tone === 'none' ? 'ink' : `${d.tone}S`), d.dot ?? null, d.animated)
  body += txt(54, 21, 't1', 14, fit(d.title, 14, room), 'font-weight="600"')
  body += txt(54, 40, 't3', 12, fit(d.sub, 12, room))
  if (badge) body += badge.svg
  return { source: svg(w, h, body), alt: `${d.title}${d.badge ? `（${d.badge.text}）` : ''}。${d.sub}`, height: h, animated: d.animated }
}

/** 一條水平細線，例如清單的列分隔。 */
export const hairline = (y: number, w: number) => `<line x1="0" y1="${y - 0.5}" x2="${w}" y2="${y - 0.5}" class="hair" stroke-width="1"/>`

// ---------------------------------------------------------------------------
// 線稿圖示：約 20×18，線寬 1.5–1.8，跟著 cls（ink 或 xS）上色。要新的照同樣尺寸畫。
// ---------------------------------------------------------------------------

export const icons = {
  folder: (x: number, y: number, cls: string) =>
    `<path d="M${x} ${y + 3}a2 2 0 0 1 2-2h4l2 2h7a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H${x + 2}a2 2 0 0 1-2-2z" fill="none" class="${cls}" stroke-width="1.6" stroke-linejoin="round"/>`,
  monitor: (x: number, y: number, cls: string) =>
    `<rect x="${x}" y="${y}" width="20" height="14" rx="2" fill="none" class="${cls}" stroke-width="1.7"/><path d="M${x + 7} ${y + 18}h6M${x + 10} ${y + 14}v4" class="${cls}" stroke-width="1.7" stroke-linecap="round"/>`,
  shield: (x: number, y: number, cls: string) =>
    `<path d="M${x + 10} ${y}l8 3v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V${y + 3}z" fill="none" class="${cls}" stroke-width="1.7" stroke-linejoin="round"/><path d="M${x + 6} ${y + 9.5}l3 3 5-5.5" fill="none" class="${cls}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>`,
  file: (x: number, y: number, cls: string) =>
    `<path d="M${x} ${y + 1.5}a1.5 1.5 0 0 1 1.5-1.5h6l4.5 4.5v10a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 ${x} ${y + 14.5}zM${x + 7.5} ${y}v4.5h4.5" fill="none" class="${cls}" stroke-width="1.4" stroke-linejoin="round"/>`,
  branch: (x: number, y: number, cls: string) =>
    `<circle cx="${x + 4}" cy="${y + 3}" r="2.4" fill="none" class="${cls}" stroke-width="1.5"/><circle cx="${x + 4}" cy="${y + 15}" r="2.4" fill="none" class="${cls}" stroke-width="1.5"/><circle cx="${x + 13}" cy="${y + 6}" r="2.4" fill="none" class="${cls}" stroke-width="1.5"/><path d="M${x + 4} ${y + 5.4}v7.2M${x + 13} ${y + 8.4}c0 4-9 2-9 4.2" fill="none" class="${cls}" stroke-width="1.5"/>`,
  server: (x: number, y: number, cls: string) =>
    `<rect x="${x}" y="${y}" width="20" height="7" rx="1.8" fill="none" class="${cls}" stroke-width="1.6"/><rect x="${x}" y="${y + 10}" width="20" height="7" rx="1.8" fill="none" class="${cls}" stroke-width="1.6"/>`,
  check: (x: number, y: number, cls: string) =>
    `<path d="M${x + 3} ${y + 9}l5 5 9-10" fill="none" class="${cls}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`,
}
