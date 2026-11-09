# Handoff: cottage 3D — vector linework + presentation plates

Repo `mwyuwono/Weaver-Yuwono-Home-Page`, branch `feature/cottage-3d-model`, PR #3 (open; do not merge). App: `tools/cottage-3d/`. Built output committed to `projects/connecticut-cottage/` (static Vercel site, no build step on Vercel; push to the branch = preview deploy; push to `main` = production — never push to main).

## Objective
Replace screen-space edge-detection ink with geometry-derived vector linework so lines are crisp, stable, never dotted/shimmering at any zoom, and thin details (corner pilaster depth/returns, casings, sills, muntins) never vanish arbitrarily. Add preset presentation views ("plates"). Owner (Matt, the architect) has rejected iterative shimmer fixes; deliver once, verified.

## Status (HEAD 8502943)
- Model geometry + accuracy done (orthographic overlay vs DXF elevations: max offset 3–5"). Do not change geometry/dimensions except as noted below.
- Current render: `src/render/Pipeline.ts` MRT G-buffer (wash colour; normal.xy + ink weight + alpha; DepthTexture) at supersample SS≤2 (9 MP budget) → `src/render/composite.ts` (Sobel-style ink from depth 2nd-diff / normal crease / ink-weight change, sliver "persistence" rejection, paper grain, pigment pooling, vignette) → 4×4 tent downsample. Motion frames SS=1, full SS ~160 ms after settle (`src/scene/RenderLoop.ts`).
- Washes: `src/render/wash.ts` (`WashMaterial`, MeshLambert with rewritten fragment; flat lit/shade pigment, world-space mottle, VSM shadow tint; analytic `clapboard` and `seams` hairlines already antialiased and faded by screen frequency — KEEP these, they are not part of the problem).
- Palette `src/materials.ts` (approved direction; each material has `ink` weight 0.5–1.0: ≥0.85 primary).
- Known residual defects motivating this: ragged/dashed pilaster & casing edges at hero distance, faint dashes along frieze, moiré on crawl-space lattice (PorchBuilder), detail loss when slivers are rejected.

## Architecture facts (not obvious from a skim)
- Units: house.json inches; scene unit = 1 ft (`IN` in `src/units.ts`). Builders work in inches; `GeometryBatch` (`src/builders/geometry.ts`) converts on emit.
- All builders add pieces through `GeometryBatch.add(geo, material, matrix?)` / `.box(...)` / `.addBatch(...)`; `House.ts` `flatten()` merges per material into one group per level: `basement | first | second | roof` + `site`. `ExplodeController` moves these groups (y lift) and fades them (`opacity`, sets `visible=false` <0.01). Lines MUST live in the same groups and follow the same opacity.
- Coincident-face fixes already made (keep): roof slab joint end caps removed (`addSlab` `ends`), floor slab inset 0.5", exterior walls overlap slab edge with down faces dropped (`withoutDownFaces`), wall outline tabs <0.5" removed, 2nd-floor partitions capped 12" under roof underside.
- Wall openings are gaps filled by sill/header infill boxes flush with the wall faces — their box edges are NOT real drawing lines (see risk R1).
- Terrain (`TerrainBuilder.ts`) is an opaque heightfield; terrain-vs-terrain must never be inked; ground fades in pigment, not alpha.
- Camera: `PerspectiveCamera(32°, near 1, far 1500)`; OrbitControls damped, can't go below terrain; `framing.ts` `frameBox` takes UI insets (`.site-header`, `.ctl-bar`).
- Debug: `?qa=front|rear|left|right` orthographic overlay; `npm run build && node qa/overlay.mjs [faces]` (needs `/home/claude/dxf/cottage.dxf` — UNVERIFIED that it exists in your environment; DXF is not in git. If absent, skip overlay; geometry isn't changing).
- Screenshots: `node qa/shots.mjs <hero|mobile|rear|far|exploded|door> [outDir] [prefix]` (Playwright + SwiftShader; run one at a time — parallel runs crash; door/rear take 3–4 min). Output default `qa/out/` (gitignored). Do NOT install browsers; Playwright/Chromium preinstalled in the Claude cloud container — UNVERIFIED elsewhere.

## Decisions (made by Matt / me — do not relitigate)
- Programmatic Three.js only; no external 3D files. three 0.170.0, TS 5.6 strict, Vite 5.4.
- Style: sepia ink on ivory paper, restrained low-chroma washes, line-weight hierarchy, delicate grounding shadow; NO hatch/stroke textures; nothing that aliases.
- Approach chosen: vector linework + plates (option 1 of 3). Pre-rendered stills rejected (loses orbit).
- Do not modify site CSS outside `tools/cottage-3d` (repo CLAUDE.md). No temp .md files left behind; delete this handoff when the work is accepted.

## Implementation spec
1. **Edge extraction (build time, CPU).** In `GeometryBatch.add`/`box`, per piece (before merge) compute feature edges with `THREE.EdgesGeometry(geo, thresholdDeg≈20)` transformed by the piece matrix; store as line segments keyed by material + tier. Add an option `{ lines?: 'all' | 'none' | 'outline' }` (default `'all'`). Emit per level group a `LineSegments2` (`three/examples/jsm/lines/LineSegments2.js` + `LineSegmentsGeometry` + `LineMaterial`) per tier.
2. **Suppress non-drawing edges (R1).** Mark `lines:'none'` on: opening sill/header infill (Wall/openingFrame), hidden structure (slab interiors, framing under siding), terrain, anything flush-coplanar with a neighbour of the same material. Additionally drop any edge segment whose midpoint lies on the plane of, and inside, a coplanar face of a same-material piece in the same level (dedupe pass) — implement if seams remain after flags. Silhouettes: all geometry is planar/boxy so crease edges cover silhouettes; terrain gets no lines except optionally its outer boundary.
3. **Line weights** (CSS px, × devicePixelRatio): primary (material ink ≥0.85: walls, roof edges, chimney, foundation) 1.3; secondary (trim, railing, sash/door) 0.8; hairline (muntins, fixtures/interior) 0.5. Colour = existing `INK` constant (`src/render/glsl.ts`), opacity 0.85/0.7/0.55. Screen-space widths (`worldUnits:false`).
4. **Scale-dependent detail (LOD).** Per-segment attribute `featureSize` (inches; smallest bbox dimension of the owning piece, or tier default). In the vertex shader compute projected size px = featureSize·IN·(0.5·viewportHeight/tan(fov/2))/(-viewZ); alpha *= smoothstep(minPx, 2·minPx) with minPx ≈ 3 (secondary) / 5 (hairline); primary never fades. Fade, never pop.
5. **Hidden-line removal.** Simplest robust route: drop the MRT/edge-detect pipeline and render forward: wash materials (colour only) + lines in one pass into an MSAA (samples 4) HalfFloat/8-bit target; faces use `polygonOffset` (factor 1, units 1) so coplanar lines win the depth test; then a full-screen paper pass (keep grain/mottle/granulation/vignette code from composite.ts, drop ink + pooling + persistence + supersampling + tent downsample). Verify fading levels: wash currently writes alpha for blended levels — in forward mode use `transparent` + `opacity` on fading groups only during tweens (UNVERIFIED how wash.ts handles this; read it).
6. **Drafting character.** Extend each segment by ~2 CSS px past both ends (corner overrun) in the line vertex shader (modify `LineMaterial` via `onBeforeCompile` or a copied shader); optional ±10% width variation from world-position noise (stable while orbiting). No wobble that moves with the camera.
7. **Plates.** Add preset view buttons in `src/ui/Controls.ts`: Hero (current default), Front elevation (camera on axis, fov ~12° to read as elevation), Rear ¾, Exploded axon (triggers explode). Animate camera position+target with `src/anim/tween.ts` easeInOutCubic ~900 ms; free orbit remains. Respect UI insets via `frameBox`.
8. Lattice moiré (PorchBuilder): replace lattice bars with a single panel + lines `'outline'`, or LOD-fade lattice lines as hairline.

## Acceptance (verify before reporting)
- `npm run build` clean (`tsc --noEmit` included).
- Shots for every mode (`hero mobile rear far exploded door`): no dotted/broken lines anywhere; corner pilaster depth line, capitals, casings, sills visible at hero; far view reads as clean massing (detail faded, not speckled).
- Temporal stability: capture two frames with the camera dollied ~1% (e.g. one wheel tick) — fine lines must not appear/disappear between them (diff crops of pilasters/casings).
- Exploded/isolate: lines move and fade with their level; nothing from hidden levels shows.
- Performance: fewer passes than now; report triangle + segment counts (console logs `[cottage-3d] draw calls`).
- Commit to `feature/cottage-3d-model` with built output; then the reviewing session (Opus) will check the work.

## Risks for implementer
- R1 (highest): spurious lines from infill/coplanar seams — audit every builder (Wall, openingFrame, Window, Door, Trim, Roof, Porch, Stair, Fixture, Floor, Chimney, Site, Terrain); screenshot-check each façade.
- R2: lines poking through faces at grazing angles or missing behind polygonOffset — tune offset; check roof/wall junctions and window reveals.
- R3: LineMaterial needs `resolution` uniform updated on resize and per render target size.
- R4: Removing MRT changes shadow/fade handling in wash.ts — read it fully before editing.
- R5: Don't regress washes/palette Matt already approved; compare against `qa/shots.mjs` captures taken before changes (capture baselines first).

## Next steps
1. Capture baselines (`qa/shots.mjs` all modes, prefix `before`).
2. Implement 1–4, 5, verify; then 6, 7, 8.
3. Acceptance checks; commit + push branch; report changes, counts, and any residual defects honestly.
