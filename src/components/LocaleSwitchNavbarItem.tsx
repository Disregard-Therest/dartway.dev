import { useLocation } from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { isTranslated, RU_PREFIX, stripLocale } from '@site/src/localeRoutes';
import clsx from 'clsx';
import { JSX } from 'react';

/**
 * The language switch in the navbar.
 *
 * Written here rather than using the theme's `localeDropdown`, which builds the
 * other locale's URL by string substitution and assumes the result exists. It
 * does not: the framework documentation is English-only by design (STRATEGY.md),
 * so `/docs/x` has no `/ru/docs/x` to switch to. The theme item would offer one
 * anyway and land the reader on a 404.
 *
 * With exactly two locales a dropdown is also the wrong control — this is a
 * single link showing the language you are not reading.
 */

/**
 * Plain path arithmetic rather than the theme's `useAlternatePageUtils`, which
 * lives behind `/internal` and is not covered by semver.
 */
function switchTarget(currentLocale: string, pathname: string) {
  const bare = stripLocale(pathname, currentLocale);

  if (currentLocale === 'ru') {
    // Russian is a subset of English: everything under /ru has an original.
    return { locale: 'en', label: 'English', href: bare };
  }

  return {
    locale: 'ru',
    label: 'Русский',
    // Untranslated pages send the reader to the Russian home rather than to a
    // URL that was never built.
    href: isTranslated(bare) ? `${RU_PREFIX}${bare}` : `${RU_PREFIX}/`,
  };
}

type Props = {
  readonly mobile?: boolean;
  readonly className?: string;
};

export default function LocaleSwitchNavbarItem({ mobile, className }: Props): JSX.Element {
  const {
    i18n: { currentLocale },
  } = useDocusaurusContext();
  const { pathname } = useLocation();

  const target = switchTarget(currentLocale, pathname);

  return (
    // A plain anchor, not <Link>: the router only knows the routes of the
    // locale it was built for, so a client-side navigation across the boundary
    // resolves to nothing. This has to be a full page load.
    <a
      className={clsx(mobile ? 'menu__link' : 'navbar__item navbar__link', className)}
      href={target.href}
      hrefLang={target.locale}
      lang={target.locale}
    >
      {target.label}
    </a>
  );
}
