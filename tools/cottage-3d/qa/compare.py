"""
Dev-only: composite the DXF elevation linework (red) over a QA model render and
measure how well they agree.

  compare.py DXF FACE MODEL.png OUT.png

Metrics (1 px = 0.5 in at the QA scale), all against the model's black outlines:
  - matched: share of DXF linework length with a model edge within 1 in
  - p50/p90: distance from DXF linework to the nearest model edge, inches
  - max registration error: over every DXF segment >= 24 in long that has a model edge
    within 12 in, the median distance of that segment to the model; segments with no
    edge within 12 in count as `missing` (detail the model does not draw)
Prints the worst segments so the model can be corrected.
"""
import math, os, sys
import numpy as np
import ezdxf
from PIL import Image

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import elev_lines as E

PX = 2.0           # px per inch (matches QA_PX_PER_IN)
YC = 100.0         # QA_Y_CENTER
MAX_D = 30         # distance search radius, px


def dilate_distance(mask, limit):
    """Chebyshev-ish distance (px) to the nearest True pixel, capped at `limit`+1, by iterative 8-neighbour dilation."""
    dist = np.full(mask.shape, limit + 1, dtype=np.int16)
    cur = mask.copy()
    dist[cur] = 0
    for d in range(1, limit + 1):
        p = np.pad(cur, 1)
        grown = cur | p[:-2, 1:-1] | p[2:, 1:-1] | p[1:-1, :-2] | p[1:-1, 2:]
        # corners count as distance ~1.4: approximate with the 4-neighbour growth alternating with diagonals
        if d % 2 == 0:
            grown |= p[:-2, :-2] | p[:-2, 2:] | p[2:, :-2] | p[2:, 2:]
        new = grown & ~cur
        dist[new] = d
        cur = grown
    return dist


def main():
    dxf, face, model_png, out_png = sys.argv[1:5]
    model = Image.open(model_png).convert('RGB')
    w, h = model.size
    gray = np.asarray(model.convert('L'))
    ink = gray < 140
    doc = ezdxf.readfile(dxf)
    red = E.render(doc, face, 0.0, YC, PX, w, h)

    # composite: model in grey, DXF in red on top
    base = Image.fromarray(np.where(gray[..., None] < 200, 90, 255).astype(np.uint8).repeat(3, axis=2), 'RGB').convert('RGBA')
    base.alpha_composite(red)
    base.convert('RGB').save(out_png)

    dist = dilate_distance(ink, MAX_D)
    segs = []
    allpx = []
    for lay, pts in E.face_polylines(doc, face):
        loc = E.to_local(face, pts)
        for a, b in zip(loc, loc[1:]):
            L = math.hypot(b[0] - a[0], b[1] - a[1])
            n = max(2, int(L * PX))
            xs = (np.linspace(a[0], b[0], n)) * PX + w / 2
            ys = h / 2 - (np.linspace(a[1], b[1], n) - YC) * PX
            ok = (xs >= 1) & (xs < w - 1) & (ys >= 1) & (ys < h - 1)
            if ok.sum() < 2:
                continue
            d = dist[ys[ok].astype(int), xs[ok].astype(int)] / PX
            allpx.append(d)
            if L >= 24:
                segs.append((float(np.median(d)), L, lay, a, b))
    d = np.concatenate(allpx)
    near = [s for s in segs if s[0] <= 12]
    missing = [s for s in segs if s[0] > 12]
    worst = sorted(near, key=lambda s: -s[0])[:8]
    print(f'[{face}] DXF samples {len(d)}: matched<=1in {100*np.mean(d<=1):.1f}%  <=2in {100*np.mean(d<=2):.1f}%  p50 {np.median(d):.2f}in  p90 {np.percentile(d,90):.2f}in')
    print(f'[{face}] long segments {len(segs)}: registered {len(near)}, max registration error {max([s[0] for s in near], default=0):.1f}in, missing(>12in) {len(missing)}')
    for med, L, lay, a, b in worst:
        print(f'    off {med:4.1f}in  len {L:5.0f}  {lay:16s} u {a[0]:7.1f},{a[1]:7.1f} -> {b[0]:7.1f},{b[1]:7.1f}')
    for med, L, lay, a, b in sorted(missing, key=lambda s: -s[1])[:6]:
        print(f'    MISSING len {L:5.0f}  {lay:16s} u {a[0]:7.1f},{a[1]:7.1f} -> {b[0]:7.1f},{b[1]:7.1f}')


main()
