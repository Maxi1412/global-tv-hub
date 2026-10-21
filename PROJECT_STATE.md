# Project State

**Updated:** 21 October 2026

- Release candidate: v0.14.0 visible-programme audit and transport/status correction; publish to canonical `main` after final verification.
- The approved premium dark dashboard, favourites, custom streams, local diagnostics, logos and programme guide are preserved.
- The app no longer calls decoded transport “working.” Current-device results use `Signal decoded`; programme availability requires visible-picture review and can be `Programme blocked` separately.
- Corrected the catalogue header: there are 55 listed channels, **21 configured HLS players and one official embed**, not 22 universally working feeds.
- Full ES Chrome UI audit: 21/21 HLS transports decoded and advanced; Hamburg 1's official embedded video also decoded and advanced; 33/33 no-source channels remained honestly unavailable; zero audit/UI failures.
- Separate two-frame visible-content review found actual programming on 20 HLS channels and ARD's official programme-rights slate on Das Erste. Both Das Erste feeds transported 1080p, but the scheduled programme was unavailable in Spain.
- Quality ceiling: 16 HLS channels at 1920×1080; ALEX, hr, Teledeporte and tagesschau24 at 1280×720; QVC at 960×540; Hamburg 1 official embed at 854×480. Lower source ceilings are not advertised as Full HD.
- Sports playback subset: More Than Sports TV, Motorvision, World of Freesports and Red Bull TV at 1080p; Teledeporte at 720p. Premium/provider sports remain directory entries until an authorised browser integration is supplied.
- Joyn's own ProSieben player returned `CODE: GEO_BLOCKED` in Spain. Its SAT.1 player failed entitlement and exposed no video. Joyn's CSP and ZDF's SAMEORIGIN header prevent lawful framing on this origin.
- `tests/browser-full-playback-audit.js` is the transport/UI gate for all 55 entries; `tests/browser-visual-content-audit.js` captures the actual picture for manual rights-slate/programme review.
- Programme guide remains: real current/upcoming/next-day data for 54 channels, with Terra Mater WILD explicitly unmatched; guide availability does not imply playback entitlement.
- Known unavailable in Spain/in this independent static PWA: ZDF-family 24/7 channels, ARTE current programming, DF1, private German broadcasters and protected premium sports without a supported partner integration.
- Next gate: physical Android/TV-browser testing and longer duration stall/latency monitoring. Short dated playback samples cannot guarantee future CDN uptime or programme rights.

