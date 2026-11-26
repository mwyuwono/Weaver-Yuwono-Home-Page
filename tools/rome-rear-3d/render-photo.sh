#!/bin/zsh
# Renders a solved photo camera (cameras/<name>.camera.json) at the photo's pixel size: existing, proposed, mask-proposed, mask-removed.
# Needs the static server from the repo root: python3 -m http.server 8765. Usage: ./render-photo.sh IMG_0429 [outdir]
set -e
NAME=$1; OUT=${2:-../../.claude/preview/rome-rear/match}
mkdir -p "$OUT"
curl -sf -o /dev/null http://localhost:8765/tools/rome-rear-3d/out/checks.json || { echo "static server on :8765 is not running" >&2; exit 1; }
W=$(node -e "console.log(require('./cameras/$NAME.camera.json').width)"); H=$(node -e "console.log(require('./cameras/$NAME.camera.json').height)")
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
BASE="http://localhost:8765/tools/rome-rear-3d/viewer.html"
shot() { # suffix query
  rm -f "$OUT/$NAME-$1.png"
  "$CHROME" --headless=new --user-data-dir="$(mktemp -d)" --use-angle=swiftshader --enable-unsafe-swiftshader --hide-scrollbars --force-device-scale-factor=1 \
    --window-size=$W,$H --virtual-time-budget=30000 --screenshot="$OUT/$NAME-$1.png" "$BASE?view=photo&cam=$NAME&shot=1&$2" >/dev/null 2>&1
  [[ -s "$OUT/$NAME-$1.png" ]] || { echo "render failed: $1" >&2; exit 1; }
  echo "$OUT/$NAME-$1.png"
}
shot existing "mode=existing"
shot existing-flat "mode=existing&flat=1"
shot proposed "mode=proposed"
shot mask-proposed "mode=proposed&mask=proposed"
shot mask-removed "mode=existing&mask=removed"
