# AI-Assisted Workflow & Development Rules

This document outlines the workflow, coding standards, subagent definitions, and AI prompt sequences utilized in building this Airbnb clone.

---

## Coding Rules & Standards
1. **Strict TypeScript:** No `any` types permitted. All components, props, hooks, state reducers, and utility functions must be strictly typed.
2. **Modular Component Hierarchy:** Components are kept small, focused, and organized by domain inside `src/components/`.
3. **Accessibility First (a11y):** All interactive controls are native `<button>` or `<a>` elements with proper `aria-labels`, visible focus states, focus trapping inside dialogs, keyboard navigation (Arrow keys, Esc, Tab), and screen-reader status announcements (`aria-live`).
4. **Zero Backend Dependencies:** Pure client-side application utilizing React state, local data files (`src/data/listing.ts`), and `localStorage` persistence.

---

## Sub-Agent Configurations

### 1. UI Fidelity Reviewer (`.agent/ui-fidelity-reviewer.md`)
- **Role:** Inspects rendered DOM and screenshot artifacts against the reference site (`https://airbnb-clone-umber-two.vercel.app`).
- **Focus:** Verifies 1440px desktop alignment, font stack, color contrast, gap spacing, hover scale effects, sticky header transitions, and photo gallery crops.

### 2. Accessibility Auditor (`.agent/a11y-auditor.md`)
- **Role:** Audits HTML semantics and keyboard navigation.
- **Focus:** Ensures proper `role="dialog"`, `aria-modal="true"`, focus traps, Esc key handling, `prefers-reduced-motion` compliance, and alt text on all property photos.

### 3. Code Quality Reviewer (`.agent/code-quality-reviewer.md`)
- **Role:** Validates TypeScript strictness, custom hook encapsulation, clean state management, and build compilation.
- **Focus:** Prevents memory leaks, ensures proper dependency arrays in `useCallback` / `useMemo`, and runs `npx tsc --noEmit`.

---

## Sequence of Prompts Used

1. **Phase 1 - Inspection & Token Definition:**
   > "Inspect reference site https://airbnb-clone-umber-two.vercel.app at 1440px width. Extract colors, typography, shadows, radii, image URLs, and layout structure into docs/DESIGN_SPEC.md. Configure tailwind.config.js."

2. **Phase 2 - Architecture & Foundation:**
   > "Setup React 18 + Vite + TypeScript + Tailwind CSS project with zero backend dependencies. Create typed data model in src/data/listing.ts and custom hooks for lock body scroll, focus trap, keyboard navigation, click outside, and scroll spy."

3. **Phase 3 - Component Implementation:**
   > "Build listing page header, hero photo grid, overview, host details, amenities modal, dual-month calendar, sticky booking card with live calculation, reviews with laurel wreath header, map section, house rules, and nearby stays carousel."

4. **Phase 4 - Modals & Overlays:**
   > "Build full-screen Photo Tour gallery modal and Lightbox single photo viewer with keyboard ArrowLeft/ArrowRight navigation, focus trap, Esc handling, image counter, and preloading."

5. **Phase 5 - QA & Verification:**
   > "Execute strict TypeScript check and build verification (`npx tsc --noEmit` and `npm run build`). Perform UI parity and accessibility pass."
