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
  sun.shadow.mapSize.set(2048, 2048);
  const cam = sun.shadow.camera;
  cam.left = cam.bottom = -55;
  cam.right = cam.top = 55;
  cam.near = 10;
  cam.far = 220;
  sun.shadow.bias = -0.0008;
  sun.shadow.normalBias = 0.09; // generous: acne on the walls would read as stray hatch marks
  sun.shadow.radius = 5;
  sun.shadow.blurSamples = 16;
  scene.add(sun, sun.target);
  sunDirection.value.copy(sun.position).sub(target).normalize();
}
