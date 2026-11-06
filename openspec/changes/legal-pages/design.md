## Context

See [proposal.md](./proposal.md). Placeholders are allowed elsewhere for the pitch build, but stand-in legal text would look like a real commitment Akik never made.

## Goals / Non-Goals

**Goals:** the layout and routes ready, so the owner's text ships the day it arrives; no stand-in legal text ever reaches the public site.

**Non-goals:** see the proposal.

## Decisions

### D1. Unpublished until real

- **Chosen:** each legal document in the content source has a status. While its text is a placeholder, its path is left out of the prerender list, so `pageExists` is false and the footer's Legal column (filtered by `pageExists`) stays hidden. A unit test fails if a placeholder legal page is listed.
- **Alternatives considered:** publishing placeholder text marked "draft"; using a generated policy template.
- **Dropped:** both. A visible draft still reads as a commitment, and a generated template may not fit Nigerian law or Akik's actual practices.

### D2. Text as typed sections

- **Chosen:** a document is a list of sections, each a heading and paragraphs or lists, using the same block types as news posts (`news-pages` D1), so the contents list is generated from the headings.

## Risks / Trade-offs

- **Launch without legal pages.** Mitigation: the placeholder report lists both as missing, and the launch checklist names them.
- **Applicable law.** Assumed, not verified: the Nigeria Data Protection Act 2023 likely applies. The owner's lawyer should confirm what the privacy page must say.

## Open Questions

- Who writes the text: the owner's lawyer, or an approved template the owner signs off?
- The legal entity name and registration number to show.
