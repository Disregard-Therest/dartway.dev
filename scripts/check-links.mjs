#!/usr/bin/env node
/**
 * Checks that every external link under learn/ resolves.
 *
 *   npm run check-links
 *   npm run check-links -- learn/02_dart      # one folder
 *
 * The competency map's value is its Resources sections, and a curated link that
 * 404s is worse than no link — it says nobody has looked at this page in a year.
 * Docusaurus checks internal links at build time and says nothing about external
 * ones, so this covers the other half.
 *
 * Not part of the build: it makes real network requests, and a site being down
 * for an hour should not fail a deploy.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DEFAULT_DIR = 'learn';
const CONCURRENCY = 8;
const TIMEOUT_MS = 20_000;

// Some hosts refuse anything that does not look like a browser.
const USER_AGENT =
  'Mozilla/5.0 (compatible; dartway.dev link checker; +https://dartway.dev)';

const target = path.join(ROOT, process.argv[2] ?? DEFAULT_DIR);

const links = collect(target);
if (links.length === 0) {
  console.log(`No external links found under ${path.relative(ROOT, target)}.`);
  process.exit(0);
}

console.log(`Checking ${links.length} link(s) under ${path.relative(ROOT, target)}…\n`);

const failures = [];
let checked = 0;

await Promise.all(
  Array.from({ length: Math.min(CONCURRENCY, links.length) }, async () => {
    let next;
    while ((next = links.shift()) !== undefined) {
      const status = await check(next.url);
      checked += 1;
      if (status.ok) continue;
      failures.push({ ...next, reason: status.reason });
      console.log(`  ${status.reason}  ${next.url}`);
    }
  }),
);

console.log(`\n${checked} checked, ${failures.length} failed.`);

if (failures.length > 0) {
  console.log('');
  for (const failure of failures) {
    console.log(`${failure.file}:${failure.line}`);
    console.log(`  ${failure.url}`);
    console.log(`  ${failure.reason}\n`);
  }
  process.exitCode = 1;
}

/** Every http(s) link in every markdown file under `dir`, with where it came from. */
function collect(dir) {
  const found = [];
  const seen = new Set();

  const walk = (current) => {
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) {
        walk(full);
        continue;
      }
      if (!entry.name.endsWith('.md')) continue;

      const lines = fs.readFileSync(full, 'utf8').split('\n');
      lines.forEach((line, index) => {
        for (const match of line.matchAll(/\]\((https?:\/\/[^)\s]+)\)/g)) {
          const url = match[1];
          if (seen.has(url)) continue;
          seen.add(url);
          found.push({
            url,
            file: path.relative(ROOT, full).split(path.sep).join('/'),
            line: index + 1,
          });
        }
      });
    }
  };

  walk(dir);
  return found;
}

async function check(url) {
  // HEAD first — cheap, and most hosts answer it. Several large sites do not,
  // so a rejection is retried as a GET before it counts as a failure.
  for (const method of ['HEAD', 'GET']) {
    const result = await request(url, method);
    if (result.ok) return result;
    if (method === 'GET') return result;
    if (result.status && result.status < 400) return { ok: true };
  }
  return { ok: false, reason: 'unreachable' };
}

async function request(url, method) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      method,
      redirect: 'follow',
      signal: controller.signal,
      headers: { 'User-Agent': USER_AGENT, Accept: '*/*' },
    });

    if (response.ok) return { ok: true, status: response.status };

    // 403 and 405 from a HEAD usually mean "we do not do that", not "gone".
    return {
      ok: false,
      status: response.status,
      reason: `HTTP ${response.status}`,
    };
  } catch (error) {
    return {
      ok: false,
      reason: error.name === 'AbortError' ? 'timed out' : (error.cause?.code ?? error.message),
    };
  } finally {
    clearTimeout(timer);
  }
}
