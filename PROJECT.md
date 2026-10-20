# Global TV Hub

## Purpose

Global TV Hub is a static GitHub Pages PWA that keeps lawful German, international and sports viewing inside one premium dark dashboard whenever a browser-compatible source or authorised embed exists.

## Canonical locations

- Local project: `C:\Users\acer\AI-Workspace\Projects\Active\global-tv-hub`
- Repository: `https://github.com/Maxi1412/global-tv-hub`
- Branch: `main`
- Live app: `https://maxi1412.github.io/global-tv-hub/`

## Product constraints

- Preserve the approved interface represented by the three files in `design-reference/`.
- Do not claim manifest reachability is playback confirmation.
- Do not bypass DRM or geographic controls, extract subscription streams, or substitute unlicensed premium feeds.
- Preserve local favourites, history, custom channels, authorised linked feeds and diagnostics.
- Keep normal channel selection inside the PWA; advanced manual sources remain optional settings, not the default experience.

## Verification

Run the syntax checks and `node tests/smoke.cjs` before every deployment. Use `tests/probe-sources.cjs` for network-path evidence, then perform real browser playback tests separately.
