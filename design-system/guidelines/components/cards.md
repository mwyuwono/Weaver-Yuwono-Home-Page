---
component: Cards
category: surfaces
sourceUrl: https://m3.material.io/components/cards
tokensUsed: md.sys.color.surface-container, md.sys.color.on-surface, md.sys.elevation.level1, md.sys.shape.corner.medium
---

# Cards

## Quick Reference
- **Structure**: Container with optional header, media, content, actions
- **Elevation**: `md.sys.elevation.level1` (1dp) default
- **Shape**: `md.sys.shape.corner.medium` (12px)
- **Tokens**: Surface container, on-surface text, elevation, shape

## Token Usage
- Background: `md.sys.color.surface-container`
- Text: `md.sys.color.on-surface`
- Elevation: `md.sys.elevation.level1` default, `md.sys.elevation.level2` hover
- Shape: `md.sys.shape.corner.medium`

## Structure
- Container: `<article>` or `<div>` with `role="article"`
- Header: Optional title/subtitle section
- Media: Optional image/video
- Content: Main text content
- Actions: Optional button group

## Layout Patterns
- Padding: 16px default
- Media: Full-width, aspect ratio maintained
- Actions: Right-aligned, 8px gap between buttons
- Max width: 400px (single column), responsive grid

## States
- Default: Elevated surface with content
- Hover: Elevation increases to `md.sys.elevation.level2`
- Focus: Visible focus indicator on interactive elements
- Selected: Border using `md.sys.color.primary`

## Spacing/Density
- Padding: 16px (all sides)
- Gap between sections: 16px
- Action buttons: 8px gap
- Media margin: 0 (full-width)

## Elevation
- Default: `md.sys.elevation.level1` (1dp)
- Hover: `md.sys.elevation.level2` (4dp)
- Dragged: `md.sys.elevation.level3` (8dp)

## Focus/Hover/Pressed
- Focus: 2px outline on card if clickable
- Hover: Elevation increase, cursor pointer
- Pressed: Slight scale down (0.98) if clickable

## Accessibility
- Role: `article` or `region` with `aria-label`
- Headings: Use proper heading hierarchy
- Interactive: `role="button"` with `tabindex="0"` if entire card clickable
- Keyboard: Enter/Space activates if clickable
- Images: Alt text for media content


