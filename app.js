const allPlatform = "全部平台";

const platforms = [
  { name: "腾讯元宝", color: "#10b981", logo: "./assets/model-logos/yuanbao-color.svg" },
  { name: "豆包", color: "#f59e0b", logo: "./assets/model-logos/doubao.png", avatar: true },
  { name: "kimi", color: "#ef4444", logo: "./assets/model-logos/kimi.webp", avatar: true },
  { name: "通义千问", color: "#8b5cf6", logo: "./assets/model-logos/qwen-color.svg" },
  { name: "deepseek", color: "#2563eb", logo: "./assets/model-logos/deepseek-color.svg" },
  { name: "百度", color: "#06b6d4", logo: "./assets/model-logos/baidu-color.svg" }
];

const metricOptions = [
  { key: "reach", label: "触达率", value: 76.8, delta: "+8%", direction: "up" },
  { key: "topThree", label: "前三推荐率", value: 41.2, delta: "+6%", direction: "up" },
  { key: "firstChoice", label: "首推率", value: 18.6, delta: "-3%", direction: "down" },
  { key: "suppression", label: "竞品压制率", value: 22.4, delta: "+5%", direction: "up" },
  { key: "negative", label: "负面率", value: 3.1, delta: "-2%", direction: "down" }
];

let selectedMetricKey = "reach";
let selectedPlatform = allPlatform;

const iconUp = '<svg viewBox="0 0 28 18" aria-hidden="true"><polyline points="2,15 9,8 15,12 26,2" /></svg>';
const iconDown = '<svg viewBox="0 0 28 18" aria-hidden="true"><polyline points="2,4 9,11 15,7 26,17" /></svg>';

function metricByKey(key) {
  return metricOptions.find((metric) => metric.key === key) || metricOptions[0];
}

function platformLabel(name) {
  if (name === allPlatform) return allPlatform;
  const platform = platforms.find((item) => item.name === name);
  if (!platform) return name;
  return `<img src="${platform.logo}" alt="" />${platform.name}`;
}

function deltaMarkup(metric, withLabel = false) {
  const className = `delta-badge delta-${metric.direction}${withLabel ? " with-label" : ""}`;
  const tooltip = `较上期 ${metric.delta}`;
  return `
    <span class="${className}" aria-label="${tooltip}" data-tooltip="${tooltip}">
      ${metric.direction === "up" ? iconUp : iconDown}
      ${withLabel ? `<span>${tooltip}</span>` : ""}
    </span>
  `;
}

function platformValue(metric, index) {
  return Math.max(8, Math.min(96, metric.value - index * 7 + (index % 2) * 4));
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

function renderMetricTabs() {
  const tabs = document.querySelector("#metricTabs");
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
  document.querySelector("#mainMetricValue").textContent = `${main.value.toFixed(1)}%`;
  document.querySelector("#mainMetricLabel").textContent = main.label;
  document.querySelector("#mainDelta").outerHTML = deltaMarkup(main, true);

  const rows = metricOptions.filter((metric) => metric.key !== "reach");
  document.querySelector("#supportMetrics").innerHTML = rows
    .map((metric) => `
      <div class="focus-row">
        <span>${metric.label}</span>
        <strong>${metric.value.toFixed(1)}% ${deltaMarkup(metric)}</strong>
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
              <span>${value.toFixed(1)}%</span>
            </div>
          </div>
          <div class="bar-logo${platform.avatar ? " avatar" : ""}" title="${platform.name}" aria-label="${platform.name}">
            <img src="${platform.logo}" alt="${platform.name}" />
          </div>
        </div>
      `;
    })
    .join("");
}

function renderTrend() {
  const metric = metricByKey(selectedMetricKey);
  const svg = document.querySelector("#trendSvg");
  svg.innerHTML = platforms
    .map((platform, index) => {
      const base = platformValue(metric, index);
      const values = [
        base - 10 + (index % 3) * 3,
        base - 4 + (index % 2) * 4,
        base + 3 - (index % 4) * 2
      ].map((value) => Math.max(8, Math.min(92, value)));
      const points = values
        .map((value, pointIndex) => `${24 + pointIndex * 156},${170 - value * 1.45}`)
        .join(" ");
      return `<polyline fill="none" points="${points}" stroke="${platform.color}" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" />`;
    })
    .join("");

  document.querySelector("#trendLegend").innerHTML = platforms
    .map((platform) => `<span><i style="background:${platform.color}"></i>${platform.name}</span>`)
    .join("");
}

function render() {
  renderMetricTabs();
  renderFocusCard();
  renderBars();
  renderTrend();
}

renderPlatformSelect();
render();
