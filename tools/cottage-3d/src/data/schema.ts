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
  trim: Trim;
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
     * Optional rear shed dormer, INSET from both gable ends: the main roof runs on to the normal rear eave outside the
     * cheek walls. Its shallower roof starts on the main rear slope at `zJoin` and ends in an eave tip past the rear wall.
     */
    rearDormer?: {
      zJoin: number; // z where the dormer roof meets the main rear slope
      joinY: number; // roof top Y at that join
      tipZ: number; // z of the dormer eave tip (past the rear wall plane)
      tipY: number; // roof top Y at the tip
      wallTopY: number; // top of the dormer rear wall (dormer cornice starts here)
      xMin: number; // outer face of the left cheek wall
      xMax: number; // outer face of the right cheek wall
      roofXMin: number; // left edge of the dormer roof (rake overhang)
      roofXMax: number;
    };
  };
  /** One-storey rear wing under a hip roof whose apex sits on the main rear wall; the roof also covers the porch. */
  wing: {
    xMin: number; // wing wall outer faces
    xMax: number;
    zNear: number; // main block rear wall
    zFar: number; // far wall outer face
    wallTopY: number; // top of the wing walls (cornice stack starts here)
    hip: {
      x0: number; x1: number; // eave rectangle (roof top surface at the eave line)
      zFar: number; // far eave line
      apex: Vec2; // [x, z] — on the main rear wall
      apexY: number; // roof top Y at the apex
      eaveY: number; // roof top Y along the eave
      fascia: number; // fascia board projection past the eave line
    };
    thickness: number;
  } | null;
  /** Frieze under the main eave: `topY` is the top of the second-floor front/rear walls (the entablature profiles are in `trim`). */
  frieze: {
    /** Y of the top of the frieze (= front second-floor wall top). Defaults to eaveY − roof thickness. */
    topY?: number;
  } | null;
}

/** Option 1 trim profiles (inches, Y from the subfloor). Bands are [y0, y1, proud]; capital bands are [y0, y1, grow]. */
export interface Trim {
  waterTable: { y0: number; y1: number; proud: number };
  pilaster: {
    width: number; proud: number; baseY: number; shaftTopY: number;
    capital: [number, number, number][];
    panel: { y0: number; y1: number; width: number; innerWidth: number; innerInset: number; proud: number };
  };
  entablature: { bands: [number, number, number][]; cornice: { y0: number; y1: number; proud: number }; bandReturn: number; corniceReturn: number };
  dormerCornice: { bands: [number, number, number][]; cornerBoard: { width: number; y0: number; y1: number; proud: number } };
  wingCornice: { bands: [number, number, number][] };
  casing: {
    side: number; outer: number; headHeight: number; headAboveOpening: number; proud: number;
    sillHeight: number; sillWider: number; sillProud: number; dripProud: number;
  };
  doorSurround: {
    pilasterX: [number, number]; pilasterY: [number, number]; baseY: [number, number]; capitalTopY: number;
    headY: [number, number]; corniceY: [number, number]; corniceHalfWidth: [number, number]; proud: number;
  };
}

export interface Chimney {
  /** The shaft. */
  outline: Vec2[];
  baseY: number;
  topY: number;
  /** Wider base: runs from baseY up to `topY` at full width, then chamfers to the shaft outline by `taperY`. */
  breast?: { outline: Vec2[]; topY: number; taperY: number };
}

export interface Site {
  /** Ground extent around the house (inches beyond the footprint). */
  margin: number;
  /**
   * Grade profiles [z, Y] (z descending) read from the left and right elevations. Grade at the left/right wall planes
   * IS the profile; between them it is interpolated across x, and behind the main block (z < zRear) the rear-left terrace
   * (left profile) is separated from the walk-out (right profile) at x = stepX.
   */
  terrain: { left: Vec2[]; right: Vec2[]; stepX: number };
  retainingWalls: { outline: Vec2[]; baseY: number; topY: number }[];
  frontSteps: { outline: Vec2[]; bottomY: number; topY: number; risers: number } | null;
  /** Rear porch outside back door F (under the wing hip roof). */
  porch: {
    deck: { x0: number; x1: number; z0: number; z1: number; topY: number; bottomY: number };
    stair: { x0: number; x1: number; z0: number; z1: number; risers: number; bottomY: number };
    post: { x: number; z: number; width: number; shaftY0: number; shaftY1: number; capY1: number; capWidth: number; /** Capital bands [y0, y1, width], bottom → top; the top reaches the beam underside. */ capital: [number, number, number][] };
    rail: { balusterY0: number; balusterY1: number; topY: number; post: number };
    lattice: { y0: number; y1: number };
  } | null;
  /** Fenced storage behind the wing (basement level). */
  fence: { posts: Vec2[]; postWidth: number; shaftY0: number; capY0: number; capY1: number; rails: [number, number][]; curbY: [number, number] } | null;
}
