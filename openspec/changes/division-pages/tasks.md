## 1. Template and content

- [ ] 1.1 Content modules for the three businesses (offer, steps, specific section, metadata), placeholders marked. Proof: unit tests for each module's shape and that every promise is a placeholder.
- [ ] 1.2 Move Home's item card and carousel, trust rows, story box and visit block to `src/components/`. Proof: Home's tests pass with only import paths changed.
- [ ] 1.3 Template view, three routes, paths in `site-pages.ts`. Proof: Testing Library test of section order per page and of an empty section being left out; build outputs three HTML files.
- [ ] 1.4 Metadata. Proof: unit test of each page's title and description.

## 2. Sections

- [ ] 2.1 Hero. Proof: one `h1` per page; browser test of 16:9 and 4:5 boxes and reduced motion.
- [ ] 2.2 Offer. Proof: Testing Library test that cards link only with a destination; browser test of swipe row and grid.
- [ ] 2.3 Stock. Proof: unit test of the eight-item, newest-first rule; Testing Library test of the "See all" fallback and of the section being left out when empty.
- [ ] 2.4 How buying works. Proof: Testing Library test of the ordered list; browser test of the phone stack.
- [ ] 2.5 Phones, Engineering and Autos sections. Proof: Testing Library tests per section; unit test that financing renders only when offered.
- [ ] 2.6 Story and contact block. Proof: Testing Library tests that only this business's story and contacts show.

## 3. Quality

- [ ] 3.1 axe on each page at 1440 and 390px. Proof: zero violations.
- [ ] 3.2 Home's division and featured links point to the new pages. Proof: unit test of the flip once the paths are listed.
- [ ] 3.3 Screenshots at 1440 and 390px and the placeholder report for the client lead.
