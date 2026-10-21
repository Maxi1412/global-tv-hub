async page => {
  await page.setViewportSize({width:1440,height:900});
  const base = page.url().startsWith('http') ? await page.evaluate(() => location.origin + (location.pathname.endsWith('/') ? location.pathname : location.pathname.replace(/[^/]*$/, ''))) : 'http://127.0.0.1:8765/';
  await page.goto(`${base}?embed-audit=hamburg1#live`);
  await page.locator('[data-channel="hamburg1"]').first().evaluate(element => element.click());
  const frame = page.locator('#stream-embed');
  await frame.waitFor({state:'visible',timeout:15000});
  await page.waitForTimeout(2500);
  return {
    visible:await frame.isVisible(),
    title:await frame.getAttribute('title'),
    source:await frame.getAttribute('src'),
    frameUrl:page.frames().find(item => item !== page.mainFrame())?.url() || null
  };
}
