// mod 面板的預覽頁：用 mod 的 visual.ts 產生各情境的圖，排成接近桌面 app 面板的版面
// （段落標題、圓角外框、按鈕用 HTML 模擬），深淺各一份，每個情境一個檔，給 shoot.sh 截圖。
//
// 用法：複製到 scratchpad（不要放進 mod 的 repo），改 VISUAL 的路徑與下面的 SCENES，然後
//   node preview.mts && ./shoot.sh <情境名> <light|dark> [高度]
// node ≥ 23 直接跑 .ts／.mts（去型別），visual.ts 不能用 enum、namespace 這類要轉譯的語法。
import { writeFileSync } from 'node:fs'
import * as v from '/ABSOLUTE/PATH/TO/mod/hooks/visual.ts' // ← 改成 mod 的 visual.ts

const W = 420

// 版面積木：和 register.tsx 的 Box／Button 對應，只為了截圖看起來像真的
const pic = (d: { source: string }) => d.source
const card = (inner: string, border = '') => `<div class="card" style="${border ? `border-color:${border}` : ''}">${inner}</div>`
const btns = (...b: [string, boolean?][]) => `<div class="btns">${b.map(([t, primary]) => `<span class="btn${primary ? ' pri' : ''}">${t}</span>`).join('')}</div>`
const sec = (title: string, body: string) => `<div class="sec"><div class="st">${title}</div>${body}</div>`
const text = (s: string, cls = 'sub') => `<div class="${cls}">${s}</div>`

// ↓ 每個情境一個面板：名字 → HTML。照 register.tsx 的版面排，情境要涵蓋每種狀態（空的、滿的、出錯的、動畫中的）
const SCENES: Record<string, () => string> = {
  example: () =>
    [
      sec('一段標題', card(pic(v.statusRow({ tone: 'ok', icon: v.icons.monitor, title: '已連線', sub: '說明文字', dot: 'ok' })) + btns(['主要動作', true], ['次要']))),
      text('底部的淡字'),
    ].join(''),
}

const css = (dark: boolean) => `
body{margin:0;padding:20px;background:${dark ? '#262624' : '#f5f4ef'};font-family:'Segoe UI','Noto Sans CJK TC',sans-serif;color:${dark ? '#f0efec' : '#0b0b0b'};color-scheme:${dark ? 'dark' : 'light'}}
.pane{width:${W + 40}px;box-sizing:border-box;background:${dark ? '#1a1a19' : '#ffffff'};border:1px solid ${dark ? '#34342f' : '#e4e3de'};border-radius:12px;padding:12px 18px 18px}
.pane svg{display:block;max-width:100%}
.sec{margin-top:14px}.st{font-size:12px;font-weight:700;color:${dark ? '#97968e' : '#77766f'};margin-bottom:6px}
.card{border:1px solid ${dark ? '#34342f' : '#e4e3de'};border-radius:12px;padding:12px;margin-top:8px}
.btns{display:flex;gap:8px;margin-top:10px}
.btn{font-size:13px;font-weight:600;padding:6px 12px;border-radius:8px;border:1px solid ${dark ? '#45453f' : '#d6d5cd'}}
.pri{background:${dark ? '#f0efec' : '#1c1c1a'};color:${dark ? '#1a1a19' : '#fff'};border-color:transparent}
.sub{font-size:12.5px;color:${dark ? '#97968e' : '#77766f'};margin-top:10px}
`

for (const dark of [false, true]) {
  for (const [name, html] of Object.entries(SCENES)) {
    const file = new URL(`./pane-${name}-${dark ? 'dark' : 'light'}.html`, import.meta.url)
    writeFileSync(file, `<!doctype html><meta charset="utf-8"><style>${css(dark)}</style><div class="pane">${html()}</div>`)
  }
}
console.log(`ok：${Object.keys(SCENES).length} 個情境 × 深淺`)
