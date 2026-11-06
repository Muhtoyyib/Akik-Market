## Purpose

Every post as a card.

Source: Matic P9 blog grid, the card built for Home's News.

## ADDED Requirements

### Requirement: All posts, newest first

The grid SHALL show every post of the selected business, newest first, in Home's news card (photo, mono date, title over the bottom of the image), three columns from 1024px, two from 768px and one on phones. Each card SHALL be one link to its post.

#### Scenario: Card link

- **WHEN** a visitor activates a card
- **THEN** its post page opens

### Requirement: Home links to posts

Once the post pages exist, Home's news cards SHALL link to them and Home's action SHALL read "More news" and link to `/news`.

#### Scenario: After shipping

- **WHEN** `/news` is listed for prerendering
- **THEN** Home's cards link to `/news/<slug>`
