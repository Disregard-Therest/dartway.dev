# Tasks

The working list for dartway.dev. Why any of it matters is in [STRATEGY.md](STRATEGY.md);
this file is only what is open, what is done, and who is blocking what.

Updated 2026-08-04.

---

## Blocked on the owner

Nothing here can be done from inside the repository.

- [x] **Connect Google Search Console.** Done 2026-08-01.
- [x] **Submit the sitemap** — `sitemap.xml`, done. It does not need re-submitting when the site
      changes: the URL is stable and Google re-fetches it. It now lists 71 English pages.
- [ ] **Submit `/ru/sitemap.xml`** — a *second* sitemap, 50 Russian URLs. Docusaurus writes one per
      locale and generates no index, so the Russian pages are in a file the existing submission does
      not cover and never will. `robots.txt` now lists both, which is enough for discovery; the
      submission is what gives per-sitemap coverage figures, and comparing those two numbers is the
      measurement the Russian site was built for.
- [x] **Read the counter.** Done 2026-09-06, first time since it was deployed. The token is not
      retrievable — it is a password chosen here, so it was rotated: `npm run token:new`, `.env`,
      `npm run worker:secret`. 644 pageviews in 30 days, and the shape of them is in STRATEGY §7.
- [x] **Deploy the page counter.** Done 2026-08-01. Live at
      `dartway-analytics.dartway.workers.dev`, verified end to end: event recorded, stats read back,
      and the endpoint present in the published bundle. Read it with `npm run stats`.
- [ ] **Bing Webmaster Tools** — optional, imports the Search Console property in one step. Its index
      feeds several AI search products.
- [ ] **Facts for the landing cases** — see "Landing" below.

## Next up

- [ ] **A light-mode wordmark.** `static/img/dartway_logo.svg` wraps a monochrome bitmap whose every
      visible pixel is the same near-white grey, so on a light surface it disappeared. Light mode now
      darkens it with `filter: brightness(0)`, which is exact for this image and would be wrong for
      any coloured one. A real second asset — or a true vector whose `fill` can be driven by
      `currentColor` — replaces the filter and survives a redesign of the mark.

- [ ] **Landing: re-frame the cases.** TVAITY and Kerla are written in agency language ("helped the
      founder…", DAU counts). For a framework the framing should be what was built on it and what it
      holds up to. Needs facts only the owner has. **Re-run `npm run translate` afterwards** — the
      Russian landing is a translation of the copy this task replaces, and the translator will pick
      up exactly the strings that changed.
- [ ] **Landing: make the funnel explicit** — hero → what it is → cases → quick start → Telegram.
- [ ] **Deepen the competency map.** The first version is shipped — six areas, 48 topics. Next:
      revisit the AI area as the field moves, and consider whether any topic deserves a second page.
- [ ] **Long-form writing for competitive queries.** The map cannot rank for "flutter state
      management" — that needs depth, which means the blog and the heavier verification process
      discussed with it: every factual claim sourced, every code sample compiled, and the owner's
      own experience for the parts a model cannot invent.

## Later

- [ ] **Search over the docs.** 21 pages is past the point where browsing is comfortable. Either
      Algolia DocSearch (free, but an application and a wait) or a local search plugin (works today,
      no external dependency).
- [x] **Redirects for the old doc URLs.** Done 2026-09-05. Eighteen of them —
      `/docs/intro`, `/docs/quick-start`, `/docs/foundations/*`, `/docs/flutter/*` under the old
      names, `/docs/server/*`, `/framework`. The five with no successor (`navigation`,
      `naming_conventions`, the three `dartway_specials`) go to the nearest section, not to the
      landing: a redirect that drops the reader at the front door reads as a dead link.
      Registered under the default locale only — `/docs` never existed at `/ru`.
      **Worth knowing:** the plugin does not check that a target exists, and `onBrokenLinks` does not
      see redirect targets either. A typo here produces a redirect into a 404 and the build stays
      green. Both ends were verified against `build/` by hand.
- [ ] **Per-page structured data.** `TechArticle` on doc pages, which needs swizzling the doc
      component — unlike the site-wide `SoftwareApplication` tag already in `headTags`.
- [ ] **Per-page OG images.**
- [ ] **A page for the counter's numbers.** Reading `/stats` JSON by hand gets old. Worth doing once
      there is data in it.
- [x] **Stage 4: the blog — turned on.** Done 2026-09-05, with RSS and Atom from the first post:
      a feed cannot be backfilled once posts have gone out without one. Three tags matching the
      sections in STRATEGY.md, with `onInlineTags: 'throw'` so a post cannot invent a fourth in
      passing. English-only, on the same terms as `/docs` and registered the same way — a custom
      navbar item plus `src/localeRoutes.ts` — because `npm run translate` does not know about
      `blog/`.
      First post: *One account, two doors*, from the auth identity work in core 0.12.1.
- [ ] **Teach the translator about `blog/`.** Until then `/blog` is English-only, and the Russian
      audience — the larger of the two channels — does not get the writing at all.
      `tools/translate.mjs` builds one job per page under `learn/`; blog posts need the same, plus a
      home at `i18n/ru/docusaurus-plugin-content-blog/`. Removing `/blog` from `DEFAULT_LOCALE_ONLY`
      is the last step, not the first.
- [ ] **Stage 4, the rest: the per-channel process.** Release notes, engineering
      writing, case breakdowns — and the source material for social posts.
- [ ] **Distribution.** pub.dev descriptions, the GitHub README, dev.to, r/FlutterDev. This is how
      models learn the framework exists at all.
- [ ] **Doc versioning.** Not before the first release with breaking changes. Decide before it ships,
      not after.

## Done

- [x] Recorded the strategy and the repository rules (`STRATEGY.md`, `CLAUDE.md`).
- [x] Cleared out `docs_buffer`, the half-finished Russian locale, an orphaned second landing page,
      an unused template component, and a `.env` nothing read.
- [x] **The documentation pipeline.** `docs/` is now generated from `dartway/dartway` by
      `scripts/sync-docs.mjs`, daily in CI, building before it commits. This replaced docs that told
      readers to clone a template the CLI no longer uses.
- [x] Pinned line endings to LF so the sync produces the same bytes on Windows and in CI.
- [x] `llms.txt`, `llms-full.txt`, `robots.txt`, `SoftwareApplication` JSON-LD.
- [x] The page counter's code — worker, D1 schema, client module, CTA markers.
- [x] Published. Deploy verified end to end on 2026-08-01.
- [x] Docusaurus 3.8.1 → 3.10.2 and the rest of the dependencies. Vulnerabilities 50 → 21, both
      criticals and 14 of 15 highs gone; what remains is transitive in the build toolchain and needs
      Docusaurus to move first. Adopted `@docusaurus/faster` (Rspack + SWC), which `future.v4`
      now requires and v4 will make the default. Turned the blog off explicitly — preset-classic
      enables it unless told otherwise and 3.10 started publishing an empty `/blog`.
- [x] **The competency map, first version.** `/education` renamed to `/learn`; six areas, 48 topic
      pages and a hub. Template recorded in `learn/PAGE_TEMPLATE.md`, every external link verified by
      `npm run check-links`.
- [x] `npm run check-links` — external link verification for `learn/`, because a curated link that
      404s is worse than no link.
- [x] Node 20 → 24 in both workflows; updated the actions themselves (checkout, setup-node,
      upload-pages-artifact, deploy-pages), which is what the deprecation warning was actually
      about; removed the dead `dartway_guidelines` git remote.
- [x] `tools/` — `npm run stats`, `worker:secret`, `worker:deploy`, `token:new`. Endpoint and token
      come from a git-ignored `.env`, so no command in the runbook carries a placeholder.
- [x] The counter is live and counting.
- [x] **The Russian site.** Everything but the documentation, at `/ru`: landing, competency map,
      navigation. `i18n/ru/` is generated from the English source by `npm run translate` and
      committed, on the same terms as `docs/`. The docs plugin is off for non-default locales, so
      `/ru/docs/*` does not exist rather than serving English under a Russian URL — which is the
      half-translated state that got the locale removed in the first place. Two theme overrides pay
      for that: the navbar language switch and the `hreflang` tags, both of which assume every page
      exists in every locale. Each locale links its own Telegram channel — `dartway_dev` and
      `dartway_dev_ru`.
- [x] **`npm run translate -- --check` in the deploy workflow.** An English page edited without
      re-translating now fails the deploy instead of quietly serving English at a Russian URL. It
      compares hashes only — no Claude CLI, no network, no tokens — so it costs the build a few
      seconds. Both paths verified: exit 0 when current, exit 1 with the file list when not.
