"""
Dev-only helper for the overlay QA: renders the DXF elevation linework as a
transparent red PNG at exactly the scale/origin of a model render.

Registration (elevation drawing -> house frame):
  u  = DXF x - FACE centre x   (inches, +u is to the RIGHT as drawn; every elevation is drawn as seen from outside)
  Y  = DXF y + 2653.34         (Y = 0 is the first-floor subfloor; T-WALL line at DXF y -2662.59 is 9.25" lower)
The face centres are the middle of the main block's T-WALL line (outer wall faces) in each elevation.

Usage: elev_lines.py DXF FACE OUT.png U_CENTER Y_CENTER PX_PER_IN WIDTH_PX HEIGHT_PX
       elev_lines.py DXF FACE --dump      (prints polylines as JSON in (u, Y) inches)
"""
import json, sys
import ezdxf
from ezdxf import path as ezpath
from PIL import Image, ImageDraw

SUBFLOOR_Y = -2653.34
# face -> (DXF x range of the elevation, DXF x of the main block's centre)
FACES = {
    'front': ((3900, 4430), 4174.60),
    'right': ((4520, 5120), 4760.53),
    'rear':  ((5190, 5660), 5422.50),
    'left':  ((5640, 6300), 6091.71),
}
LAYERS = {'A-ELEV', 'A-ELEV-DETL', 'A-ELEV-MEDM', 'A-ELEV-OPT1', 'A-ELEV-OPT1-DETL', 'V'}
SKIP_TYPES = {'TEXT', 'MTEXT', 'HATCH', 'DIMENSION', 'LEADER', 'MLEADER', 'IMAGE', 'WIPEOUT', 'SOLID', 'POINT', 'ATTDEF', 'ATTRIB'}
Y_RANGE = (-2800, -2320)


def centre(face):
    return FACES[face][1]


def flatten(e, out, depth=0):
    """Append (layer, [(x, y), ...]) polylines for entity `e`, exploding blocks."""
    t = e.dxftype()
    if t in SKIP_TYPES or depth > 4:
        return
    if t == 'INSERT':
        for v in e.virtual_entities():
            flatten(v, out, depth + 1)
        return
    if t == 'CIRCLE' and e.dxf.radius < 14 and depth == 0:
        return  # schedule tag bubbles
    try:
        p = ezpath.make_path(e)
    except Exception:
        return
    for sub in p.sub_paths():
        pts = [(v.x, v.y) for v in sub.flattening(0.05)]
        if len(pts) > 1:
            out.append((e.dxf.layer, pts))


def face_polylines(doc, face):
    (x0, x1), _ = FACES[face]
    out = []
    for e in doc.modelspace():
        if e.dxf.layer not in LAYERS and not (e.dxftype() == 'INSERT'):
            continue
        tmp = []
        flatten(e, tmp)
        for layer, pts in tmp:
            # inserts keep their own layer in virtual entities only for layer-0 content; use the insert layer when '0'
            lay = layer if layer != '0' else e.dxf.layer
            if lay not in LAYERS:
                continue
            xs = [p[0] for p in pts]; ys = [p[1] for p in pts]
            if min(xs) < x0 or max(xs) > x1 or min(ys) < Y_RANGE[0] or max(ys) > Y_RANGE[1]:
                continue
            out.append((lay, pts))
    return out


def to_local(face, pts):
    c = centre(face)
    return [(x - c, y - SUBFLOOR_Y) for x, y in pts]


def render(doc, face, uc, yc, scale, w, h):
    """Red 1px linework on a transparent RGBA image; pixel = ((u - uc) * scale + w/2, h/2 - (Y - yc) * scale)."""
    img = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    for lay, pts in face_polylines(doc, face):
        px = [((u - uc) * scale + w / 2, h / 2 - (y - yc) * scale) for u, y in to_local(face, pts)]
        d.line(px, fill=(255, 0, 0, 255), width=1)
    return img


if __name__ == '__main__':
    doc = ezdxf.readfile(sys.argv[1])
    face = sys.argv[2]
    if sys.argv[3] == '--dump':
        print(json.dumps([(l, to_local(face, p)) for l, p in face_polylines(doc, face)]))
    else:
        out, uc, yc, scale, w, h = sys.argv[3], *map(float, sys.argv[4:9])
        render(doc, face, uc, yc, scale, int(w), int(h)).save(out)
