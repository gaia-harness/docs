---
paths:
  - 'src/**'
  - 'public/**'
  - 'astro.config.mjs'
---

# Starlight Conventions

- Content lives in `src/content/docs/`. Each `.md` / `.mdx` file becomes a route at the same path.
- Sidebar registered in `astro.config.mjs`. Adding a new page means adding a sidebar entry; don't rely on autogenerate unless you've configured it.
- Frontmatter follows Starlight's `docsSchema()` (`src/content.config.ts`). At minimum: `title`, `description`. Use `sidebar.order` for explicit ordering when needed.
- Asides: `tip` (green, shield icon) is reserved for safety and privacy callouts. Use `note` for ordinary tips and `caution` for warnings.
- Images go in `src/assets/` and are imported. Static files (favicon, `_headers` for response headers) go in `public/`. Consult `~/Development/gaia-react/studio/branding/DESIGN.md` before adding visual assets or custom components.
- Site config: `astro.config.mjs`. `site` is `https://docs.gaiaharness.com`; don't change without coordination.
