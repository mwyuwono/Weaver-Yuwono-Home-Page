/** Perspective camera + damped OrbitControls that cannot dive under the ground. */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export function createCamera(): THREE.PerspectiveCamera {
  return new THREE.PerspectiveCamera(32, 1, 1, 1500);
}

export function createControls(camera: THREE.PerspectiveCamera, dom: HTMLElement): OrbitControls {
  const controls = new OrbitControls(camera, dom);
  controls.enableDamping = true;
  controls.dampingFactor = 0.09;
  controls.minDistance = 10;
  controls.maxDistance = 260;
  controls.maxPolarAngle = Math.PI / 2 - 0.03; // never below the target's horizon, hence never under the ground
  controls.screenSpacePanning = false; // pan along the ground plane so the target keeps its height
  return controls;
}
