# Global TV Hub v0.8.0 — Spain-screened in-app playback

Global TV Hub is a static PWA for German, international and sports television. The approved premium dark dashboard is unchanged. Selecting a configured channel stays inside the app.

The v0.8 player prefers HLS.js in Chromium instead of trusting Chromium's unreliable native-HLS claim. This fixes seven feeds that previously showed a first frame or fired `playing` and then stopped at 0:00. A source is recorded as successful only after decoded video time advances. The player still distinguishes successful transport from a broadcaster programme-rights slate.

On 18 October 2026, every configured HLS channel was exercised in Chrome on Windows through an ES network exit. Moving picture was observed for 19 channels; ARD and hr transported video but showed broadcaster rights-blackout slates during the sample. Five ZDF/ARTE-family 24/7 sources, DF1's obsolete source, and Hamburg 1's obsolete HLS source were removed from automatic HLS attempts. Hamburg 1 now uses its official YouTube live embed inside the existing player. The 25 retained public HLS source URLs all passed a manifest, media-playlist and small segment-sample audit from the same ES network; this remains separate from long-run playback stability or rights clearance.

Premium RTL/ProSieben/Sat.1, Sky, DAZN, F1, football and similar services remain unavailable in the built-in player unless the rights holder supplies an authorised third-party integration. The app does not scrape protected streams, bypass DRM/geographic controls, or advertise paid channels as free.

Run `node tests/smoke.cjs` for deterministic UI/catalogue checks and `node tests/probe-sources.cjs` for a network-path audit. See `QA_REPORT.md`, `SOURCES.md`, and `CODEX_HANDOFF.md` for evidence and limitations.

## v0.6 — Direct sports streams

The in-app Sports dashboard includes direct, one-click HLS sources for Red Bull TV, More Than Sports TV, Teledeporte (RTVE Spain), Motorvision free FAST and World of Freesports. Clicking those playable cards selects the associated live TV channel and automatically attempts playback inside Global TV Hub. DF1 remains listed for honest discovery but is not offered as playable because its current official source blocks Spain. No external site or manual source entry is required for the retained free sources.

**Important:** These sources received a short Spain browser screen on 18 October 2026, documented in `SOURCES.md`. That does not guarantee future CORS, worldwide rights, uptime, audio or long-run stability. The player automatically retries configured alternatives and offers quality choices when the manifest advertises them.

**Premium sports:** Sky Sport F1, Sky Sports UK, full Formula 1 DAZN Spain and other DRM-protected paid services have no public licensed embeddable feed here. They remain marked unavailable for in-app playback; their entries must not trigger provider redirects, source-entry prompts, or misrepresent other sports content as premium F1/football.

**QA:** Node smoke tests should verify channel catalogue, one-click sport-card routing, seven navigation routes, private optional custom stream storage, no website redirect, and service worker version bump. GitHub Pages deployment should pass on main.

**Source references:** https://github.com/iptv-org/iptv/blob/master/streams/at.m3u ; https://github.com/iptv-org/iptv/blob/master/streams/de.m3u ; https://github.com/iptv-org/iptv/blob/master/streams/es.m3u ; https://morethansports.tv ; https://redbull.tv ; https://motorvision.tv .

## v0.7 — Spain source feedback
ARD previously selected its domestic stream before the international source. The player now prioritizes the international feed. A video decoder reporting playback does not mean the programme is not subject to rights restrictions: use Try another feed or Programme blocked? to try the next configured source. The old football screenshot has been removed from the generic player overlay. More free-to-view German channels have been added as public stream candidates; source availability and CORS remain unverified from Spain.
