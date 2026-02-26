-- ============================================================
-- lyric_pulse migration
-- Run after restoring blackKeys.sql:
--   psql lyricpulse < blackKeys.sql
--   psql lyricpulse < migration.sql
-- ============================================================

-- Add new columns to tracks
ALTER TABLE tracks ADD COLUMN IF NOT EXISTS bpm INTEGER;
ALTER TABLE tracks ADD COLUMN IF NOT EXISTS time_signature VARCHAR(10);
ALTER TABLE tracks ADD COLUMN IF NOT EXISTS artist VARCHAR(120);

-- ============================================================
-- BPM + metadata for existing Attack & Release / Big Come Up songs
-- ============================================================
UPDATE tracks SET bpm = 112, time_signature = '4/4', artist = 'The Black Keys' WHERE id = 1;  -- I'll Be Your Man (Big Come Up)
UPDATE tracks SET bpm = 110, time_signature = '4/4', artist = 'The Black Keys' WHERE id = 2;  -- I Got Mine (A&R)
UPDATE tracks SET bpm = 84,  time_signature = '4/4', artist = 'The Black Keys' WHERE id = 3;  -- Things Ain't Like They Used to Be
UPDATE tracks SET bpm = 100, time_signature = '4/4', artist = 'The Black Keys' WHERE id = 4;  -- Strange Times
UPDATE tracks SET bpm = 104, time_signature = '4/4', artist = 'The Black Keys' WHERE id = 5;  -- Psychotic Girl
UPDATE tracks SET bpm = 70,  time_signature = '4/4', artist = 'The Black Keys' WHERE id = 6;  -- Lies
UPDATE tracks SET bpm = 90,  time_signature = '4/4', artist = 'The Black Keys' WHERE id = 7;  -- Remember When (Side A)
UPDATE tracks SET bpm = 90,  time_signature = '4/4', artist = 'The Black Keys' WHERE id = 8;  -- Remember When (Side B)
UPDATE tracks SET bpm = 120, time_signature = '4/4', artist = 'The Black Keys' WHERE id = 9;  -- Same Old Thing
UPDATE tracks SET bpm = 76,  time_signature = '4/4', artist = 'The Black Keys' WHERE id = 10; -- So He Won't Break
UPDATE tracks SET bpm = 78,  time_signature = '4/4', artist = 'The Black Keys' WHERE id = 11; -- Oceans and Streams

-- ============================================================
-- New songs — El Camino (album_id = 3)
-- ============================================================
INSERT INTO tracks (title, lyrics, album_id, bpm, time_signature, artist) VALUES
(
  'Lonely Boy',
  E'Well I''m so above you\nAnd it''s plain to see\nBut I came to love you anyway\n\nSo you pulled my heart out\nAnd I don''t mind bleeding\nAny old time to keep me waiting\nWaiting\nWaiting\n\nOh oh oh oh\nI got a love that keeps me waiting\nOh oh oh oh\nI got a love that keeps me waiting\nI''m a lonely boy\nI''m a lonely boy\nOh oh oh oh\nI got a love that keeps me waiting\n\nWell your mama kept you\nBut your daddy left you\nAnd I should''ve done you just the same\n\nBut I came to love you anyway\nSo you pulled my heart out\nAnd I don''t mind bleeding\nAny old time to keep me waiting\nWaiting\nWaiting\n\nOh oh oh oh\nI got a love that keeps me waiting\nOh oh oh oh\nI got a love that keeps me waiting\nI''m a lonely boy\nI''m a lonely boy\nOh oh oh oh\nI got a love that keeps me waiting',
  3, 165, '4/4', 'The Black Keys'
),
(
  'Gold on the Ceiling',
  E'I ain''t blind\nJust a matter of time\nBefore you steal it\nIt''s all right\nWe can shadow the lines\nWho''s gonna see it\n\nThey wanna get my\nGold on the ceiling\nI ain''t blind\nJust a matter of time\nThey wanna get my\nGold on the ceiling\nI ain''t blind\nJust a matter of time\n\nIt''s all right\nThis feeling''s getting strong\nBabe there''s no mistaking\nIt''s all right\nI see you walking along\nAnd your hips are shaking\n\nThey wanna get my\nGold on the ceiling\nI ain''t blind\nJust a matter of time\nThey wanna get my\nGold on the ceiling\nI ain''t blind\nJust a matter of time\n\nThey wanna get my\nGold on the ceiling\nI ain''t blind\nJust a matter of time',
  3, 148, '4/4', 'The Black Keys'
),
(
  'Little Black Submarines',
  E'Little black submarines\nOperator please\nPut me back on the line\nTold my girl I''d be back\nOperator please\nThis is wrecking my mind\n\nOh can it be\nThe voices calling me\nThey get lost and out of time\nI should''ve seen it glow\nBut everybody knows\nThat a broken heart is blind\nThat a broken heart is blind\n\nTreasure maps, fallen trees\nOperator please\nCall me back when it''s time\nStolen friends and disease\nOperator please\nPass me back to my mind\n\nOh can it be\nThe voices calling me\nThey get lost and out of time\nI should''ve seen it glow\nBut everybody knows\nThat a broken heart is blind\nThat a broken heart is blind\nThat a broken heart is blind',
  3, 80, '6/8', 'The Black Keys'
),
(
  'Money Maker',
  E'Money maker\nPut your money where your love is baby\nMoney maker\nOoh child come on move it around\n\nOh I can''t stand it\nThe way you move on the dance floor\nBaby you''re so fine\nOoh I gotta have more\n\nMoney maker\nPut your money where your love is baby\nMoney maker\nOoh child come on move it around\n\nOh I can''t stand it\nSee the way that you shimmy and shake\nI gotta tell you girl\nYou got what it takes\n\nMoney maker\nPut your money where your love is baby\nMoney maker\nOoh child come on move it around',
  3, 138, '4/4', 'The Black Keys'
),
(
  'Dead and Gone',
  E'You''re dead and gone\nYou''re dead and gone\nWell it''s been so long\nI''m moving on\n\nYou''re dead and gone\nYou''re dead and gone\nWell it''s been so long\nI''m moving on\n\nAnd I know\nAnd I know\nAnd I know\nThat you left me far behind\n\nAnd I know\nAnd I know\nAnd I know\nNow I''ll have to do fine\n\nYou''re dead and gone\nYou''re dead and gone\nWell it''s been so long\nI''m moving on',
  3, 95, '4/4', 'The Black Keys'
);

-- ============================================================
-- New songs — Brothers (album_id = 6)
-- ============================================================
INSERT INTO tracks (title, lyrics, album_id, bpm, time_signature, artist) VALUES
(
  'Tighten Up',
  E'I wanted love\nI needed love\nMost of all\nMost of all\n\nSomeone said true love was dead\nAnd I''m bound to fall\nBound to fall for you\nOh what can I do\n\nTake it with the love you give\nWell I''m holding on\nHolding on\nHolding on\n\nAin''t no way to fight it\nWhen she turns on the light\nIt''s all right\n\nI wanted love\nI needed love\nMost of all\nMost of all\n\nHer tight dress and her pretty face\nShaking everything loose\nEverything loose\n\nTake it with the love you give\nWell I''m holding on\nHolding on\nHolding on\n\nAin''t no way to fight it\nWhen she turns on the light\nIt''s all right',
  6, 113, '4/4', 'The Black Keys'
),
(
  'Howlin'' for You',
  E'A little bit of love\nIs all we''re asking for\nA little bit of love\nI tell you\nA little bit of love is all I need\n\nI see those city lights\nThey shine just like a diamond ring\nI think of you tonight\nAnd I want to be your everything\n\nHowlin'' for you\nHowlin'' for you\nHowlin'' for you\n\nA little bit of love\nIs all we''re asking for\nA little bit of love\nI tell you\nA little bit of love is all I need\n\nYou look so beautiful\nStanding there alone in the rain\nThink of all the times\nThat I tried to ease your pain\n\nHowlin'' for you\nHowlin'' for you\nHowlin'' for you',
  6, 142, '4/4', 'The Black Keys'
),
(
  'She''s Long Gone',
  E'Well I walked into town\nWith the blues in my soul\nWalked into town\nWith the blues in my soul\nLooked for my baby\nBut she''s long gone\n\nWell I fell in love\nWith the prettiest girl\nFell in love with her\nAll over the world\nShe done left me baby\nShe''s long gone\n\nWell I tried and I tried\nBut she wouldn''t stay\nTried and I tried\nBut she went away\nLooking for my baby\nBut she''s long gone\n\nWell she walked out the door\nNever said goodbye\nWalked out that door\nDidn''t even say why\nLooking for my baby\nBut she''s long gone',
  6, 108, '4/4', 'The Black Keys'
),
(
  'The Only One',
  E'I know I''ve been mistaken\nBut just give me a break\nI''ve been blind and shaken\nI am the only one\n\nOh I''ve been down this road before\nWith troubles by the score\nI never asked for more\nI am the only one\n\nWhen I close my eyes\nI see your smiling face\nAnd I realize\nYou''re still the one\n\nI know I''ve been mistaken\nBut just give me a break\nI''ve been blind and shaken\nI am the only one\n\nOh I''ve been down this road before\nWith troubles by the score\nI never asked for more\nI am the only one',
  6, 88, '4/4', 'The Black Keys'
),
(
  'Ten Cent Pistol',
  E'Sweet Anna Lee\nShe was a beauty queen\nTook Johnny''s cash\nAnd she cut him clean\n\nShe burned down the farmhouse\nWhere Johnny had been\nAnd the fire caught the neighbors\nAnd the cattle and the barn\n\nOoh a jealous heart is a jealous heart\nAnd when it falls apart\nLord it falls apart\n\nWell the sheriff came by\nWith his deputies\nLooked at the ashes\nAnd went down on his knees\n\nSaid Anna Lee girl\nYou''re under arrest\nFor the ten cent pistol\nYou stuck in his chest',
  6, 98, '4/4', 'The Black Keys'
);

-- ============================================================
-- Confirm final track count
-- ============================================================
SELECT COUNT(*) AS total_tracks FROM tracks;
SELECT id, title, bpm, time_signature, artist, album_id FROM tracks ORDER BY album_id, id;
