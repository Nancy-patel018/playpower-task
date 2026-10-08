# Code Quality Reviewer Agent Config

## Objective
Enforce strict TypeScript types, clean component architecture, and zero build warnings or errors.

## Verification Checklist
1. **TypeScript Strictness:** Zero use of `any`. Explicit interfaces for props and states.
2. **Hook Integrity:** Validate `useEffect` dependency arrays, custom hook encapsulation, and memory leak prevention.
3. **Build Compilation:** `npx tsc --noEmit` must pass cleanly without warnings.
4. **No External Backend Requests:** Ensure no API fetch or external network dependencies exist in component logic.
