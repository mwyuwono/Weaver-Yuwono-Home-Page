# LLM Context: Material Design 3 Guidelines Repository

**This is the single source of truth for LLM coding assistants (Claude Code, Cursor, Codex) working with this repository.**

## Project Purpose

This repository provides a **minimal, web-only Material Design 3 reference** optimized for direct LLM ingestion. It contains:
- Filtered Material Design 3 tokens (web-only, ≤150KB)
- Terse implementation guidelines for web components
- Minimal code examples demonstrating structure and states
- Single-source customization system for token overrides

**Key Principle**: All content is human-readable (JSON, Markdown, HTML) but structured for optimal LLM parsing and consumption.

## Repository Structure

```
m3-guidelines/
├── tokens/                    # Material Design 3 web tokens
│   ├── custom.json            # ⚠️ SINGLE SOURCE: Edit this to customize tokens
│   ├── custom.example.json    # Template with examples
│   ├── build.ts               # Token filtering and generation script
│   ├── material3.web.json     # Generated: LLM-optimized token data (READ THIS)
│   └── material3.web.md       # Generated: Human-readable token tables
│
├── guidelines/                 # Implementation guidelines
│   ├── components/            # Component-specific guidance (14 components)
│   │   ├── app-bars.md
│   │   ├── navigation.md
│   │   ├── buttons.md
│   │   ├── cards.md
│   │   ├── text-fields.md
│   │   ├── lists.md
│   │   ├── dialogs.md
│   │   ├── menus.md
│   │   ├── sheets.md
│   │   ├── chips.md
│   │   ├── progress.md
│   │   ├── sliders.md
│   │   ├── switches.md
│   │   └── tables.md
│   ├── layout.md              # Grid, breakpoints, responsive patterns
│   ├── density.md             # Information density, touch targets
│   └── accessibility.md       # Contrast, ARIA, keyboard navigation
│
├── examples/                   # Minimal HTML/JS examples (≤30 lines each)
│   ├── README.md              # Index of examples
│   ├── button.html            # Button example
│   ├── card.html              # Card example
│   ├── text-field.html        # Text field example
│   └── list.html              # List example
│
├── vendor/                     # Git submodule: material-foundation/material-tokens
│   └── material-tokens/       # Upstream token source (DO NOT EDIT)
│
├── .github/workflows/         # CI: Token verification
│   └── verify.yml
│
├── package.json               # Node dependencies and scripts
├── tsconfig.json              # TypeScript configuration
├── README.md                  # Human-facing documentation
└── LLM_CONTEXT.md            # ⚠️ THIS FILE: LLM single source of truth
```

## How to Consume This Repository (For LLMs)

### 1. Token Values (PRIMARY SOURCE)

**File**: `tokens/material3.web.json`

**Structure**:
```json
{
  "_meta": {
    "generated": "ISO timestamp",
    "customizations": ["array of customized token IDs"],
    "tokenCount": 80,
    "source": "material-foundation/material-tokens"
  },
  "tokens": [
    {
      "id": "md.sys.color.primary",
      "category": "color",
      "value": "#6750A4",
      "description": "Primary color",
      "custom": false,
      "theme": "light"
    }
  ]
}
```

**Usage**:
- Read `tokens/material3.web.json` for all token values
- Token IDs are preserved exactly as upstream (e.g., `md.sys.color.primary`)
- Check `_meta.customizations` to see which tokens are customized
- Custom tokens have `custom: true` flag
- Theme variants have `theme: "light"` or `theme: "dark"`

**Token ID Format**:
```
md.{ref|sys}.{category}.{token-name}[.{variant}]
```

Examples:
- `md.sys.color.primary` - System color token
- `md.sys.typescale.body-large.font` - Typography token
- `md.sys.shape.corner.medium` - Shape token
- `md.ref.palette.primary40` - Reference palette token

### 2. Custom Token Overrides (SINGLE SOURCE)

**File**: `tokens/custom.json`

**⚠️ CRITICAL**: This is the **ONLY** file users edit to customize tokens. All customizations must go here.

**Structure**:
```json
{
  "md.sys.color.primary": "#0066CC",
  "md.sys.color.on-primary": "#FFFFFF"
}
```

**When helping users customize tokens**:
1. Always edit `tokens/custom.json` (never edit generated files)
2. Use exact token IDs from `material3.web.json`
3. After editing, run `npm run build` to regenerate tokens
4. Custom tokens will be marked with `custom: true` in generated JSON

### 3. Implementation Guidelines (SECONDARY SOURCE)

**Directory**: `guidelines/`

**Format**: Markdown files with YAML frontmatter:
```yaml
---
component: Button
category: actions
sourceUrl: https://m3.material.io/components/buttons
tokensUsed: md.sys.color.primary, md.sys.color.on-primary, md.sys.shape.corner.full
---
```

**Structure**:
- **Quick Reference**: Key tokens and values
- **Token Usage**: Mapping of component properties to token IDs
- **Structure**: HTML hierarchy
- **Layout Patterns**: Spacing, sizing
- **States**: Default, hover, focus, pressed, disabled
- **Accessibility**: ARIA, keyboard, focus management

**Token References**: Use code fences: `` `md.sys.color.primary` ``

**Usage**:
- Read guidelines for component structure and patterns
- Use token references to look up values in `material3.web.json`
- Follow accessibility patterns for WCAG compliance

### 4. Code Examples (STRUCTURE REFERENCE)

**Directory**: `examples/`

**Format**: Self-contained HTML with YAML frontmatter:
```yaml
---
component: Button
tokensUsed: md.sys.color.primary, md.sys.color.on-primary
purpose: Demonstrate filled button with states
states: default, hover, focus, pressed, disabled
---
```

**Characteristics**:
- ≤30 lines per example
- No bundler required (vanilla HTML/CSS)
- Demonstrates canonical structure
- Shows token usage via CSS custom properties

**Usage**:
- Reference for HTML structure
- Shows how tokens map to CSS custom properties
- Demonstrates state handling

## Integration Guidelines for Consuming Projects

**File**: `INTEGRATION.md`

**⚠️ CRITICAL**: When integrating this design system into consuming projects, follow these principles:

### Core Principles

1. **Modularity Requirements**
   - Components must be modular, reusable, avoid one-off styles
   - Use composition patterns to build variations
   - Extend components rather than creating duplicates

2. **No !important Declarations**
   - Never use `!important` in component styles
   - Maintains proper CSS cascade hierarchy
   - Allows proper theming and customization
   - Use specificity and composition instead

3. **Token-Based Customization**
   - Always use design tokens via CSS custom properties
   - Customize via `tokens/custom.json` only
   - Never hardcode design values (colors, spacing, typography)
   - Never override component styles directly

4. **Composition Over Modification**
   - Extend components through class composition
   - Use modifier classes (BEM-style) for variants
   - Avoid overriding base component styles
   - Create new components only when truly needed

5. **Avoid One-Off Styles**
   - One-off styles defeat the purpose of a design system
   - Make variations reusable through variants
   - Document new variants in component guidelines

**See `INTEGRATION.md` for complete guidelines, examples, and anti-patterns.**

## Common Tasks for LLMs

### Task: Get Token Value

1. Read `tokens/material3.web.json`
2. Search for token ID (e.g., `md.sys.color.primary`)
3. Return `value` field
4. If `custom: true`, note it's a user override

### Task: Customize Token

1. Read current `tokens/custom.json`
2. Add/update entry: `"token-id": "new-value"`
3. Inform user to run `npm run build`
4. Never edit generated files directly

### Task: Implement Component

1. Read relevant `guidelines/components/[component].md`
2. Check `tokensUsed` in frontmatter
3. Look up token values in `tokens/material3.web.json`
4. Reference `examples/[component].html` for structure
5. Use token IDs as CSS custom properties: `var(--md-sys-color-primary)`
6. **Ensure component is modular and reusable**
7. **Never use !important declarations**
8. **Use composition patterns for variations**

### Task: Understand Token System

1. Token IDs are canonical (preserved from upstream)
2. Custom overrides in `tokens/custom.json` only
3. Build script merges upstream + custom → generates `material3.web.json`
4. Generated files are committed (for CI verification)

### Task: Integrate Design System

1. Read `INTEGRATION.md` for integration guidelines
2. Ensure all components follow modularity principles
3. Verify no `!important` declarations exist
4. Use tokens via CSS custom properties only
5. Customize via `tokens/custom.json`, not component overrides
6. Use composition patterns for component variations
7. Avoid creating one-off styles

## File Format Conventions

### JSON Files
- Structured, parseable
- Includes metadata (`_meta` object)
- Sorted arrays for predictable ordering
- Human-readable (formatted with indentation)

### Markdown Files
- YAML frontmatter for metadata
- Token references in code fences
- Bullet lists (no paragraphs >2 lines)
- Clear section headers

### HTML Files
- Self-contained (inline styles)
- YAML frontmatter as HTML comments
- Token usage via CSS custom properties
- ≤30 lines per example

## Important Constraints

1. **Web-only**: No Android/iOS guidance or code
2. **Preserve token IDs**: Never modify token IDs (use exact upstream format)
3. **Single customization source**: Only `tokens/custom.json` for overrides
4. **Terse guidelines**: Bullets only, <12 per component
5. **Human-readable**: All files readable by humans, structured for LLMs
6. **Modularity**: Components must be modular and reusable, avoid one-off styles
7. **No !important**: Never use `!important` declarations in component styles
8. **Token-based**: Always use design tokens via CSS custom properties

## Build System

**Scripts** (from `package.json`):
- `npm run build` - Filter and generate web tokens
- `npm run verify` - Rebuild and check for uncommitted changes
- `npm run customize` - Helper message

**Process**:
1. Read upstream tokens from `vendor/material-tokens/dsp/data/tokens.json`
2. Filter to web-only (exclude Android/iOS/Flutter/Compose)
3. Apply overrides from `tokens/custom.json`
4. Generate `tokens/material3.web.json` and `tokens/material3.web.md`
5. CI verifies no uncommitted changes

## Data Provenance

- **Upstream**: [material-foundation/material-tokens](https://github.com/material-foundation/material-tokens)
- **Docs**: [m3.material.io](https://m3.material.io)
- **Components**: [m3.material.io/components](https://m3.material.io/components)

## Quick Reference for LLMs

**To get a token value**:
```javascript
// Read tokens/material3.web.json
const tokens = require('./tokens/material3.web.json');
const token = tokens.tokens.find(t => t.id === 'md.sys.color.primary');
console.log(token.value); // "#6750A4"
```

**To customize a token**:
```json
// Edit tokens/custom.json
{
  "md.sys.color.primary": "#0066CC"
}
// Then: npm run build
```

**To implement a component**:
1. Read `guidelines/components/[name].md`
2. Check `tokensUsed` in frontmatter
3. Look up values in `tokens/material3.web.json`
4. Reference `examples/[name].html` for structure
5. Use tokens as CSS variables: `var(--md-sys-color-primary)`

---

**Last Updated**: 2024-11-24
**Repository**: https://github.com/mwyuwono/m3-guidelines

