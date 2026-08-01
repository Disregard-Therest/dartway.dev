#!/usr/bin/env node
/**
 * Generate /llms.txt and /llms-full.txt.
 *
 * Both are for language models rather than people. `llms.txt` is an index — a
 * summary and an annotated list of every page, so a model can decide what to
 * fetch. `llms-full.txt` is the whole site as one markdown file, for when it
 * would rather read everything than choose.
 *
 * Written into static/ before the build, so Docusaurus copies them to the site
 * root. Run automatically by the `prebuild` script; never committed.
 *
 * The format follows https://llmstxt.org.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SITE_URL = 'https://dartway.dev';

const SITE_TITLE = 'DartWay';

const SITE_SUMMARY =
  'A fullstack framework for building an application in one language: Serverpod runs the server, ' +
  'Flutter runs the client, and DartWay is the layer over both. Instead of an endpoint per ' +
  'operation, a client call per endpoint and a repository to hold the result, you declare a model ' +
  'and configure who may do what with it.';

/**
 * Content sets to index, in the order a reader should meet them. Each maps a
 * source folder to the URL prefix Docusaurus serves it under.
 *
 * `stripNumericPrefix` mirrors what Docusaurus does to path segments: `1-core`
 * is ordering metadata, not part of the URL.
 */
const SOURCES = [
  {
    dir: 'docs',
    urlPrefix: '/docs',
    heading: 'Documentation',
    note: 'The framework itself. Synced from the dartway/dartway monorepo.',
  },
  {
    dir: 'education',
    urlPrefix: '/education',
    heading: 'Learning',
    note: 'The Flutter developer competency map and its topics.',
  },
];

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const STATIC = path.join(ROOT, 'static');

function main() {
  const sections = SOURCES.map((source) => ({
    ...source,
    pages: collect(path.join(ROOT, source.dir), source),
  })).filter((section) => section.pages.length > 0);

  const total = sections.reduce((n, section) => n + section.pages.length, 0);
  if (total === 0) {
    console.error('generate-llms: no pages found — writing nothing');
    process.exit(1);
  }

  fs.mkdirSync(STATIC, { recursive: true });
  fs.writeFileSync(path.join(STATIC, 'llms.txt'), renderIndex(sections), 'utf8');
  fs.writeFileSync(path.join(STATIC, 'llms-full.txt'), renderFull(sections), 'utf8');

  console.log(`generate-llms: indexed ${total} pages into static/llms.txt and static/llms-full.txt`);
}

function collect(root, source) {
  if (!fs.existsSync(root)) return [];

  const pages = [];

  const walk = (dir) => {
    const entries = fs
      .readdirSync(dir, { withFileTypes: true })
      .sort((a, b) => a.name.localeCompare(b.name));

    for (const entry of entries) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full);
      } else if (entry.name.endsWith('.md')) {
        pages.push(readPage(full, root, source));
      }
    }
  };

  walk(root);
  return pages;
}

function readPage(file, root, source) {
  const raw = fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n');
  const { frontmatter, body } = splitFrontmatter(raw);

  const relative = path.relative(root, file).split(path.sep).join('/');

  return {
    url: SITE_URL + pageUrl(relative, frontmatter, source),
    title: frontmatter.title ?? firstHeading(body) ?? path.basename(file, '.md'),
    summary: frontmatter.description ?? firstParagraph(body),
    body: stripNotices(body).trim(),
  };
}

/**
 * The public URL of a page. A `slug:` in the frontmatter wins outright — that is
 * what Docusaurus does, and the competency map uses one.
 */
function pageUrl(relative, frontmatter, source) {
  if (frontmatter.slug) {
    const slug = frontmatter.slug.startsWith('/') ? frontmatter.slug : `/${frontmatter.slug}`;
    return `${source.urlPrefix}${slug}`;
  }

  const segments = relative
    .replace(/\.md$/, '')
    .split('/')
    .map(stripNumericPrefix);

  return `${source.urlPrefix}/${segments.join('/')}`;
}

/** `1-getting-started` -> `getting-started`, matching Docusaurus. */
function stripNumericPrefix(segment) {
  return segment.replace(/^\d+[-_.\s]*/, '');
}

function splitFrontmatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!match) return { frontmatter: {}, body: raw };

  const frontmatter = {};
  for (const line of match[1].split('\n')) {
    const pair = line.match(/^([A-Za-z_][\w-]*):\s*(.*)$/);
    if (pair) frontmatter[pair[1]] = pair[2].trim().replace(/^['"]|['"]$/g, '');
  }

  return { frontmatter, body: raw.slice(match[0].length) };
}

function firstHeading(body) {
  const match = body.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : null;
}

/**
 * The page's opening statement, as one sentence.
 *
 * Takes the first block that is prose or a blockquote, whichever comes first,
 * and skips past everything that only looks like an opening: code fences,
 * headings, lists, tables. Several pages open on a fenced command or a bulleted
 * list of prerequisites, and reading either as prose produces a summary that
 * says nothing.
 *
 * A leading blockquote counts because the docs use one for a page's goal
 * statement, which is exactly the summary wanted here.
 */
function firstParagraph(body) {
  const lines = stripNotices(body).split('\n');
  const block = [];
  let blockIsQuote = false;
  let inFence = false;

  for (const line of lines) {
    const trimmed = line.trim();

    if (trimmed.startsWith('```') || trimmed.startsWith('~~~')) {
      inFence = !inFence;
      if (block.length > 0) break;
      continue;
    }
    if (inFence) continue;

    const isQuote = trimmed.startsWith('>');
    const skippable =
      trimmed === '' ||
      trimmed.startsWith('#') ||
      trimmed.startsWith('|') ||
      trimmed.startsWith('<') ||
      /^[-*+]\s/.test(trimmed) ||
      /^\d+[.)]\s/.test(trimmed);

    if (!isQuote && skippable) {
      if (block.length > 0) break;
      continue;
    }

    // A change of kind ends the block just as a blank line would.
    if (block.length > 0 && isQuote !== blockIsQuote) break;

    blockIsQuote = isQuote;
    block.push(isQuote ? trimmed.replace(/^>\s?/, '') : trimmed);
  }

  if (block.length === 0) return '';

  const text = block.join(' ').replace(/\s+/g, ' ');
  const sentence = text.match(/^.*?[.!?](?=\s|$)/);
  return (sentence ? sentence[0] : text).replace(/\*\*/g, '');
}

/** Drop the "this file is generated" comments the docs sync inserts. */
function stripNotices(body) {
  return body.replace(/^<!--[\s\S]*?-->\n?/gm, '');
}

function renderIndex(sections) {
  const out = [`# ${SITE_TITLE}`, '', `> ${SITE_SUMMARY}`, ''];

  out.push(
    'The full text of every page below is also available as one file at',
    `${SITE_URL}/llms-full.txt.`,
    '',
  );

  for (const section of sections) {
    out.push(`## ${section.heading}`, '');
    if (section.note) out.push(section.note, '');

    for (const page of section.pages) {
      out.push(page.summary ? `- [${page.title}](${page.url}): ${page.summary}` : `- [${page.title}](${page.url})`);
    }
    out.push('');
  }

  return `${out.join('\n').trimEnd()}\n`;
}

function renderFull(sections) {
  const out = [`# ${SITE_TITLE}`, '', `> ${SITE_SUMMARY}`, ''];

  for (const section of sections) {
    for (const page of section.pages) {
      out.push('---', '', `Source: ${page.url}`, '', page.body, '');
    }
  }

  return `${out.join('\n').trimEnd()}\n`;
}

main();
