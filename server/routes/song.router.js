const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// GET /api/song/:albumId — tracks for a given album (no lyrics)
router.get('/:albumId', async (req, res) => {
  const { albumId } = req.params;
  try {
    const { rows } = await pool.query(
      `SELECT id, title, album_id, bpm, time_signature, artist
       FROM tracks
       WHERE album_id = $1
       ORDER BY id`,
      [albumId]
    );
    res.json(rows);
  } catch (err) {
    console.error('Error fetching songs for album:', err);
    res.sendStatus(500);
  }
});

module.exports = router;
