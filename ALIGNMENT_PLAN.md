# Project Card Alignment Plan

## Objective
Achieve 1:1 visual and structural alignment between the local project-card component and the Webflow Card component using Webflow MCP tools for verification.

**Success Criteria**: Visual match across all breakpoints, states, and interactions with structure that mirrors Webflow's implementation.

---

## Phase 1: Baseline Audit

### 1.1 Webflow Structure Discovery
**Tools**: `mcp__webflow__de_component_tool`, `mcp__webflow__element_tool`

**Actions**:
1. Open Card component view in Webflow Designer
2. Get all elements with full structure using `element_tool > get_all_elements`
3. Document complete element tree:
   - Element types (Link, Div, Heading, Text Block, Image)
   - Parent-child relationships
   - Nesting depth
   - Element order

**Output**: Complete structure map with element IDs and hierarchy

### 1.2 Webflow Attributes Audit
**Tools**: `mcp__webflow__element_tool`

**Actions**:
1. For each element in the Card component, fetch attributes using `element_tool > get_selected_element`
2. Document all attributes:
   - `data-element` attributes
   - `id` attributes
   - Any custom attributes
   - Class names (note: we use BEM, but need to understand Webflow's class structure)

**Output**: Attribute mapping for every element

### 1.3 Webflow Styles Discovery
**Tools**: `mcp__webflow__style_tool`, `mcp__webflow__element_tool`

**Actions**:
1. Identify all unique style classes applied to Card component elements
2. For each style class, fetch properties across ALL breakpoints:
   - Base (main)
   - xxl, xl, large, medium, small, tiny
3. For each style class, fetch properties for ALL pseudo-states:
   - hover
   - active
   - focus
   - visited (if applicable to links)
4. Document combo classes (multiple classes on same element)

**Breakpoints to Check**:
- `main` (base desktop)
- `large` (max-width: ~1279px)
- `medium` (max-width: 991px - Tablet)
- `small` (max-width: 767px - Mobile Landscape)
- `tiny` (max-width: 478px - Mobile Portrait)

**Output**: Complete CSS properties map organized by:
- Element → Style Class → Breakpoint → Properties
- Element → Style Class → Pseudo-state → Properties

### 1.4 Local Component Baseline
**Tools**: Manual code review

**Actions**:
1. Document current local structure (project-card.js)
2. Document current local attributes
3. Document current local CSS (project-card.css)
4. Take screenshots at each breakpoint (desktop, tablet, mobile landscape, mobile portrait)
5. Take screenshots of hover state

**Output**: Complete baseline documentation of local component

---

## Phase 2: Gap Analysis

### 2.1 Structure Comparison
**Actions**:
1. Compare Webflow element tree vs. local element tree
2. Identify:
   - Missing wrapper divs
   - Incorrect nesting
   - Wrong element types
   - Missing elements
   - Extra elements

**Output**: List of structural changes needed

### 2.2 Attributes Comparison
**Actions**:
1. Compare Webflow attributes vs. local attributes for each element
2. Identify:
   - Missing `data-element` attributes
   - Mismatched attribute values
   - Extra attributes

**Output**: List of attribute changes needed

### 2.3 Visual Styles Comparison
**Actions**:
1. For each breakpoint, compare:
   - Layout properties (display, flex, grid, position)
   - Box model (width, height, padding, margin)
   - Typography (font-family, size, weight, line-height, letter-spacing)
   - Colors (background, text, border)
   - Border radius, shadows
   - Spacing (gap, column-gap, row-gap)
2. For each pseudo-state, compare:
   - All visual properties that change

**Output**: CSS properties map showing differences

### 2.4 Responsive Behavior Comparison
**Actions**:
1. Document how Webflow Card changes at each breakpoint
2. Document how local card changes at each breakpoint
3. Identify breakpoint-specific differences

**Output**: Responsive behavior differences

---

## Phase 3: Implementation Plan

### 3.1 Structure Alignment
**Priority**: HIGH (must be done first)

**Actions**:
1. Update `project-card.js` to match Webflow element tree exactly:
   - Add missing wrapper divs
   - Fix nesting order
   - Use correct element types
   - Apply correct class names (BEM equivalents)

**Verification**:
- Visual DOM inspection in browser DevTools
- Element count matches
- Nesting depth matches

### 3.2 Attributes Alignment
**Priority**: HIGH

**Actions**:
1. Update `project-card.js` to add all `data-element` attributes
2. Ensure attribute values match Webflow exactly

**Verification**:
- Inspect DOM in browser DevTools
- Check all elements have correct attributes

### 3.3 Base Styles Alignment
**Priority**: HIGH

**Actions**:
1. Update `project-card.css` with base (desktop) styles from Webflow
2. Focus on visual match, not necessarily identical properties
3. Use BEM naming convention but match visual output
4. Apply styles in order:
   - Layout (display, flex properties, position)
   - Box model (width, height, padding, margin)
   - Typography
   - Colors
   - Decorative (border-radius, shadows)

**Verification**:
- Side-by-side screenshot comparison (Webflow vs. Local)
- Measure dimensions in browser DevTools
- Check computed styles for critical properties

### 3.4 Responsive Styles Alignment
**Priority**: HIGH

**Actions**:
1. For each breakpoint (medium, small, tiny), update CSS
2. Test at exact breakpoint widths:
   - 991px (medium)
   - 767px (small)
   - 478px (tiny)
3. Ensure layout changes match Webflow

**Verification**:
- Screenshot comparison at each breakpoint
- Resize browser to exact breakpoint widths
- Check flex direction, wrapping, sizing changes

### 3.5 Interactive States Alignment
**Priority**: MEDIUM

**Actions**:
1. Update hover state styles
2. Check focus, active states if applicable
3. Verify transition/animation timings

**Verification**:
- Hover over cards and compare visually
- Check DevTools computed styles during hover
- Test keyboard navigation (focus states)

---

## Phase 4: Verification & Iteration

### 4.1 Visual Testing Protocol
**Actions**:
1. Open Webflow published site and local site side-by-side
2. Test at each breakpoint:
   - Desktop (1920px, 1440px, 1280px)
   - Tablet (991px, 768px)
   - Mobile Landscape (767px, 600px)
   - Mobile Portrait (478px, 375px, 320px)
3. For each breakpoint, verify:
   - Card dimensions match
   - Spacing (padding, gaps) matches
   - Typography matches (size, weight, color)
   - Colors match (background, text)
   - Border radius matches
   - Image sizing/aspect ratio matches
4. Test interactive states:
   - Hover (desktop)
   - Touch (mobile)

**Tools**:
- Browser DevTools (inspect, measure)
- Screenshot overlay comparison
- Pixel Perfect browser extension (optional)

**Output**: List of remaining visual differences

### 4.2 MCP Re-verification
**Actions**:
1. If visual differences remain, use Webflow MCP tools to fetch specific styles
2. Use `style_tool > get_styles` with filtered IDs for specific elements
3. Compare fetched values against local CSS
4. Identify exact property values causing differences

**Output**: Specific CSS property changes needed

### 4.3 Iteration Loop
**Actions**:
1. Make changes based on verification findings
2. Re-test using Visual Testing Protocol
3. Repeat until visual match achieved
4. Maximum iterations: 5 (if not matched after 5, reassess approach)

**Exit Criteria**:
- No visible differences in side-by-side comparison
- Dimensions within 2px tolerance
- Colors match exactly
- Typography matches (size, weight, family)
- Responsive behavior matches at all breakpoints
- Hover states match

---

## Phase 5: Final Validation

### 5.1 Cross-Browser Testing
**Actions**:
1. Test in Chrome, Safari, Firefox
2. Verify visual match in each browser
3. Check for browser-specific rendering differences

### 5.2 Real Device Testing
**Actions**:
1. Test on actual mobile devices (iOS, Android)
2. Verify touch interactions
3. Check responsive behavior on real screens

### 5.3 Accessibility Check
**Actions**:
1. Verify keyboard navigation works
2. Check focus states are visible
3. Ensure alt text on images
4. Verify link accessibility

### 5.4 Performance Check
**Actions**:
1. Verify lazy loading on images works
2. Check for layout shift issues
3. Ensure responsive images load correctly

---

## Tools Reference

### Webflow MCP Tools

#### Element Tool
```javascript
// Get all elements in component
{
  actions: [{
    get_all_elements: {
      query: "all",
      include_style_properties: true,
      include_all_breakpoint_styles: true
    }
  }],
  siteId: "673ccceba3dcf36ccc28f470"
}

// Get specific element
{
  actions: [{
    get_selected_element: true
  }],
  siteId: "673ccceba3dcf36ccc28f470"
}
```

#### Style Tool
```javascript
// Get all styles
{
  actions: [{
    get_styles: {
      query: "all",
      include_all_breakpoints: true,
      skip_properties: false
    }
  }],
  siteId: "673ccceba3dcf36ccc28f470"
}

// Get specific styles
{
  actions: [{
    get_styles: {
      query: "filtered",
      filter_ids: ["style-id-1", "style-id-2"],
      include_all_breakpoints: true
    }
  }],
  siteId: "673ccceba3dcf36ccc28f470"
}
```

#### Component Tool
```javascript
// Open component view
{
  actions: [{
    open_component_view: {
      component_instance_id: {
        component: "component-id",
        element: "element-id"
      }
    }
  }],
  siteId: "673ccceba3dcf36ccc28f470"
}

// Close component view
{
  actions: [{
    close_component_view: true
  }],
  siteId: "673ccceba3dcf36ccc28f470"
}
```

---

## Change Log Template

For each iteration, document:

```markdown
### Iteration N - [Date]

**Changes Made**:
- [ ] Structure: [description]
- [ ] Attributes: [description]
- [ ] Styles: [description]

**MCP Data Used**:
- Tool: [tool name]
- Action: [action taken]
- Key findings: [what was discovered]

**Visual Verification**:
- Breakpoint: [breakpoint tested]
- Result: [pass/fail]
- Screenshot: [path or description]

**Remaining Issues**:
1. [issue 1]
2. [issue 2]

**Next Steps**:
1. [next step 1]
2. [next step 2]
```

---

## Success Metrics

- [ ] Structure matches Webflow element tree exactly
- [ ] All `data-element` attributes match Webflow
- [ ] Visual appearance matches at desktop (1440px)
- [ ] Visual appearance matches at tablet (991px)
- [ ] Visual appearance matches at mobile landscape (767px)
- [ ] Visual appearance matches at mobile portrait (478px)
- [ ] Hover state matches Webflow
- [ ] Card dimensions within 2px tolerance across all breakpoints
- [ ] Typography matches (font, size, weight, color)
- [ ] Colors match exactly (background, text)
- [ ] Spacing matches (padding, gaps, margins)
- [ ] Images render correctly with proper aspect ratio
- [ ] Component works in Chrome, Safari, Firefox
- [ ] Component works on real mobile devices
- [ ] Accessibility standards met

---

## Risk Mitigation

### Risk: Webflow uses properties not available in standard CSS
**Mitigation**: Focus on visual match, use alternative CSS properties that achieve same visual result

### Risk: Responsive behavior differs due to viewport units
**Mitigation**: Test at exact breakpoint widths, adjust units (px, %, vw, svw) as needed

### Risk: Fonts render differently
**Mitigation**: Ensure exact same Google Fonts loaded, check font-weight values

### Risk: Colors appear different due to color space
**Mitigation**: Use exact HSLA/RGB values from Webflow, test in multiple browsers

### Risk: MCP tools timeout with large queries
**Mitigation**: Break queries into smaller chunks, fetch styles per-element if needed

---

## Timeline Estimate

- **Phase 1** (Baseline Audit): 1-2 hours
- **Phase 2** (Gap Analysis): 30 minutes
- **Phase 3** (Implementation): 1-2 hours
- **Phase 4** (Verification & Iteration): 2-3 hours (depends on iterations)
- **Phase 5** (Final Validation): 1 hour

**Total**: 5-8 hours with iterations

---

## Notes

- This is an iterative process - expect multiple rounds of refinement
- Visual match is priority over identical CSS properties
- Use Webflow MCP tools as source of truth, not visual inspection alone
- Document all changes for future reference
- Keep BEM naming convention for local CSS, but match Webflow's visual output
- Maintain component modularity and separation of concerns
