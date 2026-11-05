# Agent Implementation Plans

All AI agents working on `10z-web` must create a comprehensive Markdown plan in this directory (`.agents/plans/`) and obtain explicit user approval **before** modifying any codebase files.

## Naming Convention

```text
YYYY-MM-DD-<short-task-slug>.md
```

## Required Plan Sections

1. **Objective & Scope:** Summary of the user's request and expected outcomes.
2. **Files to Create / Modify / Delete:** Exact workspace paths and purpose of each change.
3. **Data & Content Changes:** Updates to `src/data/*.ts`, `src/content/blog/`, or `public/llms.txt`.
4. **UI, Routing & SEO Impact:** Component changes, new routes, navigation links (`Header.astro`, `Footer.astro`), and `sitemap.xml.ts`.
5. **Verification Checklist:** How the changes will be tested and verified once approved.

