## 1. Collection and routes

- [ ] 1.1 Projects collection (slug, type, name, area, year, figure, story, photos), placeholders marked. Proof: unit tests for unique slugs and required fields.
- [ ] 1.2 Index and detail routes; one prerendered path per project. Proof: build outputs `projects.html` and one HTML file per project.
- [ ] 1.3 Metadata for both pages, with `BreadcrumbList` on detail pages. Proof: unit tests of the head output.

## 2. Index

- [ ] 2.1 Header and grid of cards. Proof: Testing Library test that each card is one link named after its project; browser test of 3, 2 and 1 columns.
- [ ] 2.2 Filters with `?type=`. Proof: Testing Library tests for hidden tabs with one type, shared links and unknown types.

## 3. Detail

- [ ] 3.1 Hero with back link. Proof: one `h1`; back link goes to `/projects`.
- [ ] 3.2 Facts and story. Proof: Testing Library test that missing facts are left out.
- [ ] 3.3 Gallery. Proof: Testing Library test that it's left out with one photo and that placeholder photos have empty alt.
- [ ] 3.4 Related. Proof: unit test of the selection rule (same type first, never the current project).
- [ ] 3.5 Enquiry. Proof: unit test of the prefilled message.

## 4. Quality

- [ ] 4.1 Home's and the Engineering page's banners link to `/projects`. Proof: unit test of the flip.
- [ ] 4.2 axe on the index and one project at 1440 and 390px. Proof: zero violations.
- [ ] 4.3 Screenshots and the placeholder report for the client lead.
