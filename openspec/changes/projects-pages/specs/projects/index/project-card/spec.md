## Purpose

One finished project in the grid.

Source: Obvious case-study card with a big figure (captured, frame 6), rebuilt with our media box and tokens.

## ADDED Requirements

### Requirement: Card contents

Each card SHALL show a 3:2 photo, the project type and year as a `type-label` line, the project name as an `h2` styled `type-h3`, and one headline figure in `type-figure` with a short label. The whole card SHALL be one link to the project's page, with the name as its accessible name.

#### Scenario: Screen reader on a card

- **WHEN** a screen reader reaches a card
- **THEN** it announces one link named after the project

### Requirement: Grid

Cards SHALL sit in three columns from 1024px, two from 768px and one on phones, newest first.

#### Scenario: Phone

- **WHEN** the grid renders at 390px
- **THEN** cards stack in one column
