---
trigger: always_on
description: TDD workflow for changes inside the Akik landing app.
---

# TDD Workflow

## Core protocol

1. Red: write a test that fails for the right reason (not a missing import or a syntax error).
2. Green: write the least code that makes it pass.
3. Refactor with the test still green.
4. Run the related checks before committing.

## Bugs

1. Write the correct behaviour into the spec.
2. Write a test from it and watch it fail for the reason the bug describes. If it passes, stop and find out why.
3. Fix with the least code that turns it green.
4. Keep the test; its name says what went wrong.

## Rules

- Name tests as specifications ("prefixes a page title to the brand name").
- One logical assertion per test, arrange–act–assert.
- Mock only what is outside the app (network, time), never our own logic.
- Never commit a red test.
