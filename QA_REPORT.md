# Global TV Hub — QA pass (2026-10-17)

## Verified
- GitHub commit on main contains index.html, manifest.webmanifest, sw.js, icon.svg and sources.
- GitHub Actions **PWA Quality Checks** completed successfully on commit 72ef84f75750a09a146d5675996505ede95361e8.
- HTML embedded JavaScript and service worker compile using Node VM validation.
- Required routes (Home, Live TV, Sports, Guide, Favourites, Search, Settings), favourites and official provider cards pass structural checks.
- Mobile navigation corrected: icon spans now remain visible at narrow widths.

## Research additions
- German Sky Sport 1 HD, Sky Sport 2 HD, Sky Sport NFL; WOW streaming portal.
- UK Sky Sports Main Event, Sky Sports Premier League, Sky Sports Football; official viewing pages.
- Existing F1, Sky Sport F1, Bundesliga, DAZN España, MotoGP, Sportschau and ZDF Sport links retained.

## Still unverified
- Site is not published until the GitHub Pages setting is enabled by repository owner.
- Visual screenshot/layout on actual mobile and desktop device.
- Real broadcast playback, direct HLS availability/CORS/DRM/geoblocking from Spain.
- Actual 720p/1080p/4K source quality, startup speed or buffering performance.
- PWA installation across devices; SVG-only icon has varying platform compatibility.
- EPG integration, programme times, provider sign-in, sync database.

## Design assets
The initial hosted GitHub page is a lightweight self-contained functioning preview inspired by the approved images. The earlier local v0.2 project package and the three original full-resolution designs were not uploaded to this repository. A future Git-capable asset sync is required to preserve the exact reference imagery and richer v0.2 layouts in this remote repository.
