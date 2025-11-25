---
component: Text Fields
category: inputs
sourceUrl: https://m3.material.io/components/text-fields
tokensUsed: md.sys.color.primary, md.sys.color.on-surface, md.sys.color.outline, md.sys.shape.corner.small
---

# Text Fields

## Quick Reference
- **Variants**: Filled, Outlined
- **States**: Default, Focused, Error, Disabled
- **Shape**: `md.sys.shape.corner.small` (4px top corners for filled)
- **Tokens**: Primary color, outline color, on-surface text

## Token Usage
- Label/Text: `md.sys.color.on-surface`
- Active indicator: `md.sys.color.primary`
- Outline: `md.sys.color.outline`
- Error: `md.sys.color.error`
- Shape: `md.sys.shape.corner.small`

## Structure
- Container: `<div>` wrapper
- Input: `<input>` or `<textarea>` element
- Label: `<label>` associated via `for` or wrapping
- Supporting text: `<div>` with `aria-describedby`
- Leading/Trailing icons: Optional icon buttons

## Layout Patterns
- Height: 56px (filled), 56px (outlined)
- Padding: 16px horizontal, 12px vertical
- Label: Above input (outlined) or floating (filled)
- Supporting text: Below input, 4px margin top

## States
- Default: Base styling with outline/background
- Focused: Active indicator line, label moves up (filled)
- Error: Red indicator/text using `md.sys.color.error`
- Disabled: Opacity 0.38, no interaction
- Hover: Outline color darkens

## Spacing/Density
- Padding: 16px horizontal, 12px vertical
- Label offset: 16px from left edge
- Icon padding: 12px from edge
- Supporting text: 4px margin top

## Elevation
- No elevation (surface-level component)

## Focus/Hover/Pressed
- Focus: Active indicator line animates in, `md.sys.motion.duration.medium2`
- Hover: Outline color changes, cursor text
- Pressed: No specific state (focus handles interaction)

## Accessibility
- Label: Always visible, associated with input
- Required: `aria-required="true"`, visual indicator
- Error: `aria-invalid="true"`, `aria-describedby` for error message
- Helper text: `aria-describedby` linking to supporting text
- Keyboard: Standard input navigation, Tab to move between fields


