/**
 * Data loader. Prefers the extractor's `house.json`; falls back to the
 * hand-written development fixture `house.sample.json`. The JSON file that is
 * chosen is lazy-loaded (its own chunk), so only one dataset is downloaded.
 */
import type { HouseData } from './schema';

const loaders = import.meta.glob<HouseData>('./*.json', { import: 'default' });

export async function loadHouseData(): Promise<HouseData> {
  const load = loaders['./house.json'] ?? loaders['./house.sample.json'];
  if (!load) throw new Error('No house.json or house.sample.json found in src/data');
  return load();
}
