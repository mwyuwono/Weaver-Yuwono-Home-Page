/**
 * FixtureBuilder — cabinets, island, fireplace, bath fixtures: each is just
 * its plan outline extruded from baseY for `height`, in a material chosen by
 * kind. Base cabinets and the island get a soapstone worktop on top.
 */
import * as THREE from 'three';
import type { Fixture, Level } from '../data/schema';
import type { Materials } from '../materials';
import { GeometryBatch, extrudeVertical } from './geometry';

const TOP_THICKNESS = 1.5;

function bodyMaterial(kind: Fixture['kind'], m: Materials): THREE.Material {
  switch (kind) {
    case 'cabinet-base':
    case 'cabinet-upper':
    case 'island':
    case 'vanity':
      return m.cabinet;
    case 'counter':
      return m.soapstone;
    case 'fireplace':
    case 'hearth':
      return m.brick;
    case 'tub':
    case 'shower':
    case 'toilet':
      return m.porcelain;
    case 'appliance':
      return m.appliance;
    case 'shelving':
      return m.wood;
  }
}

export function buildFixtures(level: Level, m: Materials): THREE.Group {
  const batch = new GeometryBatch();
  for (const f of level.fixtures) {
    const y0 = level.floorY + f.baseY;
    const hasTop = f.kind === 'cabinet-base' || f.kind === 'island' || f.kind === 'vanity';
    const bodyH = hasTop ? f.height - TOP_THICKNESS : f.height;
    const body = extrudeVertical(f.outline, undefined, y0, y0 + bodyH);
    batch.add(body, bodyMaterial(f.kind, m));
    body.dispose();
    if (hasTop) {
      const top = extrudeVertical(f.outline, undefined, y0 + bodyH, y0 + f.height);
      batch.add(top, m.soapstone);
      top.dispose();
    }
  }
  return batch.toGroup(`fixtures-${level.id}`);
}
