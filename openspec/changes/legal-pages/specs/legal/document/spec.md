## Purpose

The shared layout for a legal page.

Source: house style; the news post article layout (`news-pages`).

## ADDED Requirements

### Requirement: Heading, date and contents

A legal page SHALL show its name as the one `h1`, a `type-label` line "LAST UPDATED {date}" (formatted "6 NOV 2026"), and, when it has more than three sections, a contents list linking to each section heading.

#### Scenario: Long policy

- **WHEN** the privacy page has eight sections
- **THEN** a contents list of eight links sits under the date, each jumping to its section below the floating header

### Requirement: Readable text

Sections SHALL use `h2` headings and body text at the readable line length, centred in the frame.

#### Scenario: Desktop reading

- **WHEN** the page renders at 1440px
- **THEN** body lines stay within the readable length

### Requirement: Metadata

Each page SHALL have the title "{Privacy policy | Terms} · Akik" and a one-line description.

#### Scenario: Terms title

- **WHEN** `/terms` is built
- **THEN** its title is "Terms · Akik"
