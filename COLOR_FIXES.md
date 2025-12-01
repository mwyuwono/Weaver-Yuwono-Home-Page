# Color Fixes - card-helper and Other Elements

**Date**: 2025-11-30

## Issue Identified

The card-helper text color (and other colors) were using incorrect CSS variable fallbacks that didn't match Webflow's actual color values.

## Root Cause Analysis

Used Webflow MCP `variable_tool` to fetch actual variable values. Discovered that Webflow uses custom color variables with specific values that differ from the Material Design 3 tokens we were assuming.

### Webflow Color Variables

Retrieved via MCP from site 673ccceba3dcf36ccc28f470:

| Variable ID | Name | Value | Usage |
|-------------|------|-------|-------|
| `variable-4e9b27cc-1ffb-abf7-af98-77bc81ea8046` | gray | `hsla(50, 6.64%, 61.44%, 1.00)` | card-helper text |
| `variable-705d5447-2dd0-0dd9-ebf0-00a193c31d1d` | green | `#304634` | hover state colors |
| `variable-c839d576-20e4-c725-3966-da74997c5436` | Neutral | `#f8f7f3` | card background |

## Changes Made

### 1. Card Helper Text Color

**File**: `project-card.css`
**Location**: `.project-card__helper` (line 131)

**Before**:
```css
color: var(--md-sys-color-primary, #6b7d3f);  /* Wrong - green */
```

**After**:
```css
color: hsla(50, 6.64%, 61.44%, 1.00);  /* Correct - gray */
```

**Impact**: Helper text ("PDF DOWNLOAD") now displays in correct muted gray instead of green.

### 2. Hover State Colors

**File**: `project-card.css`
**Location**: `.project-card:hover` (lines 41-47)

**Before**:
```css
border-top-color: var(--md-sys-color-primary, #6b7d3f);  /* Wrong - light green */
border-right-color: var(--md-sys-color-primary, #6b7d3f);
border-bottom-color: var(--md-sys-color-primary, #6b7d3f);
border-left-color: var(--md-sys-color-primary, #6b7d3f);
outline-color: var(--md-sys-color-primary, #6b7d3f);
color: var(--md-sys-color-primary, #6b7d3f);
```

**After**:
```css
border-top-color: #304634;  /* Correct - dark green */
border-right-color: #304634;
border-bottom-color: #304634;
border-left-color: #304634;
outline-color: #304634;
color: #304634;
```

**Impact**: On hover, text color changes to correct dark green (#304634) instead of lighter green (#6b7d3f).

### 3. Card Background Color

**File**: `project-card.css`
**Location**: `.project-card` (line 30)

**Before**:
```css
background-color: var(--md-sys-color-surface-container, #f9faf4);  /* Wrong fallback */
```

**After**:
```css
background-color: #f8f7f3;  /* Correct - Neutral */
```

**Impact**: Card background now uses exact Webflow color (slightly different shade of off-white).

## Visual Differences

### Before Fix
- Helper text: Green (#6b7d3f) - too prominent
- Hover text: Light green (#6b7d3f)
- Card background: #f9faf4 (slightly yellower)

### After Fix
- Helper text: Gray (hsla(50, 6.64%, 61.44%, 1.00)) - subtle and muted ✅
- Hover text: Dark green (#304634) - matches Webflow exactly ✅
- Card background: #f8f7f3 (neutral off-white) - matches Webflow exactly ✅

## Verification

### card-helper Element
- ✅ Base color: `hsla(50, 6.64%, 61.44%, 1.00)` (gray)
- ✅ Font: Noto Sans, sans-serif
- ✅ Size: 0.75rem
- ✅ Transform: uppercase
- ✅ Letter-spacing: 0.5px

### Hover State
- ✅ Text color changes to #304634 (dark green)
- ✅ Background changes to white
- ✅ No visible borders (border-color set but no border-width)

### Card Background
- ✅ Neutral off-white (#f8f7f3)

## MCP Tool Usage

### Commands Used

1. **Get all variables**:
```javascript
{
  actions: [{
    get_variable_collections: {
      query: "all"
    }
  }],
  siteId: "673ccceba3dcf36ccc28f470"
}
```

2. **Get specific variable values**:
```javascript
{
  actions: [{
    get_variables: {
      variable_collection_id: "collection-da84c4df-69e9-118d-66ea-82b0ef86293f",
      filter_variables_by_ids: ["variable-4e9b27cc-1ffb-abf7-af98-77bc81ea8046"]
    }
  }],
  siteId: "673ccceba3dcf36ccc28f470"
}
```

## Key Learnings

1. **Never assume CSS variable values** - Always fetch actual values via MCP tools
2. **Variable names can be misleading** - Webflow's "gray" variable is actually for helper text
3. **Fallback values matter** - Using MD3 token fallbacks assumed wrong color scheme
4. **MCP variable_tool is essential** - Critical for getting exact color values from Webflow

## Files Modified

- `/components/project-card/project-card.css` - 3 color value updates

## Next Steps

User should verify:
1. Helper text appears in muted gray (not green)
2. Hover state shows dark green text (#304634)
3. Card background is subtle neutral off-white
4. Overall color harmony matches Webflow exactly
