## Purpose

Real items this business has right now.

Source: Krea media card carousel (captured, frame 1), as built for Home's Featured now.

## ADDED Requirements

### Requirement: Items from the listings collection

The section SHALL show up to eight of this business's items from the shared listings collection, newest first, in the item card and carousel built for Home's Featured now: name, detail, price or "PRICE ON REQUEST", and the card links to WhatsApp about that item.

#### Scenario: Engineering stock

- **WHEN** the listings collection has five Engineering items
- **THEN** five cards show, newest first, each opening WhatsApp to the Engineering number about that item

### Requirement: See all

Under the row a text link SHALL lead to the Listings page filtered to this business once that page exists and shows this business; otherwise it SHALL open WhatsApp to the business. The Phones page SHALL use WhatsApp, because the Listings page doesn't list phones.

#### Scenario: Listings page shipped

- **WHEN** `/listings` exists
- **THEN** the Autos "See all cars" link goes to the Listings page with Cars selected

### Requirement: Left out when empty

With no items for this business, the section SHALL be left out.

#### Scenario: Nothing in stock

- **WHEN** Autos has no listings
- **THEN** there is no stock section on `/autos`
