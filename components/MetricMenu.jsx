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
