## Purpose

Answers the question every buyer has before spending money: can I trust this seller? One promise per business, then one action.

Source: Matic P8 (image left; heading, icon rows and pill right).

## ADDED Requirements

### Requirement: Layout

On desktop the section SHALL use two halves of the 12-column grid: a 4:5 media box on the left (columns 1–6) and the content on the right (columns 8–12). On mobile the media SHALL come first and the content below.

#### Scenario: Desktop

- **WHEN** the section renders at 1440px
- **THEN** the image fills the left half and the rows sit on the right

### Requirement: Content

The right side SHALL show an `h2` (placeholder "Buy with confidence"), then four rows, each with a 24px icon, an `h3`-styled title and one `body` line in `ink-muted`:

| Icon            | Title (placeholder)  | Line (placeholder)                           |
| --------------- | -------------------- | -------------------------------------------- |
| shield          | Genuine phones       | Every device is original, with warranty.     |
| clipboard-check | Inspected cars       | Each car is checked before it's listed.      |
| file-check      | Verified land papers | We confirm the documents before you pay.     |
| key             | Handover you can see | Visit the site or the car before you commit. |

Then a `primary` "Chat on WhatsApp" pill.

#### Scenario: Rows render

- **WHEN** the section renders
- **THEN** four rows appear in this order, each with its icon hidden from assistive technology

### Requirement: Promises are owner-approved

Each row's claim SHALL be confirmed by the owner before launch; until then the rows are marked placeholders.

#### Scenario: Placeholder report

- **WHEN** the report runs
- **THEN** all four rows are listed
