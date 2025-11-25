---
component: Tables
category: content
sourceUrl: https://m3.material.io/components/data-tables
tokensUsed: md.sys.color.surface, md.sys.color.on-surface, md.sys.color.on-surface-variant, md.sys.elevation.level0
---

# Tables

## Quick Reference
- **Structure**: Header row, data rows, optional footer
- **Elevation**: `md.sys.elevation.level0` (no elevation)
- **Density**: 52px row height (default), 48px (compact)
- **Tokens**: Surface colors, on-surface text, on-surface-variant secondary text

## Token Usage
- Background: `md.sys.color.surface`
- Header text: `md.sys.color.on-surface`
- Body text: `md.sys.color.on-surface`
- Secondary text: `md.sys.color.on-surface-variant`
- Divider: `md.sys.color.outline-variant`

## Structure
- Container: `<table>` element
- Header: `<thead>` with `<th>` elements
- Body: `<tbody>` with `<tr>` and `<td>` elements
- Footer: Optional `<tfoot>` section

## Layout Patterns
- Row height: 52px (default), 48px (compact)
- Cell padding: 16px horizontal, 12px vertical
- Alignment: Left (text), right (numbers)
- Scrolling: Horizontal scroll if table exceeds container width

## States
- Default: Base styling with content
- Hover: Row background changes (optional)
- Selected: Background using `md.sys.color.secondary-container`
- Sortable: Header shows sort indicator
- Focus: Visible focus on interactive cells

## Spacing/Density
- Row height: 52px (default), 48px (compact)
- Cell padding: 16px horizontal, 12px vertical
- Header: 56px height, bold text
- Gap: 0 (dividers separate rows)

## Elevation
- No elevation (surface-level component)
- Optional: Elevated container around table

## Focus/Hover/Pressed
- Focus: 2px outline on interactive cells
- Hover: Row background overlay (if interactive)
- Pressed: No specific state (selection handles interaction)

## Accessibility
- Structure: Use semantic `<table>`, `<thead>`, `<tbody>`, `<th>`, `<td>`
- Headers: `scope="col"` or `scope="row"` on `<th>` elements
- Sortable: `aria-sort` on sortable headers
- Selection: `aria-selected="true"` on selected rows
- Keyboard: Arrow keys navigate, Enter/Space selects (if selectable)
- Screen reader: Announce headers with cell content


