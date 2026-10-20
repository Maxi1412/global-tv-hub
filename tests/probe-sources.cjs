// Public HLS path checks. This is not visual playback testing or rights clearance.
// It requests manifests plus at most 32 KiB of one media segment per public source.
const fs=require('node:fs');
const vm=require('node:vm');
const data=fs.readFileSync('data.js','utf8');
const ctx={window:{}};
vm.runInNewContext(data,ctx,{filename:'data.js'});
const channels=ctx.window.TV_DATA.channels.filter(x=>x.stream);
const sources=channels.flatMap(c=>[{id:c.id,name:c.name,url:c.stream,priority:'primary'},...((c.streams||[]).map((s,i)=>({id:c.id,name:c.name,url:s.url,priority:'fallback'+(i+1)})))]);
const region=process.env.AUDIT_REGION||(process.env.GITHUB_ACTIONS?'GitHub Actions runner; NOT Spain playback':'Local network; set AUDIT_REGION for a geographic claim');
const headers={'Accept':'application/vnd.apple.mpegurl, application/x-mpegURL, */*','User-Agent':'Mozilla/5.0 (compatible; GlobalTVHubFeedCheck/2.0)'};
const limit=6;

function absolute(base,relative){try{return new URL(relative,base).href;}catch{return null;}}
function nonCommentLines(text){return text.split(/\r?\n/).map(x=>x.trim()).filter(x=>x&&!x.startsWith('#'));}
function variants(text,base){
  const lines=text.split(/\r?\n/).map(x=>x.trim());const found=[];
  for(let i=0;i<lines.length;i++){
    if(!lines[i].startsWith('#EXT-X-STREAM-INF:'))continue;
    const attrs=lines[i];let next='';for(let j=i+1;j<lines.length;j++){if(lines[j]&&!lines[j].startsWith('#')){next=lines[j];break;}}
    if(!next)continue;
    const res=attrs.match(/RESOLUTION=(\d+)x(\d+)/i);const bandwidth=Number(attrs.match(/BANDWIDTH=(\d+)/i)?.[1]||0);
    found.push({url:absolute(base,next),width:Number(res?.[1]||0),height:Number(res?.[2]||0),bandwidth});
  }
  return found.filter(x=>x.url).sort((a,b)=>(b.width*b.height-a.width*a.height)||(b.bandwidth-a.bandwidth));
}
async function fetchText(url){
  const start=Date.now();
  const res=await fetch(url,{signal:AbortSignal.timeout(9000),headers});
  const text=await res.text();
  return {url:res.url,status:res.status,ok:res.ok,text,latencyMs:Date.now()-start,cors:res.headers.get('access-control-allow-origin'),contentType:res.headers.get('content-type')};
}
async function sampleSegment(url){
  const start=Date.now();const controller=new AbortController();const timer=setTimeout(()=>controller.abort(),9000);
  try{
    const res=await fetch(url,{signal:controller.signal,headers:{...headers,Range:'bytes=0-32767'}});
    let bytes=0;const reader=res.body?.getReader();
    if(reader){while(bytes<32768){const {done,value}=await reader.read();if(done)break;bytes+=value?.byteLength||0;}await reader.cancel().catch(()=>{});}
    return {url:res.url,status:res.status,ok:res.ok,bytes:Math.min(bytes,32768),latencyMs:Date.now()-start,cors:res.headers.get('access-control-allow-origin'),contentType:res.headers.get('content-type')};
  }finally{clearTimeout(timer);controller.abort();}
}
async function probe(s){
  const started=Date.now();
  try{
    const root=await fetchText(s.url);
    if(!root.ok)return {...s,status:'http-'+root.status,latencyMs:Date.now()-started,manifest:{status:root.status,cors:root.cors,contentType:root.contentType}};
    if(!root.text.trimStart().startsWith('#EXTM3U'))return {...s,status:'not-hls-manifest',latencyMs:Date.now()-started,manifest:{status:root.status,cors:root.cors,contentType:root.contentType,bytes:root.text.length}};
    const choices=variants(root.text,root.url);const chosen=choices[0]||null;
    const media=chosen?await fetchText(chosen.url):root;
    if(!media.ok||!media.text.trimStart().startsWith('#EXTM3U'))return {...s,status:'media-playlist-failed',latencyMs:Date.now()-started,advertisedResolutions:[...new Set(choices.filter(x=>x.height).map(x=>`${x.width}x${x.height}`))],manifest:{status:root.status,cors:root.cors},mediaPlaylist:{url:media.url,status:media.status,cors:media.cors}};
    const segmentRelative=nonCommentLines(media.text)[0];const segmentUrl=segmentRelative&&absolute(media.url,segmentRelative);
    if(!segmentUrl)return {...s,status:'manifest-ok-no-segment',latencyMs:Date.now()-started,advertisedResolutions:[...new Set(choices.filter(x=>x.height).map(x=>`${x.width}x${x.height}`))],manifest:{status:root.status,cors:root.cors},mediaPlaylist:{url:media.url,status:media.status,cors:media.cors}};
    const segment=await sampleSegment(segmentUrl);
    return {...s,status:segment.ok&&segment.bytes>0?'segment-sample-ok':'segment-sample-failed',latencyMs:Date.now()-started,advertisedResolutions:[...new Set(choices.filter(x=>x.height).map(x=>`${x.width}x${x.height}`))],selectedResolution:chosen?.height?`${chosen.width}x${chosen.height}`:null,manifest:{status:root.status,cors:root.cors,contentType:root.contentType},mediaPlaylist:{url:media.url,status:media.status,cors:media.cors,contentType:media.contentType},segment};
  }catch(e){return {...s,status:'network-or-region-error',detail:String(e.message||e).slice(0,160),latencyMs:Date.now()-started};}
}
(async()=>{
  const results=[];
  for(let i=0;i<sources.length;i+=limit)results.push(...await Promise.all(sources.slice(i,i+limit).map(probe)));
  const summary={generatedAt:new Date().toISOString(),region,checked:results.length,manifestOk:results.filter(x=>['segment-sample-ok','segment-sample-failed','manifest-ok-no-segment'].includes(x.status)).length,segmentSampleOk:results.filter(x=>x.status==='segment-sample-ok').length,advertises1080p:results.filter(x=>(x.advertisedResolutions||[]).some(r=>Number(r.split('x')[1])>=1080)).length,below1080p:results.filter(x=>x.selectedResolution&&Number(x.selectedResolution.split('x')[1])<1080).length,failed:results.filter(x=>!['segment-sample-ok','manifest-ok-no-segment'].includes(x.status)).length};
  fs.writeFileSync('source-health-ci.json',JSON.stringify({summary,results},null,2));
  console.log('PUBLIC FEED PATH AUDIT: '+JSON.stringify(summary));
  for(const x of results)console.log(x.id+' '+x.priority+' '+x.status+' '+x.latencyMs+'ms'+(x.selectedResolution?' '+x.selectedResolution:''));
})().catch(e=>{console.error(e);process.exitCode=1;});
