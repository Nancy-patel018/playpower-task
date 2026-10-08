# Design System Specification & Token Reference

This document establishes the exact design tokens, typography scale, color palette, spacing system, radii, shadows, micro-interactions, and accessibility standards for the Airbnb listing clone.

---

## 1. Color Palette

### Brand Colors
- **Airbnb Red (Primary):** `#FF385C`
- **Red Hover:** `#E00B41`
- **Red Active / Dark:** `#D70466`
- **Reserve Gradient:** `linear-gradient(to right, #E51D53, #D70466)`

### Neutral Scales
- **Charcoal Text (Heading/Body):** `#222222`
- **Secondary Muted Text:** `#717171`
- **Light Muted Text:** `#5E5E5E`
- **Border Default:** `#DDDDDD`
- **Border Light:** `#EBEBEB`
- **Background Base:** `#FFFFFF`
- **Subtle Surface BG:** `#F7F7F7`
- **Overlay Dim:** `rgba(0, 0, 0, 0.6)`

---

## 2. Typography

- **Primary Font Stack:** `Plus Jakarta Sans`, `-apple-system`, `BlinkMacSystemFont`, `Roboto`, `Helvetica Neue`, `sans-serif`
- **Sizes & Line Heights:**
  - `h1`: 26px / line-height 30px / weight 600
  - `h2`: 22px / line-height 26px / weight 600
  - `h3`: 18px / line-height 22px / weight 600
  - `body-lg`: 16px / line-height 24px / weight 400 & 500
  - `body-md`: 14px / line-height 20px / weight 400 & 500
  - `caption`: 12px / line-height 16px / weight 400 & 600

---

## 3. Shadows & Elevation

- **Search Capsule:** `0 1px 2px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.05)`
- **Search Capsule Hover:** `0 2px 4px rgba(0,0,0,0.18)`
- **Sticky Booking Card:** `0 6px 16px rgba(0, 0, 0, 0.12)`
- **Modals & Popovers:** `0 8px 28px rgba(0, 0, 0, 0.28)`
- **Sub-Header Nav:** `0 1px 2px rgba(0, 0, 0, 0.08)`

---

## 4. Spacing Scale & Border Radii

- **Grid Gap:** 8px (Hero grid photos)
- **Container Max-Width:** 1120px (Desktop content area)
- **Border Radii:**
  - Standard Card / Input Box: `12px` (`rounded-xl`)
  - Hero Image Corners: Top-Left `12px`, Bottom-Left `12px`, Top-Right `12px`, Bottom-Right `12px`
  - Floating Buttons & Pills: `9999px` (`rounded-full`)

---

## 5. Micro-Interactions & Transitions

- **Hero Image Hover:** `transition: opacity 0.2s ease-in-out` (dimming neighboring images when hovered)
- **Heart Wishlist Toggle:** Scale bounce animation (`scale(1.3)` to `scale(1)`)
- **Button Active State:** `transform: scale(0.96)` duration `0.1s`
- **Modal Enter/Exit:** Fade-in backdrop `opacity 0 -> 1` (200ms), slide-up content container (300ms cubic-bezier)
