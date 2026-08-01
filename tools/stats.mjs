#!/usr/bin/env node
/**
 * Reads the page counter and prints it.
 *
 *   npm run stats                     last 30 days, every site
 *   npm run stats -- --days 7
 *   npm run stats -- --site dartway.dev
 *   npm run stats -- --json           raw response
 *   npm run stats -- --test           send a test event first, then read back
 *
 * Endpoint and token come from .env, so there is nothing to substitute by hand.
 */

import { requireEnv, fail } from './env.mjs';

const args = process.argv.slice(2);
const flag = (name, fallback = null) => {
  const at = args.indexOf(`--${name}`);
  return at === -1 ? fallback : (args[at + 1] ?? fallback);
};

const env = requireEnv('ANALYTICS_ENDPOINT', 'STATS_TOKEN');
const days = flag('days', '30');
const site = flag('site');

if (args.includes('--test')) await sendTestEvent();

const url = new URL(`${env.ANALYTICS_ENDPOINT}/stats`);
url.searchParams.set('days', days);
if (site) url.searchParams.set('site', site);

const response = await fetch(url, {
  headers: { Authorization: `Bearer ${env.STATS_TOKEN}` },
}).catch((error) => fail(`Could not reach ${env.ANALYTICS_ENDPOINT}\n${error.message}`));

if (response.status === 401) {
  fail(
    'The worker rejected the token (401).\n' +
      'STATS_TOKEN in .env and the one on the worker disagree.\n' +
      'Push the local one with:  npm run worker:secret',
  );
}
if (!response.ok) {
  fail(`The worker answered ${response.status}.\n${(await response.text()).slice(0, 400)}`);
}

const data = await response.json();

if (args.includes('--json')) {
  console.log(JSON.stringify(data, null, 2));
  process.exit(0);
}

report(data);

async function sendTestEvent() {
  const response = await fetch(`${env.ANALYTICS_ENDPOINT}/e`, {
    method: 'POST',
    // The worker files an event under the host of its Origin and rejects any
    // origin not in ALLOWED_ORIGINS, so this header is not decoration.
    headers: { Origin: 'https://dartway.dev', 'Content-Type': 'text/plain' },
    body: JSON.stringify({ path: '/self-test', kind: 'pageview' }),
  }).catch((error) => fail(`Could not reach ${env.ANALYTICS_ENDPOINT}\n${error.message}`));

  if (response.status === 204) {
    console.log('Test event accepted (204). It should appear below as /self-test.\n');
    return;
  }

  const body = (await response.text()).slice(0, 400);
  if (response.status === 403) {
    fail(`The worker refused the origin (403).\nCheck ALLOWED_ORIGINS in analytics/wrangler.toml.\n${body}`);
  }
  fail(
    `The worker answered ${response.status} instead of 204.\n` +
      (response.status >= 500
        ? 'A 5xx here usually means the events table does not exist — the schema step\n' +
          'needs --remote, or it only ran against a local database.\n'
        : '') +
      body,
  );
}

function report({ days, site, sites, daily, pages, ctas, referrers, countries }) {
  const total = daily.reduce((n, d) => n + d.views, 0);

  console.log(`\nLast ${days} day(s) — ${site === 'all' ? 'all sites' : site}`);
  console.log(`${total} pageview(s)\n`);

  if (total === 0 && (!sites || sites.length === 0)) {
    console.log('Nothing recorded yet.');
    console.log('If the worker is deployed, the likely cause is that the site has not');
    console.log('been rebuilt since ANALYTICS_ENDPOINT was added as a repository variable.');
    console.log('Try `npm run stats -- --test` to check the worker itself.\n');
    return;
  }

  table('By site', sites, 'site', 'views');
  table('Top pages', pages, 'path', 'views');
  table('CTA clicks', ctas, 'kind', 'clicks');
  table('Referrers', referrers, 'referrer', 'views');
  table('Countries', countries, 'country', 'views');

  if (daily.length > 0) {
    console.log('By day');
    const peak = Math.max(...daily.map((d) => d.views));
    for (const { day, views } of daily) {
      const bar = '#'.repeat(Math.max(1, Math.round((views / peak) * 40)));
      console.log(`  ${day}  ${String(views).padStart(5)}  ${bar}`);
    }
    console.log('');
  }
}

function table(title, rows, keyField, valueField) {
  if (!rows || rows.length === 0) return;

  const width = Math.min(60, Math.max(...rows.map((r) => String(r[keyField] ?? '—').length)));
  console.log(title);
  for (const row of rows.slice(0, 15)) {
    const key = String(row[keyField] ?? '—').slice(0, 60);
    console.log(`  ${key.padEnd(width)}  ${String(row[valueField]).padStart(6)}`);
  }
  if (rows.length > 15) console.log(`  … and ${rows.length - 15} more`);
  console.log('');
}
