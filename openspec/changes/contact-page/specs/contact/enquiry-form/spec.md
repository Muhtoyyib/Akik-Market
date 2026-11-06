## Purpose

A longer enquiry, routed to the right business, sent without a server.

Source: house style with Matic's underline field (P11); see design D1 and D2.

## ADDED Requirements

### Requirement: Fields

The form SHALL ask, in order: which business (a required choice of the three, preselected when the page is opened with `?business=<key>`), the visitor's name (required), what it's about (optional, one line), and the message (required, at most 1,000 characters, with a live count). It SHALL NOT ask for email, phone or address, since the reply comes in WhatsApp or email.

#### Scenario: Opened from the Autos page

- **WHEN** a visitor opens `/contact?business=autos`
- **THEN** Autos is already chosen

### Requirement: Checking before sending

Pressing "Send on WhatsApp" with a required field empty SHALL keep the visitor on the page, show an error under each problem field, and move focus to the first one. Errors SHALL be announced by screen readers.

#### Scenario: Missing message

- **WHEN** the visitor sends with no message
- **THEN** "Write your message" appears under the field, focus moves there, and WhatsApp doesn't open

### Requirement: Sending opens WhatsApp

A valid form SHALL open WhatsApp to the chosen business's number in a new tab, prefilled with the name, topic and message. A secondary "Send by email instead" link SHALL open the mail app to the site email with the same text. The site SHALL NOT send or store the form anywhere else.

#### Scenario: Valid enquiry

- **WHEN** a visitor chooses Engineering, writes their name and message and sends
- **THEN** WhatsApp opens to the Engineering number with their text, and no network request is made by the page

### Requirement: Works without JavaScript failing silently

Before JavaScript loads, the form SHALL show a line saying the business's WhatsApp links above work too, and the send button SHALL not do anything misleading.

#### Scenario: Slow connection

- **WHEN** the page is shown before scripts load
- **THEN** the channels above are usable and the form doesn't submit to a missing server
