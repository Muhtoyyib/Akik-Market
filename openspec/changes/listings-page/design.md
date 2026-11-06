## Context

See [proposal.md](./proposal.md). The listings collection (site-shell D2, D4) already feeds Home and the division pages. This page shows all of it for homes and cars.

## Goals / Non-Goals

**Goals:** every home and car on one page; the same card as everywhere else; one tap to the right business.

**Non-goals:** see the proposal.

## Decisions

### D1. Tab in the query string

- **Chosen:** `?type=homes` or `?type=cars` selects the tab; the prerendered page shows Homes. Links from the Autos page use `?type=cars`.
- **Alternatives considered:** `/listings/homes` and `/listings/cars`.
- **Dropped:** separate paths. Two tabs don't need two pages, and the sitemap lists one path.

### D2. WhatsApp per item, not a form

- **Chosen:** each card opens WhatsApp to its business with the item's name in the message, as on Home.
- **Alternatives considered:** an enquiry form per item (the sitemap says "an enquiry form or WhatsApp").
- **Dropped:** the form for now, because there's no form backend; the Contact page's decision on forms applies here when it lands (see `contact-page` design D1).

## Risks / Trade-offs

- **Stale stock.** A sold car stays listed until the content is edited. Mitigation: one collection edit removes it everywhere (site-shell content-source, "Shared collections").

## Open Questions

- How will the owner keep stock current: edits by the developer, or a simple admin later?
