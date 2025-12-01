# Card Component Alignment Audit - Iteration 1

**Date**: 2025-11-30
**Webflow Site**: 673ccceba3dcf36ccc28f470 (Drawings & Renderings)
**Component**: Card (d4b24b4f-5ab3-51d7-7867-f647d6e1b980)

---

## Phase 1: Baseline Discovery

### Webflow Card Component Structure

Complete element hierarchy from MCP tools:

```
Link (d4b24b4f-5ab3-51d7-7867-f647d6e1b980)
  data-elemet="card" [NOTE: Typo in Webflow - "elemet" not "element"]
  styles: [Card]
  type: Link
  ├─ VFlex (d4b24b4f-5ab3-51d7-7867-f647d6e1b981)
  │    styles: [card-content-wrap, Project (combo)]
  │    └─ VFlex (20bed1f4-d72b-a23a-80e4-97e242ba6ceb)
  │         styles: [card-content]
  │         └─ VFlex (cbf4b0f9-e2f7-c34b-8826-4e61ec40e781)
  │              styles: [card-header]
  │              ├─ Block (d4b24b4f-5ab3-51d7-7867-f647d6e1b982)
  │              │    data-element="card-title"
  │              │    styles: [card-title, Small (combo)]
  │              ├─ Block (6bb47f59-f094-68ba-9339-12e90d91379c)
  │              │    data-element="card-subtitle"
  │              │    styles: [card-subtitle]
  │              └─ Block (d4b24b4f-5ab3-51d7-7867-f647d6e1b984)
  │                   data-element="card-helper"
  │                   styles: [card-helper]
  └─ VFlex (d33bd424-fbae-f6be-6e6a-794091099a86)
       styles: [Flex Block 5]
       └─ Image (d4b24b4f-5ab3-51d7-7867-f647d6e1b986)
            data-element="card-image"
            styles: [card-image, full-bleed (combo)]
```

### Webflow Attributes Audit

| Element | data-element | Other Attributes |
|---------|-------------|------------------|
| Link (card wrapper) | `data-elemet="card"` (typo) | - |
| Block (title) | `data-element="card-title"` | - |
| Block (subtitle) | `data-element="card-subtitle"` | - |
| Block (helper) | `data-element="card-helper"` | - |
| Image | `data-element="card-image"` | - |
| VFlex wrappers | (none) | - |

**Note**: Webflow has a typo: `data-elemet` instead of `data-element` on the card wrapper.

### Webflow Styles - Complete CSS Properties

#### 1. Card (Main Wrapper - Link)

**Base (main)**:
```css
position: relative;
display: flex;
width: 25svw;
padding-top: 8px;
padding-right: 8px;
padding-bottom: 8px;
padding-left: 8px;
flex-direction: column;
justify-content: flex-start;
flex-wrap: nowrap;
align-items: center;
align-self: stretch;
flex-grow: 0;
flex-shrink: 1;
flex-basis: auto;
grid-column-gap: 8px;
grid-row-gap: 8px;
border-top-left-radius: 12px;
border-top-right-radius: 12px;
border-bottom-left-radius: 12px;
border-bottom-right-radius: 12px;
background-color: [variable-c839d576-20e4-c725-3966-da74997c5436]; /* md-sys-color-surface-container */
color: #1a1b12;
font-size: 16px;
line-height: 1.5em;
font-weight: 400;
text-align: center;
text-decoration: none;
cursor: pointer;
```

**Hover**:
```css
border-top-color: [variable-705d5447-2dd0-0dd9-ebf0-00a193c31d1d]; /* md-sys-color-primary */
border-right-color: [variable-705d5447-2dd0-0dd9-ebf0-00a193c31d1d];
border-bottom-color: [variable-705d5447-2dd0-0dd9-ebf0-00a193c31d1d];
border-left-color: [variable-705d5447-2dd0-0dd9-ebf0-00a193c31d1d];
background-color: hsla(0, 0.00%, 100.00%, 1.00);
outline-color: [variable-705d5447-2dd0-0dd9-ebf0-00a193c31d1d];
color: [variable-705d5447-2dd0-0dd9-ebf0-00a193c31d1d];
```

**Medium (max-width: 991px)**:
```css
width: 33svw;
align-self: stretch;
flex-grow: 1;
flex-shrink: 1;
flex-basis: 0%;
```

**Small (max-width: 767px)**:
```css
width: auto;
flex-direction: row;
flex-wrap: nowrap;
```

**Tiny (max-width: 478px)**:
```css
min-width: 40vw;
padding-top: 0px;
padding-right: 8px;
padding-bottom: 0px;
padding-left: 0px;
flex-direction: row;
justify-content: flex-start;
flex-wrap: nowrap;
align-items: center;
grid-column-gap: 16px;
grid-row-gap: 16px;
background-color: hsla(0, 0.00%, 100.00%, 1.00);
```

#### 2. card-content-wrap (VFlex)

**Base (main)**:
```css
justify-content: center;
align-items: center;
align-self: stretch;
flex-grow: 1;
flex-shrink: 1;
flex-basis: 0%;
grid-column-gap: 8px;
grid-row-gap: 8px;
text-align: left;
```

**Tiny (max-width: 478px)**:
```css
justify-content: flex-start;
align-items: flex-start;
grid-column-gap: 16px;
grid-row-gap: 16px;
```

#### 3. Project (Combo Class on card-content-wrap)

**Base (main)**:
```css
padding-top: 24px;
padding-right: 24px;
padding-bottom: 24px;
padding-left: 24px;
justify-content: flex-start;
align-items: flex-start;
flex-grow: 1;
flex-shrink: 1;
flex-basis: 0%;
border-top-left-radius: 8px;
border-top-right-radius: 8px;
border-bottom-left-radius: 8px;
border-bottom-right-radius: 8px;
background-color: #ebece6;
```

**Medium (max-width: 991px)**:
```css
flex-grow: 1;
flex-shrink: 1;
flex-basis: 0%;
```

**Small (max-width: 767px)**:
```css
padding-top: 1.5em;
padding-right: 1.5em;
padding-bottom: 1.5em;
padding-left: 1.5em;
justify-content: center;
align-items: flex-start;
order: 9999;
grid-column-gap: 0.75em;
grid-row-gap: 0.75em;
```

**Tiny (max-width: 478px)**:
```css
padding-top: 16px;
padding-bottom: 16px;
grid-column-gap: 8px;
grid-row-gap: 8px;
```

#### 4. card-content (VFlex)

**Base (main)**:
```css
align-self: stretch;
flex-grow: 1;
flex-shrink: 1;
flex-basis: 0%;
grid-column-gap: 1em;
grid-row-gap: 1em;
```

#### 5. card-header (VFlex)

**Base (main)**:
```css
grid-column-gap: 0.3em;
grid-row-gap: 0.3em;
```

#### 6. card-title (Block)

**Base (main)**:
```css
font-size: 20px;
line-height: 1.5em;
```

#### 7. Small (Combo Class on card-title)

**Base (main)**:
```css
font-family: Bodoni Moda;
color: hsla(68, 19.36%, 8.94%, 1.00);
font-size: 1.8rem;
line-height: 1.2em;
font-weight: 500;
```

**Small (max-width: 767px)**:
```css
font-size: 1.5rem;
```

**Tiny (max-width: 478px)**:
```css
font-size: 20px;
line-height: 1.5em;
text-align: left;
```

#### 8. card-subtitle (Block)

**Base (main)**:
```css
font-size: 1.25em;
line-height: 1.3em;
```

#### 9. card-helper (Block)

**Base (main)**:
```css
display: flex;
margin-top: auto;
justify-content: center;
align-items: center;
flex-grow: 0;
flex-shrink: 0;
flex-basis: auto;
font-family: Noto Sans;
color: [variable-4e9b27cc-1ffb-abf7-af98-77bc81ea8046]; /* md-sys-color-primary */
font-size: 0.75rem;
line-height: 1.2em;
font-weight: 400;
letter-spacing: 0.5px;
text-transform: uppercase;
```

**Small (max-width: 767px)**:
```css
margin-top: 0px;
```

**Tiny (max-width: 478px)**:
```css
padding-top: 2px;
padding-right: 8px;
padding-bottom: 2px;
padding-left: 8px;
line-height: 1.3em;
```

#### 10. Flex Block 5 (Image Wrapper - VFlex)

**Base (main)**:
```css
align-self: stretch;
```

**Medium (max-width: 991px)**:
```css
flex-grow: 1;
flex-shrink: 1;
flex-basis: 0%;
```

**Small (max-width: 767px)**:
```css
flex-grow: 0;
flex-shrink: 0;
flex-basis: auto;
```

#### 11. card-image (Image)

**Medium (max-width: 991px)**:
```css
position: relative;
object-fit: cover;
```

**Small (max-width: 767px)**:
```css
max-height: 200px;
aspect-ratio: 1/1;
object-fit: cover;
```

#### 12. full-bleed (Combo Class on card-image)

**Base (main)**:
```css
width: 100%;
```

---

## Phase 2: Local Component Baseline

### Current Local Structure

From `project-card.js`:

```javascript
<a class="project-card" data-element="card">
  <div class="project-card__content-wrap">
    <div class="project-card__content">
      <div class="project-card__header">
        <div class="project-card__title" data-element="card-title">
        <div class="project-card__subtitle" data-element="card-subtitle">
        <div class="project-card__helper" data-element="card-helper">
      </div>
    </div>
  </div>
  <div class="project-card__image-wrapper">
    <img class="project-card__image" data-element="card-image">
  </div>
</a>
```

### Local Attributes

| Element | data-element | Match? |
|---------|-------------|--------|
| a (card wrapper) | `data-element="card"` | ✅ (Webflow has typo, ours is correct) |
| div (title) | `data-element="card-title"` | ✅ |
| div (subtitle) | `data-element="card-subtitle"` | ✅ |
| div (helper) | `data-element="card-helper"` | ✅ |
| img | `data-element="card-image"` | ✅ |

---

## Gap Analysis

### Structure Differences

| Element | Webflow | Local | Status |
|---------|---------|-------|--------|
| Card wrapper | `Link` | `<a>` | ✅ Match |
| content-wrap | `VFlex` | `<div>` | ⚠️ Different element type (functionally same) |
| content | `VFlex` | `<div>` | ⚠️ Different element type (functionally same) |
| header | `VFlex` | `<div>` | ⚠️ Different element type (functionally same) |
| title | `Block` | `<div>` | ✅ Match |
| subtitle | `Block` | `<div>` | ✅ Match |
| helper | `Block` | `<div>` | ✅ Match |
| image wrapper | `VFlex` | `<div>` | ⚠️ Different element type (functionally same) |
| image | `Image` | `<img>` | ✅ Match |

**Note**: VFlex in Webflow is rendered as a `<div>` with flex styles. Functionally equivalent.

### CSS Properties Comparison

#### Critical Differences to Address:

1. **Card wrapper (.project-card)**:
   - ❌ Missing hover border styles (Webflow adds borders on hover)
   - ✅ Has base hover styles but needs border properties

2. **Image (.project-card__image)**:
   - ❌ Missing `object-fit: cover` in base/medium breakpoints
   - ✅ Has it in small breakpoint

3. **Content wrap (.project-card__content-wrap)**:
   - ⚠️ Local has `display: flex, flex-direction: column` from base
   - ⚠️ Webflow relies on VFlex defaults + overrides
   - Need to verify visual alignment matches

4. **Responsive behavior**:
   - ✅ Most breakpoint changes are present
   - ⚠️ Need to verify exact visual match at each breakpoint

### Visual Properties Requiring Alignment:

| Property | Element | Issue |
|----------|---------|-------|
| `border-*-color` on hover | `.project-card` | Not setting border colors (only outline) |
| `object-fit: cover` | `.project-card__image` | Missing in medium breakpoint |

---

## Phase 3: Implementation Changes Needed

### High Priority Changes

#### 1. Add hover border styles to .project-card

In `project-card.css`, update hover state:

```css
.project-card:hover {
  border-top-color: var(--md-sys-color-primary, #6b7d3f);
  border-right-color: var(--md-sys-color-primary, #6b7d3f);
  border-bottom-color: var(--md-sys-color-primary, #6b7d3f);
  border-left-color: var(--md-sys-color-primary, #6b7d3f);
  border-style: solid;  /* ADD THIS */
  border-width: 1px;     /* ADD THIS */
  background-color: hsla(0, 0.00%, 100.00%, 1.00);
  outline-color: var(--md-sys-color-primary, #6b7d3f);
  color: var(--md-sys-color-primary, #6b7d3f);
}
```

**Rationale**: Webflow applies border colors on hover. Need explicit border width/style for them to appear.

#### 2. Add object-fit to medium breakpoint for image

In `project-card.css`, update medium breakpoint:

```css
@media screen and (max-width: 991px) {
  .project-card__image {
    position: relative;
    object-fit: cover;  /* ADD THIS LINE */
  }
}
```

**Rationale**: Webflow explicitly sets object-fit: cover at medium breakpoint.

### Medium Priority Changes

#### 3. Verify content-wrap display defaults

Current local CSS for `.project-card__content-wrap` has:
```css
display: flex;
flex-direction: column;
```

Webflow VFlex defaults would be similar. **Keep current implementation** but verify visually.

### No Changes Needed

- Structure is functionally equivalent
- Attributes match (local is actually more correct than Webflow's typo)
- Most CSS properties already match
- Responsive breakpoints already correct

---

## Phase 4: Verification Plan

### Test Checklist

After implementing changes:

1. **Desktop (1440px)**:
   - [ ] Card width is 25svw
   - [ ] Hover shows border in primary color
   - [ ] Title uses Bodoni Moda at 1.8rem
   - [ ] Helper text is uppercase, Noto Sans, 0.75rem
   - [ ] Image fills width, proper aspect ratio

2. **Tablet (991px)**:
   - [ ] Card width is 33svw
   - [ ] Image has object-fit: cover
   - [ ] Layout stays vertical (column)

3. **Mobile Landscape (767px)**:
   - [ ] Card switches to horizontal (row)
   - [ ] Image max-height 200px, aspect-ratio 1/1
   - [ ] Content wrap order: 9999
   - [ ] Helper margin-top: 0

4. **Mobile Portrait (478px)**:
   - [ ] Card min-width 40vw
   - [ ] Padding adjustments applied
   - [ ] Title font-size: 20px
   - [ ] White background instead of surface-container

5. **Hover State (desktop)**:
   - [ ] Border appears in primary color
   - [ ] Background changes to white
   - [ ] Text color changes to primary

### Visual Comparison

Open side-by-side:
- Webflow published: https://mwy-projects.webflow.io
- Local: file:///Users/mwy/Library/.../projects/index.html

Compare at exact breakpoints: 1440px, 991px, 767px, 478px

---

## Next Steps

1. ✅ Complete Phase 1-2 (baseline audit)
2. ⏳ Implement high-priority CSS changes
3. ⏳ Test at all breakpoints
4. ⏳ Visual comparison with Webflow
5. ⏳ Iterate if needed

---

## Notes

- Webflow has a typo: `data-elemet` vs `data-element`
- VFlex = div with flex styles (functionally equivalent)
- Local component uses BEM naming (good practice)
- Most alignment already done in previous iterations
- Only minor refinements needed for perfect match
