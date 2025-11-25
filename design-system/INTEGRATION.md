# Integration Guidelines

**This document provides essential guidelines for integrating the Material Design 3 Guidelines design system into consuming projects.**

## Core Principles

### 1. Modularity Requirements

**Components must be modular, reusable, and avoid one-off styles.**

- Create reusable component classes that can be composed together
- Avoid creating single-use styles for specific instances
- Use composition patterns to build variations rather than duplicating code
- When you need a variation, extend the base component rather than creating a new one-off style

**Good Example:**
```css
/* Base button component */
.button {
  /* base styles */
}

/* Variant via composition */
.button--primary {
  /* variant styles */
}

/* Usage: <button class="button button--primary"> */
```

**Bad Example:**
```css
/* One-off style for a specific instance */
.special-page-header-button {
  /* Don't do this - defeats modularity */
}
```

### 2. No !important Declarations

**Never use `!important` declarations in component styles.**

**Why:**
- Maintains proper CSS cascade hierarchy
- Allows consuming projects to override styles when needed
- Prevents specificity wars and maintenance nightmares
- Enables proper theming and customization

**If you need to override a style:**
- Increase specificity naturally through class composition
- Use more specific selectors
- Restructure component hierarchy if needed
- Use CSS custom properties (design tokens) for values that should be customizable

**Good Example:**
```css
.button {
  background-color: var(--md-sys-color-primary);
}

.button--secondary {
  background-color: var(--md-sys-color-secondary);
}
```

**Bad Example:**
```css
.button {
  background-color: var(--md-sys-color-primary) !important; /* Never do this */
}
```

### 3. Token-Based Customization

**Always use design tokens via CSS custom properties.**

- Use tokens from `tokens/material3.web.json` for all design values
- Customize tokens via `tokens/custom.json`, not by overriding component styles
- Never hardcode color, spacing, typography, or other design values
- Reference tokens using the format: `var(--md-sys-color-primary)`

**Token Usage:**
```css
.component {
  background-color: var(--md-sys-color-surface-container);
  color: var(--md-sys-color-on-surface);
  padding: var(--md-sys-spacing-md);
  border-radius: var(--md-sys-shape-corner-medium);
  font-size: var(--md-sys-typescale-body-large-size);
  font-family: var(--md-sys-typescale-body-large-font-family);
}
```

**Customization:**
```json
// tokens/custom.json - Single source for customization
{
  "md.sys.color.primary": "#0066CC",
  "md.sys.typescale.body-large-size": "18px"
}
```

### 4. Component Structure

**Follow the guidelines structure and use examples as reference.**

- Reference `guidelines/components/[component].md` for structure patterns
- Use `examples/[component].html` as a reference for canonical HTML structure
- Maintain semantic HTML with proper ARIA attributes
- Follow accessibility patterns from `guidelines/accessibility.md`

**Structure Pattern:**
```html
<!-- Follow guidelines structure -->
<article class="card card-elevated">
  <div class="card-header">
    <h3 class="card-title">Title</h3>
  </div>
  <div class="card-content">
    Content
  </div>
  <div class="card-actions">
    <button>Action</button>
  </div>
</article>
```

### 5. Composition Over Modification

**Extend components rather than override them.**

- Build variations through class composition
- Use modifier classes (BEM-style) for variants
- Avoid overriding base component styles directly
- Create new components only when truly needed (not just for styling differences)

**Composition Pattern:**
```css
/* Base component */
.card {
  /* base styles */
}

/* Variants via modifiers */
.card--elevated {
  box-shadow: var(--md-sys-elevation-level1);
}

.card--filled {
  background-color: var(--md-sys-color-surface-container-highest);
}

.card--outlined {
  border: 1px solid var(--md-sys-color-outline-variant);
}

/* Usage: Combine classes */
<article class="card card--elevated">
```

### 6. Avoid One-Off Styles

**One-off styles defeat the purpose of a design system.**

- If you need a style variation, make it reusable
- Create a variant class that can be used in multiple places
- Document new variants in component guidelines
- If a style is truly unique, question whether it belongs in the design system

**Decision Tree:**
1. Can this be achieved with existing components/variants? → Use existing
2. Is this a pattern that will be reused? → Create a variant
3. Is this truly unique? → Consider if it belongs in the design system

## Integration Checklist

When integrating this design system into a project:

- [ ] Read `LLM_CONTEXT.md` for repository structure and consumption patterns
- [ ] Review `guidelines/components/` for component patterns
- [ ] Use tokens from `tokens/material3.web.json` via CSS custom properties
- [ ] Customize tokens via `tokens/custom.json` only
- [ ] Follow component structure from `examples/` directory
- [ ] Ensure all components are modular and reusable
- [ ] Verify no `!important` declarations exist
- [ ] Check that no one-off styles are created
- [ ] Use composition patterns for variations
- [ ] Maintain accessibility standards from `guidelines/accessibility.md`

## Common Anti-Patterns to Avoid

### Anti-Pattern 1: One-Off Styles
```css
/* ❌ Don't create styles for specific instances */
.homepage-hero-button {
  background-color: #ff0000;
  padding: 20px;
}
```

### Anti-Pattern 2: Using !important
```css
/* ❌ Never use !important */
.button {
  background-color: var(--md-sys-color-primary) !important;
}
```

### Anti-Pattern 3: Hardcoding Values
```css
/* ❌ Don't hardcode design values */
.card {
  background-color: #ffffff;
  padding: 16px;
  border-radius: 12px;
}
```

### Anti-Pattern 4: Overriding Component Styles
```css
/* ❌ Don't override component styles directly */
.card {
  background-color: #custom-color; /* Overrides design system */
}
```

### Anti-Pattern 5: Creating Duplicate Components
```css
/* ❌ Don't create duplicate components for styling differences */
.my-special-card {
  /* Same as .card but with different colors */
}
```

## Best Practices Summary

1. **Modularity**: Create reusable, composable components
2. **No !important**: Never use `!important` declarations
3. **Token-based**: Always use design tokens via CSS custom properties
4. **Composition**: Extend components through class composition
5. **Documentation**: Document new variants and patterns
6. **Accessibility**: Follow accessibility guidelines
7. **Consistency**: Maintain consistency with design system patterns

## Questions?

- Review `LLM_CONTEXT.md` for detailed consumption patterns
- Check `guidelines/components/` for component-specific guidance
- Reference `examples/` for canonical HTML structure
- See `preview/` for visual component references

---

**Remember**: A design system is only effective if it's used consistently. Avoid shortcuts that create one-off styles or break modularity. When in doubt, extend rather than override.

