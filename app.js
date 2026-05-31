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

const miningPhases = [
  {
    id: "industry",
    name: "认知阶段",
    typeName: "行业词",
    icon: "verified",
    desc: "用户正在了解品类、症状、场景与选型标准。",
    goal: "沉淀品类教育与场景内容占位。",
    saved: 50,
    keywords: [
      { id: "industry_1", text: "羊奶粉哪个牌子好吸收", heat: 96, intent: "选型", source: "搜索联想" },
      { id: "industry_2", text: "宝宝喝羊奶粉容易上火吗", heat: 88, intent: "顾虑", source: "AI 推荐" },
      { id: "industry_3", text: "羊奶粉和牛奶粉区别", heat: 82, intent: "科普", source: "搜索联想" },
      { id: "industry_4", text: "中老年羊奶粉怎么选", heat: 73, intent: "场景", source: "AI 推荐" },
      { id: "industry_5", text: "敏感体质适合羊奶粉吗", heat: 66, intent: "场景", source: "站内搜索" },
      { id: "industry_6", text: "羊奶粉新国标怎么看", heat: 58, intent: "标准", source: "搜索联想" },
      { id: "industry_7", text: "国产羊奶粉推荐", heat: 53, intent: "推荐", source: "AI 推荐" },
      { id: "industry_8", text: "有机羊奶粉和普通羊奶粉区别", heat: 47, intent: "科普", source: "搜索联想" }
    ]
  },
  {
    id: "competitor",
    name: "对比阶段",
    typeName: "竞对词",
    icon: "compare_arrows",
    desc: "用户正在比较品牌、替代方案、口碑与价格。",
    goal: "发现竞品拦截和对比内容缺口。",
    saved: 36,
    keywords: [
      { id: "competitor_1", text: "红星美羚和佳贝艾特哪个好", heat: 94, intent: "品牌对比", source: "AI 推荐" },
      { id: "competitor_2", text: "红星美羚和羊滋滋对比", heat: 86, intent: "品牌对比", source: "搜索联想" },
      { id: "competitor_3", text: "国产羊奶粉十大品牌排行", heat: 79, intent: "榜单", source: "搜索联想" },
      { id: "competitor_4", text: "佳贝艾特替代品牌", heat: 69, intent: "替代", source: "AI 推荐" },
      { id: "competitor_5", text: "蓝河羊奶粉和红星美羚哪个好", heat: 61, intent: "品牌对比", source: "站内搜索" },
      { id: "competitor_6", text: "羊奶粉品牌口碑对比", heat: 54, intent: "口碑", source: "搜索联想" }
    ]
  },
  {
    id: "product",
    name: "决策解决",
    typeName: "本品词",
    icon: "shopping_cart_checkout",
    desc: "用户已经关注本品，正在验证安全性、口碑与购买理由。",
    goal: "补齐品牌防守、权威背书和转化内容。",
    saved: 42,
    keywords: [
      { id: "product_1", text: "红星美羚羊奶粉怎么样", heat: 98, intent: "口碑", source: "搜索联想" },
      { id: "product_2", text: "红星美羚羊奶粉配方优势", heat: 85, intent: "卖点", source: "AI 推荐" },
      { id: "product_3", text: "红星美羚羊奶粉适合多大宝宝", heat: 74, intent: "适配", source: "站内搜索" },
      { id: "product_4", text: "红星美羚羊奶粉官方旗舰店", heat: 68, intent: "购买", source: "搜索联想" },
      { id: "product_5", text: "红星美羚羊奶粉负面评价", heat: 46, intent: "风险", source: "AI 推荐" },
      { id: "product_6", text: "红星美羚羊奶粉奶源地", heat: 42, intent: "背书", source: "搜索联想" }
    ]
  }
];

let activeSystem = "mining";
let activeTab = "overview";
let selectedMetricKey = "reach";
let selectedPlatform = allPlatform;
let activeMiningPhase = "industry";
let miningView = "bar";
let miningSearchText = "";
let selectedMiningIds = new Set();

const iconUp = '<svg viewBox="0 0 28 18" aria-hidden="true"><polyline points="2,15 9,8 15,12 26,2" /></svg>';
const iconDown = '<svg viewBox="0 0 28 18" aria-hidden="true"><polyline points="2,4 9,11 15,7 26,17" /></svg>';
const iconFlat = '<svg viewBox="0 0 28 18" aria-hidden="true"><polyline points="3,9 25,9" /></svg>';

function metricByKey(key) {
  return metricOptions.find((metric) => metric.key === key) || metricOptions[0];
}

function miningPhaseById(id) {
  return miningPhases.find((phase) => phase.id === id) || miningPhases[0];
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

function renderSystemVisibility() {
  document.querySelectorAll(".system-screen").forEach((screen) => {
    const system = screen.id.replace("System", "");
    screen.classList.toggle("hidden", system !== activeSystem);
  });
  document.querySelectorAll(".nav-item[data-system]").forEach((item) => {
    item.classList.toggle("active", item.dataset.system === activeSystem);
  });
  const titles = {
    mining: "野颂慧眼 - 需求挖掘系统",
    analytics: "野颂慧眼 - 效果分析系统",
    content: "野颂慧眼 - 内容生产系统"
  };
  document.title = titles[activeSystem] || titles.mining;
}

function bindSystemNav() {
  document.querySelectorAll(".nav-item[data-system]").forEach((item) => {
    item.addEventListener("click", () => {
      activeSystem = item.dataset.system;
      renderSystemVisibility();
    });
  });
}

function renderPlatformSelect() {
  const select = document.querySelector("#platformSelect");
  if (!select) return;
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
      renderAnalytics();
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
  if (!tabs) return;
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
      renderAnalytics();
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

function renderAnalytics() {
  renderMetricTabs("#metricTabs");
  renderFocusCard();
  renderBars();
  renderTrend();
  renderKeywordPage();
}

function renderPhaseSelect() {
  const select = document.querySelector("#phaseSelect");
  select.innerHTML = miningPhases.map((phase) => `<option value="${phase.id}">${phase.name} / ${phase.typeName}</option>`).join("");
  select.value = activeMiningPhase;
  select.addEventListener("change", (event) => {
    activeMiningPhase = event.target.value;
    renderMining();
  });
}

function renderPhaseCards() {
  const container = document.querySelector("#phaseCards");
  container.innerHTML = miningPhases
    .map((phase, index) => `
      <button class="phase-card${phase.id === activeMiningPhase ? " active" : ""}" data-phase="${phase.id}" type="button">
        <span class="material-symbol">${phase.icon}</span>
        <small>0${index + 1}</small>
        <strong>${phase.name}</strong>
        <em>${phase.typeName}</em>
        <p>${phase.desc}</p>
      </button>
    `)
    .join("");
  container.querySelectorAll(".phase-card").forEach((card) => {
    card.addEventListener("click", () => {
      activeMiningPhase = card.dataset.phase;
      document.querySelector("#phaseSelect").value = activeMiningPhase;
      renderMining();
    });
  });
}

function filteredMiningKeywords() {
  const phase = miningPhaseById(activeMiningPhase);
  const query = miningSearchText.trim().toLowerCase();
  return phase.keywords.filter((item) => !query || item.text.toLowerCase().includes(query) || item.intent.toLowerCase().includes(query));
}

function renderMiningChart() {
  const phase = miningPhaseById(activeMiningPhase);
  const rows = phase.keywords.slice(0, 8);
  document.querySelector("#miningChartDesc").textContent = `${phase.typeName}的高潜关键词热度分布。`;

  if (miningView === "cloud") {
    document.querySelector("#miningChart").className = "mining-chart word-cloud";
    document.querySelector("#miningChart").innerHTML = rows
      .map((item, index) => `
        <button style="--size:${16 + item.heat / 8}px; --tone:${index % 3}" data-keyword="${item.id}" type="button">
          ${item.text}
        </button>
      `)
      .join("");
    return;
  }

  document.querySelector("#miningChart").className = "mining-chart mining-bars";
  document.querySelector("#miningChart").innerHTML = rows
    .map((item) => `
      <div class="mining-bar-row">
        <span title="${item.text}">${item.text}</span>
        <strong>${item.heat}</strong>
        <i><b style="width:${item.heat}%"></b></i>
      </div>
    `)
    .join("");
}

function renderMiningList() {
  const rows = filteredMiningKeywords();
  document.querySelector("#keywordList").innerHTML = `
    <div class="mining-list-head">
      <label><input id="selectAllMining" type="checkbox" ${rows.length && rows.every((row) => selectedMiningIds.has(row.id)) ? "checked" : ""} /> 关键词</label>
      <span>意图</span>
      <span>热度</span>
      <span>来源</span>
    </div>
    ${rows.map((item) => `
      <label class="mining-list-row">
        <span><input type="checkbox" data-id="${item.id}" ${selectedMiningIds.has(item.id) ? "checked" : ""} /> ${item.text}</span>
        <em>${item.intent}</em>
        <strong>${item.heat}</strong>
        <small>${item.source}</small>
      </label>
    `).join("")}
  `;

  document.querySelectorAll("#keywordList input[data-id]").forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        selectedMiningIds.add(checkbox.dataset.id);
      } else {
        selectedMiningIds.delete(checkbox.dataset.id);
      }
      renderSelectedBar();
      renderMiningList();
    });
  });

  document.querySelector("#selectAllMining").addEventListener("change", (event) => {
    rows.forEach((item) => {
      if (event.target.checked) {
        selectedMiningIds.add(item.id);
      } else {
        selectedMiningIds.delete(item.id);
      }
    });
    renderSelectedBar();
    renderMiningList();
  });
}

function renderProgressCards() {
  document.querySelector("#progressCards").innerHTML = miningPhases
    .map((phase) => `
      <div class="progress-card${phase.id === activeMiningPhase ? " active" : ""}">
        <span>${phase.name}</span>
        <strong>${phase.saved}</strong>
        <em>${phase.typeName}</em>
      </div>
    `)
    .join("");
}

function renderSelectedBar() {
  document.querySelector("#selectedCount").textContent = selectedMiningIds.size;
  document.querySelector("#selectedBar").classList.toggle("active", selectedMiningIds.size > 0);
}

function renderMining() {
  const phase = miningPhaseById(activeMiningPhase);
  document.querySelector("#phaseSelect").value = activeMiningPhase;
  document.querySelector("#miningKeywordTotal").textContent = miningPhases.reduce((sum, item) => sum + item.saved, 0);
  document.querySelector("#miningNewCount").textContent = phase.keywords.length;
  renderPhaseCards();
  renderMiningChart();
  renderMiningList();
  renderProgressCards();
  renderSelectedBar();
}

function bindMiningControls() {
  document.querySelectorAll(".view-switch button").forEach((button) => {
    button.addEventListener("click", () => {
      miningView = button.dataset.view;
      document.querySelectorAll(".view-switch button").forEach((item) => item.classList.toggle("active", item.dataset.view === miningView));
      renderMiningChart();
    });
  });

  document.querySelector("#keywordSearch").addEventListener("input", (event) => {
    miningSearchText = event.target.value;
    renderMiningList();
  });

  document.querySelector("#clearSelected").addEventListener("click", () => {
    selectedMiningIds.clear();
    renderSelectedBar();
    renderMiningList();
  });

  document.querySelector("#saveSelected").addEventListener("click", () => {
    const button = document.querySelector("#saveSelected");
    button.textContent = "已保存";
    window.setTimeout(() => {
      button.textContent = "保存到关键词组";
    }, 900);
  });

  ["#runMining", "#startMiningInline"].forEach((selector) => {
    document.querySelector(selector).addEventListener("click", () => {
      const button = document.querySelector(selector);
      const original = button.textContent;
      button.textContent = "挖掘中...";
      window.setTimeout(() => {
        button.textContent = original;
      }, 900);
    });
  });

  document.querySelector("#savePhase").addEventListener("click", () => {
    const button = document.querySelector("#savePhase");
    button.textContent = "已保存当前阶段";
    window.setTimeout(() => {
      button.textContent = "保存当前阶段";
    }, 900);
  });
}

bindSystemNav();
renderSystemVisibility();
renderPlatformSelect();
renderTabs();
updateTabVisibility();
bindKeywordModal();
renderPhaseSelect();
bindMiningControls();
renderAnalytics();
renderMining();
