# Global TV Hub — sports, quality and source status

Updated 21 October 2026. This PWA is an independent directory/player, not a broadcaster. Source URLs remain controlled by their owners and can change or restrict individual programmes. “Screened” below means a short Chrome/Windows sample through a confirmed ES network exit with decoded dimensions, advancing video and a visually inspected frame; it is not a long-run uptime promise, audio certification or rights clearance.

## v0.10 sports directory review

- Direct in-app sports television: More Than Sports TV, Motorvision, World of Freesports and Red Bull TV reconfirmed at 1920×1080; Teledeporte reconfirmed at its 1280×720 maximum. Every sample advanced video and reported ready state 4.
- All 33 provider-only cards were clicked in the browser. Each kept scroll position at zero, named the selected provider and displayed its own access status. None claimed playback or silently opened an external service.
- Added official discovery entries for IIHF TV and NHL.TV/DAZN (ice hockey), Courtside 1891 and NBA League Pass (basketball), Movistar Plus+ and Sky Germany golf, ICC.tv cricket, RugbyPass TV, EHFTV handball, NFL Game Pass, World Athletics+, Olympic Channel and LALIGA+.
- These services control accounts, subscriptions, DRM, territory and event rights. They are provider references, not authorised static HLS feeds for Global TV Hub.

Official services reviewed: https://iihf.tv/ · https://www.nba.com/watch/league-pass-stream/ · https://www.icc-cricket.com/icc-tv · https://rugbypass.tv/home · https://ehftv.com/ · https://worldathletics.org/watch/live · https://www.movistarplus.es/deportes/golf · https://www.sky.de/sport/golf

## v0.9 Spain browser and quality screen

| Channel | Result in Spain | Highest rendered sample | Notes |
|---|---|---:|---|
| ALEX Berlin | Moving video | 1280×720 | 720p remained stable. The advertised 1080p rendition stalled and is deliberately capped. |
| Dokusat | Moving video | 1920×1080 | Public playout candidate; 1080p observed. |
| hr-fernsehen | Moving video | 1280×720 | Highest rendition is 720p. An earlier sample showed a broadcaster rights slate. |
| BR Nord | Moving video | 1920×1080 | Public broadcaster CDN. |
| Terra Mater WILD | Moving video | 1920×1080 | Highest rendition selected and decoded. |
| Red Bull TV | Moving video | 1920×1080 | Free channel content; not premium live Formula 1. |
| More Than Sports TV | Moving video | 1920×1080 | Sports programming observed. |
| Teledeporte | Moving video | 1280×720 | Highest rendition is 720p. |
| DF1 | Unavailable | — | Old hostname no longer resolves; current official CDN explicitly blocks Spain. |
| Motorvision | Moving video | 1920×1080 | Free FAST motoring programme observed. |
| World of Freesports | Moving video | 1920×1080 | Free FAST feed at its highest rendition. |
| Das Erste / ARD | Moving video | 1920×1080 | Moving programme in the current sample; earlier rights slate proves programme-specific blocking can recur. |
| ZDF | Geo blocked | — | 403/ORB in Spain; ZDF confirms 24/7 streams are Germany-only. |
| ARTE | Geo blocked | — | Direct endpoints returned 403/ORB; official embed reported the programme unavailable in Spain. |
| 3sat | Geo blocked | — | 403/ORB in Spain; automatic attempt removed. |
| ZDFinfo | Geo blocked | — | 403/ORB in Spain; automatic attempt removed. |
| ZDFneo | Geo blocked | — | 403/ORB in Spain; automatic attempt removed. |
| tagesschau24 | Moving video | 1280×720 | Highest rendition is 720p. |
| KiKA | Moving video | 1920×1080 | Moving programme observed. |
| NDR International | Moving video | 1920×1080 | Highest rendition selected and decoded. |
| WDR | Moving video | 1920×1080 | CDN redirected to a playable path; highest rendition decoded. |
| Hamburg 1 | Official embedded video | 854×480 | Official YouTube player; no authorised 1080p rendition was found. |
| NRWision | Moving video | 1920×1080 | Reached 1080p after a short quality ramp. |
| QVC Deutschland | Moving video | 960×540 | Moving programme observed. |
| DW English | Moving video | 1920×1080 | Advancing playback observed. |
| DW Español | Moving video | 1920×1080 | Highest rendition selected and decoded. |
| ARD-alpha | Moving video | 1920×1080 | Highest rendition selected and decoded. |
| BR Süd | Moving video | 1920×1080 | Moving programme observed. |

The retained catalogue has 21 HLS channels (25 URLs including fallbacks) plus one official embedded player. All 21 HLS channels confirmed advancing after the v0.9 Full-HD-first change: 16 decoded at 1920×1080, four at their 1280×720 source/stability limit, and QVC at its 960×540 source limit. Hamburg 1's official embed decoded at 854×480. On the same ES network, all 25 HLS URLs returned a root manifest, media playlist and segment bytes. Network-path success is not a substitute for the browser evidence above.

## Platform and integration research — 21 October 2026

- **ARD Mediathek** is the strongest free direct broadcaster source. The configured feeds work in Spain, but programme-specific international rights slates can appear. Official phoenix, ONE, MDR, rbb, SWR and Radio Bremen streams were individually rechecked and returned HTTP 403 from Spain, so they were not added as false-working sources.
- **ZDF** confirms its ZDF/ZDFneo/ZDFinfo/3sat 24/7 streams are Germany-only. Its worldwide event streams are programme-specific and cannot replace those linear channels.
- **Joyn Free** advertises more than 100 German live channels and HD viewing, including ProSieben/SAT.1 channels, with free registration for some streams. No licensed third-party embed/SDK was found, and access remains controlled by Joyn and territory.
- **Zattoo Free** advertises more than 190 channels but explicitly excludes ProSiebenSat.1 and RTL Group channels from its free tier. It requires an account and exposes no authorised static-PWA stream connection.
- **FIFA+ on DAZN** is free after registration and carries selected international football, not every premium league or match. DAZN does not authorise framing its service without consent.
- **UEFA.tv**, **Sportschau**, **ZDF Sport**, **SPORT1**, **Red Bull TV**, **More Than Sports TV**, **Teledeporte**, **Motorvision** and **World of Freesports** remain useful lawful free selections, but their event schedules and territorial rights differ.
- **Formula 1 in Spain** remains DAZN-controlled through 2030 for complete live coverage. RTL shows selected 2026 sessions/races in Germany, and Sky/WOW or Sky Sports/NOW are paid territory-specific services. None supplies this project with a licensed browser feed or partner SDK.
- **Real programme titles and fixtures** remain unconnected. Broadcaster pages expose current schedules, but no stable, licensed, cross-origin EPG feed suitable for this static PWA was verified. The app continues to show no fabricated programme data.

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
- DAZN Spain grants a personal, non-transferable streaming licence and explicitly prohibits embedding/framing DAZN in another service without consent: https://www.dazn.com/en-ES/help/articles/16391473315101-terms-conditions
- No publicly authorised consumer embed was verified for Joyn, Sky/WOW or Eurosport during this review. Their entries therefore remain unavailable in the player pending a direct partner agreement and supported SDK/feed; this is an evidence boundary, not a claim that private commercial integrations do not exist.

## HD-first design
- Start at the highest stable source rendition up to 1080p. ALEX is capped at 720p because its advertised 1080p path stalled in repeated Spain tests.
- Keep Auto available in the quality menu when bandwidth or buffering makes a fixed rendition unsuitable.
- Report source-advertised resolution only after manifest parsing; actual rendering can be lower.
- A higher quality than the broadcaster supplies cannot be created in the app.
- Authenticated sports streams are linked to the official service; do not scrape DRM, passwords or private URLs.
- Judge performance on real Spain broadband/mobile networks; measure join time, buffering, playback bitrate, rebuffering and live latency.

## Future QA tasks
- Obtain source-owner permission evidence where public listing provenance is incomplete, and repeat longer Spain stability checks per provider/date/browser/device.
- Integrate a licensed EPG. Never display invented live match times.
- Preserve the approved design-reference assets and dark dashboard while improving playback and source evidence.
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
