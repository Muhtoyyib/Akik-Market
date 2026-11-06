## Why

The owner already posts stock arrivals, finished buildings and car deliveries on Instagram. Home shows the latest three as cards that fall back to Instagram because there's no News page. A News section on the site keeps those updates findable by search and lets Home's cards open real posts.

## What Changes

- `/news`: a page heading, filter tabs by business, and a grid of every post, newest first.
- `/news/<slug>`: one page per post with the date, business, heading, photo, body, related posts and an action.
- Home's news cards link to their posts and "Follow us on Instagram" becomes "More news" once the pages exist (Home news spec, "Links").

## Sources per section

| Section      | Source                                                                    | Why                                                                        |
| ------------ | ------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| index header | Matic P3, carrying the `h1`                                               | Same opening as every section                                              |
| filters      | Our pill tabs                                                             | Phones / Homes / Cars posts, as on Home's other tabbed sections            |
| post grid    | Matic P9 blog grid, as built for Home's News                              | Same cards as Home                                                         |
| article      | House style: typography spec's readable line length, media box for photos | A post is mostly text; none of the references' article pages were captured |
| related      | Matic P9 cards, three                                                     | Keeps the visitor reading                                                  |
| action       | Matic P7 banner with inset link card                                      | Leads from a post to the business it's about                               |

**Outline approval:** the client lead asked for these specs on 2026-11-06. The outline still needs their sign-off before building, per `docs/design-reference/README.md`.

## Non-goals

- Pulling posts from Instagram automatically (needs an API token and a backend).
- Comments, likes, share buttons or an RSS feed.
- Pagination. Revisit past about 24 posts.

## Business facts and placeholders

| Fact                                    | Status      | Source                                                                          |
| --------------------------------------- | ----------- | ------------------------------------------------------------------------------- |
| Posts, dates, titles, bodies and photos | Placeholder | Written to match what the owner posts on Instagram; to be replaced by his posts |

## Capabilities

### New Capabilities

- `news/index/header`: the page heading and intro.
- `news/index/filters`: tabs by business.
- `news/index/post-grid`: every post as a card.
- `news/post/article`: a post's heading, date, photo and body.
- `news/post/related`: other posts.
- `news/post/action`: the link from a post to its business.

### Modified Capabilities

None. Home's news spec already describes the link flip.

## Impact

- `src/routes/news.index.tsx`, `src/routes/news.$slug.tsx`, `src/features/news/`.
- `src/lib/content/news.ts` (the shared collection, already read by Home) gains a business and a body per post.
