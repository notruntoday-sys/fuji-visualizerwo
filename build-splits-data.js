const fs = require("node:fs");

global.window = {};
require("./data.js");

const records = window.SAINOKUNI_DATA.records;
const summary = window.SAINOKUNI_DATA.summary;
const baseUrl = "http://www.k-sok.com/corunners/timelineDetail?raceId=7343&runnerId=";

function clean(value) {
  return value.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
}

function parseTime(value) {
  if (!value) return 0;
  const [hours, minutes, seconds = "0"] = value.split(":");
  return Number(hours) * 3600 + Number(minutes) * 60 + Number.parseFloat(seconds);
}

function parseDetail(html) {
  return [...html.matchAll(/<tr class='(?:timelineStart|timelineRow|timelineGoal|timelineYameta)'>(.*?)<\/tr>/gs)]
    .map(([, row]) => [...row.matchAll(/<td[^>]*>(.*?)<\/td>/gs)].map((cell) => clean(cell[1])))
    .filter((cells) => cells.length >= 8)
    .map((cells) => ({
      rank: cells[0],
      point: cells[1],
      time: cells[2],
      seconds: parseTime(cells[2]),
      distance: Number.parseFloat(cells[5]) || 0,
      clock: cells[6],
      pace: cells[7],
    }));
}

async function fetchText(url, attempt = 1) {
  const response = await fetch(url);
  if (!response.ok) {
    if (attempt < 3) return fetchText(url, attempt + 1);
    throw new Error(`${response.status} ${url}`);
  }
  return response.text();
}

async function worker(queue, results, id) {
  while (queue.length) {
    const record = queue.shift();
    const html = await fetchText(`${baseUrl}${encodeURIComponent(record.bib)}`);
    const splits = parseDetail(html);
    results.push({ ...record, splits });
    if (results.length % 25 === 0) {
      console.log(`worker ${id}: ${results.length}/${records.length}`);
    }
  }
}

async function main() {
  const queue = [...records];
  const results = [];
  const workers = Array.from({ length: 6 }, (_, index) => worker(queue, results, index + 1));
  await Promise.all(workers);

  const ordered = records.map((record) => results.find((result) => result.bib === record.bib) || record);
  const payload = { records: ordered, summary };
  fs.writeFileSync("data.js", `window.SAINOKUNI_DATA = ${JSON.stringify(payload)};\n`);
  fs.writeFileSync("splits-summary.json", JSON.stringify({
    runners: ordered.length,
    withSplits: ordered.filter((record) => record.splits?.length).length,
    splitRows: ordered.reduce((sum, record) => sum + (record.splits?.length || 0), 0),
    generatedAt: new Date().toISOString(),
  }, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
