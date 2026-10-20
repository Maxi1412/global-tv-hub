# Decisions

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
