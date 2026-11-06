## Purpose

A post's page: heading, date, photo and body.

Source: house style (typography spec's readable line length, media box); no article page was captured from the references.

## ADDED Requirements

### Requirement: Head of the post

A post page SHALL show a text link "All news" back to `/news`, then the business name in its accent and the date (formatted "6 NOV 2026") as one `type-label` line, the title as the page's one `h1`, and the post's photo in a 3:2 media box.

#### Scenario: Opening a post

- **WHEN** a visitor opens `/news/<slug>`
- **THEN** the title is the only `h1` and the date reads in the "6 NOV 2026" form

### Requirement: Body

The body SHALL render its blocks in order (paragraphs, sub-headings as `h2`, photos with alt text and an optional caption, lists) at the readable line length, centred in the frame.

#### Scenario: Photo in the body

- **WHEN** a body contains a photo block
- **THEN** it shows with its alt text and caption, within the text column's width

### Requirement: Metadata

The page SHALL have the title "{post title} · Akik", `og:type` `article`, and `Article` structured data with the headline and date as shown.

#### Scenario: Structured data

- **WHEN** the page is built
- **THEN** its `Article` headline equals the `h1` text
