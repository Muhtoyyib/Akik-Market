## Purpose

Defines the fonts and the type scale, so headings, body text and labels look the same on every page.

## ADDED Requirements

### Requirement: Two families

The site SHALL use Geist for all readable text and Geist Mono for labels, prices, dates, counters and other data. Both SHALL be self-hosted (no request to a third-party font service) and SHALL show a matching system fallback while loading, without hiding text.

#### Scenario: Fonts load slowly

- **WHEN** the font files have not loaded yet
- **THEN** text is visible in the fallback face
- **AND** the page layout shifts as little as possible when Geist arrives

### Requirement: Type scale

Text SHALL use one of these styles. Sizes are desktop / mobile; line height follows the size.

| Style     | Family     | Size / line height | Weight | Tracking | Case       |
| --------- | ---------- | ------------------ | ------ | -------- | ---------- |
| `display` | Geist      | 80/88px · 44/48px  | 400    | −3%      | Sentence   |
| `h2`      | Geist      | 40/44px · 30/34px  | 600    | −4%      | Sentence   |
| `h3`      | Geist      | 22/28px · 20/26px  | 600    | −2%      | Sentence   |
| `quote`   | Geist      | 32/38px · 24/30px  | 500    | −3%      | Sentence   |
| `body-lg` | Geist      | 18/28px            | 400    | 0        | Sentence   |
| `body`    | Geist      | 16/24px            | 400    | 0        | Sentence   |
| `small`   | Geist      | 14/20px            | 400    | 0        | Sentence   |
| `label`   | Geist Mono | 13/18px            | 500    | +2%      | Uppercase  |
| `figure`  | Geist Mono | 40/44px · 32/36px  | 500    | −3%      | As written |

#### Scenario: Off-scale size

- **WHEN** a component sets a font size
- **THEN** it uses one of the styles above, not a one-off size

### Requirement: One page heading

Each page SHALL have exactly one `h1`, and headings SHALL not skip levels.

#### Scenario: Heading order

- **WHEN** a page's headings are listed in document order
- **THEN** there is one `h1` and no `h3` appears before an `h2` in its section

### Requirement: Readable line length

Body text SHALL be limited to about 65 characters per line.

#### Scenario: Wide screen

- **WHEN** a paragraph renders at 1440px wide
- **THEN** its line length stays at or under about 65 characters

### Requirement: Mono for data

Prices, dates, model years, plot sizes, mileage, counters and eyebrows SHALL use the `label` or `figure` style. Naira amounts SHALL be written with the `₦` sign and thousands separators.

#### Scenario: Price display

- **WHEN** a price of one million two hundred and fifty thousand naira is shown
- **THEN** it reads `₦1,250,000` in Geist Mono
