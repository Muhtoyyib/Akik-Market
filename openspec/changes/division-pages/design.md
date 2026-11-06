## Context

See [proposal.md](./proposal.md). Home already has every building block these pages need: the hero media box, card rows, the Featured now carousel and item card, the trust rows, the story box and the Visit us block. The shared layout and content modules come from `site-shell`.

## Goals / Non-Goals

**Goals:** one template, three content modules; a business's page differs from the others only in content and in its one specific section; every action reaches that business's own WhatsApp.

**Non-goals:** see the proposal.

## Decisions

### D1. One template, content per business

- **Chosen:** one view for the three pages that takes a division's content. The division-specific section is chosen by the division key.
- **Alternatives considered:** three separate page views.
- **Dropped:** three views. They would drift apart, and every fix would land three times.

### D2. Reuse Home's components, moved to shared when reused

- **Chosen:** the item card and carousel, trust rows, story box and visit block move from `src/features/home/` to `src/components/` as this change starts using them (second feature, per the code-style rule).
- **Alternatives considered:** copying them into `src/features/division/`.
- **Dropped:** copies. They are the same behaviour and must stay in step.

### D3. Stock comes from the listings collection

- **Chosen:** the stock row shows this business's items from the shared listings collection, at most eight, newest first. "See all" goes to the Listings page filtered to this business once it exists (Homes and Cars only; the Listings page doesn't show phones), else WhatsApp.
- **Alternatives considered:** a separate featured list per page.
- **Dropped:** separate lists (site-shell D4).

### D4. Financing left out until confirmed

- **Chosen:** the Autos financing block renders only when the content says financing is offered. It ships switched off.
- **Alternatives considered:** a placeholder financing block, as other sections use.
- **Dropped:** a placeholder. A stand-in credit offer could mislead a buyer in a way stand-in copy elsewhere doesn't, so it waits for the owner's terms.

## Risks / Trade-offs

- **Wrong number on a business.** The number-to-business mapping is a guess. Mitigation: every number comes from site-wide content, so one fix corrects all pages; the placeholder report lists it.
- **Thin pages until the owner sends content.** Mitigation: placeholders read as real Akik content; the report shows what's missing.

## Open Questions

- Which WhatsApp number serves which business?
- Warranty length and terms for phones and laptops; trade-in and repair terms.
- Does Autos offer financing? With which partner, on what terms?
- What construction services does Engineering offer (building, renovation, supervision)?
