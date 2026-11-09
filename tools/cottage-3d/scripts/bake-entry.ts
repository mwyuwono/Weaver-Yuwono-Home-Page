/** Bundled by scripts/bake-lines.mjs and run in node: builds the house and encodes its classified linework. */
import type { HouseData } from '../src/data/schema';
import { encodeLineSets, type LineSets } from '../src/render/bakedLines';
import { House } from '../src/model/House';

export function bake(data: HouseData, hash: string): { bytes: Uint8Array; segments: number } {
  let sets: LineSets = {};
  const house = new House(data, { onLineSets: (s) => { sets = s; } });
  return { bytes: encodeLineSets(sets, hash), segments: house.lineSegments };
}
