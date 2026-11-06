## 1. Collection and page

- [x] 1.1 Shared stories and quotes collection with permission records. Proof: unit test that a real item without permission fails, and that placeholders use first names only.
- [x] 1.2 Route, view, `/testimonials` in `site-pages.ts`, metadata. Proof: build outputs `testimonials.html`; Testing Library test of section order.

## 2. Sections

- [x] 2.1 Stories with tabs. Proof: tests that switching tabs stops playback and tab labels add first names when a business has several stories. (Labels tested; every placeholder story is a photo, so playback is tested when the first video arrives.)
- [x] 2.2 Photo wall (quote-wall spec). Proof: unit test of the tile layout (34 tiles, customers spread evenly); Testing Library tests of choosing a customer and of muted tiles hidden from assistive technology; browser tests that tiles fit a 390px phone with 44px targets and that photos fill most of the section.
- [x] 2.3 Share block. Proof: unit test of the prefilled message.

## 3. Quality

- [x] 3.1 axe at 1440 and 390px. Proof: zero violations.
- [ ] 3.2 Screenshots and the placeholder report for the client lead.
