/** Lighting: one shadow-casting sun, a sky/ground hemisphere fill and a faint procedural environment for glass and metal. */
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

export function addLights(scene: THREE.Scene, renderer: THREE.WebGLRenderer, target: THREE.Vector3): void {
  scene.add(new THREE.HemisphereLight(0xdfeaf7, 0x8d8f7c, 1.15));

  const sun = new THREE.DirectionalLight(0xfff1de, 2.6);
  sun.position.copy(target).add(new THREE.Vector3(-45, 70, 60)); // front-left, high: lights the hero view
  sun.target.position.copy(target);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  const cam = sun.shadow.camera;
  cam.left = cam.bottom = -55;
  cam.right = cam.top = 55;
  cam.near = 10;
  cam.far = 220;
  sun.shadow.bias = -0.0004;
  sun.shadow.normalBias = 0.04;
  sun.shadow.radius = 3;
  scene.add(sun, sun.target);

  const pmrem = new THREE.PMREMGenerator(renderer);
  const env = new RoomEnvironment();
  scene.environment = pmrem.fromScene(env, 0.04).texture;
  scene.environmentIntensity = 0.35;
  env.dispose();
  pmrem.dispose();
}
