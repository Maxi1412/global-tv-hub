async page => {
  const base = page.url().startsWith('http') ? await page.evaluate(() => location.origin + (location.pathname.endsWith('/') ? location.pathname : location.pathname.replace(/[^/]*$/, ''))) : 'http://127.0.0.1:8765/';
  await page.goto(`${base}?sports-ui-audit=1#sports`);
  const providerIds = await page.locator('[data-sport]').evaluateAll(elements =>
    [...new Set(elements.map(element => element.dataset.sport))]
  );
  const providerResults = [];
  for (const id of providerIds) {
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.locator(`[data-sport="${id}"]`).first().evaluate(element => element.click());
    await page.waitForTimeout(40);
    providerResults.push({
      id,
      scrollY: await page.evaluate(() => window.scrollY),
      heading: (await page.locator('#sports-detail h2').textContent())?.trim(),
      status: (await page.locator('#sports-detail .sport-detail-grid strong').first().textContent())?.trim()
    });
  }
  const filters = ['Play in app','Basketball','Ice Hockey','Golf','Cricket','Rugby','Handball','American Football','Athletics'];
  const filterResults = [];
  for (const label of filters) {
    await page.locator(`[data-sport-filter="${label}"]`).first().evaluate(element => element.click());
    filterResults.push({label, cards:await page.locator('.sport-tile').count()});
  }
  await page.setViewportSize({width:390,height:844});
  await page.goto(`${base}?sports-ui-mobile=1#sports`);
  const mobile = await page.evaluate(() => ({
    viewport: document.documentElement.clientWidth,
    pageWidth: document.documentElement.scrollWidth,
    overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth
  }));
  return {
    providerCount:providerIds.length,
    providerFailures:providerResults.filter(item => item.scrollY !== 0 || !item.heading || !item.status),
    filters:filterResults,
    mobile
  };
}
