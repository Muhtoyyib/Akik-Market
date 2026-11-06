## Purpose

The top of the News page.

Source: Matic P3 section header, carrying the page `h1`.

## ADDED Requirements

### Requirement: Heading and intro

`/news` SHALL open with the eyebrow "News", one `h1` and one line pointing to Instagram for daily updates, with a link to the owner's Instagram that opens in a new tab with safe link attributes.

#### Scenario: Arriving

- **WHEN** a visitor opens `/news`
- **THEN** there is exactly one `h1` and an Instagram link

### Requirement: Metadata

The page SHALL have the title "News · Akik" and a description of the kinds of updates posted.

#### Scenario: Title

- **WHEN** `/news` is built
- **THEN** its title is "News · Akik"
