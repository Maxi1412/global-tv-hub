// Public HLS manifest checks from GitHub Actions, NOT playback tests in Spain.
// Never requests media segments, private credentials, subscription services or user-entered URLs.
const fs=require('node:fs');
const vm=require('node:vm');
const data=fs.readFileSync('data.js','utf8');
const ctx={window:{}};
vm.runInNewContext(data,ctx,{filename:'data.js'});
const channels=ctx.window.TV_DATA.channels.filter(x=>x.stream);
const sources=channels.flatMap(c=>[{id:c.id,name:c.name,url:c.stream,priority:'primary'},...((c.streams||[]).map((s,i)=>({id:c.id,name:c.name,url:s.url,priority:'fallback'+(i+1)})))]);
const limit=8;
async function probe(s){
  const start=Date.now();
  try{
    const res=await fetch(s.url,{signal:AbortSignal.timeout(8500),headers:{'Accept':'application/vnd.apple.mpegurl, application/x-mpegURL, */*','User-Agent':'Mozilla/5.0 (compatible; GlobalTVHubFeedCheck/1.0)'}});
    if(!res.ok)return {...s,status:'http-'+res.status,latencyMs:Date.now()-start};
    const bytes=await res.text();
    return {...s,status:bytes.trimStart().startsWith('#EXTM3U')?'manifest-ok':'not-hls-manifest',latencyMs:Date.now()-start,bytes:bytes.length};
  }catch(e){
    return {...s,status:'network-or-region-error',detail:String(e.message||e).slice(0,100),latencyMs:Date.now()-start};
  }
}
(async()=>{
  const results=[];
  for(let i=0;i<sources.length;i+=limit){
    const group=await Promise.all(sources.slice(i,i+limit).map(probe));
    results.push(...group);
  }
  const summary={generatedAt:new Date().toISOString(),region:'GitHub Actions runner; NOT Spain',checked:results.length,ok:results.filter(x=>x.status==='manifest-ok').length,failed:results.filter(x=>x.status!=='manifest-ok').length};
  fs.writeFileSync('source-health-ci.json',JSON.stringify({summary,results},null,2));
  console.log('PUBLIC FEED MANIFEST AUDIT: '+JSON.stringify(summary));
  for(const x of results)console.log(x.id+' '+x.priority+' '+x.status+' '+x.latencyMs+'ms');
})().catch(e=>{console.error(e);process.exitCode=1;});
