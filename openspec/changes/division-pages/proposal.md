## Why

Home sends each visitor to one of three businesses, but today the division links fall back to WhatsApp because the pages don't exist. A visitor who wants a car has to trust a chat with no page behind it. Each business needs its own page that shows what it sells, how buying works and how to reach the right person.

## What Changes

- Three pages from one template, at the sitemap paths: `/phones-and-gadgets`, `/engineering`, `/autos`.
- Template sections, top to bottom: hero, offer, stock, how buying works, one division-specific section, a customer story, and a contact block. Each in the division's accent.
- Division-specific sections: trade-ins, repairs and warranty for Phones; construction services and a Projects banner for Engineering; the inspection report for Autos (financing only once the owner confirms it is offered).
- Home's division cards and featured "See all" links flip from WhatsApp to these pages automatically (Home design D3).

## Sources per section

| Section                    | Source                                                                          | Why                                                                          |
| -------------------------- | ------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| hero                       | Matic P2                                                                        | The division's footage leads, the promise and one WhatsApp pill sit below it |
| offer                      | Matic P3 + P4                                                                   | A card row of what this business sells, the same pattern as Home's divisions |
| stock                      | Krea, media card carousel (captured, frame 1), as built for Home's Featured now | Real items with prices, one tap to ask about each                            |
| how-buying-works           | Matic P8                                                                        | Icon rows answer "how does buying from you work?" step by step               |
| phones (trade-in, repairs) | Matic P8 rows, two columns                                                      | Service promises read as rows, like the buy block                            |
| engineering (projects)     | Matic P7                                                                        | Banner into the Projects page                                                |
| autos (inspection)         | Matic P8 rows                                                                   | The inspection checklist reads as rows                                       |
| story                      | Matic P6, single story without tabs                                             | One customer of this business                                                |
| contact-block              | Obvious, closing block (captured, frame 11), as built for Home's Visit us       | Akik's customers visit or message; the page ends on that                     |

**Outline approval:** the client lead asked for these specs on 2026-11-06. The outline above still needs their sign-off before building, per `docs/design-reference/README.md`.

## Non-goals

- Ordering, payment, stock counts or delivery booking. Those belong to each business's own shop app on its subdomain, scoped later.
- Phone brand logos. Brand marks are trademarks and the icon rules forbid copied SVGs; brands are named in text.
- Financing details or rates until the owner confirms Autos offers financing and on what terms.
- A full listings browser; that is the Listings page.

## Business facts and placeholders

| Fact                                               | Status              | Source                                                                      |
| -------------------------------------------------- | ------------------- | --------------------------------------------------------------------------- |
| Business names and paths                           | Real                | Client lead; `docs/marketing-sitemap.md`                                    |
| Shop at Iwo Road Shopping Complex, Ibadan          | Real                | Owner's Instagram bio                                                       |
| WhatsApp numbers per business                      | Placeholder mapping | Owner's 2023 flyer lists two numbers; which business each serves is unknown |
| What each business sells, services, warranty terms | Placeholder         | —                                                                           |
| Trade-in, repair and inspection terms              | Placeholder         | —                                                                           |
| Financing                                          | Left out            | Owner hasn't said it is offered                                             |
| Footage, photos, stock, prices, stories            | Placeholder         | —                                                                           |

## Capabilities

### New Capabilities

- `divisions/page-template`: section order, accent, metadata and what is shared by the three pages.
- `divisions/hero`: media box, page heading, WhatsApp pill and reassurance line.
- `divisions/offer`: what the business sells, as a card row.
- `divisions/stock`: items from the listings collection for this business.
- `divisions/how-buying-works`: the buying steps as icon rows.
- `divisions/story`: one customer story for this business.
- `divisions/contact-block`: how to reach this business.
- `divisions/phones`: trade-ins, repairs and warranty.
- `divisions/engineering`: construction services and the Projects banner.
- `divisions/autos`: the inspection report, and financing once confirmed.

### Modified Capabilities

None.

## Impact

- `src/routes/phones-and-gadgets.tsx`, `engineering.tsx`, `autos.tsx`; `src/features/division/` for the template and its sections.
- `src/lib/content/divisions/*.ts`, one module per business.
- `src/lib/site-pages.ts`: the three paths.
- Depends on `site-shell`. Reuses Home's media box, item card, carousel, trust rows, story box and visit block where they fit.
