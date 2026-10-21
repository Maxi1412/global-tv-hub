# Global TV Hub — QA report

## v0.13.0 full channel playback and status audit (21 October 2026)

- Reproduced the reported installed/mobile failure on the exact v0.12 Pages app: loading `#live` directly left Das Erste on “Preparing in-app source” for more than 22 seconds with a 0×0 inactive video. Selecting Das Erste then produced 1920×1080 advancing playback in 3.03 seconds. Root cause: the initial hash route rendered the player but did not call the click-triggered playback path.
- v0.13 removes the false pending state. A direct `#live` load says `Ready · press Play to test this source on this device`; tapping a configured catalogue channel still initiates playback immediately.
- Corrected the header from the ambiguous `55 channels · 22 in-app sources` to `55 listed · 21 HLS + 1 official embed`.
- Full Android-Chrome-emulation audit opened all 55 channels through the actual Live TV UI on an ES network: 21 HLS playback confirmations, one official embed playback confirmation, 33 honest unavailable states, zero audit/UI failures and zero browser console/page errors.
- HLS proof required a successful app confirmation plus decoded dimensions, non-paused ready state, buffer and at least 2.5 seconds of advance during a separate 3.5-second stability sample. All 21 advanced approximately 3.5 seconds and exposed increasing audio-decoder bytes.
- Quality result: 16 HLS channels rendered 1920×1080; ALEX, hr, Teledeporte and tagesschau24 rendered 1280×720; QVC rendered 960×540. All five sports HLS channels passed: More Than Sports TV, Motorvision, World of Freesports and Red Bull TV at 1080p, Teledeporte at 720p.
- Observed HLS startup confirmations ranged from approximately 2.1 to 9.3 seconds in the full candidate pass. This is a short join-time sample, not an SLA.
- Hamburg 1 was not counted merely because its iframe loaded. The official YouTube frame's inner video advanced 3.52 seconds, reported 854×480, ready state 4, not paused and audio enabled.
- Every one of the 33 entries without a configured browser player exposed zero playback/retry controls and kept the HLS video inactive. This includes the ZDF family, ARTE/DF1/private German channels and protected Sky/Eurosport/DAZN/SPORT1 entries.
- A repeatable audit lives in `tests/browser-full-playback-audit.js`; deterministic syntax, smoke, QA and diff checks remain required before deployment.
- Network-path regression after the browser pass: 25/25 retained HLS URLs returned a root manifest, selected media playlist and capped segment sample from Elche, Spain; 20 advertised a 1080p rendition. This is supporting transport evidence, not a replacement for playback.
- Scope: these are short playback samples from the dated ES test window. They do not guarantee future CDN uptime, every ISP/device, long-run buffering performance or that a rights-restricted programme will remain viewable.

## v0.12.0 programme-guide audit (21 October 2026)

- XMLTV generation: 55/55 catalogue keys, 54 channels with exact real listings, 3,184 current/upcoming programme records in the compact rolling window and one explicit unmatched channel (Terra Mater WILD).
- The player view now renders programme data directly beneath the video; Today, Tomorrow and day-after controls update only the schedule panel and do not restart playback.
- The full Guide route shows now/next listings and category filters. Browser times are derived from ISO instants and shown in the viewer's local timezone.
- Premium, blocked and unavailable channel listings remain visually separate from playback capability; no guide record creates or unlocks a stream.
- The approved dark dashboard, existing playback sources, favourites, custom streams and local storage keys are preserved.
- `node --check` for app/data/service worker/EPG updater, `node tests/smoke.cjs`, `node tests/qa.cjs` and `git diff --check`: PASS.
- Desktop 1280×720: current programme loaded, Tomorrow switched to 14 following programmes, document width equalled viewport width and the console reported zero errors or warnings.
- Mobile 390×844: schedule remained visible beneath the player, its width matched the stage (364px), 24-hour times rendered correctly and horizontal overflow was zero.
- Full Guide on mobile: 55 rows, 54 with current-day programmes and one honest empty state; Tomorrow produced real listings for 53 channels and zero horizontal overflow.
- Published implementation commit: `65edc2c732aec31e0176a22765512b9cb9c473ae`.
- GitHub Actions PWA QA: PASS — https://github.com/Maxi1412/global-tv-hub/actions/runs/39610304485
- GitHub Pages build/deployment: PASS — https://github.com/Maxi1412/global-tv-hub/actions/runs/39610303875
- Exact deployed 390×844 player: v0.12.0 loaded real Das Erste current/next data; Tomorrow rendered 14 programmes, schedule width matched the 364px player stage and the 390px document had zero horizontal overflow.
- Exact deployed full Guide: 55 rows rendered; 54 contained current-day data and 53 contained next-day data. Today/Tomorrow navigation worked and the browser console reported zero errors or warnings.

## v0.11.0 channel-logo audit (21 October 2026)

- Every one of the 55 fixed catalogue channels has a local PNG logo and deterministic existence coverage in `tests/smoke.cjs`.
- Local HTTP/browser load: all 51 unique logo files returned successfully; shared network marks cover the remaining regional/language variants.
- Mobile 390×844 Home and Live TV: all visible logos decoded, channel list reported 55/55 logo elements, document overflow was zero and the console reported zero errors or warnings.
- Desktop 1440×900 Home: six featured broadcaster marks decoded at their stored native dimensions with zero broken images and zero horizontal overflow.
- Text fallback remains available for custom M3U channels or a future failed image decode.
- The approved dark dashboard, source status badges and playback behaviour remained intact; the release cache is `global-tv-hub-shell-v11`.
- Post-change ES network regression: 25/25 retained HLS paths returned a root manifest, media playlist and segment sample.
- GitHub Actions PWA QA: PASS — https://github.com/Maxi1412/global-tv-hub/actions/runs/39563456219
- GitHub Pages build/deployment: PASS — https://github.com/Maxi1412/global-tv-hub/actions/runs/39563454331
- Exact deployed v0.11 app: 55/55 Live TV logo images loaded with non-zero native dimensions; zero fallback/broken images, zero mobile horizontal overflow and zero console errors or warnings.

## v0.10.0 sports interaction and playback audit (21 October 2026)

- `node --check app.js`, `node --check data.js`, `node tests/smoke.cjs`, `node tests/qa.cjs` and `git diff --check`: PASS.
- Sports card browser audit: 33 provider-only cards clicked; zero forced-scroll failures, missing headings or missing access statuses.
- Sports filters: Play in app (5), Basketball (2), Ice Hockey (2), Golf (2), Cricket (1), Rugby (1), Handball (1), American Football (1) and Athletics (1): PASS.
- Mobile 390×844 Sports Hub: 390px document width, no horizontal overflow.
- Five direct sports channels: 5/5 decoded and advanced. Four rendered 1920×1080; Teledeporte rendered 1280×720. Startup confirmation was approximately 2.9–4.1 seconds in this short local Spain pass.
- Remaining direct HLS regression: 16/16 decoded and advanced. Twelve rendered 1920×1080, ALEX/hr/tagesschau24 rendered 1280×720, and QVC rendered 960×540.
- Network path audit: 25/25 root manifests, media playlists and segment samples passed; 20 URLs advertised a 1080p rendition.
- Browser scripts are retained in `tests/browser-sports-audit.js`, `tests/browser-sports-playback.js`, `tests/browser-channel-regression.js` and `tests/browser-embed-audit.js` for repeatable local or deployed verification.
- GitHub Actions PWA QA: PASS — https://github.com/Maxi1412/global-tv-hub/actions/runs/39560452576
- GitHub Pages build/deployment: PASS — https://github.com/Maxi1412/global-tv-hub/actions/runs/39560451626
- Exact deployed app: 33/33 provider cards passed the no-scroll/distinct-status audit; 5/5 sports HLS and 16/16 other HLS channels advanced at the documented resolutions. Hamburg 1's official YouTube frame loaded in-app. Mobile 390×844 remained overflow-free.

## v0.9.0 Full HD and platform audit (21 October 2026)

### Channel-by-channel playback result

- Re-ran all 25 retained HLS URLs from an ES network: 25 root manifests, 25 media playlists and 25 sampled segment paths passed.
- Exercised every one of the 21 configured HLS channels in Chrome, forced the highest stable rendition, verified non-zero decoded dimensions, advancing time, ready state and no media error, and captured/visually inspected a frame from every channel.
- The frame contact sheet matched the expected station/programme identities; this was real moving video, not a poster or transient `playing` event.
- 16 channels decoded at 1920×1080: Dokusat, BR Nord, Terra Mater WILD, Red Bull TV, More Than Sports TV, Motorvision, World of Freesports, Das Erste, KiKA, NDR International, WDR, NRWision, DW English, DW Español, ARD-alpha and BR Süd.
- Four channels have a verified 1280×720 ceiling: ALEX Berlin (its advertised 1080p rendition stalled), hr-fernsehen, Teledeporte and tagesschau24. QVC's source ceiling is 960×540. Hamburg 1's official YouTube live player decoded at 854×480.
- ARD and hr showed actual programming in this pass. Earlier rights slates remain valid evidence that restricted programmes can replace the picture at another time.
- All 33 catalogue entries without an in-app source were clicked. None exposed a retry control or pretended to play; each remained inside the PWA with an unavailable-source explanation.

### v0.9 player regression

- The HLS player now selects the highest stable rendition up to 1080p before confirming playback. It no longer caps quality to the compact dashboard player's CSS size.
- A per-channel ceiling prevents ALEX's broken 1080p rendition from replacing reliable 720p playback. Auto remains in the quality menu.
- Post-change local browser regression confirmed all 21 HLS channels again: 16 at 1080p, four at 720p and QVC at 540p.
- Approved layout and all three design references remain unchanged.

### Lawful platform/source research

- Joyn and Zattoo are legitimate German platforms, but require their own accounts/territories and expose no licensed static-PWA playback integration.
- FIFA+ on DAZN is a useful free football selection after registration; it is not a general substitute for premium football rights. DAZN's current Spain terms prohibit framing without consent.
- Complete Formula 1 coverage in Spain is DAZN-controlled through 2030. Sky/WOW, Sky Sports/NOW and RTL's selected German free-TV races do not provide an authorised feed for this project.
- Official phoenix, ONE, MDR, rbb, SWR and Radio Bremen HLS sources were individually extracted from their broadcaster pages and returned HTTP 403 from Spain; they were not added.
- No suitable licensed cross-origin EPG was verified, so no programme titles or fixtures were fabricated.

### v0.9 deployed Pages verification

- Published implementation commit: `ec3c4843d82d198649fdf8a45ab923333af19476`.
- GitHub Actions PWA QA completed successfully: https://github.com/Maxi1412/global-tv-hub/actions/runs/39514584540
- GitHub Pages build and deployment completed successfully: https://github.com/Maxi1412/global-tv-hub/actions/runs/39514584773
- The exact public build exposed v0.9.0 and the Full-HD-first selection logic.
- All 21 HLS channels reached `Playback confirmed` with advancing time, non-zero decoded dimensions and no media error: 16 at 1920×1080, four at 1280×720 and QVC at 960×540.
- Hamburg 1's official YouTube live video advanced at 854×480 inside the PWA. ZDF remained correctly unavailable with no retry control, iframe or video URL.
- At 390×844, the deployed Guide had no horizontal overflow. The `global-tv-hub-shell-v9` cache populated and reloaded the complete app shell offline.

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

See `SOURCES.md` for the channel-by-channel matrix.

### v0.8 deployed Pages verification (21 October 2026)

- Published implementation commit: `12e33b5ca9470fc090669fea47ec74585f9d7e15`.
- GitHub Actions PWA QA completed successfully: https://github.com/Maxi1412/global-tv-hub/actions/runs/39510956085
- GitHub Pages build and deployment completed successfully: https://github.com/Maxi1412/global-tv-hub/actions/runs/39510955441
- The exact public app returned HTTP 200 and exposed v0.8.0, the advancing-playback confirmation code and the Spain source audit.
- All 21 retained HLS channels reached `Playback confirmed` on the deployed site with advancing time, non-zero decoded dimensions and no final media error. Short confirmation times were approximately 2.2–6.5 seconds.
- Hamburg 1's official YouTube player loaded inside the deployed PWA. ZDF showed `Unavailable from Spain` with no retry control.
- The deployed Guide at 390×844 showed channel health, had no horizontal overflow and produced no browser console errors. Two benign warnings came from iframe compatibility/browser graphics handling.

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

