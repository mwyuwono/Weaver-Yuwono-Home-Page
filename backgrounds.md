# Background Configuration Tool - Build Instructions

## Objective

Create a **single, self-contained HTML file** that serves as a visual configuration tool for the animated mesh gradient background used in the Weaver-Yuwono landing page. This tool should allow real-time editing of all background properties with live preview and provide CSS/JSON export functionality.

## Requirements

### 1. File Structure
- **Single HTML file** (`background-configurator.html`) with all CSS and JavaScript inline
- No external dependencies or imports required
- Should open and run directly in any modern browser

### 2. Visual Layout

The app should have a **two-column layout**:

**Left Column: Live Preview (60% width)**
- Full-height preview panel showing the animated mesh gradient background
- Should render exactly as it appears on the landing page
- Background should animate in real-time as values are adjusted

**Right Column: Controls Panel (40% width)**
- Scrollable panel with all configuration controls organized into sections
- Clean, modern UI with clear labels
- Group related controls together

### 3. Configuration Controls

Organize controls into the following sections:

#### Section 1: Base Mesh Gradient Container
- **Color 1** (color picker) - Start color of base gradient
- **Color 2** (color picker) - End color of base gradient
- Display current gradient direction (145deg) as read-only text

#### Section 2: Mesh Blob 1 (Bottom Left)
- **Inner Color** (color picker) - Center of radial gradient
- **Outer Color** (color picker) - Edge of radial gradient (before transparent)
- **Opacity** (slider: 0-1, step 0.05) - Overall blob opacity
- **Size** (slider: 300-1000px, step 10) - Blob width/height (always square)
- **Position X** (slider: -10% to 30%, step 1) - Horizontal position (left)
- **Position Y** (slider: -10% to 40%, step 1) - Vertical position (bottom)
- **Blur** (slider: 40-150px, step 5) - Blur filter amount
- **Animation Speed** (slider: 8-24 seconds, step 1) - Animation duration

#### Section 3: Mesh Blob 2 (Top Right)
Same controls as Blob 1

#### Section 4: Mesh Blob 3 (Center)
Same controls as Blob 1, except:
- **Position X** should control horizontal offset from center (-100px to 100px)
- **Position Y** should control vertical offset from center (-100px to 100px)

#### Section 5: Mesh Blob 4 (Bottom Right)
Same controls as Blob 1

#### Section 6: Avatar Card Gradient
- **Color Stop 1** (color picker) - `#1b2637`
- **Color Stop 2** (color picker) - `#2f344a`
- **Color Stop 3** (color picker) - `#4b3b47`
- **Color Stop 4** (color picker) - `#7a6270`
- Display gradient direction (145deg) as read-only text

### 4. Initial Values

The app should initialize with these current values from the Weaver-Yuwono site:

```javascript
{
  baseGradient: {
    color1: "#2a2a3e",
    color2: "#3a3a4e",
    direction: "145deg"
  },
  blob1: {
    innerColor: "rgba(13, 56, 194, 0.8)",
    outerColor: "rgba(13, 56, 194, 0.4)",
    opacity: 1.0,
    size: 700,
    positionX: "5%",
    positionY: "10%",
    blur: 80,
    animationSpeed: 16
  },
  blob2: {
    innerColor: "rgba(122, 98, 112, 0.7)",
    outerColor: "rgba(122, 98, 112, 0.35)",
    opacity: 1.0,
    size: 650,
    positionX: "10%",
    positionY: "5%",
    blur: 80,
    animationSpeed: 14
  },
  blob3: {
    innerColor: "rgba(75, 59, 71, 0.75)",
    outerColor: "rgba(75, 59, 71, 0.35)",
    opacity: 1.0,
    size: 600,
    positionX: "0px",
    positionY: "0px",
    blur: 80,
    animationSpeed: 12
  },
  blob4: {
    innerColor: "rgba(22, 209, 234, 0.65)",
    outerColor: "rgba(22, 209, 234, 0.3)",
    opacity: 1.0,
    size: 620,
    positionX: "15%",
    positionY: "15%",
    blur: 80,
    animationSpeed: 15
  },
  avatarGradient: {
    color1: "#1b2637",
    color2: "#2f344a",
    color3: "#4b3b47",
    color4: "#7a6270",
    direction: "145deg"
  }
}
```

**Note on blob positioning:**
- Blob 1: `bottom: 10%; left: 5%;`
- Blob 2: `top: 5%; right: 10%;`
- Blob 3: `top: 50%; left: 50%; transform: translate(-50%, -50%);` (centered with offset)
- Blob 4: `bottom: 15%; right: 15%;`

### 5. Real-Time Updates

- All controls should update the preview **immediately** as they are adjusted
- No "Apply" button needed - changes are instant
- Color pickers should support both hex and rgba formats
- Animations should continue running smoothly during adjustments

### 6. Export Functionality

Add two prominent export buttons at the top of the controls panel:

#### Button 1: "Copy CSS"
When clicked, copy ready-to-paste CSS code to clipboard:

```css
/* Mesh gradient background container */
.mesh-gradient-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    background: linear-gradient(145deg, #2a2a3e 0%, #3a3a4e 100%);
    overflow: hidden;
}

/* Mesh gradient blobs */
.mesh-blob {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    mix-blend-mode: normal;
    will-change: transform;
}

.mesh-blob-1 {
    width: 700px;
    height: 700px;
    bottom: 10%;
    left: 5%;
    background: radial-gradient(circle, rgba(13, 56, 194, 0.8) 0%, rgba(13, 56, 194, 0.4) 40%, transparent 70%);
    animation: meshFloat1 16s ease-in-out infinite;
}

/* ... (include all 4 blobs with current values) ... */

/* Avatar card gradient variable */
:root {
    --gradient-3: linear-gradient(145deg, #1b2637 0%, #2f344a 35%, #4b3b47 70%, #7a6270 100%);
}

/* Include all 4 animation keyframes exactly as they are in the current CSS */
```

Show a confirmation message after copying.

#### Button 2: "Copy Config JSON"
When clicked, copy a complete JSON configuration object to clipboard (formatted with the current values).

Show a confirmation message after copying.

### 7. Technical Implementation Notes

#### CSS for the App UI
- Use a clean, minimal design
- Controls panel should have a light background (#f5f5f5 or similar)
- Use proper spacing and grouping for readability
- Section headers should be bold and clearly visible
- Color pickers should be large enough to use comfortably

#### JavaScript Functionality
- Use vanilla JavaScript (no frameworks)
- Update CSS custom properties or inline styles for real-time preview
- For blob animations, generate keyframes dynamically or update animation-duration
- Handle color format conversions (hex to rgba, rgba to hex)
- Implement clipboard copy with fallback for older browsers

#### Preview Panel
- Should render the exact same HTML structure as the landing page:
  ```html
  <div class="mesh-gradient-container">
      <div class="mesh-blob mesh-blob-1"></div>
      <div class="mesh-blob mesh-blob-2"></div>
      <div class="mesh-blob mesh-blob-3"></div>
      <div class="mesh-blob mesh-blob-4"></div>
  </div>
  ```
- Include all keyframe animations for the 4 blobs (meshFloat1, meshFloat2, meshFloat3, meshFloat4)
- Animations should match the current CSS exactly

#### Color Picker Implementation
- Use native `<input type="color">` for hex colors
- For rgba colors, provide:
  - Color picker for RGB values
  - Separate opacity slider
  - Display current rgba value as text

### 8. Testing Checklist

Before considering the tool complete, verify:
- [ ] All controls update the preview in real-time
- [ ] Animations continue running smoothly during adjustments
- [ ] Export CSS button copies valid, ready-to-paste CSS
- [ ] Export JSON button copies valid JSON
- [ ] Initial values match the current landing page exactly
- [ ] Preview renders identically to the landing page background
- [ ] Tool works in Chrome, Firefox, and Safari
- [ ] Sliders have appropriate min/max/step values
- [ ] Color pickers handle both hex and rgba formats

## Deliverable

A single `background-configurator.html` file that:
1. Opens directly in any browser without setup
2. Provides intuitive visual controls for all background properties
3. Shows live preview with smooth animations
4. Exports clean, production-ready CSS and JSON
5. Initializes with current landing page values

## Success Criteria

The tool is successful if:
- A non-technical user can visually adjust all background properties
- The exported CSS can be pasted directly into `styles.css` with zero modifications
- The preview accurately represents how the background will appear on the landing page
- All controls work smoothly without lag or glitches
