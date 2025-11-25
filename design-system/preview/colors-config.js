/**
 * Material Design 3 Color Configuration
 * 
 * Edit this file to customize colors and typography across all preview pages.
 * 
 * Typography:
 * - Heading font: Palatino Linotype (for titles/headings)
 * - Body font: brandon-grotesque (for body text)
 * - Meta font: adelle-sans (for labels/meta text)
 * 
 * Colors and typography are defined as CSS custom property values.
 */

const M3Colors = {
  // Primary Colors
  'md-sys-color-primary': '#1b1d0e',
  'md-sys-color-on-primary': '#ebece6',
  'md-sys-color-primary-container': '#e4e2d8',
  'md-sys-color-on-primary-container': '#1b1d0e',
  
  // Secondary Colors
  'md-sys-color-secondary': '#454500',
  'md-sys-color-on-secondary': '#ebece6',
  'md-sys-color-secondary-container': '#e4e2d8',
  'md-sys-color-on-secondary-container': '#1b1d0e',
  
  // Surface Colors
  'md-sys-color-surface': '#f8f9f4',
  'md-sys-color-on-surface': '#1b1d0e',
  'md-sys-color-surface-variant': '#f8f9f4',
  'md-sys-color-on-surface-variant': '#2e3018',
  'md-sys-color-surface-container': '#ebece6',
  'md-sys-color-surface-container-high': '#f8f9f4',
  'md-sys-color-surface-container-highest': '#f8f9f4',
  
  // Background Colors
  'md-sys-color-background': '#f8f9f4',
  'md-sys-color-on-background': '#1b1d0e',
  
  // Outline Colors
  'md-sys-color-outline': '#e4e2d8',
  'md-sys-color-outline-variant': '#e4e2d8',
  
  // Error Colors
  'md-sys-color-error': '#a23827',
  'md-sys-color-on-error': '#f8f9f4',
  'md-sys-color-error-container': '#e4e2d8',
  'md-sys-color-on-error-container': '#561c16',
  
  // Elevation (shadows) - All set to none to remove drop shadows
  'md-sys-elevation-level0': 'none',
  'md-sys-elevation-level1': 'none',
  'md-sys-elevation-level2': 'none',
  'md-sys-elevation-level3': 'none',
  
  // Shape (border radius)
  'md-sys-shape-corner-none': '0px',
  'md-sys-shape-corner-small': '4px',
  'md-sys-shape-corner-medium': '12px',
  'md-sys-shape-corner-large': '16px',
  'md-sys-shape-corner-extra-large': '28px',
  'md-sys-shape-corner-full': '9999px',
  
  // Typography - Custom Font Families
  'md-ref-typeface-heading': '"Palatino Linotype", "Book Antiqua", Palatino, serif',
  'md-ref-typeface-body': '"brandon-grotesque", sans-serif',
  'md-ref-typeface-meta': '"adelle-sans", sans-serif',
  
  // Typography - Font Weights
  'md-ref-typeface-weight-light': '300',
  'md-ref-typeface-weight-regular': '400',
  'md-ref-typeface-weight-medium': '500',
  'md-ref-typeface-weight-bold': '700',
  
  // Typography - Base Settings
  'md-sys-base-font-size': '16px',
  
  // Typography - Heading Font (Palatino)
  'md-sys-typescale-heading-font-family': '"Palatino Linotype", "Book Antiqua", Palatino, serif',
  'md-sys-typescale-heading-font-weight': '400',
  'md-sys-typescale-heading-letter-spacing': '0em',
  'md-sys-typescale-heading-line-height': '1.4em',
  
  // Typography - Body Font (Brandon Grotesque)
  'md-sys-typescale-body-font-family': '"brandon-grotesque", sans-serif',
  'md-sys-typescale-body-font-weight': '300',
  'md-sys-typescale-body-letter-spacing': '0em',
  'md-sys-typescale-body-line-height': '1.8em',
  
  // Typography - Meta Font (Adelle Sans)
  'md-sys-typescale-meta-font-family': '"adelle-sans", sans-serif',
  'md-sys-typescale-meta-font-weight': '400',
  'md-sys-typescale-meta-letter-spacing': '0.01em',
  'md-sys-typescale-meta-line-height': '1em',
  
  // Typography - Material Design 3 Scale (using custom fonts)
  'md-sys-typescale-body-large-size': '16px',
  'md-sys-typescale-body-large-line-height': '1.8em',
  'md-sys-typescale-body-large-font-family': '"brandon-grotesque", sans-serif',
  'md-sys-typescale-body-large-font-weight': '300',
  'md-sys-typescale-body-large-letter-spacing': '0em',
  
  'md-sys-typescale-body-medium-size': '14px',
  'md-sys-typescale-body-medium-line-height': '1.8em',
  'md-sys-typescale-body-medium-font-family': '"brandon-grotesque", sans-serif',
  'md-sys-typescale-body-medium-font-weight': '300',
  'md-sys-typescale-body-medium-letter-spacing': '0em',
  
  'md-sys-typescale-label-large-size': '14px',
  'md-sys-typescale-label-large-line-height': '1em',
  'md-sys-typescale-label-large-font-family': '"adelle-sans", sans-serif',
  'md-sys-typescale-label-large-font-weight': '400',
  'md-sys-typescale-label-large-letter-spacing': '0.01em',
  
  'md-sys-typescale-title-large-size': '22px',
  'md-sys-typescale-title-large-line-height': '1.4em',
  'md-sys-typescale-title-large-font-family': '"Palatino Linotype", "Book Antiqua", Palatino, serif',
  'md-sys-typescale-title-large-font-weight': '400',
  'md-sys-typescale-title-large-letter-spacing': '0em',
  
  // Spacing
  'md-sys-spacing-xs': '4px',
  'md-sys-spacing-sm': '8px',
  'md-sys-spacing-md': '16px',
  'md-sys-spacing-lg': '24px',
  'md-sys-spacing-xl': '32px',
};

/**
 * Apply colors to CSS custom properties
 * Call this function after the DOM loads
 */
function applyColors() {
  const root = document.documentElement;
  Object.entries(M3Colors).forEach(([key, value]) => {
    root.style.setProperty(`--${key}`, value);
  });
}

// Auto-apply on load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', applyColors);
} else {
  applyColors();
}

