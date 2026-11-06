---
trigger: always_on
description: Commit workflow rules for the Akik landing app.
---

# Commit Workflow Rules

- Commit step by step; one logical change per commit.
- Use conventional commit messages.
- Let the lefthook hooks run. Never `--no-verify`.
- A commit message states only claims that were checked: tests run, output seen.
- Do not commit placeholder UI, invented business facts or scaffolding "for later".
