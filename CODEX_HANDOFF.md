# CODEX HANDOFF — GLOBAL TV HUB

**Updated:** 21 October 2026 (Europe/Madrid/Paris time)

## Canonical project

- Local checkout: `C:\Users\acer\AI-Workspace\Projects\Active\global-tv-hub`
- Repository and canonical branch: `https://github.com/Maxi1412/global-tv-hub` → `main`
- Live PWA: `https://maxi1412.github.io/global-tv-hub/`
- Current release: **v0.13.0**, correcting direct-live startup/status truth and adding a repeatable 55-entry browser playback audit. Recheck the canonical `main` SHA and deployment jobs before future edits.
- Previous published v0.12 implementation commit: `65edc2c732aec31e0176a22765512b9cb9c473ae`; its GitHub Actions QA and Pages deployment passed.
- Published v0.8 implementation commit: `12e33b5ca9470fc090669fea47ec74585f9d7e15`
- Last published baseline before this release: v0.7.1 at `16ef64bac6a4ca556c7d1868b2689d934a479c83`
- GitHub `main`, GitHub Pages and the live browser build were rechecked on 21 October 2026. Recheck again before future edits; do not rely on the old baseline SHA.

The older handoff incorrectly described this as an unpublished local prototype. That statement is superseded: the GitHub repository and Pages app are real, canonical and active.

## User goal and non-negotiable rules

Selecting a German television or sports channel should start reliable, HD-preferred playback **inside Global TV Hub** whenever a lawful browser-compatible source exists. A user should not be redirected or asked to paste a stream URL during normal catalogue use.

- Preserve the approved premium dark dashboard. Do not materially redesign it without approval.
- The three unchanged visual authorities are:
  - `design-reference/01-approved-home.png`
  - `design-reference/02-approved-sports.png`
  - `design-reference/03-approved-player-guide.png`
- Preserve favourites, history, custom streams, authorised linked feeds and local diagnostics. Storage keys were not changed in v0.8.
- A valid manifest is not playback proof. Require segment access, decoded dimensions, advancing time and a visually inspected moving frame before describing a source as screened playback.
- A broadcaster rights slate is working transport but unavailable programming; report it separately.
- Never publish pirate feeds, extract subscription tokens, bypass DRM/geoblocking, or present Sky/DAZN/RTL+/Joyn content as free.
- Do not invent programme titles, fixtures, start times or “LIVE” badges. Ship EPG data only after its licence, stable IDs, update cadence and Spain-local time handling are verified.

## Current v0.13 implementation

- Catalogue: **55 channels**.
- Every fixed catalogue channel has a locally stored broadcaster/channel logo. The same identity is used in Home, Search, Favourites, Live TV and Guide; custom streams retain a safe text fallback.
- Configured in-app playback: **21 HLS channels / 25 retained HLS URLs**, plus **one official Hamburg 1 YouTube embed**. The other 33 catalogue entries do not have an authorised browser-compatible player.
- Player: HLS.js first in Chromium, native HLS only as a fallback, automatic source failover, Full-HD-first quality selection, adaptive/manual quality menu, local device diagnostics and retry controls.
- Success rule: decoded dimensions must be non-zero and video time must advance by at least 1.5 seconds. A transient `playing` event is not enough.
- Fatal errors after playback begins now invoke recovery/fallback instead of leaving a false connected status.
- Source labels show the dated Spain browser screen separately from the current device's local result. A configured player is `Ready to test` until it succeeds on that device; it is not pre-labelled working.
- A direct installed-PWA/`#live` launch no longer stalls on “Preparing in-app source”. It presents an explicit Play action because browsers may require a user gesture; selecting a configured channel still starts playback immediately.
- Each selected channel now has an in-flow programme panel below the player with current programme, progress, upcoming programmes and Today/Tomorrow/day-after navigation. The full Guide route shows real now/next listings.
- Programme data comes from a compact same-origin snapshot built from IPTV-EPG.org's free XMLTV country links. Exact IDs populate 54 of 55 fixed channels; Terra Mater WILD remains explicitly unmatched.
- `.github/workflows/update-epg.yml` regenerates compressed `epg.json.gz` twice daily. It uses no API key, paid route or broadcaster playback token.
- Hamburg 1 plays through the official player inside the existing video frame. Known-blocked ZDF-family/ARTE/DF1 sources are no longer retried.
- Sports directory: 38 entries, including five direct playable channels and 33 accurately labelled provider-only or unavailable entries.
- Provider details render directly below the sports hero, retain the top scroll position and explain the selected provider instead of reusing one generic bottom panel.
- Dedicated filters cover basketball, ice hockey, golf, cricket, rugby, handball, American football and athletics in addition to existing football, tennis and motorsport discovery.
- Service-worker shell cache is v13 and includes the current compact guide plus all 51 unique channel-logo files; broadcaster and stream requests remain excluded from caching.

## Full catalogue evidence from 21 October 2026

- Network location was confirmed as country code `ES`. The audit used the real deployed/mobile UI with Android Chrome device emulation, not manifest-only requests.
- All 55 catalogue entries were selected individually. Result: **21 HLS playback confirmations, one official embedded-player confirmation, 33 honest unavailable states, zero UI/audit failures and zero browser errors**.
- Each HLS confirmation required decoded dimensions, non-paused ready state, buffered media, advancing video across a further 3.5-second sample and increasing browser audio-decoder bytes.
- Hamburg 1's YouTube frame was inspected directly: its inner video advanced 3.52 seconds and reported 854×480, ready state 4 and audio enabled. An iframe load alone was not counted.
- Sixteen HLS channels rendered 1920×1080. ALEX, hr, Teledeporte and tagesschau24 rendered 1280×720. QVC rendered 960×540. The app states these source limits and does not claim invented Full HD.
- The screenshot symptom was reproduced: directly reopening the installed-style `#live` route left v0.12 on “Preparing” with a 0×0 inactive video. Clicking Das Erste then produced advancing 1920×1080 playback. v0.13 replaces the false pending state with a truthful ready/Play state.
- `tests/browser-full-playback-audit.js` retains this channel-by-channel method for repeat runs. A short dated pass is evidence for that window, not a permanent uptime or programme-rights guarantee.

## Spain evidence from 21 October 2026

- All 25 retained HLS URLs passed root-manifest, media-playlist and segment sampling from the ES network.
- All 21 configured HLS channels confirmed advancing after the v0.9 quality change.
- Sixteen decoded at 1920×1080. ALEX, hr, Teledeporte and tagesschau24 decoded at 1280×720. QVC decoded at 960×540. Hamburg 1's official embed decoded at 854×480.
- ALEX's advertised 1080p rendition stalled repeatedly; its channel configuration now caps playback at stable 720p.
- Every source frame was captured and visually inspected; the expected station/programme identities were visible.
- All 33 no-source catalogue channels stayed in the PWA, exposed no retry control and made no false playback claim.
- Official phoenix, ONE, MDR, rbb, SWR and Radio Bremen HLS sources were individually extracted from broadcaster pages but returned HTTP 403 from Spain, so they were not added.
- Joyn, Zattoo, FIFA+ on DAZN, UEFA.tv, SPORT1, Sportschau, ZDF Sport, Formula 1, Sky/WOW/NOW and DAZN were researched. None provides this static PWA with a licensed premium feed or general-purpose embed.

## Why the player changed

On the live v0.7.1 app, Chrome returned `maybe` for native HLS support. The app trusted that answer and bypassed HLS.js. Several valid feeds briefly fired `playing` and then stopped at 0:00 with a demuxer parse error while the UI still said the signal was connected.

The exact same ALEX Berlin, DW Español, NDR International, tagesschau24, hr, Teledeporte and Motorvision sources produced advancing video through HLS.js. v0.8 therefore prefers HLS.js and verifies real progress before success.

## Spain evidence from 18 October 2026

Environment: Chrome on Windows through a network exit confirmed as country code `ES`. Samples were approximately 9–18 seconds. This is not proof for every Spanish ISP/device, long-run stability, audible sound or future uptime.

- Moving picture observed for **19 HLS channels**.
- ARD and hr transported video but showed official programme-rights slates during the sample.
- All 21 retained HLS channels reached the repaired player's `Playback confirmed` state with advancing time and non-zero decoded dimensions.
- Hamburg 1's official embedded player loaded and played inside the PWA at 854×480.
- All **25/25 retained HLS URLs** returned a root manifest, media playlist and a capped 32 KiB segment sample from the ES network.
- ZDF, ZDFinfo, ZDFneo and 3sat returned 403/ORB; ZDF states its 24/7 streams are Germany-only.
- ARTE direct streams returned 403/ORB and its official player reported the current programme unavailable in Spain.
- DF1's old host failed; its current official CloudFront source explicitly country-blocked Spain.

See `SOURCES.md` for the channel matrix and `QA_REPORT.md` for the test method and historical audit trail.

## Premium channel findings

- DAZN Spain's consumer terms grant a personal, non-transferable streaming licence and prohibit embedding/framing DAZN in another service without consent.
- RTL publishes player documentation, but the player requires domain activation on RTL's whitelist. The library does not itself provide RTL+ live-TV entitlement, media IDs or redistribution permission.
- No publicly authorised consumer embed was verified for Joyn, Sky/WOW or Eurosport. Private commercial partner integrations may exist, but none is licensed to this project.
- Premium channels therefore remain discoverable but unavailable inside the player. A formal provider agreement plus a supported SDK/feed is the correct next route.

## Verification completed for v0.8

- JavaScript syntax checks: PASS.
- `node tests/smoke.cjs`: PASS.
- ES network path probe: 25 checked, 25 manifest/media/segment paths passed.
- Local browser regression: all 21 HLS channels confirmed advancing; Hamburg 1 embed loaded in app.
- Mobile 390×844 Guide: source statuses visible, no console errors, layout visually inspected.
- Desktop 1440×900 embedded player: visually inspected and preserved within the approved layout.
- Offline app-shell reload: PASS. Television playback still correctly requires internet access.
- GitHub Actions PWA QA: PASS — `https://github.com/Maxi1412/global-tv-hub/actions/runs/39510956085`.
- GitHub Pages build/deployment: PASS — `https://github.com/Maxi1412/global-tv-hub/actions/runs/39510955441`.
- Exact deployed Pages app: all 21 retained HLS channels reached `Playback confirmed` with advancing time, non-zero dimensions and no media errors. Observed confirmation times in this short pass were approximately 2.2–6.5 seconds.
- Deployed Hamburg 1 official embed loaded inside the PWA. Deployed ZDF showed the Spain-unavailable state with no retry control.
- Deployed 390×844 Guide had no horizontal overflow; browser console had no errors (two benign browser/embed warnings only).

## Verification completed for v0.9

- JavaScript syntax checks, `node tests/qa.cjs`, `node tests/smoke.cjs` and `git diff --check`: PASS.
- ES network path probe: 25 checked, 25 manifest/media/segment paths passed; 20 URLs advertise a 1080p rendition.
- GitHub Actions PWA QA: PASS — `https://github.com/Maxi1412/global-tv-hub/actions/runs/39514584540`.
- GitHub Pages build/deployment: PASS — `https://github.com/Maxi1412/global-tv-hub/actions/runs/39514584773`.
- Exact deployed app: all 21 HLS channels reached `Playback confirmed` with advancing time and no media error. Sixteen decoded at 1920×1080; ALEX, hr, Teledeporte and tagesschau24 decoded at 1280×720; QVC decoded at 960×540.
- Deployed Hamburg 1 official embed played at 854×480 inside the PWA. Deployed ZDF had no source, retry control, iframe or video URL.
- Deployed 390×844 Guide had no horizontal overflow. The v9 service-worker cache populated and the app shell reloaded offline.

## Verification completed for v0.10

- Syntax, deterministic smoke/QA and `git diff --check`: PASS.
- All 33 provider-only Sports Hub cards retained scroll position zero and showed card-specific name/status details; mobile 390×844 had no horizontal overflow.
- All five direct sports channels decoded and advanced: four at 1920×1080 and Teledeporte at 1280×720.
- All other 16 HLS channels decoded and advanced: twelve at 1920×1080, ALEX/hr/tagesschau24 at 1280×720, and QVC at 960×540.
- All 25 retained HLS URLs passed manifest, media-playlist and segment sampling from the ES network.
- GitHub Actions PWA QA: PASS — `https://github.com/Maxi1412/global-tv-hub/actions/runs/39560452576`.
- GitHub Pages build/deployment: PASS — `https://github.com/Maxi1412/global-tv-hub/actions/runs/39560451626`.
- Exact deployed app matched the local result: 33/33 provider-card interactions, 5/5 sports HLS channels, 16/16 other HLS channels, the Hamburg 1 official embed and mobile 390×844 layout all passed.

## Verification completed for v0.11

- Syntax, deterministic smoke/QA and `git diff --check`: PASS.
- Every one of the 55 fixed channels has a mapped local asset; all 51 unique PNGs decoded successfully through the local HTTP build.
- Local and exact deployed 390×844 Home/Live TV views had zero horizontal overflow and zero browser console errors or warnings.
- Exact deployed Live TV list rendered 55 logo elements; all 55 loaded with non-zero native dimensions and no fallback or broken-image state.
- Post-change ES network regression: 25/25 retained HLS URLs returned a root manifest, media playlist and segment sample; the logo-only release did not change playback configuration.
- GitHub Actions PWA QA: PASS — `https://github.com/Maxi1412/global-tv-hub/actions/runs/39563456219`.
- GitHub Pages build/deployment: PASS — `https://github.com/Maxi1412/global-tv-hub/actions/runs/39563454331`.

## Verification completed for v0.12

- Syntax, deterministic smoke/QA and `git diff --check`: PASS.
- Generated `epg.json.gz`: 3,184 current/upcoming records, all 55 catalogue keys represented and exact listings for 54 channels; Terra Mater WILD keeps an honest empty state.
- Current network regression: 25/25 retained HLS URLs returned a root manifest, media playlist and segment sample; 20 advertised a 1080p rendition. This is transport evidence, not new visual playback evidence.
- GitHub Actions PWA QA: PASS — `https://github.com/Maxi1412/global-tv-hub/actions/runs/39610304485`.
- GitHub Pages build/deployment: PASS — `https://github.com/Maxi1412/global-tv-hub/actions/runs/39610303875`.
- Exact deployed 390×844 player: v0.12.0 loaded real Das Erste current/next data; Tomorrow rendered 14 programmes beneath the player, schedule width matched the 364px stage and document width matched the 390px viewport.
- Exact deployed full Guide: all 55 rows rendered; 54 had a current-day listing and 53 had a next-day listing. Today/Tomorrow navigation worked, horizontal overflow was zero and the console reported zero errors or warnings.

## Commands

```powershell
node --check app.js
node --check data.js
node --check sw.js
node --check tests/probe-sources.cjs
node tests/qa.cjs
node tests/smoke.cjs
$env:AUDIT_REGION='Spain (ES) network, local machine; NOT visual playback'
node tests/probe-sources.cjs
```

The probe writes `source-health-ci.json`. It deliberately samples only 32 KiB of one segment per source and is network evidence, not visual playback, sound confirmation or rights clearance.

## Next work, in order

1. Check the deployed Pages build on physical Android Chrome and any target TV browser, including autoplay, remote/focus input and PWA installation.
2. Run longer stability samples and record join time, stalls, rendered bitrate/resolution, audio, live latency and fallback behavior.
3. Seek source-owner permission/provenance evidence where a retained public feed came through a community directory.
4. Contact RTL, Joyn, Sky/WOW, DAZN and Eurosport only through formal partner routes if licensed premium playback remains a product requirement.
5. Monitor the current free XMLTV source for update failures, identifier drift and provenance/licensing changes; evaluate a formal licensed EPG provider before any commercial use.
6. Keep `main` canonical, run all QA before publishing, verify the exact live Pages app after each deployment, and use Git history for rollback.

