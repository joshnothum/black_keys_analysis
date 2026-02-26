const handleResponse = async (res) => {
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
};

export const getAlbums = () =>
  fetch('/api/lyric/album').then(handleResponse);

export const getTracksByAlbum = (albumId) =>
  fetch(`/api/song/${albumId}`).then(handleResponse);

export const getAnalysis = (trackId) =>
  fetch(`/api/analysis/${trackId}`).then(handleResponse);
