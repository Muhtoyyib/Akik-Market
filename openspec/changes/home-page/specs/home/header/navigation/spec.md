## Purpose

Home's full header: wordmark, links to Home's sections and the WhatsApp action, plus the menu on small screens.

Source: Matic P1 (header).

## ADDED Requirements

### Requirement: Contents

The header SHALL show, left to right: the Akik wordmark linking to `/`, the section links (see "Section links") and a `primary` "Chat on WhatsApp" pill. Home's header SHALL NOT link to other pages; visitors reach those from the sections, cards and footer.

#### Scenario: Other pages ship

- **WHEN** the About page is built
- **THEN** Home's header still shows the section links and no page links

### Requirement: Section links

The header SHALL link to Home's own sections, in page order: Businesses, Featured, Stories, News, Visit us. A section left out for having no content SHALL get no link. Choosing a section link SHALL bring that section's top into view below the header and move focus to its heading; from the menu it SHALL close the menu first and leave focus on the heading rather than the menu button.

#### Scenario: A section is empty

- **WHEN** Home has no news posts
- **THEN** the header has no News link

#### Scenario: Jumping from the menu

- **WHEN** a visitor on a phone opens the menu and chooses News
- **THEN** the menu closes, the News section is in view below the header and its heading has focus

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
