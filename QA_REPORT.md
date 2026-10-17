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
