# Preview Pages

Visual reference pages for Material Design 3 components, variants, and colors.

## Customizing Colors & Typography

**To update colors and typography across all preview pages**, edit `colors-config.js`:

### Colors
```javascript
const M3Colors = {
  'md-sys-color-primary': '#6750a4',  // Change this value
  'md-sys-color-on-primary': '#ffffff',
  // ... edit any color value
};
```

### Typography
The preview pages use custom typography integrated from your site:
- **Heading Font**: Palatino Linotype (for titles/headings) - 400 weight, 0.18em letter spacing, 1.4em line height
- **Body Font**: brandon-grotesque (for body text) - 300 weight, 0em letter spacing, 1.8em line height
- **Meta Font**: adelle-sans (for labels/meta) - 400 weight, 0.01em letter spacing, 1em line height

Edit typography values in `colors-config.js`:
```javascript
'md-sys-typescale-heading-font-family': '"Palatino Linotype", "Book Antiqua", Palatino, serif',
'md-sys-typescale-body-font-family': '"brandon-grotesque", sans-serif',
'md-sys-typescale-meta-font-family': '"adelle-sans", sans-serif',
// ... edit font families, weights, letter spacing, line heights
```

After editing `colors-config.js`, refresh any preview page to see the changes applied automatically.

## Files

- `index.html` - Component gallery with links to all components
- `colors.html` - Color palette reference with swatches
- `components/*.html` - Individual component previews
- `styles.css` - Shared stylesheet
- `colors-config.js` - **Edit this file to customize colors**

## Usage

1. Open `index.html` in your browser
2. Navigate to components or colors page
3. To customize colors, edit `colors-config.js` and refresh

All preview pages automatically load colors from `colors-config.js`, so changes apply instantly across all pages.

