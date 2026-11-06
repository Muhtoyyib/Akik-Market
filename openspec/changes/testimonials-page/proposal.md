## Why

Akik's pitch is that people buy a phone, then a car, then a house from the same name. Home shows one quote per business and three stories. A Testimonials page gathers every story and quote, so a cautious buyer can read what customers of the business they're considering say.

## What Changes

- A new page at `/testimonials`: the story box with tabs, a lead quote with three columns, a wall of every quote filterable by business, and an invitation to share a story on WhatsApp.
- Customer stories and quotes move into one shared collection (per site-shell), read by Home, the division pages and this page.

## Sources per section

| Section     | Source                                                                                                             | Why                                                     |
| ----------- | ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------- |
| page header | Matic P3, carrying the `h1`                                                                                        | Same opening as every section                           |
| stories     | Matic P6 video box with tabs, as built for Home's Customer stories                                                 | Strongest fit for customer stories                      |
| quote wall  | Matic P5 lead quote and three columns, then the same column style repeated in a grid, with our pill tabs to filter | One style for every quote; tabs keep a long wall usable |
| share       | Obvious closing block (captured, frame 11)                                                                         | Ends on one action                                      |

**Outline approval:** the client lead asked for these specs on 2026-11-06. The outline still needs their sign-off before building, per `docs/design-reference/README.md`.

## Non-goals

- Star ratings or review scores, or Google reviews embedded. None are supplied, and embeds add third-party scripts.
- A form to submit reviews.
- Customer surnames, faces or locations without permission.

## Business facts and placeholders

| Fact                                                    | Status      | Source                                                                                            |
| ------------------------------------------------------- | ----------- | ------------------------------------------------------------------------------------------------- |
| Customer stories, quotes, first names, "customer since" | Placeholder | Invented stand-ins with first names only; to be replaced by the owner's customers with permission |
| Customer footage                                        | Placeholder | Stills with no faces                                                                              |

## Capabilities

### New Capabilities

- `testimonials/page`: route, section order, metadata and consent rules for real quotes.
- `testimonials/stories`: the story box with tabs.
- `testimonials/quote-wall`: the lead quote, the three columns and the full wall of quotes.
- `testimonials/share`: the invitation to share a story.

### Modified Capabilities

None.

## Impact

- `src/routes/testimonials.tsx`, `src/features/testimonials/`, `src/lib/content/stories.ts`.
- Reuses Home's story box and proof columns (moved to shared components here or by an earlier page).
