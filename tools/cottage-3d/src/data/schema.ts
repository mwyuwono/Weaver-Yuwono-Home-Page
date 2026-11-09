/**
 * house.json schema — the contract between the DXF extractor (Python) and the
 * Three.js builders (TypeScript).
 *
 * Conventions (all builders and the extractor MUST follow these):
 *  - Units: INCHES everywhere in house.json. The app converts to feet at load
 *    time (scene unit = 1 ft) via `IN`.
 *  - Plan coordinates are Vec2 = [x, z]:
 *      x  → increases to the RIGHT when standing in front of the house looking at it.
 *      z  → increases TOWARD THE FRONT (street side). The front face of the main
 *           block's exterior wall is z = 0; the house extends into negative z.
 *    Origin x = 0 is the outside face of the main block's LEFT exterior wall
 *    (the chimney side).
 *  - Heights (Y) are measured from the FIRST-FLOOR SUBFLOOR (top of 1st floor
 *    framing) = 0. Basement floor is negative. Y is up.
 *  - Polygons are arrays of Vec2, counter-clockwise when viewed from above
 *    (+Y looking down), not closed (first point is not repeated).
 *  - Angles are radians, measured in the x/z plane from +x toward −z
 *    (i.e. counter-clockwise seen from above).
 */

export type Vec2 = [number, number];

export type LevelId = 'basement' | 'first' | 'second';

export interface HouseData {
  meta: {
    units: 'in';
    source: string;
    generated: string;
    /** Free-form notes from the extractor (assumptions, manual overrides). */
    notes: string[];
  };
  levels: Level[];
  roof: Roof;
  chimney: Chimney;
  site: Site;
}

export interface Level {
  id: LevelId;
  name: string;
  /** Y of the finished floor surface (top of subfloor / slab). */
  floorY: number;
  /** Clear ceiling height above floorY. Walls extrude to floorY + ceilingHeight. */
  ceilingHeight: number;
  /** Thickness of the floor assembly BELOW floorY (framing or slab). */
  floorThickness: number;
  /** Floor plate outline(s) — usually the exterior wall outer perimeter. */
  floor: Vec2[][];
  /** Wall solids as plan polygons, extruded from floorY to floorY + (height ?? ceilingHeight). */
  walls: Wall[];
  /** Windows, doors and cased openings. Walls have GAPS where these sit; builders fill
   *  sill (below) and header (above) infill across the gap. */
  openings: Opening[];
  stairs: Stair[];
  fixtures: Fixture[];
  rooms: Room[];
}

export interface Wall {
  outline: Vec2[];
  holes?: Vec2[][];
  exterior: boolean;
  /** Override height (e.g. a knee wall or low partition). Defaults to level.ceilingHeight. */
  height?: number;
}

export type WindowSym = 'A' | 'B' | 'C' | 'D' | 'E' | 'F';

export interface Opening {
  kind: 'window' | 'door' | 'opening';
  /** Window / door schedule symbol, when known. */
  sym?: WindowSym;
  /** Centre of the opening on the wall's centreline, plan coords. */
  center: Vec2;
  /** Rough opening width along the wall. */
  width: number;
  /** Wall thickness at the opening. */
  depth: number;
  /** Direction of the wall run (see angle convention). */
  angle: number;
  /** Height of the bottom of the opening above level.floorY (0 for doors). */
  sill: number;
  /** Height of the top of the opening above level.floorY. */
  head: number;
  exterior: boolean;
  /** Muntin grid per sash: [columns, rows]. For double-hung, applied to each sash. */
  lites?: [number, number];
  style?: 'double-hung' | 'casement' | 'awning' | 'fixed' | 'door-panel';
}

export interface Stair {
  /** Plan footprint of the run. */
  outline: Vec2[];
  /** Unit vector (plan) pointing in the climbing direction. */
  direction: Vec2;
  /** Y at bottom and top of this run. */
  bottomY: number;
  topY: number;
  risers: number;
  width: number;
}

export interface Fixture {
  kind: 'cabinet-base' | 'cabinet-upper' | 'island' | 'counter' | 'fireplace' | 'hearth' | 'tub' | 'shower' | 'vanity' | 'toilet' | 'appliance' | 'shelving';
  outline: Vec2[];
  /** Bottom of the fixture above level.floorY. */
  baseY: number;
  height: number;
}

export interface Room {
  name: string;
  /** Label anchor point (plan). */
  label: Vec2;
  outline?: Vec2[];
}

export interface Roof {
  /** Main block: side-gabled, ridge runs along x. All Y values are TOP surfaces of the roof slab. */
  main: {
    xMin: number; // outside face of left wall
    xMax: number; // outside face of right wall
    zFront: number; // outside face of front wall (0)
    zRear: number; // outside face of rear wall
    eaveY: number; // Y of the roof TOP surface at the front wall plane (the wall/frieze top sits below it)
    ridgeY: number; // Y of the roof top surface at the ridge (mid-depth)
    pitch: number; // rise per 12 run (informational; geometry derives the slope from eaveY/ridgeY/depth)
    overhangEave: number; // horizontal projection of the eave tips past the front/rear wall planes
    overhangRake: number; // horizontal projection past gable walls
    thickness: number; // VERTICAL thickness of the slab
    seamSpacing: number; // standing-seam spacing
    /**
     * Optional full-width shed dormer over the rear half of the second floor. Its roof replaces the main rear
     * slope behind `zJoin`; omit for a plain symmetric gable.
     */
    rearDormer?: {
      zJoin: number; // z where the dormer roof meets the main rear slope
      joinY: number; // roof top Y at that join
      tipZ: number; // z of the dormer eave tip (past the rear wall plane)
      tipY: number; // roof top Y at the tip
      wallTopY: number; // top of the rear second-floor wall (cornice starts here)
    };
  };
  /** One-storey rear wing with a shed roof sloping away from the main block. */
  wing: {
    xMin: number;
    xMax: number;
    zNear: number; // edge against main block rear wall (high side)
    zFar: number; // far outside face (low side)
    highY: number; // roof top Y at zNear
    lowY: number; // roof top Y at zFar
    overhang: number;
    thickness: number;
  } | null;
  /** Frieze / entablature band under the main eave (front only), for Option 1 trim. */
  frieze: {
    height: number;
    projection: number;
    /** Y of the top of the frieze (= front second-floor wall top). Defaults to eaveY − roof thickness. */
    topY?: number;
  } | null;
}

export interface Chimney {
  outline: Vec2[];
  baseY: number;
  topY: number;
}

export interface Site {
  /** Approximate grade Y at front wall, rear wall (walk-out side), used for a sloped ground plane. */
  gradeFrontY: number;
  gradeRearY: number;
  /** Ground plane extent around the house (inches beyond the footprint). */
  margin: number;
  retainingWalls: { outline: Vec2[]; baseY: number; topY: number }[];
  frontSteps: { outline: Vec2[]; bottomY: number; topY: number; risers: number } | null;
  deck: { outline: Vec2[]; y: number; thickness: number; railingHeight: number } | null;
}
