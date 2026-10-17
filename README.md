# Global TV Hub v0.6 — Direct sports streams

The in-app Sports dashboard now includes direct, one-click HLS candidates for Red Bull TV, More Than Sports TV, Teledeporte (RTVE Spain), DF1 Germany, Motorvision free FAST and World of Freesports. Clicking these sport cards selects the associated live TV channel and automatically attempts playback inside Global TV Hub. No external site or manual source entry is required for these free candidates.

**Important:** The URLs were published on community stream directories and/or linked to legitimate free broadcaster/FAST offerings. They are not independently tested from the user's Spanish browser. Neither a listed 1080p variant nor an HLS URL guarantees CORS, worldwide rights, uptime or playback. The player automatically retries configured alternatives and offers native quality choices when advertised.

**Premium sports:** Sky Sport F1, Sky Sports UK, full Formula 1 DAZN Spain and other DRM-protected paid services have no public licensed embeddable feed here. They remain marked unavailable for in-app playback; their entries must not trigger provider redirects, source-entry prompts, or misrepresent other sports content as premium F1/football.

**QA:** Node smoke tests should verify channel catalogue, one-click sport-card routing, seven navigation routes, private optional custom stream storage, no website redirect, and service worker version bump. GitHub Pages deployment should pass on main.

**Source references:** https://github.com/iptv-org/iptv/blob/master/streams/at.m3u ; https://github.com/iptv-org/iptv/blob/master/streams/de.m3u ; https://github.com/iptv-org/iptv/blob/master/streams/es.m3u ; https://morethansports.tv ; https://redbull.tv ; https://motorvision.tv .
