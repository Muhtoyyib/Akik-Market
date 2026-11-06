## Context

See [proposal.md](./proposal.md). The site is prerendered static HTML on Vercel with no server code. Home's D5 made WhatsApp the main action for the same reason.

## Goals / Non-Goals

**Goals:** a visitor reaches the right business in one step, by the channel they prefer; the form works without a server; nothing personal is stored by the site.

**Non-goals:** see the proposal.

## Decisions

### D1. The form composes a WhatsApp message

- **Chosen:** the form checks its fields in the browser, then opens WhatsApp to the chosen business's number with the visitor's name, topic and message written into the prefilled text. A secondary "Send by email instead" opens the visitor's mail app to akikmarket@gmail.com with the same text. The site stores nothing.
- **Alternatives considered:** a serverless function that emails the enquiry to the owner (needs an email provider, a bot check such as Turnstile, a privacy notice covering stored data, and someone to own the inbox); a third-party form service.
- **Dropped for now:** both. They add a backend, a data processor and running costs for a business that already answers on WhatsApp. Revisit if the owner wants enquiries in email or a dashboard.
- **Evidence:** no server code exists (`vercel.json` serves static files only); Home D5.

### D2. Field style from Matic's footer field

- **Chosen:** inputs with a label above, an underline in `line` that turns `ink` on focus, plus the standard focus outline, and errors in text under the field. The send button is the `primary` pill.
- **Alternatives considered:** boxed inputs.
- **Dropped:** boxes, as Matic's only field (P11 newsletter) is underline-only and sets the house style.

### D3. No map embed

- **Chosen:** the shop photo, address and a "Get directions" link (as on Home).
- **Alternatives considered:** a Google Maps iframe; a static map image.
- **Dropped:** the iframe, for third-party cookies and weight on mobile data. The static map image needs an API key and its terms; revisit only if the owner asks.

## Risks / Trade-offs

- **The message lands in WhatsApp, not in a form inbox.** Mitigation: that's where Akik already answers; the email option covers visitors without WhatsApp.
- **Long messages in a link.** Mitigation: the message field is limited to 1,000 characters, well within what WhatsApp links accept.

## Open Questions

- Does the owner want enquiries by email or in a dashboard (which would need D1's dropped option)?
- Opening hours, and whether each business keeps different hours.
