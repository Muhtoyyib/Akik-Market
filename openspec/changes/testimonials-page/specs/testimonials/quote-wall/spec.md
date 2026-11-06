## Purpose

Every customer quote, as a wall of photos: the strongest quote first, then a photo for every customer, with the chosen customer's quote below.

Source: the user's own Alvo landing page (`gigs/alvo/apps/website`, `TestimonialWall`), captured 2026-11-06: rows of round photos (6, 7, 8, 7), real customers selectable, filler photos muted, the selected quote in a card under the wall. Rebuilt in the house style: no copied code or images, no scale on selection (anti-slop), and no faces (page spec, "Permission for real customers"). The user asked for it on 2026-11-06, with photos filling most of the section, then for customers to fill 85% of it. Home shows the same wall (home proof spec). It replaces the earlier column grid and filter tabs.

## ADDED Requirements

### Requirement: Lead quote

The section SHALL open with the lead quote as on Home (Matic P5): the quote large and centred, its highlighted phrase in `<em>`, and its source in `type-label`.

#### Scenario: Arriving at the wall

- **WHEN** the section renders
- **THEN** the lead quote sits above the wall

### Requirement: Photo wall

Under the lead quote, round photos SHALL sit in centred rows of 6, 7, 8, 7 and 6, so the rows stagger (Alvo uses four rows; a fifth gives photos most of the section). Each customer with a quote SHALL have one tile showing the photo of what they bought, spread evenly through the wall; every other tile SHALL be a muted (greyscale, faded) photo of Akik's phones, homes or cars, hidden from assistive technology. Photos SHALL fill most of the section's height.

Customers SHALL fill 85% of the wall (the user, 2026-11-06): 29 customer tiles and 5 muted, each customer with a photo of their own.

#### Scenario: Twenty-nine quotes

- **WHEN** the collection has 29 quotes
- **THEN** the wall has 34 tiles, 29 of them customers and 5 muted

### Requirement: Choosing a customer

Each customer tile SHALL be a button named "Read {first name}'s quote", pressed when selected, with a 44px touch target on phones. Selecting one SHALL show that customer's quote under the wall in a card: the quote, the first name, and the business in its accent. The selected tile SHALL be marked with an accent ring, never by growing. The first customer SHALL be selected on load, and the card SHALL announce changes politely.

#### Scenario: Choosing Ngozi

- **WHEN** a visitor presses "Read Ngozi's quote"
- **THEN** Ngozi's tile is pressed and the card shows Ngozi's quote with "Engineering & Real Estate" in its accent

#### Scenario: Keyboard

- **WHEN** a keyboard user tabs through the wall
- **THEN** focus moves only through the customer tiles, in wall order, each with a visible focus ring
