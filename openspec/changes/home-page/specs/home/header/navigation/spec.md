## Purpose

The full header at the top of every page: wordmark, page links and the WhatsApp action, plus the menu on small screens.

Source: Matic P1 (header).

## ADDED Requirements

### Requirement: Contents

The header SHALL show, left to right: the Akik wordmark linking to `/`, links to the pages that exist (from the sitemap: About, the three division pages, Projects, News, Contact), and a `primary` "Chat on WhatsApp" pill. Links to pages not built yet SHALL be left out.

#### Scenario: Only Home exists

- **WHEN** Home is the only built page
- **THEN** the header shows the wordmark and the WhatsApp pill and no dead links

### Requirement: Current page

The link to the current page SHALL be marked as current for assistive technology and shown in `ink` with an underline; the others in `ink-muted`.

#### Scenario: On the Autos page

- **WHEN** the Autos page renders the header
- **THEN** the Autos link is marked current

### Requirement: WhatsApp action

The pill SHALL open WhatsApp to Akik's main number with a short prefilled greeting, following the button spec's link rules.

#### Scenario: Tapping on a phone

- **WHEN** a visitor taps "Chat on WhatsApp" on a phone
- **THEN** WhatsApp opens with the greeting ready to send

### Requirement: Menu on small screens

Under 1024px the page links SHALL move into a menu opened by a round menu button beside the WhatsApp pill. The menu SHALL open as a full-width panel, close on Escape, on the close button and when a link is chosen, return focus to the menu button when closed, and keep focus inside while open.

#### Scenario: No pages to list

- **WHEN** Home is the only built page
- **THEN** there is no menu button in the header or the floating pill, rather than one that opens an empty panel

#### Scenario: Keyboard closes the menu

- **WHEN** the menu is open and the visitor presses Escape
- **THEN** the menu closes and focus returns to the menu button

#### Scenario: Screen reader

- **WHEN** a screen reader reaches the menu button
- **THEN** it announces "Menu", its expanded state, and what it controls
