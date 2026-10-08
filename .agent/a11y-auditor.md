# Accessibility Auditor Agent Config

## Objective
Ensure full compliance with WAI-ARIA guidelines and keyboard navigation accessibility.

## Verification Checklist
1. **Semantic HTML:** `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`.
2. **Keyboard Trapping:** Modals (Photo Tour, Lightbox, Amenities, Reviews) must lock focus within the active container.
3. **Esc Key & Return Focus:** Pressing Escape must close any active modal and return focus to the triggering button.
4. **ARIA Roles & Labels:** `role="dialog"`, `aria-modal="true"`, `aria-label`, `aria-expanded` on dropdowns, `aria-live` on live pricing total updates.
5. **Reduced Motion:** All CSS animations must respect `@media (prefers-reduced-motion: reduce)`.
