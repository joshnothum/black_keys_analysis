import { useEffect, useMemo, useRef, useState } from 'react';
import { line, area, curveMonotoneX } from 'd3-shape';
import './SentimentArcChart.css';

const MARGIN = { top: 24, right: 20, bottom: 36, left: 48 };

// Simple linear scale — no need for the full d3-scale package
function scaleLinear([d0, d1], [r0, r1]) {
  return (v) => r0 + ((v - d0) / (d1 - d0 || 1)) * (r1 - r0);
}

export function SentimentArcChart({ verses }) {
  const [width, setWidth] = useState(580);
  const containerRef = useRef(null);
  const pathRef = useRef(null);

  // Responsive width
  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver(([entry]) => {
      const w = Math.floor(entry.contentRect.width);
      if (w > 0) setWidth(w);
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  const data = useMemo(() => {
    if (!verses?.length) return [];
    return verses.map((v, i) => ({
      index: i,
      score: v.sentiment.comparative,
      label: `V${i + 1}`,
      words: v.sentiment.words ?? [],
    }));
  }, [verses]);

  // Animate the stroke draw whenever data or width changes
  useEffect(() => {
    const el = pathRef.current;
    if (!el || !data.length) return;
    const length = el.getTotalLength();
    el.style.transition = 'none';
    el.style.strokeDasharray = `${length}`;
    el.style.strokeDashoffset = `${length}`;
    el.getBoundingClientRect(); // force reflow before transition
    el.style.transition = 'stroke-dashoffset 1.4s cubic-bezier(0.4, 0, 0.2, 1)';
    el.style.strokeDashoffset = '0';
  }, [data, width]);

  if (!data.length) {
    return <div className="chart-empty">No verse data available</div>;
  }

  const innerW = width - MARGIN.left - MARGIN.right;
  const height = Math.max(180, Math.round(width * 0.38));
  const innerH = height - MARGIN.top - MARGIN.bottom;

  const scores = data.map((d) => d.score);
  const absMax = Math.max(
    Math.abs(Math.min(...scores, -0.05)),
    Math.abs(Math.max(...scores,  0.05))
  ) * 1.3; // padding so the line never hits the edge

  const xScale = scaleLinear([0, data.length - 1], [0, innerW]);
  const yScale = scaleLinear([-absMax, absMax], [innerH, 0]);
  const yZero  = yScale(0);

  // Smooth monotone curve — prevents oscillation with few data points
  const lineFn = line()
    .x((d) => xScale(d.index))
    .y((d) => yScale(d.score))
    .curve(curveMonotoneX);

  const areaFn = area()
    .x((d) => xScale(d.index))
    .y0(yZero)
    .y1((d) => yScale(d.score))
    .curve(curveMonotoneX);

  const areaPath = areaFn(data);
  const linePath = lineFn(data);

  return (
    <div className="sentiment-arc-chart" ref={containerRef}>
      <h3 className="chart-title">Emotional Arc</h3>
      <p className="chart-subtitle">Sentiment per verse · above zero = positive · below = negative</p>

      <svg
        className="arc-svg"
        width={width}
        height={height}
        aria-label="Emotional arc chart"
      >
        <defs>
          {/* Green gradient: full opacity at top, fades to zero at the zero line */}
          <linearGradient id="arc-grad-pos" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#22c55e" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
          </linearGradient>

          {/* Red gradient: invisible at top, deepens toward the bottom */}
          <linearGradient id="arc-grad-neg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#ef4444" stopOpacity="0" />
            <stop offset="100%" stopColor="#ef4444" stopOpacity="0.5" />
          </linearGradient>

          {/* Clip everything above the zero line (positive fill) */}
          <clipPath id="arc-clip-pos">
            <rect x={0} y={0} width={innerW} height={yZero} />
          </clipPath>

          {/* Clip everything below the zero line (negative fill) */}
          <clipPath id="arc-clip-neg">
            <rect x={0} y={yZero} width={innerW} height={innerH - yZero + 1} />
          </clipPath>
        </defs>

        <g transform={`translate(${MARGIN.left},${MARGIN.top})`}>

          {/* Y-axis label */}
          <text
            transform={`translate(-36,${innerH / 2})rotate(-90)`}
            textAnchor="middle"
            className="axis-label"
          >
            sentiment
          </text>

          {/* Positive area fill */}
          <path
            d={areaPath}
            fill="url(#arc-grad-pos)"
            clipPath="url(#arc-clip-pos)"
          />

          {/* Negative area fill */}
          <path
            d={areaPath}
            fill="url(#arc-grad-neg)"
            clipPath="url(#arc-clip-neg)"
          />

          {/* Zero baseline */}
          <line
            x1={0}   y1={yZero}
            x2={innerW} y2={yZero}
            className="zero-line"
          />

          {/* Animated stroke — draws left to right on mount */}
          <path
            ref={pathRef}
            d={linePath}
            fill="none"
            className="arc-stroke"
          />

          {/* Verse dots + axis labels */}
          {data.map((d, i) => {
            const cx = xScale(d.index);
            const cy = yScale(d.score);
            const isPos = d.score >= 0;
            return (
              <g key={i} className="verse-group">
                <circle
                  cx={cx}
                  cy={cy}
                  r={5}
                  className={`arc-dot ${isPos ? 'arc-dot--pos' : 'arc-dot--neg'}`}
                >
                  <title>
                    {`${d.label}: ${isPos ? '+' : ''}${d.score.toFixed(3)}`}
                    {d.words.length ? `\nKey words: ${d.words.slice(0, 4).join(', ')}` : ''}
                  </title>
                </circle>

                {/* Vertical guide to zero */}
                <line
                  x1={cx} y1={cy}
                  x2={cx} y2={yZero}
                  className="verse-guide"
                />

                {/* Verse label below x-axis */}
                <text
                  x={cx}
                  y={innerH + 22}
                  className="verse-label"
                  textAnchor="middle"
                >
                  {d.label}
                </text>
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}
