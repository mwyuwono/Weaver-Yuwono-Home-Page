---
category: accessibility
sourceUrl: https://m3.material.io/foundations/accessible-design
tokensUsed: md.sys.color.* (for contrast calculations)
---

# Accessibility

## Quick Reference
- **Contrast**: 4.5:1 (text), 3:1 (UI components)
- **Focus**: Visible 2px outline, `md.sys.color.primary`
- **Keyboard**: Full functionality without mouse
- **ARIA**: Semantic HTML first, ARIA when needed

## Color Contrast

- **Text**: 4.5:1 ratio minimum (WCAG AA)
- **Large text**: 3:1 ratio (18pt+ or 14pt+ bold)
- **UI components**: 3:1 ratio (buttons, form controls)
- **Non-text**: 3:1 ratio (icons, graphics)

```css
/* Ensure sufficient contrast */
.text-primary {
  color: var(--md-sys-color-on-surface); /* 4.5:1+ contrast */
}

.text-secondary {
  color: var(--md-sys-color-on-surface-variant); /* 3:1+ contrast */
}
```

## Semantic Structure

- **Headings**: Proper hierarchy (h1 → h2 → h3)
- **Landmarks**: `<header>`, `<nav>`, `<main>`, `<footer>`
- **Lists**: Use `<ul>`, `<ol>`, `<li>` (not divs)
- **Forms**: `<label>` associated with inputs

## Keyboard Navigation

- **Tab order**: Logical, visual order matches DOM order
- **Focus trap**: In modals/dialogs
- **Skip links**: "Skip to main content" link
- **Shortcuts**: Document custom keyboard shortcuts

```html
<!-- Skip link -->
<a href="#main-content" class="skip-link">Skip to main content</a>

<!-- Focus trap in dialog -->
<div role="dialog" aria-modal="true">
  <!-- Focus stays within dialog -->
</div>
```

## Focus Management

- **Visible focus**: 2px outline, `md.sys.color.primary`
- **Focus order**: Logical sequence through page
- **Focus trap**: Modal dialogs, sheets
- **Return focus**: To trigger when closing modals

```css
/* Focus styles */
*:focus-visible {
  outline: 2px solid var(--md-sys-color-primary);
  outline-offset: 2px;
}
```

## ARIA Patterns

- **Labels**: `aria-label` for icon-only buttons
- **States**: `aria-expanded`, `aria-selected`, `aria-checked`
- **Live regions**: `aria-live="polite"` for updates
- **Roles**: Use semantic HTML first, ARIA when needed

```html
<!-- Icon button -->
<button aria-label="Close dialog">
  <span class="icon-close"></span>
</button>

<!-- Expandable section -->
<button aria-expanded="false" aria-controls="content">
  Toggle
</button>
```

## Screen Reader Support

- **Alt text**: Descriptive for images
- **Labels**: All form inputs have labels
- **Status**: Announce dynamic content changes
- **Landmarks**: Use semantic HTML for navigation

## Motion & Animation

- **Respect**: `prefers-reduced-motion` media query
- **Duration**: `md.sys.motion.duration.*` tokens
- **Easing**: `md.sys.motion.easing.*` tokens
- **Disable**: Animations when reduced motion preferred

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Form Accessibility

- **Labels**: Always visible, associated with inputs
- **Errors**: `aria-invalid="true"`, `aria-describedby` for messages
- **Required**: Visual indicator + `aria-required="true"`
- **Grouping**: `<fieldset>` and `<legend>` for related inputs

## Testing Checklist

- **Keyboard**: Navigate entire interface with keyboard only
- **Screen reader**: Test with NVDA/JAWS/VoiceOver
- **Contrast**: Verify all text meets contrast ratios
- **Focus**: All interactive elements receive focus
- **Labels**: All inputs have associated labels


