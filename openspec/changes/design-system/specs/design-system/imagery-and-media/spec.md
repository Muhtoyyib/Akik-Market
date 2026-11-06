## Purpose

Defines how photos and video are framed, loaded and described. Most of the site's character comes from the owner's real footage, so it must look good and load fast on mobile data.

## ADDED Requirements

### Requirement: Real media only

Every photo and video SHALL be of Akik's own products, sites, vehicles, shop or people, supplied by the owner, with his permission for any customer who appears. Stock photos and generated images SHALL NOT be used to stand for Akik's work.

#### Scenario: Missing media

- **WHEN** a section has no owner-supplied media yet
- **THEN** the section is left out, not filled with stock imagery

### Requirement: Aspect ratios

Media SHALL be cropped to one of: 16:9 (hero and full-width banners), 4:5 (carousel and division cards), 3:2 (news and project cards), 1:1 (thumbnails). Media SHALL fill its box and be cropped, never stretched or letterboxed.

#### Scenario: Portrait phone video in a 16:9 box

- **WHEN** a portrait clip is placed in a 16:9 hero box
- **THEN** it is cropped to fill the box with the subject kept in frame

### Requirement: Looping video

Short looping clips SHALL be muted, play inline and have no audio track. Any clip longer than 5 seconds SHALL have a visible pause control. Each clip SHALL have a poster image that is shown until it plays.

#### Scenario: Visitor pauses a loop

- **WHEN** the visitor presses pause on a looping clip
- **THEN** the clip stops and the control changes to play, with its accessible name updated

### Requirement: Loading

The first media box on a page SHALL load eagerly with its dimensions reserved. All other media SHALL load only as it nears the viewport. Every image and video SHALL reserve its space so the layout does not jump.

#### Scenario: Slow connection

- **WHEN** the page loads on a slow mobile connection
- **THEN** the boxes keep their size while media loads and text below does not move

### Requirement: Weight

Photos SHALL be served in a modern format at the size they display, with smaller sizes for phones. Looping clips SHALL be short and compressed for mobile data.

#### Scenario: Phone visitor

- **WHEN** a 390px-wide phone loads a full-width image
- **THEN** it downloads an image sized for that screen, not the desktop size

### Requirement: Text alternatives

Images that carry meaning SHALL have alt text that says what is shown ("Four-bedroom duplex at handover, Akobo"). Decorative media SHALL have empty alt text. Videos that carry meaning SHALL have a text equivalent nearby.

#### Scenario: Screen reader on a project card

- **WHEN** a screen reader reaches a project photo
- **THEN** it reads what the photo shows, not "image" or a file name
