## Why

Home was built as the only page, so its header, footer, frame and content live under `src/features/home/` and `src/lib/home-*.ts`. Every other page needs the same header, footer, contact facts and placeholder rules. This change moves what is shared into one place before the second page is built, so the page changes that follow (`division-pages`, `about-page`, `projects-pages`, `listings-page`, `news-pages`, `testimonials-page`, `contact-page`, `legal-pages`) only add their own sections.

## What Changes

- Move the header (announcement bar, navigation, menu, floating pill), footer, page frame, skip link and wordmark from `src/features/home/` to shared components, used by every page through one page layout.
- Split content: site-wide facts (businesses, numbers, address, social accounts, start year, footer) in one module; each page's own content in its own module; shared collections (listings, projects, news posts, customer stories and quotes) in their own modules, read by Home and by the pages that list them.
- One way to set each page's title, description and link-preview tags, plus structured data for page types that have it.
- One way to register a page so it is prerendered, including pages generated from a collection (`/projects/$slug`, `/news/$slug`).
- A 404 page.
- Extend the placeholder report to every content module.

## Non-goals

- Any new page section. Each page change adds its own.
- Changing how Home looks. Home must render the same before and after (its tests keep passing unchanged, apart from import paths).
- A sitemap.xml, canonical URLs or an og:image: all need the production domain, which isn't decided.
- A CMS. Content stays in typed modules.

## Business facts and placeholders

No new facts. Existing facts and their sources move with the content (see `openspec/changes/home-page/proposal.md`).

## Capabilities

### New Capabilities

- `site/page-layout`: skip link, header, main and footer on every page, current page marking and the division accent.
- `site/content-source`: where site-wide, per-page and shared content lives, placeholder marking and the report.
- `site/page-metadata`: per-page title, description, link-preview tags and structured data.
- `site/page-registration`: how a page is listed for prerendering and how collection pages get their paths.
- `site/not-found`: the 404 page.

### Modified Capabilities

None. Home's specs stay as they are; this change moves code, not behaviour.

## Impact

- `src/features/home/header/*`, `footer/*`, `frame.tsx`, `skip-link.tsx` move to `src/components/site-shell/` (or similar), per `.agents/rules/code-style.md` ("move a component to `src/components` only when a second feature uses it").
- `src/lib/home-divisions.ts`, `home-footer.ts`, `site-nav.ts` and parts of `home-content.ts` move to `src/lib/content/`.
- `src/routes/__root.tsx` gains the 404 component; `wrangler.jsonc` serves it for unknown paths.
- Every later page change depends on this one.
