# phones Specification

## Purpose

What the Phones & Gadgets page adds: trade-ins, repairs and warranty, and the brands sold.

Source: Matic P8 rows, in two columns.

## Requirements

### Requirement: Services

The Phones page's division-specific section SHALL show a heading and up to three service groups (trade-in, repairs, warranty), each a title and up to three icon rows, followed by a WhatsApp pill prefilled "I'd like to ask about a trade-in or repair". Any group the owner hasn't confirmed SHALL be a placeholder.

#### Scenario: Warranty group

- **WHEN** the section renders
- **THEN** the warranty group states its terms as a placeholder until the owner confirms them

### Requirement: Brands in text

The brands sold SHALL be listed as text, not logos.

#### Scenario: Brand list

- **WHEN** the brands render
- **THEN** each is a word in a list, with no logo images
