---
component: Chips
category: inputs
sourceUrl: https://m3.material.io/components/chips
tokensUsed: md.sys.color.surface-container-highest, md.sys.color.on-surface-variant, md.sys.shape.corner.small
---

# Chips

## Quick Reference
- **Types**: Assist, Filter, Input, Suggestion
- **Shape**: `md.sys.shape.corner.small` (8px)
- **Elevation**: None (flat)
- **Tokens**: Surface container highest, on-surface-variant text

## Token Usage
- Background: `md.sys.color.surface-container-highest`
- Text: `md.sys.color.on-surface-variant`
- Selected: `md.sys.color.secondary-container` background
- Shape: `md.sys.shape.corner.small`

## Structure
- Container: `<button>` or `<div role="button">`
- Leading icon: Optional (18×18px)
- Label: Text content
- Trailing icon: Optional remove/clear icon

## Layout Patterns
- Height: 32px
- Padding: 8px horizontal, 4px vertical
- Icon: 18×18px, 8px gap from text
- Minimum width: Content-based, 64px minimum

## States
- Default: Base styling with background
- Selected: Background using `md.sys.color.secondary-container`
- Hover: State layer overlay
- Focus: 2px outline ring
- Disabled: Opacity 0.38

## Spacing/Density
- Height: 32px
- Padding: 8px horizontal, 4px vertical
- Icon size: 18×18px
- Gap: 8px between icon and text

## Elevation
- No elevation (flat component)

## Focus/Hover/Pressed
- Focus: 2px outline using `md.sys.color.primary`
- Hover: State layer with `md.sys.state.hover.state-layer-opacity`
- Pressed: Ripple effect, `md.sys.motion.duration.short2`

## Accessibility
- Role: `button` or `option` (in chip set)
- Label: Text content or `aria-label`
- Selected: `aria-pressed="true"` for filter chips
- Remove: `aria-label="Remove [chip label]"` for trailing icon
- Keyboard: Enter/Space activates, Delete removes (input chips)


