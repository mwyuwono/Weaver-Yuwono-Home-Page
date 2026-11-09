/** Camera framing: find the camera distance at which a box exactly fits the view for a given look direction. */
import * as THREE from 'three';

export interface View {
  position: THREE.Vector3;
  target: THREE.Vector3;
}

/** Screen space (CSS px) covered by UI at the top and bottom of the canvas, plus the canvas height. */
export interface Insets { top: number; bottom: number; height: number }

/**
 * `dir` points from the target toward the camera. `pad` > 1 leaves breathing room. With `insets` the box is fitted
 * into the band of the canvas between the UI overlays: the look target is moved along the camera's up axis so the
 * box is centred in that band (the orbit pivot moves with it).
 */
export function frameBox(box: THREE.Box3, dir: THREE.Vector3, camera: THREE.PerspectiveCamera, pad = 1.12, insets?: Insets): View {
  const target = box.getCenter(new THREE.Vector3());
  const toCam = dir.clone().normalize();
  const forward = toCam.clone().negate();
  const right = new THREE.Vector3().crossVectors(forward, new THREE.Vector3(0, 1, 0)).normalize();
  const up = new THREE.Vector3().crossVectors(right, forward).normalize();
  const tanFull = Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2);
  const band = insets ? Math.max(0.3, (insets.height - insets.top - insets.bottom) / insets.height) : 1; // free fraction of the height
  const tanV = tanFull * band; // the box has to fit this much of the vertical field
  const tanH = tanFull * camera.aspect;
  let dist = 0;
  const rel = new THREE.Vector3();
  for (let i = 0; i < 8; i++) {
    rel.set(i & 1 ? box.max.x : box.min.x, i & 2 ? box.max.y : box.min.y, i & 4 ? box.max.z : box.min.z).sub(target);
    const along = rel.dot(forward); // positive = farther from the camera than the target
    dist = Math.max(dist, Math.abs(rel.dot(right)) / tanH - along, Math.abs(rel.dot(up)) / tanV - along);
  }
  const d = dist * pad;
  if (insets) {
    // The band's centre sits (top - bottom) / 2 px below the canvas centre; shift the pivot up so the box lands there.
    const ndcDown = (insets.top - insets.bottom) / insets.height;
    target.addScaledVector(up, ndcDown * tanFull * d);
  }
  return { target, position: target.clone().addScaledVector(toCam, d) };
}
