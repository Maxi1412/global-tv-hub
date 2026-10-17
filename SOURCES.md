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

## v0.6 — Direct free sports TV, not premium race rebroadcasts
- Red Bull TV: https://rbmn-live.akamaized.net/hls/live/590964/BoRB-AT/master.m3u8 (1080p rendition reported independently; ES/EU FAST alternatives in data.js)
- More Than Sports TV: https://mts1.iptv-playoutcenter.de/mts/mts-web/playlist.m3u8 (1080p master public listing, German free TV; browser CORS unverified)
- Teledeporte Spain: https://rtvelivestream.rtve.es/rtvesec/tdp/tdp_main.m3u8 (RTVE public 720p listed feed, alternate in data.js)
- DF1 Germany: https://dbjwcot8t7nyd.cloudfront.net/out/v1/9d068a9428444b458324ad77b5a0a4b8/index.m3u8 (German free sports, geo restrictions possible)
- Motorvision free FAST: https://stream.ads.ottera.tv/playlist.m3u8?network_id=535 (partner channel, Rakuten fallback)
- World of Freesports: https://mainstreammedia-worldoffreesportsintl-rakuten.amagi.tv/hls/amagi_hls_data_rakutenAA-mainstreammediafreesportsintl-rakuten/CDN/master.m3u8
- **Not available:** Sky Sport F1/Sky Sports UK or full DAZN F1 licensed live race streams without authorised paid integration. No open stream claimed.
- Source discovery from IPTV-org public listings is not playback testing; verify CORS, manifest, H.264, rights in Spain before promoting a feed as working.

## v0.7 — additional public channel candidates (not verified in Spain)
- tagesschau24: https://tagesschau.akamaized.net/hls/live/2020115/tagesschau/tagesschau_1/master.m3u8
- ALEX Berlin: https://alex-stream.rosebud-media.de/bounce/alexlivetv50.smil/index.m3u8
- Dokusat: https://muc3.iptv-playoutcenter.de/dokusat/dokusat1/playlist.m3u8
- hr-fernsehen: https://hrhls.akamaized.net/hls/live/2024525/hrhls/index.m3u8
- BR Nord: https://mcdn.br.de/br/fs/bfs_nord/hls/de/master.m3u8
- Terra Mater WILD German: https://53ff3982.wurl.com/master/f36d25e7e52f1ba8d7e56eb859c636563214f541/UmxheHhUVi1ldV9UZXJyYU1hdGVyV2lsZF9ITFM/playlist.m3u8
- https://github.com/iptv-org/iptv/blob/master/streams/de.m3u
- ARD international rights: https://hilfe.ard.de/mediathek/verfuegbarkeit-und-verweildauer-mt/abruf-von-livestreams-im-ausland/
