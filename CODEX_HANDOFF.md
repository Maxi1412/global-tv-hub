# CODEX HANDOFF — GLOBAL TV HUB

**Project status:** functional local frontend prototype, v0.3, updated 2026-10-17. Continue from these files; do not restart the UI or overwrite the approved design.

## Non-negotiable design rules

The user approved the three original UI mockups **exactly as the intended dashboard visual direction**. They are included unchanged:

1. `design-reference/01-approved-home.png`
2. `design-reference/02-approved-sports.png`
3. `design-reference/03-approved-player-guide.png`

Current working screens are implemented using independent HTML/CSS/JS, with UI art derived from those mockups. Polish fidelity against these references only after requesting approval of any material visual changes. Avoid introducing actual movie thumbnails, logo assets, or sports broadcasts without confirming usage rights.

## Existing project layout

- `index.html` — HTML shell, metadata and PWA manifest registration.
- `styles.css` — dark theme, desktop/tablet/mobile layout.
- `app.js` — routes, event handling, persistent favourites/history, search, channel player, M3U imports, VLC playlist exports.
- `data.js` — sourced channel catalogue and sports provider links (does not contain secrets).
- `sw.js`, `manifest.webmanifest`, `assets/icon-*.png` — PWA shell and installability.
- `assets/*.webp` — supporting visuals cropped from user-approved AI images.
- `tests/smoke.cjs` — dependency-free JS UI smoke checks.

## Next tasks, in order

1. **PC environment:** inspect current Node, OS, paths, server config and local tools. Agree on the destination folder before changing the machine. Preserve this code and design assets.
2. **Visual QA:** open all screens at desktop/phone/tablet resolutions, compare to three approved images, fix obvious UI discrepancies and accessible navigation. Do not redesign.
3. **Channel-by-channel real playback checks from Spain:** record timestamp, URL, device/browser, CORS, HLS manifest status, actual audio/video, DRM and geoblocking. Check ARD, ZDF, ARTE, 3sat, ZDFinfo, ZDFneo first; retain official-site fallbacks. Never mark success based only on an HTTP 200 or a public playlist's presence.
4. **Private German broadcasters:** investigate official embed/API partnerships or legitimate account links for RTL+, Joyn (ProSieben, Sat.1, Kabel Eins). No DRM bypass, credential scraping, restreaming, piracy playlists or geographic rights circumvention.
5. **Sports:** test DAZN official account/app routing for Spain (F1 and MotoGP), SPORT1 live page and relevant authorised football/tennis providers. Populate actual event schedule only via permitted, maintained data source; handle time zone Europe/Madrid.
6. **EPG:** pick a permitted EPG feed, channel mapping and data update cadence; add timestamps in Spain local time and no fake live statuses.
7. **Hardening:** error retry controls, request timeout, HLS.js dependency pinning/bundling, import-validation improvements, usable video quality/subtitle controls, TV remote/focus interactions, performance, responsive polish.
8. **Delivery:** set up tested HTTPS deployment, PWA installability checks (Chrome/Android/desktop), opt-in cross-device sync if desired, documentation and backup.

## Playback mode distinctions

- Direct HLS: `data.js` stream candidate, attempted in `app.js` using native video or hls.js. Candidate != verified working.
- Official site: genuine viewing URL on the station card. Browsers may open a tab; third-party login/geo conditions remain.
- VLC: exports an M3U pointer for VLC. This is not a guaranteed deep-link into Android VLC, and does not download broadcasts.
- DRM content: not embedded unless broadcaster supports an authorised, licensed mechanism.

## Verified research sources / URLs (reviewed 17 Oct 2026)

- ARD Livestream: https://www.ardmediathek.de/live
- ARD foreign-viewing restrictions: https://hilfe.ard.de/mediathek/verfuegbarkeit-und-verweildauer-mt/abruf-von-livestreams-im-ausland/
- ZDF livestream overview and Germany-only 24/7 geographic restriction: https://www.zdf.de/live-tv and https://www.zdf.de/fragen-und-antworten-zdf-streaming-100
- RTL+ channel viewing: https://plus.rtl.de/rtlde-rtl ; RTL+ live TV overview https://plus.rtl.de/rtlplus-root/live-tv-f_127
- ProSieben: https://www.joyn.de/live-tv/prosieben
- SAT.1: https://www.joyn.de/live-tv/sat1
- Kabel Eins: https://www.joyn.de/live-tv/kabel-eins
- ARTE live: https://www.arte.tv/de/live/
- SPORT1 live: https://www.sport1.de/tv-video/tv
- Formula 1 DAZN Spain rights through 2030 (2026-09-08 official F1 announcement): https://corp.formula1.com/formula-1-and-dazn-extend-broadcast-partnership-in-spain-andorra-and-portugal-through-2030/
- HLS.js official docs: https://github.com/video-dev/hls.js
- Public IPTV candidate listings *only, not rights clearance or verified Spain playback*: https://github.com/unbelauscht/german-tv-m3u8/blob/main/german-tv.m3u and https://github.com/iptv-org/iptv/blob/master/streams/de.m3u

## Hard constraints

Do not falsely label sports and broadcasters live without a verified feed. Do not claim all German channels are viewable from Spain. Do not claim a connection was tested remotely in this environment. Keep the approved UI, all existing local preferences/data, and user-entered streams intact during future migrations. Seek explicit confirmation before changing major UI elements, folder structure, or preexisting working configurations.

## QA iteration v0.3 and GitHub deployment

- `QA_REPORT.md` documents checks performed and unverified runtime behaviour.
- Mobile Settings entry, corrupt browser storage handling, search navigation playback cleanup, history-clear rerender and retryable HLS library loading fixed.
- Official TV viewing pages for phoenix, ONE and KiKA added; ARD Sportschau and ZDF Sport free sports links added as **official pages**, not direct HLS.
- Network-first first-party service worker cache replaces prior cache-first behaviour; version updates after deployment no longer depend solely on manually bumping a cache name.
- GitHub Actions QA workflow and `.nojekyll` marker included.
- GitHub repository planned: `Maxi1412/global-tv-hub`. **No remote repository or live URL has been confirmed**. User must create the repo; then upload complete code and image assets, enable GitHub Pages, and verify production behaviour.

## Post-v0.5 priorities (17 October 2026)

**Already built:** A static GitHub Pages PWA with premium Sky, NOW UK and DAZN provider entries, free-event sports discovery, distinction between direct HLS candidates and official services, private authorised HLS URL mapping, local source diagnostics, playback retry/recovery, sports access filtering, smoke tests and unchanged approved design references.

**Remaining integration:** Acquire authorised browser-playable provider feeds where APIs/terms allow; determine whether authenticated providers offer official embed SDK integrations. A Sky/WOW/DAZN subscription does not itself provide a third-party HLS URL. Implement server-proxied EPG only after reviewing rights, rates and keys, with secrets kept off the static Pages repository. Test browser CORS, geo access and HD bitrate from Orihuela Costa, Spain, on each target device and create an evidence-backed channel health matrix. The user's key UX constraint: selecting a channel **never** sends them automatically to another site. For unavailable feeds, provide an honest in-app no-source state.

Do not republish unlicensed premium feeds, bypass DRM or geographic controls, or infer live status from a channel's name. App source is in the repository; remote `main` remains canonical; validate any changes via `node tests/smoke.cjs` and Chromium UI tests before deploying.