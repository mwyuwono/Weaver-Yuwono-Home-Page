# PHASE 1: WEBFLOW BASELINE DOCUMENTATION
**Site ID:** 673ccceba3dcf36ccc28f470
**Page:** Home (673ccceba3dcf36ccc28f48d)
**Date:** 2025-11-30
**Purpose:** Complete Webflow audit as source of truth for alignment

---

## 1. WEBFLOW VARIABLES

### Variable Collection: default (collection-da84c4df-69e9-118d-66ea-82b0ef86293f)

| Variable ID | Name | Type | Value |
|------------|------|------|-------|
| variable-4e9b27cc-1ffb-abf7-af98-77bc81ea8046 | gray | Color | hsla(49.999999999999915, 6.64%, 61.44%, 1.00) |
| variable-705d5447-2dd0-0dd9-ebf0-00a193c31d1d | green | Color | #304634 |
| variable-c839d576-20e4-c725-3966-da74997c5436 | Neutral | Color | #f8f7f3 |

---

## 2. WEBFLOW PAGE STRUCTURE

### Page Nodes (4 nodes total)

```
Home Page
├── [Image] site-logo (e700afd9-fa23-23e9-cdb5-d2eaecd96627)
│   └── Asset: 673f9523317f9899f40c5ac8
│
├── [Text] site-title (2117bd7e-f448-95b4-8eac-fe89f42f3878)
│   └── Content: "Weaver - Yuwono"
│
├── [Component Instance] Card #1 (07e1ad60-c144-2964-ed1e-8c456fa48eef)
│   └── Component: d4b24b4f-5ab3-51d7-7867-f647d6e1b980
│   └── Property Overrides:
│       └── Label: "Historic Renovation"
│
└── [Component Instance] Card #2 (2687e885-7baa-cd25-2ad1-439fd5bd805f)
    └── Component: d4b24b4f-5ab3-51d7-7867-f647d6e1b980
    └── Property Overrides:
        ├── Label: "Architectural Design"
        └── Location: "Sharon, CT"
```

---

## 3. WEBFLOW COMPONENT: Card (d4b24b4f-5ab3-51d7-7867-f647d6e1b980)

### 3.1 Component Structure (9 elements total)

```
Card [Link] (d4b24b4f-5ab3-51d7-7867-f647d6e1b980)
├── Attributes: data-elemet="card"
├── Styles: Card (705416bb-a0c4-3913-1495-1708dc669b93)
└── Children:
    │
    ├── [VFlex] card-content-wrap (d4b24b4f-5ab3-51d7-7867-f647d6e1b981)
    │   ├── Styles: card-content-wrap + Project (combo)
    │   └── Children:
    │       │
    │       └── [VFlex] card-content (20bed1f4-d72b-a23a-80e4-97e242ba6ceb)
    │           ├── Styles: card-content
    │           └── Children:
    │               │
    │               ├── [VFlex] card-header (cbf4b0f9-e2f7-c34b-8826-4e61ec40e781)
    │               │   ├── Styles: card-header
    │               │   └── Children:
    │               │       │
    │               │       ├── [Block] card-title (d4b24b4f-5ab3-51d7-7867-f647d6e1b982)
    │               │       │   ├── Attributes: data-element="card-title"
    │               │       │   └── Styles: card-title + Small (combo)
    │               │       │
    │               │       └── [Block] card-subtitle (6bb47f59-f094-68ba-9339-12e90d91379c)
    │               │           ├── Attributes: data-element="card-subtitle"
    │               │           └── Styles: card-subtitle
    │               │
    │               └── [Block] card-helper (d4b24b4f-5ab3-51d7-7867-f647d6e1b984)
    │                   ├── Attributes: data-element="card-helper"
    │                   └── Styles: card-helper
    │
    └── [VFlex] Flex Block 5 (d33bd424-fbae-f6be-6e6a-794091099a86)
        ├── Styles: Flex Block 5
        └── Children:
            │
            └── [Image] card-image (d4b24b4f-5ab3-51d7-7867-f647d6e1b986)
                ├── Attributes: data-element="card-image"
                └── Styles: card-image + full-bleed (combo)
```

### 3.2 Component Properties

**No component properties defined** (instances use property overrides directly)

---

## 4. COMPLETE STYLE DEFINITIONS

### 4.1 Card (705416bb-a0c4-3913-1495-1708dc669b93)

#### Main Breakpoint

| State | Property | Value |
|-------|----------|-------|
| noPseudo | position | relative |
| noPseudo | display | flex |
| noPseudo | width | 25svw |
| noPseudo | padding-top | 8px |
| noPseudo | padding-right | 8px |
| noPseudo | padding-bottom | 8px |
| noPseudo | padding-left | 8px |
| noPseudo | flex-direction | column |
| noPseudo | justify-content | flex-start |
| noPseudo | flex-wrap | nowrap |
| noPseudo | align-items | center |
| noPseudo | align-self | stretch |
| noPseudo | flex-grow | 0 |
| noPseudo | flex-shrink | 1 |
| noPseudo | flex-basis | auto |
| noPseudo | grid-column-gap | 8px |
| noPseudo | grid-row-gap | 8px |
| noPseudo | border-top-left-radius | 12px |
| noPseudo | border-top-right-radius | 12px |
| noPseudo | border-bottom-left-radius | 12px |
| noPseudo | border-bottom-right-radius | 12px |
| noPseudo | background-color | variable-c839d576-20e4-c725-3966-da74997c5436 (#f8f7f3) |
| noPseudo | color | #1a1b12 |
| noPseudo | font-size | 16px |
| noPseudo | line-height | 1.5em |
| noPseudo | font-weight | 400 |
| noPseudo | text-align | center |
| noPseudo | text-decoration | none |
| noPseudo | cursor | pointer |
| hover | border-top-color | variable-705d5447-2dd0-0dd9-ebf0-00a193c31d1d (#304634) |
| hover | border-right-color | variable-705d5447-2dd0-0dd9-ebf0-00a193c31d1d (#304634) |
| hover | border-bottom-color | variable-705d5447-2dd0-0dd9-ebf0-00a193c31d1d (#304634) |
| hover | border-left-color | variable-705d5447-2dd0-0dd9-ebf0-00a193c31d1d (#304634) |
| hover | background-color | hsla(0, 0.00%, 100.00%, 1.00) |
| hover | outline-color | variable-705d5447-2dd0-0dd9-ebf0-00a193c31d1d (#304634) |
| hover | color | variable-705d5447-2dd0-0dd9-ebf0-00a193c31d1d (#304634) |

#### Small Breakpoint (max-width: 767px)

| State | Property | Value |
|-------|----------|-------|
| noPseudo | width | auto |
| noPseudo | flex-direction | row |
| noPseudo | flex-wrap | nowrap |

#### Medium Breakpoint (max-width: 991px)

| State | Property | Value |
|-------|----------|-------|
| noPseudo | width | 33svw |
| noPseudo | align-self | stretch |
| noPseudo | flex-grow | 1 |
| noPseudo | flex-shrink | 1 |
| noPseudo | flex-basis | 0% |

#### Tiny Breakpoint (max-width: 478px)

| State | Property | Value |
|-------|----------|-------|
| noPseudo | min-width | 40vw |
| noPseudo | padding-top | 0px |
| noPseudo | padding-right | 8px |
| noPseudo | padding-bottom | 0px |
| noPseudo | padding-left | 0px |
| noPseudo | flex-direction | row |
| noPseudo | justify-content | flex-start |
| noPseudo | flex-wrap | nowrap |
| noPseudo | align-items | center |
| noPseudo | grid-column-gap | 16px |
| noPseudo | grid-row-gap | 16px |
| noPseudo | background-color | hsla(0, 0.00%, 100.00%, 1.00) |

---

### 4.2 card-content-wrap (c919d8f3-c739-9fa0-911f-80dea057bd1e)

#### Main Breakpoint

| State | Property | Value |
|-------|----------|-------|
| noPseudo | justify-content | center |
| noPseudo | align-items | center |
| noPseudo | align-self | stretch |
| noPseudo | flex-grow | 1 |
| noPseudo | flex-shrink | 1 |
| noPseudo | flex-basis | 0% |
| noPseudo | grid-column-gap | 8px |
| noPseudo | grid-row-gap | 8px |
| noPseudo | text-align | left |

#### Tiny Breakpoint (max-width: 478px)

| State | Property | Value |
|-------|----------|-------|
| noPseudo | justify-content | flex-start |
| noPseudo | align-items | flex-start |
| noPseudo | grid-column-gap | 16px |
| noPseudo | grid-row-gap | 16px |

---

### 4.3 Project (c0f095dd-237a-75b3-8641-71347cbe1187) - COMBO CLASS

#### Main Breakpoint

| State | Property | Value |
|-------|----------|-------|
| noPseudo | padding-top | 24px |
| noPseudo | padding-right | 24px |
| noPseudo | padding-bottom | 24px |
| noPseudo | padding-left | 24px |
| noPseudo | justify-content | flex-start |
| noPseudo | align-items | flex-start |
| noPseudo | flex-grow | 1 |
| noPseudo | flex-shrink | 1 |
| noPseudo | flex-basis | 0% |
| noPseudo | border-top-left-radius | 8px |
| noPseudo | border-top-right-radius | 8px |
| noPseudo | border-bottom-left-radius | 8px |
| noPseudo | border-bottom-right-radius | 8px |
| noPseudo | background-color | #ebece6 |

#### Small Breakpoint (max-width: 767px)

| State | Property | Value |
|-------|----------|-------|
| noPseudo | padding-top | 1.5em |
| noPseudo | padding-right | 1.5em |
| noPseudo | padding-bottom | 1.5em |
| noPseudo | padding-left | 1.5em |
| noPseudo | justify-content | center |
| noPseudo | align-items | flex-start |
| noPseudo | order | 9999 |
| noPseudo | grid-column-gap | 0.75em |
| noPseudo | grid-row-gap | 0.75em |

#### Medium Breakpoint (max-width: 991px)

| State | Property | Value |
|-------|----------|-------|
| noPseudo | flex-grow | 1 |
| noPseudo | flex-shrink | 1 |
| noPseudo | flex-basis | 0% |

#### Tiny Breakpoint (max-width: 478px)

| State | Property | Value |
|-------|----------|-------|
| noPseudo | padding-top | 16px |
| noPseudo | padding-bottom | 16px |
| noPseudo | grid-column-gap | 8px |
| noPseudo | grid-row-gap | 8px |

---

### 4.4 card-content (bc5c1ab6-b5ad-efe8-bfd7-387b29ada7c3)

#### Main Breakpoint

| State | Property | Value |
|-------|----------|-------|
| noPseudo | align-self | stretch |
| noPseudo | flex-grow | 1 |
| noPseudo | flex-shrink | 1 |
| noPseudo | flex-basis | 0% |
| noPseudo | grid-column-gap | 1em |
| noPseudo | grid-row-gap | 1em |

---

### 4.5 card-header (2d6eabb2-106c-b1c3-61bd-e32983441fd5)

#### Main Breakpoint

| State | Property | Value |
|-------|----------|-------|
| noPseudo | grid-column-gap | 0.3em |
| noPseudo | grid-row-gap | 0.3em |

---

### 4.6 card-title (53927274-fb26-b4b0-3f45-4a7e0c3b1ae8)

#### Main Breakpoint

| State | Property | Value |
|-------|----------|-------|
| noPseudo | font-size | 20px |
| noPseudo | line-height | 1.5em |

---

### 4.7 Small (aa59063d-b25a-2e4e-04a3-d13ee5a5c8fa) - COMBO CLASS

#### Main Breakpoint

| State | Property | Value |
|-------|----------|-------|
| noPseudo | font-family | Bodoni Moda |
| noPseudo | color | hsla(68, 19.36%, 8.94%, 1.00) |
| noPseudo | font-size | 1.8rem |
| noPseudo | line-height | 1.2em |
| noPseudo | font-weight | 500 |

#### Small Breakpoint (max-width: 767px)

| State | Property | Value |
|-------|----------|-------|
| noPseudo | font-size | 1.5rem |

#### Tiny Breakpoint (max-width: 478px)

| State | Property | Value |
|-------|----------|-------|
| noPseudo | font-size | 20px |
| noPseudo | line-height | 1.5em |
| noPseudo | text-align | left |

---

### 4.8 card-subtitle (f56d67c3-553e-a937-2460-ab93c39ae475)

#### Main Breakpoint

| State | Property | Value |
|-------|----------|-------|
| noPseudo | font-size | 1.25em |
| noPseudo | line-height | 1.3em |

---

### 4.9 card-helper (24038713-2011-3c90-eafa-20427d748799)

#### Main Breakpoint

| State | Property | Value |
|-------|----------|-------|
| noPseudo | display | flex |
| noPseudo | margin-top | auto |
| noPseudo | justify-content | center |
| noPseudo | align-items | center |
| noPseudo | flex-grow | 0 |
| noPseudo | flex-shrink | 0 |
| noPseudo | flex-basis | auto |
| noPseudo | font-family | Noto Sans |
| noPseudo | color | variable-4e9b27cc-1ffb-abf7-af98-77bc81ea8046 (hsla(49.999999999999915, 6.64%, 61.44%, 1.00)) |
| noPseudo | font-size | 0.75rem |
| noPseudo | line-height | 1.2em |
| noPseudo | font-weight | 400 |
| noPseudo | letter-spacing | 0.5px |
| noPseudo | text-transform | uppercase |

#### Small Breakpoint (max-width: 767px)

| State | Property | Value |
|-------|----------|-------|
| noPseudo | margin-top | 0px |

#### Tiny Breakpoint (max-width: 478px)

| State | Property | Value |
|-------|----------|-------|
| noPseudo | padding-top | 2px |
| noPseudo | padding-right | 8px |
| noPseudo | padding-bottom | 2px |
| noPseudo | padding-left | 8px |
| noPseudo | line-height | 1.3em |

---

### 4.10 Flex Block 5 (bc34e0c2-f1ef-033a-5935-8df135db50ec)

#### Main Breakpoint

| State | Property | Value |
|-------|----------|-------|
| noPseudo | align-self | stretch |

#### Small Breakpoint (max-width: 767px)

| State | Property | Value |
|-------|----------|-------|
| noPseudo | flex-grow | 0 |
| noPseudo | flex-shrink | 0 |
| noPseudo | flex-basis | auto |

#### Medium Breakpoint (max-width: 991px)

| State | Property | Value |
|-------|----------|-------|
| noPseudo | flex-grow | 1 |
| noPseudo | flex-shrink | 1 |
| noPseudo | flex-basis | 0% |

---

### 4.11 card-image (e124fbe5-ef9e-56f9-7be7-4e54553b28ab)

#### Small Breakpoint (max-width: 767px)

| State | Property | Value |
|-------|----------|-------|
| noPseudo | max-height | 200px |
| noPseudo | aspect-ratio | 1/1 |
| noPseudo | object-fit | cover |

#### Medium Breakpoint (max-width: 991px)

| State | Property | Value |
|-------|----------|-------|
| noPseudo | position | relative |
| noPseudo | object-fit | cover |

---

### 4.12 full-bleed (afa5e591-81de-a860-37c1-ca4a88dd01a0) - COMBO CLASS

#### Main Breakpoint

| State | Property | Value |
|-------|----------|-------|
| noPseudo | width | 100% |

---

### 4.13 main-page-container (100583b3-78e6-4434-684b-140493d70f5d)

#### Main Breakpoint

| State | Property | Value |
|-------|----------|-------|
| noPseudo | display | flex |
| noPseudo | min-height | 100svh |
| noPseudo | padding-top | 32px |
| noPseudo | padding-right | 24px |
| noPseudo | padding-bottom | 32px |
| noPseudo | padding-left | 24px |
| noPseudo | flex-direction | column |
| noPseudo | justify-content | center |
| noPseudo | flex-wrap | nowrap |
| noPseudo | align-items | center |
| noPseudo | flex-grow | 1 |
| noPseudo | flex-shrink | 1 |
| noPseudo | flex-basis | 0% |
| noPseudo | grid-column-gap | 3em |
| noPseudo | grid-row-gap | 3em |
| noPseudo | background-image | linear-gradient(303deg, hsla(0, 0.00%, 0.00%, 0.00) 52%, hsla(49.999999999999915, 19.59%, 92.54%, 1.00)), linear-gradient(180deg, #e4e2d8, hsla(49.999999999999915, 9.27%, 74.28%, 1.00)) |
| noPseudo | font-family | Palatino Linotype |

#### Small Breakpoint (max-width: 767px)

| State | Property | Value |
|-------|----------|-------|
| noPseudo | padding-top | 16px |
| noPseudo | padding-right | 16px |
| noPseudo | padding-bottom | 16px |
| noPseudo | padding-left | 16px |
| noPseudo | justify-content | flex-start |
| noPseudo | align-items | center |
| noPseudo | grid-column-gap | 1em |
| noPseudo | grid-row-gap | 1em |

#### Medium Breakpoint (max-width: 991px)

| State | Property | Value |
|-------|----------|-------|
| noPseudo | justify-content | center |
| noPseudo | align-items | center |
| noPseudo | flex-grow | 0 |
| noPseudo | flex-shrink | 0 |
| noPseudo | flex-basis | auto |
| noPseudo | grid-column-gap | 2em |
| noPseudo | grid-row-gap | 2em |

---

### 4.14 Section Head Group (de3695de-cc09-8e85-c46f-e0115f3ffe30)

#### Main Breakpoint

| State | Property | Value |
|-------|----------|-------|
| noPseudo | display | flex |
| noPseudo | flex-direction | column |
| noPseudo | justify-content | center |
| noPseudo | flex-wrap | nowrap |
| noPseudo | align-items | center |
| noPseudo | grid-column-gap | 1rem |
| noPseudo | grid-row-gap | 1rem |

#### Small Breakpoint (max-width: 767px)

| State | Property | Value |
|-------|----------|-------|
| noPseudo | flex-direction | row |
| noPseudo | justify-content | space-between |
| noPseudo | flex-wrap | nowrap |
| noPseudo | align-self | stretch |

#### Medium Breakpoint (max-width: 991px)

| State | Property | Value |
|-------|----------|-------|
| noPseudo | flex-grow | 1 |
| noPseudo | flex-shrink | 1 |
| noPseudo | flex-basis | 0% |

#### Tiny Breakpoint (max-width: 478px)

| State | Property | Value |
|-------|----------|-------|
| noPseudo | grid-column-gap | 16px |
| noPseudo | grid-row-gap | 16px |
| noPseudo | line-height | 1.3em |
| noPseudo | text-align | center |

---

### 4.15 wy logo (f7a48e5d-b51b-d6b1-0699-389b1f1d8fa1)

#### Main Breakpoint

| State | Property | Value |
|-------|----------|-------|
| noPseudo | height | 40px |
| noPseudo | flex-grow | 0 |
| noPseudo | flex-shrink | 0 |
| noPseudo | flex-basis | auto |

#### Small Breakpoint (max-width: 767px)

| State | Property | Value |
|-------|----------|-------|
| noPseudo | height | 28px |

---

### 4.16 Text Block (e686b5e7-e4bb-3e57-ba20-25497779ed4a)

#### Main Breakpoint

| State | Property | Value |
|-------|----------|-------|
| noPseudo | font-family | Bodoni Moda |
| noPseudo | color | hsla(0, 1.35%, 15.13%, 1.00) |
| noPseudo | font-size | 0.85rem |
| noPseudo | line-height | 1.4em |
| noPseudo | font-weight | 500 |
| noPseudo | letter-spacing | 2px |
| noPseudo | text-transform | uppercase |

---

### 4.17 main (970e8e1a-5353-e3cd-260e-036e08152a59)

#### Main Breakpoint

| State | Property | Value |
|-------|----------|-------|
| noPseudo | display | flex |
| noPseudo | flex-direction | row |
| noPseudo | justify-content | center |
| noPseudo | flex-wrap | wrap |
| noPseudo | align-items | center |
| noPseudo | flex-grow | 0 |
| noPseudo | flex-shrink | 0 |
| noPseudo | flex-basis | auto |
| noPseudo | grid-column-gap | 1.5em |
| noPseudo | grid-row-gap | 1.5em |

#### Small Breakpoint (max-width: 767px)

| State | Property | Value |
|-------|----------|-------|
| noPseudo | width | 100% |
| noPseudo | flex-direction | column |
| noPseudo | flex-wrap | nowrap |

#### Medium Breakpoint (max-width: 991px)

| State | Property | Value |
|-------|----------|-------|
| noPseudo | flex-grow | 0 |
| noPseudo | flex-shrink | 0 |
| noPseudo | flex-basis | auto |
| noPseudo | grid-column-gap | 0.75em |
| noPseudo | grid-row-gap | 0.75em |

#### Tiny Breakpoint (max-width: 478px)

| State | Property | Value |
|-------|----------|-------|
| noPseudo | flex-direction | column |
| noPseudo | flex-wrap | nowrap |

---

## 5. RESPONSIVE BREAKPOINTS

| Breakpoint | Max-Width | Webflow Name |
|-----------|-----------|--------------|
| main | Default | Desktop (1440px+) |
| xxl | N/A | Not used |
| xl | N/A | Not used |
| large | N/A | Not used |
| medium | 991px | Tablet |
| small | 767px | Mobile Landscape |
| tiny | 478px | Mobile Portrait |

---

## 6. EXPECTED LAYOUT BEHAVIOR

### Desktop (1440px+)
- Cards: 25svw width, column layout
- Page container: 3em gap, full centered layout
- Logo: 40px height

### Tablet (991px and below)
- Cards: 33svw width, stretch to fill
- Page container: 2em gap, centered
- Grid gaps reduce to 0.75em

### Mobile Landscape (767px and below)
- Cards: auto width, switch to row layout
- Images: 200px max-height, 1:1 aspect ratio
- Page container: 1em gap, 16px padding
- Logo: 28px height

### Mobile Portrait (478px and below)
- Cards: 40vw min-width, row layout, white background
- Gaps increase to 16px
- Title reduces to 20px
- Helper text gets padding

---

## SUMMARY

- **Total Variables:** 3 (gray, green, Neutral)
- **Page Nodes:** 4 (logo, title, 2 card instances)
- **Component Elements:** 9 (card structure)
- **Unique Styles:** 17+ styles across all breakpoints
- **Breakpoints Used:** main, medium, small, tiny
- **Combo Classes:** Project, Small, full-bleed

**Next Steps:** Proceed to Phase 2 - Compare local implementation against this baseline.
