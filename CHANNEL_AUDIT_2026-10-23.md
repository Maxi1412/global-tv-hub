# Global TV Hub — channel audit, 23 October 2026

Build: v0.16.0. Target: local v0.16.0 candidate. Measured at 2026-10-22T22:32:59.298Z.

59 entries individually selected in Windows Chrome: 24 HLS transports confirmed, 0 unstable, 2 official embeds confirmed, 0 embeds without non-ad confirmation, 33 unavailable entries, 0 audit failures. Console errors recorded: 0. An unavailable state is not a working channel.

HLS confirmation requires nonzero decoded dimensions, ready/unpaused video, at least nine seconds of advancement during a ten-second sample and increasing decoded audio bytes. The official embed gate excludes preroll ads and samples 3.5 seconds of advancing non-ad video. Source quality can adapt during a sample. These short tests do not guarantee future uptime or event availability.

A separate picture review in this work session found rights notices on hr, BR Nord, BR Süd and ARD-alpha. The other configured channels showed their expected programming, including real tennis, billiards and hockey. Official YouTube Auto previously chose 480p; both FloHockey and Hamburg 1 separately sustained 1080p after selecting the player quality.

| Channel | Actual test outcome | Rendered sample | Startup | Measured advance | Picture/access finding |
|---|---|---:|---:|---:|---|
| ALEX Berlin | Decoded video + audio advanced | 1280x720 | 4.7 s | 10.01 s | Expected channel programming reviewed |
| Dokusat | Decoded video + audio advanced | 1920x1080 | 3.3 s | 10.02 s | Expected channel programming reviewed |
| hr-fernsehen | Decoded video + audio advanced | 1280x720 | 3.0 s | 10.03 s | Broadcaster rights notice in separate picture review |
| BR Fernsehen Nord | Decoded video + audio advanced | 1920x1080 | 2.4 s | 10.01 s | Broadcaster rights notice in separate picture review |
| Terra Mater WILD (DE) | Decoded video + audio advanced | 1920x1080 | 4.1 s | 10.01 s | Expected channel programming reviewed |
| Red Bull TV — Sports | Decoded video + audio advanced | 1920x1080 | 4.3 s | 10.01 s | Expected channel programming reviewed |
| More Than Sports TV | Decoded video + audio advanced | 1920x1080 | 6.7 s | 10.02 s | Expected channel programming reviewed |
| Teledeporte (RTVE) | Decoded video + audio advanced | 1280x720 | 2.8 s | 10.02 s | Expected channel programming reviewed |
| DF1 Sport Deutschland | Unavailable — no supported player | — | — | — | Official DF1 stream is country-blocked in Spain; no working in-app source is published. |
| Motorvision Free TV | Decoded video + audio advanced | 1920x1080 | 4.8 s | 10.02 s | Expected channel programming reviewed |
| World of Freesports | Decoded video + audio advanced | 1920x1080 | 3.4 s | 10.02 s | Expected channel programming reviewed |
| FIFA+ German FAST | Decoded video + audio advanced | 1280x720 | 3.5 s | 10.01 s | Expected channel programming reviewed |
| Tennis Channel International | Decoded video + audio advanced | 1920x1080 | 4.0 s | 10.02 s | Expected channel programming reviewed |
| Billiard TV | Decoded video + audio advanced | 1920x1080 | 4.2 s | 10.02 s | Expected channel programming reviewed |
| FloHockey 24/7 | Official non-ad video advanced | 854x480 | 7.2 s | 3.52 s | Expected channel programming reviewed; player controls quality, up to 1080p verified separately |
| Das Erste | Decoded video + audio advanced | 1920x1080 | 2.6 s | 10.01 s | Expected channel programming reviewed |
| ZDF | Unavailable — no supported player | — | — | — | ZDF confirms its 24/7 channels are restricted to Germany; unavailable in Spain |
| RTL | Unavailable — no supported player | — | — | — | Subscription and regional restrictions may apply |
| ProSieben | Unavailable — no supported player | — | — | — | Official Joyn playback returned CODE: GEO_BLOCKED in Spain; Joyn cannot be framed by this PWA |
| SAT.1 | Unavailable — no supported player | — | — | — | Official Joyn playback failed its entitlement request from Spain; Joyn cannot be framed by this PWA |
| Kabel Eins | Unavailable — no supported player | — | — | — | Joyn Germany availability restrictions |
| ARTE | Unavailable — no supported player | — | — | — | Official ARTE player reported the current programme unavailable in Spain; no stable live embed is configured |
| 3sat | Unavailable — no supported player | — | — | — | ZDF-family 24/7 stream is restricted to Germany; unavailable in Spain |
| ZDFinfo | Unavailable — no supported player | — | — | — | ZDF confirms its 24/7 channels are restricted to Germany; unavailable in Spain |
| ZDFneo | Unavailable — no supported player | — | — | — | ZDF confirms its 24/7 channels are restricted to Germany; unavailable in Spain |
| tagesschau24 | Decoded video + audio advanced | 1280x720 | 2.6 s | 10.01 s | Expected channel programming reviewed |
| phoenix | Unavailable — no supported player | — | — | — | Availability may vary abroad |
| ONE | Unavailable — no supported player | — | — | — | ARD notes possible geoblocking outside Germany |
| KiKA | Decoded video + audio advanced | 1920x1080 | 2.6 s | 10.01 s | Expected channel programming reviewed |
| NDR International | Decoded video + audio advanced | 1920x1080 | 3.0 s | 10.01 s | Expected channel programming reviewed |
| WDR Fernsehen | Decoded video + audio advanced | 1920x1080 | 2.9 s | 10.01 s | Expected channel programming reviewed |
| Hamburg 1 | Official non-ad video advanced | 854x480 | 7.2 s | 3.52 s | Expected channel programming reviewed; player controls quality, up to 1080p verified separately |
| NRWision | Decoded video + audio advanced | 1280x720 | 6.2 s | 10.03 s | Expected channel programming reviewed |
| QVC Deutschland | Decoded video + audio advanced | 960x540 | 3.8 s | 10.02 s | Expected channel programming reviewed |
| Deutsche Welle | Decoded video + audio advanced | 1920x1080 | 3.4 s | 10.01 s | Expected channel programming reviewed |
| DW Español | Decoded video + audio advanced | 1920x1080 | 3.3 s | 10.02 s | Expected channel programming reviewed |
| ARD-alpha | Decoded video + audio advanced | 1920x1080 | 2.6 s | 10.02 s | Broadcaster rights notice in separate picture review |
| BR Fernsehen Süd | Decoded video + audio advanced | 1920x1080 | 2.3 s | 10.01 s | Broadcaster rights notice in separate picture review |
| RTLZWEI | Unavailable — no supported player | — | — | — | RTL+ subscription and location restrictions |
| ntv | Unavailable — no supported player | — | — | — | The current ntv player uses protected media and permits framing only by ntv domains; no supported PWA feed is connected |
| VOX | Unavailable — no supported player | — | — | — | RTL+ access restrictions |
| Sky Sport 1 HD (DE) | Unavailable — no supported player | — | — | — | German subscription required; not confirmed accessible from Spain |
| Sky Sport 2 HD (DE) | Unavailable — no supported player | — | — | — | German subscription required; not confirmed accessible from Spain |
| Sky Sport F1 HD (DE) | Unavailable — no supported player | — | — | — | WOW/Sky Germany subscription; geographic restrictions may apply |
| Sky Sport Premier League (DE) | Unavailable — no supported player | — | — | — | German market subscription; geographic restrictions may apply |
| Sky Sports Main Event (UK) | Unavailable — no supported player | — | — | — | UK NOW membership, likely unavailable to subscribe or watch from Spain |
| Sky Sports F1 (UK) | Unavailable — no supported player | — | — | — | UK membership and region requirements; not an open HD feed |
| Sky Sports Premier League (UK) | Unavailable — no supported player | — | — | — | UK membership; provider states it may refuse access from other countries |
| Eurosport (DE) | Unavailable — no supported player | — | — | — | Live coverage is subscription-, event- and country-dependent |
| Eurosport (ES) | Unavailable — no supported player | — | — | — | Some content requires a subscription; event rights vary |
| Sky Sport Bundesliga HD (DE) | Unavailable — no supported player | — | — | — | German Sky/WOW subscription; streaming in Spain depends on entitlement |
| Sky Sport Top Event HD (DE) | Unavailable — no supported player | — | — | — | German Sky subscription required |
| Sky Sport Mix HD (DE) | Unavailable — no supported player | — | — | — | German Sky subscription required |
| Sky Sports Football (UK) | Unavailable — no supported player | — | — | — | UK subscription; streaming from Spain not confirmed |
| Sky Sports Cricket (UK) | Unavailable — no supported player | — | — | — | UK subscription; region restrictions |
| Sky Sports Tennis (UK) | Unavailable — no supported player | — | — | — | UK subscription; region restrictions |
| DAZN F1 (Spain) | Unavailable — no supported player | — | — | — | DAZN subscription in Spain; player access controlled by DAZN |
| SPORT1 Free TV (DE) | Unavailable — no supported player | — | — | — | SPORT1 free stream licensed for Germany, Austria and Switzerland, not Spain |
| SPORT1 | Unavailable — no supported player | — | — | — | Broadcast rights vary by event and territory |

Transport success and picture access are separate findings. The 33 provider/territory-controlled entries remain unresolved; no pirate restream or extracted subscription token was added. Source discovery and integration evidence are in SOURCES.md.
