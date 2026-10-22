# Global TV Hub v0.15.0 — verified free FAST sports expansion

Global TV Hub is a static PWA for German, international and sports television. The approved premium dark dashboard is unchanged. Selecting a configured channel stays inside the app.

v0.15 adds two tested free sports channels from the supplied platform research: FIFA+ German FAST and Tennis Channel International. Both partner-hosted HLS feeds passed manifest, segment, codec, audio, advancing-video and visible-frame checks from Spain at their real 1280×720 source maximum. FIFA+ showed an actual football match replay; Tennis Channel showed branded moving programming. These are curated FAST channels, not replacements for every premium match on DAZN, Sky or Eurosport.

The catalogue now contains 57 entries. The final single-session Spain audit confirmed **23 HLS transports plus one official Hamburg 1 embed**; the remaining **33 entries have no authorised browser-compatible in-app player**. Fifteen HLS transports rendered 1920×1080; ALEX, hr, Teledeporte, FIFA+, Tennis Channel, tagesschau24 and NRWision rendered 1280×720; QVC rendered 960×540. NRWision is deliberately capped at 720p because its advertised 1080p rendition stalled twice in Chrome, while 720p sustained video and audio. A decoded feed can still show a broadcaster rights slate instead of its scheduled programme.

ProSieben and SAT.1 were also tested through Joyn itself from Spain. ProSieben returned `CODE: GEO_BLOCKED`; SAT.1 produced no video and failed its entitlement request. Joyn permits framing only on Joyn-controlled domains, and ZDF's live page is SAMEORIGIN. Those free consumer websites therefore cannot be embedded into this independent GitHub Pages origin, and their protected playback URLs must not be scraped or relayed.

The selected channel's programme schedule sits directly below its video: the current programme, progress, upcoming shows and Today/Tomorrow/day-after controls. The full Guide route shows now and next across the catalogue. The compact XMLTV snapshot currently has exact listings for 54 of 57 fixed channels; Terra Mater WILD and the two new FAST feeds retain explicit no-listing states until exact guide IDs are verified. Times use the viewer's local timezone, and programme listings never imply playback entitlement.

Real locally stored broadcaster/channel logos cover all 57 fixed catalogue entries, including FIFA+ and Tennis Channel. Logos appear consistently on Home, Search, Favourites, Live TV and Guide surfaces, with a readable text fallback for custom streams. Offline shell cache v16 pre-caches those assets and the compact guide snapshot instead of depending on third-party image hosts at runtime.

The Sports Hub applies one playback rule to every card. Seven cards now start screened television inside the PWA; the remaining cards show their exact official-provider, subscription or regional status without pretending to play. Basketball, ice hockey, golf, cricket, rugby, handball, American football and athletics retain dedicated filters.

The player prefers HLS.js in Chromium, records success only after decoded video time advances, and selects the highest stable rendition up to 1080p. ALEX is intentionally capped at 720p because its advertised 1080p rendition stalled repeatedly; Auto remains available in the quality menu.

On 22 October 2026, every one of the 57 catalogue entries was opened through the actual Live TV interface in a clean Chrome session on the Spain network. All 23 HLS channels passed non-zero decoded dimensions, ready/playing state, advancing time across a further 3.5-second window and increasing audio-decoder bytes. Hamburg 1's cross-origin official YouTube video also advanced. The 33 entries without a supported player exposed no false retry control. There were zero failures and zero browser errors. These short samples do not guarantee future uptime, every physical device or programme rights.

Premium RTL/ProSieben/Sat.1, Sky, DAZN, F1, football and similar services remain unavailable in the built-in player unless the rights holder supplies an authorised third-party integration. Joyn, Zattoo, FIFA+ on DAZN and other legitimate platforms were researched individually; an account or free tier is not an embed licence. The app does not scrape protected streams, bypass DRM/geographic controls, or advertise paid channels as free.

Run `node scripts/update-epg.cjs` to refresh the programme snapshot, `node tests/smoke.cjs` for deterministic UI/catalogue checks, `node tests/probe-sources.cjs` for the network-path audit, and `playwright-cli run-code --filename=tests/browser-full-playback-audit.js` from an open Playwright session for the full 57-entry UI playback audit. GitHub Actions refreshes the guide twice daily. See `QA_REPORT.md`, `SOURCES.md`, and `CODEX_HANDOFF.md` for evidence and limitations.

## v0.10 — Sports playback and provider directory

The in-app Sports dashboard includes direct, one-click HLS sources for Red Bull TV, More Than Sports TV, Teledeporte (RTVE Spain), Motorvision free FAST and World of Freesports. Four decoded at 1920×1080; Teledeporte decoded at its 1280×720 source maximum. Clicking those cards automatically starts the associated channel inside Global TV Hub. DF1 remains unavailable because its official source blocks Spain.

Official access entries now cover football, Formula 1, tennis, basketball, ice hockey, golf, cricket, rugby, handball, American football, athletics and other Olympic sports. They do not silently redirect and are not mislabelled as working streams. A licensed provider connection is still required before any subscription or provider-controlled event can play inside this independent PWA.

**Important:** These sources received a new short Spain browser and quality screen on 21 October 2026, documented in `SOURCES.md`. That does not guarantee future CORS, worldwide rights, uptime, audio or long-run stability. The player automatically retries configured alternatives and offers quality choices when the manifest advertises them.

**Premium sports:** Sky Sport F1, Sky Sports UK, full Formula 1 DAZN Spain and other DRM-protected paid services have no public licensed embeddable feed here. They remain marked unavailable for in-app playback; their entries must not trigger provider redirects, source-entry prompts, or misrepresent other sports content as premium F1/football.

**QA:** Node smoke tests should verify channel catalogue, one-click sport-card routing, seven navigation routes, private optional custom stream storage, no website redirect, and service worker version bump. GitHub Pages deployment should pass on main.

**Source references:** https://github.com/iptv-org/iptv/blob/master/streams/at.m3u ; https://github.com/iptv-org/iptv/blob/master/streams/de.m3u ; https://github.com/iptv-org/iptv/blob/master/streams/es.m3u ; https://morethansports.tv ; https://redbull.tv ; https://motorvision.tv .

## v0.7 — Spain source feedback
ARD previously selected its domestic stream before the international source. The player now prioritizes the international feed. A video decoder reporting playback does not mean the programme is not subject to rights restrictions: use Try another feed, or use Report rights slate when the broadcaster replaces the programme picture. The old football screenshot has been removed from the generic player overlay. More free-to-view German channels have been added as public stream candidates; source availability and CORS remain unverified from Spain.
