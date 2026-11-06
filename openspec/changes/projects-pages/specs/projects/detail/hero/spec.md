## Purpose

The top of a project's page.

Source: Matic P2 media box with the heading below.

## ADDED Requirements

### Requirement: Back link, photo and heading

A project page SHALL show a text link "All projects" back to `/projects`, then the project's main photo in a 16:9 media box (4:5 on phones), then its type and year as an eyebrow and its name as the page's one `h1`.

#### Scenario: Opening a project

- **WHEN** a visitor opens `/projects/<slug>`
- **THEN** the project's name is the only `h1` and "All projects" leads back

### Requirement: Metadata

The page SHALL have the title "{project name} · Akik", `og:type` `article`, and `BreadcrumbList` structured data (Projects, then the project).

#### Scenario: Shared on WhatsApp

- **WHEN** the page's link is shared
- **THEN** the preview shows the project's name and description
