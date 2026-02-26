const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// GET /api/lyric/track — all tracks (no lyrics payload, just metadata)
router.get('/track', async (req, res) => {
  try {
    const { rows } = await pool.query(
      'SELECT id, title, album_id, bpm, time_signature, artist FROM tracks ORDER BY album_id, id'
    );
    res.json(rows);
  } catch (err) {
    console.error('Error fetching tracks:', err);
    res.sendStatus(500);
  }
});

// GET /api/lyric/album — all albums
router.get('/album', async (req, res) => {
  try {
    const { rows } = await pool.query(
      'SELECT * FROM album ORDER BY year'
    );
    res.json(rows);
  } catch (err) {
    console.error('Error fetching albums:', err);
    res.sendStatus(500);
  }
});

module.exports = router;
