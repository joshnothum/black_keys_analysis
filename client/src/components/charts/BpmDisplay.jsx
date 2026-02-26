import './BpmDisplay.css';

export function BpmDisplay({ track }) {
  const { title, artist, bpm, time_signature, overallSentiment } = track;

  // Sentiment label + color
  const score = overallSentiment?.comparative ?? 0;
  let sentimentLabel = 'Neutral';
  let sentimentClass = 'neutral';
  if (score > 0.05) { sentimentLabel = 'Positive'; sentimentClass = 'positive'; }
  else if (score < -0.05) { sentimentLabel = 'Negative'; sentimentClass = 'negative'; }

  // BPM feel
  const bpmFeel = bpm >= 140
    ? 'Fast'
    : bpm >= 110
    ? 'Upbeat'
    : bpm >= 80
    ? 'Moderate'
    : 'Slow';

  return (
    <div className="bpm-display">
      <div className="track-header">
        <div className="track-name-block">
          <h2 className="track-name">{title}</h2>
          <span className="track-artist">{artist}</span>
        </div>
        <div className="track-badges">
          <div className="badge bpm-big">
            <span className="badge-value">{bpm}</span>
            <span className="badge-label">BPM · {bpmFeel}</span>
          </div>
          <div className="badge time-sig">
            <span className="badge-value">{time_signature}</span>
            <span className="badge-label">Time Sig</span>
          </div>
          <div className={`badge sentiment-badge ${sentimentClass}`}>
            <span className="badge-value">{sentimentLabel}</span>
            <span className="badge-label">
              score {overallSentiment?.score >= 0 ? '+' : ''}{overallSentiment?.score}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
