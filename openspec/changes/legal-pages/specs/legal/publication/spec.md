## Purpose

Keeping stand-in legal text off the public site.

Source: design D1.

## ADDED Requirements

### Requirement: Published only when real

A legal page SHALL be listed for prerendering only when its text is marked real in the content source. While it's a placeholder, the page SHALL NOT be built and no link to it SHALL appear (the footer's Legal column stays hidden).

#### Scenario: Before the lawyer's text

- **WHEN** the privacy text is a placeholder
- **THEN** `/privacy` isn't built, the footer has no Legal column, and the placeholder report lists it as missing

#### Scenario: Text arrives

- **WHEN** the privacy text is supplied and marked real
- **THEN** `/privacy` is built and the footer's Legal column shows Privacy

#### Scenario: Placeholder listed by mistake

- **WHEN** a placeholder legal page is added to the prerender list
- **THEN** a unit test fails naming the page
