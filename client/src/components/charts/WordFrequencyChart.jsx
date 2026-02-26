import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import './WordFrequencyChart.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SENTIMENT_COLORS = {
  positive: 'rgba(34, 197, 94, 0.75)',
  negative: 'rgba(239, 68, 68, 0.75)',
  neutral: 'rgba(148, 163, 184, 0.55)',
};

const SENTIMENT_BORDER = {
  positive: 'rgba(34, 197, 94, 1)',
  negative: 'rgba(239, 68, 68, 1)',
  neutral: 'rgba(148, 163, 184, 0.8)',
};

export function WordFrequencyChart({ wordFrequency }) {
  if (!wordFrequency || wordFrequency.length === 0) {
    return <div className="chart-empty">No word data available</div>;
  }

  // Show top 20 words
  const words = wordFrequency.slice(0, 20);

  const data = {
    labels: words.map((w) => w.word),
    datasets: [
      {
        label: 'Occurrences',
        data: words.map((w) => w.count),
        backgroundColor: words.map((w) => SENTIMENT_COLORS[w.sentiment]),
        borderColor: words.map((w) => SENTIMENT_BORDER[w.sentiment]),
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  };

  const options = {
    indexAxis: 'y', // horizontal bars — word labels on Y axis
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => {
            const word = words[ctx.dataIndex];
            const sentimentMap = { positive: '✓ positive', negative: '✗ negative', neutral: '— neutral' };
            return [`Count: ${ctx.raw}`, sentimentMap[word.sentiment]];
          },
        },
      },
    },
    scales: {
      x: {
        ticks: { color: 'var(--text-muted)', font: { size: 11 } },
        grid: { color: 'var(--border)' },
      },
      y: {
        ticks: {
          color: 'var(--text-primary)',
          font: { size: 12, weight: '500' },
        },
        grid: { display: false },
      },
    },
  };

  return (
    <div className="word-freq-chart">
      <h3 className="chart-title">Word Frequency</h3>
      <div className="chart-legend">
        <span className="legend-item positive">■ Positive</span>
        <span className="legend-item negative">■ Negative</span>
        <span className="legend-item neutral">■ Neutral</span>
      </div>
      <div className="chart-wrap" style={{ height: `${Math.max(180, words.length * 26)}px` }}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}
