# Project State

**Updated:** 22 October 2026

- Release prepared: v0.15.0 free FAST sports expansion, pending canonical `main` deployment verification.
- Added FIFA+ German FAST and Tennis Channel International as one-click in-app sports channels. Both decoded audio/video, advanced and showed the expected channel content from Spain at their 1280×720 source maximum.
- Current local catalogue: 57 entries, 23 configured HLS players, one official embed and 33 honest unavailable states. Seven Sports Hub cards now launch the internal player.
- Final clean local Chrome audit: 23/23 HLS transports advanced with audio, Hamburg 1's embedded video advanced, 33/33 no-source entries stayed honest, and there were zero failures, unstable transports or browser errors.
- Spain path audit: all 27 retained HLS URLs, including fallbacks, returned a manifest, media playlist and segment sample; this supports but does not replace browser evidence.
- NRWision's 1080p rendition stalled twice in Chrome, so the player now caps that channel at the stable 720p rendition. The final full audit passed it at 1280×720.
- Published v0.14.1 baseline: a 22 October deployed replay passed all then-current 55 entries (21 HLS, one embed and 33 honest unavailable states). The v0.15.0 local audit above supersedes that count; deployment verification remains pending.
- A fresh third-party-source review found no authorised account-free replacement for the 33 provider-controlled entries. Geo-blocked broadcaster URLs, ANTIK customer/test retransmissions, private IP restreams and subscription-platform playback URLs were not added.
- The approved premium dark dashboard, favourites, custom streams, local diagnostics, logos and programme guide are preserved.
- The app no longer calls decoded transport “working.” Current-device results use `Signal decoded`; programme availability requires visible-picture review and can be `Programme blocked` separately.
- The catalogue header is dynamic and now reports **57 listed channels, 23 configured HLS players and one official embed**.
- The latest deployed two-frame review found actual programming on 19 HLS channels and official programme-rights slates on BR Fernsehen Nord and Süd. Das Erste showed its real 1080p programme after showing ARD's rights slate in an earlier same-day check, demonstrating that the restriction changes by programme.
- Current quality ceiling: 15 HLS channels at 1920×1080; ALEX, hr, Teledeporte, FIFA+, Tennis Channel, tagesschau24 and NRWision at 1280×720; QVC at 960×540. Lower source ceilings are not advertised as Full HD.
- Sports playback subset: More Than Sports TV, Motorvision, World of Freesports and Red Bull TV at 1080p; Teledeporte, FIFA+ and Tennis Channel at 720p. Premium/provider sports remain directory entries until an authorised browser integration is supplied.
- Joyn's own ProSieben player returned `CODE: GEO_BLOCKED` in Spain. Its SAT.1 player failed entitlement and exposed no video. Joyn's CSP and ZDF's SAMEORIGIN header prevent lawful framing on this origin.
- `tests/browser-full-playback-audit.js` is the transport/UI gate for all 57 entries; `tests/browser-visual-content-audit.js` captures the actual picture for manual rights-slate/programme review.
- Programme guide remains: real current/upcoming/next-day data for 54 channels, with Terra Mater WILD, FIFA+ FAST and Tennis Channel explicitly unmatched; guide availability does not imply playback entitlement.
- Known unavailable in Spain/in this independent static PWA: ZDF-family 24/7 channels, ARTE current programming, DF1, private German broadcasters and protected premium sports without a supported partner integration.
- Next gate: physical Android/TV-browser testing and longer duration stall/latency monitoring. Short dated playback samples cannot guarantee future CDN uptime or programme rights.

