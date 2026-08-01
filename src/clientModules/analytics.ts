/**
 * Sends pageviews and CTA clicks to the counter in analytics/.
 *
 * Inert unless ANALYTICS_ENDPOINT was set at build time, so it is safe to ship
 * before the worker exists. No cookies and no identifiers — see
 * analytics/README.md for what that does and does not buy.
 *
 * A plain <script> tag would count the first page and nothing after it: once
 * Docusaurus has hydrated, navigation is client-side and never reloads the
 * document. Hence a client module, which gets told about route changes.
 */

import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import siteConfig from '@generated/docusaurus.config';

type Location = { pathname: string; search: string; hash: string };

const ENDPOINT = (siteConfig.customFields?.analyticsEndpoint as string | undefined) ?? '';

const enabled = ExecutionEnvironment.canUseDOM && ENDPOINT !== '';

function send(kind: string, path: string): void {
  if (!enabled) return;

  const body = JSON.stringify({ kind, path, referrer: document.referrer || undefined });

  // text/plain keeps this a "simple" request, so there is no preflight to fail.
  // sendBeacon survives the page being closed mid-flight; fetch is the fallback
  // for browsers that refuse the beacon (it returns false when it declines).
  const blob = new Blob([body], { type: 'text/plain;charset=UTF-8' });

  if (!navigator.sendBeacon?.(`${ENDPOINT}/e`, blob)) {
    void fetch(`${ENDPOINT}/e`, {
      method: 'POST',
      body,
      keepalive: true,
      headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
    }).catch(() => {
      // A counter must never be the reason a page misbehaves.
    });
  }
}

if (enabled) {
  send('pageview', window.location.pathname);

  // Delegated, so it covers links rendered after this runs.
  document.addEventListener(
    'click',
    (event) => {
      const target = (event.target as HTMLElement | null)?.closest?.('[data-cta]');
      const name = target?.getAttribute('data-cta');
      if (name) send(`cta:${name}`, window.location.pathname);
    },
    { capture: true },
  );
}

export function onRouteDidUpdate({
  location,
  previousLocation,
}: {
  location: Location;
  previousLocation: Location | null;
}): void {
  // previousLocation is null on the first render, which the module body already
  // counted. Only a real navigation gets here — and only one that changed the
  // path, so opening an anchor on the same page is not a second view.
  if (previousLocation && location.pathname !== previousLocation.pathname) {
    send('pageview', location.pathname);
  }
}
