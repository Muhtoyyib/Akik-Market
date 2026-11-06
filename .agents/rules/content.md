---
trigger: always_on
description: Rules for copy, imagery and design references in the Akik landing app.
---

# Content Rules

## Business facts

- Every figure, date, location, project and testimonial must come from the owner. Note the source in the spec or commit.
- Until a fact is supplied, leave the section out. Do not ship stand-in numbers or lorem ipsum.
- Keep each division's facts in config, not scattered through components.

## Copy

- Short, confident, plain sentences. Say what the customer gets.
- No filler: "world-class", "cutting-edge", "seamless", "unlock", "elevate", "in today's fast-paced world".
- Calls to action point at something real today (WhatsApp, phone, social accounts, enquiry form). Never an "Order now" that leads nowhere.

## Design reference

- Matic (maticrobots.com) is the primary reference: every section starts from a Matic pattern (P1–P11 in `docs/design-reference/matic-layout-study.md`).
- The lookup sites in `docs/design-reference/README.md` are used only where Matic has no pattern or the client lead asks; name the site and component in the spec.
- Take the direction, never the assets: no copied copy, images, icons, logos or exact page compositions.
- Fonts must be licensed for this project or free (for example from Fontsource).
- Capture a lookup-site component before specifying it; don't rely on memory of the site.
