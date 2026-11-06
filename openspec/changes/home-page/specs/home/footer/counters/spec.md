## Purpose

A few figures at the top of the footer box that show the size of the business.

Source: Matic P11 (live counters in large mono digits with small labels).

## ADDED Requirements

### Requirement: Figures

The top-left of the footer box SHALL show two or three figures in the `figure` style, each followed by a `label`. Placeholders: `2023` "SERVING IBADAN SINCE" (from the start year), `1,000+` "PHONES SOLD", `50+` "CARS DELIVERED". Every figure except the start year is a placeholder until the owner supplies it.

#### Scenario: Placeholder report

- **WHEN** the report runs
- **THEN** each placeholder figure is listed

### Requirement: Static, not live

Figures SHALL be static numbers. They MAY count up once when they first scroll into view; they SHALL NOT keep ticking, and under reduced motion they SHALL show their final value at once.

#### Scenario: Reduced motion

- **WHEN** the visitor prefers reduced motion
- **THEN** the final numbers show immediately

### Requirement: Read correctly

Each figure and its label SHALL be read together as one phrase by assistive technology, and the count-up SHALL NOT be announced digit by digit.

#### Scenario: Screen reader

- **WHEN** a screen reader reaches a figure
- **THEN** it reads, for example, "1,000+ phones sold" once
