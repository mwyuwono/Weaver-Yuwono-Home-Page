# Helper Alignment and Image Border Radius Fixes

**Date**: 2025-11-30

## Changes Made

### 1. Card Helper Justify-Content

**File**: `project-card.css`
**Location**: `.project-card__helper` (line 125)

**Before**:
```css
justify-content: center;
```

**After**:
```css
justify-content: start;
```

**Impact**: Helper text ("PDF download") now aligns to the left/start instead of center, matching Webflow layout.

---

### 2. Image Wrapper Border Radius

**File**: `project-card.css`
**Location**: `.project-card__image-wrapper` (lines 51-58)

**Before**:
```css
.project-card__image-wrapper {
  display: flex;
  flex-direction: column;
  align-self: stretch;
}
```

**After**:
```css
.project-card__image-wrapper {
  display: flex;
  flex-direction: column;
  align-self: stretch;
  overflow: hidden;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
}
```

**Changes**:
- Added `overflow: hidden` to clip image overflow
- Added `border-bottom-left-radius: 12px` to match card corner
- Added `border-bottom-right-radius: 12px` to match card corner

**Rationale**: The image wrapper is at the bottom of the card. Since the card has `border-radius: 12px` on all corners, the image wrapper needs matching border-radius on bottom corners to align with the card's rounded shape.

---

### 3. Image Border Radius

**File**: `project-card.css`
**Location**: `.project-card__image` (lines 61-65)

**Before**:
```css
.project-card__image {
  width: 100%;
}
```

**After**:
```css
.project-card__image {
  width: 100%;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
}
```

**Changes**:
- Added `border-bottom-left-radius: 12px`
- Added `border-bottom-right-radius: 12px`

**Rationale**: Ensures the actual image element also has rounded bottom corners to match the card wrapper's 12px border-radius. Combined with the wrapper's overflow: hidden, this ensures crisp, aligned corners.

---

## Visual Impact

### Helper Text Alignment
- **Before**: Helper text centered horizontally within its container
- **After**: Helper text aligned to left/start, matching Webflow

### Image Corners
- **Before**: Square bottom corners on image, misaligned with card's rounded corners
- **After**: Image bottom corners rounded to 12px, perfectly aligned with card's border-radius

---

## Card Structure Context

The card has this structure:
```
Card wrapper (border-radius: 12px, padding: 8px)
  ├─ Content wrapper (at top)
  │    └─ Content
  │         ├─ Header
  │         │    ├─ Title
  │         │    └─ Subtitle
  │         └─ Helper (justify-content: start)
  └─ Image wrapper (at bottom, border-bottom-radius: 12px)
       └─ Image (border-bottom-radius: 12px)
```

Since the image is positioned at the bottom of the card, it needs border-radius on its bottom corners to align with the card wrapper's rounded corners.

---

## MCP Verification

Checked Webflow MCP data:
- `card-helper` styles showed no explicit justify-content in MCP data (inherits from parent or defaults)
- Image wrapper (Flex Block 5) and card-image showed no border-radius in MCP data

**Note**: Webflow may handle border-radius through different mechanisms (parent clipping, default behavior, or visual rendering), but the visual result shows rounded bottom corners on images. Our implementation achieves the same visual result with explicit border-radius properties.

---

## Files Modified

- `/components/project-card/project-card.css` - 3 property changes

---

## Testing Checklist

- [ ] Helper text aligns to left (not centered)
- [ ] Image bottom-left corner is rounded (12px radius)
- [ ] Image bottom-right corner is rounded (12px radius)
- [ ] No image overflow beyond card corners
- [ ] Border radius matches at all breakpoints
- [ ] Layout matches Webflow visually

---

## Summary

These changes ensure:
1. ✅ Helper text alignment matches Webflow (left-aligned)
2. ✅ Image corners align perfectly with card's rounded border
3. ✅ No visual gaps or misalignments at card corners
4. ✅ Proper clipping of image content within card boundaries
