(() => {
'use strict';
const app = document.getElementById('app');
const catalog = window.TV_DATA;
const fixedChannels = catalog.channels;
const sports = catalog.sports;
const ICONS={
  home:'<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z"/>',
  tv:'<rect x="3" y="5" width="18" height="15" rx="2"/><path d="m8 2 4 3 4-3M8 22h8"/>',
  trophy:'<path d="M8 21h8M12 17v4M7 3h10v7a5 5 0 0 1-10 0zM7 5H4v3a4 4 0 0 0 4 4M17 5h3v3a4 4 0 0 1-4 4"/>',
  calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4M17 3v4M3 10h18"/>',
  heart:'<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8z"/>',
  search:'<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
  settings:'<circle cx="12" cy="12" r="3"/><path d="M19 13a7 7 0 0 0 0-2l2-2-2-3-3 1a7 7 0 0 0-2-1l-1-3h-3L9 6a7 7 0 0 0-2 1L4 6 2 9l2 2a7 7 0 0 0 0 2l-2 2 2 3 3-1a7 7 0 0 0 2 1l1 3h3l1-3a7 7 0 0 0 2-1l3 1 2-3z"/>',
  play:'<path d="m7 4 13 8-13 8z"/>',
  chevron:'<path d="m9 5 7 7-7 7"/>',
  external:'<path d="M14 4h6v6M20 4l-9 9"/><path d="M20 13v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h6"/>',
  star:'<path d="m12 2 3.2 6.6 7.3 1-5.3 5.1 1.2 7.3L12 18.6 5.6 22l1.2-7.3-5.3-5.1 7.3-1z"/>',
  check:'<path d="m4 12 5 5L20 6"/>',
  copy:'<rect x="7" y="7" width="14" height="14" rx="2"/><path d="M17 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h2"/>',
  download:'<path d="M12 3v13m-5-5 5 5 5-5M4 18v3h16v-3"/>',
  globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a16 16 0 0 0 0 18M12 3a16 16 0 0 1 0 18"/>',
  info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 7h.01"/>',
  arrow:'<path d="M4 12h16m-7-7 7 7-7 7"/>',
  close:'<path d="M5 5l14 14M19 5 5 19"/>'
};
const icon = (name) => `<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${ICONS[name]||ICONS.info}</svg>`;
const esc = (v) => String(v??'').replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const safeUrl = u => {try{const x=new URL(u);return ['https:','http:'].includes(x.protocol)?x.href:null;}catch{return null;}};
const storage = {
  get(k,def){try{const a=JSON.parse(localStorage.getItem('gtvh-'+k));return a??def;}catch{return def;}},
  set(k,v){try{localStorage.setItem('gtvh-'+k,JSON.stringify(v));}catch{}}
};
const savedCustom=storage.get('custom',[]);
let customChannels=(Array.isArray(savedCustom)?savedCustom:[]).filter(x => x && typeof x.name==='string' && typeof x.id==='string' && safeUrl(x.stream)).slice(0,150);
let channels = [...fixedChannels, ...customChannels];
const savedFavourites=storage.get('favorites',['ard','zdf','arte','f1']);
let fav = new Set((Array.isArray(savedFavourites)?savedFavourites:[]).filter(x=>typeof x==='string'));
const savedHistory=storage.get('history',[]);
let recent=(Array.isArray(savedHistory)?savedHistory:[]).filter(x=>typeof x==='string').slice(0,12);
let state={page:'home',selected:'ard',selectedSport:null,filter:'All',sportsFilter:'All Sports',guideFilter:'All',guideDay:0,search:'',playerStatus:'',playerError:false,loading:false};
let activeHls=null;let hlsScriptPromise=null;let toastTimeout=null;let deferredInstall=null;
let playToken=0;let playbackTimer=null;let playerCleanup=null;let startupProgressTimer=null;let activeSourceUrl=null;
let epgState={status:'loading',data:null,error:''};
const savedFeeds=storage.get('linkedFeeds',{});
let linkedFeeds=(savedFeeds&&typeof savedFeeds==='object'&&!Array.isArray(savedFeeds))?savedFeeds:{};
const savedLastWorking=storage.get('workingSources',{});
let workingSources=(savedLastWorking&&typeof savedLastWorking==='object'&&!Array.isArray(savedLastWorking))?savedLastWorking:{};
function sourcesFor(c){
 const raw=[];const linked=safeUrl(linkedFeeds[c.id]);
 if(linked)raw.push({url:linked,label:'My authorised source'});
 if(c.stream)raw.push({url:c.stream,label:'Primary public feed'});
 if(Array.isArray(c.streams))for(const obj of c.streams)raw.push({url:obj.url,label:obj.label||'Alternative public feed'});
 const seen=new Set();return raw.filter(x=>{const u=safeUrl(x.url);if(!u||seen.has(u))return false;seen.add(u);x.url=u;return true;});
}
function embedFor(c){
 const u=safeUrl(c?.embed);if(!u)return null;
 const host=new URL(u).hostname.toLowerCase();
 return ['www.youtube-nocookie.com','www.youtube.com'].includes(host)?u:null;
}
function hasInAppSource(c){return sourcesFor(c).length>0||!!embedFor(c);}
function sourceCount(){return channels.filter(hasInAppSource).length;}
function hlsChannelCount(){return channels.filter(c=>sourcesFor(c).length>0).length;}
function publishedAudit(c){return catalog.sourceAudit?.[c.id]||null;}
function publishedAuditSummary(c){
 const audit=publishedAudit(c);if(!audit)return 'No Spain browser result recorded for this channel.';
 const lead={
  'playback-screened':'Moving video screened in Spain',
  'programme-blackout':'Video transport worked; programme rights slate observed',
  'geo-blocked':'Unavailable from Spain',
  'official-embed':'Official in-app player configured'
 }[audit.result]||audit.result;
 return `${lead}${audit.resolution?' · '+audit.resolution:''} · ${audit.engine}. ${audit.note}`;
}
function catalogueStatus(c){
 const local=streamHealth[c.id];const audit=publishedAudit(c);
 if(local?.status==='Programme blocked')return 'Programme blocked now on this device';
 if(local?.status==='Signal decoded')return `Signal decoded now · check picture${local.detail?.match(/\d+×\d+/)?.[0]?' · '+local.detail.match(/\d+×\d+/)[0]:''}`;
 if(local?.status==='Playback confirmed')return 'Previously decoded · picture was not certified';
 if(['Failed','Interrupted'].includes(local?.status))return `${local.status} on this device · tap to retry`;
 if(embedFor(c))return 'Official embed · tap to verify now';
 if(audit?.result==='programme-blackout')return `Latest visual audit: programme blocked${audit.resolution?' · '+audit.resolution+' transport':''}`;
 if(sourcesFor(c).length)return `Configured player${audit?.resolution?' · last visual audit '+audit.resolution:' · tap to test'}`;
 if(audit?.result==='geo-blocked')return 'Unavailable from Spain';
 return 'No authorised in-app player';
}
const healthHistory=storage.get('streamHealth',{});
let streamHealth=(healthHistory&&typeof healthHistory==='object'&&!Array.isArray(healthHistory))?healthHistory:{};
function recordHealth(channel,source,status,detail=''){
 const prev=streamHealth[channel]||{};
 const entry={...prev,source:source?source.label:'None',status,detail:String(detail).slice(0,100),at:new Date().toISOString()};
 streamHealth[channel]=entry;
 // Preserve diagnostics locally only; do not upload device URLs or telemetry to GitHub.
 const keys=Object.keys(streamHealth);if(keys.length>100)delete streamHealth[keys[0]];
 storage.set('streamHealth',streamHealth);
 const el=document.getElementById('source-health');if(el)el.textContent=status+' · '+entry.at.slice(11,16)+' · '+entry.detail;
}
function sourceHealthSummary(id){const r=streamHealth[id];if(!r)return 'Not yet tested on this device';return `${r.status} · ${r.at?.slice(0,16).replace('T',' ')||'Unknown time'}${r.detail?' · '+r.detail:''}`;}

function linkedSource(id){return !!safeUrl(linkedFeeds[id]);}
function statusText(c){const local=streamHealth[c.id];if(local?.status==='Programme blocked')return 'PROGRAMME BLOCKED';if(['Signal decoded','Playback confirmed'].includes(local?.status))return 'SIGNAL DECODED';return hasInAppSource(c)?'READY TO TEST':'NO IN-APP PLAYER';}
function channelLogo(c,variant=''){
 const src=typeof c.logo==='string'&&/^\.\/assets\/logos\/[a-z0-9-]+\.png$/i.test(c.logo)?c.logo:null;
 return `<span class="channel-logo-frame ${src?'has-logo ':''}${esc(variant)}" aria-hidden="true" style="--tile:${esc(c.color||'#34598a')}"><span class="channel-logo-fallback">${esc(c.short||c.name)}</span>${src?`<img class="channel-logo-image" src="${esc(src)}" alt="" loading="lazy" decoding="async" onerror="this.hidden=true;this.parentElement.classList.remove('has-logo')"/>`:''}</span>`;
}

function dayRange(offset=0){const start=new Date();start.setHours(0,0,0,0);start.setDate(start.getDate()+offset);const end=new Date(start);end.setDate(end.getDate()+1);return {start,end};}
function formatTime(value){return new Intl.DateTimeFormat(undefined,{hour:'2-digit',minute:'2-digit',hour12:false}).format(new Date(value));}
function formatGuideDate(offset){if(offset===0)return 'Today';if(offset===1)return 'Tomorrow';const {start}=dayRange(offset);return new Intl.DateTimeFormat(undefined,{weekday:'short',day:'numeric',month:'short'}).format(start);}
function epgList(id){const list=epgState.data?.channels?.[id];return Array.isArray(list)?list:[];}
function programmesForDay(id,offset=0){const {start,end}=dayRange(offset);return epgList(id).filter(item=>{const from=new Date(item.start);const to=new Date(item.stop);return from<end&&to>start&&to>from;});}
function programmeNow(id){const now=Date.now();return epgList(id).find(item=>new Date(item.start).getTime()<=now&&new Date(item.stop).getTime()>now)||null;}
function guideDateTabs(){return `<div class="epg-date-tabs" role="group" aria-label="Choose programme day">${[0,1,2].map(day=>`<button type="button" class="epg-date-tab ${state.guideDay===day?'active':''}" data-guide-day="${day}" aria-pressed="${state.guideDay===day}">${esc(formatGuideDate(day))}</button>`).join('')}</div>`;}
function scheduleAge(){const date=new Date(epgState.data?.generatedAt);if(!Number.isFinite(date.getTime()))return 'Update time unavailable';const hours=Math.max(0,Math.round((Date.now()-date.getTime())/3600000));return hours<1?'Updated within the hour':`Updated ${hours}h ago`;}
function programmeDescription(item){return item.description||item.subtitle||item.category||'No description supplied by the guide provider.';}
function epgTimeline(items,current=null){return `<div class="epg-timeline">${items.map(item=>{const isCurrent=current&&item.start===current.start&&item.stop===current.stop&&item.title===current.title;return `<article class="epg-programme ${isCurrent?'current':''}"><time>${formatTime(item.start)}<span>${formatTime(item.stop)}</span></time><span class="epg-line-dot" aria-hidden="true"></span><div><div class="epg-programme-title">${esc(item.title)} ${isCurrent?'<span class="epg-now-pill">NOW</span>':''}</div>${item.subtitle?`<p>${esc(item.subtitle)}</p>`:''}${item.category?`<span class="epg-category">${esc(item.category)}</span>`:''}</div></article>`;}).join('')}</div>`;}
function channelSchedule(c){
 const title=`${c.name} programme guide`;const source=epgState.data?.provider?.name||'Verified XMLTV source';
 let body='';
 if(epgState.status==='loading')body=`<div class="epg-empty epg-loading"><span class="epg-spinner" aria-hidden="true"></span><div><strong>Loading accurate programme times…</strong><p>The video player remains available while the guide loads.</p></div></div>`;
 else if(epgState.status==='error')body=`<div class="epg-empty">${icon('info')}<div><strong>Programme guide temporarily unavailable</strong><p>${esc(epgState.error||'The schedule could not be loaded. Playback is unaffected.')}</p></div></div>`;
 else {
  const items=programmesForDay(c.id,state.guideDay);const current=state.guideDay===0?programmeNow(c.id):null;
  if(!items.length)body=`<div class="epg-empty">${icon('calendar')}<div><strong>No verified schedule published for ${esc(formatGuideDate(state.guideDay).toLowerCase())}</strong><p>This channel still has the guide panel, but no programme title is guessed or copied from another station.</p></div></div>`;
  else {
   const upcoming=items.filter(item=>!current||item!==current).filter(item=>state.guideDay!==0||new Date(item.stop)>new Date()).slice(0,14);
   const progress=current?Math.min(100,Math.max(0,(Date.now()-new Date(current.start).getTime())/(new Date(current.stop).getTime()-new Date(current.start).getTime())*100)):0;
   const nowCard=current?`<article class="epg-now-card"><div class="epg-now-brand">${channelLogo(c,'epg-channel-logo')}<span class="epg-now-pill">NOW</span></div><div class="epg-now-copy"><span class="meta-label">Currently on ${esc(c.short||c.name)}</span><h3>${esc(current.title)}</h3><p>${esc(programmeDescription(current))}</p><div class="epg-progress" aria-label="Programme progress"><span style="width:${progress.toFixed(1)}%"></span></div><div class="epg-now-times"><strong>${formatTime(current.start)}–${formatTime(current.stop)}</strong><span>Times shown in your local time</span></div></div></article>`:'';
   const heading=current?'Up next':`${formatGuideDate(state.guideDay)} on ${c.name}`;
   body=`${nowCard}<div class="epg-list-head"><h3>${esc(heading)}</h3><span>${upcoming.length} programme${upcoming.length===1?'':'s'}</span></div>${upcoming.length?epgTimeline(upcoming):'<div class="epg-empty compact"><div><strong>No later programmes supplied</strong><p>Check the next day or return after the next guide refresh.</p></div></div>'}`;
  }
 }
 return `<section class="section epg-section" id="channel-schedule" aria-live="polite"><div class="epg-head"><div><span class="mini-label">PROGRAMME SCHEDULE</span><h2>${esc(title)}</h2></div><span class="epg-source">${esc(scheduleAge())} · ${esc(source)}</span></div>${guideDateTabs()}${body}<p class="epg-notice">Guide information can change and does not override broadcaster access, subscription or regional rights.</p></section>`;
}
function updateChannelSchedule(){const target=document.getElementById('channel-schedule');if(!target||typeof document.createElement!=='function')return;const template=document.createElement('template');template.innerHTML=channelSchedule(lookup(state.selected)).trim();target.replaceWith(template.content.firstElementChild);}
function guideGroupMatches(c){if(state.guideFilter==='All')return true;if(state.guideFilter==='Sports')return c.category==='Sports';if(state.guideFilter==='German TV')return c.category==='German';return ['News','Culture'].includes(c.category);}
function guideOverviewRow(c){
 const items=programmesForDay(c.id,state.guideDay);const current=state.guideDay===0?programmeNow(c.id):null;const first=current||items.find(item=>state.guideDay!==0||new Date(item.stop)>new Date())||items[0];const second=first?items.find(item=>new Date(item.start)>=new Date(first.stop)):null;
 const status=epgState.status==='loading'?'<span class="epg-overview-muted">Loading schedule…</span>':epgState.status==='error'?'<span class="epg-overview-muted">Guide unavailable</span>':first?`<div class="epg-overview-programme"><span>${current?'<b>NOW</b>':esc(formatTime(first.start))}</span><strong>${esc(first.title)}</strong></div>${second?`<div class="epg-overview-programme next"><span>${esc(formatTime(second.start))}</span><strong>${esc(second.title)}</strong></div>`:''}`:'<span class="epg-overview-muted">No verified listings for this day</span>';
 return `<div class="epg-overview-row"><div class="guide-station">${channelLogo(c,'guide-logo')}<span>${esc(c.name)}</span></div><div class="epg-overview-list">${status}</div><button class="btn small" data-channel="${esc(c.id)}" aria-label="Open ${esc(c.name)} player and schedule">Open ${icon('chevron')}</button></div>`;
}
async function loadEpg(){
 if(typeof fetch!=='function'){epgState={status:'error',data:null,error:'Schedule loading is unavailable in this environment.'};return;}
 try{const response=await fetch('./epg.json.gz',{cache:'no-store'});if(!response.ok)throw new Error(`Schedule request returned ${response.status}`);if(typeof DecompressionStream!=='function'||!response.body)throw new Error('This browser cannot read the compressed programme guide');const stream=response.body.pipeThrough(new DecompressionStream('gzip'));const data=await new Response(stream).json();if(data?.schemaVersion!==1||!data.channels||typeof data.channels!=='object')throw new Error('Schedule file format is invalid');epgState={status:'ready',data,error:''};}
 catch(error){epgState={status:'error',data:null,error:error.message||'Schedule request failed'};}
 if(state.page==='live')updateChannelSchedule();else if(state.page==='guide')render();
}

const routes=['home','live','sports','guide','favorites','search','settings'];
const routeLabel={home:'Home',live:'Live TV',sports:'Sports',guide:'Guide',favorites:'Favorites',search:'Search',settings:'Settings'};
const routeIcons={home:'home',live:'tv',sports:'trophy',guide:'calendar',favorites:'heart',search:'search',settings:'settings'};
function persist(){storage.set('favorites',[...fav]);storage.set('history',recent);storage.set('custom',customChannels);storage.set('linkedFeeds',linkedFeeds);storage.set('workingSources',workingSources);}
function lookup(id){return channels.find(x=>x.id===id)||channels[0];}
function stopPlayback(){playToken++;if(playbackTimer){clearTimeout(playbackTimer);playbackTimer=null;}if(startupProgressTimer){clearTimeout(startupProgressTimer);startupProgressTimer=null;}if(playerCleanup){playerCleanup();playerCleanup=null;}if(activeHls){activeHls.destroy();activeHls=null;}const vid=document.getElementById('stream-video');if(vid){vid.pause();vid.removeAttribute('src');vid.load();vid.classList.remove('active');}}
function navigate(to,params={}){if(!routes.includes(to))return;if(state.page==='live')stopPlayback();state.page=to;Object.assign(state,params);if(to==='live')state.filter='All';state.playerStatus='';state.playerError=false;window.history.replaceState(null,'','#'+to);render();if(to==='live'&&sourcesFor(lookup(state.selected)).length)attemptPlayback();window.scrollTo({top:0,behavior:'instant'});}
function openOfficial(url){const u=safeUrl(url);if(!u){toast('No verified official website for this item.');return;}window.open(u,'_blank','noopener,noreferrer');}
function toast(message){const t=document.getElementById('toast');if(!t)return;t.textContent=message;t.hidden=false;if(toastTimeout)clearTimeout(toastTimeout);toastTimeout=setTimeout(()=>{t.hidden=true},4200);}
function toggleFavorite(id){if(fav.has(id))fav.delete(id);else fav.add(id);persist();if(state.page==='live'){
 document.querySelectorAll('[data-fav]').forEach(b=>{const itemId=b.dataset.fav;const isFav=fav.has(itemId);b.innerHTML=icon('heart')+' '+(isFav?'Remove favourite':'Add to favourites');b.setAttribute('aria-label',(isFav?'Remove':'Add')+' '+lookup(itemId).name+(isFav?' from':' to')+' favourites');});
 } else render();toast(fav.has(id)?'Added to favourites':'Removed from favourites');}
function remember(id){recent=[id,...recent.filter(x=>x!==id)].slice(0,12);persist();}
function channelTile(ch){return `<button class="channel-tile" data-channel="${esc(ch.id)}" aria-label="Watch ${esc(ch.name)} inside Global TV Hub"><div class="channel-poster" style="--tile:${esc(ch.color)}"><span class="status-tag ${hasInAppSource(ch)?'blue':''}">${statusText(ch)}</span>${channelLogo(ch,'poster-logo')}</div><div class="channel-name">${esc(ch.name)}</div><div class="channel-genre">${esc(ch.genre)}</div></button>`;}
function sportPlayable(s){return !!s?.channelId&&channels.some(c=>c.id===s.channelId&&hasInAppSource(c));}
function sportBadge(s){
 if(sportPlayable(s))return `▶ Play in app · ${s.quality||'HD preferred'}`;
 if(s.playback==='unavailable'||s.accessTier==='Unavailable in Spain')return 'Unavailable in Spain';
 if(s.accessTier==='Subscription')return 'Official subscription';
 if(s.accessTier==='Free official')return 'Free official service';
 return 'Official service only';
}
function sportTile(s){
 const playable=sportPlayable(s);const badgeClass=playable?'playable':s.playback==='unavailable'?'unavailable':'provider';
 const artwork=s.image?`<img src="./assets/${esc(s.image)}" alt="" loading="lazy"/>`:`<div class="sport-art" aria-hidden="true">${esc(s.icon||'🏟️')}</div>`;
 return `<div class="sport-item"><button class="sport-tile" ${playable?`data-channel="${esc(s.channelId)}"`:`data-sport="${esc(s.id)}"`} aria-label="${playable?'Watch':'View access details for'} ${esc(s.name)} within Global TV Hub">${artwork}<span class="sport-symbol" aria-hidden="true">${esc(s.icon||'🏟️')}</span><div class="sport-content"><strong>${esc(s.name)}</strong><span>${esc(s.provider)}</span><span class="sport-tier ${badgeClass}">${esc(sportBadge(s))}</span></div></button><button class="sport-heart" data-fav="${esc(s.id)}" aria-label="${fav.has(s.id)?'Remove':'Add'} ${esc(s.name)} ${fav.has(s.id)?'from':'to'} favourites" title="${fav.has(s.id)?'Remove favourite':'Add to favourites'}">${icon('heart')}</button></div>`;
}
function sportDetails(s){
 if(!s)return '';
 const playable=sportPlayable(s);const unavailable=s.playback==='unavailable'||s.accessTier==='Unavailable in Spain';
 const explanation=playable
  ?`This channel starts in the Global TV Hub player. ${s.quality||'The highest stable rendition is preferred.'}`
  :unavailable
   ?'The official service is not usable from Spain under its current territorial rights. No replacement stream is claimed.'
   :s.accessTier==='Subscription'
    ?'This coverage requires the provider account, entitlement and protected player. Global TV Hub has no licensed direct connection and will not imitate playback.'
    :s.accessTier==='Free official'
     ?'The provider offers selected free events, but has not supplied a stable authorised direct feed that this PWA can embed. Availability depends on the event and territory.'
     :'The provider controls playback, account requirements and event rights. No stable authorised direct feed is available to this PWA.';
 const quality=playable?s.quality||'Highest stable rendition preferred':'Provider controlled · cannot be selected by this PWA without a licensed feed';
 return `<section class="sport-detail" id="sports-detail" tabindex="-1" aria-live="polite"><div class="sport-detail-head"><div><span class="mini-label">SELECTED SPORT ACCESS</span><h2>${esc(s.icon||'🏟️')} ${esc(s.name)}</h2></div><button class="sport-close" data-sport-close="1" aria-label="Close ${esc(s.name)} details">${icon('close')}</button></div><div class="sport-detail-grid"><div><span class="meta-label">Status</span><strong>${esc(sportBadge(s))}</strong></div><div><span class="meta-label">Provider</span><strong>${esc(s.provider)}</strong></div><div><span class="meta-label">Best available here</span><strong>${esc(quality)}</strong></div><div><span class="meta-label">Region</span><strong>${esc(s.region||'Rights dependent')}</strong></div></div><p>${esc(s.description)}. ${esc(s.access)}.</p><p>${esc(explanation)}</p><div class="quick-actions">${playable?`<button class="btn primary small" data-channel="${esc(s.channelId)}">${icon('play')} Play now</button>`:`<button class="btn small" data-sport-filter="Play in app">${icon('play')} Show playable sports</button>`}<button class="btn ghost small" data-sport-close="1">Close details</button></div></section>`;
}
function sectionHead(title,link,target){return `<div class="section-head"><h2>${esc(title)}</h2>${link?`<button class="section-link" data-nav="${target}">See all ${icon('chevron')}</button>`:''}</div>`;}
function providerList(){return `<div class="panel"><h2>Streaming access <span class="tiny-stat">ES · Spain</span></h2><div class="provider-row"><div class="provider-icon">F1</div><div><strong>Formula 1 — DAZN</strong><p>Full Spain rights through 2030 · authorised app only</p></div></div><div class="provider-row"><div class="provider-icon">TV</div><div><strong>Joyn / Zattoo assessed</strong><p>Legitimate services, but no licensed third-party PWA embed</p></div></div><div class="provider-row"><div class="provider-icon">HD</div><div><strong>Full HD preferred</strong><p>1080p is selected when a stable rendition exists</p></div></div></div>`;}
function panelWelcome(){const c=lookup(state.selected);return `<div class="panel"><h2>Featured channel <span class="tiny-stat">${icon('tv')} TV</span></h2><div class="panel-image"><img src="./assets/news.webp" alt="Stylised newsroom artwork"/></div><div class="big-channel">${esc(c.name)}</div><p class="small-text">Tap a channel to play inside the app. Channels without a usable direct feed show source setup instead of opening another website.</p><div class="quick-actions"><button class="btn small primary" data-channel="${esc(c.id)}">${icon('play')} Open player</button></div></div>`;}
function home(){return `<div class="home-layout"><div class="stage"><div class="hero home-hero"><div class="hero-content"><span class="mini-label">● &nbsp; Global TV Hub</span><h1>German Live TV</h1><p>Watch German channels, international television and sports from one beautiful dashboard.</p><button class="btn primary" data-nav="live">${icon('play')} Watch now</button><div class="hero-pills"><span class="hero-pill">German & international</span><span class="hero-pill">Live sports</span><span class="hero-pill">TV guide</span></div></div></div><section class="section">${sectionHead('Popular German Channels',true,'live')}<div class="channel-grid">${channels.filter(ch=>['ard','zdf','rtl','prosieben','sat1','kabeleins'].includes(ch.id)).map(channelTile).join('')}</div></section><section class="section">${sectionHead('Sports Hub',true,'sports')}<div class="sports-grid">${sports.slice(0,4).map(sportTile).join('')}</div></section><section class="section">${sectionHead('Continue Watching',false)}${recent.length?`<div class="channel-grid">${recent.filter(id=>channels.some(x=>x.id===id)).map(lookup).slice(0,6).map(channelTile).join('')}</div>`:`<div class="muted-box">Your recently selected channels will appear here once you start exploring.</div>`}</section><div class="watch-footnote">Current, next and next-day programme listings are available in each channel player when the guide provider has a verified channel match. All viewing remains subject to each broadcaster's terms and territorial rights.</div></div><aside class="aside">${panelWelcome()}${providerList()}<div class="panel"><h2>Quick access</h2><div class="provider-row"><div class="provider-icon">${icon('trophy')}</div><div><strong>Sports Hub</strong><p>F1, football, tennis and more</p></div><button class="btn small" data-nav="sports">${icon('chevron')}</button></div><div class="provider-row"><div class="provider-icon">${icon('calendar')}</div><div><strong>TV Guide</strong><p>Now, next and tomorrow</p></div><button class="btn small" data-nav="guide">${icon('chevron')}</button></div></div></aside></div>`;}
function sportsView(){
 const cats=['All Sports','Play in app','Free official','Subscription','Formula 1','Football','Basketball','Ice Hockey','Golf','Cricket','Rugby','Handball','American Football','Athletics','Tennis','Motorsport','Other Sports'];
 const matches=s=>state.sportsFilter==='All Sports'||state.sportsFilter==='Play in app'&&sportPlayable(s)||state.sportsFilter==='Free official'&&s.accessTier==='Free official'||state.sportsFilter==='Subscription'&&s.accessTier==='Subscription'||state.sportsFilter==='Formula 1'&&['f1','skyf1','rtlf1'].includes(s.id)||s.category===state.sportsFilter;
 const filtered=sports.filter(matches);const direct=filtered.filter(sportPlayable);const directory=filtered.filter(s=>!sportPlayable(s));const selected=sports.find(x=>x.id===state.selectedSport);
 return `<div class="sports-layout"><div class="stage"><div class="hero sport-hero"><div class="hero-content"><span class="mini-label">SPORTS HUB · VERIFIED PLAYBACK</span><h1>Live sports TV,<br/>clearly labelled.</h1><p>Five channels play here: four verified at 1080p and Teledeporte at its 720p source maximum. Provider-only cards now show specific access details without pulling the page downward.</p><button class="btn primary" data-channel="redbulltv">${icon('play')} Watch 1080p sports TV</button><div class="hero-pills"><span class="hero-pill">Highest stable quality</span><span class="hero-pill">No false premium streams</span></div></div></div>${sportDetails(selected)}<div class="chips">${cats.map(c=>`<button class="chip ${state.sportsFilter===c?'active':''}" data-sport-filter="${esc(c)}">${esc(c)}</button>`).join('')}</div>${direct.length?`${sectionHead('Play now · highest verified quality',false)}<div class="sports-grid">${direct.map(sportTile).join('')}</div>`:''}${directory.length?`<section class="section">${sectionHead('Official coverage & access',false)}<div class="sports-grid">${directory.map(sportTile).join('')}</div></section>`:''}${!filtered.length?'<div class="empty"><h2>No sports found</h2><p>Choose another sports filter.</p></div>':''}<section class="section">${sectionHead('What the labels mean',false)}<div class="muted-box"><strong>Play in app</strong> confirms an in-app television feed with moving-video evidence. <strong>Free official</strong> identifies legitimate provider coverage that may require an account or event-specific player. <strong>Subscription</strong> requires the provider's protected service. Provider cards explain access here; they do not pretend to start a stream or silently open another site.</div></section></div><aside class="aside"><div class="panel"><h2>Formula 1 in Spain</h2><div class="panel-image"><img src="./assets/formula1.webp" alt="Illustrated Formula 1 racing car"/></div><div class="big-channel">DAZN F1</div><p class="small-text">Complete Spain coverage uses DAZN's subscription player. Global TV Hub has no licensed DAZN feed.</p><button class="btn primary small" data-sport="f1">${icon('info')} Formula 1 details</button></div>${providerList()}<div class="panel"><h2>More sports added</h2><p class="small-text">Basketball, ice hockey, golf, cricket, rugby, handball, American football and athletics now have their own filters and accurate provider status.</p></div></aside></div>`;
}
function playerOverlay(c){
 const sourceList=sourcesFor(c);const embed=embedFor(c);
 if(embed)return `<iframe id="stream-embed" class="active" src="${esc(embed)}" title="${esc(c.embedLabel||c.name+' official player')}" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe>`;
 const playable=sourceList.length>0;
 const playableMessage=publishedAudit(c)?.result==='programme-blackout'
  ?'A signal is available, but the latest Spain picture check showed the broadcaster’s rights slate. Tap Play to see whether the programme has changed.'
  :'Ready to test this channel on your device. Tap Play; alternative feeds are tried automatically when configured.';
 return `<div class="player-back" id="player-back"></div><div class="player-overlay" id="player-overlay"><span class="play-symbol">${icon(playable?'play':'tv')}</span><h2>${esc(c.name)}</h2><p>${playable?playableMessage:'No authorised browser-compatible player is configured for this channel. '+esc(c.geo||'Provider access is required.')}</p><div class="quick-actions" style="justify-content:center">${playable?`<button class="btn primary" data-attempt="1">${icon('play')} Play in app</button>`:''}</div></div><video id="stream-video" playsinline controls preload="none" aria-label="Live TV player"></video>`;
}
function playerPanel(c){
 const sourceList=sourcesFor(c);const embed=embedFor(c);
 const sourceText=embed?esc(c.embedLabel||'Official embedded player'):sourceList.length?`${sourceList.length} in-app HLS candidate(s). The player retries fallbacks and confirms decoded, advancing transport. Visible programme content is audited separately.`:'No supported feed supplied. Proprietary / subscription broadcasts need an authorised provider integration.';
 return `<div class="panel"><h2>Channel details <span class="tiny-stat">${esc(c.category)}</span></h2><div class="big-channel">${esc(c.name)}</div><p class="small-text">${esc(c.genre)}</p><div class="callout"><div class="meta-label">Configured connection</div><p class="small-text" style="margin:6px 0 0">${sourceText}</p></div><div style="height:13px"></div><div class="meta-label">Last full Spain audit</div><p class="small-text">${esc(publishedAuditSummary(c))}</p><div class="meta-label">This device now</div><p class="small-text" id="source-health">${esc(sourceHealthSummary(c.id))}</p><div class="meta-label">Regional access</div><p class="small-text">${esc(c.geo||'Check provider availability')}</p><div class="quick-actions"><button class="btn small" data-fav="${esc(c.id)}">${icon('heart')} ${fav.has(c.id)?'Favourited':'Add favourite'}</button></div>${sourceList.length?`<div class="quality-picker"><label for="quality-select">Video quality</label><select id="quality-select" aria-label="Choose stream quality"><option value="auto">Auto (adaptive)</option></select><p class="small-text">The player starts at the highest stable rendition up to 1080p. A 720p or 540p source cannot be turned into genuine Full HD.</p></div><div class="quick-actions" style="margin-top:8px"><button class="btn small" data-m3u="${esc(c.id)}">${icon('download')} Export for VLC</button></div>`:''}</div>`;
}
function liveView(){
 const c=lookup(state.selected);let cats=['All','Configured players','German','News','Culture','Sports','Custom'];let arr=channels.filter(ch=>state.filter==='All'||(state.filter==='Configured players'?hasInAppSource(ch):ch.category===state.filter));
 const initialStatus=embedFor(c)?'Official embedded player loaded inside Global TV Hub':sourcesFor(c).length?(publishedAudit(c)?.result==='programme-blackout'?'Ready to retest signal · latest Spain picture audit found the programme blocked':'Ready · press Play to test this source on this device'):'Unavailable inside the app · '+(c.geo||'no authorised player configured');
 return `<div class="page-header"><div><h1>Live TV</h1><p>Tap a configured channel to test its signal on this device. A decoded signal and a visible programme are reported separately.</p></div><span class="tiny-stat">${channels.length} listed · ${hlsChannelCount()} HLS + ${channels.filter(c=>embedFor(c)).length} official embed</span></div><div class="live-layout"><div class="stage"><div class="player" id="player-container">${playerOverlay(c)}</div><div class="player-actions"><button class="btn small" data-fav="${esc(c.id)}">${icon('heart')} ${fav.has(c.id)?'Remove favourite':'Add to favourites'}</button>${sourcesFor(c).length?`<button class="btn small" data-attempt="1">${icon('play')} Play / retry</button>${sourcesFor(c).length>1?`<button class="btn small" data-next-source="1">${icon('arrow')} Try another feed</button>`:''}<button class="btn small" data-rights="1">${icon('info')} Report rights slate</button><button class="btn small" data-m3u="${esc(c.id)}">${icon('download')} VLC export</button>`:''}</div><div id="player-status" class="player-status" aria-live="polite">Selected: ${esc(c.name)} · ${esc(initialStatus)}</div>${channelSchedule(c)}</div><aside class="aside"><div class="panel"><h2>All Channels <span class="tiny-stat">${channels.length}</span></h2><div class="chips" style="margin:6px 0 9px">${cats.map(x=>`<button class="chip ${x===state.filter?'active':''}" data-filter="${esc(x)}">${esc(x)}</button>`).join('')}</div><div class="channel-list">${arr.length?arr.map(ch=>`<button data-channel="${esc(ch.id)}" class="${state.selected===ch.id?'selected':''}" style="--tile:${esc(ch.color)}">${channelLogo(ch,'list-logo')}<span class="list-info"><strong>${esc(ch.name)}</strong><small>${esc(catalogueStatus(ch))}</small></span><span class="little-dot ${hasInAppSource(ch)?'with-feed':''}" title="${esc(catalogueStatus(ch))}"></span></button>`).join(''):'<p class="small-text">No channels in this group.</p>'}</div></div>${playerPanel(c)}</aside></div>`;
}
function guideView(){const guideChannels=channels.filter(guideGroupMatches);return `<div class="page-header"><div><h1>TV Programme Guide</h1><p>Current, upcoming and next-day television programmes in your local time.</p></div><span class="tiny-stat">${epgState.status==='ready'?`${Object.values(epgState.data.channels).filter(list=>list.length).length} channels with listings`:epgState.status==='loading'?'Loading EPG':'EPG unavailable'}</span></div><div class="epg-guide-controls">${guideDateTabs()}<div class="chips">${['All','German TV','Sports','News & Culture'].map(group=>`<button class="chip ${state.guideFilter===group?'active':''}" data-guide-filter="${esc(group)}">${esc(group)}</button>`).join('')}</div></div><div class="status-line">${icon('info')} Real programme titles from ${esc(epgState.data?.provider?.name||'the programme guide provider')} · ${esc(scheduleAge())}. Listings do not unlock restricted channels.</div><section class="section epg-overview"><div class="epg-overview-head"><h2>${esc(formatGuideDate(state.guideDay))} · ${esc(state.guideFilter)}</h2><span>Now and next</span></div>${guideChannels.map(guideOverviewRow).join('')}</section>`;}
function favoritesView(){
  const c=channels.filter(ch=>fav.has(ch.id));
  const s=sports.filter(sp=>fav.has(sp.id));
  let out=`<div class="page-header"><div><h1>My Favourites</h1><p>Your selected TV channels and sports, saved on this device.</p></div></div>`;
  if(c.length)out+=`<section class="section">${sectionHead('Channels',false)}<div class="channel-grid">${c.map(channelTile).join('')}</div></section>`;
  if(s.length)out+=`<section class="section">${sectionHead('Sports',false)}<div class="sports-grid">${s.map(sportTile).join('')}</div></section>`;
  if(!c.length&&!s.length)out+=`<div class="empty"><h2>No favourites yet</h2><p>Explore Live TV or Sports and add channels you want to find quickly.</p><button class="btn primary" data-nav="live">Browse TV</button></div>`;
  return out;
}
function searchView(){const q=state.search.trim().toLowerCase();let c=channels.filter(x=>(x.name+' '+x.genre+' '+x.short).toLowerCase().includes(q)),s=sports.filter(x=>(x.name+' '+x.description+' '+x.provider).toLowerCase().includes(q));return `<div class="page-header"><div><h1>Search</h1><p>${q?`Results for “${esc(state.search)}”`:'Search TV channels and sports providers using the box above.'}</p></div></div>${c.length?`<section class="section">${sectionHead(`Channels (${c.length})`,false)}<div class="channel-grid">${c.map(channelTile).join('')}</div></section>`:''}${s.length?`<section class="section">${sectionHead(`Sports (${s.length})`,false)}<div class="sports-grid">${s.map(sportTile).join('')}</div></section>`:''}${!(c.length||s.length)?'<div class="empty"><h2>No results found</h2><p>Try a different channel, country or sport.</p></div>':''}`;}
function settingsView(){return `<div class="page-header"><div><h1>Settings & Sources</h1><p>Manage local playlists, streaming preferences and your dashboard.</p></div></div><div class="settings-grid"><div class="setting-card"><h2>Connect a channel to the in-app player</h2><p>If your TV/IPTV provider gives you an authorised direct HTTPS HLS address, attach it to ARD, RTL, ProSieben, Sky or any other catalogue channel. It stays on this device and is used before public sources.</p><form id="link-feed-form"><label for="feed-channel">TV channel</label><select id="feed-channel" name="channel">${channels.filter(c=>c.category!=='Custom').map(c=>`<option value="${esc(c.id)}" ${c.id===state.linkChannel?'selected':''}>${esc(c.name)}${linkedSource(c.id)?' · connected':''}</option>`).join('')}</select><label for="feed-url">Your authorised HTTPS HLS stream URL</label><input id="feed-url" name="url" type="url" placeholder="https://your-provider.example/channel/master.m3u8" required/><button class="btn primary" type="submit">Save in-app source</button><button class="btn" type="button" data-unlink="1">Remove channel source</button></form><p class="small-text">Requires a provider-supplied browser-compatible stream. This cannot remove DRM, subscription or territory restrictions. URLs stay in browser storage, not GitHub.</p></div><div class="setting-card"><h2>Add your own stream</h2><p>Save a personal, authorised HLS (.m3u8) or compatible video URL. Playback depends on its format and browser permissions.</p><form id="custom-form"><label for="cname">Channel name</label><input id="cname" name="name" maxlength="60" required placeholder="My local TV channel"/><label for="curl">Stream URL (http or https)</label><input id="curl" name="url" type="url" required placeholder="https://provider.example/live.m3u8"/><button class="btn primary" type="submit">Add channel</button></form></div><div class="setting-card"><h2>Import M3U playlist</h2><p>Import your own legally obtained IPTV channel playlist. Entries are stored only in this browser. Up to 150 custom channels.</p><label for="m3u-file">Select .m3u or .m3u8 file</label><input id="m3u-file" type="file" accept=".m3u,.m3u8,text/plain,application/vnd.apple.mpegurl"/><button class="btn" id="import-button">${icon('download')} Import selected file</button><div class="player-debug">Importing a channel listing does not grant broadcast rights or make blocked streams available.</div></div><div class="setting-card"><h2>My custom channels</h2><p>${customChannels.length} custom channel(s). These can be removed individually.</p>${customChannels.length?customChannels.map(c=>`<div class="provider-row"><div style="flex:1;overflow-wrap:anywhere"><strong>${esc(c.name)}</strong><p>${esc(c.stream)}</p></div><button class="btn small" data-remove="${esc(c.id)}">${icon('close')} Remove</button></div>`).join(''):'<div class="muted-box">No additional streams configured.</div>'}</div><div class="setting-card"><h2>Playback diagnostics</h2><p>Playback success or failure is saved only in this browser. It helps identify unreliable feeds without sending private URLs anywhere.</p><div class="source-history">${channels.filter(c=>streamHealth[c.id]).slice(0,14).map(c=>`<div class="provider-row"><div><strong>${esc(c.name)}</strong><p>${esc(sourceHealthSummary(c.id))}</p></div></div>`).join('')||'<p class="small-text">No streams tested yet.</p>'}</div><button class="btn" data-clear="health">Clear diagnostics</button></div><div class="setting-card"><h2>Local app information</h2><p>Installed PWA shell works offline; television broadcasts require internet access. Playback history and favourites are stored locally.</p><div class="status-line">Catalogue researched: ${esc(catalog.researchDate)}<br/>HD availability is source-dependent. Published Spain results do not replace testing new or private streams on this device.</div><div style="height:11px"></div><button class="btn" data-clear="history">Clear recent channels</button> <button class="btn" data-clear="favorites">Reset favourites</button></div></div>`;}
 function render(){const nav=routes.map(p=>`<button type="button" data-page="${p}" data-nav="${p}" class="${state.page===p?'active':''}" aria-current="${state.page===p?'page':'false'}">${icon(routeIcons[p])}<span>${routeLabel[p]}</span></button>`).join('');const content={home:home,live:liveView,sports:sportsView,guide:guideView,favorites:favoritesView,search:searchView,settings:settingsView}[state.page]();app.innerHTML=`<div class="app-shell"><aside class="sidebar"><div class="brand"><span class="brand-logo">${icon('play')}</span><span>Global TV Hub</span></div><nav class="nav" aria-label="Main navigation">${nav}</nav><div class="sidebar-bottom"><b>Global TV Hub · v0.14.1</b>Picture-verified audits<br/>Now, next & tomorrow<br/>Source status kept honest</div></aside><main class="main"><header class="topbar"><label class="top-search">${icon('search')}<input id="search-input" type="search" aria-label="Search channels and sports" placeholder="Search channels, shows, sports…" value="${esc(state.search)}" autocomplete="off" /></label><div class="top-right"><button class="mobile-settings" type="button" data-nav="settings" aria-label="Settings" title="Settings">${icon('settings')}</button><span class="date">German TV · Sports · International</span><button id="install-button" class="install-button" ${deferredInstall?'':'hidden'}>Install app</button><div class="avatar">TV</div></div></header>${content}<div class="watch-footnote">Global TV Hub is an independent personal dashboard, not affiliated with listed broadcasters. Channel brands belong to their owners. Availability, rights, subscriptions and geoblocking are controlled by providers.</div></main></div><div class="toast" id="toast" role="status" hidden></div>`;}
function setPlayerStatus(message,isError=false){state.playerStatus=message;state.playerError=isError;const el=document.getElementById('player-status');if(el){el.textContent=message;el.classList.toggle('error',isError);}}
function setAttemptControls(label,disabled=false){document.querySelectorAll('[data-attempt]').forEach(button=>{button.disabled=disabled;button.innerHTML=icon('play')+' '+label;});}
function loadHlsScript(){if(window.Hls)return Promise.resolve(window.Hls);if(hlsScriptPromise)return hlsScriptPromise;const urls=['https://cdn.jsdelivr.net/npm/hls.js@1.7.3/dist/hls.min.js','https://unpkg.com/hls.js@1.7.3/dist/hls.min.js'];hlsScriptPromise=new Promise((resolve,reject)=>{let i=0;function loadNext(){if(i>=urls.length){reject(new Error('HLS player unavailable on both CDNs'));return;}const script=document.createElement('script');script.src=urls[i++];script.onload=()=>window.Hls?resolve(window.Hls):loadNext();script.onerror=()=>loadNext();document.head.appendChild(script);}loadNext();}).catch(err=>{hlsScriptPromise=null;throw err;});return hlsScriptPromise;}
async function attemptPlayback(preferAlternative=false){
 const c=lookup(state.selected);const candidates=sourcesFor(c);const lastActive=activeSourceUrl;
 stopPlayback();const token=playToken;const video=document.getElementById('stream-video');if(!video)return;
 if(!candidates.length){setPlayerStatus('No authorised supported stream is available for this channel.',true);return;}
 setAttemptControls('Connecting…',true);
 const overlay=document.getElementById('player-overlay');const backdrop=document.getElementById('player-back');
 const restore=()=>{video.classList.remove('active');if(overlay)overlay.style.display='block';if(backdrop)backdrop.style.display='block';};
 const showVideo=()=>{video.classList.add('active');if(overlay)overlay.style.display='none';if(backdrop)backdrop.style.display='none';};
 const prepare=()=>{if(playbackTimer){clearTimeout(playbackTimer);playbackTimer=null;}if(startupProgressTimer){clearTimeout(startupProgressTimer);startupProgressTimer=null;}if(playerCleanup){playerCleanup();playerCleanup=null;}if(activeHls){activeHls.destroy();activeHls=null;}video.pause();video.removeAttribute('src');video.load();};
 let ordered=[...candidates];const last=workingSources[c.id];
 if(preferAlternative&&lastActive&&ordered.length>1){const idx=ordered.findIndex(s=>s.url===lastActive);if(idx>=0)ordered=[...ordered.slice(idx+1),...ordered.slice(0,idx+1)];}
 else if(c.id!=='ard'&&last&&!linkedSource(c.id)){ordered.sort((a,b)=>(a.url===last?-1:0)-(b.url===last?-1:0));}
 let current=-1;
 function next(reason){
  if(token!==playToken)return;prepare();current++;
  if(current>=ordered.length){recordHealth(c.id,null,'Failed',reason||'No source available');restore();setAttemptControls('Retry in app',false);setPlayerStatus('No compatible stream succeeded'+(reason?` (${reason})`:'')+'. The channel remains inside Global TV Hub; playback is unavailable on this network.',true);return;}
  const src=ordered[current];activeSourceUrl=src.url;setPlayerStatus(`Connecting in app · source ${current+1}/${ordered.length} · ${src.label}…`);showVideo();
  let finished=false;let started=false;let confirmed=false;let firstAdvancingTime=null;
  const fail=(detail)=>{if(finished||token!==playToken)return;finished=true;recordHealth(c.id,src,confirmed?'Interrupted':'Failed',detail);next(detail);};
  const updateConfirmedStatus=()=>{
   if(!confirmed||finished||token!==playToken)return;
   const rendered=video.videoHeight?`${video.videoWidth}×${video.videoHeight}`:'resolution pending';
   recordHealth(c.id,src,'Signal decoded',`Advancing media transport · ${rendered}`);
   const latestVisual=publishedAudit(c)?.result==='programme-blackout'
    ?' Latest Spain visual audit showed an official rights slate; check whether the programme has changed.'
    :' Check the visible picture: automation cannot certify that a broadcaster is showing the programme rather than a rights slate.';
   setAttemptControls('Reconnect',false);setPlayerStatus(`Signal decoded now on this device · ${src.label} · ${rendered}.${latestVisual}`);
  };
  const confirmPlayback=()=>{
   if(confirmed||finished||token!==playToken||video.paused||video.videoWidth<1)return;
   if(firstAdvancingTime===null){firstAdvancingTime=video.currentTime;return;}
   if(video.currentTime-firstAdvancingTime<1.5)return;
   confirmed=true;if(playbackTimer)clearTimeout(playbackTimer);playbackTimer=null;workingSources[c.id]=src.url;persist();
   updateConfirmedStatus();remember(c.id);
  };
  const playing=()=>{if(token!==playToken||finished)return;started=true;setPlayerStatus(`Video started · checking playback stability · ${src.label}…`);};
  const videoError=()=>fail(video.error?.message||'video error');
  const stalled=()=>{if(token!==playToken||finished||video.paused||video.seeking||startupProgressTimer)return;startupProgressTimer=setTimeout(()=>{startupProgressTimer=null;if(token!==playToken||finished)return;if(!video.paused&&!video.seeking&&video.readyState<3)fail('stream stalled');},16000);};
  const progressing=()=>{if(startupProgressTimer){clearTimeout(startupProgressTimer);startupProgressTimer=null;}confirmPlayback();};
  video.addEventListener('playing',playing);video.addEventListener('error',videoError);video.addEventListener('waiting',stalled);video.addEventListener('timeupdate',progressing);video.addEventListener('resize',updateConfirmedStatus);
  playerCleanup=()=>{video.removeEventListener('playing',playing);video.removeEventListener('error',videoError);video.removeEventListener('waiting',stalled);video.removeEventListener('timeupdate',progressing);video.removeEventListener('resize',updateConfirmedStatus);};
  playbackTimer=setTimeout(()=>{playbackTimer=null;if(!confirmed)fail(started?'video did not advance':'startup timeout');},18000);
  const startNative=()=>{video.src=src.url;video.play().catch(e=>{if(e.name==='NotAllowedError'){if(playbackTimer)clearTimeout(playbackTimer);playbackTimer=null;setAttemptControls('Play in app',false);setPlayerStatus('Stream loaded, but this browser blocked automatic start. Press Play in app or the video control.');}else fail('playback rejected');});};
  (async()=>{
   if(!src.url.startsWith('https:')&&location.protocol==='https:'){fail('HTTPS is required on this page');return;}
   const nativeHls=!!video.canPlayType('application/vnd.apple.mpegurl');
   try{
    const Hls=await loadHlsScript();if(token!==playToken||finished||current>=ordered.length)return;
    if(!Hls.isSupported()){if(nativeHls)startNative();else fail('HLS unsupported');return;}
    const hls=new Hls({enableWorker:true,lowLatencyMode:false,capLevelToPlayerSize:false,abrEwmaDefaultEstimate:8000000,maxBufferLength:25,backBufferLength:30});activeHls=hls;
    hls.attachMedia(video);hls.on(Hls.Events.MEDIA_ATTACHED,()=>{if(token===playToken&&!finished)hls.loadSource(src.url);});
    hls.on(Hls.Events.MANIFEST_PARSED,()=>{if(token!==playToken||finished)return;const preferred=showQualityOptions(hls,c);if(preferred){hls.currentLevel=preferred.i;setPlayerStatus(`Connecting in app · ${preferred.height}p preferred · ${src.label}…`);}video.play().catch(e=>{if(e.name==='NotAllowedError'){if(playbackTimer)clearTimeout(playbackTimer);playbackTimer=null;setAttemptControls('Play in app',false);setPlayerStatus('Stream loaded, but this browser blocked automatic start. Press Play in app or the video control.');}else fail('playback rejected');});});
    let mediaRecoveryAttempted=false;
    hls.on(Hls.Events.ERROR,(_event,data)=>{if(!data.fatal||token!==playToken)return;if(data.type===Hls.ErrorTypes.MEDIA_ERROR&&!mediaRecoveryAttempted){mediaRecoveryAttempted=true;setPlayerStatus('Recovering player decoding inside the app…');hls.recoverMediaError();return;}fail(data.details||data.type||'HLS error');});
   }catch(e){if(nativeHls)startNative();else fail(e.message||'player load error');}
  })();
 }
 next('');
}
function showQualityOptions(hls,c){
 const select=document.getElementById('quality-select');if(!select)return;
 select.innerHTML='<option value="auto">Auto (adaptive)</option>';const levels=Array.isArray(hls.levels)?hls.levels:[];
 const options=levels.map((level,i)=>({i,height:level.height||0,rate:level.bitrate||0})).filter(x=>x.height>0).sort((a,b)=>b.height-a.height||b.rate-a.rate);
 const seen=new Set();
 for(const level of options){const label=level.height+'p';if(seen.has(label))continue;seen.add(label);const el=document.createElement('option');el.value=String(level.i);el.textContent=label+(level.height>=720?' · HD':'');select.appendChild(el);}
 const ceiling=Number(c?.preferredMaxHeight)||1080;const preferred=options.find(x=>x.height<=ceiling)||options[0]||null;
 select.disabled=false;if(preferred)select.value=String(preferred.i);return preferred;
}
function getM3u(c){const stream=sourcesFor(c)[0]?.url||'';return `#EXTM3U\n#EXTINF:-1 tvg-name="${c.name.replace(/[\r\n\"<>]/g,'')}" group-title="Global TV Hub",${c.name.replace(/[\r\n]/g,'')}\n${stream}\n`;}
function exportVlc(id){const c=lookup(id);if(!sourcesFor(c).length)return toast('This channel has no configured playback source.');const blob=new Blob([getM3u(c)],{type:'audio/x-mpegurl;charset=utf-8'});const object=URL.createObjectURL(blob);const a=document.createElement('a');a.href=object;a.download='global-tv-hub-'+c.id+'.m3u';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(object),1500);toast('VLC playlist downloaded. Open it in VLC; regional restrictions still apply.');}
async function copyStream(id){const c=lookup(id);if(!sourcesFor(c).length)return;try{await navigator.clipboard.writeText(sourcesFor(c)[0].url);toast('Stream URL copied for VLC.');}catch{toast('Clipboard unavailable. Use Export for VLC instead.');}}
function openSport(id){const s=sports.find(x=>x.id===id);if(!s)return;state.selectedSport=id;navigate('sports');const panel=document.getElementById('sports-detail');if(panel){panel.focus({preventScroll:true});}}
function selectChannel(id){if(!channels.some(c=>c.id===id))return;state.selected=id;state.guideDay=0;navigate('live');}
function addCustom(name,url){if(customChannels.length>=150)throw Error('Maximum of 150 custom channels.');if(!safeUrl(url))throw Error('Enter a valid http(s) stream URL.');const cleaned=name.trim().slice(0,60);if(!cleaned)throw Error('Channel name cannot be empty.');const id='custom-'+cryptoSafeId();const ch={id,name:cleaned,short:cleaned.slice(0,12),category:'Custom',genre:'Your playlist · Unverified',color:'#34598a',official:null,stream:safeUrl(url),geo:'Source not validated',brand:'custom'};customChannels.push(ch);channels=[...fixedChannels,...customChannels];persist();}
function cryptoSafeId(){return Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,8);}
function parseM3u(content){const lines=content.replace(/^\uFEFF/,'').split(/\r?\n/);if(!lines[0]?.trim().startsWith('#EXTM3U'))throw Error('This is not a recognised M3U playlist.');let pending=null;let count=0;for(const raw of lines.slice(1)){const l=raw.trim();if(l.startsWith('#EXTINF')){const m=l.match(/tvg-name="([^"]+)"/);pending=(m?m[1]:l.split(',').slice(1).join(','))||'IPTV Channel';}else if(l.startsWith('#')){continue;}else if(pending&&safeUrl(l)){if(customChannels.length>=150)break;addCustom(pending,l);count++;pending=null;}}return count;}
app.addEventListener('click', e => {const el=e.target.closest('[data-nav],[data-channel],[data-sport],[data-sport-close],[data-official],[data-attempt],[data-next-source],[data-rights],[data-fav],[data-copy],[data-m3u],[data-filter],[data-sport-filter],[data-guide-day],[data-guide-filter],[data-remove],[data-clear],[data-link-channel],[data-unlink],#import-button,#install-button');if(!el)return;if(el.dataset.nav){navigate(el.dataset.nav);return;}if(el.dataset.channel){selectChannel(el.dataset.channel);return;}if(el.dataset.sport){openSport(el.dataset.sport);return;}if(el.dataset.sportClose){state.selectedSport=null;render();return;}if(el.dataset.official){const c=lookup(el.dataset.official);if(c.official)openOfficial(c.official);else toast('This custom channel has no official broadcaster page.');return;}if(el.dataset.attempt){attemptPlayback();return;}if(el.dataset.nextSource){attemptPlayback(true);return;}if(el.dataset.rights){recordHealth(state.selected,{label:'Broadcaster feed'},'Programme blocked','Viewer confirmed a rights slate instead of the advertised programme');if(sourcesFor(lookup(state.selected)).length>1)attemptPlayback(true);else setPlayerStatus('Programme blocked on this device. The broadcaster supplied no lawful alternative feed.',true);return;}if(el.dataset.linkChannel){state.linkChannel=el.dataset.linkChannel;navigate('settings');return;}if(el.dataset.unlink){const select=document.getElementById('feed-channel');if(select?.value){delete linkedFeeds[select.value];delete workingSources[select.value];persist();render();toast('Linked source removed.');}return;}if(el.dataset.fav){toggleFavorite(el.dataset.fav);return;}if(el.dataset.copy){copyStream(el.dataset.copy);return;}if(el.dataset.m3u){exportVlc(el.dataset.m3u);return;}if(el.dataset.filter){state.filter=el.dataset.filter;render();return;}if(el.dataset.sportFilter){state.selectedSport=null;state.sportsFilter=el.dataset.sportFilter;render();return;}if(Object.prototype.hasOwnProperty.call(el.dataset,'guideDay')){state.guideDay=Math.max(0,Math.min(2,Number(el.dataset.guideDay)||0));if(state.page==='live')updateChannelSchedule();else render();return;}if(el.dataset.guideFilter){state.guideFilter=el.dataset.guideFilter;render();return;}if(el.dataset.remove){customChannels=customChannels.filter(c=>c.id!==el.dataset.remove);channels=[...fixedChannels,...customChannels];if(state.selected===el.dataset.remove)state.selected='ard';persist();render();toast('Custom channel removed.');return;}if(el.dataset.clear==='health'){streamHealth={};storage.set('streamHealth',streamHealth);render();toast('Playback diagnostics cleared.');return;}if(el.dataset.clear==='history'){recent=[];persist();render();toast('Recent channels cleared.');return;}if(el.dataset.clear==='favorites'){fav.clear();persist();render();toast('Favourites cleared.');return;}if(el.id==='install-button'&&deferredInstall){deferredInstall.prompt();deferredInstall=null;render();return;}if(el.id==='import-button'){const file=document.getElementById('m3u-file')?.files?.[0];if(!file)return toast('Choose a playlist file first.');if(file.size>1024*1024)return toast('Playlist must be smaller than 1 MB.');file.text().then(t=>{const n=parseM3u(t);render();toast(`Imported ${n} playlist channels.`);}).catch(e=>toast(e.message));}});
app.addEventListener('change',e=>{if(e.target.id!=='quality-select'||!activeHls)return;
 const value=e.target.value;
 if(value==='auto'){activeHls.currentLevel=-1;setPlayerStatus('Automatic quality selected.');return;}
 const idx=Number(value);if(!Number.isInteger(idx)||idx<0||idx>=activeHls.levels.length)return;
 activeHls.currentLevel=idx;setPlayerStatus('Selected '+(activeHls.levels[idx].height||'available')+'p from broadcaster manifest.');
});
app.addEventListener('submit',e=>{if(e.target.id==='link-feed-form'){e.preventDefault();const form=e.target;const id=form.elements.channel.value;const u=safeUrl(form.elements.url.value);if(!channels.some(c=>c.id===id)||!u||!u.startsWith('https:')||!(/\.m3u8?(?:[?#]|$)/i.test(u))){toast('Please enter an authorised HTTPS HLS (.m3u8) URL.');return;}linkedFeeds[id]=u;delete workingSources[id];persist();state.linkChannel=id;render();toast('Source linked to '+lookup(id).name+'. Open Live TV to test playback here.');return;}if(e.target.id!=='custom-form')return;e.preventDefault();const form=e.target;try{addCustom(form.elements.name.value,form.elements.url.value);render();toast('Custom channel added.');}catch(err){toast(err.message||'Unable to add channel.');}});
app.addEventListener('input',e=>{if(e.target.id==='search-input'){const pos=e.target.selectionStart;state.search=e.target.value;if(state.page==='live')stopPlayback();state.page='search';window.history.replaceState(null,'','#search');render();const input=document.getElementById('search-input');input.focus();input.setSelectionRange(pos,pos);}});
window.addEventListener('hashchange',()=>{const p=location.hash.slice(1);if(routes.includes(p)&&p!==state.page)navigate(p);});
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferredInstall=e;const button=document.getElementById('install-button');if(button)button.hidden=false;});
state.page=routes.includes(location.hash.slice(1))?location.hash.slice(1):'home';
render();
loadEpg();
if('serviceWorker'in navigator && (location.protocol==='https:'||location.hostname==='localhost'||location.hostname==='127.0.0.1'))navigator.serviceWorker.register('./sw.js').catch(()=>{});
})();
