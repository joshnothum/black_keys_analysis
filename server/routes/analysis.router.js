const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const Sentiment = require('sentiment');

const sentiment = new Sentiment();

// Stop words to exclude from word frequency
const STOP_WORDS = new Set([
  'i', 'a', 'an', 'the', 'and', 'to', 'of', 'in', 'it', 'is', 'was',
  'you', 'my', 'me', 'we', 'he', 'she', 'on', 'at', 'by', 'be', 'or',
  'if', 'but', 'so', 'up', 'do', 'no', 'oh', 'all', 'as', 'not', 'for',
  'are', 'this', 'that', 'with', 'his', 'her', 'its', 'had', 'have',
  'from', 'they', 'will', 'been', 'your', 'just', 'out', 'get', 'got',
  'him', 'she', 'now', 'can', 'did', 'let', 'how', 'who', 'when', 'said',
  'than', 'then', 'like', 'what', 'more', 'back', 'off', 'into',
]);

/**
 * Split a lyric string into verse blocks.
 * Handles \n\n, \r\n\r\n, and mixed line endings.
 */
function parseLyricsIntoVerses(lyricsStr) {
  return lyricsStr
    .split(/(?:\r?\n){2,}/)
    .map((v) => v.trim())
    .filter((v) => v.length > 0);
}

/**
 * Build a word frequency list from lyrics, tagged with sentiment.
 * Returns top N words sorted by frequency.
 */
function buildWordFrequency(lyricsStr, overallResult, topN = 25) {
  const positiveSet = new Set(overallResult.positive.map((w) => w.toLowerCase()));
  const negativeSet = new Set(overallResult.negative.map((w) => w.toLowerCase()));

  const freq = {};
  const words = lyricsStr
    .toLowerCase()
    .replace(/[^a-z\s]/g, '')
    .split(/\s+/);

  for (const word of words) {
    if (!STOP_WORDS.has(word) && word.length > 2) {
      freq[word] = (freq[word] || 0) + 1;
    }
  }

  return Object.entries(freq)
    .sort(([, a], [, b]) => b - a)
    .slice(0, topN)
    .map(([word, count]) => ({
      word,
      count,
      sentiment: positiveSet.has(word)
        ? 'positive'
        : negativeSet.has(word)
        ? 'negative'
        : 'neutral',
    }));
}

// GET /api/analysis/:trackId
router.get('/:trackId', async (req, res) => {
  const { trackId } = req.params;

  try {
    const { rows } = await pool.query(
      'SELECT * FROM tracks WHERE id = $1',
      [trackId]
    );

    if (!rows.length) {
      return res.status(404).json({ error: 'Track not found' });
    }

    const track = rows[0];

    // lyrics column is json type — pg returns it already parsed.
    // It's stored as a JSON string value, so it comes back as a JS string.
    const lyricsStr = typeof track.lyrics === 'string'
      ? track.lyrics
      : JSON.stringify(track.lyrics);

    // Overall sentiment analysis
    const overall = sentiment.analyze(lyricsStr);

    // Per-verse sentiment
    const verses = parseLyricsIntoVerses(lyricsStr).map((text, index) => ({
      index,
      text,
      sentiment: sentiment.analyze(text),
    }));

    // Word frequency with sentiment tagging
    const wordFrequency = buildWordFrequency(lyricsStr, overall);

    res.json({
      track: {
        id: track.id,
        title: track.title,
        bpm: track.bpm,
        time_signature: track.time_signature,
        artist: track.artist || 'The Black Keys',
        album_id: track.album_id,
      },
      overallSentiment: {
        score: overall.score,
        comparative: overall.comparative,
        positive: overall.positive,
        negative: overall.negative,
      },
      verses,
      wordFrequency,
    });
  } catch (err) {
    console.error('Analysis error for track', trackId, ':', err);
    res.sendStatus(500);
  }
});

module.exports = router;
