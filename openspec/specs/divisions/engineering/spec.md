# engineering Specification

## Purpose

What the Engineering & Real Estate page adds: construction services and a way into Projects.

Source: Matic P8 rows for services; Matic P7 (banner with inset link card), as built for Home's Projects banner.

## Requirements

### Requirement: Construction services

The section SHALL list the construction services offered (for example building, renovation, land sales) as icon rows with a title and a line each. Every service SHALL be a placeholder until the owner confirms it.

#### Scenario: Services render

- **WHEN** the Engineering page renders
- **THEN** each service shows as a row with an icon, title and line

### Requirement: Projects banner

Under the services, the Projects banner from Home SHALL appear, linking to `/projects` once it exists and to WhatsApp before then, with the heading saying where it goes.

#### Scenario: Projects page shipped

- **WHEN** `/projects` exists
- **THEN** the banner links to it
