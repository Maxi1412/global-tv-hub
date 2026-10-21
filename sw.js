/* Offline app shell only. Never cache or intercept live-stream, DRM or broadcaster requests. */
const CACHE = 'global-tv-hub-shell-v12';
const LOGOS = ['3sat','alexberlin','ard','ardalpha','arte','br','daznf1','df1','dokusat','dw','eurosport','hamburg1','hr','kabeleins','kika','morethansports','motorvision','ndr','nrwision','ntv','one','phoenix','prosieben','qvc','redbulltv','rtl','rtlzwei','sat1','skybuli','skyde1','skyde2','skydef1','skydepl','skymix','skytop','skyukcricket','skyukf1','skyukfootball','skyukmain','skyukpl','skyuktennis','sport1','tagesschau24','teledeporte','terramater','vox','wdr','worldfreesports','zdf','zdfinfo','zdfneo'].map(name=>`./assets/logos/${name}.png`);
const FILES = ['./','./index.html','./styles.css','./data.js','./app.js','./epg.json.gz','./manifest.webmanifest','./assets/icon-192.png','./assets/icon-512.png','./assets/berlin.webp','./assets/formula-hero.webp','./assets/formula1.webp','./assets/football.webp','./assets/bundesliga.webp','./assets/champions.webp','./assets/tennis.webp','./assets/motogp.webp','./assets/news.webp','./assets/documentary.webp','./assets/film.webp',...LOGOS];
self.addEventListener('install',evt => evt.waitUntil(caches.open(CACHE).then(cache => cache.addAll(FILES)).then(()=>self.skipWaiting())));
self.addEventListener('activate',evt => evt.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',evt => {
  const req=evt.request;
  if(req.method!=='GET') return;
  const u=new URL(req.url);
  if(u.origin!==self.location.origin) return;
  // Network-first updates the UI on every new GitHub Pages deployment.
  // Offline fallbacks are limited to our own app files, never broadcaster streams.
  evt.respondWith(fetch(req).then(response => {
    if(response.ok){const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(req,copy)).catch(()=>{});}
    return response;
  }).catch(async()=> (await caches.match(req)) || (req.mode==='navigate' ? caches.match('./index.html') : Response.error())));
});
