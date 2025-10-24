# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a landing page website for weaver-yuwono.com, featuring animated gradients, custom fonts, and dynamic video background effects. Deployed with Vercel and hosted in an iCloud-synced directory.

## Important Setup Notes

- **iCloud Integration**: This project is stored in iCloud Drive. The .gitignore is configured to exclude iCloud-specific files (`.icloud`, `*.icloud`, `.DS_Store*`).
- **Deployment**: Project is deployed to Vercel. GitHub repository: https://github.com/mwyuwono/Weaver-Yuwono-Home-Page
- **Technology Stack**: Vanilla HTML/CSS/JavaScript with Google Fonts (Playfair Display, Inter)

## Development Workflow

This is a static website with no build process. To deploy:

1. Make changes to HTML/CSS/JS files
2. Commit changes to git
3. Push to GitHub: `git push origin main`
4. Deploy to Vercel: `vercel --prod`

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

## File Structure Considerations

- Ensure all new files respect the iCloud-safe .gitignore configuration
- Follow Vercel deployment best practices
- Maintain clean separation between source and build artifacts