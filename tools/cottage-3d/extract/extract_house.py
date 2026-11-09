#!/usr/bin/env python3
"""Extract a compact house description (house.json) from the cottage DXF.

Usage:  python3 -I extract_house.py <cottage.dxf> <out.json>

Output follows tools/cottage-3d/src/data/schema.ts exactly.  All numbers are
inches.  Plan coords are [x, z]: x to the right, z toward the front (front wall
outer face z=0, the house extends into -z), origin x=0 at the outer face of the
left (chimney-side) wall.  Y=0 is the first-floor subfloor.

Strategy (see meta.notes in the output for every assumption):
  * Wall solids come from the solid HATCHes on A-WALL-PATT (the architect's wall
    poche).  This is cleaner than polygonizing the loose A-WALL-N lines, which
    also contain window glazing lines, stair treads, deck boards...
  * Basement exterior walls come from the S-FNDN foundation outline (the basement
    A-WALL-N poche is only the interior framing/partitions).
  * Exterior wall = the 6" band just inside the main-block/wing outline; the rest
    of the poche (thick chimney jambs, partitions) is interior.
  * Exterior openings are the gaps in the exterior wall band, labelled by the
    nearest A-GLAZ-IDEN tag (letter attribute) or by the A-DOOR swing blocks.
  * Interior doors come from the A-DOOR swing blocks (hinge + arc radius).
  * Roof / chimney / grade values are measured from the elevation drawings.
"""
import json
import math
import sys
import datetime
import collections

import ezdxf
from ezdxf import bbox as ezbbox
from shapely.geometry import LineString, Polygon, MultiPolygon, box, Point
from shapely.geometry.polygon import orient
from shapely.ops import unary_union, polygonize

NOTES = []


def note(s):
    NOTES.append(s)


# --------------------------------------------------------------------------
# generic helpers
# --------------------------------------------------------------------------
def in_region(pts, reg):
    return all(reg[0] <= x <= reg[2] and reg[1] <= y <= reg[3] for x, y in pts)


def hatch_polys(msp, layer, reg, solid=True):
    """Return list of shapely geometries (even-odd resolved) for SOLID hatches."""
    out = []
    for h in msp.query('HATCH'):
        if h.dxf.layer != layer:
            continue
        if solid and not h.dxf.solid_fill:
            continue
        rings = []
        for p in h.paths:
            if hasattr(p, 'vertices'):
                pts = [(v[0], v[1]) for v in p.vertices]
            else:
                pts = []
                for ed in p.edges:
                    if ed.type.name == 'LINE':
                        pts.append((ed.start[0], ed.start[1]))
                        pts.append((ed.end[0], ed.end[1]))
                    elif ed.type.name == 'ARC':
                        cx, cy = ed.center[0], ed.center[1]
                        a0, a1 = math.radians(ed.start_angle), math.radians(ed.end_angle)
                        if a1 < a0:
                            a1 += 2 * math.pi
                        for i in range(9):
                            a = a0 + (a1 - a0) * i / 8
                            pts.append((cx + ed.radius * math.cos(a), cy + ed.radius * math.sin(a)))
            # drop consecutive duplicates
            q = []
            for pt in pts:
                if not q or abs(q[-1][0] - pt[0]) > 1e-6 or abs(q[-1][1] - pt[1]) > 1e-6:
                    q.append(pt)
            if len(q) >= 3:
                rings.append(q)
        if not rings or not all(in_region(r, reg) for r in rings):
            continue
        g = None
        for r in rings:
            pg = Polygon(r).buffer(0)
            g = pg if g is None else g.symmetric_difference(pg)
        if g is not None and not g.is_empty:
            out.append(g)
    return out


def explode(g):
    if g.is_empty:
        return []
    if isinstance(g, Polygon):
        return [g]
    if hasattr(g, 'geoms'):
        r = []
        for s in g.geoms:
            r += explode(s)
        return r
    return []


def r2(v):
    v = round(float(v), 2)
    return 0.0 if v == 0 else v


class Xf:
    """DXF plan -> house plan transform: x = X - ox ; z = oy - Y."""

    def __init__(self, ox, oy):
        self.ox, self.oy = ox, oy

    def pt(self, X, Y):
        return (X - self.ox, self.oy - Y)

    def ring(self, coords):
        return [self.pt(x, y) for x, y in coords]

    def poly(self, p):
        """shapely polygon (DXF) -> (outline, holes) CCW/CW-proper in house coords."""
        q = Polygon(self.ring(p.exterior.coords), [self.ring(i.coords) for i in p.interiors])
        q = orient(q, 1.0)
        out = [[r2(a), r2(b)] for a, b in list(q.exterior.coords)[:-1]]
        holes = []
        for i in q.interiors:
            h = [[r2(a), r2(b)] for a, b in list(i.coords)[:-1]]
            holes.append(h)
        return out, holes

    def box_poly(self, x0, y0, x1, y1):
        q = orient(Polygon(self.ring([(x0, y0), (x1, y0), (x1, y1), (x0, y1)])), 1.0)
        return [[r2(a), r2(b)] for a, b in list(q.exterior.coords)[:-1]]


def clean(poly, minarea=4.0):
    """Simplify tiny slivers/colinear points."""
    out = []
    for p in explode(poly):
        p = p.buffer(0)
        if p.area < minarea:
            continue
        p = p.simplify(0.02)
        out += [q for q in explode(p) if q.area >= minarea]
    return out


# --------------------------------------------------------------------------
# elevation measurements
# --------------------------------------------------------------------------
def measure_elevations(msp):
    """Measure vertical datums, roof, chimney, grade from the elevation drawings.
    Returns dict (all in DXF Y / elevation-x coordinates, converted later)."""
    M = {}
    lines = [(e.dxf.layer, e.dxf.start, e.dxf.end) for e in msp.query('LINE')]

    def horiz(layer, x0, x1, y0, y1, minlen):
        r = []
        for L, a, b in lines:
            if L == layer and abs(a.y - b.y) < 0.02 and y0 <= a.y <= y1 \
                    and min(a.x, b.x) >= x0 and max(a.x, b.x) <= x1 and abs(a.x - b.x) >= minlen:
                r.append((a.y, min(a.x, b.x), max(a.x, b.x)))
        return r

    # --- right-side elevation block: x 4590..5030 (front at left) ---
    tw = horiz('A-ELEV', 4590, 4930, -2700, -2600, 250)
    M['t_wall_y'] = tw[0][0]                       # top of basement wall / bottom of floor framing
    M['elev_front_x'] = tw[0][1]                   # elevation x of the front wall face
    M['elev_rear_x'] = tw[0][2]
    M['floor_framing'] = 9.25                      # from the level marks ("9 1/4"")
    M['subfloor_y'] = M['t_wall_y'] + M['floor_framing']

    # slab (S-FNDN): basement floor surface and slab underside
    sf = sorted({round(y, 2) for y, a, b in horiz('S-FNDN', 4590, 5030, -2800, -2760, 100)}, reverse=True)
    M['bsmt_floor_y'] = sf[0]
    M['slab_thk'] = round(sf[0] - sf[1], 2)

    # roof: the long rake lines on A-ELEV through the apex
    best = None
    for L, a, b in lines:
        if L == 'A-ELEV' and 4590 < a.x < 4940 and 4590 < b.x < 4940 and -2500 < a.y < -2300 and -2500 < b.y < -2300:
            dx, dy = b.x - a.x, b.y - a.y
            if abs(dx) > 100 and abs(dy) > 60:
                top = max(a.y, b.y)
                tipx = a.x if a.y < b.y else b.x
                if tipx < 4760:
                    continue              # top-surface line is drawn on the right (rear) slope
                if best is None or top > best[0]:
                    best = (top, a, b)
    top, a, b = best
    apex, tip = (a, b) if a.y > b.y else (b, a)
    M['ridge_y'] = apex.y
    M['ridge_x'] = apex.x
    M['pitch'] = abs(tip.y - apex.y) / abs(tip.x - apex.x) * 12
    M['eave_tip_x'] = tip.x
    M['eave_tip_y'] = tip.y
    # chimney top: top of the brick shaft (vertical lines, A-ELEV, x ~4742/4778)
    ct = [max(a.y, b.y) for L, a, b in lines if L == 'A-ELEV' and abs(a.x - b.x) < .01
          and 4735 < a.x < 4785 and abs(a.y - b.y) > 30]
    M['chimney_top_y'] = max(ct)
    cx = sorted({round(a.x, 2) for L, a, b in lines if L == 'A-ELEV' and abs(a.x - b.x) < .01
                 and 4735 < a.x < 4785 and abs(a.y - b.y) > 30})
    M['chimney_x'] = (cx[0], cx[-1])
    # rafter underside at the apex (A-ELEV-DETL line)
    under = []
    for L, a, b in lines:
        if L == 'A-ELEV-DETL' and 4590 < a.x < 4940 and 4590 < b.x < 4940:
            dx, dy = b.x - a.x, b.y - a.y
            if abs(dx) > 100 and abs(dy) > 60 and abs(min(a.x, b.x) - 4597.5) < 3:
                under.append(max(a.y, b.y))
    M['roof_underside_apex_y'] = max(under) if under else apex.y - 6.9

    # front elevation: rake overhang (cornice line vs wall base line)
    base = horiz('A-ELEV', 3900, 4420, -2700, -2600, 100)
    xs0 = min(b[1] for b in base)
    xs1 = max(b[2] for b in base)
    M['front_elev_wall_x'] = (xs0, xs1)
    cor = horiz('A-ELEV-DETL', 3900, 4420, -2490, -2470, 300)
    M['front_elev_roof_x'] = (min(c[1] for c in cor), max(c[2] for c in cor))
    # grade (layer V): front grade in the front elevation
    gv = [(a.y, a.x, b.x) for L, a, b in lines if L == 'V' and abs(a.y - b.y) < .01 and 3900 < a.x < 4420 and abs(a.x - b.x) > 300]
    M['grade_front_y'] = gv[0][0]
    gr = [(a.y, a.x, b.x) for L, a, b in lines if L == 'V' and abs(a.y - b.y) < .01 and 5200 < a.x < 5560 and abs(a.x - b.x) > 200]
    M['grade_rear_y'] = gr[0][0]
    # frieze (Option 1) band: OPT1-DETL lower edge & MEDM upper edge in front elevation
    fr_top = [a.y for L, a, b in lines if L == 'A-ELEV-MEDM' and abs(a.y - b.y) < .01 and 3900 < a.x < 4420 and abs(a.x - b.x) > 300]
    fr_bot = [a.y for L, a, b in lines if L == 'A-ELEV-OPT1-DETL' and abs(a.y - b.y) < .01 and 3900 < a.x < 4420
              and abs(a.x - b.x) > 300 and a.y < -2500]
    M['frieze_top_y'] = max(fr_top)
    M['frieze_bot_y'] = min(fr_bot)
    pil = [(a.x, b.x) for L, a, b in lines if L == 'A-ELEV-OPT1' and abs(a.y - b.y) < .01 and 4590 < a.x < 4630]
    # frieze projection: OPT1 vertical at 4600.57 vs wall 4602.5
    M['frieze_projection'] = round(M['elev_front_x'] - min(
        a.x for L, a, b in lines if L == 'A-ELEV-OPT1' and abs(a.x - b.x) < .01 and 4595 < a.x < 4605), 2)

    # wing shed roof (right-side elevation): top-surface line, slope ~ 2.7/12
    wl = None
    for L, a, b in lines:
        if L == 'A-ELEV' and 4915 < min(a.x, b.x) and max(a.x, b.x) < 5030 and -2560 < a.y < -2500 \
                and abs(a.y - b.y) > 10 and abs(a.x - b.x) > 50:
            wl = (a, b)
    lo, hi = (wl[0], wl[1]) if wl[0].x < wl[1].x else (wl[1], wl[0])
    # line runs from the main wall (high) down to the fascia (low)
    # rear shed dormer: the shallow A-ELEV line right of the chimney (top surface), rear wall top = pilaster top
    dl = [(a, b) for L, a, b in lines if L == 'A-ELEV' and 4770 < min(a.x, b.x) and max(a.x, b.x) < 4940
          and abs(a.x - b.x) > 100 and 20 < abs(a.y - b.y) < 70 and min(a.y, b.y) > -2500 and
          abs(abs(a.y - b.y) / abs(a.x - b.x) * 12 - 3.85) < 0.3]
    da, db = dl[0]
    tip, up = (da, db) if da.x > db.x else (db, da)
    M['dormer_tip'] = (tip.x, tip.y)
    M['dormer_slope'] = (up.y - tip.y) / (tip.x - up.x)
    M['rear_wall_top_y'] = max(max(a.y, b.y) for L, a, b in lines if L == 'A-ELEV' and abs(a.x - b.x) < .01
                               and 4917 < a.x < 4920 and abs(a.y - b.y) > 30)
    M['wing_slope'] = abs(hi.y - lo.y) / abs(hi.x - lo.x) * 12
    M['wing_hi'] = lo if lo.y > hi.y else hi
    M['wing_lo'] = hi if lo.y > hi.y else lo
    wfascia = [(y, x0, x1) for y, x0, x1 in horiz('A-ELEV', 4915, 5030, -2560, -2525, 80)]
    M['wing_fascia_end_x'] = max(w[2] for w in wfascia)
    M['wing_wall_top_y'] = max(y for y, x0, x1 in horiz('A-ELEV-DETL', 4915, 5030, -2560, -2535, 80)
                               if y < -2540)
    return M


# --------------------------------------------------------------------------
# elevation details (dormer extent, wing hip roof, grade profiles, trim)
# --------------------------------------------------------------------------
def elevation_segments(msp):
    """All straight segments (layer, start, end) of the elevation area: LINE, (LW)POLYLINE and the contents of blocks
    (the corner pilasters are blocks). Block content on layer 0 takes the INSERT's layer."""
    segs = []

    def walk(e, layer, depth):
        t = e.dxftype()
        lay = e.dxf.layer if e.dxf.layer != '0' else layer
        if t == 'LINE':
            segs.append((lay, e.dxf.start, e.dxf.end))
        elif t in ('LWPOLYLINE', 'POLYLINE'):
            for v in e.virtual_entities():
                if v.dxftype() == 'LINE':
                    segs.append((lay, v.dxf.start, v.dxf.end))
        elif t == 'INSERT' and depth < 3:
            for v in e.virtual_entities():
                walk(v, lay, depth + 1)

    for e in msp.query('LINE LWPOLYLINE POLYLINE INSERT'):
        if e.dxftype() == 'INSERT':
            p = e.dxf.insert
            if not (3800 < p.x < 6400 and -2900 < p.y < -2300):
                continue
        walk(e, e.dxf.layer, 0)
    return segs


class Face:
    """One elevation drawing. u = DXF x - centre (inches, +u to the right as drawn from outside), Y from the subfloor.

    The centre is the middle of the corner-pilaster outer edges (A-ELEV-OPT1 verticals), which every elevation draws
    symmetrically about the main block."""
    RANGES = {'front': (3900, 4430), 'right': (4520, 5120), 'rear': (5100, 5700), 'left': (5640, 6300)}

    def __init__(self, msp, name, sub_y):
        self.name, self.sub = name, sub_y
        x0, x1 = self.RANGES[name]
        self.lines = [(L, a, b) for L, a, b in elevation_segments(msp) if x0 <= min(a.x, b.x) and max(a.x, b.x) <= x1]
        pil = sorted({round(a.x, 1) for L, a, b in self.lines if L == 'A-ELEV-OPT1' and abs(a.x - b.x) < .01
                      and abs(a.y - b.y) > 100 and min(a.y, b.y) < sub_y < max(a.y, b.y)})
        self.c = 0.5 * (pil[0] + pil[-1])

    def segs(self, layer, horizontal=None, y=None, tol=0.15, u0=-1e9, u1=1e9, minlen=0.0):
        """(u_a, u_b, Y_a, Y_b) of straight segments on `layer` (None = any), optionally horizontal/vertical at height/offset."""
        out = []
        for L, a, b in self.lines:
            if layer and L != layer:
                continue
            ua, ub, ya, yb = a.x - self.c, b.x - self.c, a.y - self.sub, b.y - self.sub
            if horizontal is True and abs(ya - yb) > .02:
                continue
            if horizontal is False and abs(ua - ub) > .02:
                continue
            if y is not None and abs((ya if horizontal else ua) - y) > tol:
                continue
            if min(ua, ub) < u0 or max(ua, ub) > u1 or math.hypot(ua - ub, ya - yb) < minlen:
                continue
            out.append((ua, ub, ya, yb))
        return out


def grade_splines(msp, x0, x1, to_z, sub_y):
    """The V-layer grade splines inside the x range, each as [(z, Y), ...] sorted from high z to low z."""
    out = []
    for e in msp.query('SPLINE'):
        if e.dxf.layer != 'V' or not (-2800 <= list(e.flattening(0.5))[0].y <= -2600):
            continue
        p = [(to_z(q.x), q.y - sub_y) for q in e.flattening(0.1)]
        if x0 <= min(q.x for q in e.flattening(0.5)) and max(q.x for q in e.flattening(0.5)) <= x1:
            out.append(sorted(p, key=lambda t: -t[0]))
    return out


def sample(spline, zs):
    """Linear interpolation of a [(z, Y)] polyline (z descending) at the given z values."""
    zz = [p[0] for p in spline][::-1]
    yy = [p[1] for p in spline][::-1]
    def f(z):
        if z >= zz[-1]:
            return yy[-1]
        if z <= zz[0]:
            return yy[0]
        for i in range(len(zz) - 1):
            if zz[i] <= z <= zz[i + 1]:
                t = (z - zz[i]) / (zz[i + 1] - zz[i])
                return yy[i] + t * (yy[i + 1] - yy[i])
    return [[round(z, 1), round(f(z), 2)] for z in zs]


def measure_details(msp, SUB, W, D, wing):
    """Everything the builders need beyond the plan: dormer extent, wing hip roof, porch/fence, terrain, trim."""
    F = {n: Face(msp, n, SUB) for n in Face.RANGES}
    out = {}
    hx = W / 2.0                      # house x of the face centre (u = hx - x on the rear elevation)

    # ---- rear shed dormer: cheek-wall outer faces and roof edges (rear elevation, symmetric about the centre) ----
    r = F['rear']
    spans = lambda y0, y1: (lambda s: abs(min(s[2], s[3]) - y0) < 0.3 and abs(max(s[2], s[3]) - y1) < 0.3)
    roof_edge = list(filter(spans(227.9, 275.1), r.segs('A-ELEV', horizontal=False)))
    cheek = list(filter(spans(184.8, 217.6), r.segs('A-ELEV', horizontal=False)))
    ru = max(abs(s[0]) for s in roof_edge)
    cu = max(abs(s[0]) for s in cheek)
    out['dormer'] = dict(xMin=round(hx - cu, 2), xMax=round(hx + cu, 2), roofXMin=round(hx - ru, 2), roofXMax=round(hx + ru, 2))

    # ---- wing hip roof (rear elevation: eave line and hip lines; right elevation: eave end) ----
    hip = list(filter(lambda s: spans(120.5, 141.7)(s) and abs(s[0] - s[1]) > 100, r.segs('A-ELEV')))
    eave_u = max(max(abs(s[0]), abs(s[1])) for s in hip)
    apex_y = max(max(s[2], s[3]) for s in hip)
    ri = F['right']
    far = list(filter(spans(120.5, 140.7), ri.segs('A-ELEV')))
    far_u = max(max(s[0], s[1]) for s in far)
    fascia = max(max(s[0], s[1]) for s in ri.segs('A-ELEV', horizontal=True, y=120.5, u0=150))
    out['wingHip'] = dict(x0=round(hx - eave_u, 2), x1=round(hx + eave_u, 2), zFar=round(-(far_u + D / 2.0), 2),
                          apex=[round(hx, 2), round(-D, 2)], apexY=round(apex_y, 2), eaveY=120.5,
                          fascia=round(fascia - far_u, 2))
    out['wingWallTopY'] = round(max(s[2] for s in r.segs('A-ELEV-DETL', horizontal=True, y=110.1)), 2)

    # ---- grade profiles: [z, Y] along the left and right faces (z = 0 at the front wall face, - toward the rear) ----
    left_to_z = lambda x: x - (F['left'].c + D / 2.0)
    right_to_z = lambda x: -(x - (F['right'].c - D / 2.0))
    ls = grade_splines(msp, 5600, 6400, left_to_z, SUB)
    rs = grade_splines(msp, 4500, 5100, right_to_z, SUB)
    # left: front lawn, the long side spline (z 0 -> -316), the flat terrace behind the house (V line y=-48.2), the falling spline
    l_side = [sp for sp in ls if abs(sp[0][0]) < 1 and sp[-1][0] < -300][0]
    l_fall = [sp for sp in ls if sp[0][0] < -380][0]
    r_side = [sp for sp in rs if abs(sp[0][0]) < 1 and sp[-1][0] < -200][0]
    r_low1 = [sp for sp in rs if -210 < sp[0][0] < -200][0]
    r_low2 = [sp for sp in rs if sp[-1][0] < -440][0]
    terrace_y = round(sample(l_side, [-316.0])[0][1], 2)
    out['terrain'] = dict(
        left=[[400.0, -23.4]] + sample(l_side, [0, -13, -65, -116, -165, -213, -262, -316]) + [[-387.3, -48.17]]
             + sample(l_fall, [-404, -430, -470, -505, -535, -558, -567.6]) + [[-900.0, -87.15]],
        right=[[400.0, -24.12], [72.0, -24.12]] + sample(r_side, [0, -46, -98, -154, -213.3])
              + sample(r_low1, [-227, -250, -283, -328.9]) + sample(r_low2, [-447.1]) + [[-900.0, -90.0]],
        terraceY=terrace_y)
    out['faces'] = {n: round(f.c, 2) for n, f in F.items()}
    return out


def window_insert_levels(msp):
    """Y of elevation window blocks by schedule type (A,B,C,D) -> list of insert y."""
    names = {'*U330': 'A', '*U331': 'B', '*U337': 'C', '*U156': 'D'}
    res = collections.defaultdict(list)
    for e in msp.query('INSERT'):
        if e.dxf.layer == 'A-ELEV' and e.dxf.name in names and -2800 < e.dxf.insert.y < -2400 and e.dxf.insert.x < 7000:
            res[names[e.dxf.name]].append(round(e.dxf.insert.y, 2))
    return res


# --------------------------------------------------------------------------
# DXF plan regions (model-space boxes: xmin, ymin, xmax, ymax)
# --------------------------------------------------------------------------
REG = {
    'basement': (4770, -3700, 5190, -3370),
    'first': (5490, -3845, 5940, -3370),
    'second': (6240, -3790, 6690, -3370),
}


def snap_lines(lines, tol=0.3):
    reps = []

    def rep(p):
        for r in reps:
            if abs(r[0] - p[0]) <= tol and abs(r[1] - p[1]) <= tol:
                return r
        reps.append(p)
        return p
    out = []
    for l in lines:
        q = [rep(p) for p in l]
        q = [p for i, p in enumerate(q) if i == 0 or p != q[i - 1]]
        for a, b in zip(q, q[1:]):
            out.append(LineString([a, b]))
    return out


def layer_polylines(msp, layer, reg):
    out = []
    for e in msp.query('*[layer=="%s"]' % layer):
        pts = []
        if e.dxftype() == 'LINE':
            pts = [(e.dxf.start.x, e.dxf.start.y), (e.dxf.end.x, e.dxf.end.y)]
        elif e.dxftype() == 'LWPOLYLINE':
            pts = [(p[0], p[1]) for p in e.get_points()]
            if e.closed:
                pts.append(pts[0])
        if pts and in_region(pts, reg):
            out.append(pts)
    return out


def main_block_rect(msp, reg, level):
    """Find the main block's outer rectangle (xmin, ymin, xmax, ymax) in DXF coords
    from the A-WALL-N line work: the coordinates carrying the most wall length."""
    segs = layer_polylines(msp, 'A-WALL-N', reg)
    H = collections.Counter()
    V = collections.Counter()
    for pts in segs:
        for a, b in zip(pts, pts[1:]):
            L = math.hypot(a[0] - b[0], a[1] - b[1])
            if abs(a[1] - b[1]) < .05:
                H[round(a[1], 1)] += L
            elif abs(a[0] - b[0]) < .05:
                V[round(a[0], 1)] += L
    # front = lowest-y coordinate with big total length (steps/outer lines are shorter)
    front = min((y for y, l in H.items() if l > 150 and y > -3800), default=None)
    left = min((x for x, l in V.items() if l > 150), default=None)
    right = max((x for x, l in V.items() if l > 150), default=None)
    # rear: coordinate near front+315 carrying wall length
    cand = [(l, y) for y, l in H.items() if abs(y - (front + 315)) < 4]
    rear = max(cand)[1]
    return (left, front, right, rear)


# --------------------------------------------------------------------------
# per-level geometry
# --------------------------------------------------------------------------
def foundation_walls(msp):
    """Exterior basement walls from S-FNDN.  The loose lines are not closed rings,
    so rebuild: (outer outline - inner outline) minus the window gaps (places where
    the inner face line is missing)."""
    reg = (4700, -3800, 5300, -3200)
    segs = []
    for e in msp.query('LINE[layer=="S-FNDN"]'):
        a, b = e.dxf.start, e.dxf.end
        if in_region([(a.x, a.y), (b.x, b.y)], reg):
            segs.append(((a.x, a.y), (b.x, b.y)))
    # main block outer rectangle & wing outer rectangle from the long lines
    xs = sorted({round(p[0], 2) for s in segs for p in s})
    ys = sorted({round(p[1], 2) for s in segs for p in s})
    x0, x1 = 4768.05, 5176.05
    y0, y1 = -3782.0, -3466.99
    # sanity: these must occur in the data
    assert any(abs(p[0] - x0) < .1 for s in segs for p in s)
    assert any(abs(p[1] - y0) < .1 for s in segs for p in s)
    t = 10.0
    wx0 = 4881.84
    wx1 = 5117.92
    wy1 = -3377.98
    for v in (wx0, wx1):
        assert any(abs(p[0] - v) < .1 for s in segs for p in s), v
    outer = unary_union([box(x0, y0, x1, y1), box(wx0, y1 - 1, wx1, wy1)])
    inner = unary_union([box(x0 + t, y0 + t, x1 - t, y1 - t), box(wx0 + t, y1 - t - 1, wx1 - t, wy1 - t)])
    ring = outer.difference(inner)
    # window gaps: walk the inner outline edges; where no S-FNDN line covers it -> gap
    inner_lines = [LineString(s) for s in segs]
    cover = unary_union(inner_lines).buffer(0.3)
    gaps = []
    coords = list(inner.exterior.coords)
    for (ax, ay), (bx, by) in zip(coords, coords[1:]):
        ed = LineString([(ax, ay), (bx, by)])
        un = ed.difference(cover)
        for g in explode_lines(un):
            if g.length > 12:
                gaps.append(g)
    cut = []
    for g in gaps:
        cut.append(g.buffer(t + 0.5, cap_style=2))
    walls = ring.difference(unary_union(cut)) if cut else ring
    return clean(walls), (x0, y0, x1, y1), (wx0, y1, wx1, wy1), gaps


def explode_lines(g):
    if g.is_empty:
        return []
    if isinstance(g, LineString):
        return [g]
    if hasattr(g, 'geoms'):
        r = []
        for s in g.geoms:
            r += explode_lines(s)
        return r
    return []


def hinge_axis(W, hx, hy, r, bb):
    """Pick the wall axis for a door: the direction where wall material continues
    right past the leaf length."""
    cx = (bb[0] + bb[2]) / 2
    cy = (bb[1] + bb[3]) / 2
    dxs = 1 if cx > hx else -1
    dys = 1 if cy > hy else -1
    Wb = W.buffer(1.0)
    cands = []
    for ax in ((dxs, 0), (0, dys)):
        p = Point(hx + ax[0] * (r + 3), hy + ax[1] * (r + 3))
        cands.append((Wb.contains(p), ax))
    hit = [a for ok, a in cands if ok]
    if len(hit) == 1:
        return hit[0]
    # ambiguous (e.g. wall on both): prefer axis whose far point is closer to wall
    ds = []
    for ok, ax in cands:
        p = Point(hx + ax[0] * (r + 3), hy + ax[1] * (r + 3))
        ds.append((W.distance(p), ax))
    return min(ds)[1]


def door_blocks(msp, reg):
    res = []
    for e in msp.query('INSERT'):
        if e.dxf.layer != 'A-DOOR':
            continue
        p = e.dxf.insert
        if not (reg[0] <= p.x <= reg[2] and reg[1] <= p.y <= reg[3]):
            continue
        ents = list(e.virtual_entities())
        arcs = [a for a in ents if a.dxftype() == 'ARC']
        if not arcs:
            continue
        r = arcs[0].dxf.radius
        b = ezbbox.extents(ents)
        res.append(dict(name=e.dxf.name, hx=p.x, hy=p.y, r=r,
                        bb=(b.extmin.x, b.extmin.y, b.extmax.x, b.extmax.y)))
    return res


def glaz_tags(msp, reg):
    tags = []
    for e in msp.query('INSERT'):
        if e.dxf.layer in ('A-GLAZ-IDEN', 'A-DOOR-IDEN'):
            p = e.dxf.insert
            if reg[0] <= p.x <= reg[2] and reg[1] <= p.y <= reg[3]:
                letter = None
                for a in e.attribs:
                    if a.dxf.text.strip():
                        letter = a.dxf.text.strip()
                tags.append((p.x, p.y, letter, e.dxf.layer, e.dxf.name))
    return tags


def room_labels(msp, reg):
    out = []
    for e in msp.query('MTEXT[layer=="A-ROOM-IDEN"]'):
        p = e.dxf.insert
        if reg[0] <= p.x <= reg[2] and reg[1] <= p.y <= reg[3]:
            t = e.text
            if ';' in t:
                t = t.split(';', 1)[1]
            t = t.replace('\\P', ' ').strip()
            out.append((t, p.x, p.y))
    return out


STYLE = {
    'A': ('double-hung', [3, 2]),
    'C': ('double-hung', [3, 2]),
    'B': ('casement', [3, 3]),
    'D': ('awning', [3, 1]),
}
RO = {  # rough opening (width, height) from the schedule
    'A': (38.25, 68.0), 'B': (37.0, 54.5625), 'C': (38.25, 60.0), 'D': (37.0, 18.5625),
    'E': (38.0, 86.5), 'F': (38.0, 86.5),
}


def wall_edges(U):
    """Straight edges of polygon U's exterior ring."""
    c = list(U.exterior.coords)
    out = []
    for a, b in zip(c, c[1:]):
        if math.hypot(a[0] - b[0], a[1] - b[1]) > 12:
            out.append((a, b))
    return out


def find_openings_ext(extwall, U, tag_list, doors, t, label):
    """Gaps along the centreline of each outer edge of footprint U."""
    ops = []
    EW = extwall.buffer(0.35)
    for a, b in wall_edges(U):
        dx, dy = b[0] - a[0], b[1] - a[1]
        L = math.hypot(dx, dy)
        ux, uy = dx / L, dy / L
        # inward normal of a CCW ring is left of travel
        nx, ny = -uy, ux
        # make sure it points into U
        mid = ((a[0] + b[0]) / 2 + nx * 1.0, (a[1] + b[1]) / 2 + ny * 1.0)
        if not U.contains(Point(mid)):
            nx, ny = -nx, -ny
        pa = (a[0] + nx * t / 2, a[1] + ny * t / 2)
        pb = (b[0] + nx * t / 2, b[1] + ny * t / 2)
        probe = LineString([pa, pb])
        gap = probe.difference(EW)
        for g in explode_lines(gap):
            if g.length < 12:
                continue
            c0, c1 = g.coords[0], g.coords[-1]
            # skip stretches that touch the probe ends where the wall actually ends at a corner
            ops.append(dict(c=((c0[0] + c1[0]) / 2, (c0[1] + c1[1]) / 2), w=g.length,
                            ux=ux, uy=uy, nx=nx, ny=ny))
    return ops


STAIR_RISERS = 15
STAIR_Z = (-138.0, -183.0)       # plan band (z) shared by both flights


def stair_flights(msp, XF, bsmt_floor, floor2):
    """The two straight flights share one plan band (z -138..-183) and run toward +x:
    basement -> first (drawn on the basement plan, top arrives at the first-floor 'DOWN' end) and
    first -> second (drawn on the first plan 'UP' end and continued on the second plan).
    Returns {level id: (x0, x1, bottomY, topY)}; x are house coords.
    The flight x-extent is the span of its 9.8" tread lines on the plans (A-WALL-N verticals 40-52" long)."""
    def tread_x(k, xmin, xmax):
        reg = REG[k]
        xs = [e.dxf.start.x - XF[k].ox for e in msp.query('LINE[layer=="A-WALL-N"]')
              if abs(e.dxf.start.x - e.dxf.end.x) < .05 and 40 < abs(e.dxf.start.y - e.dxf.end.y) < 52
              and reg[0] < e.dxf.start.x < reg[2] and reg[1] < e.dxf.start.y < reg[3]
              and xmin <= e.dxf.start.x - XF[k].ox <= xmax and -3650 < e.dxf.start.y < -3590]
        return min(xs), max(xs)
    b0, _ = tread_x('basement', 150, 400)         # first basement tread line
    u0, _ = tread_x('first', 150, 260)            # first line of the UP flight
    _, d1 = tread_x('first', 260, 400)            # last line of the DOWN end = top of the basement flight
    _, s1 = tread_x('second', 150, 400)           # last line of the flight on the second plan
    note('Stairs: two straight 15-riser flights in one plan band (z %.0f..%.0f). Basement->first x %.1f..%.1f; first->second '
         'x %.1f..%.1f (tread lines of the three plans; the S-turn note on the first plan is a handrail note).'
         % (STAIR_Z[0], STAIR_Z[1], b0, d1, u0, s1))
    return {'basement': (b0, d1, bsmt_floor, 0.0), 'first': (u0, s1, 0.0, floor2)}


# Trim profiles measured from the Option 1 elevations (A-ELEV-OPT1*, all inches, Y from the subfloor). Bands are
# [y0, y1, proud] boards stacked up the face; capital bands are [y0, y1, grow] (extra width per side, proud = pilaster proud + grow).
TRIM = dict(
    waterTable=dict(y0=-9.25, y1=-1.2, proud=1.0),
    pilaster=dict(width=19.4, proud=2.0, baseY=-9.25, shaftTopY=133.2,
                  capital=[[133.2, 139.0, 0.5], [139.0, 140.8, 1.2], [140.8, 146.1, 3.3]],
                  panel=dict(y0=-1.2, y1=126.4, width=9.6, innerWidth=7.0, innerInset=1.2, proud=0.5)),
    entablature=dict(bands=[[146.1, 155.7, 2.0], [155.7, 157.6, 3.3], [157.6, 167.2, 2.0]],
                     cornice=dict(y0=167.2, y1=171.2, proud=5.6), bandReturn=19.4, corniceReturn=27.3),
    dormerCornice=dict(bands=[[217.6, 222.5, 0.8], [222.5, 223.6, 4.2]], cornerBoard=dict(width=6.0, y0=184.8, y1=217.6, proud=1.0)),
    wingCornice=dict(bands=[[110.1, 115.0, 1.9], [115.0, 119.4, 5.3]]),
    # outer / sillWider are per-SIDE distances beyond the rough opening: drawn casing 44.4" (= RO 38.25 + 2 x 3.075), drawn sill
    # 46.9" (= RO + 2 x 4.325, i.e. 1.25" past the casing each side), sill 2.75" deep.
    casing=dict(side=5.0, outer=3.075, headHeight=5.1, headAboveOpening=2.8, proud=1.0, sillHeight=2.75, sillWider=4.325,
                sillProud=2.5, dripProud=1.8),
    doorSurround=dict(pilasterX=[21.5, 31.1], pilasterY=[3.3, 79.6], baseY=[-5.8, 0.8], capitalTopY=88.2, headY=[88.2, 97.2],
                      corniceY=[98.5, 102.4], corniceHalfWidth=[36.8, 39.0], proud=2.0),
)


def build(dxf_path, out_path):
    doc = ezdxf.readfile(dxf_path)
    msp = doc.modelspace()
    M = measure_elevations(msp)

    # ---- vertical datums (house Y = elevation/model y - subfloor_y) ----
    SUB = M['subfloor_y']
    Yh = lambda y: y - SUB
    bsmt_floor = -(108.0 + M['floor_framing'])   # 9' below T-WALL minus 9 1/4" framing (drawn slab line gives %.2f)
    bsmt_floor_drawn = Yh(M['bsmt_floor_y'])
    ceil_b = ceil_1 = 108.0
    ceil_2 = 100.0
    floor2 = ceil_1 + M['floor_framing']
    note('Datum: elevation T-WALL line y=%.2f; subfloor = T-WALL + 9 1/4" => Y=0 at DXF y=%.2f. '
         'Basement floor Y=%.2f (9\' below T-WALL; the drawn slab line is at %.2f), second floor Y=%.2f (9\' + 9 1/4").'
         % (M['t_wall_y'], SUB, bsmt_floor, bsmt_floor_drawn, floor2))

    levels = []
    alignment = {}

    # ============ plan origins ============
    rect = {}
    rect['first'] = main_block_rect(msp, REG['first'], 'first')
    rect['second'] = main_block_rect(msp, REG['second'], 'second')
    fwalls, fmain, fwing, fgaps = foundation_walls(msp)
    rect['basement'] = fmain
    for k in ('basement', 'first', 'second'):
        r = rect[k]
        alignment[k] = dict(left=r[0], front=r[1], right=r[2], rear=r[3], W=r[2] - r[0], D=r[3] - r[1])
    W_main = alignment['first']['W']
    D_main = alignment['first']['D']
    res = {k: dict(dW=alignment[k]['W'] - W_main, dD=alignment[k]['D'] - D_main) for k in alignment}
    note('Main block outer rectangle per plan (DXF in): ' + '; '.join(
        '%s %.2f x %.2f' % (k, alignment[k]['W'], alignment[k]['D']) for k in alignment) +
        '. Size residual vs first floor: ' + ', '.join('%s dW=%.2f dD=%.2f' % (k, v['dW'], v['dD']) for k, v in res.items()))
    note('Plan alignment (offset of each plan from the first-floor plan, in): basement dx=%.2f, second dx=%.2f; '
         'front-face y offset basement=%.2f second=%.2f (all three share the same front-wall y). '
         'Each plan is translated by its own left/front outer corner, so the three main blocks coincide exactly.'
         % (alignment['basement']['left'] - alignment['first']['left'],
            alignment['second']['left'] - alignment['first']['left'],
            alignment['basement']['front'] - alignment['first']['front'],
            alignment['second']['front'] - alignment['first']['front']))
    # use the first-floor measured block as THE house outline for all levels (they agree to <=0.1")
    W = round(W_main, 2)
    D = round(D_main, 2)
    XF = {k: Xf(alignment[k]['left'], alignment[k]['front']) for k in alignment}
    DET = measure_details(msp, SUB, W, D, None)
    dorm = DET['dormer']

    # wing rectangle (house coords) from the foundation (matches first-floor wing to ~0.2")
    wing_x0 = fwing[0] - alignment['basement']['left']
    wing_x1 = fwing[2] - alignment['basement']['left']
    wing_depth = fwing[3] - fwing[1]
    note('Rear wing: x %.2f..%.2f, depth %.2f (from the basement foundation S-FNDN; first-floor wing walls agree).'
         % (wing_x0, wing_x1, wing_depth))

    # footprint polygons in DXF coords of each plan
    def footprint(k, wing):
        l, f, r, rr = rect[k]
        p = box(l, f, r, rr)
        if wing:
            wl = l + wing_x0
            wr = l + wing_x1
            p = unary_union([p, box(wl, rr - 1, wr, rr + wing_depth)])
        return p

    tags_all = {k: glaz_tags(msp, (REG[k][0] - 20, REG[k][1] - 80, REG[k][2] + 40, REG[k][3] + 40)) for k in REG}
    doors_all = {k: door_blocks(msp, REG[k]) for k in REG}

    notes_open = []

    def make_level(k):
        xf = XF[k]
        has_wing = k in ('basement', 'first')
        ext_t = 6.0
        reg = REG[k]
        lvl = dict(walls=[], openings=[], stairs=[], fixtures=[], rooms=[])
        # ---------- walls ----------
        if k == 'basement':
            ext_polys = fwalls
            hp = [g for g in hatch_polys(msp, 'A-WALL-PATT', reg)]
            fu = unary_union(ext_polys).buffer(0.4)
            allw = unary_union(hp)
            int_polys = clean(allw.difference(fu), 6.0)
            U = footprint(k, True)
            extwall = unary_union(ext_polys)
            ext_t_here = 10.0
        else:
            hp = hatch_polys(msp, 'A-WALL-PATT', reg)
            U = footprint(k, has_wing)
            allw = unary_union(hp).intersection(U.buffer(0.3))
            ring = U.difference(U.buffer(-(ext_t + 0.4)))
            extwall = allw.intersection(ring)
            ext_polys = clean(extwall, 6.0)
            int_polys = clean(allw.difference(ring), 6.0)
            extwall = unary_union(ext_polys)
            ext_t_here = ext_t
        wall_union = unary_union(ext_polys + int_polys)

        # second-floor: roof clips walls; front/rear exterior walls stop under the eave
        eave_y = Yh(M['ridge_y']) - (M['pitch'] / 12.0) * (D / 2.0)
        eave_under = eave_y - M['roof_thk']

        def roof_under_height(z):
            """Roof underside Y over plan z (front slope).  Behind the ridge the rear shed dormer keeps the
            underside above the 100" ceiling, so partitions there stay full height."""
            if z <= -D / 2.0:
                return float('inf')
            return eave_under + (M['pitch'] / 12.0) * -z
        front_top = Yh(M['frieze_top_y'])        # front wall / frieze top
        rear_top = Yh(M['rear_wall_top_y'])      # rear (dormer) wall top

        def add_wall(p, exterior, height=None):
            o, h = xf.poly(p)
            w = dict(outline=o, exterior=exterior)
            if h:
                w['holes'] = h
            if height is not None:
                w['height'] = r2(height)
            lvl['walls'].append(w)

        zlev = {'basement': bsmt_floor, 'first': 0.0, 'second': floor2}[k]
        for p in ext_polys:
            if k == 'first' and p.centroid.y > XF[k].oy + D + 3:
                # one-storey wing: its walls run up to the eave cornice (Y~110), 2" above the 9' ceiling
                add_wall(p, True, DET['wingWallTopY'])
            elif k == 'second':
                # Half-storey: split corner polygons into the front wall (ends at the frieze top), the rear
                # dormer wall (ends at its cornice) and the gable walls (also cut at the frieze top; the app
                # adds the siding triangle above them up to the roof).
                _, fy, _, ry = rect[k]
                front_band = box(-1e5, fy - 1, 1e5, fy + ext_t_here + 0.4)
                rear_band = box(-1e5, ry - ext_t_here - 0.4, 1e5, ry + 1)
                # The dormer is inset from both gable ends: outside the cheek walls the rear wall stops at the
                # frieze top like the front, so the main roof can run down to the rear eave there.
                dormer_cols = box(XF[k].ox + dorm['xMin'], -1e5, XF[k].ox + dorm['xMax'], 1e5)
                for q in clean(p.intersection(front_band), 2.0):
                    add_wall(q, True, front_top - zlev)
                for q in clean(p.intersection(rear_band).intersection(dormer_cols), 2.0):
                    add_wall(q, True, rear_top - zlev)
                for q in clean(p.intersection(rear_band).difference(dormer_cols), 2.0):
                    add_wall(q, True, front_top - zlev)
                for q in clean(p.difference(front_band).difference(rear_band), 2.0):
                    add_wall(q, True, front_top - zlev)
            else:
                add_wall(p, True)
        for p in int_polys:
            if k == 'second':
                # step the top of interior partitions under the sloping roof (6" bands near each eave)
                b = p.bounds
                zs = [xf.pt(b[0], b[1])[1], xf.pt(b[0], b[3])[1]]
                zmin, zmax = min(zs), max(zs)
                lowest = min(roof_under_height(zmin), roof_under_height(zmax))
                full = zlev + ceil_2
                if lowest >= full - 0.5:
                    add_wall(p, False)
                else:
                    # split into z bands (DXF y bands) of 6"
                    y_lo, y_hi = b[1], b[3]
                    ybands = []
                    y = y_lo
                    while y < y_hi - 1e-6:
                        ybands.append((y, min(y + 6.0, y_hi)))
                        y += 6.0
                    for ya, yb in ybands:
                        piece = p.intersection(box(b[0] - 1, ya, b[2] + 1, yb))
                        for q in explode(piece):
                            if q.area < 2:
                                continue
                            zc = xf.pt(0, (ya + yb) / 2)[1]
                            zz = [xf.pt(0, ya)[1], xf.pt(0, yb)[1]]
                            hgt = min(full, min(roof_under_height(zz[0]), roof_under_height(zz[1])) - 0.5) - zlev
                            add_wall(q, False, max(hgt, 8.0) if hgt < ceil_2 - 0.5 else None)
            else:
                add_wall(p, False)

        # ---------- floor outline ----------
        fl = footprint(k, has_wing)
        if k == 'basement':
            fl = unary_union([box(*fmain), box(fwing[0], fwing[1] - 1, fwing[2], fwing[3])])
        lvl['floor'] = [xf.poly(Polygon(list(fl.exterior.coords)))[0]]

        # ---------- exterior openings ----------
        tags = [t for t in tags_all[k] if t[2] and t[3] == 'A-GLAZ-IDEN']
        dtags = [t for t in tags_all[k] if t[3] == 'A-DOOR-IDEN']
        gaps = find_openings_ext(extwall, U, tags, doors_all[k], ext_t_here, k)
        used_door_blocks = set()
        for g in gaps:
            cx, cy = g['c']
            # nearest glazing tag (tags sit just outside the wall)
            best = None
            for tx, ty, letter, _, _ in tags:
                along = abs((tx - cx) * g['ux'] + (ty - cy) * g['uy'])
                perp = abs((tx - cx) * g['nx'] + (ty - cy) * g['ny'])
                if along < 14 and perp < 45:
                    d = along + perp * 0.1
                    if best is None or d < best[0]:
                        best = (d, letter, tx, ty)
            sym = None
            kind = 'window'
            # the fireplace opening in the left wall is not a window/door
            if k == 'first' and cx < XF[k].ox + 12 and -3649 <= cy <= -3601:
                continue
            if best:
                sym = best[1]
            else:
                # a door swing block hinged on this gap?
                for i, d in enumerate(doors_all[k]):
                    bx = (d['bb'][0] + d['bb'][2]) / 2
                    by = (d['bb'][1] + d['bb'][3]) / 2
                    if math.hypot(bx - cx, by - cy) < 40:
                        used_door_blocks.add(i)
                        kind = 'door'
                        # door letter from nearest door tag
                        bd = None
                        for tx, ty, letter, lay, nm in dtags:
                            dd = math.hypot(tx - cx, ty - cy)
                            if bd is None or dd < bd[0]:
                                bd = (dd, tx, ty)
                        break
                if kind != 'door':
                    notes_open.append('%s: unmatched gap at DXF (%.1f,%.1f) w=%.1f' % (k, cx, cy, g['w']))
                    kind = 'opening'
            # angle measured from +x toward -z == DXF plan angle (y_dxf grows toward -z)
            ang = math.atan2(g['uy'], g['ux']) % math.pi
            cxh, czh = xf.pt(cx, cy)
            o = dict(kind=kind, center=[r2(cxh), r2(czh)], width=r2(g['w']), depth=ext_t_here,
                     angle=r2(ang), exterior=True)
            if kind == 'window':
                o['sym'] = sym
            lvl['openings'].append((o, sym, kind, g))
        # doors that were not matched to an exterior gap -> interior doors (below)
        lvl['_used_doors'] = used_door_blocks
        lvl['_wall_union'] = wall_union
        lvl['_U'] = U
        lvl['_extwall'] = extwall
        lvl['_ext_t'] = ext_t_here
        return lvl

    note('Openings: window/door widths are the schedule rough openings (A 38.25, B/D 37, C 38.25, doors 38); the plan poche gap is only '
         'the glazing width, so the exterior wall pieces are cut back to the RO. The left-wall gap at the fireplace (z=-157.5) is the '
         'chimney breast, not a window. Schedule check: A 13, B 4, C 6, D 5, E 1, F 1 all match the drawings.')
    # derived roof quantities first (needs pitch etc.)
    M['roof_thk'] = 6.9      # vertical thickness of the roof slab (measured between top and underside lines)
    built = {k: make_level(k) for k in ('basement', 'first', 'second')}
    flights = stair_flights(msp, XF, bsmt_floor, floor2)

    # ---------- window vertical extents (from the elevation window blocks) ----------
    wl = window_insert_levels(msp)
    def mode(v):
        return collections.Counter(v).most_common(1)[0][0]
    # RO bottom offsets from the elevation block origin (see notes)
    off = {'A': -70.73, 'C': -65.48, 'D': -1.2, 'B': 3.83}
    sill_head = {}
    # first-floor A windows insert at ~-2556.9 ; second-floor A at ~-2445.2; D at -2503.2; C wing at -2554.5 ; C 2nd at -2445.2; B at -2732.3
    A_ins = sorted(set(wl['A']))
    C_ins = sorted(set(wl['C']))
    A1 = [y for y in A_ins if y < -2500][0]
    A2 = [y for y in A_ins if y > -2500][0]
    C1 = [y for y in C_ins if y < -2500][0]
    C2 = [y for y in C_ins if y > -2500][0]
    D_ = wl['D'][0]
    B_ = wl['B'][0]
    def sh(sym, ins, floorY):
        sill_abs = Yh(ins + off[sym])
        return sill_abs - floorY, sill_abs - floorY + RO[sym][1]
    sill_head[('first', 'A')] = sh('A', A1, 0.0)
    sill_head[('second', 'A')] = sh('A', A2, floor2)
    sill_head[('first', 'C')] = sh('C', C1, 0.0)
    sill_head[('second', 'C')] = sh('C', C2, floor2)
    sill_head[('second', 'D')] = sh('D', D_, floor2)
    sill_head[('basement', 'B')] = (42.0, 42.0 + RO['B'][1])   # "egress windows 42" AFF" (matches block: %.1f)
    b_chk = Yh(B_ + off['B']) - bsmt_floor
    note('Window sill/head (AFF) from the elevation window blocks (RO bottom = block origin %+.2f for A, %+.2f for C, %+.2f for D, '
         '%+.2f for B; RO height from the schedule): first A %.1f-%.1f, first C %.1f-%.1f, second A %.1f-%.1f, '
         'second C %.1f-%.1f, second D %.1f-%.1f, basement B 42-%.1f (elevation block gives %.1f).'
         % (off['A'], off['C'], off['D'], off['B'],
            *sill_head[('first', 'A')], *sill_head[('first', 'C')], *sill_head[('second', 'A')],
            *sill_head[('second', 'C')], *sill_head[('second', 'D')], 42.0 + RO['B'][1], b_chk))

    # ---------- finish openings, interior doors, stairs, fixtures, rooms ----------
    front_top_y = Yh(M['frieze_top_y'])
    LEVEL_META = {
        'basement': dict(id='basement', name='Basement', floorY=bsmt_floor, ceilingHeight=ceil_b,
                         floorThickness=M['slab_thk']),
        'first': dict(id='first', name='First Floor', floorY=0.0, ceilingHeight=ceil_1,
                      floorThickness=M['floor_framing']),
        'second': dict(id='second', name='Second Floor', floorY=floor2, ceilingHeight=ceil_2,
                       floorThickness=M['floor_framing']),
    }
    out_levels = []
    for k in ('basement', 'first', 'second'):
        L = built[k]
        xf = XF[k]
        lm = LEVEL_META[k]
        reg = REG[k]
        opens = []
        for o, sym, kind, g in L['openings']:
            if kind == 'window':
                if sym not in STYLE:
                    note('%s: window gap with unknown tag %r at %s' % (k, sym, o['center']))
                st, lites = STYLE[sym]
                sill, head = sill_head.get((k, sym), (None, None))
                if sill is None:
                    note('%s: no elevation measurement for window %s; using schedule heights' % (k, sym))
                    sill, head = 24.0, 24.0 + RO[sym][1]
                if sym == 'D':
                    head = min(head, front_top_y - lm['floorY'])      # brow windows end at the frieze top
                o['sill'] = r2(sill)
                o['head'] = r2(head)
                o['width'] = RO[sym][0]                               # the plan gap is the glazing; use the RO
                o['lites'] = lites
                o['style'] = st
            elif kind == 'door':
                o['sill'] = 0.0
                o['head'] = r2(RO['E'][1])
                o['width'] = RO['E'][0]
                o['style'] = 'door-panel'
            else:
                o['sill'] = 0.0
                o['head'] = 80.0
            opens.append(o)
        # --- interior (and unmatched exterior) doors from swing blocks ---
        WU = L['_wall_union']
        for i, d in enumerate(doors_all[k]):
            if i in L['_used_doors']:
                continue
            ax = hinge_axis(WU, d['hx'], d['hy'], d['r'], d['bb'])
            # gap length along the axis from the hinge
            ray = LineString([(d['hx'], d['hy']), (d['hx'] + ax[0] * (d['r'] + 12), d['hy'] + ax[1] * (d['r'] + 12))])
            inter = ray.intersection(WU)
            gl = d['r']
            if not inter.is_empty:
                gl = Point(d['hx'], d['hy']).distance(inter)
            width = gl if abs(gl - d['r']) < 8 else d['r']
            # wall thickness / centre line: probe just beyond the far jamb
            px = d['hx'] + ax[0] * (gl + 1.5)
            py = d['hy'] + ax[1] * (gl + 1.5)
            if ax[0] != 0:
                cut = LineString([(px, py - 30), (px, py + 30)])
            else:
                cut = LineString([(px - 30, py), (px + 30, py)])
            it = cut.intersection(WU)
            seg = None
            for s in explode_lines(it):
                if s.distance(Point(px, py)) < 0.6:
                    seg = s
            if seg is None:
                depth, cperp = 6.0, (d['hy'] if ax[0] != 0 else d['hx'])
            else:
                depth = seg.length
                cperp = (seg.centroid.y if ax[0] != 0 else seg.centroid.x)
            if ax[0] != 0:
                cx = d['hx'] + ax[0] * width / 2
                cy = cperp
            else:
                cx = cperp
                cy = d['hy'] + ax[1] * width / 2
            ang = (0.0 if ax[0] != 0 else math.pi / 2)
            cxh, czh = xf.pt(cx, cy)
            opens.append(dict(kind='door', center=[r2(cxh), r2(czh)], width=r2(width), depth=r2(depth),
                              angle=r2(ang), sill=0.0, head=80.0, exterior=False, style='door-panel'))
        # --- E / F lettering for the exterior doors (nearest door tag) ---
        dtags = [t for t in tags_all[k] if t[3] == 'A-DOOR-IDEN']
        for o in opens:
            if o['kind'] == 'door' and o['exterior']:
                # house -> dxf coords
                cx = o['center'][0] + xf.ox
                cy = xf.oy - o['center'][1]
                best = None
                for tx, ty, letter, lay, nm in dtags:
                    dd = math.hypot(tx - cx, ty - cy)
                    if best is None or dd < best[0]:
                        best = (dd, nm)
                # the door tags carry no attribute text; E = front door (z~0), F = back door
                o['sym'] = 'E' if abs(o['center'][1]) < 20 else 'F'
        lm['openings'] = opens
        L['walls'] = cut_openings(L['walls'], opens)

        # --- stairs (see stair_flights) ---
        stairs = []
        if k in flights:
            x0, x1, bottom, top = flights[k]
            outline = ccw([[x0, STAIR_Z[0]], [x1, STAIR_Z[0]], [x1, STAIR_Z[1]], [x0, STAIR_Z[1]]])
            stairs.append(dict(outline=outline, direction=[1.0, 0.0], bottomY=r2(bottom), topY=r2(top),
                               risers=STAIR_RISERS, width=r2(STAIR_Z[0] - STAIR_Z[1])))
        lm['stairs'] = stairs

        # --- rooms ---
        rooms = []
        for name, x, y in room_labels(msp, reg):
            if name.lower().startswith('roof below'):
                continue
            cx, cz = xf.pt(x, y)
            rooms.append(dict(name=name, label=[r2(cx), r2(cz)]))
        lm['rooms'] = rooms
        lm['walls'] = L['walls']
        lm['floor'] = L['floor']
        out_levels.append((k, lm, L))

    # ---------- fixtures ----------
    FIX = fixture_defs()
    for k, lm, L in out_levels:
        xf = XF[k]
        fx = []
        for kind, (x0, y0, x1, y1), baseY, height in FIX.get(k, []):
            if k == 'second':
                # fixtures near the front sit under the sloping ceiling: keep them below the roof underside
                z_near = xf.pt(0, y0)[1]
                under = Yh(M['ridge_y']) - M['pitch'] / 12.0 * (D / 2.0) - M['roof_thk'] + M['pitch'] / 12.0 * -z_near
                height = min(height, under - floor2 - 0.5)
            fx.append(dict(kind=kind, outline=xf.box_poly(x0, y0, x1, y1), baseY=r2(baseY), height=r2(height)))
        if k == 'first':
            # cabinets / island from the SOLID A-CASE-PATT hatches
            Wu = L['_wall_union']
            for g in hatch_polys(msp, 'A-CASE-PATT', REG[k]):
                for p in explode(g):
                    if p.area < 600:
                        continue
                    touches = p.buffer(3.0).intersects(Wu)
                    kind = 'cabinet-base' if touches else 'island'
                    o, _ = xf.poly(p.simplify(0.05))
                    fx.append(dict(kind=kind, outline=o, baseY=0.0, height=34.5))
                    fx.append(dict(kind='counter', outline=o, baseY=34.5, height=1.5))
            fx_note = ('first: base cabinets/island = SOLID A-CASE-PATT hatches (touching a wall -> cabinet-base, '
                       'free-standing -> island), 34.5" tall + 1.5" counter top.')
            note(fx_note)
        lm['fixtures'] = fx

    # ---------- assemble levels (ordered basement, first, second) ----------
    final_levels = []
    for k, lm, L in out_levels:
        lv = dict(id=lm['id'], name=lm['name'], floorY=r2(lm['floorY']), ceilingHeight=r2(lm['ceilingHeight']),
                  floorThickness=r2(lm['floorThickness']), floor=lm['floor'], walls=lm['walls'],
                  openings=lm['openings'], stairs=lm['stairs'], fixtures=lm['fixtures'], rooms=lm['rooms'])
        final_levels.append(lv)

    # ---------- roof ----------
    ridge_y = Yh(M['ridge_y'])
    pitch = M['pitch']
    half = D / 2.0
    eave_y = ridge_y - pitch / 12.0 * half
    # Overhangs: the main roof's top-surface tips sit 14.4" beyond the wall planes (rear tip x vs rear wall in the
    # side elevation; the front tip mirrors it about the ridge).
    zrear = -D
    oh_eave = round(M['eave_tip_x'] - (M['elev_front_x'] + D), 1)
    oh_rake = M['front_elev_wall_x'][0] - M['front_elev_roof_x'][0]
    plan_vs_elev = 0.5 * ((M['front_elev_wall_x'][1] - M['front_elev_wall_x'][0]) - W)
    # rear shed dormer (top surface): eave tip, and the join with the main rear slope
    tipx, tipy = M['dormer_tip']
    ds = M['dormer_slope']
    tip_z = -(tipx - M['elev_front_x'])
    tip_y = Yh(tipy)
    ms = (ridge_y - eave_y) / half
    # join distance q from the front wall: tip_y + ds*(|tip_z| - q) = ridge_y - ms*(q - D/2)
    zj = (ridge_y + ms * half - tip_y - ds * abs(tip_z)) / (ms - ds)
    join_y = ridge_y - ms * (zj - half)
    dormer = dict(zJoin=r2(-zj), joinY=r2(join_y), tipZ=r2(tip_z), tipY=r2(tip_y), wallTopY=r2(Yh(M['rear_wall_top_y'])),
                  xMin=dorm['xMin'], xMax=dorm['xMax'], roofXMin=dorm['roofXMin'], roofXMax=dorm['roofXMax'])
    note('Roof: ridge top surface Y=%.2f (=25\'-10" above the front grade Y=%.2f, as the ridge mark says); measured slope %.2f/12 '
         '(front slope and the main rear slope). thickness is VERTICAL (%.1f" between top/underside lines). eaveY=%.2f is the roof '
         'TOP surface at the front wall plane; the front wall/frieze top is Y=%.2f (frieze band Y %.2f..%.2f, crown above it up to '
         'the soffit). Eave tips project %.1f" past the wall planes; the rake overhangs %.1f" (measured from elevation faces, '
         '+~%.1f" vs the plan faces).'
         % (ridge_y, Yh(M['grade_front_y']), pitch, ridge_y - Yh(M['roof_underside_apex_y']), eave_y, Yh(M['frieze_top_y']),
            Yh(M['frieze_bot_y']), Yh(M['frieze_top_y']), oh_eave, oh_rake, plan_vs_elev))
    note('Rear shed dormer (rear/side elevations): the dormer is INSET from both gable ends - cheek-wall outer faces at x=%.1f and '
         '%.1f (%.1f" in from the gable walls), roof edges at x=%.1f / %.1f. Its roof (%.2f/12) leaves the main rear slope at z=%.1f '
         '(top Y=%.1f) and ends at an eave tip z=%.1f, Y=%.1f; its wall rises to Y=%.1f (C windows end at 202.7). Outside the cheeks '
         'the main roof (%.2f/12) runs on to the normal rear eave and the rear wall stops at the frieze top like the front.'
         % (dorm['xMin'], dorm['xMax'], dorm['xMin'], dorm['roofXMin'], dorm['roofXMax'], ds * 12, -zj, join_y, tip_z, tip_y,
            Yh(M['rear_wall_top_y']), pitch))
    # wing hip roof (rear elevation: the hip lines meet at the middle of the main rear wall; the roof also covers the porch)
    wh = DET['wingHip']
    zfar = -(D + wing_depth)
    note('Rear wing roof is a HIP (plan "Roof Below"): eave rectangle x %.1f..%.1f (%.1f" past the wing left wall, over the '
         'porch), far eave z=%.1f (fascia +%.1f"), eave top Y=%.1f, apex x=%.1f on the main rear wall z=%.1f, Y=%.1f; wing wall tops Y=%.1f.'
         % (wh['x0'], wh['x1'], wing_x0 - wh['x0'], wh['zFar'], wh['fascia'], wh['eaveY'], wh['apex'][0], wh['apex'][1],
            wh['apexY'], DET['wingWallTopY']))
    roof = dict(
        main=dict(xMin=0.0, xMax=r2(W), zFront=0.0, zRear=r2(-D), eaveY=r2(eave_y), ridgeY=r2(ridge_y),
                  pitch=r2(pitch), overhangEave=r2(oh_eave), overhangRake=13.0, thickness=r2(M['roof_thk']),
                  seamSpacing=31.25, rearDormer=dormer),
        wing=dict(xMin=r2(wing_x0), xMax=r2(wing_x1), zNear=r2(-D), zFar=r2(zfar), wallTopY=DET['wingWallTopY'],
                  hip=wh, thickness=6.0),
        frieze=dict(topY=r2(Yh(M['frieze_top_y']))),
    )
    note('seamSpacing 31.25 = ANSI31 hatch scale 250 x 0.125 used to draw the roof seams on the front elevation (drawn spacing; '
         'real standing seam would be tighter).')

    # ---------- chimney ----------
    cz = -(0.5 * (M['chimney_x'][0] + M['chimney_x'][1]) - M['elev_front_x'])
    cw = M['chimney_x'][1] - M['chimney_x'][0]
    ch_top = Yh(M['chimney_top_y'])
    chim = dict(outline=[[-24.0, r2(cz - cw / 2)], [0.0, r2(cz - cw / 2)], [0.0, r2(cz + cw / 2)], [-24.0, r2(cz + cw / 2)]],
                baseY=-52.0, topY=r2(ch_top))
    # make CCW in x/z (shoelace sign check)
    chim['outline'] = ccw(chim['outline'])
    # Wider base (left elevation A-ELEV verticals at +-27" about the shaft axis from grade up to the second subfloor Y=117.3,
    # then a chamfer to the +-18" shaft at Y=126.3): the breast runs DOWN TO GRADE at full width, it does not step in at Y=0.
    chim['breast'] = dict(outline=ccw([[-24.0, r2(cz - 27.0)], [0.0, r2(cz - 27.0)], [0.0, r2(cz + 27.0)], [-24.0, r2(cz + 27.0)]]),
                          topY=117.25, taperY=126.3)
    note('Chimney: shaft %.0f" (z) x 24" (x, outside the left wall face), centred z=%.1f; top Y=%.1f. Base set to -52 (buried, '
         'ground at the chimney is ~-48; the brick runs down to grade). chimney.breast: the base is 54" (z) wide from grade up to the '
         'second subfloor (Y=117.25), then chamfers to the 36" shaft by Y=126.3 (left elevation).'
         % (cw, cz, ch_top))

    # ---------- site ----------
    gf = Yh(M['grade_front_y'])
    gr = Yh(M['grade_rear_y'])
    xfb = XF['basement']
    rw = []
    # right-side retaining wall (S-FNDN): x 5176..5256, y -3568.7..-3555  -> from the elevation: top/bottom
    rw_top = Yh(-2683.86)
    rw_base = Yh(-2738.42)
    ret1 = Xf(alignment['basement']['left'], alignment['basement']['front']).box_poly(5176.05, -3568.72, 5256.28, -3555.01)
    rw.append(dict(outline=ret1, baseY=r2(rw_base), topY=r2(rw_top)))
    ret2 = xfb.box_poly(4881.84, -3377.98, 4895.55, -3237.42)
    rw.append(dict(outline=ret2, baseY=r2(bsmt_floor), topY=r2(rw_top)))
    # front step cheeks (brick)
    xff = XF['first']
    cheek_top = gf + 17.7
    rw.append(dict(outline=xff.box_poly(5677, -3830, 5689, -3782), baseY=r2(gf), topY=r2(cheek_top)))
    rw.append(dict(outline=xff.box_poly(5760, -3830, 5772, -3782), baseY=r2(gf), topY=r2(cheek_top)))
    note('Retaining walls: (1) right-side wall from S-FNDN (80x13.7", top Y=%.1f / base %.1f taken from the side elevation, brick-clad); '
         '(2) 12" wall at the basement walk-out stair, 140" long behind the rear wing (S-FNDN, height assumed = same top); '
         '(3,4) brick step cheeks beside the front stoop (top = grade + 17.7" from the front elevation).' % (rw_top, rw_base))
    steps = dict(outline=xff.box_poly(5689, -3840, 5760, -3782), bottomY=r2(gf), topY=-1.5, risers=3)
    note('Front steps: between the brick cheeks, 71" wide x 58" deep, 3 risers from grade Y=%.1f to the stoop (door threshold Y=0, '
         'top set -1.5).' % gf)
    # rear porch outside back door F (measured on the rear/side elevations; sits under the wing hip roof)
    porch = dict(
        deck=dict(x0=57.4, x1=113.3, z0=-404.0, z1=-313.0, topY=0.1, bottomY=-9.2),
        stair=dict(x0=-1.7, x1=57.4, z0=-377.5, z1=-315.2, risers=7, bottomY=-48.2),
        post=dict(x=64.6, z=-397.5, width=9.5, shaftY0=6.6, shaftY1=102.8, capY1=110.1, capWidth=13.3,
                  # capital read from the rear elevation (8.33 px/in crop): astragal, neck, echinus, step, abacus up to the beam underside
                  capital=[[102.8, 103.8, 10.6], [103.8, 105.4, 9.5], [105.4, 105.9, 10.2], [105.9, 107.1, 11.0], [107.1, 110.1, 13.3]]),
        rail=dict(balusterY0=4.6, balusterY1=33.3, topY=35.7, post=3.5),
        lattice=dict(y0=-36.6, y1=-11.1))
    note('Rear porch (outside back door F): deck platform x %.1f..%.1f / z %.1f..%.1f, top Y=%.1f; 7-riser stair running -x to the '
         'terrace (Y=%.1f); one 9.5" post at (%.1f, %.1f) with a full capital up to the beam underside (Y=110.1) carrying the wing hip roof corner; rails run post-to-post (butting the column faces); baluster rails and a lattice '
         'skirt under the deck, built down to grade at render time. All measured on the rear/left elevations.' % (57.4, 113.3, -404.0, -313.0, 0.1, -48.2, 64.6, -397.5))
    fence = dict(posts=[[405.7, -336.5], [405.7, -401.0], [351.0, -401.0]], postWidth=8.0, shaftY0=-77.8, capY0=-12.8, capY1=-9.3,
                 rails=[[-16.8, -13.8], [-39.8, -36.8], [-74.7, -70.7]], curbY=[-85.0, -77.8])
    note('Fenced storage (basement level, x 350..408 behind the wing): three 8" posts with caps, three rails per side and a low '
         'curb, from the rear elevation.')
    terrain = DET['terrain']
    note('Terrain: grade profiles read from the V-layer grade splines of the left and right elevations ([z, Y] pairs). Left profile = '
         'x<=0 side and the rear-left terrace (stops at the retaining wall x=%.1f), right profile = x>=%.1f side and the rear walk-out. '
         'In between (z>-D) grade is interpolated across x.' % (ret2[0][0], W))
    site = dict(margin=1200.0, terrain=dict(left=terrain['left'], right=terrain['right'], stepX=r2(wing_x0)), retainingWalls=rw,
                frontSteps=steps, porch=porch, fence=fence)

    # ---------- meta ----------
    for s in notes_open:
        note('WARNING ' + s)
    note('Not extracted (no schema slot / ambiguous): stair guard rails, pantry shelves, shower doors, upper cabinets, '
         'cased interior openings without a door block (the open-plan first floor has none), the basement Bilco door '
         '(text label only, no door block or wall gap in the DXF), the stair S-turn.')
    note('Stairwell holes are NOT cut from level.floor; each flight arrives at the floor of the level above, where the app cuts '
         'the opening from the stair outline.')
    note('Second floor: front wall and gable walls stop at the frieze top (Y=%.2f; the app adds the gable siding above them up '
         'to the roof); the rear dormer wall stops at its cornice (Y=%.2f); interior partitions are stepped in 6" z-bands under '
         'the front slope and full height behind the ridge.' % (Yh(M['frieze_top_y']), Yh(M['rear_wall_top_y'])))
    note('Level.floor is the exterior outline only (basement/first include the rear wing).')
    meta = dict(units='in', source='cottage.dxf (AutoCAD 2018, inches)',
                generated=datetime.datetime.now(datetime.timezone.utc).strftime('%Y-%m-%dT%H:%M:%SZ'),
                notes=NOTES)
    # Snap the OUTER faces of the exterior walls onto the main block rectangle: the plan poche is 0.03-0.05" off it on some levels
    # (first-floor right wall 407.95, rear -314.97, second-floor left wall 0.03), which leaves a hairline step in the siding plane
    # at every storey joint (drawn as a stray line at each floor level on the gable walls).
    snapped = 0
    for lv in final_levels:
        for w in lv['walls']:
            if not w['exterior']:
                continue
            for pt in w['outline']:
                for k, targets in ((0, (0.0, W)), (1, (0.0, -D))):
                    for t in targets:
                        if 0.001 < abs(pt[k] - t) <= 0.06:
                            pt[k] = t
                            snapped += 1
    note('Exterior wall outer faces within 0.06" of the main block rectangle (x 0 / %.2f, z 0 / %.2f) were snapped onto it (%d vertices) so the '
         'siding plane is continuous from storey to storey.' % (W, -D, snapped))
    house = dict(meta=meta, levels=final_levels, roof=roof, trim=TRIM, chimney=chim, site=site)
    with open(out_path, 'w') as f:
        json.dump(house, f, indent=2)
        f.write('\n')
    summary(house, alignment)
    return house


def cut_openings(walls, opens):
    """Widen the exterior wall gaps to the openings' rough-opening width (the poche gap is the glazing width)."""
    rects = []
    for o in opens:
        if not o['exterior']:
            continue
        a = o['angle']
        dx, dz = math.cos(a), -math.sin(a)
        hw, hd = o['width'] / 2, o['depth'] / 2 + 0.5
        cx, cz = o['center']
        rects.append(Polygon([(cx + sx * dx * hw - sy * dz * hd, cz + sx * dz * hw + sy * dx * hd)
                              for sx, sy in ((-1, -1), (1, -1), (1, 1), (-1, 1))]))
    cut = unary_union(rects)
    out = []
    for w in walls:
        if not w['exterior']:
            out.append(w)
            continue
        g = Polygon(w['outline'], w.get('holes', [])).difference(cut)
        for p in clean(g, 2.0):
            p = orient(p, 1.0)
            piece = dict(w, outline=[[r2(x), r2(z)] for x, z in list(p.exterior.coords)[:-1]])
            piece.pop('holes', None)
            if p.interiors:
                piece['holes'] = [[[r2(x), r2(z)] for x, z in list(i.coords)[:-1]] for i in p.interiors]
            out.append(piece)
    return out


def ccw(poly):
    a = 0.0
    n = len(poly)
    for i in range(n):
        x0, y0 = poly[i]
        x1, y1 = poly[(i + 1) % n]
        a += x0 * y1 - x1 * y0
    return poly if a > 0 else poly[::-1]


def fixture_defs():
    """Hand-labelled fixture boxes (DXF model coords: x0,y0,x1,y1) taken from clustering the A-FIXT /
    A-FLOR-APPL / A-CASE entities of each plan.  (kind, box, baseY, height)"""
    return {
        'basement': [
            ('tub', (5078, -3541, 5108, -3481), 0, 20),
            ('toilet', (5133, -3511, 5151, -3480), 0, 30),
            ('vanity', (5143, -3586, 5161, -3553), 0, 34),
            ('appliance', (4785, -3586, 4817, -3531), 0, 36),   # laundry (washer/dryer)
            ('appliance', (4783, -3634, 4797, -3614), 0, 34),   # laundry sink
        ],
        'first': [
            ('fireplace', (5497.0, -3649, 5535.0, -3601), 0, 117),
            ('hearth', (5535, -3661, 5549, -3589), 0, 1.5),
            ('shower', (5815, -3548, 5851, -3473), 0, 80),
            ('toilet', (5861, -3503, 5879, -3472), 0, 30),
            ('vanity', (5887, -3491, 5919, -3473), 0, 34),
            ('appliance', (5779, -3417, 5811, -3385), 0, 36),     # range at rear wall
        ],
        'second': [
            ('shower', (6380, -3776, 6420, -3695), 0, 80),
            ('toilet', (6277, -3748, 6306, -3730), 0, 30),
            ('vanity', (6285, -3671, 6342, -3647), 0, 34),
        ],
    }


def summary(h, al):
    print('wrote house.json')
    for lv in h['levels']:
        c = collections.Counter(o.get('sym', o['kind']) + ('' if o['exterior'] else '(int)') for o in lv['openings'])
        print('  %-9s walls=%d (ext %d) openings=%s stairs=%d fixtures=%d rooms=%d' % (
            lv['id'], len(lv['walls']), sum(1 for w in lv['walls'] if w['exterior']), dict(c), len(lv['stairs']),
            len(lv['fixtures']), len(lv['rooms'])))
    r = h['roof']['main']
    print('  roof eaveY=%.2f ridgeY=%.2f pitch=%.2f' % (r['eaveY'], r['ridgeY'], r['pitch']))
    print('  chimney topY=%.2f' % h['chimney']['topY'])
    for k, v in al.items():
        print('  plan %-9s left=%.2f front=%.2f W=%.2f D=%.2f' % (k, v['left'], v['front'], v['W'], v['D']))


if __name__ == '__main__':
    if len(sys.argv) != 3:
        print(__doc__)
        sys.exit(2)
    build(sys.argv[1], sys.argv[2])
