## Purpose

What the Autos page adds: what the inspection covers, and financing once the owner confirms it.

Source: Matic P8 rows.

## ADDED Requirements

### Requirement: Inspection report

The section SHALL list what every car is checked for before it is listed, as icon rows (for example engine, body, papers, test drive), with a line saying the report is shared before payment. All of it SHALL be a placeholder until the owner confirms it.

#### Scenario: Inspection rows

- **WHEN** the Autos page renders
- **THEN** the inspection checks show as rows, each listed in the placeholder report

### Requirement: Financing only when offered

A financing block SHALL render only when the content says financing is offered, with terms supplied by the owner. It SHALL NOT render as a placeholder.

#### Scenario: Owner hasn't confirmed financing

- **WHEN** the content doesn't mark financing as offered
- **THEN** the Autos page shows no financing block and no mention of financing
