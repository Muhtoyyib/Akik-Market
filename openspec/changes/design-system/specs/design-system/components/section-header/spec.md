## Purpose

Defines the eyebrow-plus-heading block that opens most sections, so sections start the same way across the site.

## ADDED Requirements

### Requirement: Structure

A section header SHALL contain an optional eyebrow in the `label` style, a heading in the `h2` style (or `h1` when it opens the page) and an optional supporting line in `body-lg` with `ink-muted`. An optional action (a `link` button) MAY follow.

#### Scenario: Full header

- **WHEN** a section header has all parts
- **THEN** they appear in the order eyebrow, heading, supporting line, action, separated by 12px, 16px and 24px

### Requirement: Alignment

The header SHALL be centred by default and MAY be left-aligned when the section's content starts at the left edge.

#### Scenario: Left-aligned content

- **WHEN** the section below is a left-aligned list
- **THEN** the header can be left-aligned to match

### Requirement: Eyebrow colour

The eyebrow SHALL use `ink-muted` by default and the current division accent inside a division section.

#### Scenario: Autos section

- **WHEN** a section header sits in a section set to Autos
- **THEN** its eyebrow uses the `autos` colour

### Requirement: Eyebrow is not a heading

The eyebrow SHALL be plain text, not a heading element, so the outline lists only the real heading.

#### Scenario: Screen-reader heading list

- **WHEN** a screen reader lists headings
- **THEN** the eyebrow text does not appear as a heading
