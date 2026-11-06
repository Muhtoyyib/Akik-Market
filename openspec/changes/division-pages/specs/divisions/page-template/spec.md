## Purpose

The structure the three business pages share: sections, order, accent and metadata.

Source: Matic house style; each section names its own source.

## ADDED Requirements

### Requirement: Paths and sections

The site SHALL have `/phones-and-gadgets`, `/engineering` and `/autos`. Each SHALL render, in order: hero, offer, stock, how buying works, its division-specific section, story and contact block, separated by the section rhythm. A section with no content SHALL be left out.

#### Scenario: Autos page

- **WHEN** a visitor opens `/autos`
- **THEN** the sections appear in the order above, with the inspection section in the division-specific slot

#### Scenario: No story yet

- **WHEN** the stories collection has nothing for Engineering
- **THEN** the Engineering page has no story section and no gap

### Requirement: Division accent

Each page SHALL set its business's accent on the page container, as the site-shell page layout describes.

#### Scenario: Phones page eyebrows

- **WHEN** the Phones page renders
- **THEN** every eyebrow uses the Phones accent

### Requirement: Every action reaches this business

Every WhatsApp link and phone number on a division page SHALL go to that business's own number, with a prefilled message naming the business or item.

#### Scenario: Asking about a car from the Autos page

- **WHEN** a visitor taps any WhatsApp action on `/autos`
- **THEN** WhatsApp opens to the Autos number

### Requirement: Metadata

Each page SHALL have the title "{business name} · Akik" and a description naming what the business sells and where.

#### Scenario: Engineering title

- **WHEN** `/engineering` is built
- **THEN** its title is "Engineering & Real Estate · Akik"
