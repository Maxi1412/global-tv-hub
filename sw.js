/* Offline app shell only. Never cache or intercept live-stream, DRM or broadcaster requests. */
const CACHE = 'global-tv-hub-shell-v9';
const FILES = ['./','./index.html','./styles.css','./data.js','./app.js','./manifest.webmanifest','./assets/icon-192.png','./assets/icon-512.png','./assets/berlin.webp','./assets/formula-hero.webp','./assets/formula1.webp','./assets/football.webp','./assets/bundesliga.webp','./assets/champions.webp','./assets/tennis.webp','./assets/motogp.webp','./assets/news.webp','./assets/documentary.webp','./assets/film.webp'];
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
