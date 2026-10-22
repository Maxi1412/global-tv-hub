async page => {
  const base = page.url().startsWith('http')
    ? await page.evaluate(() => location.origin + (location.pathname.endsWith('/') ? location.pathname : location.pathname.replace(/[^/]*$/, '')))
    : 'http://127.0.0.1:8765/';
  const device = await page.evaluate(() => ({
    userAgent:navigator.userAgent,
    viewport:{width:innerWidth,height:innerHeight},
    touchPoints:navigator.maxTouchPoints
  }));
  await page.goto(`${base}?full-catalog-audit=1#live`);
  const channels = await page.evaluate(() => window.TV_DATA.channels.map(channel => ({
    id:channel.id,
    name:channel.name,
    category:channel.category,
    hasHls:!!channel.stream || !!channel.streams?.length,
    hasEmbed:!!channel.embed,
    statedReason:channel.geo || ''
  })));
  const results = [];
  const browserErrors = [];
  let activeId = '';
  const onConsole = message => {
    if (message.type() === 'error') browserErrors.push({id:activeId,type:'console',source:message.location().url,detail:message.text().slice(0,220)});
  };
  const onPageError = error => browserErrors.push({id:activeId,type:'pageerror',detail:String(error.message || error).slice(0,220)});
  page.on('console', onConsole);
  page.on('pageerror', onPageError);
  for (const channel of channels) {
    activeId = channel.id;
    await page.goto(`${base}?full-catalog-audit=${encodeURIComponent(channel.id)}#live`);
    const startedAt = Date.now();
    try {
      await page.locator(`[data-channel="${channel.id}"]`).first().evaluate(element => element.click());
      if (channel.hasHls) {
        await page.waitForFunction(() => {
          const video = document.querySelector('#stream-video');
          const status = document.querySelector('#player-status')?.textContent || '';
          return video && video.videoWidth > 0 && video.currentTime > 0 && status.startsWith('Signal decoded');
        }, null, {timeout:30000});
        const startupMs=Date.now()-startedAt;
        // Allow the first adaptive switch to settle, then measure a longer window.
        await page.waitForTimeout(3000);
        const first = await page.locator('#stream-video').evaluate(video => {
          const quality=video.getVideoPlaybackQuality ? video.getVideoPlaybackQuality() : null;
          return {
            time:video.currentTime,
            width:video.videoWidth,
            height:video.videoHeight,
            readyState:video.readyState,
            paused:video.paused,
            bufferedAhead:video.buffered.length ? Math.max(0, video.buffered.end(video.buffered.length - 1) - video.currentTime) : 0,
            totalVideoFrames:Number(quality?.totalVideoFrames || 0),
            droppedVideoFrames:Number(quality?.droppedVideoFrames || 0),
            audioDecodedBytes:Number(video.webkitAudioDecodedByteCount || 0)
          };
        });
        await page.waitForTimeout(10000);
        const second = await page.locator('#stream-video').evaluate(video => {
          const quality=video.getVideoPlaybackQuality ? video.getVideoPlaybackQuality() : null;
          return {
            time:video.currentTime,
            width:video.videoWidth,
            height:video.videoHeight,
            readyState:video.readyState,
            paused:video.paused,
            bufferedAhead:video.buffered.length ? Math.max(0, video.buffered.end(video.buffered.length - 1) - video.currentTime) : 0,
            totalVideoFrames:Number(quality?.totalVideoFrames || 0),
            droppedVideoFrames:Number(quality?.droppedVideoFrames || 0),
            audioDecodedBytes:Number(video.webkitAudioDecodedByteCount || 0)
          };
        });
        const advancedSeconds = Number((second.time - first.time).toFixed(2));
        const audioBytesAdded=Math.max(0,second.audioDecodedBytes-first.audioDecodedBytes);
        results.push({
          id:channel.id,
          name:channel.name,
          category:channel.category,
          outcome:advancedSeconds >= 9 && second.readyState >= 3 && !second.paused && audioBytesAdded > 0 ? 'transport-confirmed' : 'transport-unstable',
          startupMs,
          advancedSeconds,
          resolution:`${second.width}x${second.height}`,
          readyState:second.readyState,
          bufferedAhead:Number(second.bufferedAhead.toFixed(2)),
          decodedFramesAdded:Math.max(0,second.totalVideoFrames-first.totalVideoFrames),
          droppedFramesAdded:Math.max(0,second.droppedVideoFrames-first.droppedVideoFrames),
          audioBytesAdded,
          status:(await page.locator('#player-status').textContent())?.trim()
        });
      } else if (channel.hasEmbed) {
        const frame = page.locator('#stream-embed');
        await frame.waitFor({state:'visible',timeout:15000});
        await page.waitForTimeout(3500);
        const child = page.frames().find(item => item !== page.mainFrame());
        // A preroll advertisement is not proof that the channel programme plays.
        await child?.waitForFunction(() => {
          const video=document.querySelector('video');
          return !document.querySelector('.ad-showing') && video?.videoWidth>0 && video.readyState>=3 && !video.paused;
        }, null, {timeout:90000}).catch(() => null);
        const startupMs=Date.now()-startedAt;
        const first = await child?.locator('video').evaluate(video => ({
          time:video.currentTime,width:video.videoWidth,height:video.videoHeight,
          readyState:video.readyState,paused:video.paused,muted:video.muted,volume:video.volume,
          adShowing:!!document.querySelector('.ad-showing')
        })).catch(() => null);
        await page.waitForTimeout(3500);
        const second = await child?.locator('video').evaluate(video => ({
          time:video.currentTime,width:video.videoWidth,height:video.videoHeight,
          readyState:video.readyState,paused:video.paused,muted:video.muted,volume:video.volume,
          adShowing:!!document.querySelector('.ad-showing')
        })).catch(() => null);
        const advancedSeconds=first&&second?Number((second.time-first.time).toFixed(2)):0;
        const embedConfirmed=advancedSeconds>=2.5&&second?.width>0&&!second.paused&&!first.adShowing&&!second.adShowing;
        results.push({
          id:channel.id,
          name:channel.name,
          category:channel.category,
          outcome:embedConfirmed?'official-embed-transport-confirmed':'official-embed-loaded',
          startupMs,
          advancedSeconds,
          resolution:second?.width?`${second.width}x${second.height}`:null,
          readyState:second?.readyState||0,
          muted:second?.muted??null,
          volume:second?.volume??null,
          frameUrl:child?.url() || null,
          note:embedConfirmed?'Decoded non-ad video advanced inside the official embed.':'Embed loaded without non-ad decoded-video confirmation.'
        });
      } else {
        await page.waitForTimeout(80);
        const unavailable = await page.evaluate(() => ({
          status:document.querySelector('#player-status')?.textContent?.trim() || '',
          retryControls:document.querySelectorAll('[data-attempt],[data-next-source]').length,
          videoActive:document.querySelector('#stream-video')?.classList.contains('active') || false,
          message:document.querySelector('#player-overlay p')?.textContent?.trim() || ''
        }));
        results.push({
          id:channel.id,
          name:channel.name,
          category:channel.category,
          outcome:unavailable.retryControls === 0 && !unavailable.videoActive ? 'unavailable-honest' : 'unavailable-ui-failure',
          startupMs:Date.now() - startedAt,
          statedReason:channel.statedReason,
          ...unavailable
        });
      }
    } catch (error) {
      results.push({
        id:channel.id,
        name:channel.name,
        category:channel.category,
        outcome:'audit-failed',
        startupMs:Date.now() - startedAt,
        error:String(error).split('\n')[0],
        status:await page.locator('#player-status').textContent().catch(() => null)
      });
    }
  }
  page.off('console', onConsole);
  page.off('pageerror', onPageError);
  return {
    testedAt:new Date().toISOString(),
    device,
    summary:{
      total:results.length,
      transportConfirmed:results.filter(item => item.outcome === 'transport-confirmed').length,
      transportUnstable:results.filter(item => item.outcome === 'transport-unstable').length,
      embedTransportConfirmed:results.filter(item => item.outcome === 'official-embed-transport-confirmed').length,
      embedLoadedOnly:results.filter(item => item.outcome === 'official-embed-loaded').length,
      unavailableHonest:results.filter(item => item.outcome === 'unavailable-honest').length,
      failures:results.filter(item => ['audit-failed','unavailable-ui-failure'].includes(item.outcome)).length,
      fullHd:results.filter(item => item.outcome === 'transport-confirmed' && Number(item.resolution.split('x')[1]) >= 1080).length,
      belowFullHd:results.filter(item => item.outcome === 'transport-confirmed' && Number(item.resolution.split('x')[1]) < 1080).length,
      browserErrors:browserErrors.length
    },
    results,
    browserErrors
  };
}
