## 1. Page

- [ ] 1.1 About content module with placeholders marked; chapter years read from site-wide facts. Proof: unit tests that the phones chapter uses the start year and every unconfirmed value is a placeholder.
- [ ] 1.2 Route, view and `/about` in `site-pages.ts`. Proof: Testing Library test of section order and of the team section being left out when empty; build outputs `about.html`.
- [ ] 1.3 Metadata. Proof: unit test of title and description.

## 2. Sections

- [ ] 2.1 Founder. Proof: one `h1`; the name line reads "Founder, Akik" while it's a placeholder; browser test of the photo stack at both widths.
- [ ] 2.2 Timeline. Proof: Testing Library test of the ordered list; browser test of alternating sides at 1440px and stacking at 390px.
- [ ] 2.3 Values. Proof: browser test of two columns and one column.
- [ ] 2.4 Team. Proof: Testing Library tests that it renders only with real people.
- [ ] 2.5 Closing banner and contact block. Proof: Testing Library test of the banner's fallback heading.

## 3. Quality

- [ ] 3.1 Home's "Read our story", the header and the footer link to `/about`. Proof: unit test of the flip.
- [ ] 3.2 axe at 1440 and 390px. Proof: zero violations.
- [ ] 3.3 Screenshots and the placeholder report for the client lead.
