## Purpose

One strong photo of a building Akik delivered, with a single link to the projects.

Source: Matic P7 (full-width banner with inset link card).

## ADDED Requirements

### Requirement: Banner

The section SHALL be a full-width 16:9 media box (`radius-lg`) showing a finished building, with an `inset-link` card on the right, vertically centred, 32px from the edge. The card SHALL hold an eyebrow "Engineering & Real Estate" in the `engineering` accent, an `h3` (placeholder "Homes we've built and handed over") and an arrow.

#### Scenario: Desktop

- **WHEN** the banner renders at 1440px
- **THEN** the card sits over the right side of the photo

### Requirement: Link target

The card SHALL link to the Projects page once it exists. Until then it SHALL open WhatsApp to the Engineering number with a prefilled message asking about projects, and its heading and accessible name SHALL say so ("Ask about our projects on WhatsApp").

#### Scenario: Projects page not built

- **WHEN** the Projects page doesn't exist
- **THEN** the banner shows and its card opens WhatsApp to the Engineering number

### Requirement: Mobile

On mobile the media box SHALL be 4:5 and the card SHALL sit at the bottom of the box, inset 16px on each side.

#### Scenario: 390px phone

- **WHEN** the banner renders on a phone
- **THEN** the card spans the bottom of the photo with 16px insets
