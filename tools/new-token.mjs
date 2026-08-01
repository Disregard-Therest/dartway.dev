#!/usr/bin/env node
/**
 * Prints a fresh STATS_TOKEN.
 *
 *   npm run token:new
 *
 * Deliberately prints rather than writing to .env: rotating a token means
 * changing it in two places, and a script that silently edited one of them
 * would leave `npm run stats` failing with 401 and no clue why.
 */

import { randomBytes } from 'node:crypto';

console.log(`
New token:

  STATS_TOKEN=${randomBytes(32).toString('base64url')}

To use it:
  1. replace the STATS_TOKEN line in .env with the one above
  2. run:  npm run worker:secret
  3. check: npm run stats -- --test

Both sides have to match. Changing only .env gives 401; changing only the
worker gives 401 as well, from the other direction.
`);
