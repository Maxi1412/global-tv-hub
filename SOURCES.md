# Global TV Hub — sports, quality and source status

Updated 23 October 2026. This PWA is an independent directory/player, not a broadcaster. Source URLs remain controlled by their owners and can change or restrict individual programmes. “Screened” means a dated Chrome/Windows sample through an ES network exit with decoded dimensions, advancing video and a visually inspected frame. Audio-decoder evidence is recorded where tested; it is not a long-run uptime promise, every-device guarantee or rights clearance. The v0.16 section is current and pre-release; older dated sections preserve their historical counts.

## v0.16 playback repair and additional sports — pre-release

- A fresh audit of the exact published 57-entry baseline found 22 advancing HLS transports, one advancing official embed, the failed Tennis Channel CORS path and 33 unsupported entries. A manifest that still answers outside a browser is not sufficient: the Rakuten Tennis master stopped supplying `Access-Control-Allow-Origin` and failed actual Chrome playback.
- Tennis Channel International replacement: `https://cdn-uw2-prod.tsv2.amagi.tv/linear/amg01444-tennischannelth-tennischnlintl-lggb/playlist.m3u8`. The public master and selected 1080p playlist reflected the PWA's Origin in CORS; a media segment returned 200 with CORS `*`, and no HLS encryption key tag was present. In the actual PWA, H.264/AAC video/audio advanced for 15 seconds at 1920×1080 after approximately four seconds of startup; tennis programming was visually inspected. Use the stable master, not its generated media paths.
- [The channel owner's March 2026 guide](https://www.tennis.com/news/articles/an-update-on-the-tennis-channel-international-app) identifies Tennis Channel International as free 24/7 FAST and lists LG Channels/LG TV Plus in the UK, Germany and Spain. [LG confirms its Tennis Channel partnership](https://www.lg.com/global/newsroom/news/media-entertainment-solution/lg-channels-is-set-to-offer-new-sports-channels-around-the-globe/). The replacement's delivery identifier is LG GB; these facts establish international FAST identity, not Spain-specific rights to every tournament or a claim of US premium Tennis Channel access.
- Billiard TV source: `https://bbb-billi-streamstak.otteravision.com/bbb/billi/billi.m3u8`, published by the owner's [Billiard TV live player](https://www.watchbilliard.tv/live). Actual PWA startup was approximately 4.8 seconds, followed by 15 seconds of advancing 1920×1080 video/audio with branded billiards instruction visible. This is the free 24/7 billiards channel and its selected matches/instruction.
- FloHockey 24/7: [official channel page](https://www.flohockey.tv/live/213946-flohockey-24-7) and [official YouTube live player](https://www.youtube.com/watch?v=9aMu8HuYpRk). The in-app embed uses `youtube-nocookie.com`. Preroll and a station break appeared before a real hockey game; only the hockey picture was accepted as programme evidence. Auto selected 480p, while manually choosing 1080p in the embedded settings sustained video/audio for 15 seconds. The selected games, delayed games, replays and original shows are not complete NHL coverage; YouTube controls preroll, station availability and its quality menu.
- Candidate capability: 59 catalogue entries, 24 HLS channels, two official embeds and 33 unsupported entries; nine Sports Hub cards route to the internal players. The [complete local channel audit](CHANNEL_AUDIT_2026-10-23.md) passed at 00:32:59 Europe/Paris on 23 October: 24 HLS transports sustained the ten-second gate, two embeds advanced non-advertising video and 33 unsupported entries stayed honest, with zero unstable transports, audit failures or browser errors. This is not a claim that all 59 play.
- Candidate HLS ceilings: 17 at 1080p, six at 720p (ALEX, hr, Teledeporte, FIFA+, tagesschau24, NRWision), and QVC at 540p. Both official embeds sustained 1080p through YouTube's quality settings: Hamburg 1 showed a branded interview with five seconds of advance at 1920×1080 after the player preference persisted from the FloHockey test. Earlier 480p Auto samples describe observed startup, not source ceilings. HLS starts HD-preferred and remains adaptive beneath each channel's ceiling.
- Fresh picture audit of the 22 existing HLS transports found 18 actual programmes plus rights notices on hr, BR Nord, BR Süd and ARD-alpha. Das Erste showed its programme. The repaired Tennis and new Billiard samples add two actual programmes, making 20 actual HLS programme pictures and four rights notices during this window. Decoded transport is reported separately from those notices.
- Candidate syntax/smoke/QA/diff checks passed, as did all 28 retained HLS manifest/media/segment paths, the 390×844 nine-card mobile Sports Hub/logo/overflow check and offline v17 shell reload. A 1.76 Mbps sample adapted 1080p→360p and advanced 37.62 seconds over 40 seconds with a brief adaptation rebuffer; restored-network playback advanced another 10.02 seconds over ten seconds. ARD sustained a 25-second adaptive follow-up and then passed the final full audit. Local gates are complete and ready to deploy; GitHub QA, Pages deployment and exact live-build verification remain pending. The request to make every listed channel playable remains unfinished.

## 23 October expanded mainstream-channel alternatives review

- Reddit recommendations were used as leads, including Famelack/TV.Garden. Its [own source/FAQ statement](https://famelack.com/terms) says it primarily uses IPTV-org, does not host the television itself, cannot guarantee each source's rights and retains geographic restrictions. Its [current public Germany dataset](https://raw.githubusercontent.com/famelack/famelack-data/main/tv/raw/countries/de.json) offers the same geo-blocked broadcaster CDNs for ZDF-family/ARTE/phoenix/MDR/rbb/SWR, and ANTIK operator `test_*` sources for several private stations. The alternative website does not supply a new authorised public feed.
- ntv has its own [24-hour consumer livestream](https://www.n-tv.de/mediathek/livestream/24-Stunden-ntv-Livestream-article9511936.html), beyond RTL+. Its current HTML declares `drm:true` and DRM HLS/DASH media. The media request returned 403, while the page CSP allows `frame-ancestors 'self' *.n-tv.de`; no supported external player integration was found.
- ONE's [official page](https://www.ardmediathek.de/live/one/Y3JpZDovL3dkci5kZS9CZWl0cmFnLTkxOWU4MzNlLWYxYTktNDdmYi1iNmYwLTNmMTllNjVkMDBkMQ) still publishes `mcdn.one.ard.de`, which fails DNS. The community's changed `mcdn-one.ard.de` hostname resolves but its manifest returned 403. It cannot be published as a playback repair on that evidence.
- [TV.de](https://tv.de/) is another legitimate consumer option carrying mainstream German channels. Its Spain/EU portability requires an eligible account and a German purchase or residence verification; no public third-party playback integration was found.
- [United TV/Techlive](https://www.united.tv/) is an additional formal partner lead. It states that rightsholder agreements cover particular territories and B2B sectors; its [March 2026 portfolio](https://techlive.tv/_data/site/379/pg/37/Techlive-UnitedTV-GlobalIPTVChannelsMarch2026.pdf) includes ProSieben, ZDF, SAT.1, SAT.1 Gold and WELT. Commercial premises and distribution agreements are required; no public free stream/SDK for this PWA is supplied.
- The user-supplied livehdtv RTLZWEI/ProSieben pages were previously tested: both exposed only 1024×576 video through a separate host with rotating three-hour tokens, and their advertised embeds did not create a video on the real Global TV Hub origin. No broadcaster authorisation was verified. Extracted tokens and those pages are not connected as channel sources.

## v0.15 supplied-resource follow-up

- The supplied research document was checked lead by lead. Its most useful current result was two free FAST channels that could be tested as direct browser media rather than merely as provider pages: FIFA+ German FAST and Tennis Channel International.
- FIFA+ source: partner-hosted Wurl HLS identified as the Rakuten TV German FIFA+ feed. Final app test: H.264/AAC, audio decoded, time advanced, 1280×720 maximum, and an actual football match replay was visible.
- Tennis Channel source: partner-hosted Amagi/Rakuten HLS. Final app test: H.264/AAC, audio decoded, time advanced, 1280×720 maximum, and branded moving Tennis Channel programming was visible.
- Samsung Germany's current free channel list independently includes `Tennis Channel Deutschland` and `FIFA+`. That supports channel identity and free FAST status; it is not used to claim that every premium match is available.
- Final clean local browser audit: **57 listings, 23 advancing HLS transports, one advancing official embed, 33 honest unavailable entries, zero unstable transports, zero failures and zero browser errors**.
- All 27 retained HLS URLs passed manifest, selected-playlist and segment sampling from Spain. Fifteen app channels rendered 1080p; seven rendered at their real 720p ceiling; QVC rendered 540p.
- NRWision's manifest advertised 1080p, but that rendition stalled in two Chrome runs. The app now caps it to the stable 720p rendition; this is preferable to a higher label that does not keep playing.
- FAST catalogue presence does not authorise extraction of Sky, DAZN, RTL+, Joyn or other protected services. No premium DRM/entitlement bypass was added.

## 22 October third-party alternative review

- A new full deployed-browser pass again confirmed all 21 configured HLS transports and the official Hamburg 1 embed. The 33 non-playing entries are channels without an authorised browser-compatible integration, not newly dead configured URLs.
- The current `iptv-org` Germany list was searched channel by channel. Its ZDF, 3sat, ARTE and phoenix entries point back to geo-blocked broadcaster CDNs. Several other entries use private IP restreams or unrelated operator playlists and are not acceptable production sources.
- Publicly reachable ANTIK `test_*` playlists were rejected. ANTIK documents its television offer as a retransmission service for contracted end customers; a raw test URL does not grant this independent public PWA redistribution rights.
- Zattoo documents that its Free service cannot be used abroad. Its paid EU portability depends on an eligible account, home territory and package/device rules; RTL and ProSiebenSat.1 availability is restricted on some web/mobile plans.
- waipu.tv can serve eligible German-resident subscribers temporarily in Spain, but private-group mobile use needs the appropriate paid package/option. MagentaTV likewise requires a verified German residence and provider account for temporary EU portability. These are useful consumer viewing routes, not third-party feed licences.
- Joyn states that its free live-TV offer is Germany-only. Joyn+ portability covers eligible paid content during temporary EU travel, but the consumer player still does not permit framing on this origin.
- Result for the missing exact channels: no lawful, account-free third-party feed was verified for ZDF-family, RTL/VOX/n-tv, ProSieben/SAT.1/Kabel Eins, Sky, DAZN, Eurosport or SPORT1 that can be placed inside this static PWA. Exposed subscription tokens, operator test playlists, private restreams and geo/DRM bypasses remain excluded.

## v0.14 visible-picture correction

- A fresh two-frame visual capture was performed for every one of the 21 configured HLS channels after stable decoder startup. The latest deployed pass displayed real programme pictures on 19 channels. Das Erste showed its real 1080p programme after displaying ARD's legal-rights slate earlier the same day; BR Nord and BR Süd displayed BR's official programme-rights slate in the latest pass.
- The automated test is now intentionally a **transport** audit. It proves decoded dimensions, time advance, buffer, frame production and audio bytes; it no longer claims those metrics prove that the advertised programme is visible.
- BR Nord and BR Süd are published as `programme-blackout` for the latest Spain audit. Das Erste remains `playback-screened` for the latest sample, with its earlier blackout retained in the audit note. These changing results demonstrate why the app reports decoded transport separately from visible programme access.
- Joyn's official ProSieben consumer player was opened and returned `CODE: GEO_BLOCKED` in Spain. Joyn's SAT.1 player created no video and its entitlement request returned HTTP 400. Joyn also sends a Content Security Policy limiting `frame-ancestors` to Joyn-controlled domains.
- ZDF's official live page sends `X-Frame-Options: SAMEORIGIN`; its own FAQ states the continuous channel streams are Germany-only. ZDF video embeds are allowed only through ZDF's supplied embed function on eligible individual videos, not by framing the 24/7 live page.
- Zattoo documents an API/playback SDK and content-inclusive white-label platform for contracted B2B operators. That is a legitimate future partner route, not a free consumer-stream URL available to this static PWA.

## v0.13 full-catalogue playback truth

- The catalogue has **55 listings**, not 55 playable feeds. The current built-in capability is **21 HLS channels plus one official Hamburg 1 embedded player**. Thirty-three listings have no authorised browser-compatible player.
- The 21 HLS channels were re-opened individually through the real mobile Live TV UI. Every one decoded, remained unpaused/ready, had buffered media, advanced for a further 3.5 seconds and exposed increasing audio-decoder bytes. The official Hamburg 1 inner video also advanced; merely loading its iframe was not accepted.
- Highest observed output: 16 HLS channels at 1920×1080; ALEX, hr, Teledeporte and tagesschau24 at 1280×720; QVC at 960×540; Hamburg 1 at 854×480. These are source/device observations, not promises. The player cannot create genuine 1080p from lower-resolution media.
- The 33 unavailable entries were also selected one by one. None exposed a misleading playback/retry control or activated the HLS video. Their guide data and channel logos do not imply playback access.
- `tests/browser-full-playback-audit.js` records the channel, outcome, startup time, decoded resolution, ready/paused state, buffer, time advance, audio bytes, embedded-video evidence and browser errors for future runs.

## Current platform and integration boundary

- ZDF's official streaming FAQ states that its 24/7 live channels are generally available only in Germany; worldwide event streams are programme-specific and do not provide a replacement linear feed.
- Joyn legitimately offers free consumer live TV including ProSieben/SAT.1-family channels in its supported territory, but its own site limits framing to Joyn-controlled domains. Live tests from Spain returned a ProSieben geo-block and a failed SAT.1 entitlement request; consumer availability is not a third-party feed or licence for this GitHub Pages origin.
- RTL+ and Sky/WOW similarly prevent cross-origin framing, and their playback is controlled by accounts, entitlements, tokens and DRM. A subscription proves that a user can watch through that provider, not that this independent PWA may extract or redistribute the stream.
- waipu.tv documents temporary EU viewing for eligible German-resident subscribers and package/mobile-option requirements. It does not expose an authorised static-PWA stream connection.
- SPORT1 documents regional limits for its free stream; DF1 promotes an official Germany-oriented livestream. Neither supplied a lawful browser-compatible feed that passed from the ES test network during this audit.
- Fresh broadcaster-page inspection found phoenix requesting an official ZDF CDN master that returned HTTP 403 in Spain; ONE's current published HLS hostname failed DNS resolution. They remain unavailable rather than being added as false-working sources.
- No pirate restream, subscription-token extraction, DRM bypass or geographic-control bypass is accepted as a replacement. The correct route for protected channels is a documented partner embed/SDK/feed with permission for this origin and territory.

## v0.12 programme-guide source

- Source service: [IPTV-EPG.org free country guides](https://iptv-epg.org/guides), using its public XMLTV links for Germany, Spain and the United Kingdom.
- The source page describes the files as free, up-to-date XMLTV data intended to be copied into compatible guide applications. No account, key, paid route or protected broadcaster stream is used.
- `scripts/update-epg.cjs` maps exact XMLTV IDs, converts timestamp offsets to ISO instants and retains only the useful current/upcoming portion of the rolling three-day window in compressed `epg.json.gz`. The browser formats those instants in the viewer's local timezone.
- Current v0.16 mapping coverage: 54 of 59 candidate channels. Terra Mater WILD, FIFA+ FAST, Tennis Channel, Billiard TV and FloHockey have no verified exact mapping and deliberately display “No verified schedule” instead of another channel's data. Record totals change with each refresh; the 3,262-record total in the v0.15 audit is historical.
- Refresh cadence: 03:17 and 15:17 UTC through `.github/workflows/update-epg.yml`, plus manual workflow dispatch. The app shows snapshot freshness and a clear error state if the guide fails.
- Programme metadata is informational and can change. A listing for RTL, Sky, DAZN or another protected channel is not a playback licence, source feed or indication that Global TV Hub can unlock it.

## v0.10 sports directory review

- Historical direct in-app sports television at this stage: More Than Sports TV, Motorvision, World of Freesports and Red Bull TV at 1920×1080; Teledeporte at 1280×720. Later v0.15 added FIFA+ and Tennis at 720p; the current v0.16 Tennis replacement, Billiard and FloHockey observations are documented above.
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
| BR Nord | Programme rights slate | 1920×1080 transport | BR's official slate replaced the current programme; retry a later programme. |
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
| NRWision | Moving video | 1280×720 | 1080p stalled twice in the current audit; capped at stable 720p. |
| QVC Deutschland | Moving video | 960×540 | Moving programme observed. |
| DW English | Moving video | 1920×1080 | Advancing playback observed. |
| DW Español | Moving video | 1920×1080 | Highest rendition selected and decoded. |
| ARD-alpha | Moving video | 1920×1080 | Highest rendition selected and decoded. |
| BR Süd | Programme rights slate | 1920×1080 transport | BR's official slate replaced the current programme; retry a later programme. |

The retained catalogue has 21 HLS channels (25 URLs including fallbacks) plus one official embedded player. All 21 HLS channels confirmed advancing after the v0.9 Full-HD-first change: 16 decoded at 1920×1080, four at their 1280×720 source/stability limit, and QVC at its 960×540 source limit. Hamburg 1's official embed decoded at 854×480. On the same ES network, all 25 HLS URLs returned a root manifest, media playlist and segment bytes. Network-path success is not a substitute for the browser evidence above.

## Platform and integration research — 21 October 2026

- **ARD Mediathek** is the strongest free direct broadcaster source. The configured feeds work in Spain, but programme-specific international rights slates can appear. Official phoenix, ONE, MDR, rbb, SWR and Radio Bremen streams were individually rechecked and returned HTTP 403 from Spain, so they were not added as false-working sources.
- **ZDF** confirms its ZDF/ZDFneo/ZDFinfo/3sat 24/7 streams are Germany-only. Its worldwide event streams are programme-specific and cannot replace those linear channels.
- **Joyn Free** advertises more than 100 German live channels and HD viewing, including ProSieben/SAT.1 channels, with free registration for some streams. No licensed third-party embed/SDK was found, and access remains controlled by Joyn and territory.
- **Zattoo Free** advertises more than 190 channels but explicitly excludes ProSiebenSat.1 and RTL Group channels from its free tier. It requires an account and exposes no authorised static-PWA stream connection.
- **FIFA+ on DAZN** is free after registration and carries selected international football, not every premium league or match. DAZN does not authorise framing its service without consent.
- **UEFA.tv**, **Sportschau**, **ZDF Sport**, **SPORT1**, **Red Bull TV**, **More Than Sports TV**, **Teledeporte**, **Motorvision** and **World of Freesports** remain useful lawful free selections, but their event schedules and territorial rights differ.
- **Formula 1 in Spain** remains DAZN-controlled through 2030 for complete live coverage. RTL shows selected 2026 sessions/races in Germany, and Sky/WOW or Sky Sports/NOW are paid territory-specific services. None supplies this project with a licensed browser feed or partner SDK.
- **Real programme titles** are connected in v0.12 through the compact XMLTV snapshot above. Sport-card fixtures outside those linear channel schedules are still not invented or inferred.

## Channel logo provenance — 21 October 2026

- The v0.16 candidate stores 55 unique local PNG assets for all 59 fixed channel entries, including the new Billiard TV and FloHockey marks; BR Nord/Süd, DW language feeds, Eurosport territories and SPORT1 entries intentionally share their correct network mark. The v0.15 release contained 53 assets for 57 entries.
- Channel/logo matching was checked against the public [IPTV-org logo index](https://github.com/iptv-org/api/blob/master/README.md), which exposes channel IDs, active status, file dimensions and original asset URLs.
- German public/private broadcaster marks were preferentially taken from current Wikimedia Commons files where available; the relevant catalogues are [German television logos by channel](https://commons.wikimedia.org/wiki/Category:Logos_of_television_channels_in_Germany_by_name) and [German television SVG logos](https://commons.wikimedia.org/wiki/Category:SVG_logos_of_television_channels_of_Germany).
- Sky variants were matched to their exact Sport, F1, Premier League, Bundesliga, Main Event, Football, Cricket and Tennis identities; Sky's own [press logo asset directory](https://skygroup.sky/en-gb/press/assets/logos) was also checked as the official brand reference.
- Assets are kept locally only to make the PWA reliable and offline-capable. All channel names and marks remain the property of their respective owners; inclusion does not imply affiliation or permission to redistribute television programming.

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
- Start at the preferred HD rendition up to 1080p, then retain automatic bitrate adaptation under the per-channel ceiling. ALEX and NRWision are capped at 720p because their advertised 1080p paths stalled in repeated Spain tests.
- Keep Auto and explicit manual quality choices available; do not force a permanent manual quality lock during ordinary adaptive startup.
- Report source-advertised resolution only after manifest parsing; actual rendering can be lower.
- A higher quality than the broadcaster supplies cannot be created in the app.
- Authenticated sports streams are linked to the official service; do not scrape DRM, passwords or private URLs.
- Judge performance on real Spain broadband/mobile networks; measure join time, buffering, playback bitrate, rebuffering and live latency.

## Future QA tasks
- Obtain source-owner permission evidence where public listing provenance is incomplete, and repeat longer Spain stability checks per provider/date/browser/device.
- Monitor the connected free XMLTV snapshot for freshness, identifier drift and source terms; verify exact mappings for the five currently unmatched candidate channels. Never display invented live match times.
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
