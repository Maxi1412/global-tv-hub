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
