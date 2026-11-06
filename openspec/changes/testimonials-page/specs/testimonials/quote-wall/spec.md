## Purpose

Every customer quote, led by the strongest one.

Source: Matic P5 (lead quote with a highlighted phrase, three columns with top borders), as built for Home's proof, repeated in a grid with pill tabs.

## ADDED Requirements

### Requirement: Lead quote and wall

The section SHALL show the lead quote as on Home, then every other quote in Home's proof column style, three columns from 1024px, two from 768px and one on phones. Each quote SHALL show its business in that business's accent and its source line in `type-label`.

#### Scenario: Ten quotes

- **WHEN** the collection has ten quotes
- **THEN** the lead quote shows large and the other nine sit in the grid

### Requirement: Filter by business

Pill tabs above the wall SHALL offer "All" and one tab per business with quotes, setting `?business=<key>`. The lead quote SHALL stay visible on every tab.

#### Scenario: Homes tab

- **WHEN** a visitor chooses Homes
- **THEN** only Engineering quotes show in the grid
