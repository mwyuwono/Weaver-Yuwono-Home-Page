# Detailed CSS Property Comparison - Webflow vs Local

## Card Wrapper (.project-card / Card class)

### BASE (main breakpoint)

| Property | Webflow | Local | Match? |
|----------|---------|-------|--------|
| position | `relative` | `relative` | ✅ |
| display | `flex` | `flex` | ✅ |
| width | `25svw` | `25svw` | ✅ |
| padding-top | `8px` | `8px` | ✅ |
| padding-right | `8px` | `8px` | ✅ |
| padding-bottom | `8px` | `8px` | ✅ |
| padding-left | `8px` | `8px` | ✅ |
| flex-direction | `column` | `column` | ✅ |
| justify-content | `flex-start` | `flex-start` | ✅ |
| flex-wrap | `nowrap` | `nowrap` | ✅ |
| align-items | `center` | `center` | ✅ |
| align-self | `stretch` | `stretch` | ✅ |
| flex-grow | `0` | `0` | ✅ |
| flex-shrink | `1` | `1` | ✅ |
| flex-basis | `auto` | `auto` | ✅ |
| grid-column-gap | `8px` | `8px` | ✅ |
| grid-row-gap | `8px` | `8px` | ✅ |
| border-top-left-radius | `12px` | `12px` | ✅ |
| border-top-right-radius | `12px` | `12px` | ✅ |
| border-bottom-left-radius | `12px` | `12px` | ✅ |
| border-bottom-right-radius | `12px` | `12px` | ✅ |
| background-color | `var(--md-sys-color-surface-container)` | `var(--md-sys-color-surface-container, #f9faf4)` | ✅ |
| color | `#1a1b12` | `#1a1b12` | ✅ |
| font-size | `16px` | `16px` | ✅ |
| line-height | `1.5em` | `1.5em` | ✅ |
| font-weight | `400` | `400` | ✅ |
| text-align | `center` | `center` | ✅ |
| text-decoration | `none` | `none` | ✅ |
| cursor | `pointer` | `pointer` | ✅ |

### HOVER

| Property | Webflow | Local | Match? |
|----------|---------|-------|--------|
| border-top-color | `var(--md-sys-color-primary)` | ❌ MISSING | ❌ |
| border-right-color | `var(--md-sys-color-primary)` | ❌ MISSING | ❌ |
| border-bottom-color | `var(--md-sys-color-primary)` | ❌ MISSING | ❌ |
| border-left-color | `var(--md-sys-color-primary)` | ❌ MISSING | ❌ |
| background-color | `hsla(0, 0.00%, 100.00%, 1.00)` | `hsla(0, 0.00%, 100.00%, 1.00)` | ✅ |
| outline-color | `var(--md-sys-color-primary)` | ❌ MISSING | ❌ |
| color | `var(--md-sys-color-primary)` | `var(--md-sys-color-primary, #6b7d3f)` | ✅ |

**ISSUE**: Missing border-color and outline-color properties on hover (even though they won't show without border-width)

### MEDIUM (max-width: 991px)

| Property | Webflow | Local | Match? |
|----------|---------|-------|--------|
| width | `33svw` | `33svw` | ✅ |
| align-self | `stretch` | `stretch` | ✅ |
| flex-grow | `1` | `1` | ✅ |
| flex-shrink | `1` | `1` | ✅ |
| flex-basis | `0%` | `0%` | ✅ |

### SMALL (max-width: 767px)

| Property | Webflow | Local | Match? |
|----------|---------|-------|--------|
| width | `auto` | `auto` | ✅ |
| flex-direction | `row` | `row` | ✅ |
| flex-wrap | `nowrap` | `nowrap` | ✅ |

### TINY (max-width: 478px)

| Property | Webflow | Local | Match? |
|----------|---------|-------|--------|
| min-width | `40vw` | `40vw` | ✅ |
| padding-top | `0px` | `0px` | ✅ |
| padding-right | `8px` | `8px` | ✅ |
| padding-bottom | `0px` | `0px` | ✅ |
| padding-left | `0px` | `0px` | ✅ |
| flex-direction | `row` | `row` | ✅ |
| justify-content | `flex-start` | `flex-start` | ✅ |
| flex-wrap | `nowrap` | ❌ MISSING | ❌ |
| align-items | `center` | `center` | ✅ |
| grid-column-gap | `16px` | `16px` | ✅ |
| grid-row-gap | `16px` | `16px` | ✅ |
| background-color | `hsla(0, 0.00%, 100.00%, 1.00)` | `hsla(0, 0.00%, 100.00%, 1.00)` | ✅ |

**ISSUE**: Missing `flex-wrap: nowrap` at tiny breakpoint

---

## Content Wrap (.project-card__content-wrap / card-content-wrap + Project combo)

### BASE (main breakpoint)

**From card-content-wrap class:**

| Property | Webflow | Local | Match? |
|----------|---------|-------|--------|
| justify-content | `center` | `flex-start` | ❌ |
| align-items | `center` | `flex-start` | ❌ |
| align-self | `stretch` | `stretch` | ✅ |
| flex-grow | `1` | `1` | ✅ |
| flex-shrink | `1` | `1` | ✅ |
| flex-basis | `0%` | `0%` | ✅ |
| grid-column-gap | `8px` | `8px` | ✅ |
| grid-row-gap | `8px` | `8px` | ✅ |
| text-align | `left` | `left` | ✅ |

**From Project combo class:**

| Property | Webflow | Local | Match? |
|----------|---------|-------|--------|
| display | ❌ (inherited from VFlex) | `flex` | ⚠️ |
| flex-direction | ❌ (inherited from VFlex) | `column` | ⚠️ |
| padding-top | `24px` | `24px` | ✅ |
| padding-right | `24px` | `24px` | ✅ |
| padding-bottom | `24px` | `24px` | ✅ |
| padding-left | `24px` | `24px` | ✅ |
| justify-content | `flex-start` | ✅ (overridden) | ✅ |
| align-items | `flex-start` | ✅ (overridden) | ✅ |
| flex-grow | `1` | ✅ (same) | ✅ |
| flex-shrink | `1` | ✅ (same) | ✅ |
| flex-basis | `0%` | ✅ (same) | ✅ |
| border-top-left-radius | `8px` | `8px` | ✅ |
| border-top-right-radius | `8px` | `8px` | ✅ |
| border-bottom-left-radius | `8px` | `8px` | ✅ |
| border-bottom-right-radius | `8px` | `8px` | ✅ |
| background-color | `#ebece6` | `#ebece6` | ✅ |

**MAJOR ISSUE**: Local has `justify-content: flex-start` and `align-items: flex-start` in base, but Webflow card-content-wrap has `justify-content: center` and `align-items: center` which gets OVERRIDDEN by Project combo class to `flex-start`. This might cause visual differences.

Actually wait - looking at the local CSS, it seems to apply all properties at once. Let me check if the final result matches...

The Webflow applies:
1. card-content-wrap: justify-content: center, align-items: center
2. Project (combo): justify-content: flex-start, align-items: flex-start (OVERRIDES)

Final result should be: justify-content: flex-start, align-items: flex-start

Local has: justify-content: flex-start, align-items: flex-start

So final result MATCHES ✅

### MEDIUM (max-width: 991px)

| Property | Webflow (Project combo) | Local | Match? |
|----------|---------|-------|--------|
| flex-grow | `1` | `1` | ✅ |
| flex-shrink | `1` | `1` | ✅ |
| flex-basis | `0%` | `0%` | ✅ |

### SMALL (max-width: 767px)

| Property | Webflow (Project combo) | Local | Match? |
|----------|---------|-------|--------|
| padding-top | `1.5em` | `1.5em` | ✅ |
| padding-right | `1.5em` | `1.5em` | ✅ |
| padding-bottom | `1.5em` | `1.5em` | ✅ |
| padding-left | `1.5em` | `1.5em` | ✅ |
| justify-content | `center` | `center` | ✅ |
| align-items | `flex-start` | `flex-start` | ✅ |
| order | `9999` | `9999` | ✅ |
| grid-column-gap | `0.75em` | `0.75em` | ✅ |
| grid-row-gap | `0.75em` | `0.75em` | ✅ |

### TINY (max-width: 478px)

**From card-content-wrap:**

| Property | Webflow | Local | Match? |
|----------|---------|-------|--------|
| justify-content | `flex-start` | ❌ NOT OVERRIDDEN | ❌ |
| align-items | `flex-start` | ❌ NOT OVERRIDDEN | ❌ |
| grid-column-gap | `16px` | ❌ NOT OVERRIDDEN | ❌ |
| grid-row-gap | `16px` | ❌ NOT OVERRIDDEN | ❌ |

**From Project combo:**

| Property | Webflow | Local | Match? |
|----------|---------|-------|--------|
| padding-top | `16px` | `16px` | ✅ |
| padding-bottom | `16px` | ❌ MISSING | ❌ |
| grid-column-gap | `8px` | `8px` | ✅ |
| grid-row-gap | `8px` | `8px` | ✅ |

**ISSUE**: Tiny breakpoint is missing the card-content-wrap overrides (justify-content, align-items from card-content-wrap become flex-start at tiny)

Wait, let me re-check... Webflow has TWO classes applying at tiny:
1. card-content-wrap: justify-content: flex-start, align-items: flex-start, grid-gap: 16px
2. Project combo: padding-top: 16px, padding-bottom: 16px, grid-gap: 8px

The gap would be overridden by Project (8px wins). But justify/align come from card-content-wrap only.

Current local CSS at tiny only has Project properties. Missing the card-content-wrap properties!

---

## Content (.project-card__content / card-content)

### BASE (main breakpoint)

| Property | Webflow | Local | Match? |
|----------|---------|-------|--------|
| display | ❌ (inherited from VFlex) | `flex` | ⚠️ |
| flex-direction | ❌ (inherited from VFlex) | `column` | ⚠️ |
| align-self | `stretch` | `stretch` | ✅ |
| flex-grow | `1` | `1` | ✅ |
| flex-shrink | `1` | `1` | ✅ |
| flex-basis | `0%` | `0%` | ✅ |
| grid-column-gap | `1em` | `1em` | ✅ |
| grid-row-gap | `1em` | `1em` | ✅ |

---

## Header (.project-card__header / card-header)

### BASE (main breakpoint)

| Property | Webflow | Local | Match? |
|----------|---------|-------|--------|
| display | ❌ (inherited from VFlex) | `flex` | ⚠️ |
| flex-direction | ❌ (inherited from VFlex) | `column` | ⚠️ |
| grid-column-gap | `0.3em` | `0.3em` | ✅ |
| grid-row-gap | `0.3em` | `0.3em` | ✅ |

---

## Title (.project-card__title / card-title + Small combo)

### BASE (main breakpoint)

**From card-title:**

| Property | Webflow | Local | Match? |
|----------|---------|-------|--------|
| font-size | `20px` | ❌ MISSING | ❌ |
| line-height | `1.5em` | ❌ MISSING | ❌ |

**From Small combo (OVERRIDES card-title):**

| Property | Webflow | Local | Match? |
|----------|---------|-------|--------|
| font-family | `Bodoni Moda` | `Bodoni Moda, serif` | ✅ |
| color | `hsla(68, 19.36%, 8.94%, 1.00)` | `hsla(68, 19.36%, 8.94%, 1.00)` | ✅ |
| font-size | `1.8rem` | `1.8rem` | ✅ |
| line-height | `1.2em` | `1.2em` | ✅ |
| font-weight | `500` | `500` | ✅ |

**ISSUE**: Missing base card-title properties (font-size: 20px, line-height: 1.5em). Though these get overridden by Small combo, they should be present.

### SMALL (max-width: 767px)

| Property | Webflow (Small combo) | Local | Match? |
|----------|---------|-------|--------|
| font-size | `1.5rem` | `1.5rem` | ✅ |

### TINY (max-width: 478px)

| Property | Webflow (Small combo) | Local | Match? |
|----------|---------|-------|--------|
| font-size | `20px` | `20px` | ✅ |
| line-height | `1.5em` | `1.5em` | ✅ |
| text-align | `left` | `left` | ✅ |

---

## Subtitle (.project-card__subtitle / card-subtitle)

### BASE (main breakpoint)

| Property | Webflow | Local | Match? |
|----------|---------|-------|--------|
| font-size | `1.25em` | `1.25em` | ✅ |
| line-height | `1.3em` | `1.3em` | ✅ |

---

## Helper (.project-card__helper / card-helper)

### BASE (main breakpoint)

| Property | Webflow | Local | Match? |
|----------|---------|-------|--------|
| display | `flex` | `flex` | ✅ |
| margin-top | `auto` | `auto` | ✅ |
| justify-content | `center` | `center` | ✅ |
| align-items | `center` | `center` | ✅ |
| flex-grow | `0` | `0` | ✅ |
| flex-shrink | `0` | `0` | ✅ |
| flex-basis | `auto` | `auto` | ✅ |
| font-family | `Noto Sans` | `Noto Sans, sans-serif` | ✅ |
| color | `var(--md-sys-color-primary)` | `var(--md-sys-color-primary, #6b7d3f)` | ✅ |
| font-size | `0.75rem` | `0.75rem` | ✅ |
| line-height | `1.2em` | `1.2em` | ✅ |
| font-weight | `400` | `400` | ✅ |
| letter-spacing | `0.5px` | `0.5px` | ✅ |
| text-transform | `uppercase` | `uppercase` | ✅ |

### SMALL (max-width: 767px)

| Property | Webflow | Local | Match? |
|----------|---------|-------|--------|
| margin-top | `0px` | `0px` | ✅ |

### TINY (max-width: 478px)

| Property | Webflow | Local | Match? |
|----------|---------|-------|--------|
| padding-top | `2px` | `2px` | ✅ |
| padding-right | `8px` | `8px` | ✅ |
| padding-bottom | `2px` | `2px` | ✅ |
| padding-left | `8px` | `8px` | ✅ |
| line-height | `1.3em` | `1.3em` | ✅ |

---

## Image Wrapper (.project-card__image-wrapper / Flex Block 5)

### BASE (main breakpoint)

| Property | Webflow | Local | Match? |
|----------|---------|-------|--------|
| display | ❌ (inherited from VFlex) | `flex` | ⚠️ |
| flex-direction | ❌ (inherited from VFlex) | `column` | ⚠️ |
| align-self | `stretch` | `stretch` | ✅ |

### MEDIUM (max-width: 991px)

| Property | Webflow | Local | Match? |
|----------|---------|-------|--------|
| flex-grow | `1` | `1` | ✅ |
| flex-shrink | `1` | `1` | ✅ |
| flex-basis | `0%` | `0%` | ✅ |

### SMALL (max-width: 767px)

| Property | Webflow | Local | Match? |
|----------|---------|-------|--------|
| flex-grow | `0` | `0` | ✅ |
| flex-shrink | `0` | `0` | ✅ |
| flex-basis | `auto` | `auto` | ✅ |

---

## Image (.project-card__image / card-image + full-bleed combo)

### BASE (main breakpoint)

**From full-bleed combo:**

| Property | Webflow | Local | Match? |
|----------|---------|-------|--------|
| width | `100%` | `100%` | ✅ |
| object-fit | ❌ NOT SET | `cover` | ❌ |

**ISSUE**: Local has object-fit: cover in base, but Webflow doesn't set it until medium breakpoint

### MEDIUM (max-width: 991px)

| Property | Webflow (card-image) | Local | Match? |
|----------|---------|-------|--------|
| position | `relative` | `relative` | ✅ |
| object-fit | `cover` | `cover` | ✅ |

### SMALL (max-width: 767px)

| Property | Webflow (card-image) | Local | Match? |
|----------|---------|-------|--------|
| max-height | `200px` | `200px` | ✅ |
| aspect-ratio | `1/1` | `1/1` | ✅ |
| object-fit | `cover` | `cover` | ✅ |

---

## SUMMARY OF ISSUES

### Critical Issues:

1. **Content-wrap at tiny breakpoint**: Missing `justify-content: flex-start` and `align-items: flex-start` from card-content-wrap class
2. **Card wrapper at tiny**: Missing `flex-wrap: nowrap`
3. **Image base**: Has `object-fit: cover` but shouldn't (should only be at medium+)
4. **Hover state**: Missing `border-color` and `outline-color` properties (cosmetic, won't show without border-width)

### Minor Issues:

5. **Title base**: Missing card-title base properties (`font-size: 20px`, `line-height: 1.5em`) - though overridden by Small combo
6. **VFlex inheritance**: Local explicitly sets `display: flex` and `flex-direction: column` on wrappers, Webflow inherits from VFlex - functionally equivalent

---

## NEXT STEPS

Fix issues in this order:
1. Remove `object-fit: cover` from base .project-card__image
2. Add `flex-wrap: nowrap` to .project-card at tiny breakpoint
3. Add content-wrap tiny breakpoint overrides
4. (Optional) Add hover border/outline colors for completeness
5. (Optional) Add base card-title properties
