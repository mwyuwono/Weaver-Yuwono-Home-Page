# Component Architecture Guide

This document describes the **Component Composition Pattern** used in this project and provides guidelines for creating and maintaining components.

## Table of Contents

- [Overview](#overview)
- [Pattern Explanation](#pattern-explanation)
- [Creating New Components](#creating-new-components)
- [CSS Specificity and Override Rules](#css-specificity-and-override-rules)
- [Examples](#examples)
- [Best Practices](#best-practices)
- [Common Pitfalls](#common-pitfalls)

---

## Overview

This project uses the **Component Composition Pattern**, the same architectural approach used by:
- Bootstrap
- Material Design / Material-UI
- Foundation
- Ant Design
- Chakra UI

### Why This Pattern?

✅ **Single source of truth** - Base changes affect all variants automatically
✅ **Minimal duplication** - Variants only define differences (~95% code reduction)
✅ **Easy maintenance** - Clear separation of shared vs. variant-specific styles
✅ **Scalable** - Add new variants without modifying the base
✅ **Industry standard** - Familiar to developers from major frameworks

---

## Pattern Explanation

### Base + Variant Composition

Components are organized hierarchically:

```
components/
├── component-base/           # Shared foundation
│   └── component-base.css
├── component-variant-1/      # Specific implementation
│   ├── component-variant-1.css
│   └── component-variant-1.js
└── component-variant-2/      # Another implementation
    ├── component-variant-2.css
    └── component-variant-2.js
```

### Key Concepts

1. **Base Component** = Foundation
   - Defines shared structure, layout, and styling
   - Uses generic BEM naming (`.component`, `.component__element`)
   - Contains all responsive breakpoints for shared elements
   - Never includes variant-specific logic

2. **Variant Component** = Specialization
   - Extends base with specific modifications
   - Uses descriptive naming (`.component-variant`)
   - Only defines differences from base
   - Can add variant-specific elements

3. **Dual Class Names** = Composition
   - Elements use both classes: `class="base variant"`
   - Inherits base styles + applies variant overrides
   - Enables CSS cascade and specificity to work naturally

---

## Creating New Components

### Decision Tree: When to Use Base + Variant?

**✅ Use Base + Variant when:**
- Multiple variants share 80%+ of structure/styling
- Variants differ in behavior, not fundamental structure
- You want a single source of truth for shared styles
- You plan to add more variants in the future

**❌ Use Standalone Component when:**
- Component is truly unique (no variants needed)
- Variants share <50% of code
- Fundamental structure differs between variants

### Step-by-Step: Creating Base + Variant

#### Step 1: Create Base Component

```bash
mkdir components/button-base
touch components/button-base/button-base.css
```

**button-base.css:**
```css
/**
 * Button Base Component
 * Shared foundation for all button variants
 */

/* Base button wrapper */
.button {
  display: inline-flex;
  padding: 12px 24px;
  border-radius: 8px;
  font-family: inherit;
  font-size: 1rem;
  line-height: 1.5;
  font-weight: 500;
  text-align: center;
  cursor: pointer;
  border: none;
  transition: all 0.2s ease;
}

/* Base button text */
.button__text {
  flex-grow: 1;
}

/* Base button icon (optional) */
.button__icon {
  width: 20px;
  height: 20px;
}

/* Responsive breakpoints for shared elements */
@media screen and (max-width: 767px) {
  .button {
    padding: 10px 20px;
    font-size: 0.875rem;
  }
}
```

#### Step 2: Create Variant Components

```bash
mkdir components/button-primary
touch components/button-primary/button-primary.css
touch components/button-primary/button-primary.js
```

**button-primary.css:**
```css
/**
 * Button Primary Variant
 * Extends button-base.css with primary button styling
 * Requires: button-base.css to be loaded first
 */

/* Primary button - extends base */
.button-primary {
  background-color: #007bff;
  color: white;
}

.button-primary:hover {
  background-color: #0056b3;
}

.button-primary:active {
  background-color: #004085;
}

/* Primary button disabled state */
.button-primary:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
  opacity: 0.6;
}
```

**button-primary.js:**
```javascript
/**
 * Button Primary Component
 * Renders primary action buttons
 */

function createPrimaryButton(config) {
  const button = document.createElement('button');
  button.className = 'button button-primary';  // Dual classes!
  button.type = config.type || 'button';

  const text = document.createElement('span');
  text.className = 'button__text';
  text.textContent = config.text;

  button.appendChild(text);

  if (config.onClick) {
    button.addEventListener('click', config.onClick);
  }

  return button;
}
```

#### Step 3: Load CSS in Correct Order

**In HTML:**
```html
<head>
  <!-- Base MUST load before variants -->
  <link rel="stylesheet" href="components/button-base/button-base.css">
  <link rel="stylesheet" href="components/button-primary/button-primary.css">
  <link rel="stylesheet" href="components/button-secondary/button-secondary.css">
</head>
```

#### Step 4: Use Component

```javascript
// Create button using component
const saveButton = createPrimaryButton({
  text: 'Save Changes',
  onClick: () => console.log('Saved!')
});

document.body.appendChild(saveButton);
```

**Rendered HTML:**
```html
<button class="button button-primary" type="button">
  <span class="button__text">Save Changes</span>
</button>
```

---

## CSS Specificity and Override Rules

### How CSS Cascade Works

CSS applies styles based on two rules:
1. **Specificity** (higher specificity wins)
2. **Load order** (when specificity is equal, last-loaded wins)

### Specificity Values

| Selector | Specificity | Example |
|----------|-------------|---------|
| Element | 1 | `div` |
| Class | 10 | `.button` |
| Two classes | 20 | `.button-primary .button__text` |
| ID | 100 | `#button` (avoid!) |

### Override Patterns

#### Pattern 1: Equal Specificity (Load Order Wins)
```css
/* button-base.css (loads first) */
.button {
  background-color: #f0f0f0;  /* Default */
}

/* button-primary.css (loads second) */
.button-primary {
  background-color: #007bff;  /* ✅ Overrides default */
}
```
Both have specificity 10, but variant loads later, so it wins.

#### Pattern 2: Higher Specificity (Always Wins)
```css
/* button-base.css */
.button__text {
  font-size: 1rem;  /* Base size */
}

/* button-primary.css */
.button-primary .button__text {
  font-size: 1.125rem;  /* ✅ Overrides (specificity 20 > 10) */
}
```
Higher specificity always wins, regardless of load order.

#### Pattern 3: Additive Properties
```css
/* button-base.css */
.button {
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 1rem;
}

/* button-large.css */
.button-large {
  padding: 16px 32px;  /* ✅ Overrides padding only */
  font-size: 1.25rem;  /* ✅ Overrides font-size only */
  /* border-radius inherited from base ✅ */
}
```
Variants only override specific properties, others inherited.

### Critical Rules

✅ **DO** use class selectors (`.button`)
✅ **DO** load base before variants
✅ **DO** use higher specificity for overrides (`.variant .base__element`)
❌ **DON'T** use `!important` (prevents variant overrides)
❌ **DON'T** use IDs for styling (`#button`)
❌ **DON'T** inline styles (can't be overridden)

---

## Examples

### Example 1: Card Components (Current Implementation)

```
components/
├── card-base/
│   └── card-base.css       # Shared structure & styles
├── project-card/
│   ├── project-card.css    # Project-specific overrides
│   └── project-card.js
└── profile-card/
    ├── profile-card.css    # Profile-specific overrides
    └── profile-card.js
```

**Shared base elements:**
- `.card` - Card wrapper
- `.card__image-wrapper` - Image container
- `.card__image` - Image element
- `.card__content-wrap` - Content container
- `.card__title` - Title typography
- `.card__link` - Link/helper typography

**Project card specifics:**
- `.project-card:hover` - Hover state
- `.project-card__helper` - Helper text layout
- Subtitle has italic + opacity

**Profile card specifics:**
- `.profile-card__links` - Links container
- `.profile-card__link` - Individual links
- Different tiny breakpoint behavior

---

## Best Practices

### 1. Base Component Guidelines

✅ **DO:**
- Use generic, reusable naming (`.component`, not `.component-blue`)
- Include all shared structure and layout
- Define responsive breakpoints for shared elements
- Document which properties variants can override

❌ **DON'T:**
- Include variant-specific logic
- Use overly specific selectors
- Add `!important` declarations
- Include non-shared elements

### 2. Variant Component Guidelines

✅ **DO:**
- Only define differences from base
- Use descriptive variant names (`.button-primary`, `.card-project`)
- Document what makes this variant unique
- Use higher specificity for overrides (`.variant .base__element`)

❌ **DON'T:**
- Duplicate base styles
- Create variants for tiny differences (use modifiers instead)
- Override with `!important`
- Forget to load base CSS first

### 3. JavaScript Guidelines

✅ **DO:**
- Use dual class names: `className = 'base variant'`
- Use base class names for shared elements: `className = 'base__element'`
- Can add variant-specific classes to elements

❌ **DON'T:**
- Only use variant class (base styles won't apply)
- Inline styles (can't be overridden by variants)
- Hard-code styles in JavaScript

### 4. HTML Load Order

✅ **DO:**
```html
<!-- Correct order -->
<link rel="stylesheet" href="components/component-base/component-base.css">
<link rel="stylesheet" href="components/component-variant/component-variant.css">
```

❌ **DON'T:**
```html
<!-- Wrong order - variant loads before base -->
<link rel="stylesheet" href="components/component-variant/component-variant.css">
<link rel="stylesheet" href="components/component-base/component-base.css">
```

---

## Common Pitfalls

### Pitfall 1: Forgetting Dual Classes
```javascript
// ❌ Wrong - only variant class
element.className = 'button-primary';

// ✅ Correct - base + variant
element.className = 'button button-primary';
```

### Pitfall 2: Using !important
```css
/* ❌ Wrong - prevents variant overrides */
.button {
  padding: 12px !important;
}

/* ✅ Correct - allows variants to override */
.button {
  padding: 12px;
}
```

### Pitfall 3: Wrong Load Order
```html
<!-- ❌ Wrong - variant loads first -->
<link rel="stylesheet" href="components/button-primary/button-primary.css">
<link rel="stylesheet" href="components/button-base/button-base.css">

<!-- ✅ Correct - base loads first -->
<link rel="stylesheet" href="components/button-base/button-base.css">
<link rel="stylesheet" href="components/button-primary/button-primary.css">
```

### Pitfall 4: Duplicating Base Styles
```css
/* ❌ Wrong - duplicating base styles in variant */
.button-primary {
  display: inline-flex;  /* Already in base */
  padding: 12px 24px;    /* Already in base */
  background-color: blue; /* Only this is needed */
}

/* ✅ Correct - only differences */
.button-primary {
  background-color: blue;
}
```

### Pitfall 5: Too Many Variants
```
❌ Wrong:
components/
├── button-blue/
├── button-red/
├── button-green/
├── button-large-blue/
├── button-small-red/
└── ... 20+ variants

✅ Better:
components/
├── button-base/
├── button-primary/
├── button-secondary/
└── Use modifiers: class="button button-primary button--large"
```

---

## Quick Reference

### Creating a New Base Component

1. Create directory: `components/component-base/`
2. Create CSS: `component-base.css`
3. Define shared structure with generic names (`.component`, `.component__element`)
4. Include responsive breakpoints for shared elements

### Creating a New Variant

1. Create directory: `components/component-variant/`
2. Create CSS: `component-variant.css` (only differences)
3. Create JS: `component-variant.js` (variant logic)
4. Use dual classes in JS: `className = 'component component-variant'`

### Using Components

1. Load base CSS first, then variant CSS
2. Create elements with dual classes
3. Base elements inherit from base, variants can override

---

## Questions?

If you have questions about the component architecture:
1. Check existing card components for reference implementation
2. Review this document's examples
3. Consult CLAUDE.md for project-specific conventions

Remember: When in doubt, follow Bootstrap/Material Design patterns - they use the same approach!
