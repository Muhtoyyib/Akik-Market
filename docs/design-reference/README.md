# Design references

How to choose the layout and components for any page section.

## Order of precedence

1. **Matic (primary): https://maticrobots.com.** Every section starts from a Matic section pattern (P1–P11 in `matic-layout-study.md`). Use its layout, boxes, spacing and motion, adapted to Akik's tokens and content.
2. **Lookup sites (secondary).** Use only when Matic has no pattern for what a section needs, or the client lead asks for a specific component. Name the site and the component in the page outline and spec.

| Site                | Look here for                                                             |
| ------------------- | ------------------------------------------------------------------------- |
| https://stripe.com  | Navigation with dropdowns, feature rows, logo strips, blog cards, footers |
| https://lumalabs.ai | Full-bleed video heroes, media-led sections                               |
| https://flora.ai    | Tabbed galleries, canvas-style showcases                                  |
| https://www.krea.ai | Media card grids, galleries, filters                                      |
| https://huly.io     | Scroll-revealed timelines, product tours, dense feature grids             |
| https://rive.app    | Interactive showcases, animated tabs                                      |
| https://obvious.ai  | Contact and closing CTA blocks                                            |

3. **Never copy** copy, images, icons, logos or exact compositions from any of these. Take the direction and rebuild it with Akik's tokens (`openspec/changes/design-system`).

## Process for each page

1. Outline the page section by section. For each section give the Matic pattern it uses and, only if needed, a lookup-site alternative.
2. The client lead approves the outline or swaps components.
3. Capture any lookup-site component before specifying it; don't rely on memory of a site.
4. Write the page spec: `openspec/changes/<page>-page/specs/<page>/<section>/spec.md`, with a sub-folder per part when a section is large.

## Files here

- `matic-layout-study.md`: the Matic patterns P1–P11 with measurements.
- `palette-options.html`: the palette and font preview the client lead chose from (palette A, Geist).
- `screenshots/`: local captures (git-ignored).
