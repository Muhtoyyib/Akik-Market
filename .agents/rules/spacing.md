---
trigger: always_on
description: Spacing, page frame and grid rules for the Akik landing app.
---

# Spacing Rules

Source: `openspec/changes/design-system/specs/design-system/spacing-and-layout/spec.md`.

- Spacing follows the scale in the spec. In Tailwind's 4px units that means the steps 1, 2, 3, 4, 5, 6, 8, 10, 12, 14, 16, 20, 24 and 36 (`gap-6` is 24px). No half steps (`p-1.5`), no other numbers, no arbitrary values.
- Every page section sits in the shared page frame (max width and side gutters from the spec). Only the full-bleed exceptions listed in the spec may break out of it.
- Space between sections comes from the section rhythm in the spec, set once on the section wrapper, not from margins on the content inside.
- Lay out with the column grid and the breakpoints in the spec. Do not add breakpoints; `2xl` is switched off.
- A one-off value needs a comment naming the spec line that allows it.
