## Purpose

The About page's route, section order, metadata and the links that lead into it.

Source: the house style; each section names its own source.

## ADDED Requirements

### Requirement: Route and sections

`/about` SHALL render, in order: founder, timeline, values, team, projects banner and the closing contact block, separated by the section rhythm. Sections with no content SHALL be left out.

#### Scenario: Before the owner sends team photos

- **WHEN** the team content is empty
- **THEN** the page goes from values straight to the projects banner

### Requirement: Links in

Once `/about` exists, Home's founder link "Read our story", the header's About link and the footer's Company column SHALL link to it.

#### Scenario: After shipping

- **WHEN** `/about` is listed for prerendering
- **THEN** Home shows "Read our story" linking to `/about`

### Requirement: Metadata

The page SHALL have the title "About · Akik" and a description of how Akik grew from phones to three businesses.

#### Scenario: Title

- **WHEN** `/about` is built
- **THEN** its title is "About · Akik"
