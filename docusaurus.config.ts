import type * as Preset from '@docusaurus/preset-classic';
import type { Config, PluginConfig } from '@docusaurus/types';
import { themes as prismThemes } from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

// Which locale is being built right now.
//
// `docusaurus build` builds every locale in turn, re-evaluating this file for
// each one, and sets DOCUSAURUS_CURRENT_LOCALE before it does. Docusaurus marks
// the variable as a stopgap in its own source (core/lib/commands/build/
// buildLocale.js) and may replace it once a real API exists — so if a version
// bump ever makes the Russian build sprout a /ru/docs/ tree, this is the line
// that stopped working.
const currentLocale = process.env.DOCUSAURUS_CURRENT_LOCALE ?? 'en';
const isDefaultLocale = currentLocale === 'en';

/**
 * The community channel, per locale. Two real channels, not one channel with a
 * translated label — so this is the one link on the site that must not simply
 * be translated, and the reason it lives here rather than in the component that
 * uses it: the footer is configured here and the landing reads it back out of
 * `customFields`, and both have to agree.
 */
const TELEGRAM_URL = isDefaultLocale ? 'https://t.me/dartway_dev' : 'https://t.me/dartway_dev_ru';

const config: Config = {
  title: 'DartWay Framework',
  tagline: 'Full-stack Dart framework on Flutter + Serverpod',
  favicon: 'favicon.ico',

  // Compatibility with the upcoming Docusaurus v4.
  // Note that `v4: true` also turns on Docusaurus Faster (Rspack + SWC), which
  // is why @docusaurus/faster is a dependency — v4 makes it the default anyway,
  // and the docs sync rebuilds the site every day.
  future: {
    v4: true,
  },

  url: 'https://dartway.dev',
  baseUrl: '/',
  organizationName: 'Disregard-Therest',
  projectName: 'dartway.dev',

  onBrokenLinks: 'throw',

  markdown: {
    // .md is parsed as CommonMark, only .mdx as MDX. docs/ is synced verbatim
    // from the dartway/dartway monorepo and its prose is full of generics like
    // `DwCrudConfig<T>`; under MDX those are read as JSX and break the build.
    // Nobody proofreads a sync, so the guarantee has to be structural.
    format: 'detect',
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  // Requested by GitHub Pages for better behaviour with addresses.
  trailingSlash: false,

  clientModules: ['./src/clientModules/analytics.ts'],

  customFields: {
    // Base URL of the counter in analytics/. Unset means the client module does
    // nothing at all, which is the correct state until the worker is deployed.
    analyticsEndpoint: process.env.ANALYTICS_ENDPOINT ?? '',

    // Read by the landing's closing CTA. See TELEGRAM_URL above.
    telegramUrl: TELEGRAM_URL,
  },

  // Machine-readable statement of what DartWay is, on every page. Search engines
  // use it for rich results; models use it to answer "what is this" without
  // having to infer it from prose.
  headTags: [
    {
      tagName: 'script',
      attributes: { type: 'application/ld+json' },
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'DartWay',
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Android, iOS, Web',
        programmingLanguage: 'Dart',
        url: 'https://dartway.dev',
        codeRepository: 'https://github.com/dartway/dartway',
        license: 'https://www.apache.org/licenses/LICENSE-2.0',
        description:
          'A fullstack framework for building an application in one language. Serverpod runs the ' +
          'server, Flutter runs the client, and DartWay is the layer over both: you declare a model ' +
          'and configure who may do what with it, instead of writing an endpoint per operation.',
        author: { '@type': 'Person', name: 'Evgenii Novikov' },
      }),
    },
  ],

  // English is the source language and the default locale: it sits at the root,
  // Russian at /ru. Everything under i18n/ru is either generated from the
  // English source (learn) or a translation file checked by
  // `npm run write-translations` (landing, navbar, footer) — see CLAUDE.md.
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ru'],
    localeConfigs: {
      en: { label: 'English', htmlLang: 'en' },
      ru: { label: 'Русский', htmlLang: 'ru' },
    },
  },

  presets: [
    [
      'classic',
      {
        // The framework documentation is English-only and generated from the
        // monorepo — see STRATEGY.md. Switching the plugin off for every locale
        // but the default is what keeps /ru/docs/* from existing at all, rather
        // than existing and serving English under a Russian URL. The rule is
        // restated for the runtime in src/localeRoutes.ts.
        docs: isDefaultLocale ? { sidebarPath: './sidebars.ts' } : false,
        // Stage 4. Both locales since 06.09.2026: `tools/translate.mjs` now
        // builds a job per post, so /ru/blog carries Russian prose rather than
        // English under a Russian URL. It shipped English-only for one week and
        // the counter said what that cost — see STRATEGY.md §7.
        //
        // Feeds are on from the first post. Aggregators and readers subscribe to
        // a feed that exists; a subscription cannot be backfilled once posts
        // have gone out without one.
        blog: {
          path: 'blog',
          routeBasePath: 'blog',
          blogTitle: 'DartWay Blog',
          blogDescription:
            'Full-stack Dart in production: engineering writing, case breakdowns, framework releases.',
          blogSidebarTitle: 'Recent posts',
          blogSidebarCount: 10,
          postsPerPage: 10,
          showReadingTime: true,
          // The feed's own title and description are not covered by the
          // plugin's i18n — `options.json` translates the blog pages, the feed
          // is built from these. Set per locale here, or the Russian feed goes
          // out titled in English to readers who subscribed to Russian.
          feedOptions: {
            type: ['rss', 'atom'],
            title: isDefaultLocale ? 'DartWay Blog' : 'Блог DartWay',
            description: isDefaultLocale
              ? 'Full-stack Dart in production: engineering writing, case breakdowns, framework releases.'
              : 'Full-stack Dart в проде: инженерные разборы, кейсы, релизы фреймворка.',
            copyright: `Copyright © ${new Date().getFullYear()} DartWay.`,
            xslt: true,
          },
          onInlineTags: 'throw',
          onInlineAuthors: 'throw',
          onUntruncatedBlogPosts: 'throw',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    // The pre-sync documentation URLs, kept alive. They are indexed and they are
    // the only non-branded search traffic the site has; a 404 loses the position
    // and the position is slow to come back. Several old pages have no successor
    // — `navigation`, `naming_conventions`, the three `dartway_specials` — and
    // those go to the nearest section rather than to the landing, because a
    // redirect that drops the reader at the front door reads as a dead link.
    //
    // English only: /docs never existed under /ru, so there is nothing to
    // redirect there, and the plugin would fabricate /ru/docs/* routes that
    // src/localeRoutes.ts exists to keep from existing.
    ...(isDefaultLocale
      ? ([
          [
            '@docusaurus/plugin-client-redirects',
            {
              redirects: [
                { from: '/framework', to: '/' },

                // `/education` was the competency map's address until it was
                // renamed to `/learn`. The counter says people still arrive on
                // it — nine views last month on a 404, which is more than most
                // live pages get. Added 06.09 once there were numbers to see it.
                { from: '/education', to: '/learn' },
                { from: '/education/competency-map', to: '/learn' },
                {
                  from: '/education/core-engineering/computer-science-fundamentals/algorithms-and-data-structures',
                  to: '/learn/foundations/algorithms-and-data-structures',
                },
                {
                  from: '/education/flutter-mobile-dev/state-management',
                  to: '/learn/flutter/state-and-data-flow',
                },

                { from: '/docs/intro', to: '/docs/getting-started/what-is-dartway' },
                { from: '/docs/quick-start', to: '/docs/getting-started/quick-start' },

                { from: '/docs/foundations/architecture', to: '/docs/getting-started/what-is-dartway' },
                { from: '/docs/foundations/dartway_specials', to: '/docs/getting-started/what-is-dartway' },
                { from: '/docs/foundations/domain_and_crud', to: '/docs/core/models' },
                { from: '/docs/foundations/creating_a_feature', to: '/docs/flutter/features-and-specs' },
                { from: '/docs/foundations/naming_conventions', to: '/docs/tooling/conventions-checker' },

                { from: '/docs/flutter/flutter_project_structure', to: '/docs/getting-started/project-layout' },
                { from: '/docs/flutter/feature_architecture', to: '/docs/flutter/features-and-specs' },
                { from: '/docs/flutter/ui_kit', to: '/docs/flutter/ui-kit' },
                { from: '/docs/flutter/navigation', to: '/docs/flutter/features-and-specs' },
                { from: '/docs/flutter/dartway_specials', to: '/docs/flutter/data-layer' },

                { from: '/docs/server/crud_configs', to: '/docs/core/crud-configs' },
                { from: '/docs/server/defining_models', to: '/docs/core/models' },
                { from: '/docs/server/server_initialization', to: '/docs/getting-started/quick-start' },
                { from: '/docs/server/server_project_structure', to: '/docs/getting-started/project-layout' },
                { from: '/docs/server/dartway_specials', to: '/docs/core/crud-configs' },
              ],
            },
          ],
        ] satisfies PluginConfig[])
      : []),
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'learn',
        path: 'learn',
        routeBasePath: 'learn',
        sidebarPath: './learnSidebars.ts',
      } satisfies Preset.Options['docs'],
    ],
  ],

  themeConfig: {
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false, // или true, если не хочешь показывать переключатель
      respectPrefersColorScheme: false, // игнорировать системные настройки
    },
    image: 'img/hero_background.webp',
    metadata: [
      { property: 'og:image', content: 'https://dartway.dev/img/hero_background.webp' },
    ],
    navbar: {
      title: 'DartWay',
      logo: {
        alt: 'DartWay Logo',
        src: 'img/dartway_logo.svg',
      },
      items: [
        // Neither of the custom items is decoration: the theme's own navbar
        // link and locale dropdown both assume every page exists in every
        // locale, and the documentation does not. See src/components/.
        {
          type: 'custom-docsLink',
          position: 'right',
        },
        {
          to: '/learn',
          position: 'right',
          label: 'Learn',
        },
        {
          to: '/blog',
          position: 'right',
          label: 'Blog',
        },
        {
          type: 'custom-localeSwitch',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        // {
        //   title: 'Docs',
        //   items: [
        //     { label: 'Intro', to: '/docs/intro' },
        //     { label: 'Quick Start', to: '/docs/quick-start' },
        //   ],
        // },
        {
          title: 'Community',
          items: [
            // Was "Telegram (ENG)" when the English channel was the only one.
            // Now each locale points at its own, so the qualifier would only be
            // wrong on one of them.
            { label: 'Telegram', href: TELEGRAM_URL },
            { label: 'GitHub', href: 'https://github.com/dartway/dartway' },
          ],
        },
        // {
        //   title: 'More',
        //   items: [
        //     // { label: 'Blog', to: '/blog' },
        //     { label: 'License: Apache 2.0', to: '/license' },
        //   ],
        // },
      ],
      copyright:
        `Copyright © ${new Date().getFullYear()} DartWay. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['dart'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
