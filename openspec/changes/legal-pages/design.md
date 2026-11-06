## Context

See [proposal.md](./proposal.md). Placeholders are allowed elsewhere for the pitch build, but stand-in legal text would look like a real commitment Akik never made.

## Goals / Non-Goals

**Goals:** the layout and routes ready, so the owner's text ships the day it arrives; stand-in text always reads as a draft.

**Non-goals:** see the proposal.

## Decisions

### D1. Built as marked drafts on the preview

- **Chosen:** both pages are built now, so the client lead can review the whole site on the preview (the user, 2026-11-06: "I want everything on vercel ... it's just for him to see"). While a document's text is a placeholder, a notice under the `h1` says it is a draft awaiting the owner's lawyer, and the placeholder report lists it. The draft text describes only what the site does (no cookies, no stored form data, WhatsApp and email) and makes no promise about the shops.
- **Superseded:** the earlier rule kept placeholder pages out of the build. It assumed the first deploy was public; the preview is not.
- **Before public launch:** both documents must be marked real (the launch checklist and placeholder report name them).

### D2. Text as typed sections

- **Chosen:** a document is a list of sections, each a heading and paragraphs or lists, using the same block types as news posts (`news-pages` D1), so the contents list is generated from the headings.

## Risks / Trade-offs

- **A draft mistaken for a commitment.** Mitigation: the draft notice on the page, and the placeholder report lists both until marked real.
- **Applicable law.** Assumed, not verified: the Nigeria Data Protection Act 2023 likely applies. The owner's lawyer should confirm what the privacy page must say.

## Open Questions

- Who writes the text: the owner's lawyer, or an approved template the owner signs off?
- The legal entity name and registration number to show.
