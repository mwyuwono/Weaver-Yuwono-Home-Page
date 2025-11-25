---
component: Navigation
category: navigation
sourceUrl: https://m3.material.io/components/navigation
tokensUsed: md.sys.color.surface-container, md.sys.color.on-surface, md.sys.elevation.level1, md.sys.shape.corner.medium
---

# Navigation (Side/Rail/Tabs)

## Quick Reference
- **Variants**: Navigation drawer (side), navigation rail, navigation tabs
- **Elevation**: `md.sys.elevation.level1` (drawer), none (rail/tabs)
- **Shape**: `md.sys.shape.corner.medium` for rail items
- **Tokens**: Surface container colors, on-surface text, elevation

## Token Usage
- Background: `md.sys.color.surface-container` (drawer/rail), transparent (tabs)
- Text: `md.sys.color.on-surface`
- Active indicator: `md.sys.color.secondary-container`
- Elevation: `md.sys.elevation.level1` (drawer only)

## Structure
- **Drawer**: `<nav>` with `aria-label`, list of navigation items
- **Rail**: `<nav>` with icon buttons, labels below icons
- **Tabs**: `<nav>` with `role="tablist"`, `<button role="tab">` elements

## Layout Patterns
- **Drawer**: 256px width (desktop), full-width overlay (mobile)
- **Rail**: 80px width, fixed to left edge
- **Tabs**: Full-width container, equal-width tabs
- Active item highlighted with indicator

## States
- Default: Inactive items with base styling
- Active: Background/indicator using `md.sys.color.secondary-container`
- Hover: State layer overlay
- Focus: Visible focus ring
- Disabled: Reduced opacity (0.38)

## Spacing/Density
- Drawer items: 56px height, 16px padding
- Rail icons: 24×24px, 32px touch target
- Tabs: 48px height minimum
- Gap between items: 8px

## Elevation
- Drawer: `md.sys.elevation.level1` (1dp) when overlay
- Rail: No elevation (surface-level)
- Tabs: No elevation (surface-level)

## Focus/Hover/Pressed
- Focus: 2px outline on active element
- Hover: State layer with `md.sys.state.hover.state-layer-opacity`
- Pressed: Ripple animation, `md.sys.motion.duration.short2`

## Accessibility
- Role: `navigation` with `aria-label`
- Active item: `aria-current="page"`
- Keyboard: Arrow keys for navigation, Enter/Space to activate
- Focus management: Focus moves to drawer when opened
- Screen reader: Announce active item and total items


