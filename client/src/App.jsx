import { useState, useEffect } from 'react';
import { AlbumList } from './components/AlbumList/AlbumList';
import { TrackList } from './components/TrackList/TrackList';
import { TrackDetail } from './components/TrackDetail/TrackDetail';
import { useTrackAnalysis } from './hooks/useTrackAnalysis';
import { getAlbums, getTracksByAlbum } from './api';
import './App.css';

function App() {
  const [albums, setAlbums] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [selectedAlbumId, setSelectedAlbumId] = useState(null);
  const [selectedTrackId, setSelectedTrackId] = useState(null);

  const { data: analysisData, loading, error } = useTrackAnalysis(selectedTrackId);

  // Load albums on mount
  useEffect(() => {
    getAlbums()
      .then(setAlbums)
      .catch((e) => console.error('Failed to load albums:', e));
  }, []);

  // Load tracks when album changes
  useEffect(() => {
    if (!selectedAlbumId) {
      setTracks([]);
      return;
    }
    getTracksByAlbum(selectedAlbumId)
      .then(setTracks)
      .catch((e) => console.error('Failed to load tracks:', e));
    setSelectedTrackId(null);
  }, [selectedAlbumId]);

  return (
    <div className="app">
      <header className="app-header">
        <div className="logo">
          <span className="logo-icon">♫</span>
          <span className="logo-text">lyric<strong>pulse</strong></span>
        </div>
        <p className="tagline">Song sentiment · word frequency · beat analysis</p>
      </header>

      <div className="app-body">
        {/* Left sidebar */}
        <aside className="sidebar">
          <AlbumList
            albums={albums}
            selectedAlbumId={selectedAlbumId}
            onSelect={(id) => setSelectedAlbumId(id)}
          />
          <TrackList
            tracks={tracks}
            selectedTrackId={selectedTrackId}
            onSelect={(id) => setSelectedTrackId(id)}
          />
        </aside>

        {/* Main visualization panel */}
        <main className="main-panel">
          <TrackDetail
            analysisData={analysisData}
            loading={loading}
            error={error}
          />
        </main>
      </div>
    </div>
  );
}

export default App;
