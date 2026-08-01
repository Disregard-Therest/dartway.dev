#!/usr/bin/env node
/**
 * Pushes STATS_TOKEN from .env to the Cloudflare worker.
 *
 *   npm run worker:secret
 *
 * `wrangler secret put` normally prompts for the value, which means typing a
 * 43-character token by hand and getting it wrong. This feeds it on stdin
 * instead, from the same file `npm run stats` reads — so the two sides cannot
 * drift apart.
 */

import { spawn } from 'node:child_process';
import path from 'node:path';
import { requireEnv, ROOT, fail } from './env.mjs';

const env = requireEnv('STATS_TOKEN');
const cwd = path.join(ROOT, 'analytics');

console.log('Sending STATS_TOKEN from .env to the worker…');

const wrangler = spawn(
  process.platform === 'win32' ? 'wrangler.cmd' : 'wrangler',
  ['secret', 'put', 'STATS_TOKEN'],
  { cwd, stdio: ['pipe', 'inherit', 'inherit'] },
);

wrangler.on('error', (error) => {
  fail(
    error.code === 'ENOENT'
      ? 'wrangler is not installed. Run:  npm install -g wrangler'
      : error.message,
  );
});

wrangler.stdin.end(env.STATS_TOKEN);

wrangler.on('close', (code) => {
  if (code === 0) {
    console.log('\nDone. Check it with:  npm run stats -- --test');
  } else {
    console.error(`\nwrangler exited with ${code}.`);
    console.error('If it is an authentication error, run `wrangler login` first.');
  }
  process.exit(code ?? 1);
});
