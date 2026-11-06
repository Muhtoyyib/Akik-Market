# page-layout Specification

## Purpose

The frame every page shares: skip link, header, main content, footer, current-page marking and the division accent.

Source: Matic P1 and P11, already built for Home (`openspec/changes/home-page/specs/home/header`, `.../footer`).

## Requirements

### Requirement: Same shell on every page

Every page SHALL render, in order, the "Skip to content" link, the header (announcement bar, navigation, floating pill and menu as specified for Home), one `main` holding the page's sections, and the footer. The header and footer SHALL look and behave the same on every page, except for the header's links: Home's header jumps to Home's sections (Home navigation spec, "Section links"), and every other page's header links to the built pages in sitemap order (About, the three division pages, Projects, News, Contact), leaving out pages not built yet.

#### Scenario: Visiting any page

- **WHEN** a visitor opens any page
- **THEN** it has one `banner`, one `main` and one `contentinfo` landmark, and Tab first reaches "Skip to content"

### Requirement: Current page

On pages other than Home, the header and the menu SHALL mark the link to the page being viewed as current for assistive technology and show it in `ink` with an underline, the others in `ink-muted`. A page inside a collection (`/projects/<slug>`, `/news/<slug>`) SHALL mark its collection's link (Projects, News) as current.

#### Scenario: Reading a news post

- **WHEN** a visitor is on `/news/new-phones-this-week`
- **THEN** the News link is marked current

### Requirement: Division accent

A page that belongs to one business (its division page, and any page filtered to that business by its path) SHALL set that business's accent on the page container, so eyebrows, highlights and link arrows use the accent. Other pages SHALL use the default accent.

#### Scenario: On the Autos page

- **WHEN** the Autos page renders
- **THEN** its eyebrows and link arrows use the Autos accent, and the header and footer are unchanged

### Requirement: Home unchanged

Moving the shared parts SHALL NOT change Home's markup, look or behaviour.

#### Scenario: After the move

- **WHEN** Home's existing unit and browser tests run
- **THEN** they pass with only import paths changed
