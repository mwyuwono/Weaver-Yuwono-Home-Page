---
category: layout
sourceUrl: https://m3.material.io/foundations/layout
tokensUsed: md.sys.breakpoint.*, md.sys.spacing.*
---

# Layout & Responsive Design

## Quick Reference
- **Breakpoints**: Desktop-first approach (1024px+)
- **Grid**: 12-column system, 16px gutters
- **Spacing**: 8px base unit, multiples of 8px
- **Tokens**: Breakpoint values, spacing scale

## Breakpoints (Desktop-First)

- **Desktop**: 1024px and above (default)
- **Tablet**: 768px - 1023px
- **Mobile**: Below 768px (secondary consideration)

```css
/* Desktop-first media queries */
@media (max-width: 1023px) { /* Tablet */ }
@media (max-width: 767px) { /* Mobile */ }
```

## Grid System

- **Columns**: 12-column grid
- **Gutters**: 16px between columns
- **Margins**: 16px (mobile), 24px (tablet), 32px (desktop)
- **Max width**: 1440px for content containers

```css
.container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 16px; /* Mobile */
}

@media (min-width: 768px) {
  .container { padding: 0 24px; }
}

@media (min-width: 1024px) {
  .container { padding: 0 32px; }
}
```

## Spacing Scale

- Base unit: 8px
- Scale: 4px, 8px, 16px, 24px, 32px, 48px, 64px
- Use spacing tokens: `md.sys.spacing.*` where available

## Responsive Patterns

- **Navigation**: Drawer (mobile), rail (tablet), persistent (desktop)
- **Content**: Single column (mobile), 2-column (tablet), multi-column (desktop)
- **Images**: Full-width (mobile), constrained (desktop)
- **Tables**: Horizontal scroll (mobile), full table (desktop)

## Container Patterns

- **Full-width**: No max-width, edge-to-edge
- **Constrained**: Max-width 1440px, centered
- **Sidebar**: 256px sidebar + flexible main content
- **Cards**: Responsive grid, 1-4 columns based on breakpoint

## Alignment

- **Text**: Left-aligned (default), center/right for specific cases
- **Content**: Left-aligned, centered containers
- **Actions**: Right-aligned buttons, left-aligned in RTL

## Z-Index Layers

- **Base**: 0 (content)
- **Elevated**: 1-8 (components with elevation)
- **Overlay**: 1000+ (dialogs, sheets, menus)
- **Tooltip**: 2000+ (tooltips, popovers)


