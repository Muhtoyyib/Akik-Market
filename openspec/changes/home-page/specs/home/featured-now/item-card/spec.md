## Purpose

One featured phone, property or car, shown in a swipe carousel, with a quick way to ask about it.

Source: Krea card carousel (captions laid over the bottom of the image, round arrows bottom-right; `docs/design-reference/screenshots/lookup/krea-01.png`), rebuilt with the design-system media box and tokens.

## ADDED Requirements

### Requirement: Card content

Each item card SHALL be a 4:5 media box (`radius-md`) with a scrim at the bottom holding: the item name in `h3` style, one detail line in `label` style (for example `256GB · 1 YEAR WARRANTY`, `4 BED · AKOBO`, `2014 · 86,000 KM`) and the price in `label` style, all in `on-dark`. Items SHALL come from the content source; every one is a placeholder until the owner supplies real stock.

#### Scenario: Phone item

- **WHEN** a phone item renders
- **THEN** it shows the name, storage and warranty line, and a price such as `₦1,250,000`

#### Scenario: Price on request

- **WHEN** an item has no price
- **THEN** the price line reads `PRICE ON REQUEST`

### Requirement: Ask about this item

The whole card SHALL be one link that opens WhatsApp to the item's business, with a prefilled message naming the item ("Hi Akik, I'm interested in the 2014 Lexus ES350"). Its accessible name SHALL say so ("Ask about 2014 Lexus ES350 on WhatsApp").

#### Scenario: Tapping a car

- **WHEN** a visitor taps a car card
- **THEN** WhatsApp opens to the Autos number with the car's name in the message

### Requirement: Carousel

Cards SHALL sit in a plain swipe row: four visible on desktop with the fifth peeking, about 80% wide on mobile with the next peeking, snapping per card. On desktop, two round arrow buttons (previous, next) SHALL sit at the bottom right of the row and move it by one card; each is disabled at its end of the row.

#### Scenario: Last card

- **WHEN** the row is scrolled to its last card
- **THEN** the next arrow is disabled and announced as unavailable

#### Scenario: Touch

- **WHEN** a visitor swipes on a phone
- **THEN** the row moves card by card and the page doesn't scroll sideways

### Requirement: Item count

Each tab SHALL show between 3 and 8 items. Extra items in the content source SHALL be ignored on Home.

#### Scenario: Ten phones in the content

- **WHEN** the content source lists ten phones
- **THEN** the first eight are shown
