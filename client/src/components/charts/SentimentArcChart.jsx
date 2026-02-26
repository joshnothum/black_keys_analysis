import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import './SentimentArcChart.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export function SentimentArcChart({ verses }) {
  if (!verses || verses.length === 0) {
    return <div className="chart-empty">No verse data available</div>;
  }

  const labels = verses.map((_, i) => `Verse ${i + 1}`);
  const values = verses.map((v) => parseFloat(v.sentiment.comparative.toFixed(3)));

  // Split into positive/negative fill datasets for the green/red visual
  const positiveData = values.map((v) => (v >= 0 ? v : 0));
  const negativeData = values.map((v) => (v < 0 ? v : 0));

  const data = {
    labels,
    datasets: [
      {
        label: 'Positive',
        data: positiveData,
        borderColor: '#22c55e',
        backgroundColor: 'rgba(34, 197, 94, 0.15)',
        fill: true,
        tension: 0.3,
        pointBackgroundColor: positiveData.map((v) =>
          v > 0 ? '#22c55e' : 'transparent'
        ),
        pointRadius: 5,
        pointHoverRadius: 7,
      },
      {
        label: 'Negative',
        data: negativeData,
        borderColor: '#ef4444',
        backgroundColor: 'rgba(239, 68, 68, 0.15)',
        fill: true,
        tension: 0.3,
        pointBackgroundColor: negativeData.map((v) =>
          v < 0 ? '#ef4444' : 'transparent'
        ),
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        display: true,
        labels: {
          color: 'var(--text-muted)',
          font: { size: 11 },
          boxWidth: 12,
        },
      },
      tooltip: {
        callbacks: {
          label: (ctx) => {
            const v = ctx.dataset.data[ctx.dataIndex];
            if (v === 0) return null;
            const verse = verses[ctx.dataIndex];
            return [
              `Score: ${v > 0 ? '+' : ''}${v}`,
              `Words: ${verse.sentiment.words?.join(', ') || '—'}`,
            ];
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
        ticks: { color: 'var(--text-muted)', font: { size: 11 } },
        grid: { color: 'var(--border)' },
        suggestedMin: -0.5,
        suggestedMax: 0.5,
      },
    },
  };

  return (
    <div className="sentiment-arc-chart">
      <h3 className="chart-title">Emotional Arc</h3>
      <p className="chart-subtitle">Sentiment score per verse (positive ↑ / negative ↓)</p>
      <div className="chart-wrap">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}
