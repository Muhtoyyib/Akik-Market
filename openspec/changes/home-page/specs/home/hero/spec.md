## Purpose

The first screen: Akik's footage leads, then one sentence says who Akik is, then one action.

Source: Matic P2 (media box with headline below).

## ADDED Requirements

### Requirement: Media box

The hero SHALL open with a 16:9 media box (`radius-md`) holding a looping montage of the three businesses: phones, a building, a car. It SHALL be the page's first media and load eagerly, following the media-box and imagery specs (poster, pause control, reduced motion).

#### Scenario: First paint

- **WHEN** Home loads
- **THEN** the hero box keeps its 16:9 space from the first paint and shows its poster until the clip plays

### Requirement: Page heading under the media

Below the media box, centred, the hero SHALL show the page's `h1` in the `display` style. Placeholder text: "Phones, homes and cars from one name you trust."

#### Scenario: Heading order

- **WHEN** the page's headings are listed
- **THEN** the hero heading is the only `h1`

### Requirement: Actions

Under the heading the hero SHALL show a `primary` "Chat on WhatsApp" pill and a `link` button "See what we do" that scrolls to the divisions section.

#### Scenario: See what we do

- **WHEN** a visitor activates "See what we do"
- **THEN** the page scrolls to the divisions section and focus moves to its heading

### Requirement: Reassurance line

Under the actions the hero SHALL show one `small` line in `ink-muted` of three short claims separated by dots. Placeholder: "Original phones · Inspected cars · Verified land papers". Under 640px the claims MAY wrap to two lines but SHALL NOT break inside a claim.

#### Scenario: Narrow screen

- **WHEN** the line doesn't fit on one row
- **THEN** it wraps between claims, never inside one

### Requirement: Mobile

On mobile the media box SHALL change to 4:5 so it fills more of the screen, and the heading SHALL use the mobile `display` size.

#### Scenario: 390px phone

- **WHEN** Home loads on a 390px phone
- **THEN** the media box is 4:5 and the heading and WhatsApp pill are visible after one scroll
