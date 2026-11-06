---
trigger: always_on
description: Frontend code style rules for the Akik landing app.
---

## TypeScript

- Keep strict typing. Do not use `any`.
- Use `as` only with a comment saying why.
- Use generics only when they improve correctness.
- Use `@/*` for `src/*` imports.

## Structure & Components

- One route file per page in `src/routes`; its view lives in `src/features/<page>/view.tsx`.
- Move a component to `src/components` only when a second feature uses it.
- Keep one exported component or hook per file.
- Keep components small and props minimal.
- Extract non-trivial logic into pure helpers in `src/lib` and test them there.
- Keep content and config loading out of presentational components.

## Styling

- Use Tailwind utilities and the tokens in `src/styles/app.css`. No raw colours or inline styles (enforced by lint).
- Merge classes with `cn` imported from `cn` (`import {cn} from "cn";`). Do not add a local `cn` helper.
- Reuse existing primitives before creating new ones.

## Product truth

- Keep the brand name, divisions, links and contact details in typed config in `src/lib/site-config.ts`.
- Add every shipped route to `src/lib/site-pages.ts` so it is prerendered.
