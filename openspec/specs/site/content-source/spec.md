# content-source Specification

## Purpose

Where each piece of content lives, how placeholders are marked, and how the placeholder report finds them on every page.

Source: Home's content source and design decision D2 (`openspec/changes/home-page/design.md`).

## Requirements

### Requirement: One home for each fact

Each business fact (business names, phone and WhatsApp numbers, address, opening hours, social accounts, email, start year) SHALL be defined once and read by every page that shows it. Changing it in one place SHALL change it on every page.

#### Scenario: Owner corrects the opening hours

- **WHEN** the hours are changed in the site-wide content
- **THEN** Home's Visit us, the Contact page and every division page show the new hours

### Requirement: Shared collections

Listings (phones, properties, cars), projects, news posts and customer stories and quotes SHALL each be one collection, read by Home and by the pages that list them. A page SHALL NOT keep its own copy of a collection item.

#### Scenario: A car is sold

- **WHEN** a car is removed from the listings collection
- **THEN** it disappears from Home's Featured now, the Autos page and the Listings page

### Requirement: Placeholders marked and reported

Every value not supplied by the owner SHALL be marked as a placeholder in the content source. The placeholder report SHALL list every placeholder on every page, grouped by page, and SHALL run in CI as a report, not a failure.

#### Scenario: New page with stand-in copy

- **WHEN** a page module adds a placeholder heading
- **THEN** the report lists it under that page

### Requirement: Realistic, never invented as real

Placeholders SHALL read as realistic Akik content and SHALL NOT name real customers, real staff, real figures, press or awards. People SHALL NOT appear in placeholder photos as customers or staff.

#### Scenario: Team section without owner photos

- **WHEN** the owner hasn't supplied team photos and names
- **THEN** the team section is left out rather than filled with stand-in people
