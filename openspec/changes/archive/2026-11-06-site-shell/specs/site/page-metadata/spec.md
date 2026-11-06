## Purpose

Each page's title, description, link-preview tags and structured data, set the same way everywhere.

Source: Home's metadata (`openspec/changes/home-page/specs/home/page-shell/spec.md`, "Metadata").

## ADDED Requirements

### Requirement: Title and description

Every page SHALL have exactly one `<title>`, in the form "{page name} · Akik", and a meta description of at most 160 characters drawn from its content. Home keeps its own title.

#### Scenario: About page

- **WHEN** the built `/about` page is opened
- **THEN** its title is "About · Akik" and it has one description

### Requirement: Link previews

Every page SHALL set `og:type`, `og:title` and `og:description`, and `twitter:card` as `summary`. A collection item page SHALL use `og:type` `article` and its item's title. No page SHALL set `og:image`, canonical URLs or absolute links until the production domain is decided.

#### Scenario: Sharing a project on WhatsApp

- **WHEN** a project page's link is pasted into WhatsApp
- **THEN** the preview shows the project's title and description

### Requirement: Structured data from the page's content

Pages SHALL add schema.org structured data where a type fits, built from the same content the page shows: `LocalBusiness` on Home and Contact, `Article` on news posts, `BreadcrumbList` on collection item pages. Structured data SHALL NOT state anything the page doesn't show.

#### Scenario: News post

- **WHEN** a post page is built
- **THEN** its `Article` data has the post's title and date as shown on the page
