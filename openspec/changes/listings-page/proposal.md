## Why

Home's Featured now shows up to eight items per business. Buyers looking for a house or a car want to see everything currently available in one place before they message. The real shops (with ordering) are separate apps scoped later; until then this page is the full preview, and every item leads to a WhatsApp conversation with the right business.

## What Changes

- A new page at `/listings` with tabs for Homes and Cars, a grid of every listed item of that kind, and an enquiry per item.
- The Engineering and Autos pages' "See all" links, and Home's Featured now "See all" for Homes and Cars, flip to this page with the right tab selected.

## Sources per section

| Section     | Source                                                                     | Why                                                          |
| ----------- | -------------------------------------------------------------------------- | ------------------------------------------------------------ |
| page header | Matic P3, carrying the `h1`                                                | Same opening as every section                                |
| tabs        | Our pill tabs, as on Home's Featured now                                   | Homes / Cars switch in place                                 |
| grid        | Krea media card (captured, frame 1), in a grid instead of a carousel       | Same card as Featured now, so items look the same everywhere |
| enquiry     | Each card's WhatsApp link, plus Matic P8 rows explaining what happens next | One tap to ask; the rows set expectations                    |

**Outline approval:** the client lead asked for these specs on 2026-11-06. The outline still needs their sign-off before building, per `docs/design-reference/README.md`.

## Non-goals

- Phones. The sitemap scopes this page to properties and vehicles; phones stay on Home and the Phones page.
- Ordering, reserving, payment or stock counts (the shop apps' job).
- Search, price filters or sorting. Revisit when stock passes about 30 items per tab.
- Item detail pages.

## Business facts and placeholders

| Fact                              | Status      | Source                                      |
| --------------------------------- | ----------- | ------------------------------------------- |
| Items, prices, details and photos | Placeholder | Shared listings collection; owner to supply |
| "What happens next" steps         | Placeholder | —                                           |

## Capabilities

### New Capabilities

- `listings/page`: route, metadata, header and the links into the page.
- `listings/tabs`: Homes / Cars switch with a shareable selection.
- `listings/grid`: every item of the selected kind.
- `listings/enquiry`: how each item is asked about and what happens next.

### Modified Capabilities

None.

## Impact

- `src/routes/listings.tsx`, `src/features/listings/`, `src/lib/content/listings.ts` (already the shared collection from site-shell).
- Reuses the item card moved to shared components by `division-pages`.
