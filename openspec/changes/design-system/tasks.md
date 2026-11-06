## 1. Tokens and fonts

- [x] 1.1 Add the colour, radius, spacing, type and motion tokens to `src/styles/app.css` as Tailwind theme variables. Proof: a unit test that parses `app.css` and checks every token in the colour spec is defined with its value.
- [x] 1.2 Add the `data-division` accent mechanism. Proof: a browser test that a label inside `[data-division="autos"]` computes to `#3C5A2A`.
- [x] 1.3 Force the light scheme. Proof: a browser test with `prefers-color-scheme: dark` emulated still computes the body background to `#F6F4F0`.
- [x] 1.4 Self-host Geist and Geist Mono with a metric-matched fallback. Proof: built `dist/client` contains the font files and no request goes to a third-party font host (network check in a browser test).
- [x] 1.5 Add a contrast test over every text/background token pair named in the colour spec. Proof: the test fails if a token change drops a pair below its ratio.

## 2. Rule files

- [x] 2.1 Write `.agents/rules/design-tokens.md`, `spacing.md`, `typography.md` and `icons.md`, pointing at the specs and `app.css` without repeating values. Proof: the files exist and `AGENTS.md` lists them.

## 3. Components

- [x] 3.1 Button: four variants, link versus button element, focus ring, states, touch target. Proof: Testing Library tests per variant and element; a browser test for the focus ring and 44px target.
- [ ] 3.2 Section header: structure, alignment, eyebrow colour, eyebrow not a heading. Proof: Testing Library tests, including the heading list.
- [ ] 3.3 Media box: shape, image or video, pause control, scrim, caption below, reduced motion. Proof: browser tests for pause and play, reduced-motion emulation and reserved dimensions.
- [ ] 3.4 Card: three variants, whole-card link, equal heights, hover without movement. Proof: Testing Library tests for the single link and its name; a browser test for equal heights.
- [ ] 3.5 Pill tabs: tab semantics, arrow, Home and End keys, sideways track on narrow screens. Proof: Testing Library keyboard tests; a browser test at 360px for no page overflow.
- [ ] 3.6 Run axe in browser tests for every component. Proof: zero violations.

## 4. Review

- [ ] 4.1 Build a hidden `/design-system` preview route that renders every token and component, for the client lead to review; it is not linked or listed in the sitemap. Proof: screenshots at 1440 and 390px attached to the PR.
- [ ] 4.2 Mutation testing on any helpers in `src/lib`. Proof: Stryker score at or above the break threshold.
