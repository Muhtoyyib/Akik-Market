## Context

See [proposal.md](./proposal.md). Project pages come from the shared projects collection (site-shell D2, D3). Each project has a slug, a type, a name, an area, a year, a headline figure, a story and photos.

## Goals / Non-Goals

**Goals:** a buyer can scan every finished project, filter by type, and read one in full with its facts and photos; every project page is static HTML.

**Non-goals:** see the proposal.

## Decisions

### D1. Filtering on the page, not by path

- **Chosen:** the filter tabs switch the grid in place; the selected tab is kept in the query string (`?type=homes`) so a filtered link can be shared and the back button works. The prerendered page shows "All".
- **Alternatives considered:** one path per type (`/projects/homes`).
- **Dropped:** paths per type. They would clash with project slugs, and three or four types don't need their own pages.

### D2. One headline figure per card

- **Chosen:** each card shows one big figure with a short mono label (for example "12 · UNITS", "4 · BEDROOMS"), as in the Obvious case-study card.
- **Alternatives considered:** a list of facts on each card.
- **Dropped:** fact lists. The cards would get dense; the detail page carries the full facts.

### D3. Related projects: same type first

- **Chosen:** related projects are the three newest of the same type, excluding the current one; with fewer than three of the same type, the newest of any type fill the gap.

## Risks / Trade-offs

- **Stand-in projects could read as Akik's real work.** Mitigation: placeholder photos have empty alt text and show no signage or addresses; names and stories are placeholders in the report; the client lead approved placeholders for the pitch on 2026-11-06.

## Open Questions

- Which finished projects can be shown, with what photos and facts?
- Project types: buildings, estates, land, deliveries? (The sitemap mentions "big deliveries".)
