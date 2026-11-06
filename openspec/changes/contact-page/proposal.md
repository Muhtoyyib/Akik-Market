## Why

Every action on the site opens WhatsApp, which is how Akik already sells. Some visitors still look for a Contact page: to find the right number for a business, to write a longer enquiry, or to check where the shop is. The sitemap asks for an enquiry form routed by business, locations, a map, WhatsApp and phone.

## What Changes

- A new page at `/contact`: page header, channels per business (WhatsApp, phone, hours) plus email, an enquiry form routed by business, and the shop's location.
- Form field components (text field, text area, choice group, error message), kept with the Contact page until a second page needs them.
- The header and footer start linking to `/contact`.

## Sources per section

| Section      | Source                                                                                                                                 | Why                                                                                             |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| page header  | Matic P3, carrying the `h1`                                                                                                            | Same opening as every section                                                                   |
| channels     | Home's Visit us contact columns (from the Obvious closing block, captured, frame 11)                                                   | Already built and tested                                                                        |
| enquiry form | House style: form fields from the design-system tokens; Matic's footer newsletter field (P11, underline-only input) for the field look | No reference site's contact form was captured; Matic's underline field is the house field style |
| location     | Obvious closing block (captured, frame 11), as built for Home's Visit us                                                               | Photo, address and directions, no map embed                                                     |

**Outline approval:** the client lead asked for these specs on 2026-11-06. The outline still needs their sign-off before building, per `docs/design-reference/README.md`.

## Non-goals

- A server that receives or stores form submissions (see design D1; an open question).
- An embedded map. It loads third-party scripts and cookies; "Get directions" opens the visitor's maps app instead.
- Live chat widgets or chatbots.

## Business facts and placeholders

| Fact                                      | Status                                | Source                                                                 |
| ----------------------------------------- | ------------------------------------- | ---------------------------------------------------------------------- |
| Shop at Iwo Road Shopping Complex, Ibadan | Real                                  | Owner's Instagram bio                                                  |
| Email akikmarket@gmail.com                | Real                                  | Client lead, 2026-11-06                                                |
| 2348161894229                             | Real number; business mapping assumed | Client lead confirmed the number; Engineering & Real Estate is a guess |
| 2348161894229                             | Real                                  | The user, 2026-11-06: the WhatsApp number for every business           |
| Opening hours                             | Placeholder                           | —                                                                      |

## Capabilities

### New Capabilities

- `contact/page`: route, section order, metadata and links into the page.
- `contact/channels`: WhatsApp, phone and hours per business, and email.
- `contact/enquiry-form`: the form routed by business and what sending does.
- `contact/form-fields`: the field components, their labels, hints and errors.
- `contact/location`: the shop's photo, address and directions.

### Modified Capabilities

None.

## Impact

- `src/routes/contact.tsx`, `src/features/contact/`, `src/lib/content/contact.ts`.
- `src/features/contact/` for the field components, since only Contact uses them (code-style: shared components start at the second use); tokens unchanged.
- A pure helper that turns a valid enquiry into a WhatsApp link, with unit tests.
