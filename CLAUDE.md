# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This repository contains the Weaver-Yuwono family website with two pages:

## Communication Preferences

**Be concise.** Short status updates over verbose summaries. No markdown documentation files unless explicitly requested.

### Documentation Hygiene

**Clean up temporary documentation at the end of exercises.**

- Delete plans, tests, and other temporary `.md` files when work is complete
- When marking a plan "done" or completing a test, remove the documentation created along the way
- Don't create detailed summaries upon completion unless they provide information not already in the code or elsewhere
- Resist the urge to document what the code already shows clearly

## Pages

1. **Landing** (`/index.html`): static portraits and links for Stanton and Matt. Uses the `projects/case/case.css` tokens and top bar; `styles.css` adds the landing layout only.
2. **Projects hub** (`/projects/`) and case pages (`/projects/<slug>/`): rendered from `projects/projects-data.js` by `projects/hub.js` and `projects/case/case.js`.

Static HTML/CSS/JS: no build step, no CDN design system. GitHub: https://github.com/mwyuwono/Weaver-Yuwono-Home-Page.
The working copy lives on Google Drive, where git is slow (`git diff`/`merge` can exceed 120 s): use long timeouts.
Preview locally with `python3 -m http.server 8765` from the repo root.

## Deploying (Vercel): few, small deployments

Vercel team `weaver-yuwono` is on Hobby: 10 GB of Deployment Storage shared by every project. Each deployment stores
the whole committed tree (about 38 MB here, Nov 2026) from creation until about 30 days after it is deleted
(retention is 7 days), so storage ≈ deploys per month × 1.25 × tree size. Deleting deployments gives no quick relief;
deploying less often and smaller does. When the `vercel-deployment-guardrails` skill is available, invoke it before any Vercel work.

- **A push to `main` is a production deploy; nothing else deploys.** `git.deploymentEnabled` in `vercel.json`
  (`"**": false, "main": true`) blocks every other branch, including cloud `claude/*` branches. Keep it. A branch cut
  before commit `01c7c7d` still has the old `vercel.json` and will deploy previews when pushed.
- **Pushes that change only `*.md` or `tools/` skip the build** (`ignoreCommand` in `vercel.json`; it shows as a
  canceled deployment and stores almost nothing). Keep repo-only material in those paths or extend the exclusions.
- **One push per finished change.** Batch commits and preview locally instead of pushing to look. Push only when Matt
  approves that push. Work done on a branch is merged into `main` and pushed once.
- **Never run `vercel --prod` or `vercel deploy`.** The project is Git-linked, so either duplicates the Git deployment.
  The installed CLI (v48) has no `vercel api` subcommand and parses `vercel api …` as a deploy. When the Vercel MCP
  lacks an operation (for example domain redirects), ask Matt to make the change in the dashboard.
- **Every committed byte is stored with every deployment.** `.vercelignore` only hides files from the public site; it
  does not reduce storage. Before committing media, confirm a page references it, export it at the sizes actually
  served, compress PDFs, and delete the files it replaces in the same commit. Do not commit videos, QA screenshots,
  unused renders, working/source files (PSD, CAD, raw scans) or build intermediates. Only the built 3D model in
  `projects/connecticut-cottage/model/` ships; its `tools/cottage-3d` source stays small.
- **Size check:** `git ls-files -z | xargs -0 du -ck | tail -1`. If the tree passes about 60 MB, move
  `projects/assets/sheets/` and `projects/assets/pdfs/` (most of the bytes) to the object store rather than growing the repo.
- **Browser caching:** `vercel.json` caches `projects/assets/` and `landing-assets/` for a day; the hashed files in
  `model/assets/` are immutable. Give a replacement asset a new filename, or returning visitors see the old one for up to a day.
- **Domain:** the canonical host is `weaver-yuwono.com` (the pages' canonical tags); `www` should redirect to it.

## CSS Modification Policy

**IMPORTANT**: The user has custom-tweaked the CSS styling. Do NOT modify CSS files without explicit user instruction or permission. This includes:
- Font sizes, weights, and styles
- Colors and gradients
- Spacing, margins, and padding
- Animation timings and properties
- Any other CSS properties

Only modify CSS when:
1. User explicitly requests a specific CSS change
2. User asks you to fix a bug or issue
3. User gives clear permission to update styling

## Component Architecture

This project follows the **Component Composition Pattern** for building reusable UI components. This is the same pattern used by Bootstrap, Material Design, and other major CSS frameworks.

### Pattern Overview

Components use a **base + variant** approach:
- **Base component** defines shared structure and styling
- **Variants** extend the base with specific modifications
- Elements use **dual class names** for composition

### Component Structure

```
components/
├── card-base/              # Base component (shared foundation)
│   └── card-base.css       # Shared card structure & styles
├── project-card/           # Variant component
│   ├── project-card.css    # Project-specific overrides
│   └── project-card.js     # Project card rendering
└── profile-card/           # Variant component
    ├── profile-card.css    # Profile-specific overrides
    └── profile-card.js     # Profile card rendering
```

### How It Works

**HTML with dual classes:**
```html
<div class="card project-card">
  <div class="card__content-wrap">
    <div class="card__title">Title</div>
    <div class="card__link project-card__helper">Helper text</div>
  </div>
</div>
```

**CSS cascade:**
```css
/* card-base.css - shared foundation */
.card { /* base structure */ }
.card__title { /* shared element */ }
.card__link { /* shared typography */ }

/* project-card.css - variant overrides */
.project-card:hover { /* variant behavior */ }
.project-card__helper { /* variant-specific layout */ }
```

**Load order matters:**
```html
<!-- Base MUST load before variants -->
<link rel="stylesheet" href="components/card-base/card-base.css">
<link rel="stylesheet" href="components/project-card/project-card.css">
```

### Creating New Components

**When to create a base component:**
- Multiple variants share 80%+ of structure/styling
- Variants differ in behavior, not fundamental structure
- You want single source of truth for shared styles

**Steps to create a base + variant:**

1. **Create base component:**
   ```
   components/component-base/
   └── component-base.css    # Shared structure, BEM elements
   ```

2. **Create variant components:**
   ```
   components/component-variant/
   ├── component-variant.css  # Only differences from base
   └── component-variant.js   # Variant logic
   ```

3. **Use dual class names in JavaScript:**
   ```javascript
   element.className = 'component component-variant';
   element.className = 'component__element variant__element';
   ```

4. **Load CSS in correct order:**
   ```html
   <link rel="stylesheet" href="components/component-base/component-base.css">
   <link rel="stylesheet" href="components/component-variant/component-variant.css">
   ```

### CSS Override Rules

- **Specificity wins:** `.variant .base__element` (20) beats `.base__element` (10)
- **Load order:** When equal specificity, last-loaded wins
- **Variants only define differences:** Base styles inherited automatically
- **No !important:** Never use - it prevents variant overrides

### Benefits of This Pattern

✅ **Single source of truth** - Base changes affect all variants
✅ **Minimal duplication** - Variants only define differences
✅ **Easy maintenance** - Update base once, affects all variants
✅ **Scalable** - Easy to add new variants
✅ **Industry standard** - Same as Bootstrap, Material, Foundation

See `components/README.md` for detailed guidelines and examples.

## File Structure

```
/
├── index.html              # Main landing page
├── styles.css              # Landing layout (on top of projects/case/case.css)
├── landing-assets/         # Landing page assets
│   ├── logo.svg           # Main logo
│   ├── stanton-headshot.jpg
│   └── matt-headshot.jpg
├── projects/              # Portfolio page
│   ├── index.html         # Projects hub (all personal work, grouped by category)
│   ├── hub.js / hub.css   # Hub renderer and styles
│   ├── projects-data.js   # Content model: WY_CATEGORIES + WY_PROJECTS, used by hub AND case pages
│   ├── case/              # Shared case-page renderer (case.js) and styles (case.css)
│   ├── <slug>/index.html  # One thin shell per case page (sets data-project="<slug>")
│   ├── connecticut-cottage/model/  # Built 3D model (from tools/cottage-3d)
│   └── assets/            # Projects-specific assets
│       ├── images/        # Project images and logo
│       ├── sheets/        # Selected sheets: .jpg thumbnails + .svg (vector) for the zoom viewer
│       ├── social/        # 1200x630 Open Graph images
│       └── pdfs/          # Project PDFs (title blocks redacted: no names, addresses or phone)
├── components/            # Modular components (shared)
│   ├── card-base/         # Base card component (foundation)
│   │   └── card-base.css  # Shared card structure & styles
│   ├── profile-card/      # Profile card variant
│   │   ├── profile-card.css
│   │   └── profile-card.js
│   └── README.md          # Component architecture guidelines
├── vercel.json            # Vercel auto-deployment configuration
├── .vercel/               # Vercel project settings (gitignored)
├── CLAUDE.md              # Project instructions for Claude Code
├── README.md              # Project documentation
└── .gitignore             # Git ignore rules (iCloud-safe)
```

### Public-content rule

Every committed file is publicly served unless listed in `.vercelignore`. Plan sets must have owner names,
street addresses and phone numbers removed from title blocks (and any street names on site plans) before
they are committed.

### File Structure Notes

- **Landing page**: Root directory with assets in `landing-assets/`
- **Projects portfolio**: `/projects/` directory with self-contained `assets/` subdirectory
- **components/**: legacy; no page loads `card-base` or `profile-card` any more
- **CSS separation**:
  - Landing: `projects/case/case.css` + `styles.css`
  - Projects: `projects/case/case.css` (shared tokens, case pages) + `projects/hub.css` (hub); no CDN dependency
- **Asset ownership**: Clear separation between landing and projects assets
- **File naming**: Consistent kebab-case for all new/renamed files
- **iCloud safe**: .gitignore excludes `.icloud` and `.DS_Store*` files