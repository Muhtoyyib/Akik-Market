## Why

The sitemap lists a privacy policy and terms. The site itself stores no personal data (the Contact form opens WhatsApp or email; see `contact-page` design D1), but visitors and search engines expect both pages, and the footer's Legal column needs somewhere to point. Legal text can't be invented: it must come from the owner or his lawyer.

## What Changes

- Two pages, `/privacy` and `/terms`, sharing one document layout: heading, last-updated date, a contents list and the text in sections.
- A publication rule: a legal page is built only once its text is marked real. Until then it isn't listed for prerendering, and the footer's Legal column stays hidden.

## Sources per section

| Section         | Source                                                                            | Why                                                                                 |
| --------------- | --------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| document layout | House style: typography spec's readable line length; the news post article layout | Long text needs a calm reading column; nothing visual to borrow from the references |

**Outline approval:** the client lead asked for these specs on 2026-11-06. The outline still needs their sign-off before building, per `docs/design-reference/README.md`.

## Non-goals

- Writing the legal text. The owner or his lawyer supplies it.
- A cookie banner. The site sets no cookies and loads no trackers; one is needed only if analytics are added.
- Refund, warranty or delivery policies for the shops. Those belong to each business's shop app.

## Business facts and placeholders

| Fact                                                     | Status                            | Source                                                                     |
| -------------------------------------------------------- | --------------------------------- | -------------------------------------------------------------------------- |
| Privacy policy text                                      | Not supplied                      | Owner or his lawyer                                                        |
| Terms text                                               | Not supplied                      | Owner or his lawyer                                                        |
| Registered company number shown in the logo (RC 3067479) | Real, needs confirming before use | Owner's flyer logo; confirm the legal entity name before the terms name it |

## Capabilities

### New Capabilities

- `legal/document`: the shared layout for a legal page.
- `legal/privacy`: what the privacy page must cover.
- `legal/terms`: what the terms page must cover.
- `legal/publication`: the rule that keeps a legal page unpublished until its text is real.

### Modified Capabilities

None.

## Impact

- `src/routes/privacy.tsx`, `src/routes/terms.tsx`, `src/features/legal/`, `src/lib/content/legal.ts`.
- The prerender list reads the publication rule.
