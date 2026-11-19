# Implementation Plan: Update `.gitignore` and Remove Tracked Build/Dependency Files

**Date:** 2026-11-18  
**Status:** Completed

---

## 1. Codebase Audit Findings

Currently, [`.gitignore`](file:///d:/10z-web/.gitignore) contains only a single line (`dist*`). Inspecting the git index (`git ls-files`) revealed **10,318 files** that should not be tracked in version control:

1. **`node_modules/` (10,308 tracked files):**
   - The entire `node_modules` directory is currently tracked in git, causing dirty working tree diffs on `node_modules/.bin/*` and bloating the repository.
2. **`.astro/` (9 tracked files):**
   - `.astro/collections/blog.schema.json`, `.astro/content-assets.mjs`, `.astro/content-modules.mjs`, `.astro/content.d.ts`, `.astro/data-store.json`, `.astro/dev.json`, `.astro/dev.log`, `.astro/settings.json`, and `.astro/types.d.ts` are auto-generated Astro cache/runtime files and logs.
3. **`Homepage - Claude v2.html` (1 tracked file in root):**
   - Legacy standalone 87 KB HTML prototype file in the project root that is not part of the Astro application.

All other tracked directories (`.agents/`, `public/`, `scripts/`, `src/`, and root config files `astro.config.mjs`, `package.json`, `package-lock.json`, `tsconfig.json`, `README.md`) are legitimate project source files.

---

## 2. Files to Be Modified or Removed from Git Tracking

| File / Directory | Action | Details |
| :--- | :--- | :--- |
| `.gitignore` | **Modify** | Replace single-line `dist*` with a complete Astro / Node.js `.gitignore` covering `dist/`, `.astro/`, `node_modules/`, `.env` files, log files (`*.log`), OS metadata (`.DS_Store`, `Thumbs.db`), editor directories (`.idea/`, `.vscode/`), and temporary/cache directories. |
| `node_modules/` | **Untrack (`git rm -r --cached`)** | Remove all 10,308 `node_modules/` files from the git index while keeping `node_modules/` intact on disk. |
| `.astro/` | **Untrack (`git rm -r --cached`)** | Remove all 9 `.astro/` generated cache/log files from the git index while keeping `.astro/` intact on disk. |
| `Homepage - Claude v2.html` | **Remove (`git rm -f`)** | Remove the unused root HTML prototype file from git tracking and the project root. |

---

## 3. Proposed `.gitignore` Contents

```gitignore
# Build outputs
dist/
dist*
.output/

# Astro generated cache, types & logs
.astro/

# Dependencies
node_modules/

# Environment variables & secrets
.env
.env.*
!.env.example

# Logs
logs/
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*

# OS & filesystem metadata
.DS_Store
Thumbs.db
Desktop.ini

# IDEs & editors
.idea/
.vscode/*
!.vscode/extensions.json
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
*~

# Temporary & cache directories
.cache/
.temp/
.tmp/
.vercel/
.netlify/
```

---

## 4. Verification Steps

1. Update `.gitignore`.
2. Run `git rm -r --cached node_modules .astro` and `git rm -f "Homepage - Claude v2.html"`.
3. Run `git status --short` and `git ls-files` to verify that `node_modules/`, `.astro/`, and `Homepage - Claude v2.html` are no longer tracked in the git index while `node_modules/` and `.astro/` remain present on disk.

