# Global TV Hub — sports, quality and source status

Updated 18 October 2026. This PWA is an independent directory/player, not a broadcaster. Source URLs remain controlled by their owners and can change or restrict individual programmes. “Screened” below means a short Chrome/Windows sample through a confirmed ES network exit with advancing video and a visually inspected frame; it is not a long-run uptime promise or rights clearance.

## v0.8 Spain browser screen

| Channel | Result in Spain | Highest rendered sample | Notes |
|---|---|---:|---|
| ALEX Berlin | Moving video | 1280×720 | Repaired by preferring HLS.js over Chromium native HLS. |
| Dokusat | Moving video | 1920×1080 | Public playout candidate; 1080p observed. |
| hr-fernsehen | Programme blackout | 960×540 | Transport worked; broadcaster rights slate was visible. |
| BR Nord | Moving video | 1920×1080 | Public broadcaster CDN. |
| Terra Mater WILD | Moving video | 960×540 | Manifest advertises up to 1080p. |
| Red Bull TV | Moving video | 960×540 | Free channel content; not premium live Formula 1. |
| More Than Sports TV | Moving video | 1920×1080 | Sports programming observed. |
| Teledeporte | Moving video | 1024×576 | Repaired by HLS.js; cycling was visible during the sample. |
| DF1 | Unavailable | — | Old hostname no longer resolves; current official CDN explicitly blocks Spain. |
| Motorvision | Moving video | 854×480 | Repaired by HLS.js; motoring programme observed. |
| World of Freesports | Moving video | 848×480 | Free FAST feed. |
| Das Erste / ARD | Programme blackout | 960×540 | Transport worked; broadcaster rights slate was visible. |
| ZDF | Geo blocked | — | 403/ORB in Spain; ZDF confirms 24/7 streams are Germany-only. |
| ARTE | Geo blocked | — | Direct endpoints returned 403/ORB; official embed reported the programme unavailable in Spain. |
| 3sat | Geo blocked | — | 403/ORB in Spain; automatic attempt removed. |
| ZDFinfo | Geo blocked | — | 403/ORB in Spain; automatic attempt removed. |
| ZDFneo | Geo blocked | — | 403/ORB in Spain; automatic attempt removed. |
| tagesschau24 | Moving video | 960×540 | Repaired by HLS.js. |
| KiKA | Moving video | 1920×1080 | Moving programme observed. |
| NDR International | Moving video | 960×540 | Repaired by HLS.js. |
| WDR | Moving video | 1280×720 | CDN redirected to a playable international path. |
| Hamburg 1 | Official embedded video | 854×480 | Official YouTube live player replaces dead legacy HLS. |
| NRWision | Moving video | 1280×720 | Moving programme observed. |
| QVC Deutschland | Moving video | 960×540 | Moving programme observed. |
| DW English | Moving video | 1920×1080 | Advancing playback observed. |
| DW Español | Moving video | 960×540 | Repaired by HLS.js. |
| ARD-alpha | Moving video | 1280×720 | Moving programme observed. |
| BR Süd | Moving video | 1920×1080 | Moving programme observed. |

The retained catalogue now has 21 HLS channels (25 URLs including fallbacks) plus one official embedded player. On the same ES network, all 25 retained HLS URLs returned a valid root manifest, a valid media playlist, and bytes from a media segment. That network-path result is not a substitute for the visual browser rows above.

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

## Premium integration findings

- RTL's published CBC video-player documentation requires each test and production domain to be activated on RTL's URL whitelist. A public player library does not supply RTL+ live-TV entitlement, media identifiers or redistribution permission: https://vms-embed.rtl.de/docs/NGVOD-APIDokumentationv5-021221-1251-444.pdf
- RTL+'s consumer terms prohibit copying or making its content publicly available through other websites. A formal content/technology partnership would be required: https://plus.rtl.de/agb
- DAZN Spain grants a personal, non-transferable streaming licence and explicitly prohibits embedding/framing DAZN in another service without consent: https://www.dazn.com/es-ES/help/articles/29275660114973-terminos-y-condiciones-de-uso-dazn-espana-vigentes-a-partir-del-1-de-agosto-de-2025
- No publicly authorised consumer embed was verified for Joyn, Sky/WOW or Eurosport during this review. Their entries therefore remain unavailable in the player pending a direct partner agreement and supported SDK/feed; this is an evidence boundary, not a claim that private commercial integrations do not exist.

## HD-first design
- Use adaptive HLS AUTO by default, with capLevelToPlayerSize enabled where supported to avoid unneeded bandwidth.
- Report source-advertised resolution only after manifest parsing; actual rendering can be lower.
- A higher quality than the broadcaster supplies cannot be created in the app.
- Authenticated sports streams are linked to the official service; do not scrape DRM, passwords or private URLs.
- Judge performance on real Spain broadband/mobile networks; measure join time, buffering, playback bitrate, rebuffering and live latency.

## Future QA tasks
- Obtain source-owner permission evidence where public listing provenance is incomplete, and repeat longer Spain stability checks per provider/date/browser/device.
- Integrate a licensed EPG. Never display invented live match times.
- Add image assets from the locally built original v0.2 package; the first public preview is deliberately lightweight and self-contained.
- Validate PWA install on Android Chrome and on desktop browsers; an SVG-only manifest icon can have platform-specific limitations.

## v0.6 — Direct free sports TV, not premium race rebroadcasts
- Red Bull TV: https://rbmn-live.akamaized.net/hls/live/590964/BoRB-AT/master.m3u8 (1080p rendition reported independently; ES/EU FAST alternatives in data.js)
- More Than Sports TV: https://mts1.iptv-playoutcenter.de/mts/mts-web/playlist.m3u8 (1080p master public listing, German free TV; browser CORS unverified)
- Teledeporte Spain: https://rtvelivestream.rtve.es/rtvesec/tdp/tdp_main.m3u8 (RTVE public 720p listed feed, alternate in data.js)
- DF1 Germany legacy candidate (deactivated): https://dbjwcot8t7nyd.cloudfront.net/out/v1/9d068a9428444b458324ad77b5a0a4b8/index.m3u8 — old host failed; the current official CDN explicitly blocks Spain.
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
