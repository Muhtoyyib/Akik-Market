## 1. Fields and helper

- [ ] 1.1 Form field components (text field, text area, choice group, error). Proof: Testing Library tests for labels, required text, error linking and arrow keys; axe in a browser test.
- [ ] 1.2 Pure helper: valid enquiry to WhatsApp link and to mailto link; validation messages. Proof: unit tests and Stryker on the helper.

## 2. Page

- [ ] 2.1 Route, view, `/contact` in `site-pages.ts`, metadata with `LocalBusiness`. Proof: build outputs `contact.html`; unit test that the structured data matches the page.
- [ ] 2.2 Channels. Proof: Testing Library tests for numbers, email and social links.
- [ ] 2.3 Enquiry form. Proof: Testing Library tests for `?business=` preselection, errors and focus on the first one, and the WhatsApp link opened on a valid send; browser test that no network request is made.
- [ ] 2.4 Location. Proof: Testing Library test of the directions link; no iframe on the page.

## 3. Quality

- [ ] 3.1 Header and footer link to `/contact`. Proof: unit test of the flip.
- [ ] 3.2 axe at 1440 and 390px, with errors showing. Proof: zero violations.
- [ ] 3.3 Screenshots and the placeholder report for the client lead.
