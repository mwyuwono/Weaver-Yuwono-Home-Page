/**
 * Geometry helpers shared by all builders. Everything here works in INCHES;
 * GeometryBatch converts to scene feet when it emits meshes.
 */
import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import type { Vec2 } from '../data/schema';
import { WashMaterial } from '../render/wash';
import { IN } from '../units';

const unitBox = new THREE.BoxGeometry(1, 1, 1);

/** Even-odd point-in-polygon test (plan coordinates). */
export function pointInPolygon(p: Vec2, poly: Vec2[]): boolean {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, zi] = poly[i];
    const [xj, zj] = poly[j];
    if (zi > p[1] !== zj > p[1] && p[0] < ((xj - xi) * (p[1] - zi)) / (zj - zi) + xi) inside = !inside;
  }
  return inside;
}

function toShape(outline: Vec2[], holes: Vec2[][] = []): THREE.Shape {
  // Shape y = −plan z so that rotating the extrusion upright lands plan z back on scene z.
  const shape = new THREE.Shape(outline.map(([x, z]) => new THREE.Vector2(x, -z)));
  for (const h of holes) shape.holes.push(new THREE.Path(h.map(([x, z]) => new THREE.Vector2(x, -z))));
  return shape;
}

/**
 * Extrude a plan polygon (with optional holes) vertically from y0 to y1.
 * ExtrudeGeometry runs along local +Z; the basis below maps shape x→x,
 * shape y→−z, extrusion→+Y (a proper rotation, so winding stays outward).
 * ExtrudeGeometry normalises winding itself, so input orientation is free.
 * Groups: 0 = top/bottom caps, 1 = side walls (see splitExtrudeGroups).
 */
export function extrudeVertical(outline: Vec2[], holes: Vec2[][] | undefined, y0: number, y1: number): THREE.ExtrudeGeometry {
  const geo = new THREE.ExtrudeGeometry(toShape(outline, holes), { depth: y1 - y0, bevelEnabled: false, curveSegments: 1 });
  geo.applyMatrix4(new THREE.Matrix4().makeBasis(new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 0, -1), new THREE.Vector3(0, 1, 0)));
  geo.translate(0, y0, 0);
  return geo;
}

/**
 * Extrude a side profile given as [z, y] points along x from x0 to x1
 * (gable infill, roof slabs, frieze). Shape x = −z, extrusion → +X.
 */
export function extrudeAlongX(profile: Vec2[], x0: number, x1: number): THREE.ExtrudeGeometry {
  const shape = new THREE.Shape(profile.map(([z, y]) => new THREE.Vector2(-z, y)));
  const geo = new THREE.ExtrudeGeometry(shape, { depth: x1 - x0, bevelEnabled: false, curveSegments: 1 });
  geo.applyMatrix4(new THREE.Matrix4().makeBasis(new THREE.Vector3(0, 0, -1), new THREE.Vector3(0, 1, 0), new THREE.Vector3(1, 0, 0)));
  geo.translate(x0, 0, 0);
  return geo;
}

/** Extrude a front profile given as [x, y] points along z from z0 to z1 (wedges above the wing side walls). */
export function extrudeAlongZ(profile: Vec2[], z0: number, z1: number): THREE.ExtrudeGeometry {
  const geo = new THREE.ExtrudeGeometry(new THREE.Shape(profile.map(([x, y]) => new THREE.Vector2(x, y))), { depth: z1 - z0, bevelEnabled: false, curveSegments: 1 });
  geo.translate(0, 0, z0);
  return geo;
}

/** Split an ExtrudeGeometry into its cap faces and its side faces. */
export function splitExtrudeGroups(geo: THREE.ExtrudeGeometry): { caps: THREE.BufferGeometry; sides: THREE.BufferGeometry } {
  const slice = (start: number, count: number): THREE.BufferGeometry => {
    const out = new THREE.BufferGeometry();
    for (const name of ['position', 'normal', 'uv']) {
      const a = geo.getAttribute(name);
      const s = a.itemSize;
      out.setAttribute(name, new THREE.BufferAttribute((a.array as Float32Array).slice(start * s, (start + count) * s), s));
    }
    return out;
  };
  const [caps, sides] = geo.groups;
  return { caps: slice(caps.start, caps.count), sides: slice(sides.start, sides.count) };
}

const _m = new THREE.Matrix4();
const _q = new THREE.Quaternion();
const _e = new THREE.Euler();

/**
 * Collects geometry (inches) bucketed by material, then emits one merged mesh
 * per material scaled to scene feet. This is the main draw-call saver: every
 * builder pours its boxes/extrusions into a batch instead of creating meshes.
 */
export class GeometryBatch {
  private readonly buckets = new Map<THREE.Material, THREE.BufferGeometry[]>();

  /** Add a geometry (inches), optionally transformed. The input is not modified. */
  add(geo: THREE.BufferGeometry, material: THREE.Material, matrix?: THREE.Matrix4): this {
    let g = geo.index ? geo.toNonIndexed() : geo.clone();
    if (matrix) g.applyMatrix4(matrix);
    for (const name of Object.keys(g.attributes)) if (!['position', 'normal', 'uv'].includes(name)) g.deleteAttribute(name);
    g.clearGroups();
    const list = this.buckets.get(material) ?? [];
    list.push(g);
    this.buckets.set(material, list);
    return this;
  }

  /**
   * Add an axis-aligned-in-its-own-frame box: size [w,h,d], centre [x,y,z],
   * optional rotation (Euler radians, XYZ order).
   */
  box(material: THREE.Material, size: [number, number, number], center: [number, number, number], rot: [number, number, number] = [0, 0, 0]): this {
    _q.setFromEuler(_e.set(rot[0], rot[1], rot[2]));
    return this.add(unitBox, material, _m.compose(new THREE.Vector3(...center), _q, new THREE.Vector3(...size)));
  }

  /** Copy every bucket of another batch in, transformed (used to stamp window/door templates). */
  addBatch(other: GeometryBatch, matrix: THREE.Matrix4): this {
    for (const [mat, list] of other.buckets) for (const g of list) this.add(g, mat, matrix);
    return this;
  }

  /** Emit merged meshes (scaled inches → feet). */
  toGroup(name: string): THREE.Group {
    const group = new THREE.Group();
    group.name = name;
    for (const [mat, list] of this.buckets) {
      const geo = mergeGeometries(list, false);
      if (!geo) continue;
      geo.scale(IN, IN, IN);
      const mesh = new THREE.Mesh(geo, mat);
      mesh.castShadow = !(mat instanceof WashMaterial) || mat.castsShadow;
      mesh.receiveShadow = true;
      group.add(mesh);
    }
    return group;
  }
}

/**
 * Box between two points of a sloped line in the (z,y) plane, running along x.
 * `width` is the extent along x, `thick` the extent perpendicular to the slope,
 * `offset` shifts the board along the slope's up-normal.
 */
export function slopedBox(
  batch: GeometryBatch, mat: THREE.Material, x: number, width: number,
  p: Vec2, q: Vec2, thick: number, offset: number,
): void {
  const dz = q[0] - p[0], dy = q[1] - p[1];
  const len = Math.hypot(dz, dy);
  let nz = -dy / len, ny = dz / len;
  if (ny < 0) { nz = -nz; ny = -ny; }
  // Local +Z (box length) rotated about X by φ points along (dz,dy).
  const phi = Math.atan2(-dy, dz);
  batch.box(mat, [width, thick, len],
    [x, (p[1] + q[1]) / 2 + ny * offset, (p[0] + q[0]) / 2 + nz * offset], [phi, 0, 0]);
}

/** Turn a closed triangle soup (inches) so every face points away from its centroid — cheap winding fix for hand-built solids. */
function orientOutward(pos: number[]): void {
  let cx = 0, cy = 0, cz = 0;
  const n = pos.length / 3;
  for (let i = 0; i < pos.length; i += 3) { cx += pos[i]; cy += pos[i + 1]; cz += pos[i + 2]; }
  cx /= n; cy /= n; cz /= n;
  let score = 0;
  for (let i = 0; i < pos.length; i += 9) {
    const ax = pos[i + 3] - pos[i], ay = pos[i + 4] - pos[i + 1], az = pos[i + 5] - pos[i + 2];
    const bx = pos[i + 6] - pos[i], by = pos[i + 7] - pos[i + 1], bz = pos[i + 8] - pos[i + 2];
    const nx = ay * bz - az * by, ny = az * bx - ax * bz, nz = ax * by - ay * bx;
    score += nx * ((pos[i] + pos[i + 3] + pos[i + 6]) / 3 - cx) + ny * ((pos[i + 1] + pos[i + 4] + pos[i + 7]) / 3 - cy) + nz * ((pos[i + 2] + pos[i + 5] + pos[i + 8]) / 3 - cz);
  }
  if (score >= 0) return;
  for (let i = 0; i < pos.length; i += 9) for (let k = 0; k < 3; k++) {
    const t = pos[i + 3 + k]; pos[i + 3 + k] = pos[i + 6 + k]; pos[i + 6 + k] = t;
  }
}

/** Flat-shaded BufferGeometry from a triangle soup (inches); `outward` re-winds a closed solid so faces point away from its centroid. */
export function solidFromTriangles(tris: number[], outward = true): THREE.BufferGeometry {
  const pos = [...tris];
  if (outward) orientOutward(pos);
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.computeVertexNormals();
  g.setAttribute('uv', new THREE.Float32BufferAttribute(new Array((pos.length / 3) * 2).fill(0), 2));
  return g;
}

/**
 * Sweep a cross-section along a plan path with mitred corners (cornices, water table, entablature returns).
 * `path` is the wall line [x, z] traversed so the OUTWARD side is (−dz, dx) — front +x, right −z, rear −x, left +z
 * for the house outline walked as the elevations are drawn. `profile` is a polygon [proud, y] (`proud` = distance out
 * from the wall line). `closed` joins the last vertex back to the first.
 */
export function sweepProfile(path: Vec2[], profileIn: Vec2[], closed = false): THREE.BufferGeometry {
  const area = profileIn.reduce((s, [p, y], i) => s + p * profileIn[(i + 1) % profileIn.length][1] - profileIn[(i + 1) % profileIn.length][0] * y, 0);
  const profile = area < 0 ? [...profileIn].reverse() : profileIn; // counter-clockwise in (proud, y) keeps the winding outward
  const n = path.length;
  const segN: Vec2[] = [];
  for (let i = 0; i < (closed ? n : n - 1); i++) {
    const [ax, az] = path[i], [bx, bz] = path[(i + 1) % n];
    const len = Math.hypot(bx - ax, bz - az);
    segN.push([-(bz - az) / len, (bx - ax) / len]);
  }
  // Mitre offset at every vertex: bisector of the adjacent segment normals, scaled so the offset stays `proud` from both segments.
  const mitre: Vec2[] = path.map((_, i) => {
    const prev = closed ? segN[(i - 1 + segN.length) % segN.length] : segN[Math.max(i - 1, 0)];
    const next = closed ? segN[i % segN.length] : segN[Math.min(i, segN.length - 1)];
    const ax = prev[0] + next[0], az = prev[1] + next[1];
    const l = Math.hypot(ax, az);
    const dot = (ax / l) * next[0] + (az / l) * next[1];
    return [ax / l / dot, az / l / dot];
  });
  const at = (i: number, [p, y]: Vec2): number[] => [path[i][0] + mitre[i][0] * p, y, path[i][1] + mitre[i][1] * p];
  const tris: number[] = [];
  const segs = closed ? n : n - 1;
  for (let i = 0; i < segs; i++) {
    const j = (i + 1) % n;
    for (let k = 0; k < profile.length; k++) {
      const q = (k + 1) % profile.length;
      const a = at(i, profile[k]), b = at(j, profile[k]), c = at(j, profile[q]), d = at(i, profile[q]);
      tris.push(...a, ...b, ...c, ...a, ...c, ...d);
    }
  }
  if (!closed) { // end caps, each triangle wound to face away along the path
    const idx = THREE.ShapeUtils.triangulateShape(profile.map(([p, y]) => new THREE.Vector2(p, y)), []);
    for (const [end, sign] of [[0, -1], [n - 1, 1]] as const) {
      const s = end === 0 ? 0 : segN.length - 1;
      const dir: Vec2 = [segN[s][1], -segN[s][0]]; // path direction of the end segment
      for (const [a, b, c] of idx) {
        const pa = at(end, profile[a]), pb = at(end, profile[b]), pc = at(end, profile[c]);
        const ux = pb[0] - pa[0], uy = pb[1] - pa[1], uz = pb[2] - pa[2], vx = pc[0] - pa[0], vy = pc[1] - pa[1], vz = pc[2] - pa[2];
        const facing = (uy * vz - uz * vy) * dir[0] + (ux * vy - uy * vx) * dir[1]; // normal · direction
        tris.push(...pa, ...(facing * sign >= 0 ? [...pb, ...pc] : [...pc, ...pb]));
      }
    }
  }
  return solidFromTriangles(tris, false);
}
