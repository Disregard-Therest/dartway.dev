/**
 * Ejected from @docusaurus/theme-classic for exactly one change, marked inline
 * below: which locales a page advertises as alternates. Everything else is the
 * upstream file verbatim, so a Docusaurus upgrade that touches this component
 * needs the eject re-done and the marked block re-applied:
 *
 *   npx docusaurus swizzle @docusaurus/theme-classic SiteMetadata --eject --danger --typescript
 */
import React, {type ReactNode} from 'react';
import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {PageMetadata, useThemeConfig} from '@docusaurus/theme-common';
import {
  DEFAULT_SEARCH_TAG,
  useAlternatePageUtils,
} from '@docusaurus/theme-common/internal';
import {useLocation} from '@docusaurus/router';
import {applyTrailingSlash} from '@docusaurus/utils-common';
import {isTranslated, stripLocale} from '@site/src/localeRoutes';
import SearchMetadata from '@theme/SearchMetadata';

// TODO move to SiteMetadataDefaults or theme-common ?
// Useful for i18n/SEO
// See https://developers.google.com/search/docs/advanced/crawling/localized-versions
// See https://github.com/facebook/docusaurus/issues/3317
function AlternateLangHeaders(): ReactNode {
  const {
    i18n: {currentLocale, defaultLocale, localeConfigs},
  } = useDocusaurusContext();
  const alternatePageUtils = useAlternatePageUtils();
  const {pathname} = useLocation();

  const currentHtmlLang = localeConfigs[currentLocale]!.htmlLang;

  // ---- Local change, and the only reason this component is ejected. ----
  // Upstream advertises every configured locale for every page, because it
  // assumes each page is built in each. Ours are not: /docs/* is English-only
  // (see src/localeRoutes.ts), so the untouched version puts an hreflang="ru"
  // pointing at a URL that 404s on all twenty-odd documentation pages.
  //
  // On those pages the only alternates are the default locale and x-default,
  // which point at the page itself — the correct statement that no translation
  // exists.
  const alternateLocales = isTranslated(stripLocale(pathname, currentLocale))
    ? Object.entries(localeConfigs)
    : Object.entries(localeConfigs).filter(([locale]) => locale === defaultLocale);
  // ---- End local change. ----

  // HTML lang is a BCP 47 tag, but the Open Graph protocol requires
  // using underscores instead of dashes.
  // See https://ogp.me/#optional
  // See https://en.wikipedia.org/wiki/IETF_language_tag)
  const bcp47ToOpenGraphLocale = (code: string): string =>
    code.replace('-', '_');

  // Note: it is fine to use both "x-default" and "en" to target the same url
  // See https://www.searchviu.com/en/multiple-hreflang-tags-one-url/
  return (
    <Head>
      {alternateLocales.map(([locale, {htmlLang}]) => (
        <link
          key={locale}
          rel="alternate"
          href={alternatePageUtils.createUrl({
            locale,
            fullyQualified: true,
          })}
          hrefLang={htmlLang}
        />
      ))}
      <link
        rel="alternate"
        href={alternatePageUtils.createUrl({
          locale: defaultLocale,
          fullyQualified: true,
        })}
        hrefLang="x-default"
      />

      <meta
        property="og:locale"
        content={bcp47ToOpenGraphLocale(currentHtmlLang)}
      />
      {alternateLocales
        .map(([, config]) => config)
        .filter((config) => currentHtmlLang !== config.htmlLang)
        .map((config) => (
          <meta
            key={`meta-og-${config.htmlLang}`}
            property="og:locale:alternate"
            content={bcp47ToOpenGraphLocale(config.htmlLang)}
          />
        ))}
    </Head>
  );
}

// Default canonical url inferred from current page location pathname
function useDefaultCanonicalUrl() {
  const {
    siteConfig: {url: siteUrl, baseUrl, trailingSlash},
  } = useDocusaurusContext();

  // TODO using useLocation().pathname is not a super idea
  // See https://github.com/facebook/docusaurus/issues/9170
  const {pathname} = useLocation();

  const canonicalPathname = applyTrailingSlash(useBaseUrl(pathname), {
    trailingSlash,
    baseUrl,
  });

  return siteUrl + canonicalPathname;
}

// TODO move to SiteMetadataDefaults or theme-common ?
function CanonicalUrlHeaders({permalink}: {permalink?: string}) {
  const {
    siteConfig: {url: siteUrl},
  } = useDocusaurusContext();
  const defaultCanonicalUrl = useDefaultCanonicalUrl();

  const canonicalUrl = permalink
    ? `${siteUrl}${permalink}`
    : defaultCanonicalUrl;
  return (
    <Head>
      <meta property="og:url" content={canonicalUrl} />
      <link rel="canonical" href={canonicalUrl} />
    </Head>
  );
}

export default function SiteMetadata(): ReactNode {
  const {
    i18n: {currentLocale},
  } = useDocusaurusContext();

  // TODO maybe move these 2 themeConfig to siteConfig?
  // These seems useful for other themes as well
  const {metadata, image: defaultImage} = useThemeConfig();

  return (
    <>
      <Head>
        <meta name="twitter:card" content="summary_large_image" />
        {/* The keyboard focus class name need to be applied when SSR so links
        are outlined when JS is disabled */}
        <body />
      </Head>

      {defaultImage && <PageMetadata image={defaultImage} />}

      <CanonicalUrlHeaders />

      <AlternateLangHeaders />

      <SearchMetadata tag={DEFAULT_SEARCH_TAG} locale={currentLocale} />

      {/*
        It's important to have an additional <Head> element here, as it allows
        react-helmet to override default metadata values set in previous <Head>
        like "twitter:card". In same Head, the same meta would appear twice
        instead of overriding.
      */}
      <Head>
        {/* Yes, "metadatum" is the grammatically correct term */}
        {metadata.map((metadatum, i) => (
          <meta key={i} {...metadatum} />
        ))}
      </Head>
    </>
  );
}
