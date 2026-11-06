## Purpose

What the privacy page must cover once its text is supplied.

Source: the owner's or his lawyer's text; see design D1.

## ADDED Requirements

### Requirement: Covers what the site does

The privacy text SHALL say that the site stores no form data, that the Contact form and every WhatsApp link open WhatsApp or email (whose own policies then apply), that the site sets no cookies and runs no analytics (until that changes), and how to contact Akik about personal data. A unit test SHALL check the supplied text has a section on each of these.

#### Scenario: Text missing a section

- **WHEN** the supplied text has no section on contacting Akik about personal data
- **THEN** the content test fails naming the missing topic
