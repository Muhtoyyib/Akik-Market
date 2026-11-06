# how-buying-works Specification

## Purpose

How buying from this business works, step by step, so a first-time buyer knows what happens.

Source: Matic P8 (buy block: image beside icon rows and a pill), as built for Home's Buy with confidence.

## Requirements

### Requirement: Steps as icon rows

The section SHALL show a heading, a photo on one side and three to five steps on the other, each an icon, a title and a one-line explanation, then a `primary` WhatsApp pill. The steps SHALL be an ordered list. On phones the photo SHALL sit above the steps and the pill SHALL be full width.

#### Scenario: Engineering steps

- **WHEN** the Engineering section renders
- **THEN** a screen reader announces an ordered list of steps (for example: visit the site, check the papers, agree the price, handover)

### Requirement: Owner-approved promises

Every step that makes a promise (inspection, papers checked, warranty) SHALL be a placeholder until the owner confirms it.

#### Scenario: Placeholder report

- **WHEN** the report runs
- **THEN** each unconfirmed step is listed under its division page
