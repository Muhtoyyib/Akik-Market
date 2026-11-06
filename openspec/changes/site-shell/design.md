## Context

See [proposal.md](./proposal.md). Today only Home exists. Its shared parts were kept in `src/features/home/` on purpose, because the code-style rule says to move a component to `src/components` only when a second feature uses it. The next page makes that true, so the move happens here, once, before any page work.

## Goals / Non-Goals

**Goals:** a new page is one route file, one view and one content module, wrapped in the shared layout; a fact changed once changes everywhere; Home is unchanged.

**Non-goals:** see the proposal.

## Decisions

### D1. One page layout component

- **Chosen:** a layout that renders the skip link, the header (with the page's path for current-page marking), `main` and the footer. Each page view passes its sections as children and, on division pages, its division key for the accent.
- **Alternatives considered:** a TanStack layout route wrapping every page.
- **Dropped:** the layout route for now. The header needs the page's path and the division pages need an accent on the container; passing both as props is simpler to test than reading router state. Revisit if pages multiply.
- **Evidence:** Home's header already takes `currentPath` and `links` as props (commit 8da0c84).

### D2. Content modules under `src/lib/content/`

- **Chosen:** `site.ts` (businesses, numbers, WhatsApp links, address, social, start year, footer, navigation), one module per page (`home.ts`, `about.ts`, ...) and one per shared collection (`listings.ts`, `projects.ts`, `news.ts`, `stories.ts`). Every value that isn't from the owner is wrapped as a placeholder.
- **Alternatives considered:** one big content file (Home's current approach); Markdown or MDX files for posts and projects.
- **Dropped:** one file, because it already hit the 250-line lint cap on Home alone. Markdown/MDX, because typed modules keep the placeholder marking and the report working the same way for every value, and post bodies are short.
- **Evidence:** `home-content.ts` reached 259 lines and had to be split (commit 24a79bb).

### D3. Collection pages are prerendered from their content

- **Chosen:** the prerender list is built from the static pages plus one path per item in each collection (`/projects/<slug>`, `/news/<slug>`). `pageExists` reads the same list, so links flip from fallbacks to real pages when a page or item ships.
- **Alternatives considered:** crawling links at build time (TanStack's `crawlLinks`).
- **Dropped:** crawling. It hides which pages ship, and an item that nothing links to would be left out silently.

### D4. Shared collections feed Home and the pages

- **Chosen:** Home's featured items, news posts and customer stories move into the shared collections. Home keeps its rules (eight items per business, latest three posts) as functions over those collections.
- **Alternatives considered:** separate copies per page.
- **Dropped:** copies. A car sold on the Listings page must disappear from Home in the same edit.

### D5. A 404 page in the house style

- **Chosen:** a prerendered 404 page with the shared layout, one heading, a line of text, a link home and the WhatsApp action. The host serves it, with status 404, for unknown paths.
- **Alternatives considered:** the host's default 404.
- **Dropped:** the default, because it drops the header, so a visitor from an old link has nowhere to go.

## Risks / Trade-offs

- **The move breaks Home.** Mitigation: move first with no behaviour change; Home's unit and browser tests must pass unchanged apart from import paths before anything else is added.
- **Collections grow past the lint caps.** Mitigation: one item per object, and split a collection by business when a file passes 250 lines.

## Open Questions

- Production domain (needed for canonical URLs, sitemap.xml and og:image).
