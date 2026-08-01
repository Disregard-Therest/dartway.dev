# The page counter

A Cloudflare Worker with a D1 database. Counts pageviews and CTA clicks for
dartway.dev, stores no cookies and no IP addresses, and therefore needs no
consent banner.

**What it does not do:** unique visitors. Counting people means identifying
them, and nothing here identifies anyone. The numbers are volume and direction —
which pages are read, what is trending, which CTAs get clicked, where traffic
comes from. For *which search queries* brought someone and at what position,
the source is Google Search Console, not this.

## Deploy

```bash
npm install -g wrangler
wrangler login

cd analytics
wrangler d1 create dartway-analytics       # copy database_id into wrangler.toml
wrangler d1 execute dartway-analytics --remote --file=schema.sql
wrangler secret put STATS_TOKEN            # any long random string
wrangler deploy
```

`wrangler deploy` prints the worker URL. Then build the site with it set:

```bash
ANALYTICS_ENDPOINT=https://dartway-analytics.<subdomain>.workers.dev npm run build
```

In CI, add the same value as a repository variable named `ANALYTICS_ENDPOINT`
and pass it to the build step in `.github/workflows/deploy.yml`. **Without it
the client module does nothing** — which is the correct state until the worker
exists, and means the site can ship before any of this is set up.

## Read the numbers

```bash
curl -H "Authorization: Bearer $STATS_TOKEN" \
  "https://dartway-analytics.<subdomain>.workers.dev/stats?days=30"
```

Returns JSON: views per day, top paths, CTA clicks by name, top referrer hosts,
top countries.

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
