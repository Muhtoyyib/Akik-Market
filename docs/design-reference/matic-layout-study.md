# Matic layout study

What we take from maticrobots.com's homepage, and where each pattern goes on the Akik site. We take the direction (layout, boxes, rhythm, motion), never the assets, copy or exact compositions. See `.agents/rules/content.md`.

- **Captured:** 2026-11-06, headless Chromium at 1440×900 (desktop) and 390×844 (mobile). Popups and the cookie banner were hidden or ignored; nothing was accepted.
- **Screenshots:** `docs/design-reference/screenshots/` (local only, git-ignored). Frame names are in brackets below, e.g. `[desktop-07]`.
- **Evidence labels:** **measured** = read from computed styles; **seen** = visible in a frame; **inferred** = concluded from frames, not checked in the code.

## 1. The frame every section sits in

| Property               | Value                                                                    | Label                |
| ---------------------- | ------------------------------------------------------------------------ | -------------------- |
| Page background        | warm off-white (stylesheet tokens `#f2f2f0` / `#f6f5f3`)                 | seen, token measured |
| Side gutter            | 64px desktop, 16px mobile                                                | measured / seen      |
| Content width          | 1312px at a 1440px viewport (full width minus gutters, no max-width cap) | measured             |
| Space between sections | 144px                                                                    | measured             |
| Box corner radius      | 24px for media and cards, 32px for the largest boxes                     | measured             |
| Buttons                | fully round pills (`9999px`), near-black `#1f2022` fill, white text      | measured             |
| Shadows                | none on boxes; edges come from colour and radius alone                   | seen                 |

The look comes from one idea used everywhere: **rounded boxes on a warm off-white page, inside the same gutter, with a lot of space between them.**

## 2. Type

| Role                                | Size / line height       | Weight | Tracking  | Label    |
| ----------------------------------- | ------------------------ | ------ | --------- | -------- |
| Hero headline                       | 80 / 96px                | 400    | −1.2px    | measured |
| Section heading (h2)                | 36 / 40px                | 600    | −1.44px   | measured |
| Card heading (h3)                   | 22 / 26px                | 600    | −0.44px   | measured |
| Body                                | 16 / 22px                | 400    | normal    | measured |
| Small print                         | 13 / 18px, 12 / 16px     | 400    | normal    | measured |
| Eyebrow / labels / dates / counters | mono, 13–16px, uppercase | 500    | about −3% | measured |

Grotesk for everything readable, mono only for labels, dates, prices and numbers. Headings are sentence case and tightly tracked.

## 3. Section patterns, top to bottom

### P1. Announcement bar + header `[desktop-00]`

A one-line link centred above the header, with a hairline divider under it. Header: wordmark left, plain text links right, one black pill CTA.
**On scroll** the header collapses into a small floating white pill, top right, holding only the menu icon and the CTA pill `[desktop-01..13]` (seen).

### P2. Hero media box `[desktop-00, desktop-01]`

One 16:9 media box (1312×738, radius 24) inside the gutter. **Below it, not on top of it:** a huge centred headline, one pill CTA and a small grey reassurance line with dot separators ("6 months to decide · Free shipping & returns").

### P3. Section header `[desktop-01, desktop-10]`

Mono uppercase eyebrow, then a centred h2. Used before every major section.

### P4. Media card carousel `[desktop-01, desktop-02, mobile-01]`

Tall media cards (about 606px wide on desktop, radius 24) in a row that bleeds off the right edge, so the next card peeks in. The caption sits **under** the box: black title, grey body. A round pause button sits bottom left inside the media.
On desktop the row is **pinned and moves sideways as you scroll down** (the section is 4,556px tall for one row of cards). On mobile it is a plain swipe row with a peek. (inferred from section height and frames)

### P5. Press quote + three-column proof `[desktop-06, desktop-07]`

One large centred quote with a phrase highlighted in an accent colour, a logo under it. Then a three-column grid, each column with a hairline top border, a short quote, a logo and a mono caption ("REVIEWED 9/10 · 2025").

### P6. Testimonial video box with tabs `[desktop-07, desktop-08, mobile-03]`

Full-width media box (radius 24). Overlay, bottom left: mono name and "customer since" line, then a large white quote and a round play button. A dark translucent **segmented pill** at the bottom centre switches the story (Families / Pet owners / Busy homes / Time saved). On mobile the text centres.

### P7. Banner with an inset link card `[desktop-08, desktop-09]`

Full-width photo box (radius 32) with a white card (radius 24) inset on the right: mono eyebrow, heading and an arrow. The whole card is one link.

### P8. Buy block `[desktop-09, desktop-10, mobile-05]`

Two columns on a 12-column grid. Left: product image over thin line-drawn arcs. Right: heading, price with an info icon, then rows of **icon + title + grey line**, then the pill CTA. Stacks on mobile with a full-width pill.

### P9. Blog grid `[desktop-10, desktop-11]`

P3 header, then three image cards (radius 24) with the mono date and a white title over the bottom of the image. A text link with a small round arrow icon follows ("More behind the scenes updates →").

### P10. Founders `[desktop-11, desktop-12]`

A small stacked photo carousel centred, with round outline arrow buttons on each side. Under it: centred h2, a short paragraph and a text link with the round arrow.

### P11. Footer box `[desktop-12, desktop-13]`

The footer is **itself a big coloured box** (deep teal, radius 32) inside the gutter. Top left: live counters in large mono digits with tiny mono labels. Then link columns, a newsletter field with an underline only, and a giant wordmark cropped by the bottom edge.

## 4. What changes on mobile `[mobile-00..08]`

- Gutter drops to 16px; radii stay the same, so boxes look rounder.
- Carousels become swipe rows with the next card peeking in.
- Multi-column grids stack; pills go full width.
- The floating header pill (CTA + menu) stays top right.

## 5. Where each pattern goes on Akik

| Matic pattern             | Akik use                                                                                                             | Page(s)                   |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| P1 announcement + header  | Latest news line (new stock, a handover). Floating pill on scroll with the menu and a **Contact / WhatsApp** pill    | All                       |
| P2 hero media box         | One looping montage across the three businesses, brand promise below, one pill CTA, reassurance line from real facts | Home, each division page  |
| P3 section header         | Every section; the mono eyebrow can carry the division name                                                          | All                       |
| P4 media card carousel    | "Three businesses, one name" on Home; project and stock highlights on division pages                                 | Home, divisions, Projects |
| P5 quote + three columns  | Customer quotes, or "by the numbers" once the owner supplies figures. Skip until then                                | Home, Testimonials        |
| P6 video box with tabs    | Customer stories, **tabs = Phones / Homes / Cars**. Strongest fit on the site                                        | Home, Testimonials        |
| P7 banner with inset card | Links into each division page and into Projects                                                                      | Home, About               |
| P8 buy block              | "How buying works": icon rows for inspection, paperwork, delivery or handover, then a CTA                            | Division pages, Listings  |
| P9 blog grid              | News                                                                                                                 | Home, News                |
| P10 founders              | The founder's story, short on Home and full on About                                                                 | Home, About               |
| P11 footer box            | Coloured footer box. Counters only with real numbers from the owner                                                  | All                       |

**Division colour:** Matic uses one accent per surface. We do the same: one accent per division (used in the eyebrow, highlights and that division's footer box), all on the same off-white page.

## 6. Leave out

- The sweepstakes popup and the cookie banner design (a consent choice comes later, if analytics are added).
- Payment logos in the footer: the hub sells nothing.
- Any copy, imagery, icons or the wordmark treatment as-is.

## 7. Open decisions for you

1. **Pinned sideways scrolling (P4) on desktop**, or a plain swipe row everywhere? Pinned looks impressive but is heavier to build and test and can annoy people scrolling quickly. My recommendation is a plain swipe row first.
2. **Fonts.** Matic's grotesk and mono are commercial (licence not checked). Free stand-ins: Geist or Inter Tight with Geist Mono. Or the client licenses a pair.
3. **Division colours.** Pick three accents (one per business) plus the footer colour.
4. **Video.** P2, P4 and P6 depend on short clips. Ask the owner what footage exists.
