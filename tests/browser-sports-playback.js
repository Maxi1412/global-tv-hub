async page => {
  await page.setViewportSize({width:1440,height:900});
  const base = page.url().startsWith('http') ? await page.evaluate(() => location.origin + (location.pathname.endsWith('/') ? location.pathname : location.pathname.replace(/[^/]*$/, ''))) : 'http://127.0.0.1:8765/';
  const channelIds = ['morethansports','teledeporte','motorvision','worldfreesports','redbulltv','fifaplusfast','tennischannel'];
  const results = [];
  for (const id of channelIds) {
    await page.goto(`${base}?sports-audit=${id}#sports`);
    const startedAt = Date.now();
    let error = null;
    try {
      // The click immediately rerenders the app, so invoke the DOM control directly
      // instead of waiting for Playwright's post-click stability on a detached tile.
      await page.locator(`[data-channel="${id}"]`).first().evaluate(element => element.click());
      await page.waitForFunction(() => {
        const video = document.querySelector('#stream-video');
        return video && video.videoWidth > 0 && video.currentTime > 0;
      }, {timeout:30000});
      const before = await page.locator('#stream-video').evaluate(video => video.currentTime);
      await page.waitForTimeout(1800);
      const after = await page.locator('#stream-video').evaluate(video => video.currentTime);
      const video = await page.locator('#stream-video').evaluate(element => ({
        width:element.videoWidth,
        height:element.videoHeight,
        readyState:element.readyState,
        paused:element.paused
      }));
      results.push({id,startedMs:Date.now()-startedAt,advancedSeconds:Number((after-before).toFixed(2)),...video,status:(await page.locator('#player-status').textContent())?.trim()});
    } catch (playbackError) {
      error = String(playbackError).split('\n')[0];
      results.push({id,startedMs:Date.now()-startedAt,error,status:await page.locator('#player-status').textContent().catch(()=>null)});
    }
  }
  return {results,failures:results.filter(item => item.error || item.advancedSeconds <= 0 || item.height < 720)};
}
