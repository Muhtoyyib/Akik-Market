## Purpose

The Contact page's route, section order, metadata and links into it.

Source: the house style; each section names its own source.

## ADDED Requirements

### Requirement: Route and sections

`/contact` SHALL open with one `h1` and an intro line, then render channels, the enquiry form and the location, separated by the section rhythm.

#### Scenario: Arriving

- **WHEN** a visitor opens `/contact`
- **THEN** there is exactly one `h1` and the sections appear in that order

### Requirement: Links in

Once `/contact` exists, the header and the footer's Company column SHALL link to it.

#### Scenario: After shipping

- **WHEN** `/contact` is listed for prerendering
- **THEN** the header shows a Contact link

### Requirement: Metadata

The page SHALL have the title "Contact · Akik", a description naming the address and WhatsApp, and `LocalBusiness` structured data built from the same content (as on Home).

#### Scenario: Structured data

- **WHEN** the page is built
- **THEN** its `LocalBusiness` address and numbers equal those shown on the page
