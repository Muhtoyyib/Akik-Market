## Why

Akik sells on trust in one name. Home tells the short version of how a phone shop became three businesses; the About page tells the full story, so a visitor about to buy land or a car from Akik for the first time knows who is behind it. Home's founder section links here ("Read our story") once the page exists.

## What Changes

- A new page at `/about`, in this order: founder, timeline, values, team (only with the owner's real people), projects banner, and the closing contact block.
- Home's "Read our story" link, the header and the footer's Company column start linking to `/about`.

## Sources per section

| Section         | Source                                                                                       | Why                                                                                                                        |
| --------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| founder         | Matic P10 (stacked photo carousel, story below), as built for Home's founder, at full length | The founder is the brand; the long version of Home's section                                                               |
| timeline        | House style: section header and an ordered list of chapters with mono years                  | Three chapters don't need a scrolling timeline; Huly's timeline would need capturing first and adds motion for little gain |
| values          | Matic P8 rows                                                                                | Short promises read best as icon rows                                                                                      |
| team            | Matic P4 card row                                                                            | One card per person with their photo and role                                                                              |
| projects banner | Matic P7, as built for Home                                                                  | Leads into the work                                                                                                        |
| closing         | Obvious closing block (captured, frame 11), as built for Home's Visit us                     | The page ends at the shop                                                                                                  |

**Outline approval:** the client lead asked for these specs on 2026-11-06. The outline still needs their sign-off before building, per `docs/design-reference/README.md`.

## Non-goals

- Careers or job listings (dropped from the sitemap at the client lead's request).
- Press, awards or partner logos. None have been supplied, and they can't be placeholders.
- Stand-in team members.

## Business facts and placeholders

| Fact                                                                             | Status                  | Source                                                                  |
| -------------------------------------------------------------------------------- | ----------------------- | ----------------------------------------------------------------------- |
| Order the businesses began: phones, then engineering and real estate, then autos | Real                    | Client lead                                                             |
| Start year 2023 and the year each business began                                 | Placeholder             | Client lead asked for 2023; the owner's Instagram goes back to May 2020 |
| Founder's name, photos and story                                                 | Placeholder             | —                                                                       |
| Values                                                                           | Placeholder             | —                                                                       |
| Team names, roles and photos                                                     | Left out until supplied | —                                                                       |

## Capabilities

### New Capabilities

- `about/page`: route, section order, metadata and links into the page.
- `about/founder`: the founder's photos and full story.
- `about/timeline`: the chapters from phones to engineering to cars.
- `about/values`: what Akik promises, as icon rows.
- `about/team`: the people, only once supplied.
- `about/closing`: the projects banner and the contact block that end the page.

### Modified Capabilities

None.

## Impact

- `src/routes/about.tsx`, `src/features/about/`, `src/lib/content/about.ts`.
- `src/lib/site-pages.ts`: `/about`.
- Reuses Home's photo stack, trust rows, projects banner and visit block (moved to shared components by `division-pages` or here, whichever is built first).
