## Context

See [proposal.md](./proposal.md). Home's three news posts already have slugs, dates, titles and photos in the content source; site-shell moves them into the shared news collection.

## Goals / Non-Goals

**Goals:** every post findable and readable on its own page; Home's cards open real posts; posts written as typed content like everything else.

**Non-goals:** see the proposal.

## Decisions

### D1. Post bodies as typed blocks

- **Chosen:** a post body is a list of blocks: paragraph, sub-heading, photo (with alt text and caption), or a list. The page renders each block with the house type styles.
- **Alternatives considered:** Markdown or MDX files.
- **Dropped:** Markdown/MDX for now (site-shell D2): typed blocks keep placeholder marking and the report working, and the posts are short. Revisit if the owner starts writing long posts himself.

### D2. Business filter in the query string

- **Chosen:** `?business=phones|engineering|autos`, like the Projects and Listings filters. The prerendered page shows "All".
- **Alternatives considered:** `/news/phones`.
- **Dropped:** paths, because they would clash with post slugs.

### D3. Dates parsed from the string

- **Chosen:** dates stay ISO strings in the content and are formatted by the existing `newsDate` helper ("6 NOV 2026"), never through the browser's `Date` timezone.
- **Evidence:** the helper and its tests already exist (`src/lib/news.ts`).

## Risks / Trade-offs

- **Posts go stale.** Mitigation: the owner's Instagram link stays in the footer; the page doesn't promise frequency.

## Open Questions

- Will the owner send posts, or should Instagram posts be copied over by the developer?
