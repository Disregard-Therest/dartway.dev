# The page counter

A Cloudflare Worker with a D1 database. Counts pageviews and CTA clicks, stores
no cookies and no IP addresses, and therefore needs no consent banner.

**One counter serves every DartWay site** — dartway.dev now, dartway.studio
later — rather than one deployment per site. Splitting them would double the
worker, the database, the token and every schema change, and comparing the two
would take two requests and manual arithmetic. Cloudflare's limits are counted
per account anyway, so separating buys no headroom.

Which site an event belongs to is taken from the `Origin` header, which the
worker already checks against `ALLOWED_ORIGINS` — not from the request body,
which anyone could write. Adding a site is therefore one entry in that list and
no client change at all.

**What it does not do:** unique visitors. Counting people means identifying
them, and nothing here identifies anyone. The numbers are volume and direction —
which pages are read, what is trending, which CTAs get clicked, where traffic
comes from. For *which search queries* brought someone and at what position,
the source is Google Search Console, not this.

## Deploy

Everything that needs the endpoint or the token reads them from `.env`, so none
of these commands has a placeholder to fill in. Copy `.env.example` to `.env`
first; `.env` is git-ignored and the token must stay out of the history.

```bash
npm install -g wrangler
wrangler login

cd analytics
wrangler d1 create dartway-analytics    # database_id goes into wrangler.toml
                                        # (ignore the binding it suggests — ours is DB)
wrangler d1 execute dartway-analytics --remote --file=schema.sql
cd ..

npm run worker:deploy                   # prints the worker URL -> .env
npm run worker:secret                   # sends STATS_TOKEN from .env to the worker
npm run stats -- --test                 # sends a test event and reads it back
```

`--remote` on the schema step is not optional: without it wrangler builds a
local development database and the real one stays empty, which shows up later as
a 500 from the worker and no obvious cause.

Then connect the site: add `ANALYTICS_ENDPOINT` as a **repository variable**
(Settings → Secrets and variables → Actions → Variables — not a secret, those
are not readable at build time) and run the Deploy workflow by hand, since the
value only reaches the pages when they are built. **Until that happens the
client module does nothing**, which is the correct state before the worker
exists and is why the site could ship ahead of all this.

## Read the numbers

```bash
npm run stats                        # last 30 days, every site
npm run stats -- --days 7
npm run stats -- --site dartway.dev  # narrow to one site
npm run stats -- --json              # raw response
npm run stats -- --test              # send a test event first
```

The per-site totals stay unfiltered even with `--site`; they are there to
compare.

## Rotate the token

```bash
npm run token:new        # prints one, paste it into .env
npm run worker:secret    # push it to the worker
npm run stats -- --test  # confirm
```

Both sides have to match — changing only one gives 401.

## Google Search Console — do this first

The counter says how many came. Search Console says *what they searched for*, at
what position, and which pages are gaining — the only data that tells us whether
the `/learn` strategy is working. It is free, and it does not backfill: it starts
collecting the day it is connected, so every week without it is a week that
cannot be recovered later.

1. [search.google.com/search-console](https://search.google.com/search-console)
   → add property → **Domain** (`dartway.dev`), which covers every subdomain and
   both protocols.
2. Verify by adding the TXT record it gives you to the DNS for `dartway.dev`.
   Prefer this over the HTML-file method — the file has to survive every deploy
   and a domain property cannot use it anyway.
3. Submit `https://dartway.dev/sitemap.xml` under **Sitemaps**. Docusaurus
   generates it on every build.

Worth doing at the same time: [Bing Webmaster
Tools](https://www.bing.com/webmasters), which can import the Search Console
property in one step. Bing's index feeds several AI search products, so it is
not only about Bing's own traffic.

## Notes

- **D1, not KV.** KV's free tier caps daily writes low enough that a pageview
  counter reaches it within days, and it fails by dropping writes silently — the
  counter looks fine and under-reports. Check the current free-tier limits before
  going live; they move.
- **Bots are filtered by user agent**, coarsely. Crawlers are welcome on the site
  and are explicitly allowed in `robots.txt`; they are just not traffic.
- **`ALLOWED_ORIGINS`** gates `POST /e`. Add a localhost origin there temporarily
  if you want to verify the wiring from a dev build.
- A failed insert is logged and swallowed. A counter must never be the reason a
  page misbehaves.
