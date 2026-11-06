## Why

Home is the first page people see from Akik's Instagram and TikTok, and the page the owner will judge the pitch on. It has to tell one story: a business that started with phones and grew into engineering, real estate and cars, all under one trusted name. Then it has to send each visitor to the right business. The design system (`openspec/changes/design-system`) gives the tokens and core components; this change specifies the page.

## What Changes

- Replace the scaffold home (heading plus division list) with the full Home page at `/`.
- Twelve sections, each with its own spec, in this order: header, hero, divisions, featured-now, proof, customer-stories, projects-banner, buy-with-confidence, news, founder, visit-us, footer. A page-shell spec covers composition, landmarks, metadata and placeholders.
- Large sections are split into parts with their own specs: header (announcement bar, navigation, floating pill), featured-now (tabs, item card) and footer (counters, link columns, wordmark).
- Card rows are plain swipe rows on every screen size (no pinned sideways scrolling).
- All business content comes from one typed content source. Until the owner supplies facts, marked placeholders stand in (approved by the client lead on 2026-11-06), including the start year **2023**.

## Sources per section

Matic is the first choice and sets the house style; two sections use lookup-site components because Matic has nothing like them (see `docs/design-reference/README.md`).

| Section             | Source                                                 | Why                                                                                                    |
| ------------------- | ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| header              | Matic P1                                               | Announcement bar plus header that shrinks to a floating pill keeps WhatsApp one tap away while reading |
| hero                | Matic P2                                               | Media box with the headline under it lets the owner's footage lead                                     |
| divisions           | Matic P3 + P4                                          | Card row with captions under the media suits three equal businesses                                    |
| featured-now        | Krea, media card grid with filters, plus our pill tabs | Matic has no product listing; a tabbed card grid shows items from each business                        |
| proof               | Matic P5                                               | Big quote plus three columns maps one column to each business                                          |
| customer-stories    | Matic P6                                               | Video box with tabs, tabs = Phones / Homes / Cars                                                      |
| projects-banner     | Matic P7                                               | Full-width building photo with one inset link                                                          |
| buy-with-confidence | Matic P8                                               | Icon rows answer "can I trust this seller?"                                                            |
| news                | Matic P9                                               | Three-card post grid                                                                                   |
| founder             | Matic P10                                              | Photo carousel plus short story, the core of the brand                                                 |
| visit-us            | Obvious, closing contact block                         | Matic ends on buying online; Akik's customers visit a physical shop                                    |
| footer              | Matic P11                                              | Navy box, counters, links, giant wordmark                                                              |

## Non-goals

- Other pages. They get their own changes; Home links to their paths from `docs/marketing-sitemap.md`, and links to pages that don't exist yet are left out until those pages ship.
- Ordering, payment, accounts or listings data from a database. Featured items come from the content source.
- A CMS, analytics or a cookie banner.
- Translations.

## Business facts and placeholders

| Fact                                                                 | Status      | Source                                 |
| -------------------------------------------------------------------- | ----------- | -------------------------------------- |
| Three businesses: Phones & Gadgets, Engineering & Real Estate, Autos | Real        | Client lead; owner's TikTok bio        |
| Shop at Iwo Road Shopping Complex, Ibadan                            | Real        | Owner's Instagram bio                  |
| Brand colours                                                        | Real        | Owner's 2023 flyer (see design-system) |
| Start year 2023, year each business began                            | Placeholder | Client lead asked for 2023             |
| Customer quotes, names, "customer since"                             | Placeholder | —                                      |
| Counters, opening hours, WhatsApp numbers per business               | Placeholder | —                                      |
| Footage, photos, featured items, prices, news posts                  | Placeholder | —                                      |

## Capabilities

### New Capabilities

- `home/page-shell`: route, section order, landmarks, skip link, metadata, content source and placeholder report.
- `home/header/announcement-bar`: one-line news link above the header.
- `home/header/navigation`: wordmark, links to Home's sections, WhatsApp pill and the mobile menu.
- `home/header/floating-pill`: the compact header that appears on scroll.
- `home/hero`: video box, page heading, actions and reassurance line.
- `home/divisions`: the three-business card row.
- `home/featured-now/tabs`: the Phones / Homes / Cars switch for featured items.
- `home/featured-now/item-card`: one featured phone, property or car.
- `home/proof`: big quote and three columns.
- `home/customer-stories`: video box with tabs.
- `home/projects-banner`: banner with inset link card.
- `home/buy-with-confidence`: trust rows and action.
- `home/news`: three latest posts.
- `home/founder`: photo carousel and short story.
- `home/visit-us`: shop location, contacts per business, hours.
- `home/footer/counters`: figures in the footer box.
- `home/footer/link-columns`: links, social accounts and legal line.
- `home/footer/wordmark`: the giant cropped wordmark.

### Modified Capabilities

None.

## Impact

- `src/routes/index.tsx` and `src/features/home/`: the scaffold view is replaced by one component per section.
- `src/lib/`: a typed content source for Home with placeholder markers, and a placeholder report.
- `public/`: placeholder media until the owner's footage arrives.
- Depends on the design-system change being built first.
