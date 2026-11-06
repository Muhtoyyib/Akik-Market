## Context

See [proposal.md](./proposal.md). The direction comes from three sources:

- `docs/design-reference/matic-layout-study.md`: Matic's layout rules, measured from their stylesheet (64px gutter, 144px section gap, 24/32px radii, pill buttons, no shadows, grotesk plus mono).
- Akik's 2023 Instagram flyer: navy about `#003060`, red about `#C00000`, a teal tab about `#0C849C` (measured by sampling the image).
- The client lead's choices on 2026-11-06 from `docs/design-reference/palette-options.html`: palette A and font pairing 1.

The app already lints against raw colours, inline styles and unknown arbitrary values (`vite.config.ts`), so once the tokens exist they are the only way to style.

## Goals / Non-Goals

**Goals:** one set of tokens in one file; five components that cover most sections; rules short enough that agents follow them.

**Non-goals:** see the proposal. Notably no dark mode, no page sections, no components from the reference sites yet.

## Decisions

### D1. Palette A: navy and red, one accent per division

- **Chosen:** palette A. Navy (`#0B3266`) carries the brand; red (`#B3122A`) only for small highlights; teal, clay and green as division accents.
- **Alternatives considered:** palette B, shades of navy, red and sand only. Tighter, but the three divisions are hard to tell apart once each has its own subdomain site.
- **Dropped:** using the flyer values exactly. `#003060` reads almost black at small sizes on the warm page and `#C00000` looks harsh next to it; both were shifted slightly (navy lighter, red a little deeper and cooler) while keeping their hue. The flyer teal was kept as the Phones accent at `#0A7489`. The preview used `#0C7C92`, but that measured 4.43:1 as label text on the page, below AA, so it was darkened one step to 4.94:1.
- **Evidence:** contrast ratios computed for every pair in `palette-options.html`, all at or above 4.54:1; the client lead's choice.

### D2. Geist and Geist Mono

- **Chosen:** Geist for text, Geist Mono for labels and figures, self-hosted.
- **Alternatives considered:** Inter Tight with Geist Mono. Very close in feel; Geist's mono partner matches its proportions exactly.
- **Dropped:** Matic's own faces (Mori Gothic, Trim Mono). Commercial, licence not checked, and copying their type would bring the site too close to theirs.
- **Known trade-off:** the design checker flags Geist as overused. The client lead chose it knowing that; the warm page, navy and the division accents carry the identity.
- **Evidence:** the client lead's choice; Geist is under the SIL Open Font Licence.

### D3. Light scheme only

- **Chosen:** light only for v1, forced even when the system prefers dark.
- **Alternatives considered:** a dark scheme from the same tokens. It doubles the visual QA on a media-heavy marketing site, and the owner's photos and the warm page are the look.
- **Evidence:** Matic (the reference) is light only; no request for dark mode from the client.

### D4. Tokens live in Tailwind's theme in `src/styles/app.css`

- **Chosen:** every token is a Tailwind theme variable, so it is both a utility class (`bg-brand-navy`) and a CSS variable.
- **Alternatives considered:** a separate tokens package as in Alvo. Alvo has several apps sharing tokens; this repo has one app. The division subdomain sites may later share them, and extracting then is cheap.
- **Division accent:** a `data-division` attribute on a container sets one `accent` variable that eyebrows and accent surfaces read. Changing the division never means changing component code.

### D5. Type scale adapted from Matic, not copied

- **Chosen:** display 80px, h2 40px, h3 22px, body 16/24px, mono label 13px, as in the typography spec.
- **Alternatives considered:** Matic's exact values (h2 36/40, body 16/22). Body line height goes to 24px for readability on long Engineering and Autos pages; h2 goes to 40px to suit Geist's narrower letters.

### D6. Icons

- **Chosen:** Lucide (rounded line icons, 1.5px stroke). The Rixl landing already uses it, so the team knows it.
- **Alternatives considered:** Hugeicons (used in Alvo). Larger set, but its free tier lacks some brand marks and it's another API to learn here.

## Risks / Trade-offs

- **Owner media quality.** The style depends on good photos and clips. Mitigation: the imagery spec says to leave a section out rather than fill it with stock; ask the owner early for footage.
- **Division accents on small text.** Teal at 4.94:1 on the page passes AA but not AAA. Mitigation: accents are used for labels and surfaces, not long text.
- **Geist is common.** Accepted by the client lead (D2).

## Open Questions

- Does the owner have a logo file (vector) beyond the flyer's wordmark?
- Pinned sideways-scrolling card rows versus plain swipe rows: decided per section in the page outlines (recommendation: plain swipe).
