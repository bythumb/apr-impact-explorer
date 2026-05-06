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
