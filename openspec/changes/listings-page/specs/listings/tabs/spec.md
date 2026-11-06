## Purpose

Switching between homes and cars.

Source: the design system's pill tabs, as on Home's Featured now.

## ADDED Requirements

### Requirement: Homes and Cars

Pill tabs SHALL offer "Homes" and "Cars". A kind with no items SHALL have no tab; with only one kind left there SHALL be no tabs. Each tab panel SHALL use its business's accent.

#### Scenario: No cars listed

- **WHEN** the collection has no cars
- **THEN** there are no tabs and the grid shows homes

### Requirement: Shareable selection

Choosing a tab SHALL update the grid without a page load and set `?type=homes` or `?type=cars`. Opening such an address SHALL select that tab; anything else SHALL select the first tab.

#### Scenario: Shared cars link

- **WHEN** a visitor opens `/listings?type=cars`
- **THEN** the Cars tab is selected
