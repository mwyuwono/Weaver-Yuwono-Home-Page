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
import { IN } from '../units';
import { pointInPolygon } from './geometry';

/** Fade the ground out between these radii (scene feet) from the house centre. */
const FADE_START_FT = 60, FADE_END_FT = 100;
const SKIRT_DEPTH = 900;
/** Distance (inches) beyond the end of a retaining wall over which the bank eases out. */
const BANK_EASE = 140;
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

  constructor(private readonly data: HouseData) {
    const r = rampedProfile(data.site.terrain.right);
    this.eased = r?.ramp ?? null;
    const wall = data.site.retainingWalls.find((w) => w.outline.some((q) => Math.abs(q[1] - (r?.stepZ ?? 0)) < 15));
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

/** Ground material: the lawn material with an alpha fade towards the edge (object-space xz, so no camera dependence). */
function terrainMaterial(base: Materials, centre: THREE.Vector3): THREE.MeshStandardMaterial {
  const mat = base.ground.clone();
  mat.transparent = true;
  mat.userData.keepTransparent = true; // ExplodeController must not switch this off when it fades the site
  const uniforms = { uCentre: { value: new THREE.Vector2(centre.x, centre.z) }, uFade: { value: new THREE.Vector2(FADE_START_FT, FADE_END_FT) } };
  mat.onBeforeCompile = (shader) => {
    Object.assign(shader.uniforms, uniforms);
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\nvarying vec2 vFadeXZ;')
      .replace('#include <begin_vertex>', '#include <begin_vertex>\nvFadeXZ = position.xz;');
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', '#include <common>\nvarying vec2 vFadeXZ;\nuniform vec2 uCentre;\nuniform vec2 uFade;')
      .replace('#include <map_fragment>', '#include <map_fragment>\ndiffuseColor.a *= 1.0 - smoothstep(uFade.x, uFade.y, distance(vFadeXZ, uCentre));');
  };
  return mat;
}

/** The terrain mesh (scene feet) with its own faded material. */
export function buildTerrain(data: HouseData, m: Materials, centre: THREE.Vector3): { mesh: THREE.Mesh; grade: Grade } {
  const grade = new Grade(data);
  const footprint = (data.levels.find((l) => l.id === 'basement') ?? data.levels[0]).floor;
  const all = footprint.flat();
  const xsAll = all.map((p) => p[0]), zsAll = all.map((p) => p[1]);
  const mg = data.site.margin, t = data.site.terrain;
  const xs = refine([Math.min(...xsAll) - mg, Math.max(...xsAll) + mg, ...xsAll, t.stepX, ...data.site.retainingWalls.flatMap((w) => w.outline.map((q) => q[0]))], 100);
  const zs = refine([Math.min(...zsAll) - mg, Math.max(...zsAll) + mg, ...zsAll, ...t.left.map((p) => p[0]), ...t.right.map((p) => p[0])].filter((z) => Math.abs(z) < 2000), 100);

  const pos: number[] = [], nor: number[] = [], uv: number[] = [];
  const vertex = (x: number, z: number, xr: number) => {
    const y = grade.y(x, z, xr);
    const dx = (grade.y(x + 1, z, xr) - grade.y(x - 1, z, xr)) / 2, dz = (grade.y(x, z + 1, xr) - grade.y(x, z - 1, xr)) / 2;
    const l = Math.hypot(dx, 1, dz);
    pos.push(x * IN, y * IN, z * IN);
    nor.push(-dx / l, 1 / l, -dz / l);
    uv.push(x, z);
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
    for (const v of [hi(a), lo(a), hi(c), hi(c), lo(a), lo(c)]) { pos.push(...v); nor.push(0, 1, 0); uv.push(v[0] / IN, v[2] / IN); }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  geo.setAttribute('normal', new THREE.Float32BufferAttribute(nor, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  const mat = terrainMaterial(m, centre);
  mat.side = THREE.DoubleSide; // skirt winding differs by border side
  const mesh = new THREE.Mesh(geo, mat);
  mesh.receiveShadow = true;
  mesh.name = 'terrain';
  return { mesh, grade };
}
