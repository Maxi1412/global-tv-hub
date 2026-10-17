# Global TV Hub changelog

## v0.3 — 2026-10-17
- Add Sky Sport 1 HD, Sky Sport 2 HD, Sky Sport F1 HD and Sky Sport Premier League (Germany), plus Sky Sports UK Main Event/F1/Premier League and Eurosport German/Spanish channel launchers.
- Add more sports-provider discovery cards. Only authorised official sites are linked for subscription channels; no fabricated free feeds.
- Add a stream-manifest-based video quality dropdown: Auto by default, plus actual resolutions when a compatible HLS manifest loads.
- Preserve exact original three high-resolution approved design PNGs, and add same-resolution WebP reference alternatives for efficient browsing.
- Expand smoke tests for sport-provider entries and quality UI.
- Clarify that real browser screenshot automation and Spain live playback are not verified in this environment.

# Changelog

## v0.2 — 17 October 2026
- Added official live pages for phoenix, ONE and KiKA (no unverified direct streams).
- Added free ARD Sportschau and ZDF Sport to the Sports hub.
- Kept Settings reachable on mobile using an accessible toolbar button.
- Improved loading robustness with schema checks for saved favourites/history/custom channels.
- Fixed player cleanup on search, clearing history refresh and retriable HLS engine loading.
- Replaced stale cache-first service-worker strategy with network-first same-origin resources and offline fallback.
- Added GitHub Pages publishing marker, push/PR continuous smoke-test workflow and QA report.

## v0.1 — 17 October 2026
- Initial frontend prototype based on three approved visual concepts.
- Seven routes, channels, six HLS candidates, official provider links, local favourites, local M3U import, basic offline app shell and PWA manifest.


## v0.4 — In-app playback first
- Stop external redirects on channel/sports cards; add no-source state and source connector.
- Add ARD international HD, DW English/Spanish, NDR worldwide and other publicly listed German feeds (not Spain-tested).
- Add automatic retry across configured stream candidates with playback-status messages and quality selection.
- Bundle two CDN entry points for HLS player load resilience.
- Keep IPTV subscription credentials/user stream URLs out of GitHub by storing local source overrides.

## v0.5 · 2026-10-17 — Sports catalogue, access tiers and playback resilience

- Added Sky Sport Bundesliga, Mix and Top Event (Germany), Sky Sports Football, Tennis and Cricket (UK), DAZN F1 Spain and a SPORT1 free-TV listing. Paid entries intentionally have no false free direct HLS URLs.
- Added Red Bull TV, UEFA.tv, ServusTV On and RTL selected F1 free event research to Sports Hub, explicitly noting territory and provider restrictions.
- New Sports Hub filter tabs for `Free selection` and `Subscription` plus visible sport badges.
- In-app stream diagnostics: latest outcome, timestamp and source label, stored only on device with clear option.
- Better HLS fallback lifecycle: reset stall watchdog on new time updates; attempt one local media recovery when HLS reports a fatal decode error.
- Clearer labels distinguish unverified public in-app stream candidates from guaranteed playback.
- Desktop and mobile UI smoke-tested in headless Chromium using static inline assets; stream access not tested.

- Included FIFA+ on DAZN under the free football sports options, following the official May/June 2026 migration.