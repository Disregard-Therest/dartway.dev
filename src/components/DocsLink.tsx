import Link from '@docusaurus/Link';
import { translate } from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { JSX, ReactNode } from 'react';

/**
 * A link into the framework documentation.
 *
 * The documentation is built only under the default locale — see
 * src/localeRoutes.ts — so from /ru it is not a route but a URL on the same
 * domain, and it has to be an ordinary anchor: `<Link>` would either fail the
 * broken-link check or hand the path to the router, which has no such route in
 * the Russian bundle and would render the 404.
 *
 * The theme's own navbar item cannot express this. `href` gets the locale's
 * baseUrl prepended (`/docs/…` becomes `/ru/docs/…`), and the `pathname://`
 * escape hatch only suppresses the routing, not the prefix — Docusaurus does
 * that on purpose, see the comment in core/lib/client/exports/Link.js.
 */

const DOCS_ENTRY = '/docs/getting-started/what-is-dartway';

export function useDocsEntry(): { href: string; isRoute: boolean } {
  const {
    i18n: { currentLocale, defaultLocale },
  } = useDocusaurusContext();
  return { href: DOCS_ENTRY, isRoute: currentLocale === defaultLocale };
}

type Props = {
  readonly className?: string;
  readonly children?: ReactNode;
  readonly 'data-cta'?: string;
};

export default function DocsLink({ className, children, ...rest }: Props): JSX.Element {
  const { href, isRoute } = useDocsEntry();
  const {
    i18n: { defaultLocale },
  } = useDocusaurusContext();

  const label =
    children ??
    translate({
      id: 'navbar.documentation',
      description: 'Navbar link to the framework documentation',
      message: 'Documentation',
    });

  if (isRoute) {
    return (
      <Link className={className} to={href} {...rest}>
        {label}
      </Link>
    );
  }

  return (
    <a className={className} href={href} hrefLang={defaultLocale} {...rest}>
      {label}
    </a>
  );
}

/** The navbar wrapper: same link, plus the classes the theme expects. */
export function DocsNavbarItem({ mobile }: { readonly mobile?: boolean }): JSX.Element {
  return <DocsLink className={mobile ? 'menu__link' : 'navbar__item navbar__link'} />;
}
