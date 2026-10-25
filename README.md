# GAIA Docs

Documentation site for [GAIA](https://github.com/gaia-react/gaia), served at [docs.gaiaharness.com](https://docs.gaiaharness.com).

Built with [Starlight](https://starlight.astro.build) on Astro. Deployed to GitHub Pages on every push to `main`.

## Local development

```sh
pnpm install
pnpm dev      # localhost:4321
pnpm build    # production build to ./dist
pnpm preview  # preview the build
```

## Structure

- `src/content/docs/`: Markdown/MDX content. Each file becomes a route.
- `src/assets/`: images embedded in content.
- `public/`: static assets (favicon, `CNAME`, etc.).
- `astro.config.mjs`: site config, sidebar, Starlight options.

## Deploy

Pushes to `main` trigger `.github/workflows/deploy.yml`. PRs build but do not deploy.

## License

Code samples, Claude prompts, and the site's source code are MIT. The documentation text and images are [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). See [LICENSE](LICENSE).
