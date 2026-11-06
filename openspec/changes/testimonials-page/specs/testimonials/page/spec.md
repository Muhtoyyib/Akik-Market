## Purpose

The Testimonials page's route, section order, metadata and the rules for showing real customers.

Source: the house style; each section names its own source.

## ADDED Requirements

### Requirement: Route and sections

`/testimonials` SHALL open with one `h1` and an intro line, then render stories, the quote wall and the share block, separated by the section rhythm.

#### Scenario: Arriving

- **WHEN** a visitor opens `/testimonials`
- **THEN** there is exactly one `h1` and the sections appear in that order

### Requirement: Permission for real customers

A story or quote that isn't a placeholder SHALL record the date the customer gave permission and who recorded it. Placeholders SHALL use a first name only and no face.

#### Scenario: Real quote without permission

- **WHEN** a real quote is added without a permission record
- **THEN** a unit test fails naming the quote

### Requirement: Metadata

The page SHALL have the title "Testimonials · Akik" and a description of customers across the three businesses.

#### Scenario: Title

- **WHEN** `/testimonials` is built
- **THEN** its title is "Testimonials · Akik"
