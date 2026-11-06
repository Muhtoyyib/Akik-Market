## 1. Layout and rule

- [x] 1.1 Legal content module with a status per document, and draft text describing the site. Proof: unit tests that both pages are prerendered and that the draft covers the privacy topics and the listings disclaimer.
- [x] 1.2 Document layout with contents list. Proof: Testing Library tests for the `h1`, date and contents links; browser test that a contents jump lands below the floating header.
- [x] 1.3 Routes for `/privacy` and `/terms`, with the draft notice while placeholders. Proof: build outputs both files; Testing Library test of the notice; footer shows Legal; axe at 1440 and 390px.

## 2. When the text arrives

- [ ] 2.1 Add the supplied privacy text and mark it real. Proof: content test that it covers each required topic; no draft notice.
- [ ] 2.2 Add the supplied terms and mark them real. Proof: content test for the entity name and the listings section; no draft notice.
