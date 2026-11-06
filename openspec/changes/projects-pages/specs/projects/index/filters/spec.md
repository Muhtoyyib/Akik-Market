## Purpose

Switching the grid between project types.

Source: the design system's pill tabs, as used on Home's Featured now.

## ADDED Requirements

### Requirement: Tabs by type

Above the grid, pill tabs SHALL offer "All" and one tab per project type present in the collection. A type with no projects SHALL have no tab. With only one type, there SHALL be no tabs.

#### Scenario: Only buildings so far

- **WHEN** every project is of one type
- **THEN** no tabs show and the grid lists them all

### Requirement: Shareable selection

Choosing a tab SHALL update the grid without a page load and set `?type=<type>` in the address. Opening that address SHALL select the tab. An unknown type SHALL fall back to "All".

#### Scenario: Shared link

- **WHEN** a visitor opens `/projects?type=estates`
- **THEN** the Estates tab is selected and only estates show

#### Scenario: Bad link

- **WHEN** a visitor opens `/projects?type=boats`
- **THEN** "All" is selected
