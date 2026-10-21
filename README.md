# Global TV Hub v0.13.0 — device-tested playback and honest source status

Global TV Hub is a static PWA for German, international and sports television. The approved premium dark dashboard is unchanged. Selecting a configured channel stays inside the app.

The v0.13 release fixes the installed-PWA/direct-`#live` state that could remain on “Preparing in-app source” without starting anything. A directly opened channel now says that it is ready and presents an explicit Play button; selecting a configured channel from the catalogue still starts the browser test immediately. Historical audit results are no longer worded as if they prove that a source is working on the current device.

The catalogue contains 55 channel entries, but that is not the playable count. The fully repeated ES/mobile-emulation audit confirmed **21 HLS players plus one official Hamburg 1 embed**. The remaining **33 entries have no authorised browser-compatible in-app player** and deliberately expose no false Play/Retry control. Sixteen HLS channels rendered 1920×1080; ALEX, hr, Teledeporte and tagesschau24 rendered 1280×720; QVC rendered 960×540; Hamburg 1's official player rendered 854×480. The app cannot manufacture genuine 1080p when a source supplies less.

The v0.12 player now places the selected channel's real programme schedule directly below its video: the current programme, progress, upcoming shows and Today/Tomorrow/day-after controls. The full Guide route shows now and next across the catalogue. The compact, compressed XMLTV snapshot currently has listings for 54 of 55 fixed channels; Terra Mater WILD retains an explicit no-listing state because no verified exact match was found. Times are converted to the viewer's local timezone, and programme listings never imply that a blocked or subscription channel is playable.

The v0.11 interface uses real locally stored broadcaster/channel logos for all 55 fixed catalogue entries. Logos appear consistently on Home, Search, Favourites, Live TV and Guide surfaces, with a readable text fallback for user-added custom streams. The v12 offline shell pre-caches those assets and the latest compact guide snapshot instead of depending on third-party image hosts at runtime.

The v0.10 Sports Hub applies one playback rule to every card. Five cards start verified television inside the PWA; all other sports cards show their exact official-provider, subscription or regional status without scrolling the page or pretending to play. Basketball, ice hockey, golf, cricket, rugby, handball, American football and athletics now have dedicated filters.

The player prefers HLS.js in Chromium, records success only after decoded video time advances, and selects the highest stable rendition up to 1080p. ALEX is intentionally capped at 720p because its advertised 1080p rendition stalled repeatedly; Auto remains available in the quality menu.

On 21 October 2026, every catalogue entry was opened through the actual Live TV interface using Android Chrome device emulation on a network exit confirmed as ES. Each HLS pass required non-zero decoded dimensions, ready state, playing state, buffer, advancing time across a further 3.5-second stability window and increasing audio-decoder bytes. Hamburg 1 was checked inside its cross-origin official YouTube frame and its decoded video advanced. These short samples do not guarantee future uptime, every physical device or programme rights.

Premium RTL/ProSieben/Sat.1, Sky, DAZN, F1, football and similar services remain unavailable in the built-in player unless the rights holder supplies an authorised third-party integration. Joyn, Zattoo, FIFA+ on DAZN and other legitimate platforms were researched individually; an account or free tier is not an embed licence. The app does not scrape protected streams, bypass DRM/geographic controls, or advertise paid channels as free.

Run `node scripts/update-epg.cjs` to refresh the programme snapshot, `node tests/smoke.cjs` for deterministic UI/catalogue checks, `node tests/probe-sources.cjs` for the network-path audit, and `playwright-cli run-code --filename=tests/browser-full-playback-audit.js` from an open Playwright session for the full 55-entry UI playback audit. GitHub Actions refreshes the guide twice daily. See `QA_REPORT.md`, `SOURCES.md`, and `CODEX_HANDOFF.md` for evidence and limitations.

## v0.10 — Sports playback and provider directory

The in-app Sports dashboard includes direct, one-click HLS sources for Red Bull TV, More Than Sports TV, Teledeporte (RTVE Spain), Motorvision free FAST and World of Freesports. Four decoded at 1920×1080; Teledeporte decoded at its 1280×720 source maximum. Clicking those cards automatically starts the associated channel inside Global TV Hub. DF1 remains unavailable because its official source blocks Spain.

Official access entries now cover football, Formula 1, tennis, basketball, ice hockey, golf, cricket, rugby, handball, American football, athletics and other Olympic sports. They do not silently redirect and are not mislabelled as working streams. A licensed provider connection is still required before any subscription or provider-controlled event can play inside this independent PWA.

**Important:** These sources received a new short Spain browser and quality screen on 21 October 2026, documented in `SOURCES.md`. That does not guarantee future CORS, worldwide rights, uptime, audio or long-run stability. The player automatically retries configured alternatives and offers quality choices when the manifest advertises them.

**Premium sports:** Sky Sport F1, Sky Sports UK, full Formula 1 DAZN Spain and other DRM-protected paid services have no public licensed embeddable feed here. They remain marked unavailable for in-app playback; their entries must not trigger provider redirects, source-entry prompts, or misrepresent other sports content as premium F1/football.

**QA:** Node smoke tests should verify channel catalogue, one-click sport-card routing, seven navigation routes, private optional custom stream storage, no website redirect, and service worker version bump. GitHub Pages deployment should pass on main.

**Source references:** https://github.com/iptv-org/iptv/blob/master/streams/at.m3u ; https://github.com/iptv-org/iptv/blob/master/streams/de.m3u ; https://github.com/iptv-org/iptv/blob/master/streams/es.m3u ; https://morethansports.tv ; https://redbull.tv ; https://motorvision.tv .

## v0.7 — Spain source feedback
ARD previously selected its domestic stream before the international source. The player now prioritizes the international feed. A video decoder reporting playback does not mean the programme is not subject to rights restrictions: use Try another feed or Programme blocked? to try the next configured source. The old football screenshot has been removed from the generic player overlay. More free-to-view German channels have been added as public stream candidates; source availability and CORS remain unverified from Spain.
