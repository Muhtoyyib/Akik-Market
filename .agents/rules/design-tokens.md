---
trigger: always_on
description: How to use colour, radius, shadow and motion tokens in the Akik landing app.
---

# Design Token Rules

Values live in two places only: the specs in `openspec/changes/design-system/specs/design-system` and their implementation in `src/styles/app.css`. Change the spec first, then `app.css`; `src/styles/__tests__/tokens.test.ts` fails until both agree.

## Colour

- Use the theme colours only (`bg-page`, `text-ink`, `border-line` and so on). Tailwind's default palette is switched off, so `bg-blue-500` does not exist.
- Use `text-accent` / `bg-accent` for division colour, and set `data-division` once on the page or section container. Do not pick `text-autos` directly unless the element names a different division from its container (for example a division card in a group section).
- `brand-red` never fills anything larger than a button.
- Text on images or video sits on a scrim or surface (see `color/spec.md`, "Contrast").
- A new text and background pair gets a line in the token contrast tests.

## Shape and depth

- Radii: `rounded-sm`, `rounded-md`, `rounded-lg`, `rounded-full` only. Nested boxes step down one size (`shape-and-elevation/spec.md`).
- Separate boxes with colour and spacing, not shadows. `shadow-float` is for the floating header pill only.

## Motion

- Use the default transition (`transition-colors`, `transition-opacity`) and `ease-standard`. Timing rules are in `motion/spec.md`.
- Hover changes colour or opacity only: no lift, scale or jump (see `anti-slop.md`).
- The reduced-motion rule in `app.css` stops CSS motion; JavaScript-driven motion and autoplaying video must check `prefers-reduced-motion` themselves.

## Light only

The site has no dark theme. Do not add `dark:` variants. Browser tests run with the system set to dark to prove it.
