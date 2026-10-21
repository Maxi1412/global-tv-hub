async page => {
  const base = page.url().startsWith('http')
    ? await page.evaluate(() => location.origin + (location.pathname.endsWith('/') ? location.pathname : location.pathname.replace(/[^/]*$/, '')))
    : 'http://127.0.0.1:8765/';
  const channels = await page.evaluate(() => window.TV_DATA.channels
    .filter(channel => channel.stream || channel.streams?.length)
    .map(channel => ({id:channel.id,name:channel.name})));
  const results = [];

  for (const channel of channels) {
    await page.goto(`${base}?visual-content-audit=${encodeURIComponent(channel.id)}#live`);
    const startedAt = Date.now();
    try {
      await page.locator(`[data-channel="${channel.id}"]`).first().evaluate(element => element.click());
      await page.waitForFunction(() => {
        const video = document.querySelector('#stream-video');
        const status = document.querySelector('#player-status')?.textContent || '';
        return video && video.videoWidth > 0 && video.currentTime > 0 && status.startsWith('Signal decoded');
      }, {timeout:30000});
      await page.waitForTimeout(2500);
      const first = await page.locator('#stream-video').evaluate(video => ({
        time:video.currentTime,
        width:video.videoWidth,
        height:video.videoHeight
      }));
      await page.locator('#stream-video').screenshot({
        path:`.playwright-cli/visual-audit/${channel.id}-a.png`,
        animations:'disabled'
      });
      await page.waitForTimeout(2500);
      const second = await page.locator('#stream-video').evaluate(video => ({
        time:video.currentTime,
        width:video.videoWidth,
        height:video.videoHeight
      }));
      await page.locator('#stream-video').screenshot({
        path:`.playwright-cli/visual-audit/${channel.id}-b.png`,
        animations:'disabled'
      });
      results.push({
        id:channel.id,
        name:channel.name,
        outcome:'transport-confirmed-content-review-required',
        startupMs:Date.now()-startedAt-5000,
        advancedSeconds:Number((second.time-first.time).toFixed(2)),
        resolution:`${second.width}x${second.height}`,
        screenshots:[`${channel.id}-a.png`,`${channel.id}-b.png`]
      });
    } catch (error) {
      results.push({
        id:channel.id,
        name:channel.name,
        outcome:'capture-failed',
        startupMs:Date.now()-startedAt,
        error:String(error).split('\n')[0],
        status:await page.locator('#player-status').textContent().catch(() => null)
      });
    }
  }

  return {
    testedAt:new Date().toISOString(),
    total:results.length,
    captures:results.filter(result => result.outcome.startsWith('transport-confirmed')).length,
    failures:results.filter(result => result.outcome==='capture-failed').length,
    results
  };
}
