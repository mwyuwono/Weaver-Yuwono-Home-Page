---
component: Buttons
category: actions
sourceUrl: https://m3.material.io/components/buttons
tokensUsed: md.sys.color.primary, md.sys.color.on-primary, md.sys.shape.corner.full, md.sys.elevation.level0
---

# Buttons

## Quick Reference
- **Variants**: Filled, Outlined, Text, Tonal, Icon
- **Shape**: `md.sys.shape.corner.full` (fully rounded) or `md.sys.shape.corner.small`
- **Elevation**: `md.sys.elevation.level0` (flat) or `md.sys.elevation.level1` (elevated)
- **Tokens**: Primary colors, on-primary text, shape, elevation

## Token Usage
- Filled: `md.sys.color.primary` background, `md.sys.color.on-primary` text
- Outlined: Transparent background, `md.sys.color.outline` border
- Text: Transparent background, `md.sys.color.primary` text
- Tonal: `md.sys.color.secondary-container` background
- Shape: `md.sys.shape.corner.full` or `md.sys.shape.corner.small`

## Structure
- Container: `<button>` element (not `<div>`)
- Label: Text content or `aria-label` for icon buttons
- Icon: Optional, before or after text

## Layout Patterns
- Height: 40px (default), 36px (small), 48px (large)
- Padding: 24px horizontal (default), 16px (small), 24px (large)
- Icon spacing: 8px gap between icon and text
- Minimum width: 64px for touch targets

## States
- Default: Base styling per variant
- Hover: State layer overlay, `md.sys.state.hover.state-layer-opacity`
- Focus: 2px outline using `md.sys.color.primary`
- Pressed: Ripple effect, state layer
- Disabled: Opacity 0.38, no interaction

## Spacing/Density
- Touch target: 48×48px minimum
- Padding: 12px vertical, 24px horizontal (default)
- Icon size: 18×18px (small), 24×24px (default)

## Elevation
- Filled: `md.sys.elevation.level0` (flat)
- Elevated: `md.sys.elevation.level1` (1dp) default, `md.sys.elevation.level2` (4dp) hover
- Outlined/Text: No elevation

## Focus/Hover/Pressed
- Focus: 2px outline, `md.sys.color.primary`
- Hover: State layer, elevation increase (elevated buttons)
- Pressed: Ripple animation, `md.sys.motion.duration.short2`

## Accessibility
- Semantic: Use `<button>` element
- Labels: Text content or `aria-label` for icon buttons
- Disabled: `disabled` attribute or `aria-disabled="true"`
- Keyboard: Enter/Space activates, focus visible
- Loading: `aria-busy="true"` with loading indicator


