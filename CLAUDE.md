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

## Adding a case page

Hold every new project to the standard set by Andover Trask (Nov 2026):

- **Evidence first.** Inventory the Drive sources and public coverage before writing. Every fact needs a source
  (a Drive file, press, or Matt's word). When sources conflict (dates, names, sale wording), ask Matt rather than
  choosing. Never infer product names, materials or credits from how something looks. Present as Matt's
  only what he designed; leave out partner graphics. Copy is first person and restrained; Matt approves it.
- **A portfolio story, not a bio.** Open with the strongest true hook (origin and result). Then, as the material
  allows: the signature piece, the full range, the design process (drawings beside finished work), the brand,
  how it was made, reach (partners, press, impact), and a closing reflection naming concrete skills and successes.
  Lead with what made the work premium (for example, selling direct to customers); retailer or wholesale programmes
  go later or not at all. Matt judges positioning.
- **Headings must match the content** (not "The collection" over six of ten-plus products).
- **Critique before showing.** Review the page at 1280 and 375 px as a hiring reviewer would: what is missing, what
  weakens it, whether Matt's own design work is visible. Fix it or report it.
- **Cut clutter.** Caption an image only when the caption adds something the image and text don't (a press source and date,
  a disclosure). No decorative dividers. Photo credits go in one closing line.
- **Review rounds:** render the full page at 1280 px to a PDF in `.claude/preview/` and open it in Preview; Matt annotates
  there and you read the notes back with pypdf. Don't ask him to mark up screenshots.
- **Flag low-resolution images** (narrower than the width they're shown at) rather than using them silently.
- **Project-specific styling** goes in `projects/<slug>/<slug>.css`, loaded only by that shell and scoped to
  `[data-project="<slug>"]`. Leave `case.css` alone so the other case pages are unaffected.
- **Exports:** rasterize Illustrator `.ai` files with Ghostscript (`gs -sDEVICE=png16m -r300`; `sips` can't read
  them) and PSDs with `magick 'file.psd[0]' -background white -alpha remove`. Product cutouts share one frame
  (960×1409 on white) so the grids line up.
  Cut subjects out with `tools/cutout/fgmask.swift` (macOS Vision foreground mask). In zsh write `"${f}[0]"`, since
  `"$f[0]"` indexes the string. Convert supplied PNG photos to WebP.

## Deploying (Vercel): few, small deployments

Vercel team `weaver-yuwono` is on Hobby: 10 GB of Deployment Storage shared by every project. Each deployment stores
the whole committed tree (about 38 MB here, Nov 2026) from creation until about 30 days after it is deleted
(retention is 7 days), so storage ≈ deploys per month × 1.25 × tree size. Deleting deployments gives no quick relief;
deploying less often and smaller does. When the `vercel-deployment-guardrails` skill is available, invoke it before any Vercel work.

- **A push to `main` is a production deploy; nothing else deploys.** `git.deploymentEnabled` in `vercel.json`
  (`"**": false, "main": true`) and the project's Preview Branch Tracking (off) both block every other branch,
  including cloud `claude/*` branches. Keep both.
- **Pushes that change only `*.md` or `tools/` skip the build** (`ignoreCommand` in `vercel.json`; it shows as a
  canceled deployment and stores almost nothing). Keep repo-only material in those paths or extend the exclusions.
- **One push per finished change.** Batch commits and preview locally instead of pushing to look. Push only when Matt
  approves that push. Work done on a branch is merged into `main` and pushed once.
- **Never run `vercel --prod` or `vercel deploy`.** The project is Git-linked, so either duplicates the Git deployment.
  The installed CLI (v48) has no `vercel api` subcommand and parses `vercel api …` as a deploy. When the Vercel MCP
  lacks an operation (for example domain redirects or project settings), make it in the dashboard with Matt's OK.
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
│   ├── <slug>/index.html  # One thin shell per case page (sets data-project="<slug>"); optional <slug>.css
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