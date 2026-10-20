# Project State

**Updated:** 18 October 2026

- Published baseline: v0.7.1 at `16ef64bac6a4ca556c7d1868b2689d934a479c83`.
- v0.8.0 work: HLS.js-first Chromium playback, advancing-video confirmation, Spain source matrix, dead/blocked source cleanup, official Hamburg 1 embed, stronger network-path audit, documentation refresh.
- Spain browser screen: 21 retained HLS channels confirmed advancing in the repaired local build; ARD and hr displayed programme-rights slates. Hamburg 1 official embed also played in app.
- Retained network paths: 25 of 25 HLS URLs returned manifests, media playlists and segment bytes from the ES test network.
- Known unavailable: ZDF family 24/7 channels, ARTE current programme, DF1, private German broadcasters and premium sports without authorised integration.
- Local v0.8 final QA is complete: syntax, smoke, 25/25 ES network paths, responsive browser checks, embedded-player layout and offline shell passed.
- Deployment gate: commit to `main`, verify GitHub Actions/Pages, then re-test the exact live v0.8 URL.
