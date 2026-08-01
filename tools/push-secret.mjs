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

// On Windows `wrangler` is a .cmd, and Node has refused to spawn .cmd/.bat
// directly since the CVE-2024-27980 fix — it answers EINVAL. Go through the
// command interpreter explicitly rather than passing `shell: true`, which would
// also work but warns (DEP0190) about arguments being concatenated unescaped.
const [command, commandArgs] =
  process.platform === 'win32'
    ? [process.env.COMSPEC || 'cmd.exe', ['/d', '/s', '/c', 'wrangler secret put STATS_TOKEN']]
    : ['wrangler', ['secret', 'put', 'STATS_TOKEN']];

const wrangler = spawn(command, commandArgs, {
  cwd,
  stdio: ['pipe', 'inherit', 'inherit'],
});

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
    console.log('\nDone. Cloudflare takes a few seconds to roll the secret out, so');
    console.log('an immediate 401 is expected — give it a moment, then:');
    console.log('  npm run stats -- --test');
  } else {
    console.error(`\nwrangler exited with ${code}.`);
    console.error('If it is an authentication error, run `wrangler login` first.');
  }
  process.exit(code ?? 1);
});
