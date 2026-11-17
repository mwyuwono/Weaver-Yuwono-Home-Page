# Weaver-Yuwono Family Website

This repository contains the Weaver-Yuwono family website with two pages:

1. **Main Landing Page** ([weaver-yuwono.com](https://weaver-yuwono.com))
   - Static page: portraits and links, sharing `projects/case/case.css`

2. **Projects Portfolio** ([weaver-yuwono.com/projects/](https://weaver-yuwono.com/projects/))
   - Portfolio page showcasing architectural drawings and renderings
   - Material Design 3 design system with modular component architecture

## Setup

### Deployment

This project is deployed to Vercel with **auto-deployment enabled**. Every push to `main` triggers a production deployment; pushes to other branches do not deploy (`git.deploymentEnabled` in `vercel.json`). Never run `vercel --prod` (it duplicates the Git deployment). Batch commits so one push = one deployment.

## Project Structure

```
/
├── index.html              # Main landing page
├── styles.css              # Landing page layout
├── landing-assets/         # Landing page assets
│   ├── logo.svg           # Main logo
│   ├── stanton-headshot.jpg
│   └── matt-headshot.jpg
├── projects/              # Portfolio page directory
│   ├── index.html         # Portfolio page
│   ├── projects.css       # Portfolio page layout styles
│   └── assets/            # Projects-specific assets
│       ├── images/        # Project images and logo
│       └── pdfs/          # Project PDFs
├── components/            # Modular components (shared)
│   ├── project-card/      # Project card component
│   │   ├── project-card.css
│   │   └── project-card.js
│   └── README.md          # Component architecture guidelines
├── vercel.json            # Vercel auto-deployment configuration
└── .vercel/               # Vercel project settings (gitignored)
```

## Assets

All assets are organized by page ownership:

**Landing Page** (`landing-assets/`):
- Logo: `logo.svg`
- Headshots: `stanton-headshot.jpg`, `matt-headshot.jpg`

**Projects Portfolio** (`projects/assets/`):
- Logo: `images/wy-logo.svg`
- Project Images: All responsive image variants in `images/`
- PDFs: Project documents in `pdfs/`

All assets imported from Webflow are now self-hosted.

## Component Architecture

This project follows the **Component Composition Pattern** for building reusable UI components. This is the same architectural pattern used by Bootstrap, Material Design, Foundation, and other major CSS frameworks.

### Pattern: Base + Variant Composition

Components use a hierarchical approach where:
- **Base components** define shared structure and styling (foundation)
- **Variant components** extend the base with specific modifications
- **Dual class names** enable CSS composition and inheritance

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

**Elements use dual classes:**
```html
<div class="card project-card">
  <div class="card__title">Title</div>
  <div class="card__link project-card__helper">Helper</div>
</div>
```

**CSS inherits from base and extends with variants:**
```css
/* Base defines foundation */
.card { /* shared structure */ }
.card__link { /* shared typography */ }

/* Variant extends/overrides */
.project-card:hover { /* variant behavior */ }
.project-card__helper { /* variant layout */ }
```

**Load order is critical:**
```html
<!-- Base MUST load before variants -->
<link rel="stylesheet" href="components/card-base/card-base.css">
<link rel="stylesheet" href="components/project-card/project-card.css">
```

### Benefits

✅ **Single source of truth** - Update base once, affects all variants
✅ **Minimal duplication** - Variants only define differences (~95% reduction)
✅ **Easy maintenance** - Clear separation of shared vs. variant styles
✅ **Scalable** - Add new variants without modifying base
✅ **Industry standard** - Same pattern as Bootstrap, Material, Foundation

See `components/README.md` for detailed guidelines, examples, and best practices.

### Components

#### Project Card Component

Location: `components/project-card/`

The project cards are rendered using a modular component with self-contained styles and logic.

**To add a new project:**
1. Edit `components/project-card/project-card.js`
2. Add a new object to the `projects` array:

```javascript
{
  title: 'Project Name',
  pdfUrl: 'assets/pdfs/project-name.pdf',
  image: {
    src: 'assets/images/project-name.jpg',
    srcset: 'assets/images/project-name-500.jpg 500w, ...',
    sizes: '(max-width: 479px) 30vw, ...',
    alt: 'Project Name'
  }
}
```

The component automatically renders all projects in the `projects` array into the `.project-grid` container.

**To modify project card styling:**
- Edit `components/project-card/project-card.css`
- All component-specific styles are contained in this file
- Changes automatically apply to all project cards

**To modify project card behavior:**
- Edit `components/project-card/project-card.js`
- Component logic is isolated and self-contained

## Code Conventions

### Naming Conventions
- **Components**: `kebab-case` folder names (e.g., `project-card`)
- **CSS classes**: BEM methodology
  - Block: `.component-name`
  - Element: `.component-name__element`
  - Modifier: `.component-name--modifier`
- **Files**: `component-name.css`, `component-name.js`

### HTML5
- Use semantic elements (`<header>`, `<main>`, `<section>`)
- Maintain accessibility standards

### CSS
- **Global styles**: `styles.css` (layout, reset, utilities only)
- **Component styles**: `components/[component-name]/[component-name].css`
- Use design tokens via CSS custom properties
- Keep component styles scoped to components

### JavaScript
- **Component scripts**: `components/[component-name]/[component-name].js`
- Use JSDoc for documentation
- Handle DOM ready states appropriately

## Development

Open `index.html` in a browser to view the site locally.

