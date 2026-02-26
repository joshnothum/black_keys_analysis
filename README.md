# lyric pulse

Song sentiment, word frequency, and beat analysis — visualized.

Select an album, pick a track, and see its emotional arc verse by verse, the most frequent words color-coded by sentiment, and beat metadata at a glance.

---

## Stack

| Layer | Tech |
|-------|------|
| Frontend | React 18 + Vite |
| Charts | Chart.js 4 via react-chartjs-2 |
| Backend | Node.js + Express 4 |
| Database | PostgreSQL (via pg v8) |
| Sentiment | [sentiment](https://github.com/thisandagain/sentiment) (AFINN-based) |

---

## Features

- **Emotional Arc** — Line chart showing sentiment score per verse (positive ↑ / negative ↓)
- **Word Frequency** — Horizontal bar chart of the top 20 words, colored green (positive), red (negative), or gray (neutral)
- **Beat Info** — BPM, time signature, and overall sentiment score badge per track
- **21 songs** across Attack & Release, The Big Come Up, El Camino, and Brothers

---

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL 14+

### Database setup

```bash
createdb lyricpulse
psql lyricpulse < blackKeys.sql
psql lyricpulse < migration.sql
```

### Environment

Create a `.env` file at the project root:

```
PORT=3001
DATABASE_URL=postgresql://YOUR_USER@localhost:5432/lyricpulse
```

### Install & run (development)

```bash
# Install server deps
cd server && npm install

# Install client deps
cd ../client && npm install

# Terminal 1 — API server (port 3001)
cd server && npm run dev

# Terminal 2 — Vite dev server (port 3000, proxies /api to 3001)
cd client && npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production build

```bash
cd client && npm run build   # outputs to client/dist/
cd ../server && npm start    # serves React build + API on port 3001
```

---

## Project Structure

```
lyric_pulse/
├── server/
│   ├── server.js                  # Express entry point
│   ├── modules/pool.js            # PostgreSQL connection
│   └── routes/
│       ├── lyric.router.js        # GET /api/lyric/album, /api/lyric/track
│       ├── song.router.js         # GET /api/song/:albumId
│       └── analysis.router.js    # GET /api/analysis/:trackId
├── client/
│   └── src/
│       ├── App.jsx                # Root state + layout
│       ├── api/index.js           # Fetch helpers
│       ├── hooks/useTrackAnalysis.js
│       └── components/
│           ├── AlbumList/
│           ├── TrackList/
│           ├── TrackDetail/
│           └── charts/
│               ├── BpmDisplay.jsx
│               ├── SentimentArcChart.jsx
│               └── WordFrequencyChart.jsx
├── blackKeys.sql                  # Original schema + seed data
└── migration.sql                  # Adds bpm, time_signature, artist + new songs
```

---

## Roadmap

- [ ] D3.js or p5.js visualization layer
- [ ] Song search / filter
- [ ] Multi-artist support
- [ ] Audio beat detection integration
- [ ] Verse-level lyric display alongside chart

---

## Authors

- Josh Nothum
