#!/usr/bin/env python3
"""Debug renderer: draws house.json plan polygons per level (matplotlib PNGs).

Usage:  python3 -I preview.py <house.json> <out_dir>

Writes plan_basement.png, plan_first.png, plan_second.png (plan view as seen from above with the
FRONT at the bottom, like the drawings) and elevation_side.png (roof / chimney / grade check).
"""
import json
import math
import os
import sys

import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib.patches import Polygon as MPoly

SYM_COL = {'A': '#1f77b4', 'B': '#2ca02c', 'C': '#17becf', 'D': '#9467bd', 'E': '#d62728', 'F': '#ff7f0e'}


def to_xy(p):
    """house [x, z] -> drawing (x, -z) so the front (z=0) is at the bottom like the DXF plans."""
    return (p[0], -p[1])


def draw_level(lv, house, path):
    fig, ax = plt.subplots(figsize=(15, 13))
    for ring in lv['floor']:
        ax.add_patch(MPoly([to_xy(p) for p in ring], closed=True, fc='#f4efe6', ec='#999', lw=.8, zorder=0))
    for w in lv['walls']:
        col = '#222' if w['exterior'] else '#666'
        pts = [to_xy(p) for p in w['outline']]
        ax.add_patch(MPoly(pts, closed=True, fc=col, ec='none', zorder=2, alpha=.9))
        for h in w.get('holes', []):
            ax.add_patch(MPoly([to_xy(p) for p in h], closed=True, fc='#f4efe6', ec='none', zorder=3))
        if 'height' in w:
            c = pts[0]
            ax.text(c[0], c[1], '%g' % w['height'], fontsize=5, color='r', zorder=9)
    for o in lv['openings']:
        cx, cz = o['center']
        a = o['angle']
        hw = o['width'] / 2
        dx, dy = math.cos(a) * hw, math.sin(a) * hw      # DXF-plan direction == drawing direction
        nx, ny = -math.sin(a) * o['depth'] / 2, math.cos(a) * o['depth'] / 2
        col = SYM_COL.get(o.get('sym'), '#e377c2' if o['kind'] == 'door' else '#bcbd22')
        pts = [(cx - dx - nx, -cz - dy - ny), (cx + dx - nx, -cz + dy - ny),
               (cx + dx + nx, -cz + dy + ny), (cx - dx + nx, -cz - dy + ny)]
        ax.add_patch(MPoly(pts, closed=True, fc=col, ec='k', lw=.4, alpha=.75, zorder=4))
        ax.text(cx, -cz, o.get('sym') or o['kind'][0], fontsize=8, ha='center', va='center', zorder=6, color='w' if o.get('sym') else 'k')
    for s in lv['stairs']:
        ax.add_patch(MPoly([to_xy(p) for p in s['outline']], closed=True, fc='#ffd27f', ec='#c60', lw=1, alpha=.6, zorder=3))
        xs = [p[0] for p in s['outline']]
        zs = [-p[1] for p in s['outline']]
        cx, cy = (min(xs) + max(xs)) / 2, (min(zs) + max(zs)) / 2
        d = s['direction']
        ax.annotate('', xy=(cx + d[0] * 30, cy - d[1] * 30), xytext=(cx - d[0] * 30, cy + d[1] * 30),
                    arrowprops=dict(arrowstyle='->', color='#c60'), zorder=7)
        ax.text(cx, cy + 8, '%d risers %g->%g' % (s['risers'], s['bottomY'], s['topY']), fontsize=6, ha='center', zorder=7)
    FC = {'cabinet-base': '#8c564b', 'island': '#a0522d', 'counter': '#d2b48c', 'fireplace': '#b5651d', 'hearth': '#e6a96b',
          'tub': '#88c', 'shower': '#6bc', 'vanity': '#9ad', 'toilet': '#cde', 'appliance': '#aaa', 'shelving': '#c9a', 'cabinet-upper': '#a86'}
    for f in lv['fixtures']:
        ax.add_patch(MPoly([to_xy(p) for p in f['outline']], closed=True, fc=FC.get(f['kind'], '#ccc'), ec='k', lw=.4,
                           alpha=.6 if f['kind'] != 'counter' else .35, zorder=3))
        xs = [p[0] for p in f['outline']]
        zs = [-p[1] for p in f['outline']]
        ax.text(sum(xs) / len(xs), sum(zs) / len(zs), f['kind'][:6], fontsize=5, ha='center', zorder=8)
    for r in lv['rooms']:
        ax.text(r['label'][0], -r['label'][1], r['name'], fontsize=9, ha='center', color='#a00', zorder=10)
    if lv['id'] == 'first':
        s = house['site']
        for rw in s['retainingWalls']:
            ax.add_patch(MPoly([to_xy(p) for p in rw['outline']], closed=True, fc='#c97', ec='k', lw=.5, zorder=1, alpha=.8))
        if s['frontSteps']:
            ax.add_patch(MPoly([to_xy(p) for p in s['frontSteps']['outline']], closed=True, fc='#bbb', ec='k', zorder=1))
        if s['deck']:
            ax.add_patch(MPoly([to_xy(p) for p in s['deck']['outline']], closed=True, fc='#deb887', ec='k', zorder=1, alpha=.7))
        ch = house['chimney']['outline']
        ax.add_patch(MPoly([to_xy(p) for p in ch], closed=True, fc='none', ec='r', lw=1.5, ls='--', zorder=9))
    if lv['id'] == 'basement':
        for rw in house['site']['retainingWalls'][:2]:
            ax.add_patch(MPoly([to_xy(p) for p in rw['outline']], closed=True, fc='#c97', ec='k', lw=.5, zorder=1, alpha=.8))
    ax.set_aspect('equal')
    ax.autoscale()
    ax.grid(True, lw=.2)
    ax.set_title('%s  floorY=%g ceiling=%g  walls=%d openings=%d' % (lv['name'], lv['floorY'], lv['ceilingHeight'],
                                                                   len(lv['walls']), len(lv['openings'])))
    plt.savefig(path, dpi=75, bbox_inches='tight')
    plt.close(fig)


def draw_elevation(house, path):
    """Right-side elevation (looking at the right wall; front on the left): roof, wing, chimney, grade, levels."""
    r = house['roof']['main']
    fig, ax = plt.subplots(figsize=(16, 10))
    D = -r['zRear']
    # in this view horizontal = -z (front at left)
    def X(z):
        return -z
    # walls / floors
    for lv in house['levels']:
        ax.plot([0, D], [lv['floorY']] * 2, 'k-', lw=.6)
        ax.text(D + 5, lv['floorY'], lv['id'], fontsize=7)
        ax.plot([0, D], [lv['floorY'] + lv['ceilingHeight']] * 2, color='#aaa', lw=.4, ls='--')
    # main roof (underside = top - thickness): triangle between eave tip & ridge
    oh = r['overhangEave']
    t = r['pitch'] / 12
    pts = [(-oh, r['eaveY'] - oh * t), (D / 2, r['ridgeY']), (D + oh, r['eaveY'] - oh * t)]
    ax.plot([p[0] for p in pts], [p[1] for p in pts], 'b-', lw=1.5)
    ax.plot([0, 0], [-120, r['eaveY']], 'k-', lw=.6)
    ax.plot([D, D], [-120, r['eaveY']], 'k-', lw=.6)
    fr = house['roof']['frieze']
    ax.fill_between([0, D], [r['eaveY'] - 18.1 - fr['height']] * 2, [r['eaveY'] - 18.1] * 2, color='#ccc', alpha=.5)
    w = house['roof']['wing']
    if w:
        ax.plot([X(w['zNear']), X(w['zFar']) + w['overhang']], [w['highY'], w['lowY'] - w['overhang'] * 2.7 / 12], 'g-', lw=1.5)
        ax.plot([X(w['zFar'])] * 2, [-120, w['lowY']], 'g-', lw=.6)
    c = house['chimney']
    zs = [p[1] for p in c['outline']]
    ax.fill_betweenx([c['baseY'], c['topY']], X(max(zs)), X(min(zs)), color='#b5651d', alpha=.6)
    s = house['site']
    ax.plot([-60, X(w['zFar']) if w else D], [s['gradeFrontY'], s['gradeRearY']], color='#4a4', lw=2)
    for rw in s['retainingWalls'][:2]:
        zz = [p[1] for p in rw['outline']]
        ax.fill_between([X(max(zz)), X(min(zz))], [rw['baseY']] * 2, [rw['topY']] * 2, color='#c97', alpha=.8)
    for lv in house['levels']:
        for o in lv['openings']:
            if o['exterior'] and abs(o['angle'] - math.pi / 2) < .01 and o['center'][0] > 300:   # right wall
                z = o['center'][1]
                ax.fill_between([X(z) - o['width'] / 2, X(z) + o['width'] / 2],
                                [lv['floorY'] + o['sill']] * 2, [lv['floorY'] + o['head']] * 2, color='#357', alpha=.6)
    ax.set_aspect('equal')
    ax.grid(True, lw=.2)
    ax.set_title('Right-side elevation check (front at left): eaveY=%.1f ridgeY=%.1f pitch=%.2f' % (r['eaveY'], r['ridgeY'], r['pitch']))
    plt.savefig(path, dpi=70, bbox_inches='tight')
    plt.close(fig)


def main():
    src, out = sys.argv[1], sys.argv[2]
    os.makedirs(out, exist_ok=True)
    h = json.load(open(src))
    for lv in h['levels']:
        draw_level(lv, h, os.path.join(out, 'plan_%s.png' % lv['id']))
    draw_elevation(h, os.path.join(out, 'elevation_side.png'))
    print('wrote previews to', out)


if __name__ == '__main__':
    if len(sys.argv) != 3:
        print(__doc__)
        sys.exit(2)
    main()
