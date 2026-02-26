require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const express = require('express');
const path = require('path');

const lyricRouter   = require('./routes/lyric.router');
const songRouter    = require('./routes/song.router');
const analysisRouter = require('./routes/analysis.router');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Serve React build in production
app.use(express.static(path.join(__dirname, '../client/dist')));

// API routes
app.use('/api/lyric',    lyricRouter);
app.use('/api/song',     songRouter);
app.use('/api/analysis', analysisRouter);

// React catch-all — must be last
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`🎵 Lyric Pulse running on port ${PORT}`);
});
