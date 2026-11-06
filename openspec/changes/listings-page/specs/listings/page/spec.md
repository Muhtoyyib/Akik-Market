## Purpose

The Listings page's route, header, metadata and the links into it.

Source: Matic P3 section header, carrying the `h1`.

## ADDED Requirements

### Requirement: Route and header

`/listings` SHALL open with one `h1`, a one-line intro saying these are available now and how to ask about one, then the tabs and the grid.

#### Scenario: Arriving

- **WHEN** a visitor opens `/listings`
- **THEN** there is exactly one `h1`, followed by the tabs

### Requirement: Links in

Once `/listings` exists, the Engineering and Autos pages' "See all" links and Home's Featured now "See all" links for Homes and Cars SHALL link to it with the matching tab selected. The Phones links SHALL stay unchanged.

#### Scenario: From the Autos page

- **WHEN** a visitor follows "See all cars" on `/autos`
- **THEN** they land on `/listings?type=cars` with Cars selected

### Requirement: Metadata

The page SHALL have the title "Listings · Akik" and a description naming homes and cars for sale in Ibadan.

#### Scenario: Title

- **WHEN** `/listings` is built
- **THEN** its title is "Listings · Akik"
