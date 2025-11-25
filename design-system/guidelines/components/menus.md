---
component: Menus
category: surfaces
sourceUrl: https://m3.material.io/components/menus
tokensUsed: md.sys.color.surface-container, md.sys.color.on-surface, md.sys.elevation.level2, md.sys.shape.corner.medium
---

# Menus

## Quick Reference
- **Types**: Dropdown, Context
- **Elevation**: `md.sys.elevation.level2` (4dp)
- **Shape**: `md.sys.shape.corner.medium` (12px)
- **Tokens**: Surface container, on-surface text, elevation

## Token Usage
- Background: `md.sys.color.surface-container`
- Text: `md.sys.color.on-surface`
- Elevation: `md.sys.elevation.level2`
- Shape: `md.sys.shape.corner.medium`

## Structure
- Container: `<ul role="menu">` or `<div role="menu">`
- Items: `<li role="menuitem">` or `<button role="menuitem">`
- Icons: Optional leading icons (24×24px)
- Dividers: `<hr>` or `<li role="separator">`

## Layout Patterns
- Width: 112px minimum, content-based maximum
- Item height: 48px
- Padding: 8px vertical
- Icon: 24×24px, 16px from left edge

## States
- Default: Hidden, positioned relative to trigger
- Open: Visible with elevation
- Hover: State layer overlay on item
- Focus: Highlighted item with focus ring
- Disabled: Opacity 0.38, not selectable

## Spacing/Density
- Item height: 48px
- Padding: 8px vertical, 16px horizontal
- Icon spacing: 12px gap between icon and text
- Divider: 1px height, 8px margin

## Elevation
- Menu: `md.sys.elevation.level2` (4dp)
- Positioned above other content

## Focus/Hover/Pressed
- Focus: Arrow keys navigate, Enter selects
- Hover: State layer with `md.sys.state.hover.state-layer-opacity`
- Pressed: Ripple effect, `md.sys.motion.duration.short2`

## Accessibility
- Role: `menu` for container, `menuitem` for items
- Trigger: `aria-haspopup="menu"`, `aria-expanded`
- Keyboard: Arrow keys navigate, Enter/Space selects, Escape closes
- Focus: Trap focus within menu when open
- Screen reader: Announce menu and item labels


