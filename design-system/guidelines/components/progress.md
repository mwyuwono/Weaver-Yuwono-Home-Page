---
component: Progress Indicators
category: feedback
sourceUrl: https://m3.material.io/components/progress-indicators
tokensUsed: md.sys.color.primary, md.sys.color.surface-container-highest, md.sys.motion.duration.long2
---

# Progress Indicators

## Quick Reference
- **Types**: Linear, Circular
- **Color**: `md.sys.color.primary` for active track
- **Animation**: `md.sys.motion.duration.long2` for indeterminate
- **Tokens**: Primary color, surface container for track

## Token Usage
- Active track: `md.sys.color.primary`
- Track background: `md.sys.color.surface-container-highest`
- Animation: `md.sys.motion.duration.long2` (indeterminate)

## Structure
- Container: `<div>` wrapper
- Track: Background element
- Active: Progress bar/circle element
- Label: Optional percentage or status text

## Layout Patterns
- Linear: Full-width, 4px height
- Circular: 48×48px default, scalable
- Position: Inline with content or full-width

## States
- Determinate: Shows progress percentage (0-100%)
- Indeterminate: Animated, no specific value
- Buffer: Shows buffered vs. loaded (linear only)

## Spacing/Density
- Linear height: 4px
- Circular size: 48×48px (default), 40×40px (small)
- Padding: 16px around indicator

## Elevation
- No elevation (surface-level component)

## Focus/Hover/Pressed
- No interactive states (informational only)

## Accessibility
- Role: `progressbar` with `aria-valuenow`, `aria-valuemin`, `aria-valuemax`
- Label: `aria-label` describing what is loading
- Live region: `aria-live="polite"` for status updates
- Determinate: Announce progress percentage
- Indeterminate: Use `aria-busy="true"` without value attributes


