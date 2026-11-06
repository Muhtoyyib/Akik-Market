## Purpose

Every listed item of the selected kind.

Source: Krea media card (captured, frame 1), the item card built for Home's Featured now, in a grid.

## ADDED Requirements

### Requirement: Every item, newest first

The grid SHALL show every item of the selected kind from the shared listings collection, newest first, in four columns from 1280px, three from 1024px, two from 768px and one on phones. Each item SHALL use the shared item card (photo, name, detail, price or "PRICE ON REQUEST").

#### Scenario: Eleven homes

- **WHEN** the collection has eleven homes
- **THEN** all eleven show on the Homes tab, unlike Home's limit of eight

### Requirement: Count

Above the grid a `type-label` line SHALL state how many items are shown ("11 HOMES AVAILABLE").

#### Scenario: One car

- **WHEN** one car is listed
- **THEN** the line reads "1 CAR AVAILABLE"
