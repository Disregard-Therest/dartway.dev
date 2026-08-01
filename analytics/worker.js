/**
 * dartway.dev — the page counter.
 *
 * A Cloudflare Worker with a D1 database behind it. Two routes:
 *
 *   POST /e       record one event (a pageview, or a CTA click)
 *   GET  /stats   read the aggregates back, token-protected
 *
 * It stores no cookies and no IP addresses, so it needs no consent banner and
 * has nothing to leak. The price is that it counts events, not people: there
 * are no unique visitors here and there is no way to add them without
 * identifying someone. Treat the numbers as volume and direction.
 *
 * D1 rather than KV on purpose. KV's free tier caps daily writes low enough
 * that a pageview counter reaches it within days, and it fails by silently
 * dropping writes — the counter appears to work and quietly under-reports.
 *
 * Deployment: see README.md next to this file.
 */

const MAX_FIELD = 512;

/** Coarse bot filter. Crawlers are welcome on the site; they are not traffic. */
const BOT = /bot|crawl|spider|slurp|headless|preview|monitor|lighthouse|curl|wget|python-requests/i;

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const origin = request.headers.get('Origin') ?? '';

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: cors(origin, env) });
    }

    if (url.pathname === '/e' && request.method === 'POST') {
      return record(request, env, origin);
    }

    if (url.pathname === '/stats' && request.method === 'GET') {
      return stats(request, env, url);
    }

    return new Response('Not found', { status: 404 });
  },
};

async function record(request, env, origin) {
  if (!allowedOrigin(origin, env)) {
    return new Response('Forbidden', { status: 403 });
  }

  const userAgent = request.headers.get('User-Agent') ?? '';
  // Answer 204 to bots as well: a rejection is a signal worth retrying, and
  // there is nothing to gain by telling a crawler it was filtered.
  if (BOT.test(userAgent)) {
    return new Response(null, { status: 204, headers: cors(origin, env) });
  }

  let event;
  try {
    event = JSON.parse(await request.text());
  } catch {
    return new Response('Bad request', { status: 400, headers: cors(origin, env) });
  }

  const path = clean(event.path);
  const kind = clean(event.kind) || 'pageview';
  if (!path.startsWith('/')) {
    return new Response('Bad request', { status: 400, headers: cors(origin, env) });
  }

  try {
    await env.DB.prepare(
      'INSERT INTO events (ts, kind, path, referrer, country) VALUES (?, ?, ?, ?, ?)',
    )
      .bind(
        Math.floor(Date.now() / 1000),
        kind,
        path,
        referrerHost(event.referrer),
        request.cf?.country ?? null,
      )
      .run();
  } catch (error) {
    // A counter must never be the reason a page misbehaves. Log and move on.
    console.error('insert failed', error);
  }

  return new Response(null, { status: 204, headers: cors(origin, env) });
}

async function stats(request, env, url) {
  const token = request.headers.get('Authorization')?.replace(/^Bearer\s+/i, '') ?? url.searchParams.get('token');
  if (!env.STATS_TOKEN || token !== env.STATS_TOKEN) {
    return new Response('Unauthorized', { status: 401 });
  }

  const days = Math.min(Math.max(Number(url.searchParams.get('days')) || 30, 1), 365);
  const since = Math.floor(Date.now() / 1000) - days * 86400;

  const query = (sql) => env.DB.prepare(sql).bind(since).all().then((r) => r.results);

  const [daily, pages, ctas, referrers, countries] = await Promise.all([
    query(`SELECT date(ts, 'unixepoch') AS day, COUNT(*) AS views
           FROM events WHERE ts >= ? AND kind = 'pageview'
           GROUP BY day ORDER BY day`),
    query(`SELECT path, COUNT(*) AS views
           FROM events WHERE ts >= ? AND kind = 'pageview'
           GROUP BY path ORDER BY views DESC LIMIT 50`),
    query(`SELECT kind, COUNT(*) AS clicks
           FROM events WHERE ts >= ? AND kind != 'pageview'
           GROUP BY kind ORDER BY clicks DESC`),
    query(`SELECT referrer, COUNT(*) AS views
           FROM events WHERE ts >= ? AND referrer IS NOT NULL
           GROUP BY referrer ORDER BY views DESC LIMIT 30`),
    query(`SELECT country, COUNT(*) AS views
           FROM events WHERE ts >= ? AND country IS NOT NULL
           GROUP BY country ORDER BY views DESC LIMIT 30`),
  ]);

  return Response.json(
    { days, daily, pages, ctas, referrers, countries },
    { headers: { 'Cache-Control': 'no-store' } },
  );
}

/** Only the host, never the full URL — a query string can carry anything. */
function referrerHost(referrer) {
  if (typeof referrer !== 'string' || referrer === '') return null;
  try {
    return new URL(referrer).host || null;
  } catch {
    return null;
  }
}

function clean(value) {
  return typeof value === 'string' ? value.slice(0, MAX_FIELD) : '';
}

function allowedOrigins(env) {
  return (env.ALLOWED_ORIGINS ?? 'https://dartway.dev')
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean);
}

function allowedOrigin(origin, env) {
  return allowedOrigins(env).includes(origin);
}

function cors(origin, env) {
  return {
    'Access-Control-Allow-Origin': allowedOrigin(origin, env) ? origin : allowedOrigins(env)[0],
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
  };
}
