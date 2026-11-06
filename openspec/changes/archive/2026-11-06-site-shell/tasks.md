## 1. Move without changing Home

- [x] 1.1 Move header, menu, floating pill, footer, frame, skip link and wordmark to shared components. Proof: Home's unit and browser tests pass with only import paths changed.
- [x] 1.2 Add the page layout (skip link, header, main, footer, division accent). Proof: Testing Library landmark test on two pages; browser test that the accent applies on a division page and not on About.
- [x] 1.3 Header page links for every page but Home: the built pages in sitemap order, current page marked (Home's header has neither; see the Home navigation spec). Proof: unit test that an unbuilt page has no link; Testing Library test that About's header marks About current and Home's header shows section links only.
- [x] 1.4 Collection item pages mark their collection's link current. Proof: unit test of the current-path rule.

## 2. Content

- [x] 2.1 Move site-wide facts to `src/lib/content/site.ts` and Home's content to `home.ts`. Proof: existing content tests pass against the new modules.
- [x] 2.2 Move featured items, news posts and stories into shared collections; Home reads them through its existing rules. Proof: unit tests that removing an item removes it from Home's output.
- [x] 2.3 Placeholder report across every content module, grouped by page, run in CI as a report (closes Home task 1.2). Proof: unit test that a marked value is listed under its page and an unmarked one is not.

## 3. Metadata and registration

- [x] 3.1 Shared page head helper (title pattern, description, link-preview tags). Proof: unit tests of the head output for a page and for a collection item.
- [x] 3.2 Prerender list from static pages plus collection slugs; `pageExists` reads it. Proof: unit tests that a new item's path is listed and that duplicate slugs fail.

## 4. 404

- [x] 4.1 404 page and host configuration. Proof: Testing Library test of its heading and links; `wrangler.jsonc` serves it for unknown paths, checked with `wrangler dev` returning 404.
