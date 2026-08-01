# Tasks

The working list for dartway.dev. Why any of it matters is in [STRATEGY.md](STRATEGY.md);
this file is only what is open, what is done, and who is blocking what.

Updated 2026-08-01.

---

## Blocked on the owner

Nothing here can be done from inside the repository.

- [x] **Connect Google Search Console.** Done 2026-08-01.
- [ ] **Submit the sitemap** — `sitemap.xml` in the Sitemaps section of Search Console. The live
      sitemap now lists the new structure, 25 URLs.
- [ ] **Deploy the page counter.** The code is written and shipped; nothing is being counted until
      the Cloudflare worker exists. Steps in [analytics/README.md](analytics/README.md): create the
      D1 database, run the schema, set `STATS_TOKEN`, `wrangler deploy`, then add the worker URL as
      the `ANALYTICS_ENDPOINT` repository variable. Until then the client module is inert by design.
- [ ] **Bing Webmaster Tools** — optional, imports the Search Console property in one step. Its index
      feeds several AI search products.
- [ ] **Facts for the landing cases** — see "Landing" below.

## Next up

- [ ] **Landing: re-frame the cases.** TVAITY and Kerla are written in agency language ("helped the
      founder…", DAU counts). For a framework the framing should be what was built on it and what it
      holds up to. Needs facts only the owner has.
- [ ] **Landing: make the funnel explicit** — hero → what it is → cases → quick start → Telegram.
- [ ] **Stage 3: start the competency map.** The site's growth engine and the longest piece of work.
      First: the page template (definition → why it matters → what it looks like at each level →
      what to learn → practice → where next), then the hub page interlinking every topic, then
      sustained output. Written neutral about Flutter development, with DartWay as the answer at the
      end of each page, never the premise. See CLAUDE.md for the rules.

## Later

- [ ] **Search over the docs.** 21 pages is past the point where browsing is comfortable. Either
      Algolia DocSearch (free, but an application and a wait) or a local search plugin (works today,
      no external dependency).
- [ ] **Redirects for the old doc URLs.** Everything under the pre-sync structure now 404s —
      `/docs/intro`, `/docs/quick-start`, `/docs/foundations/*`, `/docs/server/*`, `/framework`.
      Deliberately skipped before publishing; still worth doing, and it does not expire.
      `@docusaurus/plugin-client-redirects` generates static redirect pages, so GitHub Pages is fine.
      Note that several old pages have no equivalent in the new docs (`navigation`,
      `naming_conventions`, the three `dartway_specials`) and can only go to a nearby section.
- [ ] **Per-page structured data.** `TechArticle` on doc pages, which needs swizzling the doc
      component — unlike the site-wide `SoftwareApplication` tag already in `headTags`.
- [ ] **Per-page OG images.**
- [ ] **A page for the counter's numbers.** Reading `/stats` JSON by hand gets old. Worth doing once
      there is data in it.
- [ ] **Stage 4: the blog.** Already present in the config, commented out. Release notes, engineering
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
- [x] Node 20 → 24 in both workflows; removed the dead `dartway_guidelines` git remote.
