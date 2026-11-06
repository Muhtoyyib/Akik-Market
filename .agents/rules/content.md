---
trigger: always_on
description: Rules for copy, imagery and design references in the Akik landing app.
---

# Content Rules

## Business facts

- Every figure, date, location, project and testimonial must come from the owner. Note the source in the spec or commit.
- Until a fact is supplied, a placeholder may stand in (approved by the client lead on 2026-11-06 for the pitch build). Every placeholder lives in the content source, is marked as a placeholder there, and appears in the placeholder report. Never put a placeholder straight into a component.
- Placeholders must read as realistic Akik content, not lorem ipsum, and must not name real customers, real figures or press that doesn't exist.
- Keep each division's facts in config, not scattered through components.

## Copy

- Short, confident, plain sentences. Say what the customer gets.
- No filler: "world-class", "cutting-edge", "seamless", "unlock", "elevate", "in today's fast-paced world".
- Calls to action point at something real today (WhatsApp, phone, social accounts, enquiry form). Never an "Order now" that leads nowhere.

## Design reference

- Matic (maticrobots.com) is the first choice and sets the house style; consider its patterns (P1–P11 in `docs/design-reference/matic-layout-study.md`) first.
- Any section may use a component from the lookup sites in `docs/design-reference/README.md` when it fits better; pages mix sources. Name the source in the spec and rebuild it in the house style.
- Take the direction, never the assets: no copied copy, images, icons, logos or exact page compositions.
- Fonts must be licensed for this project or free (for example from Fontsource).
- Capture a lookup-site component before specifying it; don't rely on memory of the site.
