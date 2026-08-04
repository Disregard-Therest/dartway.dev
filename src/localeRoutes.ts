/**
 * Which routes exist in which locale.
 *
 * English is the source language and sits at the root; Russian is a subset at
 * /ru. The framework documentation is generated from the monorepo and published
 * in English only — see STRATEGY.md — so `/docs/*` has no Russian counterpart.
 *
 * Two places need to know that and must not learn it separately: the navbar
 * language switch, and the hreflang tags in src/theme/SiteMetadata. A page
 * advertising a translation that was never built is a Search Console error on
 * every doc page.
 *
 * Assumes `baseUrl: '/'`.
 */

export const RU_PREFIX = '/ru';

/** Route prefixes built only under the default locale. */
const DEFAULT_LOCALE_ONLY = ['/docs'];

/** The path with its locale prefix removed — i.e. the English URL of a page. */
export function stripLocale(pathname: string, currentLocale: string): string {
  if (currentLocale !== 'ru') return pathname;
  return pathname.slice(RU_PREFIX.length) || '/';
}

/** Whether a locale-stripped path is published in every locale. */
export function isTranslated(barePath: string): boolean {
  return !DEFAULT_LOCALE_ONLY.some(
    (prefix) => barePath === prefix || barePath.startsWith(`${prefix}/`),
  );
}
