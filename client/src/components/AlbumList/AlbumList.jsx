import './AlbumList.css';

export function AlbumList({ albums, selectedAlbumId, onSelect }) {
  return (
    <div className="album-list">
      <h2 className="section-label">Albums</h2>
      <div className="album-grid">
        {albums.map((album) => (
          <button
            key={album.id}
            className={`album-card ${selectedAlbumId === album.id ? 'selected' : ''}`}
            onClick={() => onSelect(album.id)}
            title={`${album.title} (${album.year})`}
          >
            <img
              src={album.album_art}
              alt={album.title}
              className="album-art"
              onError={(e) => {
                e.target.src = 'https://placehold.co/120x120/1a1a2e/ffffff?text=♪';
              }}
            />
            <div className="album-info">
              <span className="album-title">{album.title}</span>
              <span className="album-year">{album.year}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
