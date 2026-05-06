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
