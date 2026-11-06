## Purpose

Customer stories with photo or video, one per tab.

Source: Matic P6, the story box with tabs built for Home's Customer stories.

## ADDED Requirements

### Requirement: Every story

The story box SHALL offer one tab per story in the collection (labelled by business and first name when a business has more than one), with the same playback rules as Home: switching tabs stops playback, and photo-only stories have no play button.

#### Scenario: Two Autos stories

- **WHEN** the collection has two Autos stories
- **THEN** their tabs read "Cars · Ifeoma" and "Cars · <second name>"

### Requirement: Left out without stories

With no stories the section SHALL be left out.

#### Scenario: Empty collection

- **WHEN** there are no stories
- **THEN** the page starts with the quote wall
