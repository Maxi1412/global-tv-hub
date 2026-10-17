# Global TV Hub — PWA prototype v0.3

A responsive, installable Progressive Web App built from the three user-approved concept screenshots. This is a working frontend prototype and playback integration scaffold; **it is not a live-TV service with confirmed access to all displayed stations**.

## Available now

- Responsive Home, Live TV, Sports Hub, Programme Guide, Favourites, Search and Settings screens. On mobile, Settings remains accessible from the toolbar.
- Official broadcaster/provider actions open verified viewing pages (availability is subject to location/account/rights).
- 28 listed TV stations, including authorised Sky / Eurosport launchers, and six direct HLS URL **candidates** (Das Erste, ZDF, ARTE, 3sat, ZDFinfo, ZDFneo). In-app HTML5/HLS.js playback attempts, error feedback and fallback to official websites are implemented. **Candidates have not been network/geo-verified in Spain.**
- Channels without verified direct streams (RTL, ProSieben, SAT.1, Kabel Eins etc.) launch official providers, not illicit or fabricated feeds.
- Source-based quality selector: HLS streams show the actual variants advertised by their manifest; Auto remains the default and can adapt to network speed. HD delivery is never guaranteed.
- Sports discovery (F1, Bundesliga, Champions League, Premier League, tennis, MotoGP, plus free ARD Sportschau and ZDF Sport options); links to authorised providers. DAZN holds F1 rights for Spain through 2030.
- Persistent favourites and recently played streams (browser localStorage), custom HLS channel registration, local M3U playlist import, and export of individual HLS entries as `.m3u` files that VLC can open.
- Network-first service worker (updates visible on the next online visit), manifest and 192/512px icons for PWA installation; offline *interface shell* only (video feeds always require online access).
- The three original approved UI mockups are preserved in `/design-reference/`. Supporting images inside the working UI are cropped from this AI-generated design artwork.

## How to open

For a **quick UI review**, extract the ZIP and open `index.html` in a browser. File-based opening may not provide PWA installation, clipboard support or HLS streaming.

For actual PWA installation and streaming tests, serve the directory over **HTTPS or localhost**. The user's Windows environment/server setup is not yet verified; Codex should inspect the PC and choose a tested command/hosting approach instead of assuming software or paths.

This project's default data is in `data.js`; front-end interaction logic is in `app.js`; design styling is in `styles.css`.

## Important channel status

**Official site** = researched broadcaster site linked. This does **not** guarantee access from Spain.

**HLS candidate** = a direct URL from public IPTV community catalogue(s) pointing to broadcaster delivery hosts, wired to the player but **not tested** from Spain and not checked for embedding permission. A link may be inaccessible, geoblocked, DRM-protected, CORS-restricted, deprecated, or disallowed for reuse.

No current programmes, sports matches, live status or kick-off times are fabricated. The EPG layout is a placeholder until an authorised live guide is integrated.

## Known limitations

- Browser automation screenshot/visual rendering was unavailable in the build environment (Chromium headless timed out); JS source and route/data smoke tests passed.
- Content playback, DRM and regional access must be verified **on your actual network in Spain**. VLC export only downloads a playlist pointer, not TV content.
- HLS.js is loaded on demand from `https://cdn.jsdelivr.net/npm/hls.js@1/dist/hls.min.js`. It requires an internet connection and a compatible browser. Vendor and version-pin before production if desired.
- Data/preferences are local-device only; no login, sync, recording, server, backend or EPG API is integrated.
- Mobile site layout is coded responsively but needs real browser visual QA.
- Authenticated broadcaster accounts should be used only on their official app/site unless a formal supported integration exists.

## Local validation performed

- `node --check app.js`, `node --check data.js`, `node --check sw.js` — passed.
- `node tests/smoke.cjs` — passed (19 channels, 6 HLS candidates, seven routes, search transition, sports filters, mobile-settings presence and version-aware caching).
- Local HTTP server returned 200 for the app shell.
- Live-source playback tests were **not possible**: no access to remote broadcaster hosts from the tool environment.

See `CODEX_HANDOFF.md` for next stages, reference screenshots, detailed constraints and verified research links.

## GitHub repository and Pages

The repository is `Maxi1412/global-tv-hub`. Keep code, screenshots and documentation here; Git commit history gives a versioned source of truth. It is **not an application database**: favourites and imported playlists still live only in each browser's localStorage.

The repository has been created. To publish with GitHub Pages, configure Settings → Pages → Build and deployment → Source: Deploy from a branch → `main` and `/(root)`; Save. The `.nojekyll` marker permits publication of the `.github` directory without Jekyll processing. Production site must be verified after publication; do not assume it is live just because code was pushed.

The GitHub Actions workflow `.github/workflows/qa.yml` runs syntax and catalogue smoke tests automatically after pushes and pull requests. Browser visual and Spain playback tests remain separate QA gates.

See `QA_REPORT.md` and `CHANGELOG.md` for the verified QA/improvement loop.


## v0.4 — In-app playback and source fallback

- Channel tiles now open the embedded player, never a third-party site. A stream candidate begins connecting automatically after the channel is selected.
- Public broadcaster/CDN candidates include Das Erste international 1080p, ARTE, KiKA international, NDR international, WDR, Hamburg 1, NRWision, QVC, ARD-alpha, BR, and Deutsche Welle English/Spanish. Sources are *unverified for playback on a Spanish connection*. 
- The player tries multiple available sources in order (personal authorised stream first, then catalogue candidates), with error and startup timeout handling. Successful browser playback is remembered locally for future ordering. Video quality selection uses only advertised renditions.
- For RTL, ProSieben, SAT.1, Sky and other DRM/subscription channels, no unrestricted browser-compatible source has been verified; the player stays inside the app with a Connect Source form instead of opening other websites. Private IPTV stream URLs are stored on-device only (not in this repository).
- Sports cards show details within the PWA instead of redirecting. No fictional live TV programme information or sports fixtures.
- **Important:** Publicly indexed playlists do not establish redistributing rights, broadcaster endorsement, geographic availability, CORS capability, or guaranteed HD. The broadcaster/provider controls access and resolution.

## v0.5: Sports streaming architecture and source transparency

- **Published-provider research**: Sky/WOW Germany covers German F1 and Bundesliga with a paid subscription; Sky Sports/NOW UK is a separate paid UK service. DAZN holds the F1 rights in Spain through 2030. No authorised browser-compatible Sky or DAZN HLS feed is presently supplied to this app.
- **Selected legal free coverage**: Red Bull TV (specific live events), UEFA.tv (selected youth, women's and futsal games and highlights), ServusTV On (territory-specific free sporting events) and occasional RTL free-TV F1 races in Germany. A free official website does **not** imply it allows third-party embedding or playback in Spain.
- **In-app source architecture**: Public HLS candidates and user-provided authorised HTTPS HLS feeds remain distinct; adaptive quality comes from the actual playlist, with 720p/1080p offered only when present.
- **Improved playback**: Failed CDN sources fall back without leaving Global TV Hub; one fatal HLS media decode failure gets a local recover attempt before fallback. Startup and stall timeouts are separated, and channel source diagnostics are stored locally.
- **Local privacy**: No provider passwords, tokens or HLS links are stored in the public GitHub repository. Users who have licensed provider feeds can configure them in the app's Settings on their own device.
- **Scope**: This update does not bypass subscription, DRM, or geographic restrictions; it does not embed copyrighted pay-TV feeds from unauthorised sites.

Primary rights and service references (checked October 17, 2026):
- https://dazngroup.com/press-room/dazn-renueva-los-derechos-de-formula-1-en-espana-portugal-y-andorra-hasta-2030/
- https://www.wowtv.de/live-sport
- https://www.sky.de/sport
- https://www.nowtv.com/membership/watch-sky-sports
- https://www.uefa.com/uefatv-faq/
- https://www.redbull.tv/events
- https://www.servustv.com/de/content/seite/sport-livestreams-bei-servustv-on
- https://www.sport1.de/unternehmen/faq
- https://media.rtl.com/pressemappe/Die-Motorsport-Saison-2026-bei-RTL-Deutschland/

**Limit**: Repo smoke tests validate application behavior but **not** real-time media loading, regional availability, stream bitrates, DRM access, or licensing. Test with the actual user's devices in Spain.