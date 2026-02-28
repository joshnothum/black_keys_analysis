import { useEffect, useRef, useState } from 'react';
import cloud from 'd3-cloud';
import './WordCloud.css';

const SENTIMENT_COLORS = {
  positive: '#22c55e',
  negative: '#ef4444',
  neutral: '#94a3b8',
};

// Sqrt scale: dampens extremes so common words don't completely dwarf rare ones
function sqrtScale(value, minVal, maxVal, minOut, maxOut) {
  const t = Math.sqrt((value - minVal) / (maxVal - minVal || 1));
  return minOut + t * (maxOut - minOut);
}

export function WordCloud({ wordFrequency }) {
  const [words, setWords] = useState([]);
  const [dims, setDims] = useState({ width: 580, height: 340 });
  const containerRef = useRef(null);

  // Measure container width so the cloud fills its panel
  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver(([entry]) => {
      const w = Math.floor(entry.contentRect.width);
      if (w > 0) setDims({ width: w, height: Math.round(w * 0.55) });
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  // Re-run layout whenever words or container size change
  useEffect(() => {
    if (!wordFrequency?.length) return;

    const counts = wordFrequency.map((w) => w.count);
    const maxCount = Math.max(...counts);
    const minCount = Math.min(...counts);

    cloud()
      .size([dims.width, dims.height])
      .words(
        wordFrequency.map((w) => ({
          text: w.word,
          size: sqrtScale(w.count, minCount, maxCount, 13, 56),
          sentiment: w.sentiment,
          count: w.count,
        }))
      )
      .padding(5)
      .rotate(0) // horizontal only — easier to read
      .font('system-ui, -apple-system, sans-serif')
      .fontSize((d) => d.size)
      .on('end', setWords)
      .start();
  }, [wordFrequency, dims]);

  if (!wordFrequency?.length) {
    return <div className="word-cloud-empty">No word data available</div>;
  }

  return (
    <div className="word-cloud" ref={containerRef}>
      <h3 className="chart-title">Word Frequency</h3>
      <p className="chart-subtitle">
        Size = frequency &nbsp;·&nbsp;
        <span className="legend-pos">■ positive</span>
        &nbsp;
        <span className="legend-neg">■ negative</span>
        &nbsp;
        <span className="legend-neu">■ neutral</span>
      </p>

      <svg
        className="word-cloud-svg"
        width={dims.width}
        height={dims.height}
        aria-label="Word frequency cloud"
      >
        <g transform={`translate(${dims.width / 2},${dims.height / 2})`}>
          {words.map((w, i) => (
            <text
              key={w.text}
              className="cloud-word"
              style={{
                fontSize: `${w.size}px`,
                fill: SENTIMENT_COLORS[w.sentiment] ?? SENTIMENT_COLORS.neutral,
                animationDelay: `${i * 30}ms`,
              }}
              textAnchor="middle"
              transform={`translate(${w.x ?? 0},${w.y ?? 0})rotate(${w.rotate ?? 0})`}
            >
              <title>{w.text}: {w.count}×</title>
              {w.text}
            </text>
          ))}
        </g>
      </svg>
    </div>
  );
}
