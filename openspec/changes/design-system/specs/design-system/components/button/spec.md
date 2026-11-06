## Purpose

Defines the buttons and the text link every page uses for calls to action.

## ADDED Requirements

### Requirement: Variants

The button SHALL come in four variants:

| Variant     | Look                                             | Use                                     |
| ----------- | ------------------------------------------------ | --------------------------------------- |
| `primary`   | `ink` fill, `on-dark` text, pill                 | The main action in a section            |
| `secondary` | transparent, 1px `ink` border, `ink` text, pill  | A second action beside a primary        |
| `on-dark`   | `on-dark` fill, `ink` text, pill                 | The main action over navy, ink or media |
| `link`      | `ink` text with a 24px round arrow icon after it | Quiet onward links ("See all projects") |

Pill buttons SHALL be 48px tall with 24px side padding (40px tall with 20px under 768px) and use `small` text at weight 600.

#### Scenario: Two actions together

- **WHEN** a section offers two actions
- **THEN** the first is `primary` (or `on-dark` on a dark surface) and the second is `secondary` or `link`

### Requirement: One element per job

A control that goes to another page or an external app (WhatsApp, phone, social) SHALL be a link. A control that changes something on the page SHALL be a button. Both SHALL look the same for the same variant.

#### Scenario: WhatsApp action

- **WHEN** a visitor activates "Chat on WhatsApp"
- **THEN** it is a link that opens WhatsApp with the division's number and a short prefilled message, in a new tab on desktop

### Requirement: Accessible names and focus

Every button SHALL have a visible text label that says what happens ("Chat on WhatsApp", not "Click here"). Keyboard focus SHALL show a 2px outline offset 2px from the pill, in `brand-navy` (or `on-dark` on dark surfaces), and SHALL never be removed.

#### Scenario: Keyboard user

- **WHEN** a keyboard user tabs onto a button
- **THEN** a clearly visible focus ring appears around the whole pill

### Requirement: States

Buttons SHALL show hover (fill or border darkens by one step, 150ms), pressed, focus-visible and disabled (50% opacity, not focusable as a link, cursor not-allowed) states. A button SHALL NOT move or change size in any state.

#### Scenario: Hover

- **WHEN** the pointer is over a `primary` button
- **THEN** only its fill colour changes

### Requirement: Touch target

Every button and link SHALL have a touch target of at least 44 by 44px.

#### Scenario: Text link on mobile

- **WHEN** a `link` button renders on a 390px screen
- **THEN** its tappable area is at least 44px tall
