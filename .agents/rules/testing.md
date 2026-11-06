---
trigger: always_on
description: Testing standards for the Akik landing app.
---

# Testing Standards

## Pick the right test

- Pure helpers and config in `src/lib`: Vitest unit tests.
- What a user sees and can do: Testing Library, querying by role and label, not class names.
- Layout, focus, media, scroll and motion: Vitest Browser Mode (`*.browser.test.tsx`). jsdom is not a browser.
- Accessibility: axe checks in browser tests for every page.

## File locations

- `src/lib/__tests__/*` for helper and config tests
- `src/features/<page>/__tests__/*` and `src/components/**/__tests__/*` for component tests

## Rules

- Test behaviour, not markup trivia. "Renders without crashing" is not a test.
- Coverage floors and mutation thresholds live in `vitest.shared.ts` and `stryker.config.mjs`. Raise them when coverage improves; never lower one to get a change through.
- Run `vp run stryker:incremental` on changed `src/lib` code and add the assertion behind every surviving mutant.
