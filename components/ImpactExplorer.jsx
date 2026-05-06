"use client";

import { useEffect, useRef } from "react";

export default function ImpactExplorer() {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const $ = (id) => root.querySelector(`#${id}`);

    const W = 480, H = 300;
    const PAD = { l: 50, r: 60, t: 20, b: 40 };
    const PLOT_W = W - PAD.l - PAD.r;
    const PLOT_H = H - PAD.t - PAD.b;
    const years = [2005, 2006, 2007, 2008, 2009];

    const categories = {
      revenue: {
        word: "TOTAL REVENUE",
        chartType: "line",
        title: "US RECORDED MUSIC REVENUE",
        subtitle: "RIAA TOTAL — USD BILLIONS (RETAIL VALUE)",
        metric: "REVENUE",
        values: [12.30, 11.76, 10.37, 8.48, 7.80],
        yMin: 0, yMax: 14,
        format: (v) => "$" + v.toFixed(2) + "B",
        totalLabel: "CUMULATIVE LOSS",
        totalCalc: (vals) => "−$" + (vals[0] - vals[vals.length - 1]).toFixed(2) + "B",
        direction: "down",
        kind: "problem",
        commentary: [
          "> 2005: $12.30B. CD revenue still 87% of total. Industry feels stable.",
          "> 2006: $11.76B. First clear warning sign. Down 4.4% in one year.",
          "> 2007: $10.37B. Declines accelerate. Down 11.8% from 2006.",
          "> 2008: $8.48B. Recession amplifies the digital shift. Down 18.2%.",
          "> 2009: $7.80B. Industry has lost $4.5B in 5 years. CD model is over.",
        ],
      },
      cd: {
        word: "CD ALBUM SALES",
        chartType: "bar",
        title: "CD ALBUM UNIT SALES (US)",
        subtitle: "NIELSEN SOUNDSCAN — UNITS IN MILLIONS",
        metric: "UNITS",
        values: [598.9, 553.4, 449.2, 360.6, 294.9],
        yMin: 0, yMax: 650,
        format: (v) => v.toFixed(0) + "M",
        totalLabel: "UNITS LOST VS 2005",
        totalCalc: (vals) => "−" + (vals[0] - vals[vals.length - 1]).toFixed(0) + "M",
        direction: "down",
        kind: "problem",
        commentary: [
          "> 2005: 598.9M CDs sold. Best Buy and Tower Records still anchor distribution.",
          "> 2006: 553.4M. Tower Records files Chapter 11 in October.",
          "> 2007: 449.2M. CD sales drop 19% in one year. Big-box retailers cut shelf space.",
          "> 2008: 360.6M. Down 20% again. CD album sales have collapsed 40% in 3 years.",
          "> 2009: 294.9M. 2,680 record stores have closed since 2005. Physical retail is finished.",
        ],
      },
      digital: {
        word: "DIGITAL TRACK SALES",
        chartType: "area",
        title: "PAID DIGITAL TRACK DOWNLOADS",
        subtitle: "iTUNES + AMAZON MP3 ERA — UNITS IN MILLIONS",
        metric: "TRACKS",
        values: [353, 582, 844, 1070, 1160],
        yMin: 0, yMax: 1300,
        format: (v) => (v >= 1000 ? (v / 1000).toFixed(2) + "B" : v + "M"),
        totalLabel: "GROWTH 2005→2009",
        totalCalc: (vals) =>
          "+" + (((vals[vals.length - 1] - vals[0]) / vals[0]) * 100).toFixed(0) + "%",
        direction: "up",
        kind: "problem",
        commentary: [
          "> 2005: 353M tracks. iTunes Store dominant. $0.99 unbundling begins.",
          "> 2006: 582M tracks. Up 65%. Album-as-product is dying.",
          "> 2007: 844M tracks. Amazon MP3 launches DRM-free. Volume up, revenue per track flat.",
          "> 2008: 1.07B tracks. Single-track sales now exceed full albums in volume.",
          "> 2009: 1.16B tracks. Growth here cannot offset lost CD revenue. The math does not work.",
        ],
      },
      radio: {
        word: "RADIO PROMO REACH",
        chartType: "pie",
        title: "PROMO REACH BY CHANNEL",
        subtitle: "EST. AUDIENCE SHARE FOR NEW ARTIST DISCOVERY",
        metric: "REACH",
        values: [62, 21, 9, 5, 3],
        yMin: 0, yMax: 70,
        format: (v) => v + "%",
        totalLabel: "TERRESTRIAL RADIO",
        totalCalc: () => "NO LONGER DOMINANT",
        direction: "down",
        kind: "problem",
        commentary: [
          "> 2005: Terrestrial FM is 62% of new music discovery. Radio promo dominates A&R budgets.",
          "> 2006: 21% (relative). Sirius/XM merger proposed. Satellite fragments listenership.",
          "> 2007: 9%. Pandora gains traction. Last.fm and MySpace are how teens find music.",
          "> 2008: 5%. YouTube is now a primary discovery channel. Industry has not adapted.",
          "> 2009: 3%. Radio promo has lost the under-25 demographic almost entirely.",
        ],
      },
      layoffs: {
        word: "INDUSTRY LAYOFFS",
        chartType: "bar-h",
        title: "MAJOR LABEL JOB CUTS",
        subtitle: "EST. CUMULATIVE FTE REDUCTIONS — BIG FOUR LABELS",
        metric: "JOBS LOST",
        values: [400, 1200, 2400, 3900, 5200],
        yMin: 0, yMax: 6000,
        format: (v) => v.toLocaleString(),
        totalLabel: "CUMULATIVE LAYOFFS",
        totalCalc: (vals) => vals[vals.length - 1].toLocaleString() + " FTE",
        direction: "down",
        kind: "problem",
        commentary: [
          "> 2005: ~400 cumulative cuts. Warner Music IPO triggers cost-cutting.",
          "> 2006: ~1,200. EMI and Sony BMG announce restructuring.",
          "> 2007: ~2,400. A&R departments shrink. Fewer artists signed per year.",
          "> 2008: ~3,900. Sony BMG dissolves. Universal absorbs operations.",
          "> 2009: ~5,200. The industry has structurally changed. Old A&R model is dead.",
        ],
      },
      youtube: {
        word: "YOUTUBE MONTHLY VIEWS",
        chartType: "area",
        title: "YOUTUBE GLOBAL MONTHLY VIEWS",
        subtitle: "WHERE AUDIENCES ACTUALLY ARE — VIEWS IN BILLIONS/MO",
        metric: "VIEWS",
        values: [0.1, 1.5, 5, 10, 16],
        yMin: 0, yMax: 18,
        format: (v) => (v < 1 ? (v * 1000).toFixed(0) + "M" : v.toFixed(1) + "B"),
        totalLabel: "GROWTH 2005→2009",
        totalCalc: (vals) =>
          "+" + Math.round(vals[vals.length - 1] / Math.max(vals[0], 0.05)) + "×",
        direction: "up",
        kind: "solution",
        commentary: [
          "> 2005: ~100M views/mo. YouTube launches in February. Site is 10 months old.",
          "> 2006: ~1.5B views/mo. Google acquires for $1.65B. Music videos drive traffic.",
          "> 2007: ~5B views/mo. Bedroom cover artists go viral with no label support.",
          "> 2008: ~10B views/mo. Scooter Braun discovers Justin Bieber here. Signs to RBMG.",
          "> 2009: ~16B views/mo. Discovery has migrated. Audiences are here. Talent is here.",
        ],
      },
      pivot: {
        word: "YOUTUBE-NATIVE ARTIST [PROPOSED]",
        chartType: "line",
        title: "PROJECTED REVENUE — YOUTUBE-NATIVE SIGNING",
        subtitle: "COMPARABLE: BIEBER POST-DISCOVERY TRAJECTORY — USD MILLIONS",
        metric: "PROJECTED",
        values: [0.0, 0.5, 2.4, 8.7, 24.3],
        yMin: 0, yMax: 30,
        format: (v) => "$" + v.toFixed(1) + "M",
        totalLabel: "YEAR 5 PROJECTION",
        totalCalc: (vals) => "$" + vals[vals.length - 1].toFixed(1) + "M",
        direction: "up",
        kind: "solution",
        commentary: [
          "> Y1: Pre-signing. Artist builds audience organically on YouTube. Zero label cost.",
          "> Y2: $0.5M. EP release. Existing fanbase converts to first-week album sales.",
          "> Y3: $2.4M. Tour built around YouTube fan geography. Sold-out small venues.",
          "> Y4: $8.7M. Major-market touring. Brand partnerships. Sync licensing.",
          "> Y5: $24.3M label revenue. On the road, Bieber tours already average $195.8M revenue / $1.37M per concert / 2.35M tickets per tour.",
        ],
      },
    };

    const recommendations = {
      revenue:
        "Revenue has fallen $4.5B industry-wide in five years. The CD-and-radio playbook is broken. Continuing to invest in physical-first artists compounds the loss.",
      cd:
        "CD unit sales have halved in five years. 2,680 record stores closed since 2005. APR Records cannot allocate marketing dollars to a distribution channel that no longer exists.",
      digital:
        "Digital track volume is up 228%, but per-track revenue is a fraction of an album. Volume cannot rescue the income statement. The model has to change.",
      radio:
        "Terrestrial radio no longer reaches the under-25 audience that drives album sales. A&R that depends on radio promo is allocating to a dead channel.",
      layoffs:
        "5,200+ industry jobs gone. The labels that survive are restructuring around digital-native artists with built-in audiences. APR Records must do the same.",
      youtube:
        "Audiences and discovery have moved to YouTube. Scooter Braun and Usher's RBMG already signed Bieber from a YouTube cover in 2008 — they have management locked, they need a label. The next breakout artist is already on the platform. APR Records signs them now or pays 10× later.",
      pivot:
        "APR Records' move: 360 joint venture with RBMG, 50/50 profit split. Inject our infrastructure into Bieber's pre-validated YouTube audience; Usher anchors the mentorship. Tours already average $195.8M revenue, $1.37M per concert, 2.35M tickets. The discovery discount only exists in this window.",
    };

    const homeView = $("home-view");
    const chartView = $("chart-view");
    const wordList = $("word-list");
    const solutionList = $("solution-list");
    const chartSvg = $("chart-svg");
    const chartTitle = $("chart-title");
    const chartSubtitle = $("chart-subtitle");
    const metricLabel = $("metric-label");
    const dataTable = $("data-table");
    const totalLabel = $("total-label");
    const totalValue = $("total-value");
    const commentary = $("commentary");
    const phaseBar = $("phase-bar");
    const backBtn = $("back-btn");
    const statusLine = $("status-line");
    const clockEl = $("clock");
    const recBox = $("recommendation");
    const recText = $("recommendation-text");
    const chartMetricList = $("chart-metric-list");

    // Clear any pre-existing list contents (StrictMode double-mount)
    wordList.innerHTML = "";
    solutionList.innerHTML = "";

    function buildWordRow(key, cat, idx) {
      const row = document.createElement("div");
      const isSolution = cat.kind === "solution";
      row.style.cssText =
        "display: flex; align-items: baseline; gap: 12px; padding: 7px 4px; cursor: pointer; border-bottom: 1px dashed rgba(26,26,26,0.2); transition: background 0.12s, padding-left 0.12s, color 0.12s;";
      const arrow = isSolution ? "↑" : "↓";
      row.innerHTML = `
        <span style="font-size: 11px; opacity: 0.5; width: 28px;">[${String(idx).padStart(2, "0")}]</span>
        <span class="cat-word" style="font-size: 19px; font-weight: 500; letter-spacing: 0.04em; flex: 1;">${cat.word}</span>
        <span style="font-size: 10px; letter-spacing: 0.08em; opacity: 0.5;">${arrow} ${cat.chartType.toUpperCase()} →</span>
      `;
      row.addEventListener("mouseenter", () => {
        row.style.background = "#1a1a1a";
        row.style.color = "#f5f3ec";
        row.style.paddingLeft = "12px";
      });
      row.addEventListener("mouseleave", () => {
        row.style.background = "";
        row.style.color = "";
        row.style.paddingLeft = "4px";
      });
      row.addEventListener("click", () => openCategory(key));
      return row;
    }

    let idx = 1;
    Object.entries(categories).forEach(([key, cat]) => {
      const row = buildWordRow(key, cat, idx++);
      if (cat.kind === "problem") wordList.appendChild(row);
      else solutionList.appendChild(row);
    });

    const chartMetricRows = {};
    function buildChartMetricList() {
      chartMetricList.innerHTML = "";
      let i = 1;
      Object.entries(categories).forEach(([key, cat]) => {
        const row = document.createElement("div");
        row.dataset.key = key;
        row.dataset.active = "false";
        row.title = cat.word;
        row.style.cssText =
          "display: flex; align-items: center; gap: 6px; padding: 5px 6px; cursor: pointer; border-bottom: 1px dashed rgba(26,26,26,0.18); font-size: 10px; letter-spacing: 0.04em; transition: background 0.12s, color 0.12s;";
        const arrow = cat.kind === "solution" ? "↑" : "↓";
        row.innerHTML = `
          <span style="font-size: 9px; opacity: 0.5; width: 18px; flex-shrink: 0;">[${String(i).padStart(2, "0")}]</span>
          <span style="font-weight: 500; flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${cat.word}</span>
          <span style="font-size: 9px; opacity: 0.6; flex-shrink: 0;">${arrow}</span>
        `;
        row.addEventListener("mouseenter", () => {
          if (row.dataset.active !== "true") {
            row.style.background = "rgba(26,26,26,0.08)";
          }
        });
        row.addEventListener("mouseleave", () => {
          if (row.dataset.active !== "true") {
            row.style.background = "";
          }
        });
        row.addEventListener("click", () => {
          if (key !== activeKey) openCategory(key);
        });
        chartMetricList.appendChild(row);
        chartMetricRows[key] = row;
        i++;
      });
    }
    buildChartMetricList();

    function setActiveMetric(key) {
      Object.entries(chartMetricRows).forEach(([k, row]) => {
        if (k === key) {
          row.dataset.active = "true";
          row.style.background = "#1a1a1a";
          row.style.color = "#f5f3ec";
        } else {
          row.dataset.active = "false";
          row.style.background = "";
          row.style.color = "";
        }
      });
    }

    function tickClock() {
      const d = new Date();
      const pad = (n) => String(n).padStart(2, "0");
      clockEl.textContent = `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
    }
    const clockId = setInterval(tickClock, 1000);
    tickClock();

    let activeKey = null;
    let animTimer = null;

    function easeOutQuart(t) {
      return 1 - Math.pow(1 - t, 4);
    }

    function clearSvg() {
      chartSvg.innerHTML = "";
    }

    function svgEl(tag, attrs = {}) {
      const el = document.createElementNS("http://www.w3.org/2000/svg", tag);
      Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
      return el;
    }

    function drawAxes(cat) {
      const { yMin, yMax } = cat;
      for (let i = 0; i <= 5; i++) {
        const y = PAD.t + (i / 5) * PLOT_H;
        chartSvg.appendChild(svgEl("line", {
          x1: PAD.l, y1: y, x2: W - PAD.r, y2: y,
          stroke: "#1a1a1a", "stroke-width": "0.4", "stroke-dasharray": "1,2", opacity: "0.3",
        }));
        const v = yMax - (i / 5) * (yMax - yMin);
        const label = svgEl("text", {
          x: PAD.l - 6, y: y + 3,
          "text-anchor": "end", "font-size": "9",
          "font-family": "Courier New, monospace", fill: "#1a1a1a",
        });
        let txt;
        if (yMax >= 1000) txt = (v / 1000).toFixed(1) + "k";
        else if (yMax >= 100) txt = Math.round(v).toString();
        else if (yMax < 2) txt = v.toFixed(1);
        else txt = v.toFixed(1);
        label.textContent = txt;
        chartSvg.appendChild(label);
      }
      chartSvg.appendChild(svgEl("line", {
        x1: PAD.l, y1: PAD.t, x2: PAD.l, y2: PAD.t + PLOT_H,
        stroke: "#1a1a1a", "stroke-width": "1",
      }));
      chartSvg.appendChild(svgEl("line", {
        x1: PAD.l, y1: PAD.t + PLOT_H, x2: W - PAD.r, y2: PAD.t + PLOT_H,
        stroke: "#1a1a1a", "stroke-width": "1",
      }));
    }

    function yScale(v, cat) {
      const t = (v - cat.yMin) / (cat.yMax - cat.yMin);
      return PAD.t + PLOT_H - t * PLOT_H;
    }
    function xPos(i) { return PAD.l + ((i + 0.5) / years.length) * PLOT_W; }

    function renderBar(cat, globalProgress) {
      clearSvg();
      drawAxes(cat);
      const barW = (PLOT_W / years.length) * 0.55;
      years.forEach((yr, i) => {
        const cx = xPos(i);
        const xLabel = svgEl("text", {
          x: cx, y: PAD.t + PLOT_H + 16,
          "text-anchor": "middle", "font-size": "10",
          "font-family": "Courier New, monospace", fill: "#1a1a1a",
        });
        xLabel.textContent = yr;
        chartSvg.appendChild(xLabel);

        const v = cat.values[i];
        const yTop = yScale(v, cat);
        const fullH = PAD.t + PLOT_H - yTop;
        const h = fullH * globalProgress;
        const y = PAD.t + PLOT_H - h;
        if (h > 0) {
          chartSvg.appendChild(svgEl("rect", {
            x: cx - barW / 2, y: y, width: barW, height: h, fill: "#1a1a1a",
          }));
        }
        if (globalProgress > 0.85) {
          const lbl = svgEl("text", {
            x: cx, y: y - 5,
            "text-anchor": "middle", "font-size": "10",
            "font-family": "Courier New, monospace", fill: "#1a1a1a", "font-weight": "500",
          });
          lbl.textContent = cat.format(v);
          chartSvg.appendChild(lbl);
        }
      });
    }

    function renderBarH(cat, upTo, animProgress) {
      clearSvg();
      const rowH = PLOT_H / years.length;
      years.forEach((yr, i) => {
        const cy = PAD.t + (i + 0.5) * rowH;
        const lbl = svgEl("text", {
          x: PAD.l - 6, y: cy + 3,
          "text-anchor": "end", "font-size": "10",
          "font-family": "Courier New, monospace", fill: "#1a1a1a",
        });
        lbl.textContent = yr;
        chartSvg.appendChild(lbl);
      });
      chartSvg.appendChild(svgEl("line", {
        x1: PAD.l, y1: PAD.t, x2: PAD.l, y2: PAD.t + PLOT_H,
        stroke: "#1a1a1a", "stroke-width": "1",
      }));
      chartSvg.appendChild(svgEl("line", {
        x1: PAD.l, y1: PAD.t + PLOT_H, x2: W - PAD.r, y2: PAD.t + PLOT_H,
        stroke: "#1a1a1a", "stroke-width": "1",
      }));
      for (let i = 1; i <= 4; i++) {
        const x = PAD.l + (i / 4) * PLOT_W;
        chartSvg.appendChild(svgEl("line", {
          x1: x, y1: PAD.t, x2: x, y2: PAD.t + PLOT_H,
          stroke: "#1a1a1a", "stroke-width": "0.4",
          "stroke-dasharray": "1,2", opacity: "0.3",
        }));
        const v = (i / 4) * cat.yMax;
        const xl = svgEl("text", {
          x: x, y: PAD.t + PLOT_H + 14,
          "text-anchor": "middle", "font-size": "9",
          "font-family": "Courier New, monospace", fill: "#1a1a1a",
        });
        xl.textContent = v >= 1000 ? (v / 1000).toFixed(0) + "k" : Math.round(v);
        chartSvg.appendChild(xl);
      }
      const barH = rowH * 0.55;
      years.forEach((yr, i) => {
        if (i < upTo) {
          const v = cat.values[i];
          const fullW = (v / cat.yMax) * PLOT_W;
          const isAnim = i === upTo - 1;
          const w = isAnim ? fullW * animProgress : fullW;
          const cy = PAD.t + (i + 0.5) * rowH;
          chartSvg.appendChild(svgEl("rect", {
            x: PAD.l, y: cy - barH / 2, width: w, height: barH, fill: "#1a1a1a",
          }));
          if (!isAnim || animProgress > 0.85) {
            const lbl = svgEl("text", {
              x: PAD.l + w + 6, y: cy + 3,
              "text-anchor": "start", "font-size": "10",
              "font-family": "Courier New, monospace", fill: "#1a1a1a", "font-weight": "500",
            });
            lbl.textContent = cat.format(v);
            chartSvg.appendChild(lbl);
          }
        }
      });
    }

    function renderLine(cat, upTo, animProgress) {
      clearSvg();
      drawAxes(cat);
      years.forEach((yr, i) => {
        const cx = xPos(i);
        const lbl = svgEl("text", {
          x: cx, y: PAD.t + PLOT_H + 16,
          "text-anchor": "middle", "font-size": "10",
          "font-family": "Courier New, monospace", fill: "#1a1a1a",
        });
        lbl.textContent = yr;
        chartSvg.appendChild(lbl);
      });
      if (upTo === 0) return;
      let pathD = "";
      for (let i = 0; i < upTo - 1; i++) {
        const x = xPos(i), y = yScale(cat.values[i], cat);
        pathD += i === 0 ? `M ${x} ${y}` : ` L ${x} ${y}`;
      }
      if (upTo >= 2) {
        const i = upTo - 1;
        const x0 = xPos(i - 1), y0 = yScale(cat.values[i - 1], cat);
        const x1 = xPos(i), y1 = yScale(cat.values[i], cat);
        const xN = x0 + (x1 - x0) * animProgress;
        const yN = y0 + (y1 - y0) * animProgress;
        if (upTo === 2) pathD = `M ${x0} ${y0} L ${xN} ${yN}`;
        else pathD += ` L ${xN} ${yN}`;
      } else if (upTo === 1) {
        const x0 = xPos(0), y0 = yScale(cat.values[0], cat);
        pathD = `M ${x0} ${y0}`;
      }
      if (pathD) {
        chartSvg.appendChild(svgEl("path", {
          d: pathD, fill: "none", stroke: "#1a1a1a",
          "stroke-width": "1.8", "stroke-linejoin": "miter",
        }));
      }
      for (let i = 0; i < upTo - 1; i++) {
        const x = xPos(i), y = yScale(cat.values[i], cat);
        chartSvg.appendChild(svgEl("rect", {
          x: x - 4, y: y - 4, width: 8, height: 8, fill: "#1a1a1a",
        }));
        const lblY = cat.direction === "down" ? y + 18 : y - 8;
        const lbl = svgEl("text", {
          x: x + 8, y: lblY,
          "text-anchor": "start", "font-size": "10",
          "font-family": "Courier New, monospace", fill: "#1a1a1a", "font-weight": "500",
        });
        lbl.textContent = cat.format(cat.values[i]);
        chartSvg.appendChild(lbl);
      }
      if (upTo >= 1) {
        const i = upTo - 1;
        const x = xPos(i), y = yScale(cat.values[i], cat);
        const size = 4 + animProgress * 4;
        chartSvg.appendChild(svgEl("rect", {
          x: x - size / 2, y: y - size / 2, width: size, height: size, fill: "#1a1a1a",
        }));
        if (animProgress > 0.7) {
          const lblY = cat.direction === "down" ? y + 18 : y - 8;
          const lbl = svgEl("text", {
            x: x + 8, y: lblY,
            "text-anchor": "start", "font-size": "10",
            "font-family": "Courier New, monospace", fill: "#1a1a1a", "font-weight": "500",
          });
          lbl.textContent = cat.format(cat.values[i]);
          chartSvg.appendChild(lbl);
        }
      }
    }

    function renderArea(cat, upTo, animProgress) {
      clearSvg();
      drawAxes(cat);
      years.forEach((yr, i) => {
        const cx = xPos(i);
        const lbl = svgEl("text", {
          x: cx, y: PAD.t + PLOT_H + 16,
          "text-anchor": "middle", "font-size": "10",
          "font-family": "Courier New, monospace", fill: "#1a1a1a",
        });
        lbl.textContent = yr;
        chartSvg.appendChild(lbl);
      });
      if (upTo === 0) return;

      const pts = [];
      for (let i = 0; i < upTo - 1; i++) {
        pts.push([xPos(i), yScale(cat.values[i], cat)]);
      }
      if (upTo >= 2) {
        const i = upTo - 1;
        const x0 = xPos(i - 1), y0 = yScale(cat.values[i - 1], cat);
        const x1 = xPos(i), y1 = yScale(cat.values[i], cat);
        pts.push([x0 + (x1 - x0) * animProgress, y0 + (y1 - y0) * animProgress]);
      } else if (upTo === 1) {
        pts.push([xPos(0), yScale(cat.values[0], cat)]);
      }
      const baseY = PAD.t + PLOT_H;
      let fillD = `M ${pts[0][0]} ${baseY}`;
      pts.forEach(([x, y]) => (fillD += ` L ${x} ${y}`));
      fillD += ` L ${pts[pts.length - 1][0]} ${baseY} Z`;

      const defs = svgEl("defs");
      const pattern = svgEl("pattern", {
        id: "hatch", width: "6", height: "6",
        patternUnits: "userSpaceOnUse", patternTransform: "rotate(-45)",
      });
      pattern.appendChild(svgEl("line", {
        x1: "0", y1: "0", x2: "0", y2: "6",
        stroke: "#1a1a1a", "stroke-width": "0.8",
      }));
      defs.appendChild(pattern);
      chartSvg.appendChild(defs);

      chartSvg.appendChild(svgEl("path", {
        d: fillD, fill: "url(#hatch)", opacity: "0.7",
      }));
      let lineD = `M ${pts[0][0]} ${pts[0][1]}`;
      for (let k = 1; k < pts.length; k++) lineD += ` L ${pts[k][0]} ${pts[k][1]}`;
      chartSvg.appendChild(svgEl("path", {
        d: lineD, fill: "none", stroke: "#1a1a1a", "stroke-width": "1.8",
      }));

      for (let i = 0; i < upTo - 1; i++) {
        const x = xPos(i), y = yScale(cat.values[i], cat);
        chartSvg.appendChild(svgEl("rect", {
          x: x - 3.5, y: y - 3.5, width: 7, height: 7, fill: "#1a1a1a",
        }));
        const lbl = svgEl("text", {
          x: x + 8, y: y - 6,
          "text-anchor": "start", "font-size": "10",
          "font-family": "Courier New, monospace", fill: "#1a1a1a", "font-weight": "500",
        });
        lbl.textContent = cat.format(cat.values[i]);
        chartSvg.appendChild(lbl);
      }
      if (upTo >= 1) {
        const i = upTo - 1;
        const x = xPos(i), y = yScale(cat.values[i], cat);
        chartSvg.appendChild(svgEl("rect", {
          x: x - 3.5, y: y - 3.5, width: 7, height: 7, fill: "#1a1a1a",
        }));
        if (animProgress > 0.7) {
          const lbl = svgEl("text", {
            x: x + 8, y: y - 6,
            "text-anchor": "start", "font-size": "10",
            "font-family": "Courier New, monospace", fill: "#1a1a1a", "font-weight": "500",
          });
          lbl.textContent = cat.format(cat.values[i]);
          chartSvg.appendChild(lbl);
        }
      }
    }

    function renderPie(cat, upTo, animProgress) {
      clearSvg();
      const cx = W / 2 - 70, cy = H / 2;
      const r = 95;
      chartSvg.appendChild(svgEl("circle", {
        cx, cy, r, fill: "none", stroke: "#1a1a1a", "stroke-width": "1",
      }));
      const total = cat.values.reduce((a, b) => a + b, 0);
      let startAngle = -Math.PI / 2;
      const fillStyles = ["solid", "hatch-h", "hatch-v", "hatch-d", "dots"];

      const defs = svgEl("defs");
      const mkLinePattern = (id, transform) => {
        const p = svgEl("pattern", {
          id, width: "5", height: "5",
          patternUnits: "userSpaceOnUse", patternTransform: transform,
        });
        p.appendChild(svgEl("line", {
          x1: "0", y1: "0", x2: "0", y2: "5",
          stroke: "#1a1a1a", "stroke-width": "1",
        }));
        defs.appendChild(p);
      };
      mkLinePattern("p-hatch-h", "rotate(0)");
      mkLinePattern("p-hatch-v", "rotate(90)");
      mkLinePattern("p-hatch-d", "rotate(45)");
      const pdots = svgEl("pattern", {
        id: "p-dots", width: "5", height: "5", patternUnits: "userSpaceOnUse",
      });
      pdots.appendChild(svgEl("circle", {
        cx: "2.5", cy: "2.5", r: "1", fill: "#1a1a1a",
      }));
      defs.appendChild(pdots);
      chartSvg.appendChild(defs);

      const fillFor = (i) => {
        switch (fillStyles[i]) {
          case "solid": return "#1a1a1a";
          case "hatch-h": return "url(#p-hatch-h)";
          case "hatch-v": return "url(#p-hatch-v)";
          case "hatch-d": return "url(#p-hatch-d)";
          case "dots": return "url(#p-dots)";
        }
      };

      for (let i = 0; i < upTo; i++) {
        const v = cat.values[i];
        const fullSpan = (v / total) * Math.PI * 2;
        const isAnim = i === upTo - 1;
        const span = isAnim ? fullSpan * animProgress : fullSpan;
        const endAngle = startAngle + span;
        const x1 = cx + r * Math.cos(startAngle);
        const y1 = cy + r * Math.sin(startAngle);
        const x2 = cx + r * Math.cos(endAngle);
        const y2 = cy + r * Math.sin(endAngle);
        const largeArc = span > Math.PI ? 1 : 0;
        const d = `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`;
        chartSvg.appendChild(svgEl("path", {
          d, fill: fillFor(i), stroke: "#f5f3ec", "stroke-width": "1.5",
        }));
        startAngle += fullSpan;
      }

      const legendX = cx + r + 25;
      const legendY = cy - 60;
      cat.values.forEach((v, i) => {
        const ly = legendY + i * 22;
        const shown = i < upTo;
        chartSvg.appendChild(svgEl("rect", {
          x: legendX, y: ly, width: 14, height: 14,
          fill: fillFor(i), stroke: "#1a1a1a", "stroke-width": "0.5",
          opacity: shown ? "1" : "0.2",
        }));
        const t = svgEl("text", {
          x: legendX + 20, y: ly + 11,
          "font-size": "10", "font-family": "Courier New, monospace",
          fill: "#1a1a1a", opacity: shown ? "1" : "0.3",
        });
        t.textContent = `${years[i]}: ${cat.format(v)}`;
        chartSvg.appendChild(t);
      });
    }

    function updateSidebar(cat, upTo) {
      metricLabel.textContent = cat.metric;
      let rows = "";
      cat.values.forEach((v, i) => {
        const shown = i < upTo;
        const valStr = shown ? cat.format(v) : "— — —";
        rows += `<tr style="opacity:${shown ? "1" : "0.3"};">
          <td style="padding: 3px 0;">${years[i]}</td>
          <td style="padding: 3px 0; text-align: right;">${valStr}</td>
        </tr>`;
      });
      dataTable.innerHTML = rows;
      totalLabel.textContent = cat.totalLabel;
      if (upTo < years.length) {
        totalValue.textContent = upTo === 0 ? "— —" : "...";
      } else {
        totalValue.textContent = cat.totalCalc(cat.values);
      }
    }

    let phaseBarFills = [];
    function buildPhaseBar() {
      phaseBar.innerHTML = "";
      phaseBarFills = [];
      for (let i = 0; i < years.length; i++) {
        const seg = document.createElement("div");
        seg.style.cssText =
          "flex:1; height:4px; background: rgba(26,26,26,0.15); position: relative; overflow: hidden;";
        const fill = document.createElement("div");
        fill.style.cssText =
          "position: absolute; left: 0; top: 0; bottom: 0; width: 0%; background: #1a1a1a;";
        seg.appendChild(fill);
        phaseBar.appendChild(seg);
        phaseBarFills.push(fill);
      }
    }
    function updatePhaseBar(progress) {
      const scaled = progress * years.length;
      for (let i = 0; i < years.length; i++) {
        const f = Math.max(0, Math.min(1, scaled - i));
        if (phaseBarFills[i]) phaseBarFills[i].style.width = f * 100 + "%";
      }
    }

    function renderFor(cat, upTo, animProgress, globalProgress) {
      switch (cat.chartType) {
        case "bar": renderBar(cat, globalProgress); break;
        case "bar-h": renderBarH(cat, upTo, animProgress); break;
        case "line": renderLine(cat, upTo, animProgress); break;
        case "area": renderArea(cat, upTo, animProgress); break;
        case "pie": renderPie(cat, upTo, animProgress); break;
      }
    }

    function playAnimation(cat) {
      if (animTimer) cancelAnimationFrame(animTimer);

      buildPhaseBar();
      updateSidebar(cat, 0);
      updatePhaseBar(0);
      renderFor(cat, 0, 0);
      commentary.textContent = cat.commentary[0];
      statusLine.textContent = "> RUNNING";
      recBox.style.display = "none";

      const duration = 2400;
      const start = performance.now();
      let lastUpTo = -1;
      let lastCommentaryIdx = -1;
      const N = years.length;

      function frame(now) {
        const linear = Math.min(1, (now - start) / duration);
        const eased = easeOutQuart(linear);
        const scaled = eased * N;

        let upTo, animProgress;
        if (linear >= 1) {
          upTo = N;
          animProgress = 1;
        } else {
          upTo = Math.min(N, Math.floor(scaled) + 1);
          animProgress = scaled - Math.floor(scaled);
        }

        renderFor(cat, upTo, animProgress, eased);
        updatePhaseBar(eased);

        const cIdx = Math.min(N - 1, Math.floor(scaled));
        if (cIdx !== lastCommentaryIdx) {
          commentary.textContent = cat.commentary[cIdx];
          lastCommentaryIdx = cIdx;
        }

        if (upTo !== lastUpTo) {
          updateSidebar(cat, upTo);
          lastUpTo = upTo;
        }

        if (linear < 1) {
          animTimer = requestAnimationFrame(frame);
        } else {
          updateSidebar(cat, N);
          statusLine.textContent = "> COMPLETE";
          recText.textContent = recommendations[activeKey] || "";
          recBox.style.display = "block";
        }
      }
      animTimer = requestAnimationFrame(frame);
    }

    function openCategory(key) {
      activeKey = key;
      const cat = categories[key];
      homeView.style.display = "none";
      chartView.style.display = "block";
      chartTitle.textContent = "> " + cat.title;
      chartSubtitle.textContent = cat.subtitle;
      setActiveMetric(key);
      playAnimation(cat);
    }

    const onBack = () => {
      if (animTimer) cancelAnimationFrame(animTimer);
      chartView.style.display = "none";
      homeView.style.display = "block";
      statusLine.textContent = "> READY";
      activeKey = null;
    };
    backBtn.addEventListener("click", onBack);

    return () => {
      clearInterval(clockId);
      if (animTimer) cancelAnimationFrame(animTimer);
      backBtn.removeEventListener("click", onBack);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      id="apr-app"
      style={{
        background: "#f5f3ec",
        border: "1px solid rgba(26,26,26,0.18)",
        borderRadius: "12px",
        padding: "1.5rem 1.75rem",
        fontFamily: "'Courier New', ui-monospace, monospace",
        color: "#1a1a1a",
        minHeight: "480px",
      }}
    >
      <h2 style={{ position: "absolute", left: "-9999px" }}>
        APR Records impact explorer with real RIAA data 2005 to 2009. Click a
        category to see the animated decline that builds the case for signing a
        YouTube discovery.
      </h2>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          fontSize: "11px",
          letterSpacing: "0.08em",
          paddingBottom: "10px",
          borderBottom: "1px solid #1a1a1a",
        }}
      >
        <div>
          <div style={{ fontWeight: 500 }}>APR RECORDS</div>
          <div>
            IMPACT EXPLORER &nbsp;//&nbsp; FY 2005–2009 &nbsp;//&nbsp; SOURCE:
            RIAA, NIELSEN SOUNDSCAN
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div id="status-line" style={{ fontWeight: 500 }}>
            {"> READY"}
          </div>
          <div id="clock">--:--:--</div>
        </div>
      </div>

      <div id="home-view" style={{ padding: "1.5rem 0" }}>
        <div
          style={{
            fontSize: "11px",
            letterSpacing: "0.12em",
            marginBottom: "1rem",
            opacity: 0.7,
          }}
        >
          {"> THE PROBLEM "}&nbsp;—&nbsp; SELECT A METRIC TO VIEW DECLINE
        </div>
        <div
          id="word-list"
          style={{ display: "flex", flexDirection: "column", gap: "2px" }}
        ></div>

        <div
          style={{
            marginTop: "1.5rem",
            fontSize: "11px",
            letterSpacing: "0.12em",
            opacity: 0.7,
          }}
        >
          {"> THE OPPORTUNITY"}
        </div>
        <div
          id="solution-list"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "2px",
            marginTop: "0.5rem",
          }}
        ></div>

        <div
          style={{
            fontSize: "10px",
            letterSpacing: "0.08em",
            marginTop: "1.5rem",
            opacity: 0.5,
          }}
        >
          * RIAA YEAR-END SHIPMENT REPORTS &nbsp;&nbsp; * NIELSEN SOUNDSCAN
          &nbsp;&nbsp; * UNAUDITED INTERNAL FIGURES
        </div>
      </div>

      <div
        id="chart-view"
        style={{ display: "none", paddingTop: "1rem" }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "12px",
          }}
        >
          <div>
            <div
              id="chart-title"
              style={{
                fontSize: "13px",
                fontWeight: 500,
                letterSpacing: "0.08em",
              }}
            ></div>
            <div
              id="chart-subtitle"
              style={{
                fontSize: "10px",
                letterSpacing: "0.08em",
                opacity: 0.7,
                marginTop: "2px",
              }}
            ></div>
          </div>
          <button
            id="back-btn"
            style={{
              fontFamily: "'Courier New', monospace",
              fontSize: "10px",
              letterSpacing: "0.08em",
              padding: "5px 10px",
              background: "#f5f3ec",
              color: "#1a1a1a",
              border: "1px solid #1a1a1a",
              borderRadius: 0,
              cursor: "pointer",
            }}
          >
            ← BACK
          </button>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 230px",
            gap: "20px",
          }}
        >
          <div>
            <svg
              id="chart-svg"
              viewBox="0 0 480 300"
              style={{ width: "100%", height: "auto", display: "block" }}
              role="img"
              aria-label="Animated chart"
            ></svg>
            <div
              id="phase-bar"
              style={{ display: "flex", gap: "4px", marginTop: "10px" }}
            ></div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "14px",
            }}
          >
            <div style={{ border: "1px solid #1a1a1a", padding: "6px 8px" }}>
              <div
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.08em",
                  borderBottom: "1px solid #1a1a1a",
                  paddingBottom: "4px",
                  marginBottom: "4px",
                  opacity: 0.7,
                }}
              >
                METRICS
              </div>
              <div
                id="chart-metric-list"
                style={{ display: "flex", flexDirection: "column" }}
              ></div>
            </div>

            <div style={{ border: "1px solid #1a1a1a", padding: "8px 10px" }}>
              <div
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.08em",
                  borderBottom: "1px solid #1a1a1a",
                  paddingBottom: "4px",
                  marginBottom: "6px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span>YEAR</span>
                <span id="metric-label">VALUE</span>
              </div>
              <table
                id="data-table"
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: "11px",
                }}
              ></table>
            </div>

            <div>
              <div
                id="total-label"
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.08em",
                  borderBottom: "1px solid #1a1a1a",
                  paddingBottom: "4px",
                  marginBottom: "6px",
                }}
              >
                5 YEAR TOTAL
              </div>
              <div
                id="total-value"
                style={{
                  fontSize: "16px",
                  fontWeight: 500,
                  textAlign: "center",
                  padding: "4px 0",
                }}
              >
                — —
              </div>
            </div>

          </div>
        </div>

        <div
          style={{
            marginTop: "14px",
            paddingTop: "10px",
            borderTop: "1px solid #1a1a1a",
            fontSize: "11px",
            lineHeight: 1.5,
            minHeight: "36px",
          }}
        >
          <div id="commentary">{"> ..."}</div>
        </div>

        <div
          id="recommendation"
          style={{
            display: "none",
            marginTop: "12px",
            padding: "10px 12px",
            border: "1px solid #1a1a1a",
            background: "#1a1a1a",
            color: "#f5f3ec",
            fontSize: "11px",
            lineHeight: 1.6,
          }}
        >
          <div
            style={{
              fontWeight: 500,
              letterSpacing: "0.08em",
              marginBottom: "4px",
            }}
          >
            {"> RECOMMENDATION"}
          </div>
          <div id="recommendation-text"></div>
        </div>
      </div>
    </div>
  );
}
