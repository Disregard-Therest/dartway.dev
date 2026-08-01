# dartway.dev

The website for the [DartWay](https://github.com/dartway/dartway) framework — documentation, the
Flutter competency map, and the landing page. Built with [Docusaurus](https://docusaurus.io/),
deployed to GitHub Pages from `master`.

- **[STRATEGY.md](STRATEGY.md)** — what the site is for, the decisions behind it, and the roadmap
- **[CLAUDE.md](CLAUDE.md)** — working rules for the repository

## Getting started

```bash
npm install
npm start          # dev server on localhost:3000
npm run build      # production build — run this before pushing
```

## Documentation is generated, not written here

Everything under `docs/` is a copy of `docs/` in the `dartway/dartway` monorepo, where a page ships
in the same pull request as the code it describes. **Editing a file under `docs/` by hand does
nothing lasting** — the next sync overwrites it. Fix it upstream instead.

```bash
npm run sync-docs                      # pull the current docs
npm run sync-docs -- --check           # report drift without writing
npm run sync-docs -- --branch stable   # sync from another branch
```

The sync also runs daily in CI ([`sync-docs.yml`](.github/workflows/sync-docs.yml)): it pulls,
verifies the site still builds, commits only if it does, and then deploys.

Hand-written content lives in `education/` (the competency map), `src/pages/` (the landing) and
`src/css/`.

## Deployment

Pushing to `master` triggers [`deploy.yml`](.github/workflows/deploy.yml), which builds and
publishes to GitHub Pages. The custom domain comes from `static/CNAME` — removing that file takes
the site off `dartway.dev`.

Note that `onBrokenLinks` is set to `throw`: one dead internal link fails the build and therefore
the deploy.
