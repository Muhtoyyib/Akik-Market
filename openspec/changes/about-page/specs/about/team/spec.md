## Purpose

The people behind Akik, shown only once the owner supplies them.

Source: Matic P4 card row, captions under the photo.

## ADDED Requirements

### Requirement: Real people only

The team section SHALL render only when the content has at least one person with a name, role and photo supplied by the owner. It SHALL NOT render placeholders.

#### Scenario: No team content

- **WHEN** the team list is empty
- **THEN** there is no team section, heading or gap

### Requirement: Card per person

Each person SHALL be a card with a 4:5 photo (alt text with their name), their name and role under it, in a swipe row on phones and a grid from 1024px up.

#### Scenario: Four people

- **WHEN** the owner supplies four people
- **THEN** four cards show in a grid at 1440px and a swipe row at 390px
