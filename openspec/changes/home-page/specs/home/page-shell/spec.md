## Purpose

Defines how Home is put together: the route, the order of sections, landmarks, metadata, where its content comes from and how placeholders are tracked.

Source: house style (Matic page rhythm, design-system spacing spec).

## ADDED Requirements

### Requirement: Route and section order

`/` SHALL render Home with these sections, top to bottom: header, hero, divisions, featured-now, proof, customer-stories, projects-banner, buy-with-confidence, news, founder, visit-us, footer. Sections SHALL be separated by the section rhythm in the spacing spec.

#### Scenario: Visiting the site

- **WHEN** a visitor opens `/`
- **THEN** the sections appear in the order above with no console errors

#### Scenario: Section with no content

- **WHEN** a section's content list is empty (for example no news posts)
- **THEN** that section is left out and the spacing between its neighbours stays one section gap

### Requirement: Prerendered

Home SHALL be served as prerendered HTML with all text present before JavaScript runs.

#### Scenario: JavaScript disabled

- **WHEN** Home loads with JavaScript disabled
- **THEN** every heading, paragraph and link is visible and every link works

### Requirement: Landmarks and skip link

Home SHALL have one `banner` (header), one `main` and one `contentinfo` (footer). A "Skip to content" link SHALL be the first focusable element, visible on focus, moving focus to `main`.

#### Scenario: First Tab

- **WHEN** a keyboard user presses Tab once
- **THEN** "Skip to content" appears and, when activated, focus moves to `main`

### Requirement: Metadata

Home SHALL set a title ("Akik · Phones, homes and cars in Ibadan"), a meta description, a canonical URL once the domain is decided, Open Graph and Twitter card tags with a share image, and `LocalBusiness` structured data with the shop's name, address and the three businesses.

#### Scenario: Shared on WhatsApp

- **WHEN** the Home link is pasted into WhatsApp
- **THEN** the preview shows the title, description and share image

### Requirement: One content source

All Home text, links, numbers, media references and featured items SHALL come from one typed content source. Components SHALL NOT contain business text.

#### Scenario: Changing the start year

- **WHEN** the start year in the content source changes from 2023 to the real year
- **THEN** every place Home shows it updates, with no component edits

### Requirement: Marked placeholders

Every placeholder value SHALL be marked as a placeholder in the content source. A placeholder report SHALL list each one (its field and the section that shows it) and SHALL run in CI without failing the build. Placeholders SHALL read as realistic Akik content and SHALL NOT name real customers, real press or real figures.

#### Scenario: Placeholder report

- **WHEN** the placeholder report runs
- **THEN** it lists every marked value, including the start year 2023, grouped by section

#### Scenario: Owner supplies a fact

- **WHEN** a placeholder is replaced with a real value and its marker removed
- **THEN** it no longer appears in the report

### Requirement: Performance

On a mid-range phone over a 4G connection, Home SHALL reach Largest Contentful Paint within 2.5s, keep Cumulative Layout Shift under 0.1 and keep Interaction to Next Paint under 200ms.

#### Scenario: Lighthouse mobile run

- **WHEN** Lighthouse runs on the built Home with mobile settings
- **THEN** LCP is at most 2.5s and CLS is below 0.1
