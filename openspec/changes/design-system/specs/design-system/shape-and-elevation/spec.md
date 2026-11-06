## Purpose

Defines corner radii, borders and depth, so boxes look like one family.

## ADDED Requirements

### Requirement: Corner radii

Shapes SHALL use these radii, the same on every screen size:

| Token         | Value  | Use                                                   |
| ------------- | ------ | ----------------------------------------------------- |
| `radius-sm`   | 12px   | Inputs, small chips, thumbnails under 120px           |
| `radius-md`   | 24px   | Media boxes, cards, inset cards                       |
| `radius-lg`   | 32px   | The largest boxes: full-width banners, the footer box |
| `radius-full` | 9999px | Buttons, pill tabs, round icon buttons, badges        |

#### Scenario: Box inside a box

- **WHEN** a card sits inside a `radius-lg` banner
- **THEN** the inner card uses `radius-md`

### Requirement: Borders

Borders SHALL be 1px in the `line` colour. They separate items in lists and grids; boxes on the page are told apart by fill, not by borders.

#### Scenario: Three-column proof row

- **WHEN** columns of quotes sit side by side
- **THEN** each column has a 1px top border and no box outline

### Requirement: No shadows

Boxes, cards and buttons SHALL NOT use drop shadows. The one exception is the floating header pill, which MAY use a single soft shadow so it stays readable over media.

#### Scenario: Card on the page

- **WHEN** a card renders on the `page` background
- **THEN** it is told apart by its `card` fill and radius, with no shadow
