## Purpose

Shows that real customers trust Akik: the same photo wall of quotes as the Testimonials page.

Source: the testimonials quote-wall spec (the user's Alvo landing page, rebuilt in the house style). The user asked on 2026-11-06 for Home to use the same wall; it replaces the earlier Matic P5 lead quote with three columns.

## ADDED Requirements

### Requirement: The Testimonials photo wall

The section SHALL be the wall the testimonials quote-wall spec describes, with the same lead quote, tiles, quotes and behaviour, named "What customers say" for assistive technology. Its quotes are placeholders and SHALL NOT name a real person until the owner supplies real quotes with permission.

#### Scenario: Same wall as Testimonials

- **WHEN** Home renders
- **THEN** the wall shows a tile for every customer on the Testimonials wall, and choosing one shows that customer's quote

#### Scenario: Placeholder quotes

- **WHEN** the section renders with placeholder content
- **THEN** the lead quote and every wall quote are listed in the placeholder report

### Requirement: Loaded after the page

The wall SHALL be in Home's prerendered HTML, and its script SHALL load after the rest of the page, so the wall's quotes don't count against Home's script budget (measured 2026-11-06: 173.6 KB loaded up front against the 172 KB budget, 170.4 loaded late).

#### Scenario: Before the wall's script arrives

- **WHEN** Home is opened and the wall's script hasn't loaded yet
- **THEN** the prerendered wall is already on screen, and it responds to choices once hydrated
