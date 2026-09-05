import { useLocation } from '@docusaurus/router';
import { translate } from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { isTranslated, RU_PREFIX, stripLocale } from '@site/src/localeRoutes';
import clsx from 'clsx';
import { JSX, useState } from 'react';

/**
 * The language switch in the navbar.
 *
 * Written here rather than using the theme's `localeDropdown`, which builds the
 * other locale's URL by string substitution and assumes the result exists. It
 * does not: the framework documentation and the blog are English-only by design
 * (STRATEGY.md), so `/docs/x` has no `/ru/docs/x` to switch to. The theme item
 * would offer one anyway and land the reader on a 404.
 *
 * **It shows the language you are reading, not the one you are not.** It used to
 * be a single link labelled with the other locale's endonym, which put the bare
 * word "Русский" in an English navbar — indistinguishable from a section called
 * Русский. The endonyms still name the options, because a language is named in
 * its own tongue wherever it is offered; they are just inside the menu now,
 * where that reads as a choice rather than as navigation.
 */

type Option = {
  readonly locale: string;
  /** The language named in its own tongue. */
  readonly label: string;
  /** What the trigger shows: short, and the same width in both locales. */
  readonly code: string;
  readonly href: string;
  readonly current: boolean;
};

/**
 * Plain path arithmetic rather than the theme's `useAlternatePageUtils`, which
 * lives behind `/internal` and is not covered by semver.
 */
function options(currentLocale: string, pathname: string): Option[] {
  const bare = stripLocale(pathname, currentLocale);

  return [
    {
      locale: 'en',
      label: 'English',
      code: 'EN',
      // Russian is a subset of English: everything under /ru has an original.
      href: bare,
      current: currentLocale === 'en',
    },
    {
      locale: 'ru',
      label: 'Русский',
      code: 'RU',
      // Untranslated pages send the reader to the Russian home rather than to a
      // URL that was never built.
      href: isTranslated(bare) ? `${RU_PREFIX}${bare}` : `${RU_PREFIX}/`,
      current: currentLocale === 'ru',
    },
  ];
}

/**
 * A plain anchor, not `<Link>`: the router only knows the routes of the locale
 * it was built for, so a client-side navigation across the boundary resolves to
 * nothing. This has to be a full page load.
 */
function LocaleAnchor({ option, className }: { readonly option: Option; readonly className: string }) {
  return (
    <a
      className={clsx(className, option.current && `${className}--active`)}
      href={option.href}
      hrefLang={option.locale}
      lang={option.locale}
      aria-current={option.current ? 'true' : undefined}
    >
      {option.label}
    </a>
  );
}

type Props = {
  readonly mobile?: boolean;
  readonly className?: string;
};

function LocaleMobileItem({
  label,
  current,
  items,
}: {
  readonly label: string;
  readonly current: Option;
  readonly items: readonly Option[];
}): JSX.Element {
  const [expanded, setExpanded] = useState(false);

  return (
    <li className={clsx('menu__list-item', !expanded && 'menu__list-item--collapsed')}>
      <button
        type="button"
        className="menu__link menu__link--sublist navbar__language-sublist"
        aria-expanded={expanded}
        onClick={() => setExpanded((value) => !value)}
      >
        {label}: {current.code}
      </button>
      {expanded && (
        <ul className="menu__list">
          {items.map((item) => (
            <li className="menu__list-item" key={item.locale}>
              <LocaleAnchor option={item} className="menu__link" />
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

export default function LocaleSwitchNavbarItem({ mobile, className }: Props): JSX.Element {
  const {
    i18n: { currentLocale },
  } = useDocusaurusContext();
  const { pathname } = useLocation();

  const items = options(currentLocale, pathname);
  const current = items.find((item) => item.current) ?? items[0];

  const label = translate({
    id: 'navbar.language',
    description: 'Label of the navbar language selector, shown before the current language code',
    message: 'Language',
  });

  // The drawer has no hover, so it gets the theme's own collapsible instead —
  // the same control the theme's dropdowns use there, closed until tapped.
  // Listing both languages flat, as this did first, read as two more sections
  // of the site rather than as one choice.
  if (mobile) {
    return <LocaleMobileItem label={label} current={current} items={items} />;
  }

  return (
    <div className={clsx('navbar__item', 'dropdown', 'dropdown--hoverable', 'dropdown--right', className)}>
      <button
        type="button"
        className="navbar__link navbar__language-trigger"
        aria-haspopup="true"
        aria-label={`${label}: ${current.label}`}
      >
        {label}: {current.code}
      </button>
      <ul className="dropdown__menu">
        {items.map((item) => (
          <li key={item.locale}>
            <LocaleAnchor option={item} className="dropdown__link" />
          </li>
        ))}
      </ul>
    </div>
  );
}
