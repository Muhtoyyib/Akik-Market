# page-registration Specification

## Purpose

How a page is listed so it is prerendered, and how links elsewhere start pointing to it.

Source: Home design decision D3 and `src/lib/site-pages.ts`.

## Requirements

### Requirement: Listed pages are built

Every shipped page SHALL be in the prerender list, and the build SHALL produce static HTML for each one. A page not in the list SHALL NOT be linked from anywhere.

#### Scenario: Adding the About page

- **WHEN** `/about` is added to the list
- **THEN** the build outputs its HTML, and the other pages' headers, the footer and Home's "Read our story" link start pointing to it

### Requirement: Collection pages from their items

Each item in the projects and news collections SHALL get its own path (`/projects/<slug>`, `/news/<slug>`) in the prerender list. Slugs SHALL be unique, lowercase and hyphenated.

#### Scenario: New project added

- **WHEN** a project is added to the collection
- **THEN** its page is built and its card links to it, with no other change

#### Scenario: Duplicate slug

- **WHEN** two items share a slug
- **THEN** a unit test fails naming the slug
