## Purpose

Lets customers of each business tell their story on video: someone who bought a phone, a family that moved into a home, a driver with their car.

Source: Matic P6 (full-width video box with overlay and segmented pill tabs).

## ADDED Requirements

### Requirement: Video box with tabs

The section SHALL be a full-width 16:9 media box (`radius-md`; 4:5 on mobile) with pill tabs centred near the bottom: Phones, Homes, Cars. Each tab SHALL show one story: its video (or photo until footage exists), the customer's name and "customer since" year in `label` style, and their quote in the `quote` style, bottom-left over a scrim (centred on mobile).

#### Scenario: Switching to Homes

- **WHEN** the visitor selects Homes
- **THEN** the box shows the Homes story's media, name and quote

### Requirement: Play with sound

Each story video SHALL start muted and looping like other clips, and SHALL have a round play button that restarts it with sound and controls, and captions. Switching tab SHALL stop the current video.

#### Scenario: Playing a story

- **WHEN** the visitor presses play on the Cars story
- **THEN** the video plays from the start with sound and captions available

#### Scenario: Switching while playing

- **WHEN** a story is playing with sound and the visitor selects another tab
- **THEN** the playing video stops

### Requirement: Placeholder stories

Until the owner supplies real customers and footage, each story SHALL use a placeholder photo, a first name only and a marked placeholder quote. The play button SHALL be left out when a story has no video.

#### Scenario: No video yet

- **WHEN** a story has only a photo
- **THEN** no play button is shown

### Requirement: Accessible tab panel

The tabs SHALL control the story panel per the pill-tabs spec, and the quote text SHALL be real text, not part of the video.

#### Scenario: Screen reader

- **WHEN** a screen reader enters the selected panel
- **THEN** it reads the name, year and quote
