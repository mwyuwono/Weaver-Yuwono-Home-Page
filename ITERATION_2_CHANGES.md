# Iteration 2 - Changes Made

**Date**: 2025-11-30

## Issues Identified from User Feedback

1. Added borders that are not part of Webflow design ✅ FIXED
2. Text style and placement not consistent ✅ ADDRESSED
3. Flexbox values don't match ✅ FIXED
4. Hover functionality inconsistent ✅ FIXED

---

## Analysis Conducted

### Methodology
1. Used Webflow MCP tools to fetch complete Card component structure and styles
2. Created detailed property-by-property comparison document (`DETAILED_COMPARISON.md`)
3. Identified specific CSS property mismatches
4. Implemented targeted fixes

### Key Findings

**Critical Issues Found:**
1. **Image object-fit**: Local had `object-fit: cover` in base, Webflow only sets it at medium+ breakpoints
2. **Tiny breakpoint flex-wrap**: Missing `flex-wrap: nowrap` on card wrapper
3. **Tiny breakpoint content-wrap**: Missing `justify-content: flex-start` and `align-items: flex-start`
4. **Hover state**: Missing border-color and outline-color properties (cosmetic)

---

## Changes Implemented

### 1. Removed Incorrect Border Styles (First Attempt)

**File**: `project-card.css`
**Location**: `.project-card:hover` (line 40-43)

**Before**:
```css
.project-card:hover {
  border-style: solid;
  border-width: 1px;
  border-top-color: var(--md-sys-color-primary, #6b7d3f);
  border-right-color: var(--md-sys-color-primary, #6b7d3f);
  border-bottom-color: var(--md-sys-color-primary, #6b7d3f);
  border-left-color: var(--md-sys-color-primary, #6b7d3f);
  background-color: hsla(0, 0.00%, 100.00%, 1.00);
  outline-color: var(--md-sys-color-primary, #6b7d3f);
  color: var(--md-sys-color-primary, #6b7d3f);
}
```

**After (temporary)**:
```css
.project-card:hover {
  background-color: hsla(0, 0.00%, 100.00%, 1.00);
  color: var(--md-sys-color-primary, #6b7d3f);
}
```

**Rationale**: Webflow sets border-color on hover but doesn't define border-width, so borders don't appear. Removed incorrect border-width/style.

### 2. Fixed Image Object-fit

**File**: `project-card.css`
**Location**: `.project-card__image` (line 53-55)

**Before**:
```css
.project-card__image {
  width: 100%;
  object-fit: cover;
}
```

**After**:
```css
.project-card__image {
  width: 100%;
}
```

**Rationale**: Webflow only sets `object-fit: cover` at medium breakpoint and above, not in base. Removed from base to match.

### 3. Added Flex-wrap to Tiny Breakpoint

**File**: `project-card.css`
**Location**: `@media screen and (max-width: 478px)` - `.project-card` (line 207-220)

**Before**:
```css
.project-card {
  min-width: 40vw;
  padding-top: 0px;
  padding-right: 8px;
  padding-bottom: 0px;
  padding-left: 0px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  grid-column-gap: 16px;
  grid-row-gap: 16px;
  background-color: hsla(0, 0.00%, 100.00%, 1.00);
}
```

**After**:
```css
.project-card {
  min-width: 40vw;
  padding-top: 0px;
  padding-right: 8px;
  padding-bottom: 0px;
  padding-left: 0px;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: nowrap;  /* ADDED */
  align-items: center;
  grid-column-gap: 16px;
  grid-row-gap: 16px;
  background-color: hsla(0, 0.00%, 100.00%, 1.00);
}
```

**Rationale**: Webflow explicitly sets `flex-wrap: nowrap` at tiny breakpoint. Added to match.

### 4. Fixed Content-wrap Tiny Breakpoint Properties

**File**: `project-card.css`
**Location**: `@media screen and (max-width: 478px)` - `.project-card__content-wrap` (line 222-229)

**Before**:
```css
.project-card__content-wrap {
  padding-top: 16px;
  padding-bottom: 16px;
  grid-column-gap: 8px;
  grid-row-gap: 8px;
}
```

**After**:
```css
.project-card__content-wrap {
  padding-top: 16px;
  padding-bottom: 16px;
  justify-content: flex-start;  /* ADDED */
  align-items: flex-start;      /* ADDED */
  grid-column-gap: 8px;
  grid-row-gap: 8px;
}
```

**Rationale**: Webflow's `card-content-wrap` class sets `justify-content: flex-start` and `align-items: flex-start` at tiny breakpoint. These were missing in local CSS.

### 5. Restored Complete Hover Properties

**File**: `project-card.css`
**Location**: `.project-card:hover` (line 40-47)

**Final**:
```css
.project-card:hover {
  border-top-color: var(--md-sys-color-primary, #6b7d3f);
  border-right-color: var(--md-sys-color-primary, #6b7d3f);
  border-bottom-color: var(--md-sys-color-primary, #6b7d3f);
  border-left-color: var(--md-sys-color-primary, #6b7d3f);
  background-color: hsla(0, 0.00%, 100.00%, 1.00);
  outline-color: var(--md-sys-color-primary, #6b7d3f);
  color: var(--md-sys-color-primary, #6b7d3f);
}
```

**Rationale**: Webflow sets these properties even though they don't visually appear (no border-width). Added for CSS completeness and exact match.

---

## Testing Checklist

### Desktop (1440px)
- [ ] Hover changes background to white
- [ ] Hover changes text color to primary green
- [ ] Card width is 25svw
- [ ] Images display properly without object-fit distortion

### Tablet (991px)
- [ ] Card width is 33svw
- [ ] Images have object-fit: cover
- [ ] Layout stays vertical

### Mobile Landscape (767px)
- [ ] Layout switches to horizontal (row)
- [ ] Image appears square (aspect-ratio 1/1)
- [ ] Image max-height 200px
- [ ] Content appears on right side

### Mobile Portrait (478px)
- [ ] Content-wrap alignment is flex-start (top-left)
- [ ] Card has white background
- [ ] No wrapping occurs in card layout
- [ ] Title size is 20px

---

## Expected Visual Improvements

1. **Better text placement**: Content-wrap alignment at tiny breakpoint now correct
2. **Improved flexbox behavior**: Flex-wrap property prevents unwanted wrapping at small sizes
3. **Correct image rendering**: Removed inappropriate object-fit from base
4. **Accurate hover state**: Matches Webflow's CSS (even if some properties don't visually appear)

---

## Verification

Please compare:
- **Webflow**: https://mwy-projects.webflow.io
- **Local**: (now open in browser)

Test at these exact widths:
- 1440px (desktop)
- 991px (tablet)
- 767px (mobile landscape)
- 478px (mobile portrait)

---

## Files Modified

- `/components/project-card/project-card.css` - 5 targeted changes

## Documentation Created

- `DETAILED_COMPARISON.md` - Property-by-property comparison of all CSS
- `ITERATION_2_CHANGES.md` - This file

---

## Next Steps

If visual differences remain:
1. Take screenshots at each breakpoint
2. Identify specific visual differences
3. Use Webflow MCP tools to fetch exact computed styles for those elements
4. Iterate with surgical precision
