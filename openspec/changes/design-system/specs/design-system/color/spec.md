## Purpose

Defines the colours the site may use and what each one is for, so every page reads as one brand and each division is recognisable by its accent.

## ADDED Requirements

### Requirement: Colour tokens

The site SHALL use only these colour tokens. No other colour value may appear in page or component styles.

| Token         | Value     | Use                                                               |
| ------------- | --------- | ----------------------------------------------------------------- |
| `page`        | `#F6F4F0` | Page background                                                   |
| `card`        | `#FFFFFF` | Cards and boxes that sit on the page                              |
| `ink`         | `#0E1B2E` | Main text, primary button fill                                    |
| `ink-muted`   | `#55606F` | Secondary text, captions                                          |
| `line`        | `#DCD8CF` | Hairline borders and dividers                                     |
| `brand-navy`  | `#0B3266` | Brand surfaces: footer box, hero overlays, highlights             |
| `brand-red`   | `#B3122A` | Small highlights only: a word in a quote, a badge, a focus accent |
| `on-dark`     | `#FFFFFF` | Text and icons on navy, ink or media                              |
| `phones`      | `#0A7489` | Phones & Gadgets accent                                           |
| `engineering` | `#A4532D` | Engineering & Real Estate accent                                  |
| `autos`       | `#3C5A2A` | Autos accent                                                      |

#### Scenario: A component needs a colour

- **WHEN** a component or page is styled
- **THEN** every colour comes from the table above
- **AND** the linter rejects a raw hex, rgb or hsl value

### Requirement: Brand red is an accent, not a surface

`brand-red` SHALL NOT fill an area larger than a button. It is used for short highlights so it keeps its weight.

#### Scenario: Red on a large area

- **WHEN** a section, card or media overlay is designed
- **THEN** its background is `page`, `card`, `brand-navy`, `ink` or a division accent, never `brand-red`

### Requirement: Division accent

A page or section about one division SHALL take that division's accent for its eyebrow labels, highlights and accent surfaces. A page or section about the whole group SHALL use `brand-navy`. Setting the division once on a container SHALL be enough for every descendant that uses the accent.

#### Scenario: Autos page

- **WHEN** the Autos page renders
- **THEN** its eyebrows and accent surfaces use the `autos` colour
- **AND** no Phones or Engineering accent appears except where those divisions are linked

#### Scenario: Group section

- **WHEN** a section presents all three divisions together
- **THEN** each division's card uses its own accent and the section itself uses `brand-navy`

### Requirement: Contrast

Every text and background pair SHALL meet WCAG 2.2 AA: 4.5:1 for body text and 3:1 for text 24px and above or 19px bold. Text over images or video SHALL sit on a scrim or surface that keeps this ratio whatever the frame shows.

#### Scenario: Measured pairs

- **WHEN** the token pairs are checked
- **THEN** `ink-muted` is at least 5.8:1 on `page` and 6.3:1 on `card`
- **AND** each division accent is at least 4.9:1 as text on `page` and at least 5.4:1 with `on-dark` text on it
- **AND** `brand-red` on `page` is at least 6.2:1

#### Scenario: Text over video

- **WHEN** a heading is placed over a looping video
- **THEN** a scrim or surface behind it keeps 4.5:1 against the lightest frame

### Requirement: Light scheme only

The site SHALL render in the light scheme whatever the visitor's system setting. It SHALL NOT invert or partly apply dark colours.

#### Scenario: Visitor prefers dark mode

- **WHEN** the operating system prefers a dark colour scheme
- **THEN** the page still renders with `page` background and `ink` text, and form controls match
