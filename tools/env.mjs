/**
 * Reads .env for the tools in this folder.
 *
 * Hand-rolled rather than a dependency: the file has two keys and the parsing
 * rules that matter fit in ten lines.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const ENV_FILE = path.join(ROOT, '.env');

export function loadEnv() {
  if (!fs.existsSync(ENV_FILE)) {
    fail('.env is missing. Copy .env.example to .env and fill it in.');
  }

  const env = {};
  for (const line of fs.readFileSync(ENV_FILE, 'utf8').split('\n')) {
    const trimmed = line.trim();
    if (trimmed === '' || trimmed.startsWith('#')) continue;

    const at = trimmed.indexOf('=');
    if (at === -1) continue;

    env[trimmed.slice(0, at).trim()] = trimmed
      .slice(at + 1)
      .trim()
      .replace(/^['"]|['"]$/g, '');
  }

  return env;
}

/** Reads .env and checks the keys these tools cannot work without. */
export function requireEnv(...keys) {
  const env = loadEnv();
  const missing = keys.filter((key) => !env[key]);

  if (missing.length > 0) {
    fail(`.env is missing a value for ${missing.join(' and ')}. See .env.example.`);
  }

  // A trailing slash here produces a double slash in every request path.
  if (env.ANALYTICS_ENDPOINT) {
    env.ANALYTICS_ENDPOINT = env.ANALYTICS_ENDPOINT.replace(/\/+$/, '');
  }

  return env;
}

export function fail(message) {
  console.error(`\n${message}\n`);
  process.exit(1);
}
