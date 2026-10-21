async page => {
  await page.goto('http://127.0.0.1:8765/#sports');
  const providerIds = await page.locator('[data-sport]').evaluateAll(elements =>
    [...new Set(elements.map(element => element.dataset.sport))]
  );
  const providerResults = [];
  for (const id of providerIds) {
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.locator(`[data-sport="${id}"]`).first().click();
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
    await page.getByRole('button', {name:label, exact:true}).click();
    filterResults.push({label, cards:await page.locator('.sport-tile').count()});
  }
  await page.setViewportSize({width:390,height:844});
  await page.goto('http://127.0.0.1:8765/#sports');
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
