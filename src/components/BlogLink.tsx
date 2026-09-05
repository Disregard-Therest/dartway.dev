import Link from '@docusaurus/Link';
import { translate } from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { JSX, ReactNode } from 'react';

/**
 * A link into the blog.
 *
 * Same shape as DocsLink and for the same reason: the blog is built only under
 * the default locale — see src/localeRoutes.ts — so from /ru it is a URL on the
 * same domain rather than a route, and it has to be an ordinary anchor.
 * `<Link>` would either fail the broken-link check or hand the path to a router
 * that has no such route in the Russian bundle.
 *
 * Two components rather than one generic English-only link: each carries its
 * own entry path and its own translated label, and a shared abstraction over
 * two of them would be longer than both.
 */

const BLOG_ENTRY = '/blog';

type Props = {
  readonly className?: string;
  readonly children?: ReactNode;
  readonly 'data-cta'?: string;
};

export default function BlogLink({ className, children, ...rest }: Props): JSX.Element {
  const {
    i18n: { currentLocale, defaultLocale },
  } = useDocusaurusContext();
  const isRoute = currentLocale === defaultLocale;

  const label =
    children ??
    translate({
      id: 'navbar.blog',
      description: 'Navbar link to the blog',
      message: 'Blog',
    });

  if (isRoute) {
    return (
      <Link className={className} to={BLOG_ENTRY} {...rest}>
        {label}
      </Link>
    );
  }

  return (
    <a className={className} href={BLOG_ENTRY} hrefLang={defaultLocale} {...rest}>
      {label}
    </a>
  );
}

/**
 * The navbar wrapper: same link, plus the classes the theme expects.
 *
 * The mobile sidebar renders its items straight into a `<ul>` and supplies no
 * wrapper, so each item owns its `<li>` — the theme's own items do, and without
 * one this anchor was a direct child of the list.
 */
export function BlogNavbarItem({ mobile }: { readonly mobile?: boolean }): JSX.Element {
  if (mobile) {
    return (
      <li className="menu__list-item">
        <BlogLink className="menu__link" />
      </li>
    );
  }
  return <BlogLink className="navbar__item navbar__link" />;
}
