---
trigger: always_on
description: Icon rules for the Akik landing app.
---

# Icon Rules

Source: `openspec/changes/design-system/specs/design-system/iconography/spec.md`.

- Use Lucide only (`lucide-react`). Import each icon by name; no other icon packs, no copied SVGs from reference sites.
- Sizes and stroke come from the spec; pass them as `size` and `strokeWidth` props. Icons inherit colour from the text (`currentColor`); do not colour an icon on its own.
- An icon next to text that says the same thing is decorative: `aria-hidden`.
- An icon-only control is a round icon button as described in the spec, with an accessible name and a 44px touch target. Name it for what it does ("Next project"), not what it shows ("Arrow").
