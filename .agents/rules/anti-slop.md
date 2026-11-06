---
trigger: always_on
description: Prevent placeholder-heavy, over-abstracted or misleading code in the Akik landing app.
---

# Anti-Slop Rules

## What counts as slop here

- placeholder UI or copy committed as if it were production-ready
- invented facts about the business: figures, years, locations, customer quotes
- abstractions created before a second real use case exists
- unused helpers, dead files and "just in case" wrappers
- shop or checkout UI that pretends the division apps already exist

## Rules

- No dead code. If it isn't called, delete it.
- No premature abstraction. Extract at the second real call site, not the first.
- No handling for situations that can't occur, and no fallbacks nobody asked for.
- No TODO without a linked issue.
- No magic numbers or strings. Name the constant, and keep brand truth in `src/lib/site-config.ts`.
- No feature flags or compatibility shims unless the spec asks for them.
- Functions do one thing. If the name needs "and", split it.
- Comments explain why, never what. No commented-out code.
- Every new file has a clear purpose in this app.
- No hover "lift", "jump" or scale motion on buttons, cards, icons or CTAs.
- Never skip the git hooks (`--no-verify`).
