# Project State

**Updated:** 18 October 2026

- Published release: v0.8.0 implementation at `12e33b5ca9470fc090669fea47ec74585f9d7e15`; previous baseline v0.7.1 was `16ef64bac6a4ca556c7d1868b2689d934a479c83`.
- v0.8.0 includes HLS.js-first Chromium playback, advancing-video confirmation, Spain source matrix, dead/blocked source cleanup, official Hamburg 1 embed, stronger network-path audit and documentation refresh.
- Spain browser screen: 21 retained HLS channels confirmed advancing in the repaired local build; ARD and hr displayed programme-rights slates. Hamburg 1 official embed also played in app.
- Retained network paths: 25 of 25 HLS URLs returned manifests, media playlists and segment bytes from the ES test network.
- Known unavailable: ZDF family 24/7 channels, ARTE current programme, DF1, private German broadcasters and premium sports without authorised integration.
- Local v0.8 final QA is complete: syntax, smoke, 25/25 ES network paths, responsive browser checks, embedded-player layout and offline shell passed.
- GitHub PWA QA and Pages deployment passed. The exact live app was re-tested: all 21 HLS channels confirmed advancing, Hamburg 1 loaded in app, ZDF stayed honestly unavailable, and the mobile Guide had no horizontal overflow.
- Next gate: physical Android/TV testing, longer stability/audio/latency samples, source-owner provenance work, premium-provider partner outreach and licensed EPG selection.
