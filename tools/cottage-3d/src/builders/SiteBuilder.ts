/**
 * SiteBuilder — everything that does not travel with a floor: the sloping lawn
 * (with a void under the basement footprint so the basement stays visible when
 * the floors above lift away), brick garden walls, front steps, and the rear
 * deck with posts and railing.
 *
 * Assumptions the schema leaves open: grade is flat beyond the main block's
 * front/rear walls; front steps descend toward +z; deck rails are omitted on
 * edges that run along the house.
 */
import * as THREE from 'three';
import type { HouseData, Vec2 } from '../data/schema';
import type { Materials } from '../materials';
import { GeometryBatch, extrudeVertical, pointInPolygon } from './geometry';

/** Grade height (inches) at plan z: linear between front and rear wall lines, flat outside. */
export function groundY(data: HouseData, z: number): number {
  const { gradeFrontY, gradeRearY } = data.site;
  const t = Math.min(1, Math.max(0, -z / -data.roof.main.zRear));
  return gradeFrontY + (gradeRearY - gradeFrontY) * t;
}

function bbox(outline: Vec2[]) {
  const xs = outline.map((p) => p[0]), zs = outline.map((p) => p[1]);
  return { x0: Math.min(...xs), x1: Math.max(...xs), z0: Math.min(...zs), z1: Math.max(...zs) };
}

/** Sorted unique break coordinates, refined so no gap exceeds `maxStep`. */
function refine(values: number[], maxStep: number): number[] {
  const sorted = [...new Set(values)].sort((a, b) => a - b);
  const out: number[] = [];
  for (let i = 0; i < sorted.length - 1; i++) {
    const n = Math.max(1, Math.ceil((sorted[i + 1] - sorted[i]) / maxStep));
    for (let k = 0; k < n; k++) out.push(sorted[i] + ((sorted[i + 1] - sorted[i]) * k) / n);
  }
  out.push(sorted[sorted.length - 1]);
  return out;
}

/** Ground grid snapped to the basement footprint; footprint cells are left out (the void). */
function buildGround(data: HouseData): THREE.BufferGeometry {
  const footprint = (data.levels.find((l) => l.id === 'basement') ?? data.levels[0]).floor;
  const all = footprint.flat();
  const bx = bbox(all), m = data.site.margin;
  const xs = refine([bx.x0 - m, bx.x1 + m, ...all.map((p) => p[0])], 80);
  const zs = refine([bx.z0 - m, bx.z1 + m, ...all.map((p) => p[1])], 80);
  const slopeK = (data.site.gradeRearY - data.site.gradeFrontY) / data.roof.main.zRear; // dY/dz inside the slope band
  const pos: number[] = [], nor: number[] = [];
  let k = 0; // dY/dz of the cell being emitted (0 on the flat ground beyond front/rear walls)
  const push = (x: number, z: number) => {
    const nl = Math.hypot(1, k);
    pos.push(x, groundY(data, z), z);
    nor.push(0, 1 / nl, -k / nl);
  };
  for (let i = 0; i < xs.length - 1; i++) {
    for (let j = 0; j < zs.length - 1; j++) {
      const c: Vec2 = [(xs[i] + xs[i + 1]) / 2, (zs[j] + zs[j + 1]) / 2];
      if (footprint.some((poly) => pointInPolygon(c, poly))) continue;
      const [xa, xb, za, zb] = [xs[i], xs[i + 1], zs[j], zs[j + 1]];
      k = c[1] < 0 && c[1] > data.roof.main.zRear ? slopeK : 0;
      // Counter-clockwise seen from above (+Y)
      push(xa, za); push(xa, zb); push(xb, za);
      push(xb, za); push(xa, zb); push(xb, zb);
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('normal', new THREE.Float32BufferAttribute(nor, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(new Array((pos.length / 3) * 2).fill(0), 2));
  return g;
}

/** A board along plan edge a→c at height y, `w` deep and `h` tall. */
function edgeBox(b: GeometryBatch, mat: THREE.Material, a: Vec2, c: Vec2, y: number, w: number, h: number): void {
  const len = Math.hypot(c[0] - a[0], c[1] - a[1]);
  const yaw = Math.atan2(-(c[1] - a[1]), c[0] - a[0]);
  b.box(mat, [len, h, w], [(a[0] + c[0]) / 2, y, (a[1] + c[1]) / 2], [0, yaw, 0]);
}

function addDeck(b: GeometryBatch, data: HouseData, m: Materials): void {
  const deck = data.site.deck;
  if (!deck) return;
  const surface = extrudeVertical(deck.outline, undefined, deck.y - deck.thickness, deck.y);
  b.add(surface, m.wood);
  surface.dispose();

  const house = data.levels.find((l) => l.id === 'first')?.floor ?? [];
  const onHouse = (a: Vec2, c: Vec2): boolean => {
    const mx = (a[0] + c[0]) / 2, mz = (a[1] + c[1]) / 2;
    return [[3, 0], [-3, 0], [0, 3], [0, -3]].some(([dx, dz]) => house.some((p) => pointInPolygon([mx + dx, mz + dz], p)));
  };
  const n = deck.outline.length;
  for (let i = 0; i < n; i++) {
    const a = deck.outline[i], c = deck.outline[(i + 1) % n];
    if (onHouse(a, c)) continue;
    const len = Math.hypot(c[0] - a[0], c[1] - a[1]);
    const dx = (c[0] - a[0]) / len, dz = (c[1] - a[1]) / len;
    const runs = Math.max(1, Math.ceil(len / 60));
    const rail = deck.railingHeight;
    // Posts (support below, newel above) at each run boundary except the end (next edge starts there)
    for (let k = 0; k < runs; k++) {
      const x = a[0] + dx * (len * k) / runs, z = a[1] + dz * (len * k) / runs;
      const g = groundY(data, z);
      b.box(m.wood, [5.5, deck.y - deck.thickness - g + 6, 5.5], [x, (g - 6 + deck.y - deck.thickness) / 2, z]);
      b.box(m.railing, [3.5, rail, 3.5], [x, deck.y + rail / 2, z]);
    }
    edgeBox(b, m.railing, a, c, deck.y + rail - 1, 3, 2); // top rail
    edgeBox(b, m.railing, a, c, deck.y + 4, 2, 2); // bottom rail
    const balusters = Math.floor(len / 4.5);
    for (let k = 1; k < balusters; k++) {
      const x = a[0] + dx * (k * len) / balusters, z = a[1] + dz * (k * len) / balusters;
      b.box(m.railing, [1.25, rail - 7, 1.25], [x, deck.y + 5 + (rail - 7) / 2, z]);
    }
  }
}

export function buildSite(data: HouseData, m: Materials): THREE.Group {
  const b = new GeometryBatch();
  const ground = buildGround(data);
  b.add(ground, m.ground);
  ground.dispose();

  for (const w of data.site.retainingWalls) {
    const body = extrudeVertical(w.outline, undefined, w.baseY, w.topY);
    b.add(body, m.brick);
    body.dispose();
    const r = bbox(w.outline);
    b.box(m.concrete, [r.x1 - r.x0 + 2, 2, r.z1 - r.z0 + 2], [(r.x0 + r.x1) / 2, w.topY + 1, (r.z0 + r.z1) / 2]); // coping
  }

  const st = data.site.frontSteps;
  if (st) {
    const r = bbox(st.outline);
    const tread = (r.z1 - r.z0) / st.risers, rise = (st.topY - st.bottomY) / st.risers;
    for (let i = 1; i <= st.risers; i++) {
      const depth = (st.risers - i + 1) * tread; // higher steps sit nearer the house
      b.box(m.concrete, [r.x1 - r.x0, i * rise, depth], [(r.x0 + r.x1) / 2, st.bottomY + (i * rise) / 2, r.z0 + depth / 2]);
    }
  }

  addDeck(b, data, m);
  return b.toGroup('site');
}
