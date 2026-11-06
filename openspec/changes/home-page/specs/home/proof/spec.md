## Purpose

Shows that real customers trust Akik, with one big quote and one short quote for each business.

Source: Matic P5 (large quote with highlighted phrase, then three columns).

## ADDED Requirements

### Requirement: Lead quote

The section SHALL open with one customer quote in the `quote` style, centred, at most about 25 words, with one phrase in `brand-red`, followed by the customer's name and business in `label` style. The quote, name and business are placeholders and SHALL NOT name a real person until the owner supplies a real quote with permission.

#### Scenario: Placeholder quote

- **WHEN** the section renders with placeholder content
- **THEN** the quote and name are listed in the placeholder report

### Requirement: Highlight is not colour alone

The highlighted phrase SHALL also be marked so assistive technology and colour-blind visitors don't lose it (for example as emphasis).

#### Scenario: Screen reader

- **WHEN** a screen reader reads the quote
- **THEN** the highlighted phrase is announced as emphasised

### Requirement: Three columns

Below the lead quote, three equal columns (one per business, in growth order) SHALL each show a 1px `line` top border, a short quote in `h3` style and a `label` caption naming the business and the year, for example `PHONES & GADGETS · CUSTOMER SINCE 2023`. On mobile they SHALL stack.

#### Scenario: Mobile

- **WHEN** the section renders on a 390px screen
- **THEN** the three columns stack with 32px between them

### Requirement: Quotes are quotes

Each quote SHALL be marked up as a quotation with its source.

#### Scenario: Markup check

- **WHEN** the section's markup is inspected
- **THEN** each quote is a quotation element with its attribution in a caption
