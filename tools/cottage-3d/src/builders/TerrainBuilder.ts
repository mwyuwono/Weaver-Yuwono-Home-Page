/**
 * TerrainBuilder — the ground as a heightfield that matches the grade lines drawn on all four elevations.
 *
 * Grade at the left and right wall planes IS the measured profile (data.site.terrain); across the house it is
 * interpolated in x, and behind the main block the rear-left terrace (left profile) is separated from the walk-out
 * (right profile) at x = stepX, where the brick retaining wall stands. The grid is snapped to every footprint corner
 * and profile break, and the footprint itself is left open, so the ground meets the foundation walls exactly and only
 * the parged band above grade shows. The outer edge fades out softly and a skirt hides the border seen from the side.
 */
import * as THREE from 'three';
import type { HouseData, Vec2 } from '../data/schema';
import type { Materials } from '../materials';
import type { WashMaterial } from '../render/wash';
import { IN } from '../units';
import { pointInPolygon } from './geometry';

/** Fade the ground out between these radii (scene feet) from the house centre. */
const FADE_START_FT = 26, FADE_END_FT = 72;
const SKIRT_DEPTH = 900;
/** Distance (inches) beyond the end of a retaining wall over which the bank eases out. */
const BANK_EASE = 140;
/** Half-width (inches) over which the terrace and the walk-out grade blend into each other beyond the rear end of the stepX retaining wall. */
const SEAM_EASE = 60;
/** Distance (inches) ahead of the rear end of the stepX retaining wall over which the grade step fades into the blend. */
const SEAM_RUN = 60;
/** Length (inches) of the ramp that replaces a retaining-wall step beyond the end of the wall. */
const BANK_RAMP = 110;

/** Linear interpolation in a [z, Y] profile sorted from high z to low z; clamps beyond its ends. */
function profileY(p: Vec2[], z: number): number {
  if (z >= p[0][0]) return p[0][1];
  for (let i = 0; i < p.length - 1; i++) {
    const [z0, y0] = p[i], [z1, y1] = p[i + 1];
    if (z <= z0 && z >= z1) return y0 + ((y1 - y0) * (z - z0)) / (z1 - z0);
  }
  return p[p.length - 1][1];
}

/**
 * The profile with its steep step (a retaining wall) replaced by a long gentle ramp that climbs back toward the
 * front, or null when it has none. The low side keeps its level, so nothing beside the wall gets buried.
 * `stepZ` is where the step is, so the wall that holds it back can be found.
 */
function rampedProfile(p: Vec2[]): { ramp: Vec2[]; stepZ: number } | null {
  const i = p.findIndex((q, k) => k < p.length - 1 && Math.abs(q[1] - p[k + 1][1]) > Math.abs(q[0] - p[k + 1][0]));
  if (i < 0) return null;
  return { ramp: p.filter((q, k) => k > i || q[0] >= p[i][0] + BANK_RAMP), stepZ: (p[i][0] + p[i + 1][0]) / 2 };
}

/** Grade height (inches) function of plan position. `xr` picks the terrace/walk-out side behind the house (defaults to x). */
export class Grade {
  /** Right profile with its retaining-wall step smoothed out; the bank eases into it beyond the end of the wall. */
  private readonly eased: Vec2[] | null;
  private readonly wallEndX: number;
  /** Rear end (z) of the retaining wall that stands on x = stepX; beyond it nothing holds the two grades apart. */
  readonly seamRearZ: number;

  constructor(private readonly data: HouseData) {
    const r = rampedProfile(data.site.terrain.right);
    this.eased = r?.ramp ?? null;
    const wall = data.site.retainingWalls.find((w) => w.outline.some((q) => Math.abs(q[1] - (r?.stepZ ?? 0)) < 15));
    const seamWall = data.site.retainingWalls.find((w) => w.outline.every((q) => Math.abs(q[0] - data.site.terrain.stepX) < 15));
    this.seamRearZ = seamWall ? Math.min(...seamWall.outline.map((q) => q[1])) : -Infinity;
    this.wallEndX = wall ? Math.max(...wall.outline.map((q) => q[0])) : data.roof.main.xMax;
  }

  y(x: number, z: number, xr: number = x): number {
    const { left, right, stepX } = this.data.site.terrain;
    const r = this.data.roof.main;
    const rightY = (): number => {
      const exact = profileY(right, z);
      if (!this.eased || x <= this.wallEndX) return exact;
      const t = Math.min(1, (x - this.wallEndX) / BANK_EASE);
      const k = t * t * (3 - 2 * t);
      return exact * (1 - k) + profileY(this.eased, z) * k;
    };
    if (z > r.zRear) {
      const t = Math.min(1, Math.max(0, (x - r.xMin) / (r.xMax - r.xMin)));
      return profileY(left, z) * (1 - t) + rightY() * t;
    }
    if (z < this.seamRearZ + SEAM_RUN) { // toward and past the wall end the two grades meet smoothly instead of leaving a crack along x = stepX
      const k = Math.min(1, Math.max(0, (x - (stepX - SEAM_EASE)) / (2 * SEAM_EASE)));
      const blended = profileY(left, z) * (1 - k * k * (3 - 2 * k)) + rightY() * (k * k * (3 - 2 * k));
      // The step fades into that blend over the last SEAM_RUN of the wall (hidden beside it), so the crack has already
      // closed where the wall ends and no sliver of cliff sticks out past it.
      const w = Math.min(1, (this.seamRearZ + SEAM_RUN - z) / SEAM_RUN);
      const stepped = xr < stepX ? profileY(left, z) : rightY();
      const s = w * w * (3 - 2 * w);
      return stepped * (1 - s) + blended * s;
    }
    return xr < stepX ? profileY(left, z) : rightY();
  }
}

/** Sorted unique break coordinates, refined so no gap exceeds `maxStep`. */
function refine(values: number[], maxStep: number): number[] {
  const sorted = [...new Set(values.map((v) => Math.round(v * 100) / 100))].sort((a, b) => a - b);
  const out: number[] = [];
  for (let i = 0; i < sorted.length - 1; i++) {
    const n = Math.max(1, Math.ceil((sorted[i + 1] - sorted[i]) / maxStep));
    for (let k = 0; k < n; k++) out.push(sorted[i] + ((sorted[i + 1] - sorted[i]) * k) / n);
  }
  out.push(sorted[sorted.length - 1]);
  return out;
}

/**
 * Ground material: the lawn wash with a fade to bare paper towards the edge (world xz, so no camera dependence).
 * The ground stays OPAQUE — the fade is done in pigment — so nothing below grade can ever show through it.
 */
function terrainMaterial(base: Materials, centre: THREE.Vector3): WashMaterial {
  const mat = base.ground.clone();
  mat.fade = [centre.x, centre.z, FADE_START_FT, FADE_END_FT];
  return mat;
}

/** The terrain mesh (scene feet) with its own faded material. */
export function buildTerrain(data: HouseData, m: Materials, centre: THREE.Vector3): { mesh: THREE.Mesh; grade: Grade } {
  const grade = new Grade(data);
  const footprint = (data.levels.find((l) => l.id === 'basement') ?? data.levels[0]).floor;
  const all = footprint.flat();
  const xsAll = all.map((p) => p[0]), zsAll = all.map((p) => p[1]);
  const mg = data.site.margin, t = data.site.terrain;
  const xs = refine([Math.min(...xsAll) - mg, Math.max(...xsAll) + mg, ...xsAll, t.stepX, t.stepX - SEAM_EASE, t.stepX + SEAM_EASE, ...data.site.retainingWalls.flatMap((w) => w.outline.map((q) => q[0]))], 100);
  const zs = refine([Math.min(...zsAll) - mg, Math.max(...zsAll) + mg, ...zsAll, ...t.left.map((p) => p[0]), ...t.right.map((p) => p[0]), ...data.site.retainingWalls.flatMap((w) => w.outline.map((q) => q[1])), grade.seamRearZ + SEAM_RUN].filter((z) => Math.abs(z) < 2000), 100);

  const pos: number[] = [];
  const vertex = (x: number, z: number, xr: number) => {
    const y = grade.y(x, z, xr);
    pos.push(x * IN, y * IN, z * IN);
  };
  const edge: [number, number, number][] = []; // border vertices for the skirt (x, z, y inches)
  for (let i = 0; i < xs.length - 1; i++) {
    for (let j = 0; j < zs.length - 1; j++) {
      const xr = (xs[i] + xs[i + 1]) / 2;
      if (footprint.some((poly) => pointInPolygon([xr, (zs[j] + zs[j + 1]) / 2], poly))) continue;
      const [xa, xb, za, zb] = [xs[i], xs[i + 1], zs[j], zs[j + 1]];
      // Counter-clockwise seen from above (+Y)
      vertex(xa, za, xr); vertex(xa, zb, xr); vertex(xb, za, xr);
      vertex(xb, za, xr); vertex(xa, zb, xr); vertex(xb, zb, xr);
      if (i === 0) edge.push([xa, za, grade.y(xa, za, xr)], [xa, zb, grade.y(xa, zb, xr)]);
      if (i === xs.length - 2) edge.push([xb, za, grade.y(xb, za, xr)], [xb, zb, grade.y(xb, zb, xr)]);
      if (j === 0) edge.push([xa, za, grade.y(xa, za, xr)], [xb, za, grade.y(xb, za, xr)]);
      if (j === zs.length - 2) edge.push([xa, zb, grade.y(xa, zb, xr)], [xb, zb, grade.y(xb, zb, xr)]);
    }
  }
  // Skirt: a vertical curtain under every border edge segment (two-sided so either winding shows).
  for (let k = 0; k < edge.length; k += 2) {
    const [a, c] = [edge[k], edge[k + 1]];
    const lo = (p: [number, number, number]): number[] => [p[0] * IN, (p[2] - SKIRT_DEPTH) * IN, p[1] * IN];
    const hi = (p: [number, number, number]): number[] => [p[0] * IN, p[2] * IN, p[1] * IN];
    for (const v of [hi(a), lo(a), hi(c), hi(c), lo(a), lo(c)]) pos.push(...v);
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  geo.computeVertexNormals(); // non-indexed: one flat normal per triangle (per-vertex finite differences smeared across the grade steps)
  const mat = terrainMaterial(m, centre);
  mat.side = THREE.DoubleSide; // skirt winding differs by border side
  const mesh = new THREE.Mesh(geo, mat);
  mesh.receiveShadow = true;
  mesh.name = 'terrain';
  return { mesh, grade };
}
