## Purpose

How a visitor asks about an item, and what happens after.

Source: each card's WhatsApp link (as on Home); Matic P8 rows for the next steps.

## ADDED Requirements

### Requirement: One tap per item

Each card SHALL open WhatsApp to its business's number, prefilled with "Hi Akik, I'm interested in the {item name}", in a new tab with safe link attributes.

#### Scenario: Asking about a duplex

- **WHEN** a visitor taps the "4-bedroom detached duplex" card
- **THEN** WhatsApp opens to the Engineering number with that name in the message

### Requirement: What happens next

Under the grid, three icon rows SHALL say what happens after messaging (for example: we reply with photos and papers, you visit or inspect, you agree and pay in person). They SHALL be placeholders until the owner confirms them.

#### Scenario: Report

- **WHEN** the report runs
- **THEN** each step is listed under Listings
