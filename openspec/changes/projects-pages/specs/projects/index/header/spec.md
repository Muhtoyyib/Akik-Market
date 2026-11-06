## Purpose

The top of the Projects page.

Source: Matic P3 section header, carrying the page `h1`.

## ADDED Requirements

### Requirement: Heading and intro

`/projects` SHALL open with a `type-label` eyebrow "Engineering & Real Estate" in the Engineering accent, one `h1` and one short intro line, centred.

#### Scenario: Arriving from Home

- **WHEN** a visitor opens `/projects`
- **THEN** there is exactly one `h1` and the eyebrow names the business

### Requirement: Metadata

The page SHALL have the title "Projects · Akik" and a description of the finished work it shows.

#### Scenario: Title

- **WHEN** `/projects` is built
- **THEN** its title is "Projects · Akik"
