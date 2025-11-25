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

## File Structure

```
/
├── index.html              # Main landing page
├── styles.css              # Landing page styles (video, gradients, avatars)
├── Fat-Logo.svg           # Main logo
├── bloom_loop.mp4         # Background video
├── Stanton's Headshot.jpg # Avatar images
├── McK Headshot Cropped.jpg
├── projects/              # Portfolio page
│   ├── index.html         # Portfolio page (uses design system + component CSS only)
│   └── project-card.js    # Project card component with relative paths
├── components/            # Modular components
│   └── project-card/      # Project card component
│       ├── project-card.css
│       └── project-card.js
├── design-system/         # Material Design 3 design system (git submodule)
├── assets/                # Shared assets
│   ├── images/            # Project images and logos
│   └── pdfs/              # Project PDFs
├── vercel.json            # Vercel auto-deployment configuration
└── .vercel/               # Vercel project settings (gitignored)
```

### File Structure Notes

- **Main landing page**: Root directory with `styles.css` for animated backgrounds
- **Projects portfolio**: `/projects/` directory with modular component architecture
- **CSS separation**: Landing page uses `styles.css`, projects page uses only design system + component CSS
- **Relative paths**: Files in `/projects/` reference parent assets with `../`
- **iCloud safe**: .gitignore excludes `.icloud` and `.DS_Store*` files