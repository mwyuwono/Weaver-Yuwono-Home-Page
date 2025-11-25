---
component: Switches
category: inputs
sourceUrl: https://m3.material.io/components/switches
tokensUsed: md.sys.color.primary, md.sys.color.on-surface-variant, md.sys.color.outline, md.sys.shape.corner.full
---

# Switches

## Quick Reference
- **Structure**: Track with thumb
- **Shape**: `md.sys.shape.corner.full` (fully rounded)
- **Size**: 36×20px track, 16×16px thumb
- **Tokens**: Primary color, outline, on-surface-variant

## Token Usage
- Active track: `md.sys.color.primary`
- Inactive track: `md.sys.color.outline`
- Thumb: `md.sys.color.on-surface-variant` (inactive), `md.sys.color.on-primary` (active)
- Shape: `md.sys.shape.corner.full`

## Structure
- Container: `<label>` wrapper
- Input: `<input type="checkbox">` (hidden or styled)
- Track: Background element
- Thumb: Sliding indicator

## Layout Patterns
- Track: 36×20px
- Thumb: 16×16px, centered vertically
- Spacing: 8px gap between switch and label
- Touch target: 48×48px minimum

## States
- Unchecked: Thumb on left, inactive track color
- Checked: Thumb on right, active track color
- Hover: State layer overlay
- Focus: 2px outline ring
- Disabled: Opacity 0.38, no interaction

## Spacing/Density
- Track size: 36×20px
- Thumb size: 16×16px
- Touch target: 48×48px (extends beyond track)
- Label spacing: 8px from switch

## Elevation
- No elevation (flat component)

## Focus/Hover/Pressed
- Focus: 2px outline ring, `md.sys.color.primary`
- Hover: State layer with `md.sys.state.hover.state-layer-opacity`
- Pressed: Thumb animates position, `md.sys.motion.duration.short2`

## Accessibility
- Input: Use `<input type="checkbox">` with proper attributes
- Label: Associated `<label>` with descriptive text
- State: `aria-checked` reflects current state
- Keyboard: Space toggles, focus visible
- Screen reader: Announce label and state ("On" or "Off")


