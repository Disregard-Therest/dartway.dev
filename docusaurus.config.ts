import type * as Preset from '@docusaurus/preset-classic';
import type { Config } from '@docusaurus/types';
import { themes as prismThemes } from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'DartWay Product Studio',
  tagline: 'Mobile, web, and Telegram apps built on a pre-built engineering foundation',
  favicon: 'favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  url: 'https://dartway.dev',
  baseUrl: '/', //process.env.BASE_URL || '/dartway.dev/',
  organizationName: 'Disregard-Therest',
  projectName: 'dartway.dev',

  // // Set the production url of your site here
  // url: 'https://your-docusaurus-site.example.com',
  // // Set the /<baseUrl>/ pathname under which your site is served
  // // For GitHub pages deployment, it is often '/<projectName>/'
  // baseUrl: '/',

  // // GitHub pages deployment config.
  // // If you aren't using GitHub pages, you don't need these.
  // organizationName: 'facebook', // Usually your GitHub org/user name.
  // projectName: 'docusaurus', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Added by me
  trailingSlash: false, // requested by GitHub Pages for better behaviour with addresses

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ru'],
    localeConfigs: {
      en: {
        label: 'English',
      },
      ru: {
        label: 'Русский',
      },
    },
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
          to: '/framework',
          position: 'right',
          label: 'Our Framework',
        },
        {
          to: '/education/competency-map',
          position: 'right',
          label: 'Education',
        },
        {
          href: 'https://t.me/eu_novikov',
          label: 'Discuss a project',
          position: 'right',
          className: 'navbarDiscussButton',
        },
        {
          type: 'localeDropdown',
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
