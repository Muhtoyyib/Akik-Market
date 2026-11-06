## Why

Engineering & Real Estate sells something people buy once in their lives. Buyers want to see buildings Akik has finished before they trust it with land or a house. Home's projects banner and the Engineering page point here, and fall back to WhatsApp until it exists.

## What Changes

- `/projects`: a page heading, filter tabs by project type and a grid of project cards.
- `/projects/<slug>`: one page per project with a hero, key facts, the story, a photo gallery, related projects and an enquiry block.
- A shared projects collection feeds both pages and Home's projects banner.

## Sources per section

| Section      | Source                                                        | Why                                                                      |
| ------------ | ------------------------------------------------------------- | ------------------------------------------------------------------------ |
| index header | Matic P3 section header, with the page `h1`                   | Same opening as every section                                            |
| filters      | Our pill tabs (design system), as used on Home's Featured now | Switch between project types without leaving the page                    |
| project card | Obvious case-study card with a big figure (captured, frame 6) | One headline figure (units, bedrooms, year) makes each project scannable |
| detail hero  | Matic P2 media box with the heading below                     | The building leads                                                       |
| facts        | Matic P8 rows, mono labels                                    | Location, year, type and size scan as label and value pairs              |
| gallery      | Matic P4 swipe row, as built for Home                         | More photos without a lightbox                                           |
| related      | Obvious case-study cards (frame 6), three                     | Keeps the visitor browsing                                               |
| enquiry      | Obvious closing block (frame 11), as built for Home           | Ends on contacting Engineering                                           |

**Outline approval:** the client lead asked for these specs on 2026-11-06. The outline still needs their sign-off before building, per `docs/design-reference/README.md`.

## Non-goals

- Units for sale inside a project, prices or availability. Those belong to the Engineering shop app.
- A map of project locations. Embedding a map loads third-party scripts and cookies; the area is named in text.
- A lightbox or zoom on gallery photos.

## Business facts and placeholders

| Fact                                                   | Status      | Source                                                              |
| ------------------------------------------------------ | ----------- | ------------------------------------------------------------------- |
| Projects, their names, areas, years, sizes and stories | Placeholder | —                                                                   |
| Project photos                                         | Placeholder | Neutral building photos, never presented as Akik's work in alt text |

## Capabilities

### New Capabilities

- `projects/index/header`: the page heading and intro.
- `projects/index/filters`: tabs by project type.
- `projects/index/project-card`: one project in the grid.
- `projects/detail/hero`: the project's main photo and heading.
- `projects/detail/facts`: location, year, type and size.
- `projects/detail/gallery`: more photos of the project.
- `projects/detail/related`: other projects.
- `projects/detail/enquiry`: how to ask about a project like this.

### Modified Capabilities

None.

## Impact

- `src/routes/projects.index.tsx`, `src/routes/projects.$slug.tsx`, `src/features/projects/`.
- `src/lib/content/projects.ts` (the collection) and the prerender list (one path per project, per site-shell).
- Home's projects banner and the Engineering page's banner flip to `/projects`.
