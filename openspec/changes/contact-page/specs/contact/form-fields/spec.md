## Purpose

The form field components: text field, text area, choice group and error message.

Source: Matic P11 footer field (underline only), rebuilt with the design-system tokens.

## ADDED Requirements

### Requirement: Labelled fields

Every field SHALL have a visible label above it in `type-small` at weight 600, tied to the control, and an optional hint under the label. Required fields SHALL say "required" in the label text, not by colour or symbol alone.

#### Scenario: Screen reader on the name field

- **WHEN** a screen reader reaches the name field
- **THEN** it announces "Your name, required" and the field type

### Requirement: Look and focus

Inputs SHALL have no box: an underline in `line`, turning `ink` on focus, with the standard focus outline. Text SHALL use `type-body`. Touch targets SHALL be at least 44px tall. The choice group SHALL be a set of pills, one selected at a time, operable with arrow keys.

#### Scenario: Keyboard on the business choice

- **WHEN** focus is on the business choice and the visitor presses the right arrow
- **THEN** the next business is selected

### Requirement: Errors

An error SHALL appear in text under its field, linked to the field so screen readers read it, with the field marked invalid. Colour SHALL NOT be the only sign of an error.

#### Scenario: Error read aloud

- **WHEN** focus moves to a field with an error
- **THEN** the screen reader reads the label and then the error
