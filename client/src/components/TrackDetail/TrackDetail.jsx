import { BpmDisplay } from '../charts/BpmDisplay';
import { SentimentArcChart } from '../charts/SentimentArcChart';
import { WordCloud } from '../charts/WordCloud';
import './TrackDetail.css';

export function TrackDetail({ analysisData, loading, error }) {
  if (loading) {
    return (
      <div className="track-detail-empty">
        <div className="spinner" />
        <p>Analyzing track...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="track-detail-empty error">
        <p>⚠ Could not load analysis: {error}</p>
      </div>
    );
  }

  if (!analysisData) {
    return (
      <div className="track-detail-empty">
        <div className="empty-icon">♪</div>
        <p className="empty-msg">Select a track to see its analysis</p>
        <p className="empty-sub">Sentiment · Word Frequency · Beat</p>
      </div>
    );
  }

  const { track, overallSentiment, verses, wordFrequency } = analysisData;

  return (
    <div className="track-detail">
      <BpmDisplay track={{ ...track, overallSentiment }} />
      <SentimentArcChart verses={verses} />
      <WordCloud wordFrequency={wordFrequency} />
    </div>
  );
}
