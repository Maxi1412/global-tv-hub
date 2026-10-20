# Project State

**Updated:** 21 October 2026

- Published release: v0.8.0 at `ba5e87ebda226c6ce2e2936ec62834dbd6a853b0`; v0.9.0 is locally verified and pending publication.
- v0.9.0 adds Full-HD-first HLS selection with a stable 720p ceiling for ALEX, refreshed Spain source evidence, current platform research and exact quality disclosure.
- Spain browser screen: all 21 HLS channels confirmed advancing after the change. Sixteen decoded at 1080p, four at 720p and QVC at 540p. Hamburg 1's official embed played at 480p.
- Retained network paths: 25 of 25 HLS URLs again returned manifests, media playlists and segment bytes from the ES test network.
- Known unavailable: ZDF family 24/7 channels, ARTE current programme, DF1, private German broadcasters and premium sports without authorised integration.
- Local v0.9 implementation QA is complete: syntax, smoke, 25/25 ES network paths and 21/21 HLS playback checks passed. Deployment verification is still pending.
- Next gate: physical Android/TV testing, longer stability/audio/latency samples, source-owner provenance work, premium-provider partner outreach and licensed EPG selection.
