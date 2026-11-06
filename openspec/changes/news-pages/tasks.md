## 1. Collection and routes

- [x] 1.1 Add business and body blocks to the news collection, placeholders marked. Proof: unit tests for unique slugs, a business on every post and valid block types.
- [x] 1.2 Index and post routes; one prerendered path per post. Proof: build outputs `news.html` and one HTML file per post.
- [x] 1.3 Metadata with `Article` data on posts. Proof: unit test that the headline and date match the page.

## 2. Index

- [x] 2.1 Header and grid. Proof: Testing Library tests of one link per card and newest-first order; browser test of 3, 2 and 1 columns.
- [x] 2.2 Filters with `?business=`. Proof: Testing Library tests for hidden tabs, shared links and unknown values.

## 3. Post

- [x] 3.1 Article head and body blocks. Proof: Testing Library tests per block type; browser test of the readable line length.
- [x] 3.2 Related posts. Proof: unit test of the selection rule.
- [x] 3.3 Business banner with fallback. Proof: Testing Library test of the heading and link before and after the division page exists.

## 4. Quality

- [x] 4.1 Home's news cards and action flip to the pages. Proof: unit test of the flip.
- [x] 4.2 axe on the index and one post at 1440 and 390px. Proof: zero violations.
- [ ] 4.3 Screenshots and the placeholder report for the client lead.
