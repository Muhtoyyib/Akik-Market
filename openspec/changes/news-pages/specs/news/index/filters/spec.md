## Purpose

Showing only one business's posts.

Source: the design system's pill tabs.

## ADDED Requirements

### Requirement: Tabs by business

Pill tabs SHALL offer "All" and one tab per business with at least one post ("Phones", "Homes", "Cars"). With posts from only one business there SHALL be no tabs.

#### Scenario: No car posts

- **WHEN** no post is about Autos
- **THEN** there's no Cars tab

### Requirement: Shareable selection

Choosing a tab SHALL update the grid without a page load and set `?business=<key>`. Opening that address SHALL select the tab; an unknown value SHALL select "All".

#### Scenario: Shared link

- **WHEN** a visitor opens `/news?business=engineering`
- **THEN** the Homes tab is selected and only Engineering posts show
