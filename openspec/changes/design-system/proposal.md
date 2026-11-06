## Why

Every page spec that follows (Home first) needs a shared visual language to point at: colours, type, spacing, shapes, motion, media and a handful of core components. Without it each page invents its own values and the site drifts. The direction is agreed: Matic's layouts and boxes (`docs/design-reference/matic-layout-study.md`), Akik's own brand colours, and the choices the client lead made on 2026-11-06 (palette A, Geist + Geist Mono).

## What Changes

- Define the design tokens: colour (brand, surfaces, text, one accent per division), type scale, spacing and layout grid, radius and borders, motion.
- Define rules for icons and for imagery and video.
- Define five core components every page reuses: button, section header, media box, card, pill tabs.
- Add agent rule files that point at the tokens so agents can't invent values: `design-tokens.md`, `spacing.md`, `typography.md`, `icons.md`.
- Put the tokens in `src/styles/app.css` as the single source.

## Non-goals

- Page layouts and page sections: each page gets its own change (`home-page` next).
- Components picked from the reference sites (lumalabs.ai, flora.ai, krea.ai, huly.io, rive.app, obvious.ai, stripe.com). They are chosen per section during each page's outline and specified in that page's change.
- Dark mode. The site is light only for v1 (see design.md, D3).
- A logo redesign. The current wordmark is used as supplied by the owner.

## Business facts used, with sources

- Brand navy and red: measured from Akik's 2023 Instagram flyer ("Your No.1 Gadgets Plug"); navy about `#003060`, red about `#C00000`, a teal tab about `#0C849C`.
- Three divisions: the client lead, confirmed by the owner's TikTok bio ("Auto · Property · Gadget Plug").

## Capabilities

### New Capabilities

- `design-system/color`: brand, surface, text and border tokens, plus one accent per division and how a page or section takes on a division's accent.
- `design-system/typography`: font families, the type scale for desktop and mobile, and when to use the mono face.
- `design-system/spacing-and-layout`: spacing scale, page gutters, maximum width, section rhythm, breakpoints and the column grid.
- `design-system/shape-and-elevation`: corner radii, borders and the no-shadow rule.
- `design-system/motion`: durations, easing, allowed hover feedback and reduced-motion behaviour.
- `design-system/iconography`: icon set, sizes, stroke and the round icon button.
- `design-system/imagery-and-media`: aspect ratios, video loops and their controls, loading and alt text.
- `design-system/components/button`: primary, secondary, on-dark and text-link buttons.
- `design-system/components/section-header`: eyebrow plus heading block that opens most sections.
- `design-system/components/media-box`: the rounded image or video box with optional overlay content.
- `design-system/components/card`: content card, inset link card and division card.
- `design-system/components/pill-tabs`: segmented pill control that switches content.

### Modified Capabilities

None. No specs exist yet.

## Impact

- `src/styles/app.css`: tokens added through Tailwind's theme.
- New dependencies: Geist and Geist Mono font files (self-hosted), an icon package.
- `.agents/rules/`: four new rule files; `AGENTS.md` lists them.
- Lint already blocks raw colours, inline styles and unknown arbitrary values, so the tokens become the only way to style.
