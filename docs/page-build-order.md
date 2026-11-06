# Page build order

The handoff for building the pages after Home. Each page is an OpenSpec change under `openspec/changes/` with a proposal, design, specs and tasks. Build them in this order:

| #   | Change              | Pages                                                     | Needs first                                     |
| --- | ------------------- | --------------------------------------------------------- | ----------------------------------------------- |
| 0   | `home-page`         | `/` (finish the open tasks: 1.1, 1.2, 1.4, 2.1, 4.5, 5.x) | —                                               |
| 1   | `site-shell`        | 404; shared layout, content, metadata                     | Home built                                      |
| 2   | `division-pages`    | `/phones-and-gadgets`, `/engineering`, `/autos`           | site-shell                                      |
| 3   | `about-page`        | `/about`                                                  | site-shell                                      |
| 4   | `projects-pages`    | `/projects`, `/projects/$slug`                            | site-shell                                      |
| 5   | `listings-page`     | `/listings`                                               | site-shell; item card shared by division-pages  |
| 6   | `news-pages`        | `/news`, `/news/$slug`                                    | site-shell                                      |
| 7   | `testimonials-page` | `/testimonials`                                           | site-shell                                      |
| 8   | `contact-page`      | `/contact`                                                | site-shell                                      |
| 9   | `legal-pages`       | `/privacy`, `/terms`                                      | site-shell; ships only with owner-approved text |

Pages 2 to 8 only depend on `site-shell`, so they can be built in any order or in parallel once it lands. Build `division-pages` first if you can, since it moves Home's item card, trust rows, story box and visit block into shared components that later pages reuse.

## Before building a page

1. Read `CLAUDE.md` and every file in `.agents/rules/`. The lint caps, test rules, content rules and commit rules are enforced.
2. Each proposal says the page outline still needs the client lead's sign-off (`docs/design-reference/README.md`, "Process for each page"). Get it, or record that it was waived.
3. Use the `openspec-apply-change` skill to work through the change's `tasks.md`. Each task names the test or artifact that proves it.

## How every page is built

- **TDD:** write the test, watch it fail for the right reason, then implement (`.agents/rules/tdd.md`).
- **Content:** every business fact lives in the content source and is marked `real(...)` or `placeholder(...)`. Never put a fact straight into a component.
- **Links to unbuilt pages:** use `onwardLink` and `pageExists`. A link to a page that isn't built falls back to WhatsApp or Instagram, or is left out (Home design D3). Adding a path to `src/lib/site-pages.ts` flips every link to it automatically. The footer columns already work this way. Home's header only jumps to Home's sections; the page links for other pages' headers are specified in `site-shell` ("Page layout").
- **Checks before each commit:**
  - `vp run typecheck`, `vp run lint`, `vp test --run` and `vp run test:browser`
  - Stryker on changed `src/lib` files (`bunx stryker run --mutate <file>`). Run it fresh, because incremental runs have shown stale results.
  - Screenshots at 1440px and 390px wide
- **Commit messages:** label each claim as measured, verified against source, inferred or assumed, and only state what you checked.

## Things learned building Home

- Add any new library entry point used in browser tests (for example `@base-ui/react/dialog`) to `optimizeDeps.include` in `vitest.browser.config.ts`. Otherwise Vite reloads the browser mid-run and every test file fails to import.
- Testing Library gives an element hidden with `display: none` an empty accessible name, even with `hidden: true`. Browser tests about which copy CSS hides should select by attribute.
- A Base UI modal dialog hides the rest of the page from assistive technology while open. Keep a reference to the trigger from before you open it.
- In jsdom, put spaces outside screen-reader-only spans; jsdom trims spaces inside them.
- The copyright year comes from `__BUILD_YEAR__`, which `define` in `vitest.shared.ts` sets for the app and both test configs.

## Facts still owed by the owner

- Which WhatsApp number serves which business
- The real start year
- Opening hours
- Counts for the footer counters
- The founder's name, photos and story
- Customer quotes, with permission
- Real stock and projects
- Footage
- A vector logo
- Privacy and terms text
- The production domain
