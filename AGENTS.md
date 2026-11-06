# Akik Landing

## Project Overview

The marketing hub for Akik, a business that grew from phones and gadgets into engineering and real estate, then autos.

This app tells the brand story and points people to each division. It is **not** a store:

- ordering phones, buying vehicles and buying houses or land will live in separate apps on their own subdomains (for example `autos.<domain>`), scoped later from the owner's requirements
- the production domain is not decided; do not hardcode one

Agreed page list: `docs/marketing-sitemap.md`. Design direction: maticrobots.com's layouts and boxes, adapted, never copied (see `.agents/rules/content.md`).

## Repository Structure

- `src/routes` — TanStack Router route files, one per page
- `src/features/<page>` — the view and page-specific components for each route
- `src/components` — components shared by two or more features
- `src/lib` — site config, page list and pure helpers
- `src/styles` — global styles and design tokens
- `docs` — sitemap and design references
- `openspec` — specs and change proposals
- `.agents/rules` — the rule files listed below

## Technology Stack

- TypeScript (strict, `noUncheckedIndexedAccess`)
- Bun for packages, Vite+ (`vp`) for dev, build, lint, format and test
- React 19 with the React Compiler
- TanStack Start + TanStack Router, prerendered to static HTML
- Tailwind CSS 4
- Oxlint (complexity caps, `--max-warnings=0`) + Oxfmt
- Vitest + Testing Library, Vitest Browser Mode with Playwright, Stryker for mutation testing
- Lefthook for git hooks
- Vercel static hosting for the prerendered output (`vercel.json`)

## Commands

```bash
vp run dev                   # Start locally on port 5180
vp run build                 # Build and typecheck
vp run lint                  # Oxlint, zero warnings
vp fmt                       # Format with oxfmt
vp run typecheck             # TypeScript only
vp test --run                # Unit and component tests
vp run test:coverage         # Tests with coverage floors
vp run test:browser          # Real-browser component tests
vp run stryker:incremental   # Mutation testing on changed code
vp run doctor                # React Doctor on changed files
vp run ci:build              # The full gate CI runs
```

Git hooks (`lefthook.yml`): pre-commit runs `vp check --fix`, formatting and related tests on staged files; pre-push runs the typecheck and react-doctor.

## Rule Files

- `.agents/rules/anti-slop.md`
- `.agents/rules/code-style.md`
- `.agents/rules/content.md`
- `.agents/rules/tdd.md`
- `.agents/rules/testing.md`
- `.agents/rules/commits.md`
- `.agents/rules/design-tokens.md`
- `.agents/rules/spacing.md`
- `.agents/rules/typography.md`
- `.agents/rules/icons.md`

Read them before adding structure, content or UI. Numbers that config enforces (lint caps, coverage floors, mutation thresholds) live in config only: `vite.config.ts`, `vitest.shared.ts`, `stryker.config.mjs`.

## Claims

Label every conclusion in a summary or commit message as measured, verified against source, inferred or assumed. A task is done only with evidence: the passing test or a checkable artifact.
