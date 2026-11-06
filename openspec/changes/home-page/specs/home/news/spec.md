## Purpose

Shows the business is active: new stock, finished buildings, cars arriving.

Source: Matic P9 (section header, three image cards with date and title over the image, text link).

## ADDED Requirements

### Requirement: Header and cards

The section SHALL show a centred section header (eyebrow "News", `h2` placeholder "What's new at Akik"), then the three newest posts as 3:2 media boxes (`radius-md`), each with its date (`label`, `on-dark`) and title (`h3`, `on-dark`) at the bottom over a scrim. On mobile the cards SHALL become a swipe row.

#### Scenario: Newest first

- **WHEN** the content source has five posts
- **THEN** the three newest by date are shown, newest on the left

### Requirement: Dates

Dates SHALL be shown as `6 NOV 2026` and marked up as dates with a machine-readable value.

#### Scenario: Date markup

- **WHEN** the card markup is inspected
- **THEN** each date has a machine-readable value matching the visible date

### Requirement: Links

Once the News page exists, each card SHALL be one link to its post and a `link` button "More news" SHALL follow the cards. Until then the cards SHALL NOT be links (no link to a missing page), and the button SHALL read "Follow us on Instagram" and open `instagram.com/akikmarket`.

#### Scenario: News page not built

- **WHEN** the News page doesn't exist
- **THEN** the three cards show without links and the button opens Akik's Instagram
