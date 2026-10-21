# Project State

**Updated:** 21 October 2026

- Published release: v0.10.0 implementation at `025e09af06c7865b917254f3bd562ca21cf47504`.
- v0.10.0 fixes the repeated sports-card/forced-scroll behavior, applies one verified playback rule to all sports cards, and adds basketball, ice hockey, golf, cricket, rugby, handball, American football and athletics discovery.
- Sports Hub: five in-app channels confirmed advancing locally in Spain—four at 1080p and Teledeporte at its 720p source maximum. The other 33 cards show specific official access status without claiming in-app playback.
- Spain browser screen: all 21 HLS channels confirmed advancing after the change. Sixteen decoded at 1080p, four at 720p and QVC at 540p. Hamburg 1's official embed played at 480p.
- Retained network paths: 25 of 25 HLS URLs again returned manifests, media playlists and segment bytes from the ES test network.
- Known unavailable: ZDF family 24/7 channels, ARTE current programme, DF1, private German broadcasters and premium sports without authorised integration.
- Local and deployed v0.10 QA is complete: syntax, deterministic QA, 33/33 provider-card behavior, mobile layout, 25/25 ES network paths, 21/21 HLS playback checks and the Hamburg 1 official embed passed. PWA QA and Pages deployment both completed successfully.
- Next gate: physical Android/TV testing, longer stability/audio/latency samples, source-owner provenance work, premium-provider partner outreach and licensed EPG selection.
