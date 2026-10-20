## v0.8.0 Spain browser playback pass (18 October 2026)

### Environment and scope

- Exact live baseline tested first: `https://maxi1412.github.io/global-tv-hub/` at `16ef64bac6a4ca556c7d1868b2689d934a479c83`.
- Test machine network exit independently returned country code `ES`.
- Browser: Chrome on Windows through Playwright; every configured HLS channel was selected in the live PWA, media state was inspected and a player-frame screenshot was captured.
- Samples were approximately 9–18 seconds. “Moving video” means non-zero dimensions, advancing `currentTime`, no final media error, and a visually inspected frame. It does not establish long-run stability, audible sound, future uptime or rights clearance.
- The three approved design-reference PNGs were inspected and remain unmodified.

### Baseline defect reproduced

Chromium reported native HLS support as `maybe`, so v0.7.1 bypassed HLS.js. DW Español, NDR International, tagesschau24, hr, ALEX Berlin and Teledeporte briefly fired `playing`, then stopped at 0:00 with `DEMUXER_ERROR_COULD_NOT_PARSE`; the app incorrectly retained “Video signal connected.” Motorvision also failed in the built-in route despite a valid manifest.

Forcing the exact same seven URLs through HLS.js produced advancing, visually confirmed video. v0.8 therefore prefers HLS.js whenever supported, falls back to native HLS only when necessary, and waits for at least 1.5 seconds of advancing decoded video before storing success. Later video errors now trigger fallback instead of being ignored after the first `playing` event.

### v0.8 local-build regression result

- All 21 retained HLS channels reached `Playback confirmed` in the repaired app with advancing video and non-zero decoded dimensions.
- Hamburg 1's official YouTube live embed played inside the existing dashboard at 854×480; the obsolete HLS endpoint was removed.
- ARD and hr transported video but showed official programme-rights slates during the visual sample. They are classified as `programme-blackout`, not viewable programming.
- ZDF, 3sat, ZDFinfo and ZDFneo returned 403/ORB from Spain. ZDF's own help states its 24/7 channel streams are Germany-only. Their automatic sources were removed.
- ARTE direct endpoints returned 403/ORB and the official ARTE embed explicitly reported that the current programme was unavailable in the country. Its unstable direct attempts were removed.
- DF1's former hostname no longer resolved. The current `live_stream` URL published by DF1's own site returned a CloudFront country-block message in Spain, so no replacement was presented as playable.
- Premium RTL+/Joyn/Sky/WOW/DAZN/Eurosport channels still have no licensed third-party playback integration in this static PWA. They remain unavailable in app rather than being backed by pirate feeds.

### Spain network-path audit after source cleanup

`AUDIT_REGION='Spain (ES) network, local machine; NOT visual playback' node tests/probe-sources.cjs`

- 25 public HLS URLs checked across 21 channels.
- 25 valid root manifests.
- 25 valid media-playlist paths and successful 32 KiB media-segment samples.
- Advertised maximum resolution was recorded separately from rendered browser resolution.
- The probe does not claim actual playback, sound, programme availability or rights; those claims require the browser evidence above.

### Deterministic QA

- `node --check app.js`, `data.js`, `sw.js`, and `tests/probe-sources.cjs`: PASS.
- `node tests/smoke.cjs`: PASS.
- Smoke coverage now includes HLS.js-first selection, advancing-video confirmation, Spain source metadata, the official Hamburg 1 embed, and the absence of retry controls for known blocked DF1/ZDF sources.
- Approved visual design remains intact; changes are limited to player behavior, factual source labels, the embedded video surface, and documentation.
- Responsive browser QA passed at 390×844 for the Guide with published source status visible and no console errors.
- Desktop 1440×900 QA confirmed the official Hamburg 1 player inside the existing dashboard frame.
- Offline reload returned the complete app shell from service-worker cache; live television correctly remains network-dependent.

See `SOURCES.md` for the channel-by-channel matrix. The next release gate is a clean commit, GitHub Actions, Pages deployment and re-test of the exact live v0.8 URL.

## v0.7.1 live-manifest audit (17 October 2026)
GitHub-hosted audit of 34 public HLS candidate endpoints: 25 returned a syntactically valid HLS manifest, 9 failed. This check occurred from a GitHub Actions runner, not a phone in Spain, and does NOT guarantee playable images or any broadcasting rights. Failure examples: Motorvision's Rakuten fallback returned HTTP 400 and is removed; DF1 and Hamburg1 had network/region errors; ZDF, ZDFinfo, ZDFneo, 3sat and ARTE returned HTTP 403 from the US test runner, consistent with possible geographic restrictions. Do not assume these streams have failed in Spain without on-device testing.

Fixes: Mobile Live TV now shows channels immediately beneath playback instead of the nonfunctional programme placeholder list. A Direct feeds filter makes it easy to find channel entries with configured sources. The Programme Guide remains available as a separate tab. The remaining raw HLS candidates require Spanish playback testing; no paid channel is represented as a free working feed.

GitHub Actions audit: https://github.com/Maxi1412/global-tv-hub/actions/runs/39066994621

# QA update — Global TV Hub v0.3, 17 October 2026

- `node --check` for all JavaScript: PASS.
- `node tests/smoke.cjs`: PASS, 28 channel entries, six unverified HLS candidates, new official Sky/Eurosport entries and manifest-based quality menu.
- Chromium automation attempted through local HTTP and file URL. Both failed before page load with `ERR_BLOCKED_BY_ADMINISTRATOR` in this execution environment. **No browser visual test or device playback is claimed.**
- Sky Deutschland confirms Sky Sport 1 HD, 2 HD and F1 HD exist, subscription required.
- NOW UK confirms Sky Sports services and that Full HD depends on plan/device; access from Spain is not verified and may be refused.
- Official F1 rights for Spain through 2030: DAZN/F1 joint announcement, September 8, 2026.
- HLS source URLs are old candidates, not verified broadcasting rights, resolution or real-time operation. No fictitious live indicators or EPG fixtures.
- Remaining: actual browser QA, GitHub Pages deployment verification, Spain playback checks, HD bitrate/manifest resolution auditing, supported EPG source, licences for embedded pay TV.

# Global TV Hub — QA and improvement report

**Build:** v0.2 | **Date:** 2026-10-17 | **Status:** functional source-code prototype; deployment / broadcast access pending

## Confirmed locally
- `node --check app.js`, `data.js`, `sw.js` — PASS.
- `node tests/smoke.cjs` — PASS: 19 stations, six direct HLS **candidates**, unique catalogue IDs, 7 navigation routes, direct-player vs official-link differentiation, News and football filters, free Sportschau link, search transition, Settings button, external URL sanity and first-party-only cache behaviour.
- Verified linked artwork assets exist in the project.
- `.nojekyll` and dependency-free GitHub Actions test workflow added for repository-based QA.
- Original three user-approved design images remain unmodified under `design-reference/`.

## Bugs corrected in the QA improvement loop
1. Settings not reachable from mobile navigation: add Settings button in mobile topbar.
2. Search from Live TV did not stop playback: stop active media before replacing player view.
3. Clear-history command left current UI unchanged: render after clearing.
4. Failed network fetch of HLS.js could prevent retries: reset cached promise on failure.
5. Corrupt/non-array localStorage values could break app startup: validate saved collections.
6. Cache-first service worker could pin outdated UI after GitHub commits: network-first same-origin resources with offline fallback.

## External sources added or corrected
- ARD Das Erste live: https://www.ardmediathek.de/LIVE
- tagesschau24: https://www.ardmediathek.de/tagesschau24/live/Y3JpZDovL2Rhc2Vyc3RlLmRlL3RhZ2Vzc2NoYXUvbGl2ZXN0cmVhbQ
- phoenix: https://www.ardmediathek.de/live/phoenix/Y3JpZDovL3dkci5kZS9CZWl0cmFnLTE3YTg4ZDdmLWI5NTAtNDcyNy05M2E0LWE3NzI3YjkxNjVkZQ
- ONE: https://www.ardmediathek.de/live/one/Y3JpZDovL3dkci5kZS9CZWl0cmFnLTkxOWU4MzNlLWYxYTktNDdmYi1iNmYwLTNmMTllNjVkMDBkMQ
- KiKA: https://www.ardmediathek.de/live/kika/Y3JpZDovL2tpa2EuZGUvTGl2ZXN0cmVhbS1LaUth
- ARD Sportschau: https://www.ardmediathek.de/sport
- ZDF: https://www.zdf.de/live-tv

These are **official viewing pages verified via public search**, not proof that video works embedded or from Spain. No new unlicensed HLS URLs were added.

## Unverified / next QA gates
- Visual screenshots and responsive layout across real phone/tablet/desktop: Chromium headless in this runtime timed out. No visual pass claim.
- Browser PWA install, offline reload and update behaviour in a real HTTPS deployment: not yet validated.
- Real HLS playback, CORS/DRM, regional rights and performance from user's actual connection in Spain: not validated.
- Official broadcaster pages' account requirements and paywalls can change without notice.
- No live match schedule, EPG, account sync or server persistence has been connected yet.
- `Maxi1412/global-tv-hub` repository must be created and GitHub Pages configured; no URL is live as part of this report.


## v0.4 playback regression checks

- Node smoke tests: routes, channel selection, no outgoing channel-watch buttons, per-channel source form, sports in-app navigation, quality picker, source catalog and cache.
- PWA cannot confirm actual CDN video playback from the container: outgoing HTTP/DNS are unavailable.
- Free streams can still be blocked by a browser's CORS policy, carrier filters, broadcast rights, or disconnected origin. User network QA is necessary.

## v0.5 QA (17 October 2026)

- `node --check app.js`, `node --check data.js`, `node --check sw.js`: pass.
- `node tests/smoke.cjs`: pass; covers sports free/subscription filters, channel mapping, app navigation, private HLS setup, diagnostics and source transparency.
- Headless Chromium: desktop 1440x900 and mobile 390x844 smoke tests passed by exercising Sports filters, Sky F1 source handling and Live TV routes. Screenshot output inspected. Browser test used an inlined static shell because local network/file navigation was administratively blocked.
- Limitations: No live HLS feed was verified in the user's Spain browser; no provider DRM license, streaming subscription or international rights were acquired; public HLS candidates remain unverified.
