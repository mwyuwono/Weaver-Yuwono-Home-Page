/** Perspective camera + damped OrbitControls that cannot dive under the ground. */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export function createCamera(): THREE.PerspectiveCamera {
  return new THREE.PerspectiveCamera(32, 1, 1, 1500);
}

/** `minY()` is the lowest allowed camera height (scene feet) at its current position, or −Infinity when there is no ground. */
export function createControls(camera: THREE.PerspectiveCamera, dom: HTMLElement, minY: (x: number, z: number) => number): OrbitControls {
  const controls = new OrbitControls(camera, dom);
  controls.enableDamping = true;
  controls.dampingFactor = 0.09;
  controls.minDistance = 10;
  controls.maxDistance = 260;
  controls.maxPolarAngle = Math.PI / 2 - 0.03; // never below the target's horizon, hence never under the ground
  controls.screenSpacePanning = false; // pan along the ground plane so the target keeps its height
  controls.addEventListener('change', () => { // never dive below the terrain
    const floor = minY(camera.position.x, camera.position.z);
    if (camera.position.y < floor) camera.position.y = floor;
  });
  return controls;
}
