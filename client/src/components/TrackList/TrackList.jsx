import './TrackList.css';

export function TrackList({ tracks, selectedTrackId, onSelect }) {
  if (!tracks.length) {
    return (
      <div className="track-list">
        <h2 className="section-label">Tracks</h2>
        <p className="empty-msg">Select an album to see tracks</p>
      </div>
    );
  }

  return (
    <div className="track-list">
      <h2 className="section-label">Tracks</h2>
      <ul className="track-items">
        {tracks.map((track) => (
          <li key={track.id}>
            <button
              className={`track-item ${selectedTrackId === track.id ? 'selected' : ''}`}
              onClick={() => onSelect(track.id)}
            >
              <span className="track-title">{track.title}</span>
              <div className="track-meta">
                {track.bpm && (
                  <span className="bpm-badge">{track.bpm} BPM</span>
                )}
                {track.time_signature && (
                  <span className="time-badge">{track.time_signature}</span>
                )}
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
