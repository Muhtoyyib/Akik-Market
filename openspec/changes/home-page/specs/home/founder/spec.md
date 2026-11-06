## Purpose

Puts a face to the name. Akik grew because people trust its founder, so Home tells his story in a few lines.

Source: Matic P10 (small stacked photo carousel with round arrows, centred heading, short paragraph, text link).

## ADDED Requirements

### Requirement: Photo stack

The section SHALL show a centred stack of 3 to 5 portrait photos (4:5, `radius-md`, about 270px wide on desktop): the front photo fully visible, the others peeking behind it. Round outlined arrow buttons on each side SHALL bring the next or previous photo to the front, and swiping SHALL do the same on touch screens.

#### Scenario: Next photo

- **WHEN** the visitor presses the right arrow
- **THEN** the next photo moves to the front over 400ms (instantly under reduced motion)

#### Scenario: Screen reader

- **WHEN** a screen reader reaches the arrows
- **THEN** they announce "Previous photo" and "Next photo", and the front photo's alt text says what it shows

### Requirement: Story

Below the photos, centred, the section SHALL show an `h2` (placeholder "From one phone shop to three businesses"), a paragraph of at most 60 words in `body-lg` telling the growth in order (phones, then engineering and real estate, then autos, starting in 2023 per the placeholder start year) and a `link` button "Read our story".

#### Scenario: Start year in the story

- **WHEN** the start year in the content source changes
- **THEN** the paragraph shows the new year

### Requirement: Link target

"Read our story" SHALL link to the About page once it exists; until then the link SHALL be left out and the section kept.

#### Scenario: About page not built

- **WHEN** the About page doesn't exist
- **THEN** the section shows photos, heading and paragraph, with no link
