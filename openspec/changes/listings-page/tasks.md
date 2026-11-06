## 1. Page

- [x] 1.1 Route, view, `/listings` in `site-pages.ts`, metadata. Proof: build outputs `listings.html`; unit test of title and description.
- [x] 1.2 Tabs with `?type=`. Proof: Testing Library tests for no tabs with one kind, shared links and unknown values.
- [x] 1.3 Grid and count line. Proof: unit test that every item shows (no limit of eight) and of singular and plural counts; browser test of 4, 3, 2 and 1 columns.
- [x] 1.4 Enquiry links and next steps. Proof: unit test of the prefilled message per business.

## 2. Links and quality

- [x] 2.1 "See all" links on Home, Engineering and Autos flip to `/listings?type=…`; Phones links unchanged. Proof: unit tests of the flip.
- [x] 2.2 Engineering and Autos offer cards link to `/listings?type=…` for the categories it lists (division-pages offer spec, "Cards are not links" until a destination exists). Proof: Testing Library test that only cards with a destination link.
- [x] 2.3 axe at 1440 and 390px. Proof: zero violations.
- [ ] 2.4 Screenshots and the placeholder report for the client lead.
