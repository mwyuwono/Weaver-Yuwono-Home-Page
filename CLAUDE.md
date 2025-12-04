# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This repository contains the Weaver-Yuwono family website with two pages:

1. **Main Landing Page** (`/index.html`) at [weaver-yuwono.com](https://weaver-yuwono.com):
   - Dynamic video background with bloom effect
   - Animated gradient overlays
   - Avatar tiles linking to LinkedIn profiles (Stanton and Matt)
   - Custom fonts (Playfair Display, Inter)

2. **Projects Portfolio** (`/projects/index.html`) at [weaver-yuwono.com/projects/](https://weaver-yuwono.com/projects/):
   - Material Design 3 design system
   - Project card grid for architectural drawings and renderings
   - Modular component architecture (project-card component)

Deployed via Vercel with auto-deployment enabled. Repository stored in iCloud Drive for sync across devices.

## Important Setup Notes

- **iCloud Integration**: This project is stored in iCloud Drive. The .gitignore is configured to exclude iCloud-specific files (`.icloud`, `*.icloud`, `.DS_Store*`).
- **Deployment**: Project is deployed to Vercel with GitHub auto-deployment enabled
- **GitHub Repository**: https://github.com/mwyuwono/Weaver-Yuwono-Home-Page
- **Technology Stack**:
  - Main site: Vanilla HTML/CSS/JavaScript with Google Fonts (Playfair Display, Inter)
  - Projects site: HTML/CSS/JavaScript with Material Design 3 design system (Noto Sans, Noto Serif)

## Development Workflow

This is a static website with no build process. **Auto-deployment is enabled** - any push to the `main` branch automatically triggers a Vercel deployment.

### Standard Workflow

1. Make changes to HTML/CSS/JS files
2. Commit changes to git
3. Push to GitHub: `git push origin main`
4. Vercel automatically deploys the changes to production

### Manual Deployment (if needed)

If you need to manually trigger a deployment:

```bash
vercel --prod
```

### Domain Configuration

The project uses a single domain:
- **weaver-yuwono.com** → main landing page
- **weaver-yuwono.com/projects/** → portfolio page

No special Vercel configuration is needed - standard static file serving handles both pages.

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
├── styles.css              # Landing page styles (Material Design 3 background)
├── landing-assets/         # Landing page assets
│   ├── flow_loop.mp4      # Background video (active)
│   ├── bloom_loop.mp4     # Alternative background video
│   ├── logo.svg           # Main logo
│   ├── stanton-headshot.jpg
│   └── matt-headshot.jpg
├── projects/              # Portfolio page
│   ├── index.html         # Portfolio page
│   ├── projects.css       # Portfolio page layout styles
│   └── assets/            # Projects-specific assets
│       ├── images/        # Project images and logo
│       └── pdfs/          # Project PDFs
├── components/            # Modular components (shared)
│   ├── card-base/         # Base card component (foundation)
│   │   └── card-base.css  # Shared card structure & styles
│   ├── project-card/      # Project card variant
│   │   ├── project-card.css
│   │   └── project-card.js
│   ├── profile-card/      # Profile card variant
│   │   ├── profile-card.css
│   │   └── profile-card.js
│   └── README.md          # Component architecture guidelines
├── design-system/         # Material Design 3 design system (git submodule)
├── vercel.json            # Vercel auto-deployment configuration
├── .vercel/               # Vercel project settings (gitignored)
├── CLAUDE.md              # Project instructions for Claude Code
├── README.md              # Project documentation
└── .gitignore             # Git ignore rules (iCloud-safe)
```

### File Structure Notes

- **Landing page**: Root directory with assets in `landing-assets/`
- **Projects portfolio**: `/projects/` directory with self-contained `assets/` subdirectory
- **Component architecture**: Component Composition Pattern (base + variants)
  - Base components define shared structure (`card-base/`)
  - Variant components extend base with specific modifications
  - Both pages load appropriate base + variant combinations
- **CSS separation**:
  - Landing: `styles.css` (Material Design 3 background) + card-base + profile-card
  - Projects: `projects/projects.css` (layout, grid) + design system + card-base + project-card
- **Asset ownership**: Clear separation between landing and projects assets
- **Video files**: Both `flow_loop.mp4` and `bloom_loop.mp4` kept for easy swapping
- **File naming**: Consistent kebab-case for all new/renamed files
- **iCloud safe**: .gitignore excludes `.icloud` and `.DS_Store*` files