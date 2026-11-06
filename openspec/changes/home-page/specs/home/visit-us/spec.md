## Purpose

Akik's customers buy in person. This section makes the shop easy to find and each business easy to reach.

Source: Obvious closing block (full-width photo box, centred heading, one pill; `docs/design-reference/screenshots/lookup/obvious-11.png`), rebuilt with the design-system media box, plus a contact row below it.

## ADDED Requirements

### Requirement: Shop banner

The section SHALL open with a full-width 16:9 media box (`radius-lg`; 4:5 on mobile) showing the shop, with a scrim and, centred over it: an `h2` (placeholder "Come and see us at Iwo Road"), the address in `body-lg` ("Iwo Road Shopping Complex, Ibadan", real, from the owner's Instagram bio) and an `on-dark` pill "Get directions" that opens the shop's location in the visitor's maps app.

#### Scenario: Get directions on a phone

- **WHEN** a visitor taps "Get directions"
- **THEN** their maps app opens at the shop's location

### Requirement: Contact row

Below the banner the section SHALL show three equal columns, one per business, each with: the business name as an eyebrow in its accent colour, a WhatsApp link and a phone link (numbers are placeholders until the owner confirms them) and the opening hours line (placeholder). On mobile the columns SHALL stack. Columns SHALL have a 1px `line` top border and no box, as in the shape spec.

#### Scenario: Calling Autos

- **WHEN** a visitor taps the Autos phone link on a phone
- **THEN** the phone app opens with the Autos number

### Requirement: Readable contacts

Phone numbers SHALL be written in the local format with spacing (`0706 547 0198` style) and their links SHALL use the international format.

#### Scenario: Screen reader on a number

- **WHEN** a screen reader reaches a phone link
- **THEN** it announces "Call Autos" followed by the number

### Requirement: Structured data agrees

The address and phone numbers shown here SHALL be the same values used in the page's structured data.

#### Scenario: Number changes

- **WHEN** a number in the content source changes
- **THEN** both this section and the structured data show the new number
