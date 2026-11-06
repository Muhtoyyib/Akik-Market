## Purpose

Once the visitor scrolls past the header, a small pill stays in the top-right corner with the menu and the WhatsApp action, so contacting Akik is always one tap away.

Source: Matic P1 (collapsed header).

## ADDED Requirements

### Requirement: When it shows

The pill SHALL appear when the full header has scrolled out of view and disappear when it comes back. It SHALL fade in and out over 250ms (instantly under reduced motion).

#### Scenario: Scrolling past the header

- **WHEN** the full header leaves the viewport
- **THEN** the floating pill appears in the top-right corner

#### Scenario: Back to the top

- **WHEN** the full header is visible again
- **THEN** the pill is hidden and not focusable

### Requirement: Contents and look

The pill SHALL be a `card`-coloured `radius-full` container, 24px from the top and right edges (16px on mobile), holding a round menu button and the WhatsApp pill. It MAY use the one soft shadow the shape spec allows.

#### Scenario: Over a dark video

- **WHEN** the pill sits over a dark media box
- **THEN** it stays readable because of its own fill and shadow

### Requirement: Menu from the pill

The pill's menu button SHALL open the same menu as the navigation's small-screen menu, on every screen size.

#### Scenario: Desktop visitor deep in the page

- **WHEN** a desktop visitor opens the menu from the pill
- **THEN** the full page list opens with the same keyboard behaviour as the mobile menu

### Requirement: Doesn't hide content

The pill SHALL NOT cover a focused element. When keyboard focus moves to an element under the pill, the page SHALL scroll so that element is visible.

#### Scenario: Tabbing through a section

- **WHEN** focus lands on a link behind the pill
- **THEN** the link is scrolled into view below the pill
