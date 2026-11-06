## Purpose

The footer's links, social accounts and legal line.

Source: Matic P11 (link columns inside the footer box).

## ADDED Requirements

### Requirement: Footer box

The footer SHALL be a `brand-navy` box (`radius-lg`) inside the page gutters, with `on-dark` text, 64px padding on desktop and 24px on mobile, separated from the last section by the section rhythm and with a 16px gap below it to the page edge.

#### Scenario: Footer position

- **WHEN** the page is scrolled to the end
- **THEN** the footer is a rounded navy box inside the gutters, not a full-bleed band

### Requirement: Columns

The box SHALL show link columns, each with a heading: Businesses (the three divisions), Company (About, Projects, News, Contact), Follow (Instagram, TikTok, real accounts) and Legal (Privacy, Terms). Links to pages that don't exist yet SHALL be left out, and a column with no links SHALL be left out.

#### Scenario: Only Home exists

- **WHEN** no other page is built
- **THEN** the Follow column shows Instagram and TikTok and the other columns are left out

### Requirement: Social links

Social links SHALL go to the real accounts (Instagram `@akikmarket`, TikTok `@akikmarket`), open in a new tab with safe link attributes, and use each brand's one-colour mark with the account name as text.

#### Scenario: Instagram link

- **WHEN** a visitor activates the Instagram link
- **THEN** `instagram.com/akikmarket` opens in a new tab

### Requirement: Legal line

At the bottom of the box a `small` line SHALL read "© {current year} Akik. Iwo Road, Ibadan." with the year computed at build time.

#### Scenario: New year

- **WHEN** the site is rebuilt in 2027
- **THEN** the line shows 2027
