const fs = require("node:fs");

global.window = {};
require("./data.js");

const baseUrl = "http://www.k-sok.com/corunners";
const raceId = "7344";

function clean(value) {
  return value.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
}

function parseTime(value) {
  if (!value) return 0;
  const [hours, minutes, seconds = "0"] = value.split(":");
  return Number(hours) * 3600 + Number(minutes) * 60 + Number.parseFloat(seconds);
}

function parseRows(html) {
  return [...html.matchAll(/<tr class='([^']+)'>(.*?)<\/tr>/gs)]
    .map(([, className, row]) => ({
      className,
      cells: [...row.matchAll(/<td[^>]*>(.*?)<\/td>/gs)].map((cell) => clean(cell[1])),
    }));
}

function parseTimeline(html) {
  const records = new Map();
  parseRows(html).forEach(({ className, cells }) => {
    if (className !== "timelineGoal" || cells.length < 10 || !/^EM\d+/.test(cells[1])) return;
    const rank = cells[0];
    if (rank === "オープン参加") return;
    records.set(cells[1], {
      rank,
      bib: cells[1],
      team: cells[2],
      name: cells[3],
      point: cells[4],
      time: cells[5],
      seconds: parseTime(cells[5]),
      division: "駅伝",
      prefecture: "",
      distance: Number.parseFloat(cells[8]) || 0,
      pace: cells[9],
      status: "goal",
      race: "ekiden",
    });
  });
  return [...records.values()].sort((a, b) => rankNumber(a.rank) - rankNumber(b.rank));
}

function parseDetail(html) {
  return parseRows(html)
    .filter(({ className }) => ["timelineStart", "timelineRow", "timelineGoal", "timelineYameta"].includes(className))
    .map(({ cells }) => ({
      rank: cells[0] || "",
      point: cells[1] || "",
      time: cells[2] || "",
      seconds: parseTime(cells[2] || ""),
      distance: Number.parseFloat(cells[4]) || 0,
      clock: cells[5] || "",
      pace: cells[6] || "",
    }));
}

function rankNumber(rank) {
  const value = Number.parseInt(String(rank).split("/")[0], 10);
  return Number.isFinite(value) ? value : 9999;
}

async function fetchText(url, attempt = 1) {
  const response = await fetch(url);
  if (!response.ok) {
    if (attempt < 3) return fetchText(url, attempt + 1);
    throw new Error(`${response.status} ${url}`);
  }
  return response.text();
}

async function main() {
  const source = await fetchText(`${baseUrl}/timeline?raceId=${raceId}`);
  const ekidenRecords = parseTimeline(source);
  const withSplits = [];
  for (const record of ekidenRecords) {
    const html = await fetchText(`${baseUrl}/timelineDetail?raceId=${raceId}&runnerId=${encodeURIComponent(record.bib)}`);
    withSplits.push({ ...record, splits: parseDetail(html) });
    console.log(`ekiden: ${withSplits.length}/${ekidenRecords.length}`);
  }

  const current = window.SAINOKUNI_DATA;
  const individual = current.records.filter((record) => record.race !== "ekiden");
  const payload = {
    records: [...individual, ...withSplits],
    summary: {
      ...current.summary,
      ekidenGoal: withSplits.length,
    },
  };
  fs.writeFileSync("data.js", `window.SAINOKUNI_DATA = ${JSON.stringify(payload)};\n`);
  fs.writeFileSync("ekiden-summary.json", JSON.stringify({
    runners: withSplits.length,
    splitRows: withSplits.reduce((sum, record) => sum + (record.splits?.length || 0), 0),
    generatedAt: new Date().toISOString(),
  }, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
