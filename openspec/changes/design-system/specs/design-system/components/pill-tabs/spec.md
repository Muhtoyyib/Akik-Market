## Purpose

Defines the segmented pill control that switches between related content, such as customer stories for Phones, Homes and Cars.

## ADDED Requirements

### Requirement: Look

Pill tabs SHALL be a row of pill-shaped options inside a pill-shaped track. The selected option has a solid fill (`on-dark` fill with `ink` text on dark surfaces, `ink` fill with `on-dark` text on light ones); the others are text only. Each option uses `small` text.

#### Scenario: Selected option

- **WHEN** "Cars" is selected
- **THEN** only the "Cars" pill is filled

### Requirement: Behaviour as tabs

Pill tabs SHALL behave as a tab list: one option selected at a time, the panel below showing the selected content, arrow keys moving between options, Home and End jumping to the first and last, and only the selected option in the Tab order.

#### Scenario: Keyboard switching

- **WHEN** a keyboard user focuses the tabs and presses the right arrow
- **THEN** the next option is selected and its panel is shown

#### Scenario: Screen reader

- **WHEN** a screen reader reaches the control
- **THEN** it announces a tab list, the selected tab and the number of tabs

### Requirement: Narrow screens

When the options don't fit the width, the track SHALL scroll sideways inside itself, with the selected option scrolled into view. The page SHALL NOT scroll sideways.

#### Scenario: Four options on a 360px screen

- **WHEN** the options are wider than the screen
- **THEN** the track scrolls and the selected pill stays visible

### Requirement: Switching

The selected pill's fill SHALL move to the new option over 250ms with the standard easing (instantly under reduced motion). Switching SHALL NOT change the page's scroll position.

#### Scenario: Switching while reading

- **WHEN** a visitor switches tabs
- **THEN** the page does not jump
