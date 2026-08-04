# dartway.dev — concept and strategy

Why this site exists, what belongs on it, and in what order it gets built.
Written 2026-08-01. This is the shared context every work session starts from.

---

## 1. The problem this site solves

DartWay has no brand demand. Nobody searches for "DartWay", and nobody will for a long time.
A site that only documents the framework will therefore be read by people who already found the
framework somewhere else — which is almost nobody.

So the site has two jobs, and they are not the same job:

1. **Serve the people already using DartWay** — accurate, current, searchable documentation.
2. **Create the audience in the first place** — content that ranks for what Flutter developers
   actually search for, and that language models actually cite.

Job 1 is a correctness problem. Job 2 is a content-production problem. Most of the roadmap below is
job 2, because job 1 is solved once and then maintained by a pipeline.

---

## 2. Who reads it

| Reader | Arrives with | Path we give them |
|---|---|---|
| **Evaluator** — tech lead or founder choosing a stack | "Is this worth my project?" | Landing → What is DartWay → cases → quick start |
| **Builder** — already writing DartWay code | "How do I do this specific thing?" | `/docs`, searchable, always equal to the current API |
| **Agent** — Claude or Cursor writing the code | Precise API context | `llms.txt`, clean markdown, stable URLs |
| **Learner** — a Flutter dev levelling up | "What should I learn next?" | `/learn` → competency map → articles → discovers DartWay |

The learner is by far the largest group and the only source of **non-branded** traffic. That is the
entire reason `/learn` exists and why it gets the most ongoing effort.

---

## 3. The governing rule: where content is written

This is the architectural decision everything else follows from.

| Section | Source of truth | Who writes it |
|---|---|---|
| `/docs` | `dartway/dartway` repo, `docs/` folder | **The monorepo.** This repo holds a generated copy only |
| `/learn` | this repo | Us — the SEO engine |
| `/blog` | this repo | Us — releases and engineering writing |
| `/` landing | this repo | Us — conversion |

**Documentation is never written here.** A doc page and the code it describes must travel in the
same pull request, which is the monorepo's own synchronisation law. This site pulls the result.

That boundary is not bureaucracy — it is the fix for a failure that already happened. Before this
was set up, the site's docs were written and edited separately from the framework and drifted badly:
the published quick start told readers to clone a template repo that the CLI no longer uses and to
install a Serverpod CLI two major versions behind. Anyone following it got a broken project. Docs
that live apart from the code always end up lying; the only question is when.

**Consequence:** files under `docs/` are generated output. Editing one by hand is always wrong — the
next sync silently reverts it. Fix the monorepo instead.

---

## 4. How traffic is actually acquired

Three channels, in order of how much they matter.

### 4.1 Non-branded search — carried by `/learn`

The competency map is the growth engine, not the documentation. Twenty to forty pages on subjects
Flutter developers genuinely search for — state management, app architecture, CI/CD, testing,
algorithms — is twenty to forty entry points, each of which can introduce DartWay at the end.

**These pages are written as honest, neutral material about Flutter development.** A page titled
"State management in Flutter: how to choose" can rank and be useful to thousands of people. A page
titled "State management in DartWay" ranks for nothing, because there is no demand behind it.
DartWay appears at the foot of each page as "and here is how the framework answers this" — never as
the premise.

This means deliberately producing content that does not sell us directly. That is the trade, and it
is accepted on purpose.

### 4.2 Generative engine optimisation — being cited by models

The documentation in the monorepo is already written in the right shape for this, by luck or by
instinct: page titles are the questions a reader actually asks ("What does the `dartway` command
do?", "How do I get a DartWay app running?"), and the first paragraph answers it in full without
requiring the rest of the page. That is exactly the form models extract and quote.

What is missing is the machinery around it: `llms.txt` and `llms-full.txt`, JSON-LD structured data,
canonical URLs, per-page OG images, a sitemap.

### 4.3 Distribution — the blog as source material

The blog does three jobs at once: release notes (a freshness signal for an evolving framework),
engineering essays (which rank for non-branded queries), and raw material for posts to Telegram,
X/LinkedIn, dev.to and r/FlutterDev. Links from those places are both traffic and the route by which
models learn the framework exists at all.

---

## 5. Decisions taken, with their reasons

Recorded so they are not silently re-litigated later.

**English is the source language; Russian is generated from it.** Everything is written in English
first — the landing, the competency map, the documentation in the monorepo — and the Russian site is
produced from that source by `npm run translate`, never written by hand. Two hand-maintained branches
of the same content is the cost this avoids, and it is the cost that killed the previous attempt.

Recorded 2026-08-04, replacing the "English only" decision made three days earlier. That decision set
its own trigger — revisit when `/learn` is around twenty pages — and the map shipped at forty-nine.
Two things changed with it:

- **Distribution is Russian-speaking.** The map is a shareable artefact rather than a search-ranking
  play (see stage 3 below), and it gets shared where we have reach. A Russian page also competes for
  queries an English one cannot win: nothing short outranks a long English tutorial for "flutter
  state management", while the Russian equivalent is close to open ground.
- **The failure mode is now structural, not a matter of discipline.** What was wrong before was a
  half-translated site — Russian navbar and learning pages over English docs that silently fell back
  to the default locale. Falling back is what a Docusaurus locale does when a page is missing, so
  the fix is to leave nothing missing.

**Docs stay English, and `/ru/docs/*` does not exist.** Not "exists in English": the documentation
plugin is switched off for every locale but the default, so the Russian build has no docs routes at
all and the navbar links out to the English ones. That is what keeps the old failure from recurring —
there is no page that can quietly serve English under a Russian URL, and no duplicate of the same
text at two addresses for a search engine to pick between. `llms.txt` stays English for the same
reason.

The reasons docs are not translated are unchanged: they are generated from the monorepo and change
daily, models read them in English, and a Russian copy lagging the API is worse than no Russian copy.

**The mechanism is a real Docusaurus locale**, which the earlier decision ruled out. It was ruled out
when only `/learn` was going to be translated and the rest would have fallen back; with the whole
site translated and docs structurally absent, the locale is what makes the theme's own Russian
strings, the `hreflang` tags and the `/ru` URLs work without being hand-built. The price is two
places where the theme had to be overridden — the language switch and the alternate-language tags,
both of which assume every page exists in every locale. Both are in `src/`, both are commented.

**Docs sync from `master`, not `stable`.** `stable` is what `dartway create` actually hands users, so
it is the more correct source in principle. But `stable` is not being promoted often enough right
now, and stale-but-consistent is worse than fresh-but-slightly-ahead while the framework has
essentially no users. The branch is one constant in the sync script. Switch to `stable` when
promotion becomes regular.

**Synced docs are committed to this repo,** not fetched at build time. The copy is diffable and
reviewable before it goes live, the build is reproducible, and an upstream outage cannot break a
deploy. The cost — a copy that can lag — is bounded by running the sync on a schedule.

**No doc versioning yet.** Nobody is on an old version. Revisit at the first release with breaking
changes, before it ships, not after.

**Analytics: Search Console first, then a counter.** A page counter answers "how many came".
The strategy needs "for which queries, at what position, which pages are growing" — that is Search
Console, and it is free. Any counter without it means growing `/learn` blind. For CTA and volume,
a small self-hosted counter (a Cloudflare Worker writing to D1 or Analytics Engine — *not* KV, whose
daily write cap a pageview counter hits within days and then fails silently) with no cookies and no
consent banner.

**Cases are framed as framework proof, not agency work.** TVAITY and Kerla stay on the landing, but
the framing moves from "what we built for a client" to "what has been built on this and what it
holds up to".

---

## 6. Roadmap

### Stage 6 — the Russian site — *shipped*

The whole site except the documentation, at `/ru`: landing, competency map, navigation. Generated
from the English source by `npm run translate` and committed, on the same terms as `docs/` — output,
diffable, never hand-edited. See section 5 for why it came back and why the docs did not come with it.

Each locale points at its own Telegram channel — `dartway_dev` and `dartway_dev_ru`. That is the one
link on the site that is not a translation but a different destination, which is why it is configured
per locale rather than sitting in a translation file.

Still to do here: the landing copy is queued for a rewrite (stage 2), and the Russian version is a
translation of the version that is about to be replaced. Re-run the translator after that rewrite —
it will pick up exactly the strings that changed.

### Stage 0 — clear the ground ✅

Delete `docs_buffer/` (five unpublished drafts, one of which contradicted the published quick
start), `i18n/`, `src/pages/framework.tsx` (an orphaned second landing page positioning the product
differently from the real one), `src/components/HomepageFeatures/` (Docusaurus template leftover),
`.env` (read by nothing). Drop the Russian locale from config and landing. Rewrite `README.md`.
Verify the build actually runs — it could not be checked locally before.

### Stage 1 — the documentation pipeline ✅

The highest-priority item, because until it is done the site actively misleads its readers.

`scripts/sync-docs.mjs` pulls `dartway/dartway:docs`, excludes the internal `README.md` and
`DESIGN.md` (the latter marked in the monorepo as not for publication), generates a
`_category_.json` per section, rewrites links that point outside the docs tree, and writes into
`docs/`. Docusaurus needs no injected frontmatter: it strips numeric folder prefixes and takes each
title from the page's `# H1`.

The docs plugin runs with `format: 'md'` so external markdown is parsed as CommonMark rather than
MDX. Upstream prose is full of generics like `DwCrudConfig<T>`; today they sit inside backticks and
would survive MDX, but that is luck, and nobody will proofread every future sync.

Still open in this stage: **search** — 22 pages is already past the point where browsing works.

### Stage 2 — landing, analytics, CTA — *partly done*

Done: the counter (`analytics/`) and its client, with events on the landing CTAs. It is inert until
`ANALYTICS_ENDPOINT` is set, so nothing measures anything yet.

**Blocked on actions only the owner can take**, both documented in `analytics/README.md`:

1. **Connect Search Console.** The most valuable item on this whole page, and the most urgent, because
   it does not backfill — it starts collecting the day it is connected. Every week without it is a
   week of query data that cannot be recovered.
2. Deploy the worker, then set the `ANALYTICS_ENDPOINT` repository variable.

Still to do here: one landing page with consistent positioning and an explicit funnel — hero → what
it is → cases → quick start → Telegram. The cases need re-framing from agency language ("helped the
founder…", DAU counts) to framework proof, which needs facts only the owner has.

### Stage 3 — the competency map — *first version shipped*

Shipped: six areas, forty-eight topic pages and a hub, at `/learn` (renamed from `/education`).
The template is recorded in `learn/PAGE_TEMPLATE.md`; every page follows it, and 209 external links
are verified by `npm run check-links`.

**What these pages are was a deliberate decision.** They are maps, not tutorials: each frames a
topic, gives a junior/middle/senior table for that specific skill, suggests practice, and points at
the best material that already exists. Nothing here teaches a subject other people have already
taught better. That choice keeps the pages honest — they make few version-specific claims, so they
do not rot like a tutorial, and what they do assert is either structural or a link that resolves.

**The SEO mechanism is therefore not what section 4.1 assumed.** Short orientation pages will not
outrank long tutorials for "flutter state management". The map works differently: the hub is a
shareable artefact in its own right — the thing people bookmark and link, as roadmap.sh is — and the
topic pages give it depth and hold the reader. Ranking for competitive queries needs long-form
writing, which is a blog job with a heavier verification process, not a map job.

Still to do here: the six areas can go deeper, and the map should be revisited as the field moves —
particularly the AI area, which is the one with the least settled material anywhere.

### Stage 4 — blog and social

Enable the blog (already present, commented out in config). Sections: framework releases,
engineering writing, case breakdowns. On top of it, a repeatable process turning one post into
per-channel variants.

### Stage 5 — the GEO layer — *partly done*

Done, and brought forward from its place in this list because it was cheap and because content
should ship into it rather than have it retrofitted: `llms.txt` and `llms-full.txt` (generated at
prebuild from `docs/` and `learn/`, so they cannot drift), `robots.txt` explicitly welcoming the
AI crawlers, and `SoftwareApplication` JSON-LD.

Still to do: per-page `TechArticle` structured data — which needs swizzling the doc page, unlike the
site-wide tag already in `headTags` — per-page OG images, and the distribution work that makes the
framework citable at all (pub.dev, GitHub, dev.to, r/FlutterDev).

---

## 7. How to tell it is working

Deliberately few, because vanity metrics on a site this young mean nothing.

- **Stage 2 onward:** non-branded impressions in Search Console, and their trend. Not visits.
- **Stage 3 onward:** how many `/learn` pages earn any impressions at all — coverage before volume.
- **Throughout:** clicks on the quick-start CTA, as the only signal that evaluation turned into an
  attempt.
- **Stage 5:** whether asking a model about fullstack Dart frameworks returns DartWay.
