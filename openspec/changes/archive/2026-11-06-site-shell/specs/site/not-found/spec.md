## Purpose

What a visitor sees on a path that doesn't exist.

Source: the house style (section header and button); none of the reference sites' 404 pages were captured.

## ADDED Requirements

### Requirement: Helpful 404

An unknown path SHALL return status 404 and show the shared layout with one `h1` ("We couldn't find that page"), one line of text, a link to Home and the "Chat on WhatsApp" action.

#### Scenario: Old link

- **WHEN** a visitor opens `/shop/iphone-11`
- **THEN** the response status is 404 and the page offers Home and WhatsApp

### Requirement: Not indexed

The 404 page SHALL tell search engines not to index it.

#### Scenario: Crawler

- **WHEN** a crawler reads the 404 page
- **THEN** it finds a `robots` meta tag with `noindex`
