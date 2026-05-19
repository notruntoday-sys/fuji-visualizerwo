const LIMIT_SECONDS = 35 * 60 * 60;
const COLORS = ["#ef4444", "#f59e0b", "#10b981", "#2563eb", "#8b5cf6", "#ec4899", "#06b6d4", "#84cc16", "#f97316", "#64748b"];
const PROFILE_DATA = window.SAINOKUNI_PROFILE || { minEle: 80, maxEle: 900, distanceKm: 163, points: [[0, 100], [163, 100]] };
const COURSE_KM = PROFILE_DATA.distanceKm || 162.8;
const PROFILE = PROFILE_DATA.points;
const SPEEDS = [300, 900, 1800, 3600];
const ZOOMS = [1, 1.6, 2.4];
const EKIDEN_OFFSET_SECONDS = 60 * 60;
const EKIDEN_LABELS = {
  "彩の国100mile駅伝優勝候補2026": "優勝候補",
  "ぷらっとおさんぽ": "ぷらっと",
  "中華そばナトリ": "ナトリ",
  "チーム奥久慈": "奥久慈",
  "脳天ランナーズ": "脳天",
  "YSMトレイルズ": "YSM",
  "古賀志山快速登山部": "古賀志山",
  "たかおじ練": "たかおじ",
  "3世代揃いました": "3世代",
  "TEAM MIURA": "MIURA",
  "阿部ンジャーズ": "阿部ンジ",
  "チームワイルド": "ワイルド",
  "ちーおさ区間急行": "ちーおさ",
  "チームガッツ": "ガッツ",
  "ABETRA チャラ男とハルルン": "ABETRA",
  "チームトレイルヘッド": "チートレ",
  "マイラーズオンライン": "マイラーズ",
  "はだし駅伝部": "はだし",
  "トレイル大好きつっきーズ": "つっきー",
  "ＡＬＰＲＣ": "ALPRC",
  "時の鐘を鳴らすのは俺ら": "時の鐘",
};
const SURNAME_ROMAJI = {
  島木: "Shimaki", 高橋: "Takahashi", 三浦: "Miura", 山影: "Yamakage", 須永: "Sunaga", 小野: "Ono", 植田: "Ueda", 橋本: "Hashimoto",
  長: "Cho", 中田: "Nakada", 芝脇: "Shibawaki", 崎坂: "Sakisaka", 小室: "Komuro", 青木: "Aoki", 片桐: "Katagiri", 杉山: "Sugiyama",
  和田: "Wada", 寺田: "Terada", 高松: "Takamatsu", 中村: "Nakamura", 野村: "Nomura", 森本: "Morimoto", 野田: "Noda", 大野: "Ono",
  袴田: "Hakamada", 松田: "Matsuda", 堀江: "Horie", 三本松: "Sanbonmatsu", 黒谷: "Kurotani", 土居: "Doi", 甲谷: "Kotani",
  有馬: "Arima", 高瀬: "Takase", 中島: "Nakajima", 斉藤: "Saito", 小山田: "Oyamada", 久保田: "Kubota", 草間: "Kusama",
  田中: "Tanaka", 千葉: "Chiba", 福島: "Fukushima", 服部: "Hattori", 森: "Mori", 小林: "Kobayashi", 山本: "Yamamoto",
  上岡: "Kamioka", 森谷: "Moriya", 松野: "Matsuno", 石川: "Ishikawa", 浅原: "Asahara", 林: "Hayashi", 井上: "Inoue",
  鈴木: "Suzuki", 土井: "Doi", 中山: "Nakayama", 小池: "Koike", 江川: "Egawa", 松元: "Matsumoto", 藤嶋: "Fujishima",
  関島: "Sekijima", 杉内: "Sugiuchi", 奥: "Oku", 池田: "Ikeda", 坂井: "Sakai", 秋山: "Akiyama", 薄井: "Usui",
  原田: "Harada", 成田: "Narita", 近藤: "Kondo", 柳瀬: "Yanase", 中野: "Nakano", 君山: "Kimiyama", 濱内: "Hamauchi",
  猪俣: "Inomata", 塚原: "Tsukahara", 吉田: "Yoshida", 西川: "Nishikawa", 水谷: "Mizutani", 城: "Jo", 新井: "Arai",
  中元寺: "Chugenji", 菅松: "Sugamatsu", 山野: "Yamano", 宮坂: "Miyasaka", 村上: "Murakami", 浜田: "Hamada", 江畑: "Ebata",
  広瀬: "Hirose", 吉武: "Yoshitake", 櫻井: "Sakurai", 岡田: "Okada", 古橋: "Furuhashi", 吉川: "Yoshikawa", 奥澤: "Okuzawa",
  細川: "Hosokawa", 冨島: "Tomishima", 藤田: "Fujita", 藤島: "Fujishima", 吉峰: "Yoshimine", 池内: "Ikeuchi",
  田所: "Tadokoro", 元木: "Motoki", 境: "Sakai", 小保方: "Obokata", 飯田: "Iida", 米井: "Yonei", 阿部: "Abe",
  神本: "Kamimoto", 棚田: "Tanada", 小笠原: "Ogasawara", 能代: "Noshiro", 三田: "Mita", 橋口: "Hashiguchi",
  松村: "Matsumura", 蓮田: "Hasuda", 照井: "Terui", 谷: "Tani", 多田: "Tada", 川地: "Kawachi", 佐々木: "Sasaki",
  保坂: "Hosaka", 渡部: "Watanabe", 雲藤: "Undo", 山野本: "Yamanomoto", 本山: "Motoyama", 佐藤: "Sato", 竹原: "Takehara",
  亀島: "Kameshima", 河内: "Kawauchi", 村木: "Muraki", 助田: "Sukeda", 横山: "Yokoyama", 金山: "Kanayama",
  塩田: "Shiota", 松本: "Matsumoto", 竹重: "Takeshige", 片倉: "Katakura", 清水: "Shimizu", 竹内: "Takeuchi",
  角谷: "Kakutani", 久保: "Kubo", 栗原: "Kurihara", 金澤: "Kanazawa", 松浦: "Matsuura", 下間: "Shimoma", 李: "Lee",
  笠原: "Kasahara", 下竹: "Shimotake", 岩澤: "Iwasawa", 廣瀬: "Hirose", 大谷: "Otani", 山田: "Yamada", 堀金: "Horigane",
  俵: "Tawara", 高木: "Takagi", 浅見: "Asami", 神: "Jin", 伊丹: "Itami", 丸山: "Maruyama", 小峰: "Komine",
  平岩: "Hiraiwa", 中澤: "Nakazawa", 鳥居: "Torii", 長谷山: "Haseyama", 漆上: "Urushigami", 藤井: "Fujii",
  長谷川: "Hasegawa", 新田: "Nitta", 山中: "Yamanaka", 齊藤: "Saito", 河野: "Kono", 前北: "Maekita", 安藤: "Ando",
  岡本: "Okamoto", 相馬: "Soma", 椎葉: "Shiiba", 福田: "Fukuda", 帆秋: "Hoaki", 橋野: "Hashino", 神田: "Kanda",
  鬼久保: "Onikubo", 志賀: "Shiga", 飯村: "Iimura", 下澤: "Shimozawa", 静: "Shizuka", 奥西: "Okunishi",
  神原: "Kambara", 渡辺: "Watanabe", 安井: "Yasui", 五味: "Gomi", 吉永: "Yoshinaga", 板垣: "Itagaki",
  岡村: "Okamura", 竹上: "Takegami", 川澄: "Kawasumi", 祖父江: "Sobue", 高田: "Takada", 槇井: "Makii",
  安齋: "Anzai", 松井: "Matsui", 坂本: "Sakamoto", 山内: "Yamauchi", 相田: "Aida", 今宮: "Imamiya", 大西: "Onishi",
  富山: "Tomiyama", 福本: "Fukumoto", 金指: "Kanazashi", 田村: "Tamura", 藤原: "Fujiwara", 加藤: "Kato",
  小原: "Ohara", 榎本: "Enomoto", 村田: "Murata", 松林: "Matsubayashi", 中町: "Nakamachi", 岩崎: "Iwasaki",
  奥村: "Okumura", 凪: "Nagi", 伊勢山: "Iseyama", 有村: "Arimura", 松宮: "Matsumiya", 山口: "Yamaguchi",
  三澤: "Misawa", 藤澤: "Fujisawa", 川村: "Kawamura", 田口: "Taguchi", 野入: "Noiri", 高柳: "Takayanagi",
};

const state = {
  records: [],
  checkpoints: [],
  summary: { entrants: 0, goal: 0, dnf: 0, dns: 0 },
  elapsed: 0,
  playing: false,
  speedIndex: 0,
  zoomIndex: 0,
  modes: new Set(["leaders"]),
  query: "",
  selected: new Set(),
  lastFrame: 0,
};

const els = {
  clock: document.querySelector("#clock"),
  slider: document.querySelector("#timeSlider"),
  reset: document.querySelector("#resetBtn"),
  play: document.querySelector("#playBtn"),
  speed: document.querySelector("#speedBtn"),
  zoom: document.querySelector("#zoomBtn"),
  svg: document.querySelector("#courseSvg"),
  entries: document.querySelector("#entriesStat"),
  finish: document.querySelector("#finishStat"),
  dnf: document.querySelector("#dnfStat"),
  visible: document.querySelector("#visibleStat"),
  search: document.querySelector("#searchInput"),
  tabs: document.querySelectorAll("[data-mode]"),
  runnerList: document.querySelector("#runnerList"),
  clearSelection: document.querySelector("#clearSelectionBtn"),
};

init();

async function init() {
  state.records = sortRecords(window.SAINOKUNI_DATA?.records || []);
  state.checkpoints = buildCheckpoints(state.records);
  state.summary = window.SAINOKUNI_DATA?.summary || fallbackSummary(state.records);
  selectPreset();
  bindEvents();
  updateActiveTabs();
  renderStatic();
  renderRunnerList();
  renderFrame();
  requestAnimationFrame(loop);
}

function sortRecords(records) {
  return [...records].sort((a, b) => {
    if (isEkiden(a) !== isEkiden(b)) return isEkiden(a) ? 1 : -1;
    if (a.status === "goal" && b.status === "goal") return rankNumber(a.rank) - rankNumber(b.rank);
    if (a.status !== b.status) return a.status === "goal" ? -1 : 1;
    return b.distance - a.distance || (a.seconds || 0) - (b.seconds || 0);
  }).map((record, index) => ({ ...record, color: COLORS[index % COLORS.length] }));
}

function fallbackSummary(records) {
  return {
    entrants: records.length,
    goal: records.filter((record) => record.status === "goal").length,
    dnf: records.filter((record) => record.status === "dnf").length,
    dns: 0,
  };
}

function buildCheckpoints(records) {
  const points = new Map([["START", { point: "START", distance: 0 }]]);
  records.forEach((record) => {
    const splits = record.splits?.length ? record.splits : [{ point: record.point, distance: record.distance }];
    splits.forEach((split) => {
      if (!points.has(split.point)) points.set(split.point, { point: split.point, distance: split.distance });
    });
  });
  return [...points.values()].sort((a, b) => a.distance - b.distance);
}

function bindEvents() {
  els.reset.addEventListener("click", () => {
    state.elapsed = 0;
    state.playing = false;
    els.play.textContent = "再生";
    renderFrame();
  });

  els.play.addEventListener("click", () => {
    state.playing = !state.playing;
    els.play.textContent = state.playing ? "停止" : "再生";
  });

  els.speed.addEventListener("click", () => {
    state.speedIndex = (state.speedIndex + 1) % SPEEDS.length;
    els.speed.textContent = `speed ${SPEEDS[state.speedIndex]}x`;
  });

  els.zoom.addEventListener("click", () => {
    state.zoomIndex = (state.zoomIndex + 1) % ZOOMS.length;
    const zoom = ZOOMS[state.zoomIndex];
    els.zoom.textContent = `Expand ${zoom}x`;
    renderFrame();
  });

  els.slider.addEventListener("input", (event) => {
    state.elapsed = Number(event.target.value);
    renderFrame();
  });

  els.search.addEventListener("input", (event) => {
    state.query = event.target.value.trim().toLowerCase();
    renderRunnerList();
  });

  els.tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      updateModes(tab.dataset.mode);
      selectPreset();
      updateActiveTabs();
      renderRunnerList();
      renderFrame();
    });
  });

  els.clearSelection.addEventListener("click", () => {
    state.selected.clear();
    renderRunnerList();
    renderFrame();
  });
}

function renderStatic() {
  els.entries.textContent = state.summary.entrants.toLocaleString("ja-JP");
  els.finish.textContent = state.summary.goal.toLocaleString("ja-JP");
  els.dnf.textContent = state.summary.dnf.toLocaleString("ja-JP");

  const profilePath = buildProfilePath();
  const sectionLabels = [
    { label: "North", start: 0, end: 53.9, className: "north" },
    { label: "South1", start: 53.9, end: 108.3, className: "south1" },
    { label: "South2", start: 108.3, end: 162.8, className: "south2" },
  ].map((section) => {
    const x1 = pointToSvg(section.start).x;
    const x2 = pointToSvg(section.end).x;
    const x = (x1 + x2) / 2;
    return `
      <g class="section-label ${section.className}">
        <line x1="${x1}" y1="44" x2="${x2}" y2="44"></line>
        <text x="${x}" y="36" text-anchor="middle">${section.label}</text>
      </g>
    `;
  }).join("");
  const checkpoints = state.checkpoints.map((point, index) => {
    const label = shortPoint(point.point);
    if (!label) return "";
    const { x, y } = pointToSvg(point.distance);
    const labelY = index % 2 === 0 ? y + 26 : y - 28;
    const metaY = labelY + 15;
    return `
      <g>
        <line class="grid-line" x1="${x}" y1="32" x2="${x}" y2="390"></line>
        <rect class="aid-dot" x="${x - 5}" y="${y - 5}" width="10" height="10"></rect>
        <text class="aid-label" x="${x}" y="${labelY}" text-anchor="middle">${escapeHtml(label)}</text>
        <text class="aid-meta" x="${x}" y="${metaY}" text-anchor="middle">${point.distance.toFixed(1)}km</text>
      </g>
    `;
  }).join("");

  els.svg.innerHTML = `
    <path class="profile-fill" d="${profilePath}"></path>
    <text class="profile-meta" x="24" y="28">GPX 300m刻み / ${PROFILE_DATA.distanceKm.toFixed(2)}km / D+ ${PROFILE_DATA.gainMeters?.toLocaleString("ja-JP") || "-"}m</text>
    ${sectionLabels}
    ${checkpoints}
    <g id="runnerLayer"></g>
  `;
}

function renderFrame() {
  els.clock.textContent = formatClock(state.elapsed);
  els.slider.value = Math.round(state.elapsed);
  const visible = getVisibleRecords();
  els.visible.textContent = visible.length.toLocaleString("ja-JP");

  document.querySelector("#runnerLayer").innerHTML = visible.map((record) => {
    const position = runnerPosition(record, state.elapsed);
    if (!position.visible) return "";
    const label = isEkiden(record) ? ekidenLabel(record) : runnerLabel(record);
    const statusClass = record.status === "dnf" && state.elapsed >= record.seconds ? "is-dnf" : "";
    return `
      <g class="runner ${statusClass}" transform="translate(${position.x} ${position.y})">
        <circle r="${state.selected.has(record.bib) ? 4 : 2.5}" fill="${record.status === "dnf" && state.elapsed >= record.seconds ? "#ef4444" : record.color}"></circle>
        ${state.selected.has(record.bib) ? `<text x="0" y="-14" text-anchor="middle" fill="${record.color}">${escapeHtml(label)}</text>` : ""}
      </g>
    `;
  }).join("");
  updateZoom(visible);
}

function renderRunnerList() {
  const records = state.records.filter((record) => {
    const query = `${record.name} ${record.bib} ${record.team} ${record.prefecture}`.toLowerCase();
    if (!matchesModes(record)) return false;
    return !state.query || query.includes(state.query);
  });

  els.runnerList.innerHTML = records.map((record) => `
    <label class="runner-row">
      <input type="checkbox" data-bib="${escapeHtml(record.bib)}" ${state.selected.has(record.bib) ? "checked" : ""}>
      <span class="runner-name">
        <strong>${escapeHtml(displayRunnerName(record))}</strong>
        <span>${escapeHtml(record.bib)} / ${escapeHtml(record.team || record.prefecture)} / ${escapeHtml(record.point)}</span>
      </span>
      <span class="time-pill">${escapeHtml(record.time || "-")}</span>
    </label>
  `).join("");

  els.runnerList.querySelectorAll("[data-bib]").forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      if (checkbox.checked) state.selected.add(checkbox.dataset.bib);
      else state.selected.delete(checkbox.dataset.bib);
      renderFrame();
    });
  });
}

function updateModes(mode) {
  if (mode === "all") {
    state.modes = new Set(["leaders", "women", "finishers", "dnf", "ekiden", "all"]);
    return;
  }

  state.modes.delete("all");
  if (state.modes.has(mode)) state.modes.delete(mode);
  else state.modes.add(mode);

  if (mode === "finishers" && state.modes.has("finishers")) {
    state.modes.add("leaders");
    state.modes.add("women");
  }
}

function updateActiveTabs() {
  els.tabs.forEach((item) => item.classList.toggle("is-active", state.modes.has(item.dataset.mode)));
}

function selectPreset() {
  state.selected.clear();
  state.records.forEach((record) => {
    if (matchesModes(record)) state.selected.add(record.bib);
  });
}

function matchesModes(record) {
  return (state.modes.has("leaders") && record.status === "goal" && !isEkiden(record) && rankNumber(record.rank) <= 20)
    || (state.modes.has("women") && record.status === "goal" && !isEkiden(record) && record.division === "女子")
    || (state.modes.has("finishers") && record.status === "goal" && !isEkiden(record))
    || (state.modes.has("dnf") && record.status === "dnf" && !isEkiden(record))
    || (state.modes.has("all") && !isEkiden(record))
    || (state.modes.has("ekiden") && record.status === "goal" && isEkiden(record));
}

function isEkiden(record) {
  return record.race === "ekiden";
}

function loop(time) {
  if (state.playing) {
    const delta = state.lastFrame ? (time - state.lastFrame) / 1000 : 0;
    state.elapsed = Math.min(LIMIT_SECONDS, state.elapsed + delta * SPEEDS[state.speedIndex]);
    if (state.elapsed >= LIMIT_SECONDS) {
      state.playing = false;
      els.play.textContent = "再生";
    }
    renderFrame();
  }
  state.lastFrame = time;
  requestAnimationFrame(loop);
}

function getVisibleRecords() {
  return state.records.filter((record) => state.selected.has(record.bib));
}

function updateZoom(records) {
  const zoom = ZOOMS[state.zoomIndex];
  if (zoom === 1) {
    els.svg.setAttribute("viewBox", "0 0 1200 420");
    return;
  }
  const activePositions = records
    .map((record) => runnerPosition(record, state.elapsed))
    .filter((position) => position.visible);
  const focus = activePositions.length
    ? activePositions.reduce((best, position) => position.x > best.x ? position : best, activePositions[0])
    : { x: 600, y: 210 };
  const width = 1200 / zoom;
  const height = 420 / zoom;
  const x = clamp(focus.x - width * 0.5, 0, 1200 - width);
  const y = clamp((420 - height) * 0.5, 0, 420 - height);
  els.svg.setAttribute("viewBox", `${x} ${y} ${width} ${height}`);
}

function runnerPosition(record, elapsed) {
  if (elapsed < 0) return { visible: false };
  const splits = normalizedSplits(record);
  if (!splits.length) return { visible: false };
  if (elapsed < splits[0].seconds) return { visible: false };
  if (elapsed === splits[0].seconds) return { visible: true, ...pointToSvg(splits[0].distance) };

  const last = splits[splits.length - 1];
  if (elapsed >= last.seconds) {
    if (record.status === "goal") return { visible: false };
    return { visible: true, ...pointToSvg(last.distance) };
  }

  const nextIndex = splits.findIndex((split) => split.seconds >= elapsed);
  const next = splits[nextIndex];
  const prev = splits[Math.max(0, nextIndex - 1)];
  const ratio = (elapsed - prev.seconds) / (next.seconds - prev.seconds || 1);
  const distance = prev.distance + (next.distance - prev.distance) * ratio;
  const point = pointToSvg(distance);
  return { visible: true, ...point };
}

function normalizedSplits(record) {
  const splits = record.splits?.length
    ? record.splits
    : [
      { point: "スタート", seconds: 0, distance: 0 },
      { point: record.point, seconds: record.seconds, distance: record.distance },
    ];
  return splits
    .filter((split) => Number.isFinite(split.seconds) && Number.isFinite(split.distance))
    .map((split) => isEkiden(record) ? { ...split, seconds: split.seconds + EKIDEN_OFFSET_SECONDS } : split)
    .sort((a, b) => a.seconds - b.seconds || a.distance - b.distance);
}

function buildProfilePath() {
  const points = PROFILE.map(([distance, elevation]) => pointToSvg(distance, elevation));
  const lines = points.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ");
  return `${lines} L 1180 400 L 20 400 Z`;
}

function pointToSvg(distance, elevation) {
  const x = 20 + (distance / COURSE_KM) * 1160;
  const source = typeof elevation === "number" ? elevation : interpolate(PROFILE, distance);
  const range = Math.max(1, PROFILE_DATA.maxEle - PROFILE_DATA.minEle);
  const y = 360 - ((source - PROFILE_DATA.minEle) / range) * 300;
  return { x, y };
}

function interpolate(points, distance) {
  for (let i = 0; i < points.length - 1; i += 1) {
    const [d1, e1] = points[i];
    const [d2, e2] = points[i + 1];
    if (distance >= d1 && distance <= d2) {
      const ratio = (distance - d1) / (d2 - d1 || 1);
      return e1 + (e2 - e1) * ratio;
    }
  }
  return points[points.length - 1][1];
}

function parseTime(value) {
  if (!value) return 0;
  const [h, m, s = "0"] = value.split(":");
  return Number(h) * 3600 + Number(m) * 60 + Number.parseFloat(s);
}

function rankNumber(rank) {
  const value = Number.parseInt(String(rank).split("/")[0], 10);
  return Number.isFinite(value) ? value : 9999;
}

function formatClock(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

function shortPoint(point) {
  if (point === "N1ニューサンピアIN") return "ニューサンピア1";
  if (point === "N1ニューサンピアOUT") return "";
  if (point === "S1ニューサンピアIN") return "";
  if (point === "S1ニューサンピアOUT") return "ニューサンピア2";
  if (point === "くぬぎむら体験交流館") return "くぬぎむら";
  return point
    .replace(/^S1-/, "")
    .replace(/^S1/, "")
    .replace(/^S2-/, "")
    .replace(/^S2/, "")
    .replace("堂平キャンプ場", "堂平")
    .replace("桂木観音", "桂木")
    .replace("高山不動尊", "高山")
    .replace("県民の森", "県森");
}

function runnerLabel(record) {
  const surname = record.name.split(" ")[0];
  if (record.status !== "dnf") return surname.slice(0, 5);
  if (/^[A-Za-z]+$/.test(surname)) return surname;
  return SURNAME_ROMAJI[surname] || surname;
}

function ekidenLabel(record) {
  return EKIDEN_LABELS[record.team] || record.team || record.name || record.bib;
}

function displayRunnerName(record) {
  if (record.status !== "dnf") return record.name;
  return runnerLabel(record);
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#039;",
  })[char]);
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}
