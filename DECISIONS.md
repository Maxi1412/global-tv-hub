# Decisions

## 21 October 2026

- Count catalogue entries separately from playable integrations: publish “55 listed · 21 HLS + 1 official embed”, never “55 working channels” or an ambiguous “22 in-app sources”.
- Never reuse a dated audit as a current-device claim. Show `Ready to test`, `Working now on this device`, or `Unavailable` according to current local evidence.
- A direct `#live`/installed-PWA launch cannot rely on autoplay because browsers may require a user gesture. Present a real Play button and do not leave the UI on an indefinite “Preparing” status.
- Require actual browser media evidence in the full-catalogue audit: decoded dimensions, playing/ready state, buffer and advancing video across a stability interval. A valid manifest alone is not playback proof.
- Treat an official embedded player as confirmed only when its inner video can be observed advancing, not merely when an iframe loads.
- Preserve genuine source ceilings. Do not upscale or label a 720p, 540p or 480p source as 1080p.
- Do not treat another platform's consumer playback as a reusable feed. Accounts, subscriptions, tokens, DRM, territory rules and domain allowlists remain controlled by that provider; add premium playback only through an authorised integration.

- Apply a single rule to every sports card: only a channel with a configured in-app source and advancing-video evidence receives `Play in app`. All other cards identify the official service and access limitation.
- Keep provider details at the top of Sports Hub and focus them without scrolling. The prior shared bottom panel caused the reported downward jump and made different sports appear identical.
- Add legitimate sport-specific providers for basketball, ice hockey, golf, cricket, rugby, handball, American football and athletics, but do not turn an official website, free account or subscription into a claimed PWA stream.
- Prefer the highest stable rendition up to 1080p for built-in HLS playback. Preserve Auto as a user-selectable fallback.
- Cap ALEX at 720p: its advertised 1080p rendition repeatedly stalled while 720p advanced reliably.
- Do not label every channel Full HD. Publish exact source ceilings: four HLS channels at 720p, QVC at 540p and Hamburg 1 at 480p.
- Do not add official ARD-family streams that return 403 from Spain, even when their manifests are visible on broadcaster pages.
- Treat Joyn and Zattoo as legitimate viewing platforms, not source feeds. Account access does not grant a third-party embed licence.
- Keep real-time EPG empty until a stable, licensed and browser-consumable data source is verified.
- Supersede that pending state for v0.12: use IPTV-EPG.org's explicitly free XMLTV links, exact XMLTV channel IDs and a same-origin compact snapshot. Preserve an honest empty state for any channel without an exact match, display source freshness, and never treat schedule availability as playback entitlement.
- Refresh the compact guide twice daily through GitHub Actions. Keep only a rolling three-day window so phones do not download the full Germany, Spain and UK country files.

## 18 October 2026

- Keep the approved premium dark dashboard visually intact. Functional player/source changes may use the existing player frame.
- Prefer HLS.js in Chromium; `canPlayType('application/vnd.apple.mpegurl') === 'maybe'` was proven unreliable on the test machine.
- Record playback success only after decoded dimensions are non-zero and video time advances; a transient `playing` event is insufficient.
- Treat broadcaster rights slates as working transport but unavailable programming.
- Remove automatic source attempts proven blocked or dead in Spain instead of presenting repeated failures as playable channels.
- Use Hamburg 1's official YouTube embed inside the player because its legacy HLS endpoint is dead and the broadcaster's own live page uses that embed.
- Keep DF1 unavailable: its old hostname is dead and its current official CDN explicitly blocks Spain.
- Keep premium channels unavailable until the rights holder provides a licensed embed, SDK or partner feed. A consumer subscription alone is not an integration licence.
- Treat RTL's public player documentation as a partner lead, not an integration: it requires domain whitelisting/activation and does not grant live-TV content entitlement.
- Do not frame DAZN: its Spain consumer terms explicitly require consent for embedding the service in another site.
