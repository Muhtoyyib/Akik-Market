## Context

See [proposal.md](./proposal.md). Home is built on the design-system change (tokens, button, section header, media box, card, pill tabs), which must be built first. Sources per section are in the proposal; Matic patterns are described in `docs/design-reference/matic-layout-study.md`, and the two lookup components were captured on 2026-11-06 (`docs/design-reference/screenshots/lookup/`).

## Goals / Non-Goals

**Goals:** one component per section under `src/features/home/`; all business content in one typed source so the owner's facts replace placeholders in one place; a pitch build that looks complete with placeholders and never links to a missing page.

**Non-goals:** see the proposal.

## Decisions

### D1. Plain swipe rows, no pinned sideways scrolling

- **Chosen:** card rows (divisions on mobile, featured items, news on mobile) are native horizontal scroll with snap points, plus arrow buttons on desktop where the row overflows.
- **Alternatives considered:** Matic's pinned row that moves sideways as the page scrolls down.
- **Dropped:** pinned scrolling. It hijacks the scroll wheel, is hard to make keyboard- and screen-reader-friendly, needs heavy scroll scripting, and frustrates people scrolling quickly on phones, which is most of Akik's traffic.
- **Evidence:** client lead accepted the recommendation on 2026-11-06.

### D2. Placeholders in one marked content source

- **Chosen:** a typed content module for Home where any value can be wrapped as a placeholder. A small script lists every placeholder by section; it runs in CI as a report, not a failure.
- **Alternatives considered:** leaving sections out until facts arrive (the original rule). The client lead needs a complete-looking pitch, so this was changed on 2026-11-06.
- **Dropped:** placeholder text written straight into components. It can't be found or reported, and it's what the anti-slop rules exist to stop.
- **Evidence:** client lead's instruction, "add it now with a nice placeholder… put 2023".

### D3. Missing pages: link to something real

- **Chosen:** until a page exists, its links are replaced by the closest real action: WhatsApp to the right business (divisions, featured, projects banner), Instagram (news), or nothing (founder's "Read our story", header and footer page links).
- **Alternatives considered:** linking to the future paths and returning a 404; hiding the sections.
- **Dropped:** both. A 404 in a pitch looks broken; hiding sections makes Home look thin.
- **How:** the content source knows which pages exist (from `src/lib/site-pages.ts`), so a link flips to the real page automatically when that page ships.

### D4. Krea carousel for featured items, Obvious closing block for Visit us

- **Chosen:** these two sections use lookup-site components (captured, not from memory).
- **Alternatives considered:** a Krea "card grid with filters". Recalled from memory, but the capture showed Krea has no such grid; corrected in `docs/design-reference/README.md`.
- **Rebuilt, not copied:** both are built from our media box, tokens and pill tabs.

### D5. WhatsApp as the main action

- **Chosen:** every primary action opens WhatsApp to the right business with a prefilled message.
- **Alternatives considered:** a contact form. No backend exists for Home, and WhatsApp is how Akik already sells (numbers on the flyer, Instagram contact).
- **Evidence:** the owner's flyer lists WhatsApp numbers; no form backend is in scope.

## Risks / Trade-offs

- **Placeholders shipped to the public.** Mitigation: the placeholder report is shown in every PR; the owner reviews it before launch.
- **Placeholder media that looks like stock.** Mitigation: use the owner's Instagram photos where he allows, otherwise neutral photos of products and buildings, never people presented as customers.
- **2023 may be wrong.** The owner's Instagram has posts from May 2020. Flagged to the client lead; one value to change.
- **Video weight on mobile data.** Mitigation: imagery spec limits; posters first; no autoplay under reduced motion.

## Open Questions

- Real WhatsApp numbers per business: the flyer lists two numbers; which belongs to which business?
- Owner's vector logo.
- Does the owner have customer videos and permission to use them?
