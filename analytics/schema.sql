-- DartWay page counter.
--
-- One row per event. No cookies, no IP addresses, no identifier of any kind —
-- which is why there is no visitors table and no session column. Country comes
-- from Cloudflare's edge and is as fine-grained as this gets.
--
-- One database serves every DartWay site, told apart by `site`. One deployment,
-- one token, one schema, and both sites comparable in a single query.

CREATE TABLE IF NOT EXISTS events (
  id       INTEGER PRIMARY KEY AUTOINCREMENT,
  ts       INTEGER NOT NULL,          -- unix seconds
  site     TEXT    NOT NULL,          -- 'dartway.dev', 'dartway.studio', …
  kind     TEXT    NOT NULL,          -- 'pageview', or 'cta:<name>'
  path     TEXT    NOT NULL,
  referrer TEXT,                      -- host only, never the full URL
  country  TEXT                       -- ISO 3166-1 alpha-2, from request.cf
);

-- Every /stats query filters on ts first, optionally narrows to one site, then
-- groups.
CREATE INDEX IF NOT EXISTS idx_events_ts ON events (ts);
CREATE INDEX IF NOT EXISTS idx_events_site_ts ON events (site, ts);
CREATE INDEX IF NOT EXISTS idx_events_kind_ts ON events (kind, ts);
