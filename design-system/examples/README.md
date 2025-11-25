# Material Design 3 Examples

Minimal, dependency-free HTML examples demonstrating Material Design 3 component structure and token usage.

## Examples

### [button.html](button.html)
- **Component**: Filled Button
- **Tokens**: `md.sys.color.primary`, `md.sys.color.on-primary`, `md.sys.shape.corner.full`
- **States**: default, hover, focus, pressed, disabled
- **Purpose**: Demonstrate button with Material Design 3 styling and interactions

### [card.html](card.html)
- **Component**: Card
- **Tokens**: `md.sys.color.surface-container`, `md.sys.color.on-surface`, `md.sys.elevation.level1`, `md.sys.shape.corner.medium`
- **States**: default, hover
- **Purpose**: Show card structure with header, content, and actions

### [text-field.html](text-field.html)
- **Component**: Outlined Text Field
- **Tokens**: `md.sys.color.primary`, `md.sys.color.outline`, `md.sys.color.on-surface`, `md.sys.shape.corner.small`
- **States**: default, focused, error
- **Purpose**: Demonstrate text field with floating label and supporting text

### [list.html](list.html)
- **Component**: Two-Line List
- **Tokens**: `md.sys.color.surface`, `md.sys.color.on-surface`, `md.sys.color.on-surface-variant`
- **States**: default, hover, selected
- **Purpose**: Show list item structure with leading icon and trailing action

## Usage

Each example is self-contained HTML that can be opened directly in a browser. Examples use CSS custom properties (CSS variables) that should be mapped from Material Design 3 tokens.

## Token Mapping

Examples reference tokens using CSS custom property syntax:
- `var(--md-sys-color-primary)` maps to `md.sys.color.primary`
- `var(--md-sys-elevation-level1)` maps to `md.sys.elevation.level1`

To use these examples, ensure Material Design 3 tokens are available as CSS custom properties in your stylesheet.

## Notes

- Examples are framework-agnostic (vanilla HTML/CSS)
- No bundler or build step required
- Each example is ≤30 lines of code
- Demonstrates canonical structure and states per Material Design 3 guidelines


