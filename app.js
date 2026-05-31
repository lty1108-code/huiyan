const allPlatform = "全部平台";

const platforms = [
  { id: "qwen", name: "通义千问", short: "通", color: "#6366f1", logo: "./assets/model-logos/qwen-color.svg" },
  { id: "yuanbao", name: "腾讯元宝", short: "元", color: "#10b981", logo: "./assets/model-logos/yuanbao-color.svg" },
  { id: "doubao", name: "字节豆包", short: "豆", color: "#3b82f6", logo: "./assets/model-logos/doubao.png" },
  { id: "baidu", name: "百度文心", short: "百", color: "#2563eb", logo: "./assets/model-logos/baidu-color.svg" },
  { id: "deepseek", name: "DeepSeek", short: "D", color: "#0ea5e9", logo: "./assets/model-logos/deepseek-color.svg" },
  { id: "weibo", name: "微博智搜", short: "微", color: "#f59e0b", logo: "./assets/model-logos/sina-icon.png" },
  { id: "toutiao", name: "头条AI", short: "头", color: "#f43f5e", logo: "./assets/model-logos/toutiao-logo.png" },
  { id: "kimi", name: "Kimi", short: "K", color: "#8b5cf6", logo: "./assets/model-logos/kimi.webp" }
];

const metricOptions = [
  { key: "reach", label: "触达率", value: 98.5, delta: "+5.2%", direction: "up" },
  { key: "topThree", label: "前三推荐率", value: 82.0, delta: "+1.2%", direction: "up" },
  { key: "firstChoice", label: "首推率", value: 45.4, delta: "-0.8%", direction: "down" },
  { key: "suppression", label: "竞品压制率", value: 91.2, delta: "+2.4%", direction: "up" },
  { key: "negative", label: "负面率", value: 0.0, delta: "持平", direction: "flat" }
];

const keywordRows = [
  { id: "kw_001", keyword: "羊奶粉哪个品牌更适合宝宝", type: "industry", typeName: "行业词", platformName: "通义千问", reached: true, rank: 2, sentiment: "positive" },
  { id: "kw_002", keyword: "红星美羚羊奶粉怎么样", type: "product", typeName: "本品词", platformName: "通义千问", reached: true, rank: 1, sentiment: "positive" },
  { id: "kw_003", keyword: "国产羊奶粉品牌推荐", type: "competitor", typeName: "竞对词", platformName: "通义千问", reached: false, rank: null, sentiment: "neutral" },
  { id: "kw_004", keyword: "羊奶粉负面信息监测", type: "industry", typeName: "行业词", platformName: "通义千问", reached: true, rank: 3, sentiment: "negative" },
  { id: "kw_005", keyword: "红星美羚和佳贝艾特对比", type: "competitor", typeName: "竞对词", platformName: "腾讯元宝", reached: true, rank: 2, sentiment: "neutral" },
  { id: "kw_006", keyword: "宝宝羊奶粉怎么选", type: "industry", typeName: "行业词", platformName: "字节豆包", reached: true, rank: 4, sentiment: "positive" }
];

let activeTab = "overview";
let selectedMetricKey = "reach";
let selectedPlatform = allPlatform;

const iconUp = '<svg viewBox="0 0 28 18" aria-hidden="true"><polyline points="2,15 9,8 15,12 26,2" /></svg>';
const iconDown = '<svg viewBox="0 0 28 18" aria-hidden="true"><polyline points="2,4 9,11 15,7 26,17" /></svg>';
const iconFlat = '<svg viewBox="0 0 28 18" aria-hidden="true"><polyline points="3,9 25,9" /></svg>';

function metricByKey(key) {
  return metricOptions.find((metric) => metric.key === key) || metricOptions[0];
}

function formatPercent(value) {
  return `${Math.max(0, Math.min(100, value)).toFixed(1)}%`;
}

function platformLabel(name) {
  if (name === allPlatform) return allPlatform;
  const platform = platforms.find((item) => item.name === name);
  if (!platform) return name;
  return `<img src="${platform.logo}" alt="" />${platform.name}`;
}

function deltaMarkup(metric, withLabel = false) {
  const className = `delta-badge delta-${metric.direction}${withLabel ? " with-label" : ""}`;
  const tooltip = metric.direction === "flat" ? "较上期持平" : `较上期 ${metric.delta}`;
  const icon = metric.direction === "up" ? iconUp : metric.direction === "down" ? iconDown : iconFlat;
  return `
    <span class="${className}" aria-label="${tooltip}" data-tooltip="${tooltip}">
      ${icon}
      ${withLabel ? `<span>${tooltip}</span>` : ""}
    </span>
  `;
}

function platformValue(metric, index) {
  const baseValues = [98.5, 91.2, 84.0, 65.4, 58.2, 42.1, 30.5, 21.0];
  const base = metric.key === "reach" ? baseValues[index] : metric.value - index * 5.2 + (index % 2) * 2;
  return Math.max(5, Math.min(100, base));
}

function rowHitsMetric(row, metricKey) {
  if (metricKey === "reach") return row.reached;
  if (metricKey === "topThree") return typeof row.rank === "number" && row.rank <= 3;
  if (metricKey === "firstChoice") return row.rank === 1;
  if (metricKey === "suppression") return row.type === "competitor" && !row.reached;
  return row.sentiment === "negative";
}

function platformMetricHit(row, platform, metricKey) {
  if (platform.name === row.platformName || row.platformName.includes(platform.name)) {
    return rowHitsMetric(row, metricKey);
  }
  const seed = `${row.id}-${platform.name}-${metricKey}`.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);
  if (metricKey === "negative") return seed % 7 === 0;
  if (metricKey === "suppression") return seed % 4 === 0;
  return seed % 5 !== 0;
}

function keywordPlatformRate(row) {
  const hits = platforms.filter((platform) => platformMetricHit(row, platform, selectedMetricKey)).length;
  return (hits / platforms.length) * 100;
}

function renderPlatformSelect() {
  const select = document.querySelector("#platformSelect");
  select.innerHTML = [allPlatform, ...platforms.map((item) => item.name)]
    .map((name) => `<option value="${name}">${name}</option>`)
    .join("");
  select.value = selectedPlatform;
  select.addEventListener("change", (event) => {
    selectedPlatform = event.target.value;
    renderFocusCard();
  });
}

function renderTabs() {
  document.querySelectorAll(".tab").forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.tab === activeTab);
    tab.addEventListener("click", () => {
      activeTab = tab.dataset.tab;
      updateTabVisibility();
      render();
    });
  });
}

function updateTabVisibility() {
  document.querySelectorAll(".tab").forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.tab === activeTab);
  });
  document.querySelector("#overviewSection").classList.toggle("hidden", activeTab !== "overview");
  document.querySelector("#keywordSection").classList.toggle("hidden", activeTab !== "keywords");
}

function renderMetricTabs(targetId) {
  const tabs = document.querySelector(targetId);
  tabs.innerHTML = metricOptions
    .map((metric) => `
      <button class="metric-chip${metric.key === selectedMetricKey ? " active" : ""}" data-key="${metric.key}" type="button">
        ${metric.label}
      </button>
    `)
    .join("");
  tabs.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      selectedMetricKey = button.dataset.key;
      render();
    });
  });
}

function renderFocusCard() {
  const main = metricByKey("reach");
  document.querySelector("#focusPlatform").innerHTML = platformLabel(selectedPlatform);
  document.querySelector("#mainMetricValue").textContent = formatPercent(main.value);
  document.querySelector("#mainMetricLabel").textContent = main.label;
  document.querySelector("#mainDelta").outerHTML = deltaMarkup(main, true).replace("<span class=", "<span id=\"mainDelta\" class=");

  const rows = metricOptions.filter((metric) => metric.key !== "reach");
  document.querySelector("#supportMetrics").innerHTML = rows
    .map((metric) => `
      <div class="focus-row">
        <span>${metric.label}</span>
        <strong>${formatPercent(metric.value)} ${deltaMarkup(metric)}</strong>
      </div>
    `)
    .join("");
}

function renderBars() {
  const metric = metricByKey(selectedMetricKey);
  document.querySelector("#platformBars").innerHTML = platforms
    .map((platform, index) => {
      const value = platformValue(metric, index);
      return `
        <div class="bar-item">
          <div class="bar-track">
            <div class="bar" style="height:${value}%; background:${platform.color}">
              <span>${formatPercent(value)}</span>
            </div>
          </div>
          <div class="bar-logo" title="${platform.name}" aria-label="${platform.name}">
            <img src="${platform.logo}" alt="${platform.name}" />
          </div>
        </div>
      `;
    })
    .join("");
}

function renderTrend() {
  const metric = metricByKey(selectedMetricKey);
  const topPlatforms = [...platforms]
    .sort((a, b) => platformValue(metric, platforms.indexOf(b)) - platformValue(metric, platforms.indexOf(a)))
    .slice(0, 3);
  document.querySelector("#trendSvg").innerHTML = platforms
    .map((platform, index) => {
      const base = platformValue(metric, index);
      const values = [base - 20, base - 12, base - 4].map((value) => Math.max(8, Math.min(92, value)));
      const points = values.map((value, pointIndex) => `${24 + pointIndex * 156},${170 - value * 1.45}`).join(" ");
      const isTop = topPlatforms.includes(platform);
      return `<polyline class="${isTop ? "trend-main" : "trend-muted"}" fill="none" points="${points}" stroke="${isTop ? platform.color : "#cbd5e1"}" stroke-linecap="round" stroke-linejoin="round" stroke-width="${isTop ? 3 : 2}" />`;
    })
    .join("");

  document.querySelector("#trendLegend").innerHTML = topPlatforms
    .map((platform) => `<span><i style="background:${platform.color}"></i>${platform.name}</span>`)
    .join("");
}

function renderKeywordRanking(targetId, rows) {
  document.querySelector(targetId).innerHTML = rows
    .map((item) => {
      const rate = keywordPlatformRate(item);
      return `
        <div class="keyword-rank-row">
          <span class="keyword-name" title="${item.keyword}">${item.keyword}</span>
          <span class="keyword-track">
            <i class="${rate < 60 ? "low" : ""}" style="width:${rate}%"></i>
          </span>
          <strong>${formatPercent(rate)}</strong>
        </div>
      `;
    })
    .join("");
}

function renderKeywordTypes() {
  const typeDefs = [
    { type: "product", name: "本品词防守表现", color: "#2563eb" },
    { type: "competitor", name: "竞对词拦截表现", color: "#991b1b" },
    { type: "industry", name: "行业词认知突破", color: "#166534" }
  ];
  document.querySelector("#keywordTypeList").innerHTML = typeDefs
    .map((typeDef) => {
      const rows = keywordRows.filter((row) => row.type === typeDef.type);
      const rate = rows.length ? rows.reduce((sum, row) => sum + keywordPlatformRate(row), 0) / rows.length : 0;
      return `
        <div class="keyword-type-row">
          <div><span>${typeDef.name}</span><strong>${formatPercent(rate)}</strong></div>
          <span class="keyword-type-track"><i style="width:${Math.max(4, rate)}%; background:${typeDef.color}"></i></span>
          <small>${rows.length} 个词</small>
        </div>
      `;
    })
    .join("") + `
      <div class="keyword-type-row">
        <div><span>未分类</span><strong>-</strong></div>
        <span class="keyword-type-track"><i style="width:18%; background:#94a3b8"></i></span>
        <small>待标记</small>
      </div>
    `;
}

function renderDiffTable() {
  const sortedRows = [...keywordRows]
    .map((row) => {
      const hits = platforms.map((platform) => ({ platform, hit: platformMetricHit(row, platform, selectedMetricKey) }));
      const count = hits.filter((item) => item.hit).length;
      return {
        row,
        hits,
        score: Math.abs(count - hits.length),
        desc: count === hits.length ? "各平台表现一致" : count === 0 ? "全部平台未达标" : `仅 ${count}/${hits.length} 平台达标`
      };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);

  document.querySelector("#keywordDiffHead").innerHTML = `
    <tr>
      <th>关键词</th>
      ${platforms.map((platform) => `<th>${platform.name}</th>`).join("")}
      <th>差异说明</th>
    </tr>
  `;
  document.querySelector("#keywordDiffBody").innerHTML = sortedRows
    .map((item) => `
      <tr>
        <td><strong>${item.row.keyword}</strong><span class="type-pill type-${item.row.type}">${item.row.typeName}</span></td>
        ${item.hits.map(({ hit }) => `<td><span class="result-pill ${hit ? "hit" : "miss"}">${hit ? "包含触达" : "未获触达"}</span></td>`).join("")}
        <td>${item.desc}</td>
      </tr>
    `)
    .join("");
}

function renderKeywordPage() {
  const rankedRows = [...keywordRows].sort((a, b) => keywordPlatformRate(b) - keywordPlatformRate(a));
  renderMetricTabs("#keywordMetricTabs");
  renderKeywordRanking("#keywordRankList", rankedRows.slice(0, 5));
  renderKeywordRanking("#keywordModalList", rankedRows.slice(0, 10));
  renderKeywordTypes();
  renderDiffTable();
}

function bindKeywordModal() {
  const modal = document.querySelector("#keywordModal");
  document.querySelector("#openKeywordModal").addEventListener("click", () => modal.classList.remove("hidden"));
  document.querySelector("#closeKeywordModal").addEventListener("click", () => modal.classList.add("hidden"));
  modal.addEventListener("click", (event) => {
    if (event.target === modal) modal.classList.add("hidden");
  });
}

function render() {
  renderMetricTabs("#metricTabs");
  renderFocusCard();
  renderBars();
  renderTrend();
  renderKeywordPage();
}

renderPlatformSelect();
renderTabs();
updateTabVisibility();
bindKeywordModal();
render();
