/**
 * Lighting: a single shadow-casting sun. It is not used for realistic lighting — the wash shader reads its direction
 * for the soft tonal bands and its shadow map for the delicate ground shadow. No ambient, hemisphere or environment light.
 */
import * as THREE from 'three';
import { sunDirection } from '../render/wash';

export function addLights(scene: THREE.Scene, target: THREE.Vector3): void {
  const sun = new THREE.DirectionalLight(0xffffff, Math.PI); // PI: WashMaterial reads N.L * shadow straight from the Lambert term
  sun.position.copy(target).add(new THREE.Vector3(-45, 70, 60)); // front-left, high: lights the hero view
  sun.target.position.copy(target);
  sun.castShadow = true;
  sun.shadow.mapSize.set(4096, 4096);
  const cam = sun.shadow.camera;
  cam.left = cam.bottom = -48;
  cam.right = cam.top = 48;
  cam.near = 10;
  cam.far = 220;
  // About a quarter of an inch per texel: fine enough for the shadow of a casing or a pilaster to register as a thin,
  // clean line of tone beside it. The biases stay just large enough to keep sloped and grazing faces free of acne.
  sun.shadow.bias = -0.0004;
  sun.shadow.normalBias = 0.035;
  scene.add(sun, sun.target);
  sunDirection.value.copy(sun.position).sub(target).normalize();
}
