# Global TV Hub v0.9.0 — Full-HD-first Spain-screened playback

Global TV Hub is a static PWA for German, international and sports television. The approved premium dark dashboard is unchanged. Selecting a configured channel stays inside the app.

The v0.9 player prefers HLS.js in Chromium, records success only after decoded video time advances, and selects the highest stable rendition up to 1080p. ALEX is intentionally capped at 720p because its advertised 1080p rendition stalled repeatedly; Auto remains available in the quality menu.

On 21 October 2026, every configured channel was rechecked in Chrome on Windows through an ES network exit. All 21 HLS channels confirmed advancing after the Full-HD-first change: 16 decoded at 1920×1080, four at 1280×720 and QVC at 960×540. Hamburg 1's official YouTube embed decoded at 854×480. Every one of the 25 retained HLS URLs also passed manifest, media-playlist and small segment-path checks. These short samples do not guarantee future uptime, audio, every device or programme rights.

Premium RTL/ProSieben/Sat.1, Sky, DAZN, F1, football and similar services remain unavailable in the built-in player unless the rights holder supplies an authorised third-party integration. Joyn, Zattoo, FIFA+ on DAZN and other legitimate platforms were researched individually; an account or free tier is not an embed licence. The app does not scrape protected streams, bypass DRM/geographic controls, or advertise paid channels as free.

Run `node tests/smoke.cjs` for deterministic UI/catalogue checks and `node tests/probe-sources.cjs` for a network-path audit. See `QA_REPORT.md`, `SOURCES.md`, and `CODEX_HANDOFF.md` for evidence and limitations.

## v0.6 — Direct sports streams

The in-app Sports dashboard includes direct, one-click HLS sources for Red Bull TV, More Than Sports TV, Teledeporte (RTVE Spain), Motorvision free FAST and World of Freesports. Clicking those playable cards selects the associated live TV channel and automatically attempts playback inside Global TV Hub. DF1 remains listed for honest discovery but is not offered as playable because its current official source blocks Spain. No external site or manual source entry is required for the retained free sources.

**Important:** These sources received a new short Spain browser and quality screen on 21 October 2026, documented in `SOURCES.md`. That does not guarantee future CORS, worldwide rights, uptime, audio or long-run stability. The player automatically retries configured alternatives and offers quality choices when the manifest advertises them.

**Premium sports:** Sky Sport F1, Sky Sports UK, full Formula 1 DAZN Spain and other DRM-protected paid services have no public licensed embeddable feed here. They remain marked unavailable for in-app playback; their entries must not trigger provider redirects, source-entry prompts, or misrepresent other sports content as premium F1/football.

**QA:** Node smoke tests should verify channel catalogue, one-click sport-card routing, seven navigation routes, private optional custom stream storage, no website redirect, and service worker version bump. GitHub Pages deployment should pass on main.

**Source references:** https://github.com/iptv-org/iptv/blob/master/streams/at.m3u ; https://github.com/iptv-org/iptv/blob/master/streams/de.m3u ; https://github.com/iptv-org/iptv/blob/master/streams/es.m3u ; https://morethansports.tv ; https://redbull.tv ; https://motorvision.tv .

## v0.7 — Spain source feedback
ARD previously selected its domestic stream before the international source. The player now prioritizes the international feed. A video decoder reporting playback does not mean the programme is not subject to rights restrictions: use Try another feed or Programme blocked? to try the next configured source. The old football screenshot has been removed from the generic player overlay. More free-to-view German channels have been added as public stream candidates; source availability and CORS remain unverified from Spain.
