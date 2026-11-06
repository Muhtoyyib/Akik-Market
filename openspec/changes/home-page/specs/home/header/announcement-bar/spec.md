## Purpose

A one-line link above the header for the latest news: new stock, a finished building, a car arrival.

Source: Matic P1 (announcement bar).

## ADDED Requirements

### Requirement: One line, one link

The bar SHALL show one short line of `small` text with an arrow icon, centred, linking to its target. A 1px `line` divider SHALL sit under it, inside the page gutters. When the content source has no announcement, the bar SHALL be left out.

#### Scenario: Announcement present

- **WHEN** the content source has an announcement
- **THEN** one line appears above the header and the whole line is a single link

#### Scenario: No announcement

- **WHEN** the announcement is empty
- **THEN** the header starts at the top of the page with no empty bar

### Requirement: Fits on a phone

On screens under 640px the text SHALL be cut with an ellipsis rather than wrap.

#### Scenario: Long announcement on 360px

- **WHEN** the text is wider than the screen
- **THEN** it stays on one line ending in an ellipsis and the full text is in the link's accessible name

### Requirement: Scrolls away

The bar SHALL scroll away with the page; it is not part of the floating pill.

#### Scenario: Scrolling down

- **WHEN** the visitor scrolls past the header
- **THEN** the announcement bar is no longer visible
