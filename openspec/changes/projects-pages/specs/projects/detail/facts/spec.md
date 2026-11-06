## Purpose

The project's key facts and its story.

Source: Matic P8 rows with mono labels.

## ADDED Requirements

### Requirement: Facts list

Beside the story on desktop (above it on phones), the page SHALL list the project's facts as label and value pairs: location (area and city only), year completed, type, and size (units, bedrooms or plot size). Labels SHALL use `type-label`. A fact the content doesn't have SHALL be left out.

#### Scenario: No size given

- **WHEN** a project has no size
- **THEN** the list shows location, year and type only

### Requirement: Story

The story SHALL be up to five short paragraphs at the readable line length.

#### Scenario: Reading the story

- **WHEN** the story renders at 1440px
- **THEN** its lines stay within the readable length from the typography spec
