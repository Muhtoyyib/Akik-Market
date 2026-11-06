## Purpose

Shows the three businesses side by side, in the order they grew, and sends each visitor to the one they came for.

Source: Matic P3 (section header) + P4 (media card row), as plain swipe rows.

## ADDED Requirements

### Requirement: Section header

The section SHALL open with a section header: eyebrow "Three businesses, one name" and an `h2`. Placeholder `h2`: "Built on trust since 2023", with the year taken from the content source.

#### Scenario: Start year changes

- **WHEN** the start year in the content source changes
- **THEN** the heading shows the new year

### Requirement: Three division cards

The section SHALL show three `division` cards in growth order: Phones & Gadgets, Engineering & Real Estate, Autos. Each card SHALL have a 4:5 media box (image or looping clip), an eyebrow with the business name in its accent colour, an `h3`, one line in `ink-muted` and an arrow, with the caption below the media box. Each card SHALL link to its division page once that page exists; until then it SHALL open WhatsApp to that business's number.

#### Scenario: Division page not built yet

- **WHEN** the Autos page doesn't exist
- **THEN** the Autos card opens WhatsApp to the Autos number, and its accessible name says so

### Requirement: Plain swipe row

On desktop the three cards SHALL fill the frame in one row of three equal columns. Under 1024px they SHALL become a swipe row: cards about 80% of the screen wide, the next card peeking in, snapping to each card, with no pinned or scroll-driven sideways motion.

#### Scenario: Swiping on a phone

- **WHEN** a visitor swipes left on the row
- **THEN** the next card snaps into place and the page does not scroll sideways

#### Scenario: Keyboard on a phone layout

- **WHEN** a keyboard user tabs through the row
- **THEN** each card scrolls into view as it receives focus
