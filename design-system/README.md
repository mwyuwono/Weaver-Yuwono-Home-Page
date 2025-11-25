# Material Design 3 Guidelines

A minimal, web-only Material Design 3 reference repository optimized for direct LLM ingestion (Claude Code, Cursor, Codex) while remaining human-readable.

> **⚠️ For LLM coding assistants (Claude Code, Cursor, Codex)**: See [`LLM_CONTEXT.md`](LLM_CONTEXT.md) - **this is the single source of truth** about this repository structure, consumption patterns, and how to work with tokens and guidelines.

## Purpose

This repository provides:
- **Filtered Material Design 3 tokens** (web-only, ≤150KB)
- **Terse implementation guidelines** for web components
- **Minimal code examples** demonstrating structure and states
- **Single-source customization** for token overrides

All content is structured for optimal consumption by LLM coding assistants while remaining readable by humans.

## Quick Start

### Customizing Tokens

Edit `tokens/custom.json` to override any Material Design 3 token:

```json
{
  "md.sys.color.primary": "#0066CC",
  "md.sys.color.on-primary": "#FFFFFF"
}
```

Then rebuild tokens:

```bash
npm run build
```

All customizations are preserved in a single file (`tokens/custom.json`) - this is the **only** place you need to edit token values.

### Integration Guidelines

**⚠️ Important**: Before integrating this design system into your project, read [`INTEGRATION.md`](INTEGRATION.md) for essential guidelines:

- **Modularity**: Components must be modular and reusable, avoid one-off styles
- **No !important**: Never use `!important` declarations in component styles
- **Token-based**: Always use design tokens via CSS custom properties
- **Composition**: Extend components through class composition, don't override
- **Customization**: Customize via `tokens/custom.json` only, never override component styles directly

See [`INTEGRATION.md`](INTEGRATION.md) for complete guidelines, examples, and anti-patterns.

### Sharing with Other Projects

**How to distribute this design system**: See [`DISTRIBUTION.md`](DISTRIBUTION.md) for multiple distribution methods:

- **Git Submodule** (Recommended) - Add as submodule to consuming projects
- **npm Package** - Publish as npm package for Node.js projects
- **Distribution Package** - Create ZIP/tarball for one-time distribution
- **Direct GitHub Reference** - Reference repository directly

See [`DISTRIBUTION.md`](DISTRIBUTION.md) for setup instructions, essential files, and best practices.

### Rebuilding Tokens

```bash
npm install  # First time only
npm run build
```

This regenerates `tokens/material3.web.json` and `tokens/material3.web.md` from the upstream Material Design tokens repository, applying your custom overrides.

### Verifying Token Integrity

```bash
npm run verify
```

This rebuilds tokens and checks for any uncommitted changes. Used by CI to ensure token files are up-to-date.

### Viewing Component Previews

Open `preview/index.html` in your browser to see visual references for all Material Design 3 components, variants, and design tokens. The preview pages provide:
- Visual examples of all 14 components
- Component variants and states
- Color palette swatches with token references
- Typography scale and font family examples
- Material Symbols icon reference
- Interactive visual reference (no build step required)

## Repository Structure

```
m3-guidelines/
├── tokens/              # Material Design 3 web tokens
│   ├── custom.json      # Single source for token overrides (edit this!)
│   ├── custom.example.json  # Template with examples
│   ├── build.ts         # Token filtering and generation script
│   ├── material3.web.json  # Generated: LLM-optimized token data
│   └── material3.web.md     # Generated: Human-readable token tables
├── guidelines/          # Implementation guidelines
│   ├── components/      # Component-specific guidance (14 components)
│   ├── layout.md        # Grid, breakpoints, responsive patterns
│   ├── density.md       # Information density, touch targets
│   └── accessibility.md # Contrast, ARIA, keyboard navigation
├── examples/            # Minimal HTML/JS examples (≤30 lines each)
├── preview/             # Visual preview pages for components and design tokens
│   ├── index.html       # Component gallery
│   ├── colors.html      # Color palette reference
│   ├── icons.html       # Material Symbols icon reference
│   ├── typography.html  # Typography scale and font families
│   ├── components/      # Individual component previews
│   ├── styles.css       # Shared preview styles
│   └── colors-config.js # Editable color and typography configuration
└── vendor/              # Git submodule: material-foundation/material-tokens
```

## LLM Consumption Guide

### For LLM Coding Assistants

**Primary Source: Token Values**
- Use `tokens/material3.web.json` for token values
- Structure: `{_meta: {...}, tokens: [{id, category, value, description?, custom?, theme?}]}`
- Token IDs preserved exactly as upstream (e.g., `md.sys.color.primary`)

**Secondary Source: Implementation Patterns**
- Use `guidelines/` directory for component structure and patterns
- Format: Markdown with YAML frontmatter (`component`, `category`, `tokensUsed`)
- Token references use code fences: `` `md.sys.color.primary` ``

**Examples: Structure Reference**
- Use `examples/` directory for canonical HTML structure
- Format: HTML with YAML frontmatter (`component`, `tokensUsed`, `purpose`, `states`)
- Self-contained, no bundler required

**Visual Previews: Component Gallery**
- Use `preview/` directory for visual component references
- `preview/index.html` - Component gallery with links to all components
- `preview/colors.html` - Color palette swatches with token IDs
- `preview/icons.html` - Material Symbols icon reference and examples
- `preview/typography.html` - Typography scale, font families, and token values
- `preview/components/*.html` - Individual component previews showing variants and states
- `preview/colors-config.js` - Editable configuration for colors and typography

**Customization: User Overrides**
- Check `tokens/custom.json` for user-defined token overrides
- Custom tokens marked with `custom: true` in generated JSON

### File Format Details

- **JSON**: Structured, parseable, includes metadata
- **Markdown**: Human-readable with YAML frontmatter for metadata
- **HTML**: Self-contained examples with inline styles
- **All files**: Human-readable but structured for LLM parsing

## Token ID Format

Material Design 3 tokens follow this naming convention:

```
md.{ref|sys}.{category}.{token-name}[.{variant}]
```

Examples:
- `md.sys.color.primary` - System color token
- `md.sys.typescale.body-large.font` - Typography token
- `md.sys.shape.corner.medium` - Shape token
- `md.ref.palette.primary40` - Reference palette token

## Data Provenance

- **Upstream Tokens**: [material-foundation/material-tokens](https://github.com/material-foundation/material-tokens)
- **Material Design 3 Docs**: [m3.material.io](https://m3.material.io)
- **Design Tokens Guide**: [m3.material.io/foundations/design-tokens](https://m3.material.io/foundations/design-tokens)
- **Components Reference**: [m3.material.io/components](https://m3.material.io/components)
- **Material Web Components**: [material-components/material-web](https://github.com/material-components/material-web)

## Development

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Setup

```bash
# Clone repository
git clone https://github.com/mwyuwono/m3-guidelines.git
cd m3-guidelines

# Initialize submodule (if not already done)
git submodule update --init --recursive

# Install dependencies
npm install

# Build tokens
npm run build
```

### Scripts

- `npm run build` - Filter and generate web tokens from upstream source
- `npm run verify` - Rebuild tokens and verify no uncommitted changes
- `npm run customize` - Helper message for customizing tokens

## CI/CD

GitHub Actions workflow (`.github/workflows/verify.yml`) automatically:
- Runs `npm run verify` on every push/PR
- Fails if token files have uncommitted changes
- Ensures token files are always up-to-date

## License

MIT License - See LICENSE file for details.

## Integration Guidelines

When integrating this design system into consuming projects, follow the guidelines in [`INTEGRATION.md`](INTEGRATION.md):

**Key Principles:**
- **Modularity**: Components must be modular and reusable, avoid one-off styles
- **No !important**: Never use `!important` declarations in component styles
- **Token-based**: Always use design tokens via CSS custom properties
- **Composition**: Extend components through class composition, don't override
- **Customization**: Customize via `tokens/custom.json` only, never override component styles directly

See [`INTEGRATION.md`](INTEGRATION.md) for complete guidelines, examples, anti-patterns, and integration checklist.

## Contributing

This repository is optimized for LLM consumption. When contributing:
- Keep guidelines terse (bullets, <12 per component)
- Maintain consistent format (YAML frontmatter, token references)
- Ensure examples are ≤30 lines, dependency-free
- Preserve upstream token IDs exactly
- Follow integration guidelines: modularity, no !important, token-based customization


