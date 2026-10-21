# Global TV Hub changelog

## v0.14.0 — 2026-10-21

- Correct the central audit flaw: decoded, advancing media is now labelled `Signal decoded`, not `Working now` or `Playback confirmed`.
- Add a second, visible-content audit that captures two real video frames per configured HLS channel for human review instead of inferring programme availability from decoder counters.
- Re-audit all 21 HLS channels from Spain. Twenty showed real moving programme pictures; both official Das Erste feeds showed ARD's legal-rights slate at 1920×1080 and are now published as a programme blackout.
- Re-test ProSieben and SAT.1 in Joyn's own consumer player from Spain. ProSieben returned `CODE: GEO_BLOCKED`; SAT.1 produced no video and its entitlement request returned HTTP 400.
- Verify that Joyn sends `frame-ancestors 'self' https://*.joyn.de ...` and ZDF sends `X-Frame-Options: SAMEORIGIN`, so neither consumer player can be embedded on the GitHub Pages origin.
- Rename the automated full-catalogue outcomes to transport confirmation, preserve 33 honest unavailable states, and add `tests/browser-visual-content-audit.js` as the visible-frame gate.
- Refresh the offline shell to v14 without changing the approved dark dashboard, favourites, custom streams, guide, logos or local source connections.

## v0.13.0 — 2026-10-21

- Fix the installed-PWA/direct-`#live` state that could remain indefinitely on “Preparing in-app source”; show an explicit ready/Play state instead.
- Replace the ambiguous “22 in-app sources” display with the exact capability count: 55 listed, 21 HLS players and one official embedded player.
- Separate dated Spain audit results from current-device results throughout channel tiles, the channel list, player status and channel details.
- Add `tests/browser-full-playback-audit.js`, which opens every one of the 55 channel entries through the actual UI and records startup, decoded resolution, ready/paused state, buffer, advancing time, audio-decoder bytes, embedded-video progress, unavailable-state correctness and browser errors.
- Reconfirm all 21 HLS channels and the Hamburg 1 embedded player through Android Chrome emulation on an ES network; retain 33 honest unavailable states with no false retry control.
- Publish exact observed quality: 16 HLS channels at 1080p, four at 720p, QVC at 540p and Hamburg 1 at 480p.
- Grey unavailable-channel dots and blue configured-player dots make capability clearer without changing the approved dashboard structure.
- Refresh the offline shell to v13 while preserving favourites, custom streams, guide data and playback diagnostics.

## v0.12.0 — Now, next and next-day programme guide

- Add a selected-channel programme panel directly below the existing player without redesigning the approved dark dashboard.
- Show the real current programme, progress, programme description, upcoming programmes and Today/Tomorrow/day-after navigation in local time.
- Replace the placeholder Guide route with real now/next listings and channel-category filters.
- Map all 55 fixed catalogue channels to exact XMLTV IDs where available; 54 currently have programme data and Terra Mater WILD remains explicitly unmatched rather than borrowing another schedule.
- Add `scripts/update-epg.cjs`, a compact compressed same-origin `epg.json.gz`, and a twice-daily credential-free GitHub Actions refresh.
- Keep schedules separate from playback rights: premium/blocked channels can have listings without being labelled playable.
- Bump the visible app release and offline shell cache to v0.12/v12 while preserving favourites, custom streams, playback sources and local diagnostics.

## v0.11.0 — Real channel logos throughout the PWA

- Replace generated text wordmarks with locally stored broadcaster/channel logos for every one of the 55 fixed catalogue channels.
- Show the same channel identity in Home/Search/Favourites cards, the Live TV channel list and both Guide views.
- Keep a text fallback for user-added custom streams and for any image that fails to decode.
- Add all logo assets to offline shell cache v11 so installed PWAs do not depend on third-party image hosts after installation.
- Preserve the approved dark dashboard, playback rules, source statuses, favourites and custom streams.
- Add deterministic coverage that fails if any fixed channel is missing its local logo asset.

## v0.10.0 — Sports playback rules and expanded discovery

- Fix non-playable sports cards forcing the page downward into the same repeated explanation.
- Apply one visual and behavioral rule to all sports cards: verified direct channels play inside the PWA; provider-controlled services show exact access details without redirecting or claiming playback.
- Publish the verified ceiling on every direct sports card: four 1080p channels and Teledeporte at 720p.
- Add dedicated basketball, ice hockey, golf, cricket, rugby, handball, American football and athletics filters with legitimate official services.
- Add repeatable browser audits for all sports cards, five sports streams, the remaining 16 HLS channels and mobile overflow.
- Bump the visible release and offline shell cache to v0.10/v10 while preserving the approved dark dashboard.

## v0.9.0 — Full-HD-first playback and current platform audit

- Re-test every catalogue channel and every retained HLS path from Spain, including decoded resolution, advancing time, errors and visually inspected station/programme frames.
- Prefer the highest stable HLS rendition up to 1080p instead of allowing the compact player size to hold an available Full HD feed at 360p/540p.
- Cap ALEX Berlin at its stable 720p rendition because its advertised 1080p path repeatedly stalled; retain Auto for bandwidth-sensitive playback.
- Publish the current quality matrix: 16 HLS channels at 1080p, four at 720p, QVC at 540p and Hamburg 1's official embed at 480p.
- Refresh lawful-source research for Joyn, Zattoo, ARD/ZDF, FIFA+ on DAZN, UEFA.tv, SPORT1, Sportschau, Formula 1, Sky/WOW/NOW and premium integrations.
- Recheck official phoenix, ONE, MDR, rbb, SWR and Radio Bremen streams individually; all remained 403-blocked from Spain and were not added.
- Keep the approved dark interface intact, bump the offline shell to v9, strengthen smoke tests and extend the network audit with Full HD counts.

## v0.8.0 — Spain browser playback and honest source health

- Test every configured HLS channel in the live GitHub Pages app from a confirmed ES network exit, with browser media state and screenshots separating moving video, decoder failure, rights slate, CORS/ORB block, DNS failure and timeout.
- Prefer HLS.js in Chromium even when `canPlayType()` reports native HLS as `maybe`; this restores moving playback for ALEX Berlin, DW Español, NDR International, tagesschau24, hr, Teledeporte and Motorvision.
- Require advancing `currentTime` and non-zero decoded dimensions before recording playback success. Fatal errors after an initial `playing` event now trigger failure/fallback instead of leaving a false connected status.
- Update the displayed rendered resolution when adaptive HLS changes level and seed adaptive bitrate selection for HD-preferred broadband playback. The quality selector still exposes manifest-advertised 720p/1080p options where available.
- Remove known non-working automatic attempts: obsolete DF1 and Hamburg 1 HLS URLs, and ZDF/3sat/ZDFinfo/ZDFneo/ARTE feeds that returned 403/ORB from Spain.
- Add Hamburg 1's official YouTube live embed inside the existing player; no redirect or manual URL is required.
- Publish channel-level Spain screening metadata in the catalogue and surface it separately from on-device diagnostics.
- Upgrade the network probe from manifest-only checks to manifest, media-playlist, advertised-resolution, CORS-header and 32 KiB segment-path sampling. The report states its execution region instead of always claiming GitHub Actions.
- Bump the offline shell cache to v8 and the visible release label to v0.8.0. Approved layout and design references remain unchanged.

## v0.7.1 — stream audit follow-up and mobile navigation
- GitHub CI probed 34 candidate HLS URLs: 25 returned valid manifests, 9 failed in the CI region (not a Spain playback test).
- Remove Motorvision Rakuten fallback returning HTTP 400.
- In mobile Live TV, remove redundant empty guide placeholders to reveal the channel list immediately; full Guide tab remains.
- Add 'Direct feeds' quick filter to channel list, excluding channels without configured streams.

## v0.7 — 17 October 2026: fixes from Spain playback screenshots
- Prioritize public broadcaster main feed before alternates. ARD now tries international HLS before domestic. Ignore historical last-working ARD source so saved blocked German stream cannot override international.
- Include viewer-controlled Try another feed and Programme blocked? controls while keeping player in-app.
- Correct the meaning of video 'playing': an HLS connection is not proof of viewable programming, especially on geoblocked channels.
- Remove generic football picture behind unrelated channels and show German public channels in the Channel Guide instead of first five sports stations.
- Add tagesschau24 and five further free German public/FAST stream candidates: ALEX Berlin, Dokusat, hr, BR Nord, Terra Mater WILD.
- Update tests and offline cache version. Actual Spanish device playback of new sources remains unverified.

## v0.6 — One-click free sports streaming
- Add six direct public HLS sports channels with multiple public-source fallbacks where available.
- Map six Sports Hub cards directly to the internal player; no source-entry prompt or external site redirect.
- Clarify unavailable Sky/DAZN premium channels and prevent misleading live-race claims.
- Bump offline PWA cache to v6 and extend smoke tests for stream-linked sports cards.
- Playback in Spain remains unverified; no authenticated or pirated Sky feeds included.

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

