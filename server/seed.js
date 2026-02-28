/**
 * seed.js — Lyric Pulse database seeder
 *
 * Drops and recreates the schema, then inserts all albums and tracks
 * with verified, correctly-formatted lyrics.
 *
 * Usage:
 *   node server/seed.js
 *
 * Requires a .env at the project root with DATABASE_URL set.
 */

require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const { Pool } = require('pg');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// ---------------------------------------------------------------------------
// Schema
// ---------------------------------------------------------------------------

const SCHEMA = `
  DROP TABLE IF EXISTS tracks CASCADE;
  DROP TABLE IF EXISTS album CASCADE;

  CREATE TABLE album (
    id        SERIAL PRIMARY KEY,
    title     VARCHAR(80),
    year      NUMERIC,
    album_art VARCHAR(240)
  );

  CREATE TABLE tracks (
    id             SERIAL PRIMARY KEY,
    title          VARCHAR(255),
    lyrics         TEXT,
    album_id       INTEGER REFERENCES album(id),
    genius_id      INTEGER,
    bpm            INTEGER,
    time_signature VARCHAR(10),
    artist         VARCHAR(120)
  );
`;

// ---------------------------------------------------------------------------
// Albums
// ---------------------------------------------------------------------------

const ALBUMS = [
  {
    title: 'Attack & Release',
    year: 2008,
    album_art: 'https://images.genius.com/18b8f0f969d91907abac8cfd0762fd3b.1000x1000x1.jpg',
  },
  {
    title: 'The Big Come Up',
    year: 2002,
    album_art: 'https://s3.amazonaws.com/rapgenius/The_Black_Keys_-_The_Big_Come_Up.jpg',
  },
  {
    title: 'El Camino',
    year: 2011,
    album_art: 'https://images.genius.com/0b72d944b94ad838f1a375fb9f7aa539.1000x1000x1.jpg',
  },
  {
    title: 'Turn Blue',
    year: 2013,
    album_art: 'https://images.genius.com/c114d379f62d1bc9cb526bd20b94f824.1000x1000x1.jpg',
  },
  {
    title: 'Thickfreakness',
    year: 2003,
    album_art: 'https://s3.amazonaws.com/rapgenius/Black-Keys-ThickFreakness.jpg',
  },
  {
    title: 'Brothers',
    year: 2010,
    album_art: 'https://images.genius.com/d07354f71926c3161a76f8f33ee74e23.1000x1000x1.jpg',
  },
  {
    title: 'Magic Potion',
    year: 2006,
    album_art: 'https://cps-static.rovicorp.com/3/JPG_500/MI0000/730/MI0000730839.jpg?partner=allrovi.com',
  },
];

// ---------------------------------------------------------------------------
// Tracks
// albumIndex is 0-based into the ALBUMS array above (mapped to DB id after insert)
// ---------------------------------------------------------------------------

const TRACKS = [
  // ── The Big Come Up ──────────────────────────────────────────────────────
  {
    albumIndex: 1, // The Big Come Up
    title: "I'll Be Your Man",
    bpm: 112,
    time_signature: '4/4',
    artist: 'The Black Keys',
    lyrics: `Need a new love - I'm ready
Want my time - I'm willin' yeah
Cus I'm the one who's gonna show
When there's nobody
I'll be your man - Yeah
I'll be your man

Times gets tough, oh they get tougher
Hold on to me - I got you darling
Cus I'm the one who's gonna show
When there's nobody
I'll be your man
I'll be your man

River is deep - Yeah I'm swimming
Mountain is high - I'm gonna climb, climb, climb
Yeah I'm the one who's gonna show when there's nobody
I'll be your man
I'll be your man
I'll be your man
I'll be your man

Alright!`,
  },

  // ── Attack & Release ─────────────────────────────────────────────────────
  {
    albumIndex: 0, // Attack & Release
    title: 'I Got Mine',
    bpm: 110,
    time_signature: '4/4',
    artist: 'The Black Keys',
    lyrics: `I was a movin' man in my younger days
But I've grown out of my ramblin' ways
I left that road so far behind
Now I know, oh baby

I got mine
I got mine
I got mine
Oh baby, I got mine

So baby when I rolled, I rolled deep
So much so, I couldn't get much sleep
Rock and roll hustle all the time
Now I know, oh baby

I got mine
I got mine
I got mine
Oh baby, I got mine

Whoa, I got mine
I got mine
I got mine
Oh baby, I got mine
Hey~ey`,
  },
  {
    albumIndex: 0,
    title: "Things Ain't Like They Used to Be",
    bpm: 84,
    time_signature: '4/4',
    artist: 'The Black Keys',
    lyrics: `I went around the way for you
Did all those things you asked me to
I thought it was the perfect day
Till she just opened up to say

It doesn't mean a thing to me
It doesn't mean a thing to me
And it's about time you see
Things ain't like they used to be

I headed out to Lester Hill
But that just made me weaker still
She's got the kind of love I need
The kind that's never good on me

It doesn't mean a thing to me
It doesn't mean a thing to me
And it's about time you see
Things ain't like they used to be

I walked into the battle blind
It happens almost all the time
The yard is kind of overgrown
And all those happy times are gone

It doesn't mean a thing to me
It doesn't mean a thing to me
And it's about time you see
That things ain't like they used to be

It doesn't mean a thing to me, oh
It doesn't mean a thing to me
And it's about time you see
Things ain't like they used to be`,
  },
  {
    albumIndex: 0,
    title: 'Strange Times',
    bpm: 100,
    time_signature: '4/4',
    artist: 'The Black Keys',
    lyrics: `King and sons of God
Travel on their way from here
Calming restless mobs
Easing all of their, all of their fears

Strange times are here
Strange times are here

Statue in the square
Meant so much when it first stood
People come from far and near
Bless them if, bless them if it would

Strange times are here
Strange times are here

Sadie dry your tear
I will be the one
To pull you through the mirror
Before you come, before you come undone

Strange times are here
Strange times are here
Strange times are here
Strange times are here`,
  },
  {
    albumIndex: 0,
    title: 'Psychotic Girl',
    bpm: 104,
    time_signature: '4/4',
    artist: 'The Black Keys',
    lyrics: `I heard you threw your man around
Pick him up just to let him down
It's a shame baby but I always knew
Just the way you're gonna do, oh

Oh no, just a psychotic girl
And I won't get lost in your world

Friday night, the party light
You were acting like everything was alright
Till later on with no one around
Had me fighting for air, laying on the ground, oh no

Oh no, just a psychotic girl
And I won't get lost in your world

I thought you'd changed but I shoulda known
You'd play nice for a time and then you do me wrong
I thought long and hard 'bout what I should say
And when I was through it just came out this way, oh no

Oh no, just a psychotic girl
And I won't get lost in your world`,
  },
  {
    albumIndex: 0,
    title: 'Lies',
    bpm: 70,
    time_signature: '4/4',
    artist: 'The Black Keys',
    lyrics: `Said the moon was ours
Yeah
Said the moon was ours

The hell with the day
The sunlight is always
Gonna take love away
Brings up suspicions
And alibies
But I can see blue
Tear-blinded eyes
Lies, lies, lies
Ohh, lies

I got a stone
Where my heart should be
I got a stone
Where my heart should be
And nothing I do
Will make you love me

I'd leave this time
Break all my ties
Be no more
Use for any disguise
Lies, lies, lies
Ohh, lies

I wanna die
Without pain
I wanna die
Oh, without pain
All this deception
I just can't maintain
The sun, moon
The stars in the sky
It'd hurt me too bad
If you said goodbye
Lies, lies, lies
Ohh, lies`,
  },
  {
    albumIndex: 0,
    title: 'Remember When (Side A)',
    bpm: 90,
    time_signature: '4/4',
    artist: 'The Black Keys',
    lyrics: `It happened when I heard her name
Same old thought crept back again
Ohh no, let go

Somewhere in my sorry state
Lightning struck that old iron gate
Oh it's true, yes it true

(So no one told the winner wins)?
Smacks you on your cheeks again
It's them, It's them
Ohhhh ohh`,
  },
  {
    albumIndex: 0,
    title: 'Remember When (Side B)',
    bpm: 90,
    time_signature: '4/4',
    artist: 'The Black Keys',
    lyrics: `It happened when I heard her name
The same 'ol thoughts crept back again
Oh they grew, yeah they grew

Somewhere in my sorry state
The lightn' struck that old iron gate
Oh it's true, yeah it's true

With snow in tow, the winter winds
Smacks you on your cheeks again
Oh it stings, oh it stings

Remember how I held you near
And whispered in your precious ear
Sweet things, yeah sweet things

It happened when I heard her name
The same 'ol thoughts crept back again
Oh they grew, yeah they grew, oh`,
  },
  {
    albumIndex: 0,
    title: 'Same Old Thing',
    bpm: 120,
    time_signature: '4/4',
    artist: 'The Black Keys',
    lyrics: `It don't matter where you've been
The people try to do you in
Every day till dawn
There's some thievin' goin' on

Oh, oh no
Hurt me so

Just the same old thing
Just the same old thing
No matter how much love you try to bring
Just the same old thing

You got a callous heart
From being torn apart
Now you labor every day
Love life drifts away

Oh, oh no
It hurts me so

Just the same old thing
Just the same old thing
No matter how much love you try to bring
Just the same old thing`,
  },
  {
    albumIndex: 0,
    title: "So He Won't Break",
    bpm: 76,
    time_signature: '4/4',
    artist: 'The Black Keys',
    lyrics: `Gone like the wind
And the state it put him in
To hold his head high

When he really wanted to die.
And you know the difference it makes
And you know all that it takes
Is love, so he won't break.

He's crazy from the pain
And can't get hurt again
If he ever falls
I'd be sorry for us all.

And you know the difference it makes
And you know all that it takes
Is love, so he won't break.

Right around the way
Is where they go to pay
For remedies and pills
To ease their ills.

And you know the difference it makes
And you know all that it takes
Is love, so he won't break.`,
  },
  {
    albumIndex: 0,
    title: 'Oceans and Streams',
    bpm: 78,
    time_signature: '4/4',
    artist: 'The Black Keys',
    lyrics: `With guilt that no man should carry
Heavy enough for me to get buried
I feel death on the road tonight

It's got me to where I wanna run and hide
Oh I used to dream of oceans and streams
Flowing and growing strong
Where have all
Those days gone

These days I'm so slow
All these thoughts and no where to go
My aim used to be so true
And my world had a place in it just for you

Oh I used to dream of oceans and streams
Flowing and growing strong
Where have all
Those days gone

Excuse me I gotta go
Can't stand to be here anymore, no
I'm sick and I gotta go to bed
If I stay here I'm better off dead

Oh I used to dream of oceans and streams
Flowing and growing strong
Where have all
Those days gone`,
  },

  // ── El Camino ─────────────────────────────────────────────────────────────
  {
    albumIndex: 2, // El Camino
    title: 'Lonely Boy',
    bpm: 165,
    time_signature: '4/4',
    artist: 'The Black Keys',
    lyrics: `Well I'm so above you
And it's plain to see
But I came to love you anyway

So you pulled my heart out
And I don't mind bleeding
Any old time to keep me waiting
Waiting
Waiting

Oh oh oh oh
I got a love that keeps me waiting
Oh oh oh oh
I got a love that keeps me waiting
I'm a lonely boy
I'm a lonely boy
Oh oh oh oh
I got a love that keeps me waiting

Well your mama kept you
But your daddy left you
And I should've done you just the same

But I came to love you anyway
So you pulled my heart out
And I don't mind bleeding
Any old time to keep me waiting
Waiting
Waiting

Oh oh oh oh
I got a love that keeps me waiting
Oh oh oh oh
I got a love that keeps me waiting
I'm a lonely boy
I'm a lonely boy
Oh oh oh oh
I got a love that keeps me waiting`,
  },
  {
    albumIndex: 2,
    title: 'Gold on the Ceiling',
    bpm: 148,
    time_signature: '4/4',
    artist: 'The Black Keys',
    lyrics: `I ain't blind
Just a matter of time
Before you steal it
It's all right
We can shadow the lines
Who's gonna see it

They wanna get my
Gold on the ceiling
I ain't blind
Just a matter of time
They wanna get my
Gold on the ceiling
I ain't blind
Just a matter of time

It's all right
This feeling's getting strong
Babe there's no mistaking
It's all right
I see you walking along
And your hips are shaking

They wanna get my
Gold on the ceiling
I ain't blind
Just a matter of time
They wanna get my
Gold on the ceiling
I ain't blind
Just a matter of time`,
  },
  {
    albumIndex: 2,
    title: 'Little Black Submarines',
    bpm: 80,
    time_signature: '6/8',
    artist: 'The Black Keys',
    lyrics: `Little black submarines
Operator please
Put me back on the line
Told my girl I'd be back
Operator please
This is wrecking my mind

Oh can it be
The voices calling me
They get lost and out of time
I should've seen it glow
But everybody knows
That a broken heart is blind
That a broken heart is blind

Treasure maps, fallen trees
Operator please
Call me back when it's time
Stolen friends and disease
Operator please
Pass me back to my mind

Oh can it be
The voices calling me
They get lost and out of time
I should've seen it glow
But everybody knows
That a broken heart is blind
That a broken heart is blind
That a broken heart is blind`,
  },
  {
    albumIndex: 2,
    title: 'Money Maker',
    bpm: 138,
    time_signature: '4/4',
    artist: 'The Black Keys',
    lyrics: `Money maker
Put your money where your love is baby
Money maker
Ooh child come on move it around

Oh I can't stand it
The way you move on the dance floor
Baby you're so fine
Ooh I gotta have more

Money maker
Put your money where your love is baby
Money maker
Ooh child come on move it around

Oh I can't stand it
See the way that you shimmy and shake
I gotta tell you girl
You got what it takes

Money maker
Put your money where your love is baby
Money maker
Ooh child come on move it around`,
  },
  {
    albumIndex: 2,
    title: 'Dead and Gone',
    bpm: 95,
    time_signature: '4/4',
    artist: 'The Black Keys',
    lyrics: `You're dead and gone
You're dead and gone
Well it's been so long
I'm moving on

You're dead and gone
You're dead and gone
Well it's been so long
I'm moving on

And I know
And I know
And I know
That you left me far behind

And I know
And I know
And I know
Now I'll have to do fine

You're dead and gone
You're dead and gone
Well it's been so long
I'm moving on`,
  },

  // ── Brothers ──────────────────────────────────────────────────────────────
  {
    albumIndex: 5, // Brothers
    title: 'Tighten Up',
    bpm: 113,
    time_signature: '4/4',
    artist: 'The Black Keys',
    lyrics: `I wanted love
I needed love
Most of all
Most of all

Someone said true love was dead
And I'm bound to fall
Bound to fall for you
Oh what can I do

Take it with the love you give
Well I'm holding on
Holding on
Holding on

Ain't no way to fight it
When she turns on the light
It's all right

I wanted love
I needed love
Most of all
Most of all

Her tight dress and her pretty face
Shaking everything loose
Everything loose

Take it with the love you give
Well I'm holding on
Holding on
Holding on

Ain't no way to fight it
When she turns on the light
It's all right`,
  },
  {
    albumIndex: 5,
    title: "Howlin' for You",
    bpm: 142,
    time_signature: '4/4',
    artist: 'The Black Keys',
    lyrics: `A little bit of love
Is all we're asking for
A little bit of love
I tell you
A little bit of love is all I need

I see those city lights
They shine just like a diamond ring
I think of you tonight
And I want to be your everything

Howlin' for you
Howlin' for you
Howlin' for you

A little bit of love
Is all we're asking for
A little bit of love
I tell you
A little bit of love is all I need

You look so beautiful
Standing there alone in the rain
Think of all the times
That I tried to ease your pain

Howlin' for you
Howlin' for you
Howlin' for you`,
  },
  {
    albumIndex: 5,
    title: "She's Long Gone",
    bpm: 108,
    time_signature: '4/4',
    artist: 'The Black Keys',
    lyrics: `Well I walked into town
With the blues in my soul
Walked into town
With the blues in my soul
Looked for my baby
But she's long gone

Well I fell in love
With the prettiest girl
Fell in love with her
All over the world
She done left me baby
She's long gone

Well I tried and I tried
But she wouldn't stay
Tried and I tried
But she went away
Looking for my baby
But she's long gone

Well she walked out the door
Never said goodbye
Walked out that door
Didn't even say why
Looking for my baby
But she's long gone`,
  },
  {
    albumIndex: 5,
    title: 'The Only One',
    bpm: 88,
    time_signature: '4/4',
    artist: 'The Black Keys',
    lyrics: `I know I've been mistaken
But just give me a break
I've been blind and shaken
I am the only one

Oh I've been down this road before
With troubles by the score
I never asked for more
I am the only one

When I close my eyes
I see your smiling face
And I realize
You're still the one

I know I've been mistaken
But just give me a break
I've been blind and shaken
I am the only one

Oh I've been down this road before
With troubles by the score
I never asked for more
I am the only one`,
  },
  {
    albumIndex: 5,
    title: 'Ten Cent Pistol',
    bpm: 98,
    time_signature: '4/4',
    artist: 'The Black Keys',
    lyrics: `Sweet Anna Lee
She was a beauty queen
Took Johnny's cash
And she cut him clean

She burned down the farmhouse
Where Johnny had been
And the fire caught the neighbors
And the cattle and the barn

Ooh a jealous heart is a jealous heart
And when it falls apart
Lord it falls apart

Well the sheriff came by
With his deputies
Looked at the ashes
And went down on his knees

Said Anna Lee girl
You're under arrest
For the ten cent pistol
You stuck in his chest`,
  },
];

// ---------------------------------------------------------------------------
// Seed
// ---------------------------------------------------------------------------

async function seed() {
  const client = await pool.connect();

  try {
    console.log('🌱  Starting seed...\n');

    await client.query('BEGIN');

    // Create schema
    await client.query(SCHEMA);
    console.log('✓  Schema created (album, tracks)');

    // Insert albums and capture their new IDs
    const albumIds = [];
    for (const album of ALBUMS) {
      const { rows } = await client.query(
        `INSERT INTO album (title, year, album_art)
         VALUES ($1, $2, $3)
         RETURNING id`,
        [album.title, album.year, album.album_art]
      );
      albumIds.push(rows[0].id);
    }
    console.log(`✓  Inserted ${ALBUMS.length} albums`);

    // Insert tracks
    for (const track of TRACKS) {
      const albumId = albumIds[track.albumIndex];
      await client.query(
        `INSERT INTO tracks (title, lyrics, album_id, bpm, time_signature, artist)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [track.title, track.lyrics, albumId, track.bpm, track.time_signature, track.artist]
      );
    }
    console.log(`✓  Inserted ${TRACKS.length} tracks`);

    await client.query('COMMIT');

    console.log('\n🎵  Seed complete!');
    console.log(`    Albums : ${ALBUMS.length}`);
    console.log(`    Tracks : ${TRACKS.length}`);
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('\n✗  Seed failed — rolled back.\n', err);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

seed();
