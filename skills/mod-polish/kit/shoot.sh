#!/usr/bin/env bash
# shoot.sh <情境名> <light|dark> [高度]：把 preview.mts 產生的 pane-<情境名>-<主題>.html 截成 2 倍解析度的 PNG。
# 用 Playwright 帶的 chrome-headless-shell；路徑一律絕對（file:// 用相對路徑會截到空白頁，畫面全白不報錯）。
set -euo pipefail
dir="$(cd "$(dirname "$0")" && pwd)"
name="$1"; theme="$2"; height="${3:-1000}"
chrome="${CHROME:-$(find "$HOME/.cache/ms-playwright" -name chrome-headless-shell -type f 2>/dev/null | sort | tail -1)}"
[ -x "$chrome" ] || { echo "找不到 chrome-headless-shell：npx playwright install chromium-headless-shell，或用 CHROME= 指定"; exit 2; }
flags=()
# 深色：讓 SVG 裡的 prefers-color-scheme: dark 生效
[ "$theme" = dark ] && flags=(--force-dark-mode --blink-settings=preferredColorScheme=0)
html="$dir/pane-$name-$theme.html"
[ -f "$html" ] || { echo "沒有 $html：先跑 node preview.mts"; exit 2; }
timeout 60 "$chrome" --no-sandbox --hide-scrollbars "${flags[@]}" --force-device-scale-factor=2 \
  --window-size=500,"$height" --screenshot="$dir/pane-$name-$theme.png" "file://$html" > /dev/null 2>&1
echo "$dir/pane-$name-$theme.png"
