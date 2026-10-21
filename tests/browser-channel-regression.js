async page => {
  await page.setViewportSize({width:1440,height:900});
  await page.goto('http://127.0.0.1:8765/?channel-list=1#live');
  const sports = new Set(['morethansports','teledeporte','motorvision','worldfreesports','redbulltv']);
  const channelIds = await page.evaluate(() => window.TV_DATA.channels.filter(channel => channel.stream).map(channel => channel.id));
  const results = [];
  for (const id of channelIds.filter(id => !sports.has(id))) {
    await page.goto(`http://127.0.0.1:8765/?channel-audit=${id}#live`);
    const startedAt = Date.now();
    try {
      await page.locator(`[data-channel="${id}"]`).first().evaluate(element => element.click());
      await page.waitForFunction(() => {
        const video = document.querySelector('#stream-video');
        return video && video.videoWidth > 0 && video.currentTime > 0;
      }, {timeout:30000});
      const before = await page.locator('#stream-video').evaluate(video => video.currentTime);
      await page.waitForTimeout(1600);
      const after = await page.locator('#stream-video').evaluate(video => video.currentTime);
      const video = await page.locator('#stream-video').evaluate(element => ({width:element.videoWidth,height:element.videoHeight,readyState:element.readyState,paused:element.paused}));
      results.push({id,startedMs:Date.now()-startedAt,advancedSeconds:Number((after-before).toFixed(2)),...video});
    } catch (playbackError) {
      results.push({id,startedMs:Date.now()-startedAt,error:String(playbackError).split('\n')[0],status:await page.locator('#player-status').textContent().catch(()=>null)});
    }
  }
  return {results,failures:results.filter(item => item.error || item.advancedSeconds <= 0 || item.height < 540)};
}
