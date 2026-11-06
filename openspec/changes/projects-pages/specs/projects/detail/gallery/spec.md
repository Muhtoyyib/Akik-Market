## Purpose

More photos of the project.

Source: Matic P4 swipe row, as built for Home (design D1).

## ADDED Requirements

### Requirement: Photo row

When a project has more than one photo, the rest SHALL show in a swipe row of 3:2 photos with the next photo peeking, with arrow buttons from 1024px when the row overflows. With one photo the gallery SHALL be left out.

#### Scenario: Six photos

- **WHEN** a project has six photos
- **THEN** five show in the gallery row after the hero photo

### Requirement: Accessible photos

Photos of the owner's real projects SHALL have alt text describing them. Placeholder photos SHALL have empty alt text so the page doesn't claim them as Akik's work.

#### Scenario: Placeholder project

- **WHEN** the project is a placeholder
- **THEN** its gallery photos have empty alt text
