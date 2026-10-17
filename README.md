# Global TV Hub

German live television and sports directory — responsive, installable PWA preview for desktop and Android.

## Open the app

After GitHub Pages is enabled under Settings → Pages → Deploy from a branch → main / (root), use the GitHub Pages URL shown in settings.

The repository is currently named **global-tv-hub.** (notice the trailing period). Rename it in Settings → General to **global-tv-hub** for a simpler site URL, then configure Pages.

## Features (public preview v0.3)
- Dark TV dashboard based on approved product style, responsive navigation for PC and mobile.
- 19 channel catalogue entries with broadcaster-owned official links.
- Six unverified public HLS candidates for ARD, ZDF, ARTE, 3sat, ZDFinfo and ZDFneo.
- HLS playback through browser/native HLS or pinned hls.js engine (Auto / best quality source).
- Sports directory: DAZN Spain, Movistar, Sky Deutschland F1 and Bundesliga, UK Sky Sports F1, RTL+, Sportschau, ZDF Sport, MotoGP, tennis.
- Search, country/type filtering, persistent browser-local favourites.
- TV guide placeholder that makes no claims about current programming.
- Offline PWA shell, manifest and SVG icon. See browser-specific icon/install limitations below.
- Automatic QA checks through GitHub Actions on code changes.

## Source quality and access
**Direct HLS URLs are unverified candidates, not guaranteed working channels or verified 1080p broadcasts.** Subscriptions, geographic rights, CORS, content protection and provider quality settings apply. Check real performance on a Spanish connection. For paid content, cards open official provider websites; no DRM bypass or illicit restreaming is provided.

No backend or cloud database yet; favourites stay on your current device. This is a functional lightweight online preview, not yet a full clone of the three user-approved artwork mockups. The more detailed local v0.2 source package and original design images remain to be synced by a Git-capable development environment in the future. Do not overwrite this online preview without comparing the new implementation.

## QA / development
- Run `node tests/qa.cjs` — structural/syntax checks.
- Open the published page on desktop/mobile to test navigation, search and favourites.
- Verify HLS, CORS, geo restrictions, measured resolution, buffering and provider access **on an actual connection in Spain**.
- Replace generic sports portal links with event-deep links only when official provider endpoints allow it.
- A licensed EPG is required before showing real programme titles/times.
- Full PWA installability requires testing on Android Chrome; SVG-only icon support differs by browser. Add real PNG 192×192 and 512×512 icons before claiming cross-platform installability.
- Static GitHub Pages cannot host a synchronised per-user database; choose a secure backend and auth later if wanted.

See [SOURCES.md](SOURCES.md) for official broadcasters, sports services and HD guidelines.
