## 1. Content and placeholders

- [ ] 1.1 Create the typed Home content source with a placeholder marker, including start year 2023, division numbers, quotes, stories, featured items, news, counters and the address. Proof: unit tests for the content types and the start year appearing in every field that uses it.
- [ ] 1.2 Add the placeholder report script and run it in CI as a report. Proof: unit test that a marked value is listed and an unmarked one is not.
- [x] 1.3 Add the "page exists" lookup driving link fallbacks (D3). Proof: unit tests that a link flips from WhatsApp or Instagram to the page path when the page is added to `site-pages.ts`.
- [ ] 1.4 Add placeholder media to `public/` within the imagery spec's size limits. Proof: build output sizes checked by the bundle and asset budget.

## 2. Page shell

- [ ] 2.1 Compose the twelve sections in order under `/`, leaving out empty ones. Proof: Testing Library test of section order and of an empty section being left out.
- [x] 2.2 Landmarks and skip link. Proof: Testing Library landmark test; browser test of the skip link moving focus.
- [ ] 2.3 Metadata and `LocalBusiness` structured data from the content source. Proof: unit test of the head output and structured data values.

## 3. Header

- [x] 3.1 Announcement bar. Proof: tests for present, empty and truncated cases.
- [ ] 3.2 Navigation, current page, WhatsApp link, mobile menu. Proof: Testing Library tests; browser test for Escape, focus return and focus containment.
- [ ] 3.3 Floating pill. Proof: browser test that it appears after the header leaves view and isn't focusable when hidden.

## 4. Sections

- [x] 4.1 Hero. Proof: tests for the single `h1`, actions and reassurance wrapping; browser test of 16:9 and 4:5 boxes.
- [x] 4.2 Divisions. Proof: tests for order, accent per card and WhatsApp fallback; browser test of the swipe row at 390px with no page overflow.
- [x] 4.3 Featured now: tabs and item cards. Proof: keyboard tests for tabs; tests for the prefilled WhatsApp message, price-on-request and the 8-item cap; browser test for disabled arrows at the ends.
- [x] 4.4 Proof section. Proof: tests for quote markup, emphasis and column order.
- [ ] 4.5 Customer stories. Proof: tests that switching tabs stops playback and that photo-only stories have no play button.
  - Photo-only stories, tabs and markup built and tested. Open: play with sound, captions and stop-on-switch need the owner's footage; building them now would be code nothing calls.
- [x] 4.6 Projects banner. Proof: test of the WhatsApp fallback link and its accessible name.
- [x] 4.7 Buy with confidence. Proof: tests for row order and hidden icons.
- [ ] 4.8 News. Proof: tests for newest-first, date markup and the Instagram fallback.
- [ ] 4.9 Founder. Proof: tests for arrow names and the start year in the paragraph; browser test under reduced motion.
- [ ] 4.10 Visit us. Proof: tests for directions link, phone formats and agreement with structured data.
- [ ] 4.11 Footer: counters, link columns, wordmark. Proof: tests for figure labels, left-out columns, safe social links, build-time year and the wordmark hidden from assistive technology.

## 5. Quality

- [ ] 5.1 axe in browser tests for Home at 1440 and 390px. Proof: zero violations.
- [ ] 5.2 Lighthouse mobile run on the built page. Proof: LCP at most 2.5s and CLS below 0.1, report attached to the PR.
- [ ] 5.3 Stryker on changed `src/lib` code. Proof: score at or above the break threshold.
- [ ] 5.4 Screenshots of Home at 1440 and 390px and the placeholder report attached to the PR for the client lead.
