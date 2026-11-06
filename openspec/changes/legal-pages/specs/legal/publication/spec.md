## Purpose

Making stand-in legal text read as a draft.

Source: design D1 (changed 2026-11-06: the preview shows every page).

## ADDED Requirements

### Requirement: Drafts are marked

Both legal pages SHALL be listed for prerendering. While a page's text is a placeholder, a notice under the date SHALL say it is a draft for review and that the final text will come from Akik's lawyer, and the placeholder report SHALL list it. Once the text is marked real, the notice SHALL go.

#### Scenario: Before the lawyer's text

- **WHEN** the privacy text is a placeholder
- **THEN** `/privacy` is built with the draft notice, the footer's Legal column shows Privacy, and the placeholder report lists the text

#### Scenario: Text arrives

- **WHEN** the privacy text is supplied and marked real
- **THEN** `/privacy` shows no draft notice
