import type * as Preset from '@docusaurus/preset-classic';
import type { Config } from '@docusaurus/types';
import { themes as prismThemes } from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'DartWay Framework',
  tagline: 'Full-stack Dart framework on Flutter + Serverpod',
  favicon: 'favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  url: 'https://dartway.dev',
  baseUrl: '/',
  organizationName: 'Disregard-Therest',
  projectName: 'dartway.dev',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  markdown: {
    // .md is parsed as CommonMark, only .mdx as MDX. docs/ is synced verbatim
    // from the dartway/dartway monorepo and its prose is full of generics like
    // `DwCrudConfig<T>`; under MDX those are read as JSX and break the build.
    // Nobody proofreads a sync, so the guarantee has to be structural.
    format: 'detect',
  },

  // Requested by GitHub Pages for better behaviour with addresses.
  trailingSlash: false,

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

  // English only — see STRATEGY.md. If Russian ever returns it is a derived
  // layer on its own URL prefix, not a Docusaurus locale.
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
        },
        // blog: {
        //   showReadingTime: true,
        //   feedOptions: {
        //     type: ['rss', 'atom'],
        //     xslt: true,
        //   },
        //   // Please change this to your repo.
        //   // Remove this to remove the "edit this page" links.
        //   editUrl:
        //     'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        //   // Useful options to enforce blogging best practices
        //   onInlineTags: 'warn',
        //   onInlineAuthors: 'warn',
        //   onUntruncatedBlogPosts: 'warn',
        // },
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
        id: 'education',
        path: 'education',
        routeBasePath: 'education',
        sidebarPath: './educationSidebars.ts',
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
        {
          to: '/docs/getting-started/what-is-dartway',
          position: 'right',
          label: 'Documentation',
        },
        {
          to: '/education/competency-map',
          position: 'right',
          label: 'Education',
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
            { label: 'Telegram (ENG)', href: 'https://t.me/dartway_dev' },
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
