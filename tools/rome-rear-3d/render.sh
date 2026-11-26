#!/bin/zsh
# Renders review PNGs from out/rome-rear.glb with headless Chrome.
# Needs the static server from the repo root: python3 -m http.server 8765
set -e
OUT=${1:-../../.claude/preview/rome-rear}
mkdir -p "$OUT"
curl -sf -o /dev/null http://localhost:8765/tools/rome-rear-3d/out/checks.json || { echo "static server on :8765 is not running" >&2; exit 1; }
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
BASE="http://localhost:8765/tools/rome-rear-3d/viewer.html"
shot() { # name query width height
  rm -f "$OUT/$1.png"
  "$CHROME" --headless=new --user-data-dir="$(mktemp -d)" --use-angle=swiftshader --enable-unsafe-swiftshader --hide-scrollbars \
    --window-size=$3,$4 --virtual-time-budget=30000 --screenshot="$OUT/$1.png" "$BASE?$2&shot=1" >/dev/null 2>&1
  [[ -s "$OUT/$1.png" ]] || { echo "render failed: $1" >&2; exit 1; }
  echo "$OUT/$1.png"
}
shot rear-elevation-proposed "view=rear&mode=proposed&clean=1" 2400 1500
shot rear-elevation-existing "view=rear&mode=existing&clean=1" 2400 1500
shot garage-side "view=garage-side" 2400 1600
shot from-gate "view=gate" 2400 1600
shot plan "view=plan&mode=proposed" 2400 1800
shot axo-proposed "view=axo&mode=proposed" 2400 1600
shot axo-existing "view=axo&mode=existing" 2400 1600
