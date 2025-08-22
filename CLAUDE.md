# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a new website project for weaver-yuwono.com, set up for deployment with Vercel and hosted in an iCloud-synced directory.

## Important Setup Notes

- **iCloud Integration**: This project is stored in iCloud Drive. The .gitignore is configured to exclude iCloud-specific files (`.icloud`, `*.icloud`, `.DS_Store*`).
- **Deployment**: Project is intended for Vercel deployment using existing Vercel and GitHub setups.
- **Git Repository**: Initialized as a fresh git repository.

## Development Workflow

Since this is a new project with no build tools or framework configured yet, development commands will depend on the technology stack chosen. When setting up the project:

1. Choose appropriate web framework/technology
2. Configure build and development scripts in package.json
3. Set up appropriate linting and testing tools
4. Update this CLAUDE.md with specific commands once established

## File Structure Considerations

- Ensure all new files respect the iCloud-safe .gitignore configuration
- Follow Vercel deployment best practices for chosen framework
- Maintain clean separation between source and build artifacts