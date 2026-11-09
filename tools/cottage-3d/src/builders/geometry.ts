/**
 * Geometry helpers shared by all builders. Everything here works in INCHES;
 * GeometryBatch converts to scene feet when it emits meshes.
 */
import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import type { Vec2 } from '../data/schema';
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

/** Rebuild UVs from world position (inches): project along the face's dominant normal axis. */
function applyWorldUV(geo: THREE.BufferGeometry): void {
  const pos = geo.getAttribute('position');
  const nor = geo.getAttribute('normal');
  const uv = new Float32Array(pos.count * 2);
  for (let i = 0; i < pos.count; i++) {
    const ax = Math.abs(nor.getX(i)), ay = Math.abs(nor.getY(i)), az = Math.abs(nor.getZ(i));
    let u: number, v: number;
    if (ax >= ay && ax >= az) { u = pos.getZ(i); v = pos.getY(i); }
    else if (az >= ay) { u = pos.getX(i); v = pos.getY(i); }
    else { u = pos.getX(i); v = pos.getZ(i); }
    uv[i * 2] = u;
    uv[i * 2 + 1] = v;
  }
  geo.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
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
    if (material.userData.worldUV) applyWorldUV(g);
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
      mesh.castShadow = !(mat instanceof THREE.MeshPhysicalMaterial);
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
