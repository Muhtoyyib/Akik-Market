## Purpose

Defines which icons the site uses and how they look, so icons from different pages match.

## ADDED Requirements

### Requirement: One icon set

Icons SHALL come from one line-icon set with rounded joins. Brand marks (WhatsApp, Instagram, TikTok, X, Facebook) SHALL use each brand's official mark, in one colour.

#### Scenario: Mixed sets

- **WHEN** two icons appear side by side
- **THEN** both come from the same set, with the same stroke width

### Requirement: Size and stroke

Icons SHALL be 16, 20 or 24px with a 1.5px stroke and SHALL take their colour from the surrounding text.

#### Scenario: Icon in a feature row

- **WHEN** an icon sits beside an `h3` in a feature list
- **THEN** it is 24px, 1.5px stroke, in the text colour

### Requirement: Round icon button

Icon-only controls (carousel arrows, play and pause, the "more" arrow beside a text link) SHALL be circles of 40px (24px for the inline arrow), either outlined with `line` or filled with `ink`. Each SHALL have an accessible name and a touch target of at least 44 by 44px.

#### Scenario: Carousel arrow

- **WHEN** a screen reader reaches the next-slide control
- **THEN** it announces a name such as "Next project"

### Requirement: Decorative icons

Icons that repeat nearby text SHALL be hidden from assistive technology.

#### Scenario: Icon next to its label

- **WHEN** a truck icon sits beside the text "Delivery across Ibadan"
- **THEN** the icon is not announced separately
