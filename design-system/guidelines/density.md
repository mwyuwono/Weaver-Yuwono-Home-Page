---
category: density
sourceUrl: https://m3.material.io/foundations/layout/applying-density
tokensUsed: md.sys.density.*
---

# Information Density

## Quick Reference
- **Minimum touch target**: 48×48px (CSS pixels)
- **Default density**: Comfortable (standard spacing)
- **Compact density**: Reduced spacing, same 48×48px targets
- **Tokens**: Density scale values

## Touch Targets

- **Minimum**: 48×48px for all interactive elements
- **Comfortable**: 56px height for list items, buttons
- **Compact**: 48px height (minimum maintained)
- **Spacing**: 8px minimum gap between targets

```css
/* Minimum touch target */
.button {
  min-height: 48px;
  min-width: 48px;
  padding: 12px 24px; /* Ensures 48px height */
}
```

## Density Levels

- **Comfortable** (default): Standard spacing, 56px list items
- **Compact**: Reduced spacing, 48px list items, tighter padding
- **Spacious**: Increased spacing, 64px list items (rare)

## Component Density

- **Lists**: 48px (compact), 56px (comfortable)
- **Buttons**: 40px height (comfortable), 36px (compact)
- **Text fields**: 56px height (both variants)
- **Chips**: 32px height (fixed)

## Spacing Adjustments

- **Comfortable**: 16px padding, 16px gaps
- **Compact**: 12px padding, 8px gaps
- **Maintain**: 48×48px touch targets regardless of density

## Density Calculation

- Base spacing: 8px unit
- Comfortable: 2× base (16px)
- Compact: 1.5× base (12px) or 1× base (8px)
- Formula: `spacing = baseUnit × densityMultiplier`

## Responsive Density

- **Desktop**: Comfortable density (default)
- **Tablet**: Comfortable or compact
- **Mobile**: Comfortable (touch targets critical)

## Visual Hierarchy

- **Primary actions**: Standard density
- **Secondary actions**: Can use compact density
- **Navigation**: Comfortable density (accessibility priority)
- **Data tables**: Compact density acceptable

## Accessibility Considerations

- **Never reduce**: Touch targets below 48×48px
- **Maintain**: Visual spacing for readability
- **Test**: With actual users at different densities
- **WCAG**: Meets 2.5.5 (Target Size) requirements


