/**
 * Placement of an opening in world space.
 *
 * Local frame of every window/door template: origin on the wall centreline at
 * the level's finished floor, +x along the wall, +y up, +z pointing OUTWARD
 * (for interior openings the +z side is arbitrary). The schema carries no
 * outward normal, so it is inferred: of the two wall normals, outward is the
 * one whose probe point falls outside the level's floor plate.
 */
import * as THREE from 'three';
import type { Level, Opening, Vec2 } from '../data/schema';
import { pointInPolygon } from './geometry';

export function openingFrame(op: Opening, level: Level): THREE.Matrix4 {
  const n: Vec2 = [Math.sin(op.angle), Math.cos(op.angle)];
  let yaw = op.angle;
  if (op.exterior) {
    const probe: Vec2 = [op.center[0] + n[0] * (op.depth / 2 + 3), op.center[1] + n[1] * (op.depth / 2 + 3)];
    if (level.floor.some((poly) => pointInPolygon(probe, poly))) yaw += Math.PI; // +n points inward → flip
  }
  return new THREE.Matrix4().compose(
    new THREE.Vector3(op.center[0], level.floorY, op.center[1]),
    new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), yaw),
    new THREE.Vector3(1, 1, 1),
  );
}
