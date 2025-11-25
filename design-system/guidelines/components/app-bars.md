---
component: App Bar (Top)
category: navigation
sourceUrl: https://m3.material.io/components/top-app-bar
tokensUsed: md.sys.color.surface, md.sys.color.on-surface, md.sys.elevation.level2, md.sys.shape.corner.none
---

# App Bar (Top)

## Quick Reference
- **Structure**: Header container with title, navigation icon, action icons
- **Elevation**: `md.sys.elevation.level2` (4dp)
- **Height**: 64px (desktop), 56px (mobile)
- **Tokens**: Surface colors, elevation, shape

## Token Usage
- Background: `md.sys.color.surface`
- Text/Icon: `md.sys.color.on-surface`
- Elevation: `md.sys.elevation.level2`
- Shape: `md.sys.shape.corner.none`

## Structure
- Container: `<header>` or `<nav>` with role="banner"
- Title: `<h1>` or heading element
- Navigation icon: Button with aria-label
- Action icons: Button group with aria-labels

## Layout Patterns
- Fixed at top of viewport
- Full-width container
- Horizontal layout: icon | title | actions (spacing: 16px)
- Title truncates with ellipsis if too long

## States
- Default: Elevated surface with content
- Scrolled: May reduce elevation or hide (depends on variant)
- Focus: Visible focus indicators on interactive elements
- Hover: Action buttons show hover state

## Spacing/Density
- Padding: 16px horizontal, 8px vertical
- Icon size: 24×24px (touch target: 48×48px)
- Gap between elements: 16px

## Elevation
- Default: `md.sys.elevation.level2` (4dp shadow)
- Scrolled: May reduce to `md.sys.elevation.level1` (1dp)

## Focus/Hover/Pressed
- Focus: 2px outline using `md.sys.color.primary`
- Hover: Background overlay using `md.sys.state.hover.state-layer-opacity`
- Pressed: Ripple effect with `md.sys.motion.duration.short2`

## Accessibility
- Role: `banner` or `navigation`
- Navigation icon: `aria-label="Open navigation menu"`
- Action buttons: Descriptive `aria-label` for each
- Keyboard: Tab order through all interactive elements
- Focus management: Focus trap in mobile drawer when opened


