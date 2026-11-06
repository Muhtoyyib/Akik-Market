## Purpose

The top of a business page: its footage, what it promises and one way to start.

Source: Matic P2 (media box with the headline below it), as built for Home's hero.

## ADDED Requirements

### Requirement: Media box and heading

The hero SHALL show one media box (16:9 on desktop, 4:5 on phones) with the business's footage or photo, then below it the business name as a `type-label` eyebrow, one `h1` with its promise, a `primary` WhatsApp pill and a reassurance line of three short claims separated by dots.

#### Scenario: Phones hero

- **WHEN** the Phones page loads
- **THEN** the eyebrow reads "Phones & Gadgets" and there is exactly one `h1`

### Requirement: Video rules

Video SHALL follow Home's hero rules: poster first, muted, no autoplay under reduced motion, a pause control. Without footage the box SHALL show a still photo.

#### Scenario: Reduced motion

- **WHEN** the visitor prefers reduced motion
- **THEN** the poster shows and the video doesn't play
