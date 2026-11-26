// Rome house, rear exterior: dimensions in FEET.
// Plan axes: x east, y north (toward the courtyard), z up. z = 0 is courtyard grade (A201 ground line).
// Plan origin: west face of the garage wing (x) and the A104 plan's y datum (101 south wall outer face ≈ 1.91).
//
// Sources (vector geometry read from the AutoCAD plot PDF of Jan 10 2022,
// sheets dated 10/04/2021; scales checked against the printed dimension strings):
//   A101 as-built plans (1/4"), A104 first floor (1/4"), A105 second floor (1/2"), A201 elevations (1/4"), V101 site.
//   CAD source: "Clocktower Cottage 2022 dxf.dxf" (exported Nov 2026 from "Clocktower Cottage 2022.dwg", the newest DWG),
//   Drive paths for all sources: sources.local.json (gitignored). Read with dxf.mjs (units: inches). Registration (DXF_TO_MODEL
//   in dxf.mjs) matches all 29 A104 wall faces used here within 0.03 ft; the A201 rear elevation in the DXF confirms the garage
//   eave 9.23/9.63, apex 15.25 and chimney cap 33.03.
//   Photos (Jul–Aug 2021, Drive "Back of house - existing structure"): IMG_0429, IMG_0430, IMG_5536, IMG_5841,
//   Image 38 / Image 40 (Matt's field measurements written on the photos).
// Tags: [A104] etc. = measured from that sheet; [photo] = estimated from photos; [field] = Matt's tape marks;
// [recon] = reconstructed, not shown on any sheet; [decision] = handoff decision (Nov 2026).

export const FF = 1.0; // first floor / porch floor above courtyard [A201 note "approx 12 in above ground"]

// ---------------------------------------------------------------- existing envelope
export const eastBlock = { // 108/208 two-storey block with the rear gable [A104, A105, A201]
  x0: 34.77, x1: 52.47, y0: -1.69, y1: 33.01,
  wallTop: 22.2,      // underside of eave at the wall [A201 cornice 21.7–22.6]
  ridgeInner: 29.45,  // underside at the ridge [A201 inner rake]
  ridgeOuter: 30.3,   // top of roof at the peak [A201]
  eaveOverhang: 0.9, rakeOverhang: 0.6, roofT: 0.7,
};
export const westBlock = { // 101/203/201 block; E–W ridge, west gable to the street [recon from IMG_5536 + front photo]
  x0: 10.04, x1: 34.77, y0: 1.91, y1: 29.86,
  ridgeY: 21.8, ridgeInner: 29.45, pitch: 0.9, // north eave = 22.2 like the east block [photo IMG_0429]
  eaveOverhang: 0.9, rakeOverhang: 0.6, roofT: 0.7,
};
export const entry109 = { x0: 26.41, x1: 34.77, y0: 29.86, y1: 33.0 }; // rear entry, flush with 108 face [A101]
export const shedRoof = { // existing shed roof over 109 and the recess [A101 dashed eave line y 34.0; photos]
  x0: 20.53, xSplit: 26.41, x1: 34.77, yWall: 29.86, zWall: 11.6, yEave: 34.0, zEave: 9.4, t: 0.45,
};
export const garage = { // 111 garage + 110 storage wing [A101; field marks Image 38/40]
  x0: 0.29, x1: 20.53, y0: 29.5, y1: 40.62,
  wallTop: 9.23,      // soffit 9'-2 23/32" [field]
  eaveEdge: 9.63,     // roof edge 9'-7 1/2" [field]
  apex: 15.25,        // "15'3 roof height" [field; DXF A201 elevation]; pyramid hip [A201]
  overhang: 1.17,     // ~14" [field]
  frieze: 0.54,       // 6.5" [field]
};
export const oldChimney = { x0: 18.3, x1: 20.53, y0: 29.86, y1: 31.34, top: 24.0 }; // existing brickwork [A104 poché; top photo]

// existing openings: s = along the wall (x for north faces, y for east/west faces); z = bottom/top of the opening
export const winExisting = [
  // garage north face y 40.62: openings 6.73–9.51, 16.49–19.25 [A101/A104]; heights [A201 + field 48.35"]
  { id: 'garage-N-west', face: 'N', at: 40.62, s0: 6.73, s1: 9.51, z0: 3.4, z1: 7.15, cols: 2, rows: 1 },
  { id: 'garage-N-east', face: 'N', at: 40.62, s0: 16.49, s1: 19.25, z0: 3.4, z1: 7.15, cols: 2, rows: 1 },
  // 101 window in the recess, y 29.86 [A101 22.09–24.94; A201 sill 1.6, head 8.8]
  { id: '101-N', face: 'N', at: 29.86, s0: 22.09, s1: 24.94, z0: 1.6, z1: 8.8, cols: 2, rows: 4 },
  // 109 face y 33.0: window / door / window [A101; heights IMG_5841]
  { id: '109-N-west', face: 'N', at: 33.0, s0: 27.08, s1: 29.18, z0: 4.1, z1: 7.6, cols: 1, rows: 2 },
  { id: '109-N-east', face: 'N', at: 33.0, s0: 32.49, s1: 34.6, z0: 4.1, z1: 7.6, cols: 1, rows: 2 },
  // 108 study, y 33.01 [A104 37.01–39.77, 47.51–50.25; A201 4.3–9.1]
  { id: '108-N-west', face: 'N', at: 33.01, s0: 37.01, s1: 39.77, z0: 4.4, z1: 9.0, cols: 2, rows: 2 },
  { id: '108-N-east', face: 'N', at: 33.01, s0: 47.51, s1: 50.25, z0: 4.4, z1: 9.0, cols: 2, rows: 2 },
  // second floor [A105 x; A201 z]
  { id: '208-N-west', face: 'N', at: 33.01, s0: 36.86, s1: 39.7, z0: 15.5, z1: 20.8, cols: 2, rows: 2 },
  { id: '208-N-east', face: 'N', at: 33.01, s0: 47.57, s1: 50.41, z0: 15.5, z1: 20.8, cols: 2, rows: 2 },
  { id: '201-N-landing', face: 'N', at: 29.86, s0: 29.55, s1: 32.39, z0: 12.8, z1: 19.8, cols: 2, rows: 2 }, // A201 sill 12.6; top [photo]
  { id: '203-N', face: 'N', at: 29.86, s0: 22.37, s1: 25.12, z0: 15.5, z1: 20.8, cols: 2, rows: 2 },     // z [photo]
];
export const ventsExisting = [ // 208 attic vents [A201 x 40.5–42.2, 45.0–46.7; z 23.1–25.4]
  { id: '208-vent-west', at: 33.01, s0: 40.55, s1: 42.2, z0: 23.1, z1: 25.4 },
  { id: '208-vent-east', at: 33.01, s0: 45.0, s1: 46.65, z0: 23.1, z1: 25.4 },
];
export const doorsExisting = [
  { id: '109-door', face: 'N', at: 33.0, s0: 29.56, s1: 32.16, z0: 1.15, z1: 7.95, glazed: true }, // [A101; IMG_5841]
  { id: '110-door-north', face: 'E', at: 20.53, s0: 36.95, s1: 39.65, z0: 0.15, z1: 7.0 },        // kept [A101/A104]
  { id: '110-door-south', face: 'E', at: 20.53, s0: 32.75, s1: 35.15, z0: 0.15, z1: 7.0, removed: true }, // infilled [A102/A104]
  { id: '111-garage-door', face: 'W', at: 0.29, s0: 30.6, s1: 38.6, z0: 0.0, z1: 7.2, garage: true }, // [A101 opening; IMG_5536]
];

// ---------------------------------------------------------------- site
export const site = {
  courtyard: [[0.5, 29.5], [0.5, 66.95], [55.9, 61.25], [55.9, 29.5]], // [A104/V101 walls]
  northWall: { a: [0.96, 66.7], b: [56.74, 60.97], t: 0.75, h: 7.5, fence: 3.5 },   // retaining wall + iron fence [A104; IMG_0430]
  eastWall: { x0: 55.91, x1: 56.74, y0: 33.01, y1: 60.6, h: 5.0, fence: 3.5 },       // [A104; IMG_0429]
  westWall: { x0: 0.13, x1: 0.96, y0: 56.71, y1: 67.08, h: 6.0 },                    // [A104]
  gate: { x: 0.55, y0: 40.75, y1: 56.6, h: 6.0 },                                      // double iron gate [A104 gap; IMG_0430, Image 40]
  planter: { cx: 31.0, cy: 47.3, r: 2.65, wall: 0.36, h: 0.6 },                        // existing [photo, ±~1.5 ft]; removed in the renovation [Matt]
};

// ---------------------------------------------------------------- proposed (A104 / A201, plus Nov 2026 decisions)
export const porch = { // 113 rear porch addition [A104: 20' deep, x 34.77–52.47, y 33.01–53.01]
  x0: 34.77, x1: 52.47, y0: 33.01, y1: 53.01,
  steps: [{ x0: 32.77, x1: 33.77, top: 0.33 }, { x0: 33.77, x1: 34.77, top: 0.67 }], // west side, y 39.69–53.01 [A104 lines]
  stepY0: 39.69,
  columns: [ // 4 Doric wood columns; plinth centres [A104]
    { id: 'col-N-west', x: 37.705, y: 52.63 }, { id: 'col-N-east', x: 49.535, y: 52.63 },
    { id: 'col-W-south', x: 35.135, y: 41.885 }, { id: 'col-W-north', x: 35.135, y: 50.065 },
  ],
  plinth: 0.79, shaftR0: 0.33, shaftR1: 0.28,
  entabZ0: 8.8, entabZ1: 10.0, corniceZ1: 10.3, // [A201]
  piers: [ // [A104 poché]
    [34.77, 36.77, 52.26, 53.01], [34.77, 35.51, 51.01, 52.26], // NW corner
    [50.47, 52.47, 52.26, 53.01], [51.73, 52.47, 49.97, 52.26], // NE corner
    [34.77, 35.51, 39.69, 40.94],                                // west pier at the rear entry
    [51.73, 52.47, 33.01, 35.3], [51.73, 52.47, 38.64, 40.97], [51.73, 52.47, 44.3, 46.64], // east wall
  ],
  eastOpenings: [[35.3, 38.64], [40.97, 44.3], [46.64, 49.97]], // fixed louvred shutters, no glazing [A201 note, A3]
  eastSill: 2.4, eastHead: 8.6,
  roof: { ridgeX: 43.62, eaveZ: 10.3, ridgeZ: 14.9, x0: 34.4, x1: 52.84, yEnd: 53.45, t: 0.3 }, // standing seam [A201]
};
export const fireplace = { // [A104 box x 41.6–45.7 × y 33.0–34.7; A201 elevations; decision: all-brick, recessed opening]
  cl: 43.61,                       // shared centreline: existing study fireplace 41.56–45.66, A104 box, A201 breast
  surroundW: 5.4, depth: 1.7,      // brick in the porch zone [A201 e 7.0–12.4]
  surroundTop: 8.8,
  openingW: 3.0, openingZ1: 4.4, recess: 1.2,
  hearth: { depth: 2.0, t: 0.25 },
  breastW: 4.0, shoulderZ0: 21.4, shoulderZ1: 22.6, stackW: 2.0, stackTop: 33.03, // [A201; cap height from the DXF]
};
export const rearEntry = { // 109 extension: open bay with Roman-lattice railing, flat roof, Greek-key parapet [A104, A201]
  x0: 26.41, x1: 34.77, y0: 33.0, y1: 39.69, wallT: 0.75,
  westOpening: [33.98, 37.98], westSill: 2.4, westHead: 8.5, // fixed shutters [A1]
  northOpening: [28.41, 33.51], railZ1: 3.8,                  // [A104, A201 A2]
  roof: { y0: 29.86, fasciaZ0: 9.46, z0: 10.08, z1: 10.38, cornice: 0.38 }, // fascia, cornice [DXF A2/A1]
  parapet: { // [DXF rear elevation A2 (x, z) and side elevation A1 (y); Nov 2026]
    peds: [[26.40, 28.40, 38.06, 39.69], [33.50, 35.50, 38.06, 39.69], // NW, NE: 2.0 ft over the A104 north-wall piers
      [26.40, 28.40, 29.86, 31.49]],                                   // SW: depth from A1; width assumed = NW (hidden in A2)
    pedTop: 11.48, capTop: 11.68, capOver: 0.09, pedPanel: { inset: 0.42, z0: 10.63, z1: 11.23 },
    panelTop: 11.35, panelT: 0.45, keyZ: [10.71, 11.23], keyUnit: 0.727,
  },
};
export const garden = { // conceptual planted courtyard [decision]
  driveCourt: [[0.5, 40.62], [0.5, 56.7], [24.0, 56.7], [24.0, 40.62], [26.41, 40.62], [26.41, 33.0], [20.53, 33.0], [20.53, 40.62]],
};
export const cameras = { garageSide: null }; // filled by build.mjs (sightline search)
