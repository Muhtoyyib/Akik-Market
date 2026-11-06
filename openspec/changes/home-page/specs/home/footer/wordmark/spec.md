## Purpose

A giant AKIK wordmark that bleeds off the bottom of the footer box, the last thing a visitor sees.

Source: Matic P11 (giant wordmark cropped by the box's bottom edge).

## ADDED Requirements

### Requirement: Size and crop

The wordmark SHALL span the full inner width of the footer box and be cropped by the box's bottom edge so roughly its lower quarter is hidden. It SHALL scale with the box width on every screen size.

#### Scenario: Resizing

- **WHEN** the window narrows from 1440px to 390px
- **THEN** the wordmark shrinks with the box and stays cropped the same way

### Requirement: Colour

The wordmark SHALL be `on-dark` at reduced strength so it reads as texture behind nothing important. It SHALL NOT overlap links or text.

#### Scenario: Overlap check

- **WHEN** the footer renders at any supported width
- **THEN** no link or text sits on top of the wordmark

### Requirement: Decorative

The wordmark SHALL be hidden from assistive technology, since the brand name is already in the header and legal line.

#### Scenario: Screen reader

- **WHEN** a screen reader reads the footer
- **THEN** it does not announce the giant wordmark

### Requirement: Logo source

The wordmark SHALL use the owner's supplied logo once available; until then it SHALL be set in Geist at weight 600 and marked as a placeholder.

#### Scenario: Logo arrives

- **WHEN** the owner's vector logo is added
- **THEN** it replaces the typeset placeholder
