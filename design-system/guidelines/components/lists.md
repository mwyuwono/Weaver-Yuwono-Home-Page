---
component: Lists
category: content
sourceUrl: https://m3.material.io/components/lists
tokensUsed: md.sys.color.surface, md.sys.color.on-surface, md.sys.color.on-surface-variant, md.sys.elevation.level0
---

# Lists

## Quick Reference
- **Structure**: Single-line, two-line, three-line items
- **Elevation**: `md.sys.elevation.level0` (no elevation)
- **Density**: 48px, 56px, 72px heights
- **Tokens**: Surface colors, on-surface text, on-surface-variant secondary text

## Token Usage
- Background: `md.sys.color.surface`
- Primary text: `md.sys.color.on-surface`
- Secondary text: `md.sys.color.on-surface-variant`
- Divider: `md.sys.color.outline-variant`

## Structure
- Container: `<ul>` or `<ol>` with `role="list"`
- Items: `<li>` elements or `<div role="listitem">`
- Leading: Avatar, icon, or image (40×40px)
- Content: Primary text, optional secondary/tertiary text
- Trailing: Icon, checkbox, or action

## Layout Patterns
- Single-line: 48px height, 16px padding
- Two-line: 64px height, 16px padding
- Three-line: 88px height, 16px padding
- Leading element: 40×40px, 16px from left edge
- Trailing element: Right-aligned, 16px from right edge

## States
- Default: Base styling with content
- Hover: State layer overlay
- Selected: Background using `md.sys.color.secondary-container`
- Focus: Visible focus indicator
- Activated: Ripple effect on click

## Spacing/Density
- Item height: 48px (single), 64px (two-line), 88px (three-line)
- Padding: 16px horizontal
- Gap between items: 0 (dividers separate)
- Leading element: 16px margin-right

## Elevation
- No elevation (surface-level component)
- Subheaders may have slight background difference

## Focus/Hover/Pressed
- Focus: 2px outline on list item
- Hover: State layer with `md.sys.state.hover.state-layer-opacity`
- Pressed: Ripple animation, `md.sys.motion.duration.short2`

## Accessibility
- Role: `list` for container, `listitem` for items
- Keyboard: Arrow keys navigate, Enter/Space activates
- Selection: `aria-selected="true"` for selected items
- Checkboxes: Use native `<input type="checkbox">` with labels
- Screen reader: Announce item content and position


