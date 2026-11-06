## Purpose

Lets the visitor switch the featured row between phones, properties and cars, so each person sees what they came for.

Source: design-system pill tabs, placed above a Krea-style card carousel (`docs/design-reference/screenshots/lookup/krea-01.png`).

## ADDED Requirements

### Requirement: Section header and tabs

The section SHALL open with a left-aligned section header (eyebrow "Featured now", `h2` placeholder "Just in at Akik") and, on the same row on desktop (below it on mobile), pill tabs with three options: Phones, Homes, Cars. The tabs SHALL follow the pill-tabs component spec.

#### Scenario: Desktop layout

- **WHEN** the section renders at 1440px
- **THEN** the heading sits on the left and the tabs on the right of the same row

### Requirement: Default tab

Phones SHALL be selected when the page loads, since phones are the business people know Akik for.

#### Scenario: First load

- **WHEN** Home loads
- **THEN** the Phones tab is selected and phone items are shown

### Requirement: Accent follows the tab

The selected tab's panel SHALL take that business's accent colour for item eyebrows and the panel's action.

#### Scenario: Switching to Cars

- **WHEN** the visitor selects Cars
- **THEN** item eyebrows use the `autos` colour

### Requirement: Panel action

Under the carousel, each panel SHALL show one `link` button to that business: "See all phones", "See all properties" or "See all cars", linking to its division page once it exists, otherwise to WhatsApp for that business.

#### Scenario: Division page missing

- **WHEN** the Phones page isn't built
- **THEN** "See all phones" opens WhatsApp to the Phones number

### Requirement: Empty business

A business with no featured items in the content source SHALL NOT get a tab. If only one business has items, the tabs SHALL be left out.

#### Scenario: No cars featured

- **WHEN** the content source has no featured cars
- **THEN** only the Phones and Homes tabs appear
