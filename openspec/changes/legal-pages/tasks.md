## 1. Layout and rule

- [ ] 1.1 Legal content module with a status per document. Proof: unit test that a placeholder document isn't in the prerender list.
- [ ] 1.2 Document layout with contents list. Proof: Testing Library tests for the `h1`, date and contents links; browser test that a contents jump lands below the floating header.
- [ ] 1.3 Routes for `/privacy` and `/terms`, built only when real. Proof: build outputs neither file while both are placeholders.

## 2. When the text arrives

- [ ] 2.1 Add the supplied privacy text and mark it real. Proof: content test that it covers each required topic; build outputs `privacy.html`; footer shows Legal.
- [ ] 2.2 Add the supplied terms and mark them real. Proof: content test for the entity name and the listings section; build outputs `terms.html`.
- [ ] 2.3 axe on each page at 1440 and 390px. Proof: zero violations.
