/**
 * Unit helpers. house.json is in inches; the scene is in feet. Builders author
 * geometry in inches and GeometryBatch scales it by IN when it emits meshes,
 * so scene-space (feet) values only appear at the scene/camera/animation layer.
 */
import * as THREE from 'three';
import type { Vec2 } from './data/schema';

/** Inches → scene units (feet). */
export const IN = 1 / 12;

/** Plan point [x, z] (+ optional height in inches) → scene-space Vector3 (feet). Plan x,z map straight to scene x,z. */
export function planToScene(p: Vec2, yInches = 0): THREE.Vector3 {
  return new THREE.Vector3(p[0] * IN, yInches * IN, p[1] * IN);
}
