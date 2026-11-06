## Purpose

Defines the spacing scale and the page frame every section sits in: gutters, maximum width, the space between sections and the column grid.

## ADDED Requirements

### Requirement: Spacing scale

Spacing SHALL use a 4px base and these steps: 4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64, 80, 96, 144px. No other spacing value may be used except a documented one-off.

#### Scenario: Gap between a heading and text

- **WHEN** a component sets padding, margin or gap
- **THEN** the value is one of the steps above

### Requirement: Page frame

All page content SHALL sit inside one frame with these side gutters and a maximum outer width of 1440px, centred.

| Viewport      | Side gutter |
| ------------- | ----------- |
| under 768px   | 16px        |
| 768–1279px    | 32px        |
| 1280px and up | 64px        |

#### Scenario: Very wide screen

- **WHEN** the viewport is 1920px wide
- **THEN** the content is 1312px wide (1440 minus two 64px gutters) and centred

#### Scenario: Phone

- **WHEN** the viewport is 390px wide
- **THEN** boxes start 16px from each edge and nothing scrolls sideways

### Requirement: Full-bleed exceptions

Only a carousel track MAY extend past the right gutter to the viewport edge, so the next card peeks in. Its first card SHALL still line up with the left gutter.

#### Scenario: Card row

- **WHEN** a carousel renders
- **THEN** its first card aligns with the gutter and the last visible card is cut by the viewport edge

### Requirement: Section rhythm

Consecutive top-level sections SHALL be separated by 144px on desktop and 96px under 768px. Inside a section, the header block and the content below it SHALL be separated by 48px (32px on mobile).

#### Scenario: Two sections

- **WHEN** one section follows another on desktop
- **THEN** the space between their boxes is 144px

### Requirement: Column grid

Layouts inside the frame SHALL use a 12-column grid with a 24px column gap on desktop, 8 columns with 16px gaps on tablet and 4 columns with 16px gaps on mobile.

#### Scenario: Three cards

- **WHEN** three equal cards sit in one row on desktop
- **THEN** each spans 4 of 12 columns with 24px between them

### Requirement: Breakpoints

Layout changes SHALL happen only at 640, 768, 1024 and 1280px.

#### Scenario: Resizing

- **WHEN** the window is resized from 1440px down to 360px
- **THEN** layouts change only at the listed widths and no width in between scrolls sideways
