# Project State

**Updated:** 21 October 2026

- Published release: v0.12.0 programme guide on canonical `main` at implementation commit `65edc2c732aec31e0176a22765512b9cb9c473ae`.
- Every selected channel now has an in-flow schedule panel below the player with current programme, progress, upcoming programmes and Today/Tomorrow/day-after navigation.
- The generated same-origin EPG snapshot has exact mappings for all 55 fixed catalogue entries and real programme records for 54. Terra Mater WILD remains explicitly unmapped rather than inheriting an incorrect station schedule.
- The full Guide route now shows real now/next data, day controls and German/Sports/News & Culture filters. Guide times use the viewer's local timezone.
- `scripts/update-epg.cjs` filters public free XMLTV country files into the phone-friendly compressed `epg.json.gz`; `.github/workflows/update-epg.yml` refreshes it twice daily without credentials or a paid service.
- v0.11.0 adds real locally stored logos for all 55 fixed channel entries across Home, Live TV, Guide, Search and Favourites while preserving the approved dark dashboard and a text fallback for custom streams.
- The prior v0.10.0 behavior remains: one verified playback rule for sports cards plus basketball, ice hockey, golf, cricket, rugby, handball, American football and athletics discovery.
- Sports Hub: five in-app channels confirmed advancing locally in Spain—four at 1080p and Teledeporte at its 720p source maximum. The other 33 cards show specific official access status without claiming in-app playback.
- Spain browser screen: all 21 HLS channels confirmed advancing after the change. Sixteen decoded at 1080p, four at 720p and QVC at 540p. Hamburg 1's official embed played at 480p.
- Retained network paths: 25 of 25 HLS URLs again returned manifests, media playlists and segment bytes from the ES test network after the logo-only change.
- Known unavailable: ZDF family 24/7 channels, ARTE current programme, DF1, private German broadcasters and premium sports without authorised integration.
- v0.12 deterministic QA, GitHub Actions, Pages deployment and exact public mobile-browser checks passed; results are recorded in `QA_REPORT.md`. The v0.11 logo and playback evidence remains valid because playback sources and catalogue storage keys were not changed.
- Next gate: physical Android/TV testing, longer playback stability/audio/latency samples, ongoing EPG source-health monitoring and premium-provider partner outreach.

