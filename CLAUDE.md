# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a dual-site repository for the Weaver-Yuwono family website:

1. **Main Landing Page** (`/index.html`): Animated landing page at [weaver-yuwono.com](https://weaver-yuwono.com) featuring:
   - Dynamic video background with bloom effect
   - Animated gradient overlays
   - Avatar tiles linking to LinkedIn profiles (Stanton and Matt)
   - Custom fonts (Playfair Display, Inter)

2. **Projects Portfolio** (`/projects/`): Portfolio page at [matt.weaver-yuwono.com](https://matt.weaver-yuwono.com) featuring:
   - Material Design 3 design system
   - Project card grid for architectural drawings and renderings
   - Modular component architecture

Both sites are deployed via Vercel with auto-deployment enabled and hosted in an iCloud-synced directory.

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

The project is configured for two domains:
- **weaver-yuwono.com** → serves `/index.html` (main landing page)
- **matt.weaver-yuwono.com** → serves `/projects/index.html` (portfolio page)

To configure domains in Vercel:
1. Go to [Vercel Dashboard](https://vercel.com/dashboard) → weaver-yuwono project → Settings → Domains
2. Add both domains and configure DNS records as instructed
3. For the subdomain (matt.weaver-yuwono.com), you may need to add a rewrite rule (see Deployment Notes below)

### Deployment Notes

If the projects subdomain isn't automatically routing to `/projects/`, you can add a `vercel.json` rewrite rule:

```json
{
  "rewrites": [
    { "source": "/projects/(.*)", "destination": "/projects/$1" }
  ]
}
```

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
├── index.html              # Main landing page (weaver-yuwono.com)
├── styles.css              # Main landing page styles
├── Fat-Logo.svg           # Logo for main page
├── bloom_loop.mp4         # Background video for main page
├── Stanton's Headshot.jpg # Avatar image
├── McK Headshot Cropped.jpg # Avatar image
├── projects/              # Portfolio subdirectory (matt.weaver-yuwono.com)
│   ├── index.html         # Portfolio page
│   └── project-card.js    # Project card component (with relative paths)
├── components/            # Shared components
│   └── project-card/      # Original project card component
├── design-system/         # Material Design 3 design system
├── assets/                # Shared assets
│   ├── images/            # Images for projects
│   └── pdfs/              # Project PDFs
├── vercel.json            # Vercel configuration
└── .vercel/               # Vercel project settings (gitignored)
```

### File Structure Considerations

- **Main landing page** files are in the root directory
- **Projects portfolio** files are in `/projects/` subdirectory with relative paths (`../`)
- All asset paths in `/projects/` use parent directory references
- Ensure all new files respect the iCloud-safe .gitignore configuration
- Follow Vercel deployment best practices
- `.vercel/` directory is gitignored and managed by Vercel CLI