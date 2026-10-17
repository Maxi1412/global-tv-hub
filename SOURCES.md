# Global TV Hub — sports, quality and source status

Updated 17 October 2026. This prototype is an independent directory, not a stream rebroadcaster. The six HLS entries are unverified candidates; the browser may fail due to territory rights, CORS, DRM, outages or player compatibility. Do not label candidates confirmed LIVE or HD.

## Free and broadcaster routes
- ARD: https://www.ardmediathek.de/LIVE — geoblocking can apply to individual programmes.
- ZDF: https://www.zdf.de/live-tv — continuous streams are generally Germany-restricted.
- ARTE: https://www.arte.tv/de/live/ — some programming may be restricted by territory.
- SPORT1: https://www.sport1.de/tv-video/tv — free coverage varies by event.
- Sportschau: https://www.sportschau.de/ — selected free live events and highlights.
- ZDF Sport: https://www.zdf.de/sport — selected free events and highlights.

## Paid official sports services
- DAZN España / DAZN F1: https://www.dazn.com/es-ES/home
- Movistar Plus+: https://ver.movistarplus.es/
- Sky Deutschland Formula 1: https://www.sky.de/sport/motorsport/formel1
- Sky Bundesliga: https://www.sky.de/sport/fussball/bundesliga
- Sky Sports F1 UK: https://www.skysports.com/watch/sky-sports-f1
- RTL+ (selected F1 races/events): https://plus.rtl.de/
- DAZN Deutschland: https://www.dazn.com/de-DE/home
- Eurosport: https://www.eurosport.es/

## HD-first design
- Use adaptive HLS AUTO by default, with capLevelToPlayerSize enabled where supported to avoid unneeded bandwidth.
- Report source-advertised resolution only after manifest parsing; actual rendering can be lower.
- A higher quality than the broadcaster supplies cannot be created in the app.
- Authenticated sports streams are linked to the official service; do not scrape DRM, passwords or private URLs.
- Judge performance on real Spain broadband/mobile networks; measure join time, buffering, playback bitrate, rebuffering and live latency.

## Future QA tasks
- Confirm live stream permission and availability in Spain. Track results per provider/date/browser/device.
- Integrate a licensed EPG. Never display invented live match times.
- Add image assets from the locally built original v0.2 package; the first public preview is deliberately lightweight and self-contained.
- Validate PWA install on Android Chrome and on desktop browsers; an SVG-only manifest icon can have platform-specific limitations.
