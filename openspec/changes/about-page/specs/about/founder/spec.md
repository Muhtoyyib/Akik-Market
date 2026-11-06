## Purpose

The founder's photos and full story, the top of the page.

Source: Matic P10 (small stacked photo carousel with outline arrows, heading and story below), as built for Home's founder.

## ADDED Requirements

### Requirement: Photos and story

The section SHALL show the stacked photo carousel built for Home, then the page's one `h1`, the founder's name and role as a `type-label` line, and the story in up to four short paragraphs at the readable line length. The front photo SHALL be described in alt text.

#### Scenario: Screen reader on arrival

- **WHEN** a screen reader reads the top of `/about`
- **THEN** it reads the `h1`, then the founder's name and role, then the story

### Requirement: Placeholder until supplied

The founder's name, photos and story SHALL be placeholders until the owner supplies them. A placeholder SHALL NOT invent a name: the name line SHALL read "Founder, Akik".

#### Scenario: Before the owner's story

- **WHEN** the founder content is a placeholder
- **THEN** the name line reads "Founder, Akik" and the report lists the story and photos
