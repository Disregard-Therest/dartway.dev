-- dartway.dev page counter.
--
-- One row per event. No cookies, no IP addresses, no identifier of any kind —
-- which is why there is no visitors table and no session column. Country comes
-- from Cloudflare's edge and is as fine-grained as this gets.

CREATE TABLE IF NOT EXISTS events (
  id       INTEGER PRIMARY KEY AUTOINCREMENT,
  ts       INTEGER NOT NULL,          -- unix seconds
  kind     TEXT    NOT NULL,          -- 'pageview', or the CTA name
  path     TEXT    NOT NULL,
  referrer TEXT,                      -- host only, never the full URL
  country  TEXT                       -- ISO 3166-1 alpha-2, from request.cf
);

-- Every /stats query filters on ts first, then groups.
CREATE INDEX IF NOT EXISTS idx_events_ts ON events (ts);
CREATE INDEX IF NOT EXISTS idx_events_kind_ts ON events (kind, ts);
