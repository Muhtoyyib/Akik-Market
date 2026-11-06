# offer Specification

## Purpose

What this business sells or does, at a glance.

Source: Matic P3 (section header) and P4 (media card row, as a plain swipe row per Home design D1).

## Requirements

### Requirement: Card row

The section SHALL show a section header and three to six cards, one per category or service, each with a 4:5 photo and a caption under it (title and one line). On phones the row SHALL swipe with the next card peeking; from 1024px up it SHALL show as a grid when the cards fit, or a row with arrows when they don't.

#### Scenario: Autos categories

- **WHEN** the Autos offer renders with four categories
- **THEN** four cards show, each with a photo, a title and a line

### Requirement: Cards are not links unless a page exists

A card SHALL link only when its category has a real destination (the Listings page filtered to it, or a project). Otherwise it SHALL be plain content.

#### Scenario: No Listings page yet

- **WHEN** the Listings page isn't built
- **THEN** the cards have no links
