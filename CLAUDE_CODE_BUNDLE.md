# APR Records — Impact Explorer · Claude Code Handoff Bundle

This single file contains everything Claude Code needs to recreate the project from scratch.

## How to use

In Claude Code, paste this prompt:

> Read `CLAUDE_CODE_BUNDLE.md` and create every file listed in it at the exact paths shown, with the exact contents shown. Then run `npm install`, then `npm run build` to verify it works. Don't make changes to the contents — just write the files.

Or, if you don't have this file in the target directory yet, paste the entire contents of this file into Claude Code with the same instruction.

---

## Project brief

A Next.js 14 (App Router, JavaScript — no TypeScript) single-page web app styled as a 2008-era terminal printout. It's a persuasive presentation arguing that a fictional record label, **APR Records**, should pivot to YouTube-native artist development.

The home page is a menu of 7 metrics — 5 "Problem" metrics showing industry decline (2005–2009) and 2 "Opportunity" metrics making the YouTube case. Clicking any row swaps to a detail view with a full-size SVG chart, headline KPI, 5-year delta, source line, and a "why it matters" takeaway. State-based navigation (no routes) keeps the terminal feel.

Aesthetic: beige paper background (`#e8e6df`), monospace `Courier New`, serif `Times New Roman` for metric names, hand-rolled inline SVG charts (no chart library). Red `#b3461c` for decline accents, green `#2d6a4f` for growth.

The TerminalHeader has a live ticking clock that starts at `23:35:46` (matching the original mockup) and counts up.

---

## File tree

```
.
├── .gitignore
├── README.md
├── package.json
├── jsconfig.json
├── next.config.mjs
├── app/
│   ├── globals.css
│   ├── layout.jsx
│   └── page.jsx
├── components/
│   ├── Charts.jsx
│   ├── MetricDetail.jsx
│   ├── MetricMenu.jsx
│   └── TerminalHeader.jsx
└── data/
    └── metrics.js
```

After creation, run:

```bash
npm install
npm run build
npm run dev   # http://localhost:3000
```

---

## Files

### `package.json`

```json
{
  "name": "apr-records-impact-explorer",
  "version": "1.0.0",
  "private": true,
  "description": "APR Records Impact Explorer — a 2008-era persuasive presentation on the case for YouTube-native artist development.",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "14.2.5",
    "react": "18.3.1",
    "react-dom": "18.3.1"
  }
}
```

### `next.config.mjs`

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

export default nextConfig;
```

### `jsconfig.json`

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

### `.gitignore`

```
# dependencies
/node_modules
/.pnp
.pnp.*
.yarn/*
!.yarn/patches
!.yarn/plugins
!.yarn/releases
!.yarn/versions

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# env
.env*.local
.env

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts
```

### `README.md`

```md
# APR Records — Impact Explorer

An interactive 2008-era persuasive presentation arguing that APR Records should pivot to YouTube-native artist development.

The app is a single-page Next.js application styled as a terminal printout. It walks through five "Problem" metrics drawn from RIAA shipment data, Nielsen SoundScan, and contemporaneous trade press, then two "Opportunity" metrics that make the case for a YouTube-first artist roster.

## Running locally

\`\`\`bash
npm install
npm run dev
\`\`\`

Open `http://localhost:3000`.

## Deploy

Push to GitHub, then import the repo at [vercel.com/new](https://vercel.com/new). No environment variables required.

## Sources

- RIAA year-end shipment reports, 2005–2009
- Nielsen SoundScan annual recaps, 2005–2009
- Public layoff announcements (Billboard, Variety, NYT)
- YouTube growth disclosures (Google blog posts, comScore)
- Internal APR Records modeling for the proposed YouTube-native artist scenario
```

### `app/layout.jsx`

```jsx
import "./globals.css";

export const metadata = {
  title: "APR Records — Impact Explorer",
  description:
    "FY 2005–2009 industry decline and the case for YouTube-native artists.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

### `app/page.jsx`

```jsx
"use client";

import { useState } from "react";
import TerminalHeader from "@/components/TerminalHeader";
import MetricMenu from "@/components/MetricMenu";
import MetricDetail from "@/components/MetricDetail";

export default function Home() {
  const [view, setView] = useState(null); // null = menu, otherwise = metric slug

  const handleSelect = (slug) => {
    setView(slug);
    if (typeof window !== "undefined") window.scrollTo({ top: 0 });
  };
  const handleBack = () => {
    setView(null);
    if (typeof window !== "undefined") window.scrollTo({ top: 0 });
  };

  return (
    <main className="page">
      <TerminalHeader rightStatus={view ? "VIEWING" : "READY"} />
      <hr className="rule" />
      {view ? (
        <MetricDetail slug={view} onBack={handleBack} onSelect={handleSelect} />
      ) : (
        <MetricMenu onSelect={handleSelect} />
      )}
    </main>
  );
}
```

### `app/globals.css`

```css
/* APR Records Impact Explorer — terminal printout aesthetic */

:root {
  --paper: #e8e6df;
  --paper-2: #ddd9c8;
  --ink: #1a1a1a;
  --ink-soft: #4b4b4b;
  --ink-faint: #8a8a82;
  --rule: #1a1a1a;
  --rule-soft: rgba(26, 26, 26, 0.18);
  --accent: #2f2f2f;
  --warn: #b3461c;
  --good: #2d6a4f;
}

* {
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  padding: 0;
  background: var(--paper);
  color: var(--ink);
  font-family: "Courier New", "Courier", "DM Mono", ui-monospace, Menlo,
    Monaco, "Lucida Console", monospace;
  font-size: 16px;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  text-rendering: geometricPrecision;
}

a {
  color: inherit;
  text-decoration: none;
}

button {
  background: none;
  border: none;
  color: inherit;
  font: inherit;
  padding: 0;
  margin: 0;
  cursor: pointer;
  text-align: left;
}

/* paper card */
.page {
  max-width: 1100px;
  margin: 32px auto;
  padding: 36px 48px 32px;
  background: var(--paper);
  border: 1px solid var(--rule-soft);
  border-radius: 16px;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.04), 0 24px 60px -28px rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: hidden;
}

.page::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image: radial-gradient(
    rgba(0, 0, 0, 0.035) 1px,
    transparent 1px
  );
  background-size: 3px 3px;
  pointer-events: none;
  opacity: 0.6;
}

.page > * {
  position: relative;
  z-index: 1;
}

/* header */
.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 24px;
  font-size: 13px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.header .left {
  white-space: pre-line;
  line-height: 1.55;
}

.header .right {
  text-align: right;
  white-space: pre-line;
  line-height: 1.55;
  color: var(--ink-soft);
}

.header .ready {
  color: var(--good);
  font-weight: 700;
  letter-spacing: 0.08em;
}

.rule {
  border: none;
  border-top: 1px solid var(--rule);
  margin: 14px 0 28px;
}

.section-label {
  font-size: 13px;
  letter-spacing: 0.04em;
  color: var(--ink-soft);
  margin: 28px 0 16px;
  text-transform: uppercase;
}

.section-label::before {
  content: "> ";
  color: var(--ink);
  font-weight: 700;
}

/* metric rows */
.row {
  display: grid;
  grid-template-columns: 60px 1fr auto;
  align-items: baseline;
  gap: 16px;
  padding: 14px 4px;
  border-bottom: 1px dashed var(--rule-soft);
  cursor: pointer;
  transition: background 120ms ease, padding 120ms ease;
}

.row:hover,
.row:focus {
  background: rgba(26, 26, 26, 0.04);
  padding-left: 12px;
  outline: none;
}

.row .index {
  font-size: 12px;
  color: var(--ink-faint);
  letter-spacing: 0.04em;
}

.row .name {
  font-family: "Times New Roman", "Georgia", serif;
  font-size: 28px;
  letter-spacing: 0.01em;
  font-weight: 400;
}

.row .meta {
  font-size: 12px;
  color: var(--ink-faint);
  letter-spacing: 0.06em;
  white-space: nowrap;
}

.row .meta .arrow {
  display: inline-block;
  width: 12px;
  text-align: center;
}

.row .meta .arrow.down {
  color: var(--warn);
}

.row .meta .arrow.up {
  color: var(--good);
}

/* footer */
.footer {
  margin-top: 28px;
  padding-top: 18px;
  border-top: 1px solid var(--rule-soft);
  font-size: 11px;
  letter-spacing: 0.06em;
  color: var(--ink-faint);
  display: flex;
  flex-wrap: wrap;
  gap: 18px 32px;
}

.footer span::before {
  content: "* ";
  color: var(--ink);
}

/* metric detail view */
.detail-back {
  font-size: 12px;
  letter-spacing: 0.06em;
  color: var(--ink-soft);
  margin-bottom: 18px;
  display: inline-block;
  cursor: pointer;
}

.detail-back:hover {
  color: var(--ink);
}

.detail-title {
  font-family: "Times New Roman", "Georgia", serif;
  font-size: 38px;
  letter-spacing: 0.01em;
  margin: 4px 0 6px;
}

.detail-subtitle {
  font-size: 13px;
  letter-spacing: 0.04em;
  color: var(--ink-soft);
  text-transform: uppercase;
  margin-bottom: 20px;
}

.kpi-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
  margin: 20px 0 28px;
}

.kpi {
  border: 1px solid var(--rule-soft);
  padding: 14px 16px;
  background: rgba(255, 255, 255, 0.25);
}

.kpi .label {
  font-size: 11px;
  letter-spacing: 0.08em;
  color: var(--ink-faint);
  text-transform: uppercase;
}

.kpi .value {
  font-family: "Times New Roman", "Georgia", serif;
  font-size: 30px;
  margin-top: 4px;
}

.kpi .delta {
  font-size: 12px;
  margin-top: 2px;
  letter-spacing: 0.04em;
}

.kpi .delta.down {
  color: var(--warn);
}

.kpi .delta.up {
  color: var(--good);
}

.chart-frame {
  border: 1px solid var(--rule);
  padding: 24px 24px 18px;
  background: rgba(255, 255, 255, 0.15);
  margin-bottom: 22px;
}

.chart-frame .chart-caption {
  font-size: 11px;
  letter-spacing: 0.06em;
  color: var(--ink-faint);
  text-transform: uppercase;
  margin-top: 12px;
}

.chart svg {
  width: 100%;
  height: auto;
  display: block;
}

.takeaway {
  border-left: 3px solid var(--ink);
  padding: 6px 16px;
  margin: 8px 0 24px;
  font-size: 14px;
  line-height: 1.6;
}

.takeaway .lead {
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  font-size: 11px;
  color: var(--ink-soft);
  display: block;
  margin-bottom: 4px;
}

.nav-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 28px;
  padding-top: 16px;
  border-top: 1px dashed var(--rule-soft);
  font-size: 12px;
  letter-spacing: 0.06em;
  color: var(--ink-soft);
  text-transform: uppercase;
}

.nav-row button:hover {
  color: var(--ink);
}

@media (max-width: 720px) {
  .page {
    margin: 0;
    padding: 24px 20px;
    border-radius: 0;
  }
  .row {
    grid-template-columns: 36px 1fr auto;
    gap: 10px;
  }
  .row .name {
    font-size: 22px;
  }
  .detail-title {
    font-size: 28px;
  }
  .kpi-row {
    grid-template-columns: 1fr;
  }
  .header {
    flex-direction: column;
    gap: 8px;
  }
  .header .right {
    text-align: left;
  }
}
```

### `data/metrics.js`

```js
// APR Records — Impact Explorer
// All figures are calibrated to publicly reported industry data from 2005–2009.
// Sources noted per metric. The "YouTube-Native Artist" projection is internal modeling.

export const METRICS = [
  {
    id: "01",
    slug: "total-revenue",
    name: "Total Revenue",
    section: "problem",
    chart: "line",
    direction: "down",
    unit: "$ billions, US recorded music",
    source: "RIAA year-end shipment reports",
    headline: "$12.27B → $7.69B in 4 years",
    delta: "−37.3%",
    series: [
      { x: 2005, y: 12.27 },
      { x: 2006, y: 11.49 },
      { x: 2007, y: 10.37 },
      { x: 2008, y: 8.48 },
      { x: 2009, y: 7.69 },
    ],
    takeaway:
      "The US recorded music industry has lost roughly $4.6 billion in annual revenue since 2005. The decline is accelerating: 2008 alone gave back more than the previous two years combined.",
  },
  {
    id: "02",
    slug: "cd-album-sales",
    name: "CD Album Sales",
    section: "problem",
    chart: "bar",
    direction: "down",
    unit: "Millions of units sold, US",
    source: "Nielsen SoundScan annual recap",
    headline: "619M → 296M units",
    delta: "−52.2%",
    series: [
      { x: 2005, y: 619 },
      { x: 2006, y: 553 },
      { x: 2007, y: 449 },
      { x: 2008, y: 360 },
      { x: 2009, y: 296 },
    ],
    takeaway:
      "CDs were 90% of label revenue in 2000. By 2009 they have collapsed by more than half in unit volume — and at ~$15 retail per album, this is the single largest line item driving the revenue chart.",
  },
  {
    id: "03",
    slug: "digital-track-sales",
    name: "Digital Track Sales",
    section: "problem",
    chart: "area",
    direction: "down",
    unit: "Annual growth rate of paid digital downloads",
    source: "Nielsen SoundScan / Apple iTunes disclosures",
    headline: "Growth rate: +65% → +7%",
    delta: "−58 pts",
    // y = YoY % growth in paid digital track downloads
    series: [
      { x: 2006, y: 65 },
      { x: 2007, y: 45 },
      { x: 2008, y: 27 },
      { x: 2009, y: 7 },
    ],
    takeaway:
      "Even our fastest-growing format is decelerating. iTunes saved us in 2006; by 2009 each $0.99 download is replacing a fraction of one $15 CD, and the engine is sputtering.",
  },
  {
    id: "04",
    slug: "radio-promo-reach",
    name: "Radio Promo Reach",
    section: "problem",
    chart: "pie",
    direction: "down",
    unit: "Share of how 16–24 year olds discover new music, 2009",
    source: "NPD MusicWatch / Edison Research, Infinite Dial 2009",
    headline: "Radio share: 65% → 35%",
    delta: "−30 pts vs 2000",
    series: [
      { label: "Terrestrial Radio", y: 35 },
      { label: "Friends / Word of Mouth", y: 24 },
      { label: "YouTube / Online Video", y: 18 },
      { label: "MySpace / Online Social", y: 11 },
      { label: "TV / MTV", y: 7 },
      { label: "Other", y: 5 },
    ],
    takeaway:
      "We spend roughly 60% of our promo budget on terrestrial radio. Among the listeners who actually buy our records, radio drives barely a third of discovery — and the share is in free fall.",
  },
  {
    id: "05",
    slug: "industry-layoffs",
    name: "Industry Layoffs",
    section: "problem",
    chart: "barh",
    direction: "down",
    unit: "Cumulative announced layoffs, 2007–2009",
    source: "Billboard, Variety, NYT industry desk",
    headline: "~6,000 jobs cut",
    delta: "−~22% of label workforce",
    series: [
      { label: "EMI Group", y: 2000 },
      { label: "Sony BMG / Sony Music", y: 1800 },
      { label: "Universal Music", y: 1100 },
      { label: "Warner Music Group", y: 600 },
      { label: "Independent labels", y: 500 },
    ],
    takeaway:
      "Every major has cut between 15% and 30% of headcount in 24 months. This isn't a downturn — it's a structural reset of what a label is.",
  },
  {
    id: "06",
    slug: "youtube-monthly-views",
    name: "YouTube Monthly Views",
    section: "opportunity",
    chart: "area",
    direction: "up",
    unit: "Billions of monthly video views, global",
    source: "Google quarterly disclosures, comScore",
    headline: "1B → 25B monthly views",
    delta: "+25× in 3 years",
    series: [
      { x: 2006, y: 1.0 },
      { x: 2007, y: 4.0 },
      { x: 2008, y: 12.0 },
      { x: 2009, y: 25.0 },
    ],
    takeaway:
      "YouTube went from a curiosity to the largest video distribution surface ever assembled — and it has zero gatekeepers. An unsigned 16-year-old in a bedroom can reach more listeners than a major-label radio campaign.",
  },
  {
    id: "07",
    slug: "youtube-native-artist",
    name: "YouTube-Native Artist [Proposed]",
    section: "opportunity",
    chart: "line",
    direction: "up",
    unit: "Modeled annual revenue, $ thousands, per artist",
    source: "APR Records internal projection — unaudited",
    headline: "Year 0: $5K → Year 4: $500K+",
    delta: "100× in 4 years",
    // Projection: ad rev + sync + tour + merch combined
    series: [
      { x: "Y0 '09", y: 5 },
      { x: "Y1 '10", y: 40 },
      { x: "Y2 '11", y: 125 },
      { x: "Y3 '12", y: 300 },
      { x: "Y4 '13", y: 510 },
    ],
    takeaway:
      "A YouTube-first signing — develop in public, monetize ads day one, layer sync + touring + merch — projects to $500K/yr by year 4 at roughly 1/10th the marketing spend of a traditional radio rollout. We propose APR sign three of these in FY09.",
  },
];

export const PROBLEM_METRICS = METRICS.filter((m) => m.section === "problem");
export const OPPORTUNITY_METRICS = METRICS.filter(
  (m) => m.section === "opportunity"
);

export function getMetric(slug) {
  return METRICS.find((m) => m.slug === slug);
}
```

### `components/TerminalHeader.jsx`

```jsx
"use client";

import { useEffect, useState } from "react";

function pad(n) {
  return String(n).padStart(2, "0");
}

// In-character clock: starts at the time on the screenshot, advances at +1s/sec
// like a real terminal. We use a fixed seed so server & client render identically
// on first paint; then the clock starts ticking on the client.
const SEED = { h: 23, m: 35, s: 46 };

export default function TerminalHeader({ rightStatus = "READY" }) {
  const [time, setTime] = useState(SEED);

  useEffect(() => {
    const id = setInterval(() => {
      setTime((t) => {
        let s = t.s + 1;
        let m = t.m;
        let h = t.h;
        if (s === 60) {
          s = 0;
          m += 1;
        }
        if (m === 60) {
          m = 0;
          h = (h + 1) % 24;
        }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <header className="header">
      <div className="left">
        APR RECORDS{"\n"}
        IMPACT EXPLORER &nbsp;//&nbsp; FY 2005-2009 &nbsp;//&nbsp; SOURCE: RIAA, NIELSEN SOUNDSCAN
      </div>
      <div className="right">
        <span>&gt; </span>
        <span className="ready">{rightStatus}</span>
        {"\n"}
        {pad(time.h)}:{pad(time.m)}:{pad(time.s)}
      </div>
    </header>
  );
}
```

### `components/MetricMenu.jsx`

```jsx
"use client";

import { PROBLEM_METRICS, OPPORTUNITY_METRICS } from "@/data/metrics";

const CHART_LABEL = {
  line: "LINE",
  bar: "BAR",
  area: "AREA",
  pie: "PIE",
  barh: "BAR-H",
};

function Row({ metric, onSelect }) {
  return (
    <button
      className="row"
      onClick={() => onSelect(metric.slug)}
      aria-label={`View ${metric.name}`}
    >
      <span className="index">[{metric.id}]</span>
      <span className="name">{metric.name}</span>
      <span className="meta">
        <span className={`arrow ${metric.direction}`}>
          {metric.direction === "up" ? "↑" : "↓"}
        </span>{" "}
        {CHART_LABEL[metric.chart]} →
      </span>
    </button>
  );
}

export default function MetricMenu({ onSelect }) {
  return (
    <>
      <p className="section-label">
        The Problem &nbsp;—&nbsp; select a metric to view decline
      </p>
      <div className="rows">
        {PROBLEM_METRICS.map((m) => (
          <Row key={m.id} metric={m} onSelect={onSelect} />
        ))}
      </div>

      <p className="section-label">The Opportunity</p>
      <div className="rows">
        {OPPORTUNITY_METRICS.map((m) => (
          <Row key={m.id} metric={m} onSelect={onSelect} />
        ))}
      </div>

      <div className="footer">
        <span>RIAA Year-End Shipment Reports</span>
        <span>Nielsen SoundScan</span>
        <span>Unaudited Internal Figures</span>
      </div>
    </>
  );
}
```

### `components/MetricDetail.jsx`

```jsx
"use client";

import { METRICS, getMetric } from "@/data/metrics";
import { ChartByType } from "./Charts";

export default function MetricDetail({ slug, onBack, onSelect }) {
  const metric = getMetric(slug);
  if (!metric) return null;

  const idx = METRICS.findIndex((m) => m.slug === slug);
  const prev = METRICS[idx - 1];
  const next = METRICS[idx + 1];

  return (
    <div>
      <button className="detail-back" onClick={onBack}>
        ← BACK TO INDEX
      </button>

      <div className="detail-subtitle">
        [{metric.id}] {metric.section === "problem" ? "THE PROBLEM" : "THE OPPORTUNITY"}
        {" "}— {metric.unit}
      </div>
      <h1 className="detail-title">{metric.name}</h1>

      <div className="kpi-row">
        <div className="kpi">
          <div className="label">Headline</div>
          <div className="value">{metric.headline}</div>
        </div>
        <div className="kpi">
          <div className="label">5-Year Δ</div>
          <div className="value">
            <span className={`delta ${metric.direction}`}>
              {metric.direction === "up" ? "▲" : "▼"} {metric.delta}
            </span>
          </div>
        </div>
        <div className="kpi">
          <div className="label">Source</div>
          <div className="value" style={{ fontSize: 16, lineHeight: 1.3 }}>
            {metric.source}
          </div>
        </div>
      </div>

      <div className="chart-frame">
        <ChartByType
          type={metric.chart}
          data={metric.series}
          direction={metric.direction}
        />
        <div className="chart-caption">
          FIG. {metric.id} — {metric.unit}
        </div>
      </div>

      <div className="takeaway">
        <span className="lead">{metric.section === "problem" ? "Why it matters" : "The case"}</span>
        {metric.takeaway}
      </div>

      <div className="nav-row">
        <button onClick={() => prev && onSelect(prev.slug)} disabled={!prev}>
          {prev ? `← [${prev.id}] ${prev.name.toUpperCase()}` : ""}
        </button>
        <button onClick={onBack}>INDEX ↑</button>
        <button onClick={() => next && onSelect(next.slug)} disabled={!next}>
          {next ? `[${next.id}] ${next.name.toUpperCase()} →` : ""}
        </button>
      </div>
    </div>
  );
}
```

### `components/Charts.jsx`

```jsx
"use client";

// Hand-rolled SVG charts to keep the terminal aesthetic.
// All charts share the same monospace tick style and ink/paper color palette.

const INK = "#1a1a1a";
const INK_SOFT = "#4b4b4b";
const INK_FAINT = "#8a8a82";
const RULE_SOFT = "rgba(26,26,26,0.18)";
const WARN = "#b3461c";
const GOOD = "#2d6a4f";

const W = 800;
const H = 360;
const PAD = { t: 24, r: 28, b: 44, l: 56 };

function fmtNum(n) {
  if (Math.abs(n) >= 1000) return (n / 1000).toFixed(1) + "k";
  if (Math.abs(n) >= 100) return n.toFixed(0);
  if (Math.abs(n) >= 10) return n.toFixed(1);
  return n.toFixed(2);
}

function buildScale(values, range) {
  const min = Math.min(0, ...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  return (v) => range[0] + ((v - min) / span) * (range[1] - range[0]);
}

function buildBandScale(n, range, padding = 0.2) {
  const total = range[1] - range[0];
  const step = total / n;
  const bandWidth = step * (1 - padding);
  return {
    band: (i) => range[0] + step * i + (step - bandWidth) / 2,
    width: bandWidth,
    step,
  };
}

function GridY({ ticks, yScale, color = RULE_SOFT }) {
  return (
    <g>
      {ticks.map((t, i) => (
        <line
          key={i}
          x1={PAD.l}
          x2={W - PAD.r}
          y1={yScale(t)}
          y2={yScale(t)}
          stroke={color}
          strokeDasharray="2 4"
        />
      ))}
    </g>
  );
}

function YAxisLabels({ ticks, yScale, formatter = fmtNum }) {
  return (
    <g>
      {ticks.map((t, i) => (
        <text
          key={i}
          x={PAD.l - 8}
          y={yScale(t) + 4}
          textAnchor="end"
          fontSize="11"
          fontFamily="Courier New, monospace"
          fill={INK_FAINT}
        >
          {formatter(t)}
        </text>
      ))}
    </g>
  );
}

function XAxisLabels({ items, xPos }) {
  return (
    <g>
      {items.map((label, i) => (
        <text
          key={i}
          x={xPos(i)}
          y={H - PAD.b + 18}
          textAnchor="middle"
          fontSize="11"
          fontFamily="Courier New, monospace"
          fill={INK_FAINT}
        >
          {label}
        </text>
      ))}
    </g>
  );
}

function Frame() {
  return (
    <g>
      <line
        x1={PAD.l}
        x2={W - PAD.r}
        y1={H - PAD.b}
        y2={H - PAD.b}
        stroke={INK}
      />
      <line x1={PAD.l} x2={PAD.l} y1={PAD.t} y2={H - PAD.b} stroke={INK} />
    </g>
  );
}

function niceTicks(min, max, count = 5) {
  const span = max - min;
  const step = Math.pow(10, Math.floor(Math.log10(span / count)));
  const candidates = [step, step * 2, step * 2.5, step * 5, step * 10];
  const target = span / count;
  const chosen = candidates.reduce((best, s) =>
    Math.abs(s - target) < Math.abs(best - target) ? s : best
  );
  const ticks = [];
  const tickStart = Math.floor(min / chosen) * chosen;
  for (let v = tickStart; v <= max + chosen / 2; v += chosen) ticks.push(v);
  return ticks;
}

/* ---------- LINE ---------- */
export function LineChart({ data, color = INK, accentDirection = "down" }) {
  const yMin = 0;
  const yMax = Math.max(...data.map((d) => d.y)) * 1.1;
  const yScale = buildScale([yMin, yMax], [H - PAD.b, PAD.t]);
  const xScale = (i) =>
    PAD.l + ((W - PAD.r - PAD.l) * i) / Math.max(1, data.length - 1);
  const ticks = niceTicks(yMin, yMax, 5);

  const path = data
    .map((d, i) => `${i === 0 ? "M" : "L"} ${xScale(i)} ${yScale(d.y)}`)
    .join(" ");

  const stroke = accentDirection === "up" ? GOOD : WARN;

  return (
    <div className="chart">
      <svg viewBox={`0 0 ${W} ${H}`} role="img">
        <GridY ticks={ticks} yScale={yScale} />
        <YAxisLabels ticks={ticks} yScale={yScale} />
        <XAxisLabels
          items={data.map((d) => String(d.x))}
          xPos={(i) => xScale(i)}
        />
        <Frame />
        <path d={path} fill="none" stroke={stroke} strokeWidth="2" />
        {data.map((d, i) => (
          <g key={i}>
            <circle cx={xScale(i)} cy={yScale(d.y)} r="4" fill={stroke} />
            <text
              x={xScale(i)}
              y={yScale(d.y) - 12}
              textAnchor="middle"
              fontSize="11"
              fontFamily="Courier New, monospace"
              fill={INK}
            >
              {fmtNum(d.y)}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

/* ---------- BAR (vertical) ---------- */
export function BarChart({ data, accentDirection = "down" }) {
  const yMax = Math.max(...data.map((d) => d.y)) * 1.1;
  const yScale = buildScale([0, yMax], [H - PAD.b, PAD.t]);
  const x = buildBandScale(
    data.length,
    [PAD.l, W - PAD.r],
    0.35
  );
  const ticks = niceTicks(0, yMax, 5);
  const fill = accentDirection === "up" ? GOOD : WARN;

  return (
    <div className="chart">
      <svg viewBox={`0 0 ${W} ${H}`} role="img">
        <GridY ticks={ticks} yScale={yScale} />
        <YAxisLabels ticks={ticks} yScale={yScale} />
        <XAxisLabels
          items={data.map((d) => String(d.x))}
          xPos={(i) => x.band(i) + x.width / 2}
        />
        <Frame />
        {data.map((d, i) => {
          const yTop = yScale(d.y);
          const h = H - PAD.b - yTop;
          return (
            <g key={i}>
              <rect
                x={x.band(i)}
                y={yTop}
                width={x.width}
                height={h}
                fill={fill}
                opacity="0.85"
              />
              <text
                x={x.band(i) + x.width / 2}
                y={yTop - 6}
                textAnchor="middle"
                fontSize="11"
                fontFamily="Courier New, monospace"
                fill={INK}
              >
                {fmtNum(d.y)}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/* ---------- AREA ---------- */
export function AreaChart({ data, accentDirection = "down" }) {
  const yMin = Math.min(0, ...data.map((d) => d.y));
  const yMax = Math.max(...data.map((d) => d.y)) * 1.1;
  const yScale = buildScale([yMin, yMax], [H - PAD.b, PAD.t]);
  const xScale = (i) =>
    PAD.l + ((W - PAD.r - PAD.l) * i) / Math.max(1, data.length - 1);
  const ticks = niceTicks(yMin, yMax, 5);
  const baselineY = yScale(0);
  const stroke = accentDirection === "up" ? GOOD : WARN;

  const linePath = data
    .map((d, i) => `${i === 0 ? "M" : "L"} ${xScale(i)} ${yScale(d.y)}`)
    .join(" ");

  const areaPath =
    `M ${xScale(0)} ${baselineY} ` +
    data.map((d, i) => `L ${xScale(i)} ${yScale(d.y)}`).join(" ") +
    ` L ${xScale(data.length - 1)} ${baselineY} Z`;

  return (
    <div className="chart">
      <svg viewBox={`0 0 ${W} ${H}`} role="img">
        <GridY ticks={ticks} yScale={yScale} />
        <YAxisLabels ticks={ticks} yScale={yScale} />
        <XAxisLabels
          items={data.map((d) => String(d.x))}
          xPos={(i) => xScale(i)}
        />
        <Frame />
        <path d={areaPath} fill={stroke} opacity="0.2" />
        <path d={linePath} fill="none" stroke={stroke} strokeWidth="2" />
        {data.map((d, i) => (
          <g key={i}>
            <circle cx={xScale(i)} cy={yScale(d.y)} r="3" fill={stroke} />
            <text
              x={xScale(i)}
              y={yScale(d.y) - 10}
              textAnchor="middle"
              fontSize="11"
              fontFamily="Courier New, monospace"
              fill={INK}
            >
              {fmtNum(d.y)}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

/* ---------- PIE ---------- */
export function PieChart({ data, accentDirection = "down" }) {
  const cx = W / 2;
  const cy = H / 2 + 10;
  const r = 130;
  const total = data.reduce((s, d) => s + d.y, 0);
  let acc = 0;

  // Earth-tone palette for the pie wedges
  const palette = [
    "#1a1a1a",
    "#5b3a29",
    "#8a5a3b",
    "#a8794a",
    "#c5a47e",
    "#dcc5a0",
  ];

  const slices = data.map((d, i) => {
    const start = (acc / total) * Math.PI * 2 - Math.PI / 2;
    acc += d.y;
    const end = (acc / total) * Math.PI * 2 - Math.PI / 2;
    const large = end - start > Math.PI ? 1 : 0;
    const x1 = cx + r * Math.cos(start);
    const y1 = cy + r * Math.sin(start);
    const x2 = cx + r * Math.cos(end);
    const y2 = cy + r * Math.sin(end);
    const path = `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} Z`;
    const mid = (start + end) / 2;
    return {
      path,
      label: d.label,
      pct: ((d.y / total) * 100).toFixed(0),
      labelX: cx + (r + 24) * Math.cos(mid),
      labelY: cy + (r + 24) * Math.sin(mid),
      anchor: Math.cos(mid) > 0.1 ? "start" : Math.cos(mid) < -0.1 ? "end" : "middle",
      color: palette[i % palette.length],
    };
  });

  return (
    <div className="chart">
      <svg viewBox={`0 0 ${W} ${H + 40}`} role="img">
        {slices.map((s, i) => (
          <g key={i}>
            <path d={s.path} fill={s.color} stroke={INK} strokeWidth="1" />
          </g>
        ))}
        {slices.map((s, i) => (
          <g key={`l-${i}`}>
            <text
              x={s.labelX}
              y={s.labelY}
              textAnchor={s.anchor}
              fontSize="11"
              fontFamily="Courier New, monospace"
              fill={INK}
            >
              {s.label.toUpperCase()} — {s.pct}%
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

/* ---------- BAR-H (horizontal) ---------- */
export function BarHChart({ data, accentDirection = "down" }) {
  const xMax = Math.max(...data.map((d) => d.y)) * 1.15;
  const xScale = buildScale([0, xMax], [PAD.l + 140, W - PAD.r]);
  const rowH = (H - PAD.t - PAD.b) / data.length;
  const ticks = niceTicks(0, xMax, 5);
  const fill = accentDirection === "up" ? GOOD : WARN;

  return (
    <div className="chart">
      <svg viewBox={`0 0 ${W} ${H}`} role="img">
        {/* x grid */}
        {ticks.map((t, i) => (
          <line
            key={i}
            x1={xScale(t)}
            x2={xScale(t)}
            y1={PAD.t}
            y2={H - PAD.b}
            stroke={RULE_SOFT}
            strokeDasharray="2 4"
          />
        ))}
        {ticks.map((t, i) => (
          <text
            key={`tt-${i}`}
            x={xScale(t)}
            y={H - PAD.b + 18}
            textAnchor="middle"
            fontSize="11"
            fontFamily="Courier New, monospace"
            fill={INK_FAINT}
          >
            {fmtNum(t)}
          </text>
        ))}
        <line
          x1={xScale(0)}
          x2={xScale(0)}
          y1={PAD.t}
          y2={H - PAD.b}
          stroke={INK}
        />
        {data.map((d, i) => {
          const y = PAD.t + rowH * i + 8;
          const h = rowH - 16;
          return (
            <g key={i}>
              <text
                x={PAD.l + 130}
                y={y + h / 2 + 4}
                textAnchor="end"
                fontSize="12"
                fontFamily="Courier New, monospace"
                fill={INK}
              >
                {d.label.toUpperCase()}
              </text>
              <rect
                x={xScale(0)}
                y={y}
                width={xScale(d.y) - xScale(0)}
                height={h}
                fill={fill}
                opacity="0.85"
              />
              <text
                x={xScale(d.y) + 6}
                y={y + h / 2 + 4}
                textAnchor="start"
                fontSize="11"
                fontFamily="Courier New, monospace"
                fill={INK}
              >
                {fmtNum(d.y)}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export function ChartByType({ type, data, direction }) {
  switch (type) {
    case "line":
      return <LineChart data={data} accentDirection={direction} />;
    case "bar":
      return <BarChart data={data} accentDirection={direction} />;
    case "area":
      return <AreaChart data={data} accentDirection={direction} />;
    case "pie":
      return <PieChart data={data} accentDirection={direction} />;
    case "barh":
      return <BarHChart data={data} accentDirection={direction} />;
    default:
      return null;
  }
}
```

---

## Verification checklist

After Claude Code finishes, confirm:

- [ ] `npm install` succeeds with no errors.
- [ ] `npm run build` reports `Compiled successfully` and a single static `/` route around 5 KB.
- [ ] `npm run dev` serves on `localhost:3000` showing the menu of 7 metrics.
- [ ] Clicking row `[01] TOTAL REVENUE` shows a red declining line chart with five labeled points (2005–2009).
- [ ] The clock in the top-right ticks one second per second.
- [ ] Row `[06] YOUTUBE MONTHLY VIEWS` and `[07] YOUTUBE-NATIVE ARTIST [PROPOSED]` render with green accents (the only two with `direction: "up"`).
