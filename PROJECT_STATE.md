# Project State

**Updated:** 21 October 2026

- Release: v0.13.0 full catalogue playback audit and status-truth hardening on canonical `main`.
- The approved premium dark dashboard, favourites, custom streams, local diagnostics, logos and programme guide are preserved.
- Fixed the direct-installed-PWA/`#live` state that could sit indefinitely on “Preparing in-app source”. Direct entry now has an explicit ready/Play state; a catalogue channel click still starts its configured player.
- Corrected the catalogue header: there are 55 listed channels, **21 configured HLS players and one official embed**, not 22 universally working feeds.
- Full ES Android-Chrome-emulation UI audit: 21/21 HLS channels decoded and advanced through an additional 3.5-second stability sample; Hamburg 1's official embedded video also decoded and advanced; 33/33 no-source channels remained honestly unavailable; zero audit/UI failures.
- Quality ceiling: 16 HLS channels at 1920×1080; ALEX, hr, Teledeporte and tagesschau24 at 1280×720; QVC at 960×540; Hamburg 1 official embed at 854×480. Lower source ceilings are not advertised as Full HD.
- Sports playback subset: More Than Sports TV, Motorvision, World of Freesports and Red Bull TV at 1080p; Teledeporte at 720p. Premium/provider sports remain directory entries until an authorised browser integration is supplied.
- Current/on-device state is now visually and textually separate from the dated Spain audit. Blue list dots mean a player is configured, not that a source has already passed on that particular device.
- `tests/browser-full-playback-audit.js` is the repeatable browser gate for all 55 entries. It distinguishes HLS playback, embedded playback, honest unavailability and failure.
- Programme guide remains: real current/upcoming/next-day data for 54 channels, with Terra Mater WILD explicitly unmatched; guide availability does not imply playback entitlement.
- Known unavailable in Spain/in this independent static PWA: ZDF-family 24/7 channels, ARTE current programming, DF1, private German broadcasters and protected premium sports without a supported partner integration.
- Next gate: physical Android/TV-browser testing and longer duration stall/latency monitoring. Short dated playback samples cannot guarantee future CDN uptime or programme rights.

