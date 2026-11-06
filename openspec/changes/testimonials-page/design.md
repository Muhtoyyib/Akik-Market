## Context

See [proposal.md](./proposal.md). Home's proof and stories sections already have one lead quote, three columns and three stories, all placeholders. Site-shell moves them into a shared stories collection.

## Goals / Non-Goals

**Goals:** every story and quote in one place, filterable by business, and no real customer shown without permission.

**Non-goals:** see the proposal.

## Decisions

### D1. Permission recorded with each real quote

- **Chosen:** a real quote or story in the collection carries the date the customer agreed and who recorded it. A unit test fails if a real (non-placeholder) item lacks it.
- **Alternatives considered:** trusting the owner's word at handover.
- **Dropped:** that alone, because the permission would be lost when content is edited later.

### D2. One quote style

- **Chosen:** the wall reuses Home's proof column (top border, quote, mono source line) in a grid.
- **Alternatives considered:** a masonry wall of varied cards.
- **Dropped:** masonry. It reorders content for screen readers and keyboard users, and mixed card styles fight the house style.

## Risks / Trade-offs

- **The page is all placeholders until the owner collects quotes.** Mitigation: first names only, no faces; the report lists every item; the client lead approved placeholders for the pitch.

## Open Questions

- Can the owner collect quotes and permission from customers who bought from more than one business?
