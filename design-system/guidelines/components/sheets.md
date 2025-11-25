---
component: Sheets
category: surfaces
sourceUrl: https://m3.material.io/components/sheets-bottom
tokensUsed: md.sys.color.surface-container, md.sys.color.on-surface, md.sys.elevation.level1, md.sys.shape.corner.extra-large
---

# Sheets (Bottom)

## Quick Reference
- **Types**: Modal, Standard
- **Elevation**: `md.sys.elevation.level1` (1dp)
- **Shape**: `md.sys.shape.corner.extra-large` (top corners, 28px)
- **Tokens**: Surface container, on-surface text, elevation

## Token Usage
- Background: `md.sys.color.surface-container`
- Text: `md.sys.color.on-surface`
- Elevation: `md.sys.elevation.level1`
- Shape: `md.sys.shape.corner.extra-large` (top corners only)

## Structure
- Container: `<div role="dialog">` or `<aside>`
- Header: Optional drag handle, title, close button
- Content: Scrollable content area
- Actions: Optional button group at bottom

## Layout Patterns
- Height: 50vh default, up to 90vh maximum
- Width: Full-width (mobile), 640px max (desktop)
- Padding: 16px horizontal, 24px vertical
- Drag handle: 32×4px, centered at top

## States
- Default: Hidden, slides up from bottom
- Open: Visible with backdrop
- Dragging: Follows touch/mouse movement
- Dismissed: Slides down, `md.sys.motion.duration.medium2`

## Spacing/Density
- Padding: 16px horizontal, 24px vertical
- Drag handle: 24px margin top, 12px margin bottom
- Content gap: 16px between sections
- Actions: 16px padding, 8px gap between buttons

## Elevation
- Sheet: `md.sys.elevation.level1` (1dp)
- Backdrop: Scrim overlay

## Focus/Hover/Pressed
- Focus: Trapped within sheet when open
- Hover: Standard button hover states
- Pressed: Drag handle shows pressed state

## Accessibility
- Role: `dialog` with `aria-modal="true"`
- Label: `aria-labelledby` for title
- Description: `aria-describedby` for content
- Focus: Trap focus within sheet, return on close
- Keyboard: Escape closes, Tab navigates content
- Drag handle: `aria-label="Drag to dismiss"`


