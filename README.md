# Airbnb Listing Clone – Production Frontend Implementation

A pixel-perfect, desktop-optimized clone of an Airbnb listing page ("Romantic Jacuzzi 1BHK Candolim | Mirashya UG10") built with **React 18 + TypeScript + Vite + Tailwind CSS**.

---

## 🌟 Key Features

### 1. View 1 – Complete Listing Page
- **Navbar & Search Pill:** Header with brand logo, interactive search capsule ("Anywhere | Anytime | Add guests"), and user menu.
- **Scroll-Spy Sticky Sub-Header:** Navigation tabs (Photos, Amenities, Reviews, Location) and quick Reserve price widget appearing dynamically on scroll past hero grid.
- **Hero Photo Grid:** 1 large main photo + 4 small grid photos with 8px gaps, 12px rounded outer corners, hover dimming, and bottom-right "Show all photos" trigger.
- **Main Two-Column Layout (~2/3 Left, ~1/3 Sticky Right):**
  - **Left Column:** Apartment specs, Hosted by Mirashya Homes card, special highlights (Self check-in, Dedicated workspace, Great location), 10% discount promo card with Claim button, collapsible property description with modal, sleeping arrangements, amenities list with modal, dual-month side-by-side calendar picker (October & November 2026).
  - **Right Column (Sticky Booking Card):** Dynamic price display (`₹28,499 for 5 nights`), interactive check-in/checkout inputs, guest count dropdown (+/- counters for Adults/Children/Infants/Pets), "Reserve" button with modal confirmation, live price breakdown math, free cancellation notice, and report link.
- **Full Page Sections:** Laurel wreath rating header (`4.95`), 6 category rating bars (Cleanliness 5.0, Accuracy 5.0, Check-in 5.0, Communication 5.0, Location 4.8, Value 4.8), review cards list, interactive vector map section, host details with co-hosts, house rules, cancellation policy, safety, and "More stays nearby" carousel with pagination.

### 2. View 2 – Photo Tour (Full-Screen Gallery)
- Opens from "Show all photos" or any hero image.
- Full-screen overlay with sticky top bar (back/close button, share, save).
- Grid layout showcasing all 20+ property photos.
- Locks body scroll while active.

### 3. View 3 – Lightbox (Single Photo Viewer)
- Opens from any gallery photo at the clicked index.
- Prev / Next arrow buttons, keyboard `ArrowLeft` / `ArrowRight` navigation, `Esc` key handling, and counter (e.g. `3 / 9`).
- Image preloading for smooth transitions.

---

## 🛠️ Getting Started

### Prerequisites
- Node.js `18.x` or higher
- npm `9.x` or higher

### Installation & Running Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run TypeScript type check
npx tsc --noEmit

# Build production bundle
npm run build
```

Open your browser at `http://localhost:3000` to view the listing page.

---

## 📁 Project Structure

```
├── .agent/                    # Sub-agent configuration files
│   ├── a11y-auditor.md
│   ├── code-quality-reviewer.md
│   └── ui-fidelity-reviewer.md
├── docs/                      # Technical Documentation
│   ├── ARCHITECTURE.md        # Architecture diagram & scaling strategy
│   └── DESIGN_SPEC.md         # Design system tokens, typography & colors
├── public/images/             # High-resolution property & avatar photos
├── src/
│   ├── components/            # Focused React components
│   │   ├── Amenities.tsx
│   │   ├── BookingCard.tsx
│   │   ├── CalendarSection.tsx
│   │   ├── Description.tsx
│   │   ├── Footer.tsx
│   │   ├── HeaderTitle.tsx
│   │   ├── HeroGrid.tsx
│   │   ├── HostDetails.tsx
│   │   ├── LightboxModal.tsx
│   │   ├── ListingOverview.tsx
│   │   ├── LocationSection.tsx
│   │   ├── Navbar.tsx
│   │   ├── NearbyStays.tsx
│   │   ├── PhotoTourModal.tsx
│   │   ├── ReviewsSection.tsx
│   │   ├── ShareModal.tsx
│   │   ├── SleepingArrangements.tsx
│   │   └── ThingsToKnow.tsx
│   ├── data/                  # Typed local listing dataset
│   │   └── listing.ts
│   ├── hooks/                 # Custom React hooks
│   │   ├── useClickOutside.ts
│   │   ├── useFocusTrap.ts
│   │   ├── useKeyboardNav.ts
│   │   ├── useLockBodyScroll.ts
│   │   └── useScrollSpy.ts
│   ├── types/                 # Strict TypeScript interfaces
│   │   └── index.ts
│   ├── utils/                 # Currency, date, and math helpers
│   │   └── formatters.ts
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── AGENTS.md                  # AI workflow & prompt history
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## ♿ Accessibility Features

- **Semantic HTML5:** Built using `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, and `<footer>` elements.
- **Focus Management:** Custom `useFocusTrap` hook traps Tab focus inside active dialogs (Photo Tour, Lightbox, Amenities, Reviews, Reserve).
- **Keyboard Navigation:** Native support for `Escape`, `ArrowLeft`, and `ArrowRight` key shortcuts.
- **Reduced Motion Support:** CSS keyframe animations respect `@media (prefers-reduced-motion: reduce)`.
