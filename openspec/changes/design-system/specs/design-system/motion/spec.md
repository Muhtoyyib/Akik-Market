## Purpose

Defines how things move: timing, easing, what hover may do and what happens when the visitor asks for less motion.

## ADDED Requirements

### Requirement: Timing and easing

Transitions SHALL use one easing curve, `cubic-bezier(0.4, 0, 0.2, 1)`, and one of three durations: 150ms for colour and opacity, 250ms for size and position of small controls, 400ms for panels and carousel moves.

#### Scenario: Button hover

- **WHEN** the pointer moves over a button
- **THEN** its colour changes over 150ms with the standard easing

### Requirement: Calm hover

Hover and press feedback SHALL change only colour, opacity or underline. Buttons, cards, icons and links SHALL NOT lift, grow, shrink or bounce.

#### Scenario: Card hover

- **WHEN** the pointer moves over a linked card
- **THEN** only its colour or the arrow icon's colour changes; its position and size stay the same

### Requirement: Entrance motion

Content MAY fade in once as it scrolls into view, over 400ms, moving no more than 16px. Content SHALL NOT animate again on later scrolls, and nothing SHALL be hidden until JavaScript runs.

#### Scenario: Scripts fail

- **WHEN** JavaScript fails to load
- **THEN** all content is visible in its final position

### Requirement: Reduced motion

When the visitor prefers reduced motion, entrance fades SHALL be removed, carousels SHALL move without animation and videos SHALL NOT autoplay; each shows its poster and a play button instead.

#### Scenario: Reduced-motion visitor

- **WHEN** the operating system asks for reduced motion
- **THEN** no element animates on scroll and no video plays until the visitor presses play
