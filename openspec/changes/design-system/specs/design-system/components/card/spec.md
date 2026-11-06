## Purpose

Defines the cards that hold text, links and divisions, so they look and behave alike on every page.

## ADDED Requirements

### Requirement: Variants

A card SHALL be one of:

| Variant      | Look                                                                       | Use                                                    |
| ------------ | -------------------------------------------------------------------------- | ------------------------------------------------------ |
| `content`    | `card` fill, `radius-md`, 32px padding (24px on mobile)                    | Grouped text: a feature, a step, a fact                |
| `inset-link` | `card` fill, `radius-md`, placed inside a media box                        | One onward link over a banner: eyebrow, heading, arrow |
| `division`   | media box on top, eyebrow in the division accent, heading, one line, arrow | Pointing to one division                               |

#### Scenario: Division card for Engineering

- **WHEN** a division card for Engineering & Real Estate renders
- **THEN** its eyebrow uses the `engineering` colour and it links to the Engineering page

### Requirement: Whole card is one link

A card that leads somewhere SHALL be a single link covering the whole card, with the heading as its accessible name. It SHALL NOT contain other links or buttons.

#### Scenario: Clicking anywhere on the card

- **WHEN** a visitor clicks the card's image, text or arrow
- **THEN** they go to the same page

#### Scenario: Screen reader on a linked card

- **WHEN** a screen reader reaches the card
- **THEN** it announces one link named by the card's heading

### Requirement: Card hover

A linked card's hover state SHALL change only the arrow's fill and, optionally, underline the heading.

#### Scenario: Hover

- **WHEN** the pointer moves over a linked card
- **THEN** the card does not move, grow or gain a shadow

### Requirement: Equal heights in a row

Cards in the same row SHALL be the same height, with their actions aligned at the bottom.

#### Scenario: Uneven copy

- **WHEN** one card in a row has a longer description
- **THEN** all cards in that row stretch to the tallest one
