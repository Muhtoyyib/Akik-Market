## Purpose

Home's full header: wordmark, links to Home's sections and the WhatsApp action, plus the menu on small screens.

Source: Matic P1 (header).

## ADDED Requirements

### Requirement: Contents

The header SHALL show, left to right: the Akik wordmark linking to `/`, the page links (see "Page links") and a `primary` "Chat on WhatsApp" pill.

#### Scenario: Other pages ship

- **WHEN** the About page is built
- **THEN** Home's header links to it

### Requirement: Page links

The header SHALL link to every built page in sitemap order, the same list as every other page (site page-layout spec, "Same shell on every page"). It SHALL NOT jump to Home's own sections. Changed 2026-11-06 at the user's request: the navbar should list the site's pages.

#### Scenario: A page isn't built

- **WHEN** the Contact page isn't built
- **THEN** the header has no Contact link

### Requirement: WhatsApp action

The pill SHALL open WhatsApp to Akik's main number with a short prefilled greeting, following the button spec's link rules.

#### Scenario: Tapping on a phone

- **WHEN** a visitor taps "Chat on WhatsApp" on a phone
- **THEN** WhatsApp opens with the greeting ready to send

### Requirement: Menu on small screens

Under 1024px the section links SHALL move into a menu opened by a round menu button beside the WhatsApp pill. The menu SHALL open as a full-width panel, close on Escape, on the close button and when a link is chosen, return focus to the menu button when closed, and keep focus inside while open.

#### Scenario: Nothing to list

- **WHEN** there are no section links
- **THEN** there is no menu button in the header or the floating pill, rather than one that opens an empty panel

#### Scenario: Keyboard closes the menu

- **WHEN** the menu is open and the visitor presses Escape
- **THEN** the menu closes and focus returns to the menu button

#### Scenario: Screen reader

- **WHEN** a screen reader reaches the menu button
- **THEN** it announces "Menu", its expanded state, and what it controls
