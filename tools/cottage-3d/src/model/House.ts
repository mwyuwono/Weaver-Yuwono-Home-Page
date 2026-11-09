/**
 * House — assembles all builders into one THREE.Group per level plus the
 * static site. Each level group is then flattened: every mesh in it is merged
 * per material and given its OWN clone of each material, so the explode
 * controller can fade one level without touching the others (textures are
 * shared between clones; only the cheap material objects are duplicated).
 */
import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import type { HouseData, Level, LevelId } from '../data/schema';
import { materials as m } from '../materials';
import { planToScene } from '../units';
import { buildChimneySlice } from '../builders/ChimneyBuilder';
import { buildDoors } from '../builders/DoorBuilder';
import { buildFixtures } from '../builders/FixtureBuilder';
import { buildFloor } from '../builders/FloorBuilder';
import { buildGableInfill, buildMainRoof, buildWingRoof } from '../builders/RoofBuilder';
import { buildPorch } from '../builders/PorchBuilder';
import { buildSite } from '../builders/SiteBuilder';
import { buildTerrain, type Grade } from '../builders/TerrainBuilder';
import { buildCornerPilasters, buildDormerTrim, buildEntablature, buildWaterTable, buildWingCornice } from '../builders/TrimBuilder';
import { buildStairs, stairwellHole } from '../builders/StairBuilder';
import { buildWalls } from '../builders/WallBuilder';
import { buildWindows } from '../builders/WindowBuilder';

export type LevelKey = LevelId | 'roof';

/** Merge all meshes under `parts` by material into a fresh group with per-group material clones. */
function flatten(name: string, parts: (THREE.Object3D | null)[]): THREE.Group {
  const byMaterial = new Map<THREE.Material, THREE.BufferGeometry[]>();
  for (const part of parts) {
    part?.traverse((o) => {
      if (!(o instanceof THREE.Mesh)) return;
      const list = byMaterial.get(o.material) ?? [];
      list.push(o.geometry);
      byMaterial.set(o.material, list);
    });
  }
  const group = new THREE.Group();
  group.name = name;
  for (const [mat, geos] of byMaterial) {
    const merged = mergeGeometries(geos, false);
    geos.forEach((g) => g.dispose());
    if (!merged) continue;
    const mesh = new THREE.Mesh(merged, mat.clone());
    mesh.castShadow = !(mat instanceof THREE.MeshPhysicalMaterial);
    mesh.receiveShadow = true;
    group.add(mesh);
  }
  return group;
}

export class House {
  /** Parent of everything; add this to the scene. */
  readonly root = new THREE.Group();
  /** Independently movable groups: basement, first, second, roof. */
  readonly levels = new Map<LevelKey, THREE.Group>();
  /** Terrain, retaining walls, steps, fence — static while assembled; the explode controller sinks it away. */
  readonly site: THREE.Group;
  /** Grade height function (inches) used by the terrain and by the camera ground clamp. */
  readonly grade: Grade;
  /** Assembled-position bounds per level group (scene feet). */
  readonly bounds = new Map<LevelKey, THREE.Box3>();

  constructor(data: HouseData) {
    const byId = new Map<LevelId, Level>(data.levels.map((l) => [l.id, l]));
    const first = byId.get('first');
    const second = byId.get('second');
    const secondTop = second ? second.floorY + second.ceilingHeight : Infinity;
    const chimney = data.chimney;

    const flights = data.levels.flatMap((l) => l.stairs);

    for (const level of data.levels) {
      // A flight arriving at this floor opens a stairwell hole in it.
      const holes = flights.filter((s) => Math.abs(s.topY - level.floorY) < 1).map(stairwellHole);
      const parts: (THREE.Object3D | null)[] = [
        buildFloor(level, m, holes), buildWalls(level, m), buildWindows(level, m, data.trim.casing), buildDoors(level, m, data.trim),
        buildStairs(level, m), buildFixtures(level, m),
      ];
      if (level.id !== 'basement') parts.push(buildCornerPilasters(data, level, m));
      if (level.id === 'first') parts.push(buildWaterTable(data, m), buildWingRoof(data, m), buildWingCornice(data, m), buildPorch(data, m));
      if (level.id === 'second') parts.push(buildEntablature(data, m), buildGableInfill(data, m));
      // Chimney slice that passes through this level, from its slab up to the next level's slab.
      const top = level.id === 'basement' ? (first?.floorY ?? 0) : level.id === 'first' ? (second?.floorY ?? secondTop) : secondTop;
      const bottom = level.id === 'basement' ? -Infinity : level.floorY;
      parts.push(buildChimneySlice(chimney, bottom, top, false, m));
      this.levels.set(level.id, flatten(level.id, parts));
    }

    this.levels.set('roof', flatten('roof', [
      buildMainRoof(data, m),
      buildDormerTrim(data, m),
      buildChimneySlice(chimney, secondTop, Infinity, true, m),
    ]));

    for (const [key, group] of this.levels) {
      this.root.add(group);
      this.bounds.set(key, new THREE.Box3().setFromObject(group));
    }
    const terrain = buildTerrain(data, m, planToScene([(data.roof.main.xMin + data.roof.main.xMax) / 2, (data.roof.main.zFront + data.roof.main.zRear) / 2]));
    this.grade = terrain.grade;
    this.site = new THREE.Group();
    this.site.name = 'site';
    this.site.add(terrain.mesh, flatten('site-structures', [buildSite(data, m)]));
    this.root.add(this.site);
    const r = data.roof.main;
    this.center = planToScene([(r.xMin + r.xMax) / 2, (r.zFront + r.zRear) / 2]);
  }

  /** Plan centre of the main block at Y = 0, in scene feet (light and camera anchor). */
  readonly center: THREE.Vector3;
}
