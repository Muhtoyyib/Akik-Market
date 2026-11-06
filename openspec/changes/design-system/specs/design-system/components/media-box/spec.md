## Purpose

Defines the rounded box that holds a photo or looping video, with optional content laid over it. It is the main building block of the Matic-style layout.

## ADDED Requirements

### Requirement: Shape and fill

A media box SHALL have a fixed aspect ratio from the imagery spec, `radius-md` (or `radius-lg` for full-width banners), clip its media to that shape and show a `card`-coloured fill until the media loads.

#### Scenario: Media not loaded yet

- **WHEN** the box renders before its image arrives
- **THEN** a rounded `card`-coloured box of the right size is shown

### Requirement: Image or video

A media box SHALL hold either one image or one looping video, following the imagery spec for posters, autoplay, the pause control and reduced motion. The pause control SHALL sit 24px from the bottom-left corner (16px on mobile).

#### Scenario: Video box

- **WHEN** a media box holds a looping clip
- **THEN** a round pause button sits in its bottom-left corner and works as the imagery spec describes

### Requirement: Overlay content

A media box MAY hold overlay content (text, buttons, tabs) placed bottom-left, bottom-centre or as an inset card on the right. Overlay text SHALL sit on a scrim that keeps contrast at 4.5:1 or more.

#### Scenario: Quote over video

- **WHEN** a customer quote is laid over a video
- **THEN** a gradient scrim under the text keeps it readable on every frame

### Requirement: Caption below

When a media box has a caption, the caption SHALL sit below the box, not inside it: an `h3`-style title in `ink` and a `body` line in `ink-muted`, 16px below the box.

#### Scenario: Card with caption

- **WHEN** a carousel card has a title and description
- **THEN** both render under the media box
