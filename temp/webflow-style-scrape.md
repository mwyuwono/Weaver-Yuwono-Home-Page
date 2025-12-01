Use this prompt for similar alignment tasks:

  Align /Users/mwy/Library/Mobile Documents/com~apple~CloudDocs/Projects/weaver-yuwono.com/projects/index.html with the Webflow "Home" page 
  from site ID 673ccceba3dcf36ccc28f470 using ONLY Webflow MCP tools as source of truth.

  CRITICAL REQUIREMENTS:

Create, maintain and keep updated one or more new documents in this project for the documentation required throughout this prompt. Create a new folder to contain this documentation if needed. 

  PHASE 1 - COMPLETE WEBFLOW AUDIT (Required before any changes):

  Step 1: Structure Discovery
  - Use mcp__webflow__de_component_tool to open component view
  - Use mcp__webflow__element_tool to get ALL elements
  - Document complete element tree with IDs and parent-child relationships
  - Document all attributes on every element

  Step 2: Style Discovery
  - Use mcp__webflow__style_tool to fetch ALL styles for ALL elements
  - Include all breakpoints: main, xxl, xl, large, medium, small, tiny
  - Include all states: noPseudo, hover, active, focus, visited
  - Fetch styles for base classes AND combo classes separately

  Step 3: Variable Resolution
  - Use mcp__webflow__variable_tool to get ALL variables
  - Document actual color/size values, not just variable IDs
  - Map variable IDs to actual values for use in CSS

  Step 4: Create Baseline Document
  - Full Webflow structure in tree format
  - Complete CSS properties table (element → breakpoint → state → properties)
  - Variable value mapping
  - Expected responsive behavior at each breakpoint

  PHASE 2 - SYSTEMATIC COMPARISON:

  Step 1: Structure Comparison
  - Compare local DOM to Webflow element tree
  - Identify: missing elements, incorrect nesting, wrong element types
  - Document required structural changes

  Step 2: CSS Comparison
  - Compare every property for every element at every breakpoint
  - Create difference table showing: property | Webflow value | Local value | Match?
  - Flag ALL differences (don't assume anything is close enough)

  PHASE 3 - COMPREHENSIVE IMPLEMENTATION:

  Step 1: Fix Structure (if needed)
  - Update DOM structure to match Webflow exactly
  - Fix element nesting and parent-child relationships

  Step 2: Fix All CSS Properties (single pass)
  - Update all properties based on comprehensive comparison
  - Use actual Webflow variable values (not fallbacks)
  - Apply changes across all breakpoints at once

  PHASE 4 - MCP-BASED VERIFICATION:

  Step 1: Re-fetch Webflow Data
  - Get fresh MCP data after changes

  Step 2: Final Comparison
  - Verify every property matches the compiled documentation.
  - Test at each breakpoint (1440px, 991px, 767px, 478px)
  - Document any remaining differences

  OUTPUT REQUIREMENTS:
  1. Comprehensive audit document before any code changes
  2. Structured comparison table showing all differences
  3. Implementation plan listing all changes to be made
  4. Final verification report with MCP evidence; Verify every property matches the compiled documentation.

  Do NOT make any code changes until Phase 1 and Phase 2 are complete and documented.

  ---
  Key Principles

  Always remember:
  - ✅ MCP tools = source of truth (not visual inspection)
  - ✅ Complete audit before ANY changes
  - ✅ Document everything systematically
  - ✅ Fix everything in one pass
  - ✅ Verify with MCP data, not screenshots
  - ❌ No incremental changes based on visual feedback
  - ❌ No assumptions about previous work
  - ❌ No partial audits