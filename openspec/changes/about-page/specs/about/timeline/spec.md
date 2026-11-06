## Purpose

How Akik grew: phones first, then engineering and real estate, then cars.

Source: house style (section header, ordered list, media box); see design D1.

## ADDED Requirements

### Requirement: Three chapters in order

The section SHALL show a section header and an ordered list of three chapters, oldest first: Phones & Gadgets, Engineering & Real Estate, Autos. Each chapter SHALL have its year in `type-figure`, a heading, two or three sentences and a 3:2 photo. On desktop the photo SHALL sit beside the text, alternating sides; on phones it SHALL sit above the text.

#### Scenario: Reading order

- **WHEN** a screen reader reaches the timeline
- **THEN** it announces a list of three items in the order phones, engineering, autos

### Requirement: Years from site-wide facts

The phones chapter's year SHALL be the site start year, and each year SHALL be a placeholder until the owner confirms it.

#### Scenario: Owner confirms 2020

- **WHEN** the start year changes to 2020
- **THEN** the phones chapter, Home's divisions heading and the footer counter all show 2020
