import type * as Preset from '@docusaurus/preset-classic';
import type { Config } from '@docusaurus/types';
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
        // preset-classic enables the blog unless told otherwise, and since 3.10
        // it publishes an empty /blog even with no posts. Off until stage 4
        // turns it on deliberately — an empty page is not something to leave
        // for Google to index.
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
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
