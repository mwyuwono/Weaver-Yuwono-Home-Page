---
component: Dialogs
category: surfaces
sourceUrl: https://m3.material.io/components/dialogs
tokensUsed: md.sys.color.surface-container-high, md.sys.color.on-surface, md.sys.elevation.level3, md.sys.shape.corner.extra-large
---

# Dialogs

## Quick Reference
- **Types**: Alert, Simple, Confirmation
- **Elevation**: `md.sys.elevation.level3` (8dp)
- **Shape**: `md.sys.shape.corner.extra-large` (28px)
- **Tokens**: Surface container high, on-surface text, elevation

## Token Usage
- Background: `md.sys.color.surface-container-high`
- Text: `md.sys.color.on-surface`
- Elevation: `md.sys.elevation.level3`
- Shape: `md.sys.shape.corner.extra-large`

## Structure
- Container: `<dialog>` element or `<div role="dialog">`
- Header: Optional title section
- Content: Main message/content
- Actions: Button group (typically 2-3 buttons)

## Layout Patterns
- Width: 280px minimum, 560px maximum
- Padding: 24px (all sides)
- Actions: Right-aligned, 8px gap between buttons
- Scrolling: Content scrolls if exceeds viewport height

## States
- Default: Modal overlay with dialog content
- Open: Visible with backdrop
- Closing: Fade out animation, `md.sys.motion.duration.medium2`

## Spacing/Density
- Padding: 24px (all sides)
- Gap between sections: 16px
- Action buttons: 8px gap
- Max height: 80vh, scrolls if exceeded

## Elevation
- Dialog: `md.sys.elevation.level3` (8dp)
- Backdrop: Scrim overlay with opacity

## Focus/Hover/Pressed
- Focus: Trapped within dialog when open
- Hover: Standard button hover states
- Pressed: Button press animations

## Accessibility
- Role: `dialog` with `aria-modal="true"`
- Label: `aria-labelledby` pointing to title
- Description: `aria-describedby` for content
- Focus: Trap focus within dialog, return on close
- Escape: Close dialog on Escape key
- Backdrop: Click outside to close (if dismissible)


