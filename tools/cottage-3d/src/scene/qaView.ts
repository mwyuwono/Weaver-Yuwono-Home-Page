/**
 * QA view (dev tool, loaded only for `?qa=front|rear|left|right`): an
 * orthographic, straight-on elevation at a FIXED scale with white background,
 * every material replaced by flat white and every mesh outlined in black, so the
 * screenshot reads like a CAD elevation. qa/overlay.mjs composites the DXF
 * elevation linework over it.
 *
 * Registration (shared with qa/elev_lines.py): the image centre is the middle of
 * the main block's face (u = 0), Y = QA_Y_CENTER inches, QA_PX_PER_IN pixels
 * per inch, and u grows to the right as seen from outside.
 */
import * as THREE from 'three';
import type { HouseData } from '../data/schema';
import type { House } from '../model/House';
import { IN } from '../units';

export type QaFace = 'front' | 'rear' | 'left' | 'right';
export const QA_PX_PER_IN = 2;
export const QA_Y_CENTER = 100;

/** Outward direction (target → camera) for each face. */
const OUT: Record<QaFace, [number, number]> = { front: [0, 1], rear: [0, -1], right: [1, 0], left: [-1, 0] };

/** Flatten materials, add outlines and return the orthographic camera for `face`. */
export function applyQaView(scene: THREE.Scene, renderer: THREE.WebGLRenderer, house: House, data: HouseData, face: QaFace, centre: THREE.Vector3, size: { w: number; h: number }): THREE.OrthographicCamera {
  document.body.classList.add('qa'); // style.css hides the page chrome
  scene.background = new THREE.Color(0xffffff);
  scene.fog = null;
  renderer.setClearColor(0xffffff, 1);
  renderer.shadowMap.enabled = false;

  const flat = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide, polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 1 });
  const ink = new THREE.LineBasicMaterial({ color: 0x000000 });
  house.root.traverse((o) => {
    // Vector linework is hidden in QA: the elevation check compares wash
    // geometry against the DXF, and LineSegments2 is a Mesh subclass.
    if ((o as { isLineSegments2?: boolean }).isLineSegments2 === true) {
      o.visible = false;
      return;
    }
    if (!(o instanceof THREE.Mesh)) return;
    o.material = flat;
    o.add(new THREE.LineSegments(new THREE.EdgesGeometry(o.geometry, 20), ink));
  });

  addGradeLine(scene, house, data, face);

  const halfW = size.w / (2 * QA_PX_PER_IN * 12), halfH = size.h / (2 * QA_PX_PER_IN * 12);
  const cam = new THREE.OrthographicCamera(-halfW, halfW, halfH, -halfH, 1, 1200);
  const [ox, oz] = OUT[face];
  const target = new THREE.Vector3(centre.x, QA_Y_CENTER * IN, centre.z);
  cam.position.copy(target).add(new THREE.Vector3(ox * 400, 0, oz * 400));
  cam.lookAt(target);
  cam.updateProjectionMatrix();
  return cam;
}

/**
 * The model's grade as a black line along the wall plane of `face` (a section line, drawn on top): the terrain meets
 * the walls there, so this is exactly the line the DXF elevations draw as grade.
 */
function addGradeLine(scene: THREE.Scene, house: House, data: HouseData, face: QaFace): void {
  const r = data.roof.main, w = data.roof.wing;
  const pts: [number, number][] = []; // plan [x, z]
  const step = 6, pad = 80;
  if (face === 'left' || face === 'right') {
    for (let z = r.zFront + pad; z >= r.zRear - 300; z -= step) pts.push([face === 'left' ? r.xMin : r.xMax, z]);
  } else {
    for (let x = r.xMin - pad; x <= r.xMax + pad; x += step) {
      const behindWing = face === 'rear' && w && x > w.xMin && x < w.xMax;
      pts.push([x, face === 'front' ? r.zFront : behindWing ? w.zFar : r.zRear]);
    }
  }
  const verts: number[] = [];
  for (let i = 0; i < pts.length - 1; i++) {
    for (const [x, z] of [pts[i], pts[i + 1]]) verts.push(x * IN, house.grade.y(x, z) * IN, z * IN);
  }
  const geo = new THREE.BufferGeometry().setAttribute('position', new THREE.Float32BufferAttribute(verts, 3));
  const line = new THREE.LineSegments(geo, new THREE.LineBasicMaterial({ color: 0x000000, depthTest: false }));
  line.renderOrder = 10;
  scene.add(line);
}
