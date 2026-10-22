# CODEX HANDOFF — GLOBAL TV HUB

**Updated:** 23 October 2026 (Europe/Madrid/Paris time)

## Canonical project

- Local checkout: `C:\Users\acer\AI-Workspace\Projects\Active\global-tv-hub`
- Repository and canonical branch: `https://github.com/Maxi1412/global-tv-hub` → `main`
- Live PWA: `https://maxi1412.github.io/global-tv-hub/`
- Current work: **v0.16.0 pre-release — local gates complete, ready to deploy**. Tennis Channel's newly broken CORS path is repaired; Billiard TV and official FloHockey 24/7 playback are added. Full local QA and offline v17 shell reload passed. GitHub QA, Pages deployment and exact public-build verification remain pending; do not report this candidate as deployed.
- Published release baseline: **v0.15.0**. Implementation commit `bdc6795fcd165ba6ebab93077e551727e8d15b1c` passed its dated GitHub PWA QA (`39788315271`), Pages deployment (`39788315100`) and published-app audit. The local checkout was refreshed to canonical `main` at `438a1b49f680cffa604b38ea2cdbef884c14ab7a` for the latest EPG snapshot before v0.16 edits; recheck the remote before publishing.
- Fresh 23 October published-baseline audit selected all 57 entries: 22 HLS transports and the Hamburg 1 embed advanced, Tennis Channel failed browser CORS, and 33 entries remained unsupported. Yesterday's pass does not certify today's source behavior.
- Historical v0.14.1 alternative-source recheck on 22 October selected 55 entries: 21 HLS transports, Hamburg 1 and 33 unsupported states. Its count predates the published v0.15 expansion.
- Previous published v0.12 implementation commit: `65edc2c732aec31e0176a22765512b9cb9c473ae`; its GitHub Actions QA and Pages deployment passed.
- Published v0.8 implementation commit: `12e33b5ca9470fc090669fea47ec74585f9d7e15`
- Last published baseline before this release: v0.7.1 at `16ef64bac6a4ca556c7d1868b2689d934a479c83`
- GitHub `main` and the live baseline were refreshed on 23 October 2026. Recheck again before future edits; do not rely on an older baseline SHA.

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

## Current v0.16 candidate implementation

- Catalogue: **59 channels**. The request to make every channel playable remains unfinished: 33 entries still lack a supported in-app integration.
- Every fixed catalogue channel has a locally stored broadcaster/channel logo. The same identity is used in Home, Search, Favourites, Live TV and Guide; custom streams retain a safe text fallback.
- Configured in-app playback: **24 HLS channels plus two official YouTube embeds**, Hamburg 1 and FloHockey 24/7. The other 33 entries have no supported browser-compatible player.
- Player: HLS.js first in Chromium, native HLS only as a fallback, automatic source failover and HD-preferred adaptive quality. Startup selects the preferred rendition; per-channel `autoLevelCapping` retains the stable ceilings while automatic bitrate adaptation can reduce output when bandwidth falls. The prior permanent manual quality lock is removed; explicit user quality choices, diagnostics and retry controls remain.
- Tennis Channel International now uses a public LG international FAST master after its Rakuten master stopped sending CORS. Billiard TV uses the HLS published by its owner. FloHockey uses its own YouTube live player `9aMu8HuYpRk`; it is selected hockey programming, not complete NHL access.
- Transport rule: decoded dimensions must be non-zero and video time must advance by at least 1.5 seconds. A transient `playing` event is not enough, and transport is never presented as proof that the programme is visible.
- Fatal errors after playback begins now invoke recovery/fallback instead of leaving a false connected status.
- Source labels show the dated Spain picture audit separately from current-device transport. A configured player is `Ready to test` until it decodes; after that it says `Signal decoded`, not `Working now`.
- A direct installed-PWA/`#live` launch no longer stalls on “Preparing in-app source”. It presents an explicit Play action because browsers may require a user gesture; selecting a configured channel still starts playback immediately.
- Each selected channel now has an in-flow programme panel below the player with current programme, progress, upcoming programmes and Today/Tomorrow/day-after navigation. The full Guide route shows real now/next listings.
- Programme data comes from a compact same-origin snapshot built from IPTV-EPG.org's free XMLTV country links. Exact mappings cover 54 of 59 candidate channels; Terra Mater WILD, FIFA+ FAST, Tennis Channel, Billiard TV and FloHockey remain explicitly unmatched.
- `.github/workflows/update-epg.yml` regenerates compressed `epg.json.gz` twice daily. It uses no API key, paid route or broadcaster playback token.
- Hamburg 1 and FloHockey play through their official players inside the existing video frame. Known-blocked ZDF-family/ARTE/DF1 sources are not retried.
- Sports directory: 42 entries, including nine direct channel cards and 33 accurately labelled provider-only or unavailable entries.
- Provider details render directly below the sports hero, retain the top scroll position and explain the selected provider instead of reusing one generic bottom panel.
- Dedicated filters cover basketball, ice hockey, golf, cricket, rugby, handball, American football and athletics in addition to existing football, tennis and motorsport discovery.
- Candidate service-worker shell cache is v17 and includes the compact guide plus all 55 unique local channel-logo files; broadcaster and stream requests remain excluded from caching.

## v0.16 targeted evidence and pending release gates

- Fresh live-baseline audit: 57 entries selected; 22 advancing HLS transports, one advancing official embed, one failing Tennis transport and 33 unsupported states. Tennis's old Rakuten master still answered at network level but omitted the CORS header required by Chrome.
- Repaired Tennis source: `https://cdn-uw2-prod.tsv2.amagi.tv/linear/amg01444-tennischannelth-tennischnlintl-lggb/playlist.m3u8`. Master, 1080p playlist and sampled media returned 200 with compatible CORS; the actual app showed tennis at 1920×1080 after about four seconds, sustaining advancing video/audio for 15 seconds. The master generates media paths at runtime. Owner and LG sources identify the international FAST service; its delivery name is GB and no Spain-specific competition entitlement is claimed.
- Billiard TV: owner-published `https://bbb-billi-streamstak.otteravision.com/bbb/billi/billi.m3u8`; actual app startup about 4.8 seconds, 1920×1080 and sustained video/audio for 15 seconds, with branded billiards instruction visible.
- FloHockey 24/7: official embed `https://www.youtube-nocookie.com/embed/9aMu8HuYpRk`. Real hockey was inspected after preroll advertising and a station break. Auto chose 480p; selecting 1080p in YouTube's menu sustained video/audio for 15 seconds. An ad or iframe load alone was not accepted as channel-programme proof.
- Existing-channel visible-frame audit: 22 HLS transports, 18 actual programmes and four official rights notices (hr, BR Nord, BR Süd, ARD-alpha). Das Erste showed its programme. Repaired Tennis and new Billiard samples give 20 actual HLS programmes plus four notices in this window; transport success does not remove a rights notice.
- Candidate HLS ceilings: 17 at 1080p, six at 720p (ALEX, hr, Teledeporte, FIFA+, tagesschau24, NRWision) and QVC at 540p. Both official embeds have now sustained 1080p through YouTube's quality settings. Hamburg 1 showed a branded non-advertising interview with five seconds of video advance at 1920×1080; the quality preference had persisted from the FloHockey test. Earlier 480p Auto samples describe that startup window, not a source ceiling.
- New broad research included Reddit/Famelack leads, ntv's own 24-hour page and ONE's changed hostname. ntv's media is DRM-controlled, its direct path returned 403 and its CSP restricts framing to ntv domains. ONE's old dot hostname fails DNS; the resolving hyphen hostname still returned 403. Famelack repeats the same geo-blocked broadcaster and ANTIK operator/test sources for the missing mainstream stations. United TV/Techlive is an additional legitimate contracted B2B lead, not a public free feed.
- The supplied livehdtv RTLZWEI/ProSieben pages had previously shown only 576p through rotating three-hour tokens; their advertised embeds failed on the real PWA origin. No authorization for redistribution was verified, and no extracted token is retained.
- Completed candidate gates: syntax, deterministic QA/smoke and diff checks passed; 28/28 retained HLS URLs passed root-manifest, media-playlist and segment probes. Mobile 390×844 showed all nine direct Sports Hub cards with decoded logos and zero horizontal overflow.
- Adaptive bandwidth regression: at 1.76 Mbps, output reduced from 1080p to 360p, advanced 37.62 seconds over 40 seconds and briefly rebuffered during adaptation. After restoring the network, video advanced 10.02 seconds over another ten seconds. Do not infer zero buffering from this pass.
- ARD's first short 3.5-second candidate sample briefly appeared unstable. Its follow-up sustained 25 seconds continuously, adapting 1080→540→720→1080 with no errors. The final full-catalogue audit used a three-second warmup and ten-second HLS stability sample and passed ARD.
- [Final local per-channel audit](CHANNEL_AUDIT_2026-10-23.md), completed 23 October 2026 at 00:32:59 Europe/Paris (`2026-10-22T22:32:59.298Z`): all 59 entries selected, 24/24 HLS transports sustained the ten-second gate, 2/2 official embeds advanced non-advertising video, 33 unsupported entries stayed honest, zero unstable transports, zero audit failures and zero browser errors. Rendered HLS samples: 17 at 1080p, six at 720p, QVC at 540p. This is not a claim of 59 working channels.
- Offline shell v17 reload passed. All local release gates are complete; **pending:** GitHub QA, Pages deployment and the exact deployed 59-entry audit. Fill those results and the implementation SHA before calling v0.16 released.

## Historical v0.15 evidence (22 October 2026)

- The user-supplied platform list yielded two direct free FAST candidates after manifest, segment, codec, browser and visible-frame screening: FIFA+ German FAST and Tennis Channel International.
- Both use partner-hosted Wurl/Amagi delivery, decoded H.264/AAC with audio and advancing video in Spain, and have an honest 1280×720 source ceiling. FIFA+ showed an actual football replay; Tennis Channel showed branded moving programming.
- Samsung Germany's current free-channel catalogue lists both FIFA+ and Tennis Channel. This confirms their FAST identity but does not turn every premium competition into free programming.
- First expanded audit exposed a real NRWision problem: its 1080p rendition served bytes but stalled in Chrome. `preferredMaxHeight:720` restored stable 1280×720 playback.
- Final clean single-session audit: **23/23 HLS transports advanced with audio, one official embed advanced, 33/33 unsupported entries stayed honest, zero unstable transports, zero failures and zero browser errors**.
- The exact deployed Pages build repeated the same 23/1/33 channel outcomes with zero unstable transports or audit failures. Its one console entry was a non-fatal YouTube `compute-pressure` permissions-policy warning from the cross-origin Hamburg 1 embed, not an application error.
- Spain path audit: **27/27 HLS URLs** passed manifest, selected media-playlist and segment sampling. Fifteen channels rendered 1080p, seven rendered 720p and QVC rendered 540p.
- No protected Sky, DAZN, Joyn, RTL+ or operator test/private restream was added. The supplied document itself correctly notes that platform availability is not a reusable embed/feed licence.

## v0.14 correction and live evidence

- Actual Windows Chrome reproduced the user's ARD complaint: both official Das Erste feeds decoded at 1920×1080 with audio, but the visible picture was ARD's rights slate, not the scheduled programme.
- A two-frame visual audit then opened all 21 HLS channels. Twenty showed actual moving programme pictures; Das Erste alone showed a programme blackout. Five direct sports channels showed real sports/motoring content.
- The full 55-entry candidate audit recorded 21 transport confirmations, one advancing official embed, 33 honest unavailable states, zero failures and zero browser errors.
- A later exact deployed v0.14.0 rerun at 22:22 local time again captured all 21 HLS channels: Das Erste had changed to its actual 1080p programme, while BR Fernsehen Nord and Süd displayed BR's official rights slate. The latest snapshot is therefore 19 visible programmes and two programme blackouts; the changing results are expected programme-rights behaviour.
- Joyn's official ProSieben player returned `CODE: GEO_BLOCKED` in Spain. Its SAT.1 player produced no video and returned HTTP 400 for the entitlement-token request.
- Joyn's CSP allows framing only by Joyn-controlled domains; ZDF sends `X-Frame-Options: SAMEORIGIN`. A working consumer website cannot be reused as an in-app player without a provider partnership.
- Zattoo's official B2B platform advertises Stream API, Playback SDK and content-inclusive white-label services. That is the legitimate route to broader channel integration, but it requires a commercial agreement and cannot be synthesized from free consumer URLs.

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

1. Complete the pending v0.16 release gates above. Keep failures, unsupported states, decoded transport and visible programme access separate in the result; never call 59 catalogue entries 59 working channels.
2. Publish only after the local gates pass; verify GitHub QA and Pages deployment, then re-run the exact public build and update this handoff with the implementation SHA and actual results.
3. Check physical Android Chrome and target TV browsers, including autoplay, remote/focus input, YouTube preroll/quality controls and PWA installation. Run longer samples for join time, stalls, bitrate/resolution, audio, latency and fallback.
4. Seek source-owner permission/provenance evidence where a retained public feed came through a community directory. Consider formal provider/SDK routes for the 33 unsupported entries; no such agreement exists yet.
5. Monitor the free XMLTV source for update failures, identifier drift and provenance/licensing changes; preserve five explicit unmatched states and evaluate a formal EPG provider before commercial use.
6. Keep `main` canonical, preserve the approved UI and user storage, and use Git history for rollback.

