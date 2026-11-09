/** Camera framing: find the camera distance at which a box exactly fits the view for a given look direction. */
import * as THREE from 'three';

export interface View {
  position: THREE.Vector3;
  target: THREE.Vector3;
}

/** `dir` points from the target toward the camera. `pad` > 1 leaves breathing room. */
export function frameBox(box: THREE.Box3, dir: THREE.Vector3, camera: THREE.PerspectiveCamera, pad = 1.12): View {
  const target = box.getCenter(new THREE.Vector3());
  const toCam = dir.clone().normalize();
  const forward = toCam.clone().negate();
  const right = new THREE.Vector3().crossVectors(forward, new THREE.Vector3(0, 1, 0)).normalize();
  const up = new THREE.Vector3().crossVectors(right, forward).normalize();
  const tanV = Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2);
  const tanH = tanV * camera.aspect;
  let dist = 0;
  const rel = new THREE.Vector3();
  for (let i = 0; i < 8; i++) {
    rel.set(i & 1 ? box.max.x : box.min.x, i & 2 ? box.max.y : box.min.y, i & 4 ? box.max.z : box.min.z).sub(target);
    const along = rel.dot(forward); // positive = farther from the camera than the target
    dist = Math.max(dist, Math.abs(rel.dot(right)) / tanH - along, Math.abs(rel.dot(up)) / tanV - along);
  }
  return { target, position: target.clone().addScaledVector(toCam, dist * pad) };
}
