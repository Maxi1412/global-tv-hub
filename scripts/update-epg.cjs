/**
 * Build the small, same-origin EPG snapshot consumed by the static PWA.
 *
 * The upstream country guides are intentionally downloaded only by this
 * maintenance script. Shipping their multi-megabyte XML files to every phone
 * would be wasteful, so this script keeps only mapped Global TV Hub channels
 * and a rolling three-day window.
 */
const { writeFileSync } = require('node:fs');
const { join } = require('node:path');
const { gzipSync, gunzipSync } = require('node:zlib');

const root = join(__dirname, '..');
const provider = 'IPTV-EPG.org';
const sourceBase = 'https://iptv-epg.org/files';

const channelMap = Object.freeze({
  alexberlin: ['de', 'ALEXBerlin.de'],
  dokusat: ['de', 'dokusat.de'],
  hr: ['de', 'hr.de'],
  brnorth: ['de', 'BRFernsehenNord.de'],
  terramater: null,
  redbulltv: ['de', 'RedBullTV.de'],
  morethansports: ['de', 'MoreThanSportsTV.de'],
  teledeporte: ['es', 'Teledeporte.es'],
  df1: ['de', 'DF1.de'],
  motorvision: ['de', 'MOTORVISIONTV.de'],
  worldfreesports: ['de', 'WorldofFreesports.de'],
  fifaplusfast: null,
  tennischannel: null,
  billiardtv: null,
  flohockey: null,
  ard: ['de', 'DasErste.de'],
  zdf: ['de', 'ZDF.de'],
  rtl: ['de', 'RTL.de'],
  prosieben: ['de', 'ProSieben.de'],
  sat1: ['de', 'SAT1.de'],
  kabeleins: ['de', 'KabelEins.de'],
  arte: ['de', 'ARTE.de'],
  '3sat': ['de', '3sat.de'],
  zdfinfo: ['de', 'ZDFinfo.de'],
  zdfneo: ['de', 'zdf_neo.de'],
  tagesschau24: ['de', 'tagesschau24.de'],
  phoenix: ['de', 'phoenix.de'],
  one: ['de', 'ONE.de'],
  kika: ['de', 'KiKA.de'],
  ndrworld: ['de', 'NDR.de'],
  wdr: ['de', 'WDR.de'],
  hamburg1: ['de', 'Hamburg1.de'],
  nrwision: ['de', 'nrwision.de'],
  qvc: ['de', 'QVC.de'],
  dw: ['de', 'DW.de'],
  dwes: ['es', 'DeutscheWelle.es'],
  ardalpha: ['de', 'ARD-alpha.de'],
  brsouth: ['de', 'BRFernsehenSud.de'],
  rtlzwei: ['de', 'RTLZWEI.de'],
  ntv: ['de', 'n-tv.de'],
  vox: ['de', 'VOX.de'],
  skyde1: ['de', 'SkySport1.de'],
  skyde2: ['de', 'SkySport2.de'],
  skydef1: ['de', 'SkySportF1.de'],
  skydepl: ['de', 'SkySportPremierLeague.de'],
  skyukmain: ['gb', 'SkySportsMainEvent.uk'],
  skyukf1: ['gb', 'SkySportsF1.uk'],
  skyukpl: ['gb', 'SkySportsPremierLeague.uk'],
  eurosportde: ['de', 'Eurosport1.de'],
  eurosportes: ['es', 'Eurosport1.es'],
  skybuli: ['de', 'SkySportBundesliga.de'],
  skytop: ['de', 'SkySportTopEvent.de'],
  skymix: ['de', 'SkySportMix.de'],
  skyukfootball: ['gb', 'SkySportsFootball.uk'],
  skyukcricket: ['gb', 'SkySportsCricket.uk'],
  skyuktennis: ['gb', 'SkySportsTennis.uk'],
  daznf1es: ['es', 'DAZNF1.es'],
  sport1free: ['de', 'SPORT1.de'],
  sport1: ['de', 'SPORT1.de']
});

function decodeXml(value = '') {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, number) => String.fromCodePoint(Number(number)))
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();
}

function textOf(body, tag) {
  const match = body.match(new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${tag}>`, 'i'));
  return match ? decodeXml(match[1]).slice(0, tag === 'desc' ? 480 : 180) : '';
}

function parseXmltvDate(value) {
  const match = String(value).match(/^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})(?:\s*([+-])(\d{2})(\d{2}))?/);
  if (!match) return null;
  const [, year, month, day, hour, minute, second, sign, offsetHour, offsetMinute] = match;
  let time = Date.UTC(+year, +month - 1, +day, +hour, +minute, +second);
  if (sign) {
    const offset = (+offsetHour * 60 + +offsetMinute) * 60_000;
    time += sign === '+' ? -offset : offset;
  }
  return new Date(time);
}

async function download(country) {
  const url = `${sourceBase}/epg-${country}.xml.gz`;
  const response = await fetch(url, {
    redirect: 'follow',
    headers: { 'user-agent': 'Global-TV-Hub-EPG/0.12 (+https://github.com/Maxi1412/global-tv-hub)' }
  });
  if (!response.ok) throw new Error(`${url} returned HTTP ${response.status}`);
  const compressed = Buffer.from(await response.arrayBuffer());
  if (compressed[0] !== 0x1f || compressed[1] !== 0x8b) throw new Error(`${url} did not return gzip data`);
  return {
    country,
    url,
    lastModified: response.headers.get('last-modified'),
    xml: gunzipSync(compressed).toString('utf8')
  };
}

function programmesFor(xml, xmltvIds, minTime, maxTime) {
  const wanted = new Set(xmltvIds);
  const results = Object.fromEntries(xmltvIds.map(id => [id, []]));
  const programmePattern = /<programme\s+([^>]*?)>([\s\S]*?)<\/programme>/g;
  for (const match of xml.matchAll(programmePattern)) {
    const attrs = match[1];
    const channel = attrs.match(/\bchannel="([^"]+)"/)?.[1];
    if (!wanted.has(channel)) continue;
    const start = parseXmltvDate(attrs.match(/\bstart="([^"]+)"/)?.[1]);
    const stop = parseXmltvDate(attrs.match(/\bstop="([^"]+)"/)?.[1]);
    if (!start || !stop || stop <= minTime || start >= maxTime || stop <= start) continue;
    const title = textOf(match[2], 'title');
    if (!title) continue;
    const entry = { start: start.toISOString(), stop: stop.toISOString(), title };
    const subtitle = textOf(match[2], 'sub-title');
    const category = textOf(match[2], 'category');
    if (subtitle) entry.subtitle = subtitle;
    if (category) entry.category = category;
    results[channel].push(entry);
  }
  for (const list of Object.values(results)) list.sort((a, b) => a.start.localeCompare(b.start));
  return results;
}

const berlinDayFormatter = new Intl.DateTimeFormat('en-CA', {timeZone:'Europe/Berlin',year:'numeric',month:'2-digit',day:'2-digit'});
function berlinDay(value) {
  const parts = Object.fromEntries(berlinDayFormatter.formatToParts(new Date(value)).map(part => [part.type, part.value]));
  return `${parts.year}-${parts.month}-${parts.day}`;
}
function compactWindow(list, generatedAt) {
  const perDay = new Map();
  const output = [];
  for (const programme of list) {
    if (new Date(programme.stop) <= generatedAt) continue;
    const key = berlinDay(programme.start);
    const count = perDay.get(key) || 0;
    if (count >= 18) continue;
    perDay.set(key, count + 1);
    output.push(programme);
  }
  return output;
}

async function main() {
  const generatedAt = new Date();
  const minTime = new Date(generatedAt.getTime() - 18 * 60 * 60_000);
  const maxTime = new Date(generatedAt.getTime() + 78 * 60 * 60_000);
  const countries = [...new Set(Object.values(channelMap).filter(Boolean).map(([country]) => country))];
  const downloads = await Promise.all(countries.map(download));
  const byCountry = {};

  for (const source of downloads) {
    const ids = [...new Set(Object.values(channelMap)
      .filter(mapping => mapping?.[0] === source.country)
      .map(([, xmltvId]) => xmltvId))];
    byCountry[source.country] = programmesFor(source.xml, ids, minTime, maxTime);
  }

  const channels = {};
  const mappings = {};
  for (const [appId, mapping] of Object.entries(channelMap)) {
    if (!mapping) {
      channels[appId] = [];
      mappings[appId] = null;
      continue;
    }
    const [country, xmltvId] = mapping;
    channels[appId] = compactWindow(byCountry[country][xmltvId] || [], generatedAt);
    mappings[appId] = { country, xmltvId };
  }

  const output = {
    schemaVersion: 1,
    generatedAt: generatedAt.toISOString(),
    validFrom: minTime.toISOString(),
    validTo: maxTime.toISOString(),
    provider: {
      name: provider,
      page: 'https://iptv-epg.org/guides',
      format: 'XMLTV',
      sources: downloads.map(({ country, url, lastModified }) => ({ country, url, lastModified }))
    },
    notice: 'Programme times are informational and can change. Playback access remains controlled by each broadcaster.',
    mappings,
    channels
  };

  writeFileSync(join(root, 'epg.json.gz'), gzipSync(Buffer.from(JSON.stringify(output)), {level: 9}));
  const populated = Object.values(channels).filter(list => list.length).length;
  const programmeCount = Object.values(channels).reduce((sum, list) => sum + list.length, 0);
  console.log(`EPG updated: ${populated}/${Object.keys(channels).length} channels, ${programmeCount} programmes`);
}

main().catch(error => {
  console.error(`EPG update failed: ${error.message}`);
  process.exitCode = 1;
});
