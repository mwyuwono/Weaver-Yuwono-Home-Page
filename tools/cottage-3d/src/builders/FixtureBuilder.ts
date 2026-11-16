/**
 * FixtureBuilder — built-in fittings from their plan outlines, kept abstract (no furniture):
 *  - cabinets, island, vanity: a carcass set back under the worktop with a recessed toe kick;
 *  - fireplace: brick surround with the splayed firebox void from the plan, and the chimney breast above it;
 *  - bath fixtures: a hollow tub, a shower pan with its kerb, a bowl-and-cistern toilet;
 *  - appliances and the hearth: plain blocks.
 */
import * as THREE from 'three';
import type { Fixture, Level, Vec2 } from '../data/schema';
import type { Materials } from '../materials';
import { inset } from './FloorBuilder';
import { GeometryBatch, extrudeVertical, pointInPolygon } from './geometry';

const TOP_THICKNESS = 1.5;
const CABINET = { setback: 1, toeH: 4, toeBack: 3 };
/** Brick surround around the firebox: width beside and height above the opening, projection past the breast face. Assumed. */
const SURROUND = { side: 9, above: 12, proud: 0.75 };

const bounds = (o: Vec2[]) => {
  const xs = o.map((p) => p[0]), zs = o.map((p) => p[1]);
  return { x0: Math.min(...xs), x1: Math.max(...xs), z0: Math.min(...zs), z1: Math.max(...zs) };
};
const rect = (x0: number, z0: number, x1: number, z1: number): Vec2[] => [[x0, z0], [x1, z0], [x1, z1], [x0, z1]];

function solid(b: GeometryBatch, mat: THREE.Material, outline: Vec2[], y0: number, y1: number, holes?: Vec2[][], opts?: Parameters<GeometryBatch['add']>[3]): void {
  if (y1 - y0 < 0.01) return;
  const g = extrudeVertical(outline, holes, y0, y1);
  b.add(g, mat, undefined, opts);
  g.dispose();
}

/** Carcass (toe kick + body set back from the outline). Small scribes into the wall are ignored: the body is the bounding box. */
function addCarcass(b: GeometryBatch, m: Materials, f: Fixture, y0: number, y1: number): void {
  const bb = bounds(f.outline), body = rect(bb.x0, bb.z0, bb.x1, bb.z1);
  solid(b, m.cabinet, inset(body, CABINET.setback + CABINET.toeBack), y0, y0 + CABINET.toeH);
  solid(b, m.cabinet, inset(body, CABINET.setback), y0 + CABINET.toeH, y1);
}

function addFireplace(b: GeometryBatch, m: Materials, f: Fixture, level: Level): void {
  const v = f.outline, bb = bounds(v), y0 = level.floorY + f.baseY, yOpen = y0 + f.height, yTop = yOpen + SURROUND.above;
  const xb = bb.x0 + 0.2, xf = bb.x1 + SURROUND.proud, zc = (bb.z0 + bb.z1) / 2;
  // The void, opened through the proud face and pulled 0.6" off the wall pieces that form the real cheeks.
  const cut: Vec2[] = v.map(([x, z], i) => [i === 0 || i === v.length - 1 ? xf : Math.max(x, bb.x0 + 0.8), z + (z > zc ? -0.6 : 0.6)]);
  const hiFirst = cut[0][1] > cut[cut.length - 1][1] ? cut : cut.slice().reverse();
  const zHi = bb.z1 + SURROUND.side, zLo = bb.z0 - SURROUND.side;
  solid(b, m.brick, [[xb, zHi], [xf, zHi], ...hiFirst, [xf, zLo], [xb, zLo]], y0, yOpen);
  solid(b, m.brick, rect(xb, zLo, xf, zHi), yOpen, yTop);
  // Chimney breast between the plastered jambs, from the surround up to the ceiling.
  solid(b, m.interior, rect(xb, bb.z0, bb.x1, bb.z1), yTop, level.floorY + level.ceilingHeight);
}

function addTub(b: GeometryBatch, m: Materials, f: Fixture, y0: number): void {
  solid(b, m.porcelain, f.outline, y0, y0 + 3);
  solid(b, m.porcelain, f.outline, y0 + 3, y0 + f.height, [inset(f.outline, 3)]);
}

function addShower(b: GeometryBatch, m: Materials, f: Fixture, y0: number): void {
  solid(b, m.porcelain, f.outline, y0, y0 + 1);
  solid(b, m.porcelain, f.outline, y0 + 1, y0 + 4.5, [inset(f.outline, 2.5)]);
}

/** Bowl and cistern; the cistern stands at whichever end of the long axis has a wall behind it. */
function addToilet(b: GeometryBatch, m: Materials, f: Fixture, level: Level, y0: number): void {
  const bb = bounds(f.outline), alongX = bb.x1 - bb.x0 > bb.z1 - bb.z0;
  const lo = alongX ? bb.x0 : bb.z0, hi = alongX ? bb.x1 : bb.z1, c = alongX ? (bb.z0 + bb.z1) / 2 : (bb.x0 + bb.x1) / 2;
  const w = alongX ? bb.z1 - bb.z0 : bb.x1 - bb.x0;
  const pt = (a: number, l: number): Vec2 => (alongX ? [a, l] : [l, a]);
  const walled = (a: number) => level.walls.some((wl) => pointInPolygon(pt(a, c), wl.outline));
  const back = [3, 6, 10].some((d) => walled(hi + d)) && ![3, 6, 10].some((d) => walled(lo - d)) ? hi : lo;
  const dir = back === lo ? 1 : -1, tankD = 7.5;
  const t0 = back, t1 = back + dir * tankD;
  solid(b, m.porcelain, alongX ? rect(Math.min(t0, t1), bb.z0, Math.max(t0, t1), bb.z1) : rect(bb.x0, Math.min(t0, t1), bb.x1, Math.max(t0, t1)), y0 + 14, y0 + Math.max(f.height, 29));
  // Bowl: an ellipse from the cistern to the front of the outline.
  const far = back === lo ? hi : lo, ac = (t1 + far) / 2, ra = Math.abs(far - t1) / 2 + 1, rl = w / 2 - 1;
  const bowl: Vec2[] = Array.from({ length: 20 }, (_, i) => pt(ac + Math.cos((i / 20) * Math.PI * 2) * ra, c + Math.sin((i / 20) * Math.PI * 2) * rl));
  solid(b, m.porcelain, inset(bowl, 2.5), y0, y0 + 13, undefined, { lines: 'outline' });
  solid(b, m.porcelain, bowl, y0 + 13, y0 + 15.5, undefined, { lines: 'outline' });
}

export function buildFixtures(level: Level, m: Materials): THREE.Group {
  const batch = new GeometryBatch();
  for (const f of level.fixtures) {
    const y0 = level.floorY + f.baseY, y1 = y0 + f.height;
    switch (f.kind) {
      case 'cabinet-base':
      case 'island': // the worktop is its own 'counter' fixture
        addCarcass(batch, m, f, y0, y1);
        break;
      case 'vanity':
        addCarcass(batch, m, f, y0, y1 - TOP_THICKNESS);
        solid(batch, m.soapstone, f.outline, y1 - TOP_THICKNESS, y1);
        break;
      case 'counter': solid(batch, m.soapstone, f.outline, y0, y1); break;
      case 'fireplace': addFireplace(batch, m, f, level); break;
      case 'hearth': solid(batch, m.brick, f.outline, y0, y1); break;
      case 'tub': addTub(batch, m, f, y0); break;
      case 'shower': addShower(batch, m, f, y0); break;
      case 'toilet': addToilet(batch, m, f, level, y0); break;
      case 'appliance': solid(batch, m.appliance, f.outline, y0, y1); break;
      case 'cabinet-upper': solid(batch, m.cabinet, f.outline, y0, y1); break;
      case 'shelving': solid(batch, m.wood, f.outline, y0, y1); break;
    }
  }
  return batch.toGroup(`fixtures-${level.id}`);
}
