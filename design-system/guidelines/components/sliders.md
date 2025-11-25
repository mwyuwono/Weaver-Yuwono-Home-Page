---
component: Sliders
category: inputs
sourceUrl: https://m3.material.io/components/sliders
tokensUsed: md.sys.color.primary, md.sys.color.on-surface, md.sys.color.outline, md.sys.shape.corner.full
---

# Sliders

## Quick Reference
- **Types**: Continuous, Discrete, Range
- **Shape**: `md.sys.shape.corner.full` (fully rounded track)
- **Thumb**: 20×20px circle
- **Tokens**: Primary color, outline, on-surface labels

## Token Usage
- Active track: `md.sys.color.primary`
- Inactive track: `md.sys.color.surface-container-highest`
- Thumb: `md.sys.color.primary` fill
- Labels: `md.sys.color.on-surface`
- Shape: `md.sys.shape.corner.full`

## Structure
- Container: `<div>` wrapper
- Track: Background rail element
- Active track: Filled portion
- Thumb: Draggable handle (`<input type="range">` or custom)
- Labels: Optional value labels, tick marks

## Layout Patterns
- Height: 48px (touch target)
- Track: 4px height, full width
- Thumb: 20×20px, centered on track
- Labels: Above (value), below (ticks)

## States
- Default: Base styling
- Hover: Thumb enlarges to 24×24px
- Focus: 2px outline ring on thumb
- Active: Thumb at 24×24px, dragging
- Disabled: Opacity 0.38, no interaction

## Spacing/Density
- Touch target: 48×48px minimum
- Track height: 4px
- Thumb size: 20×20px (default), 24×24px (hover/focus)
- Label spacing: 4px from track

## Elevation
- No elevation (surface-level component)

## Focus/Hover/Pressed
- Focus: 2px outline on thumb, `md.sys.color.primary`
- Hover: Thumb enlarges, state layer on track
- Pressed: Thumb remains enlarged, follows pointer

## Accessibility
- Input: Use `<input type="range">` with proper attributes
- Labels: `<label>` associated via `for` attribute
- Value: `aria-valuenow`, `aria-valuemin`, `aria-valuemax`
- Keyboard: Arrow keys adjust value, Home/End for min/max
- Screen reader: Announce current value and range


