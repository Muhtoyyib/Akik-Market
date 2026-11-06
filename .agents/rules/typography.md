---
trigger: always_on
description: Font and type-scale rules for the Akik landing app.
---

# Typography Rules

Source: `openspec/changes/design-system/specs/design-system/typography/spec.md`. Implemented as `type-*` utilities in `src/styles/app.css`.

- Set text with one `type-*` utility (`type-display`, `type-h2`, `type-h3`, `type-quote`, `type-body-lg`, `type-body`, `type-small`, `type-label`, `type-figure`). Do not combine `text-*` sizes, `leading-*`, `tracking-*` or `font-*` weights to build a new style.
- The utility sets the look, the element sets the meaning: an `h2` may use `type-h3` if the outline needs it. Each page has exactly one `h1`, and heading levels never skip.
- Eyebrow labels use `type-label` and are not headings.
- Prices, dates, counters and other data use Geist Mono (`type-label` or `type-figure`).
- Keep body text to the readable line length in the spec.
- Fonts are self-hosted from Fontsource with measured fallbacks in `app.css`. Never load a font from a third-party host; a browser test checks this.
