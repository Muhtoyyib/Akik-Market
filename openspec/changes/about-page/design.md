## Context

See [proposal.md](./proposal.md). Home's founder section already has the photo stack and a short story; the About page is its long version. The shared layout and content come from `site-shell`.

## Goals / Non-Goals

**Goals:** tell the real story once the owner supplies it, look complete before then, and never show stand-in people.

**Non-goals:** see the proposal.

## Decisions

### D1. Timeline as an ordered list

- **Chosen:** three chapters (phones, engineering and real estate, autos), each a mono year, a heading, two or three sentences and one photo, as an ordered list. On desktop the photo sits beside the text, alternating sides; on phones it stacks.
- **Alternatives considered:** a scroll-revealed timeline (Huly); a horizontal swipe row.
- **Dropped:** Huly, because it wasn't captured and its scroll-driven motion adds work and accessibility risk for three items. The swipe row, because the chapters are a sequence meant to be read in order.

### D2. Team left out until real

- **Chosen:** the team section renders only with names, roles and photos from the owner.
- **Alternatives considered:** placeholder cards with silhouettes.
- **Dropped:** placeholders, because showing stand-in people as staff breaks the content rules (site-shell content-source, "Realistic, never invented as real").

### D3. One start year for every chapter

- **Chosen:** each chapter's year is a fact in the site-wide content, and the phones chapter uses the site start year, so Home, the footer and About can't disagree.

## Risks / Trade-offs

- **The real story differs from the placeholder.** Mitigation: the story is one placeholder block, replaced in one edit.
- **The years are wrong.** Mitigation: all marked as placeholders and listed in the report.

## Open Questions

- The founder's name, photos and how he tells the story.
- The year each business began.
- Who is on the team, and do they agree to appear?
