# Design references

How to choose the layout and components for any page section.

## Order of precedence

1. **Matic (first choice): https://maticrobots.com.** Consider a Matic pattern (P1–P11 in `matic-layout-study.md`) first for every section. Its boxes, spacing and motion are the house style for the whole site.
2. **Lookup sites (equal options per section).** A section may use a lookup-site component whenever it fits that section's content better than the Matic pattern. Pages should mix sources where it helps; no page has to come from one site. Name the site and the component in the outline and spec, and rebuild it in the house style.

| Site                | Look here for                                                                                                                                  |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| https://stripe.com  | Navigation with dropdowns, feature rows, logo strips, blog cards, footers                                                                      |
| https://lumalabs.ai | Full-bleed video heroes, media-led sections                                                                                                    |
| https://flora.ai    | Tabbed galleries, canvas-style showcases                                                                                                       |
| https://www.krea.ai | Media card carousel with captions over the image and round arrows (captured, frame 1); bento grid of mixed stat and image tiles (frame 2)      |
| https://huly.io     | Scroll-revealed timelines, product tours, dense feature grids                                                                                  |
| https://rive.app    | Interactive showcases, animated tabs                                                                                                           |
| https://obvious.ai  | Closing block: full-width photo box, centred heading, one pill (captured, frame 11); case-study cards with a big before/after figure (frame 6) |

3. **Never copy** copy, images, icons, logos or exact compositions from any of these. Take the direction and rebuild it with Akik's tokens (`openspec/changes/design-system`).

## Process for each page

1. Outline the page section by section. For each section give the best-fitting source (Matic pattern or lookup-site component) and why, with the runner-up where the choice is close.
2. The client lead approves the outline or swaps components.
3. Capture any lookup-site component before specifying it; don't rely on memory of a site.
4. Write the page spec: `openspec/changes/<page>-page/specs/<page>/<section>/spec.md`, with a sub-folder per part when a section is large.

## Files here

- `matic-layout-study.md`: the Matic patterns P1–P11 with measurements.
- `palette-options.html`: the palette and font preview the client lead chose from (palette A, Geist).
- `screenshots/`: local captures (git-ignored). `screenshots/lookup/` holds lookup-site frames and contact sheets, captured 2026-11-06.
