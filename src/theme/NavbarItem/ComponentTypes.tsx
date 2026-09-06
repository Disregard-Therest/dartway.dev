import { DocsNavbarItem } from '@site/src/components/DocsLink';
import LocaleSwitchNavbarItem from '@site/src/components/LocaleSwitchNavbarItem';
import ComponentTypes from '@theme-original/NavbarItem/ComponentTypes';

/**
 * Registers the two navbar items written here. This is the only supported way
 * to add a navbar item type; everything else in this table is the theme's own,
 * untouched. Both exist because the theme's items assume every page exists in
 * every locale — see each component for what that breaks.
 */
export default {
  ...ComponentTypes,
  'custom-docsLink': DocsNavbarItem,
  'custom-localeSwitch': LocaleSwitchNavbarItem,
};
