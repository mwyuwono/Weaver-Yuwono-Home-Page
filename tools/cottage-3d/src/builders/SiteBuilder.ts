/**
 * SiteBuilder — the static structures that stand on the terrain: brick retaining walls with coping and the front
 * steps between their brick cheeks, plus the fenced storage. They sink away with the terrain when the model
 * explodes (see House.site). The ground itself is in TerrainBuilder.ts.
 */
import * as THREE from 'three';
import type { HouseData, Vec2 } from '../data/schema';
import type { Materials } from '../materials';
import { GeometryBatch, extrudeVertical } from './geometry';
import { addFence } from './PorchBuilder';

function bbox(outline: Vec2[]) {
  const xs = outline.map((p) => p[0]), zs = outline.map((p) => p[1]);
  return { x0: Math.min(...xs), x1: Math.max(...xs), z0: Math.min(...zs), z1: Math.max(...zs) };
}

export function buildSite(data: HouseData, m: Materials): THREE.Group {
  const b = new GeometryBatch();

  for (const w of data.site.retainingWalls) {
    const body = extrudeVertical(w.outline, undefined, w.baseY, w.topY);
    b.add(body, m.brick);
    body.dispose();
    const r = bbox(w.outline);
    b.box(m.concrete, [r.x1 - r.x0 + 2, 2, r.z1 - r.z0 + 2], [(r.x0 + r.x1) / 2, w.topY + 1, (r.z0 + r.z1) / 2]); // coping
  }

  const st = data.site.frontSteps;
  if (st) {
    const r = bbox(st.outline);
    const tread = (r.z1 - r.z0) / st.risers, rise = (st.topY - st.bottomY) / st.risers;
    for (let i = 1; i <= st.risers; i++) {
      const depth = (st.risers - i + 1) * tread; // higher steps sit nearer the house
      b.box(m.concrete, [r.x1 - r.x0, i * rise, depth], [(r.x0 + r.x1) / 2, st.bottomY + (i * rise) / 2, r.z0 + depth / 2]);
    }
  }

  addFence(b, data, m);
  return b.toGroup('site');
}
