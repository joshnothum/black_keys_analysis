--
-- PostgreSQL database dump
--

-- Dumped from database version 10.3
-- Dumped by pg_dump version 10.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: album; Type: TABLE; Schema: public; Owner: joshnothum
--

CREATE TABLE public.album (
    id integer NOT NULL,
    title character varying(80),
    year numeric,
    album_art character varying(240)
);


ALTER TABLE public.album OWNER TO joshnothum;

--
-- Name: album_id_seq; Type: SEQUENCE; Schema: public; Owner: joshnothum
--

CREATE SEQUENCE public.album_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.album_id_seq OWNER TO joshnothum;

--
-- Name: album_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: joshnothum
--

ALTER SEQUENCE public.album_id_seq OWNED BY public.album.id;


--
-- Name: tracks; Type: TABLE; Schema: public; Owner: joshnothum
--

CREATE TABLE public.tracks (
    id integer NOT NULL,
    title character varying,
    lyrics json,
    album_id integer,
    genius_id integer
);


ALTER TABLE public.tracks OWNER TO joshnothum;

--
-- Name: untitled_table_id_seq; Type: SEQUENCE; Schema: public; Owner: joshnothum
--

CREATE SEQUENCE public.untitled_table_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.untitled_table_id_seq OWNER TO joshnothum;

--
-- Name: untitled_table_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: joshnothum
--

ALTER SEQUENCE public.untitled_table_id_seq OWNED BY public.tracks.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: joshnothum
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(80) NOT NULL,
    password character varying(240) NOT NULL
);


ALTER TABLE public.users OWNER TO joshnothum;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: joshnothum
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO joshnothum;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: joshnothum
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: album id; Type: DEFAULT; Schema: public; Owner: joshnothum
--

ALTER TABLE ONLY public.album ALTER COLUMN id SET DEFAULT nextval('public.album_id_seq'::regclass);


--
-- Name: tracks id; Type: DEFAULT; Schema: public; Owner: joshnothum
--

ALTER TABLE ONLY public.tracks ALTER COLUMN id SET DEFAULT nextval('public.untitled_table_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: joshnothum
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: album; Type: TABLE DATA; Schema: public; Owner: joshnothum
--

COPY public.album (id, title, year, album_art) FROM stdin;
1	Attack & Release	2008	https://images.genius.com/18b8f0f969d91907abac8cfd0762fd3b.1000x1000x1.jpg
2	The Big Come Up	2002	https://s3.amazonaws.com/rapgenius/The_Black_Keys_-_The_Big_Come_Up.jpg
4	Turn Blue	2013	https://images.genius.com/c114d379f62d1bc9cb526bd20b94f824.1000x1000x1.jpg
3	El Camino	2011	https://images.genius.com/0b72d944b94ad838f1a375fb9f7aa539.1000x1000x1.jpg
5	Thickfreakness	2003	https://s3.amazonaws.com/rapgenius/Black-Keys-ThickFreakness.jpg
6	Brothers	2010	https://images.genius.com/d07354f71926c3161a76f8f33ee74e23.1000x1000x1.jpg
7	Magic Potion	2006	https://cps-static.rovicorp.com/3/JPG_500/MI0000/730/MI0000730839.jpg?partner=allrovi.com
\.


--
-- Data for Name: tracks; Type: TABLE DATA; Schema: public; Owner: joshnothum
--

COPY public.tracks (id, title, lyrics, album_id, genius_id) FROM stdin;
3	Things Ain't Like They Used to Be	"I went around the way for you\\nDid all those things you asked me to\\nI thought it was the perfect day\\nTill she just opened up to say\\n\\nIt doesn't mean a thing to me\\nIt doesn't mean a thing to me\\nAnd it's about time you see\\nThings ain't like they used to be\\n\\nI headed out to Lester Hill\\nBut that just made me weaker still\\nShe's got the kind of love I need\\nThe kind that's never good on me\\n\\nIt doesn't mean a thing to me\\nIt doesn't mean a thing to me\\nAnd it's about time you see\\nThings ain't like they used to be\\n\\nI walked into the battle blind\\nIt happens almost all the time\\nThe yard is kind of overgrown\\nAnd all those happy times are gone\\n\\nIt doesn't mean a thing to me\\nIt doesn't mean a thing to me\\nAnd it's about time you see\\nThat things ain't like they used to be\\n\\nIt doesn't mean a thing to me, oh\\nIt doesn't mean a thing to me\\nAnd it's about time you see\\nThings ain't like they used to be"	1	194715
2	I Got Mine	"I was a movin' man\\nIn my younger days\\nBut I've grown out\\n\\nOf my ramblin' ways\\n\\nI left that road\\n\\nSo far behind\\n\\nAnd now I know\\n\\nI got mine I got mine I got mine I got mine\\n\\n\\n\\nSo baby when I rolled\\n\\nI rolled deep\\n\\nSo much so\\n\\nI couldn't get no sleep\\n\\n\\n\\nRock and roll hustle\\n\\nAll the time\\n\\nAnd now I know baby\\n\\nI got mine\\n\\n\\n\\nI got mine\\n\\nI got mine, oh baby I got mine\\n\\nI got mine"	1	\N
1	I'll Be Your Man	"Little black submarines\\nOperator please\\nPut me back on the line\\nTold my girl I'd be back\\nOperator please\\nThis is wrecking my mind\\n\\nOh, can it be\\nThe voices calling me\\nThey get lost and out of time\\nI should've seen it glow\\nBut everybody knows\\nThat a broken heart is blind\\nThat a broken heart is blind\\n\\nPick you up, let you down\\nWhen I wanna go\\nTo a place I can hide\\nYou know me, I had plans\\nBut they just disappeared\\n\\n\\n\\n\\nTo the back of my mind\\n\\nOh, can it be\\nThe voices calling me\\nThey get lost and out of time\\nI should've seen it glow\\nBut everybody knows\\nThat a broken heart is blind\\nThat a broken heart is blind\\n\\nTreasure maps, falling trees\\nOperator please\\nCall me back when it's time\\nStolen friends and disease\\nOperator please\\nPass me back to my mind\\n\\nOh, can it be\\nThe voices calling me\\nThey get lost and out of time\\nI should've seen it go\\nBut everybody knows\\nThat a broken heart is blind\\nThat a broken heart is blind\\nThat a broken heart is blind"	2	194640
4	Strange Times	"King and sons of God\\nTravel on their way from here\\nCalming restless mobs\\n\\nEasing all of their, all of their fears\\n\\nStrange times are here\\n\\nStrange times are here\\n\\n\\n\\nStatue in the square\\n\\nMeant so much when it first stood\\n\\nPeople come from far and near\\n\\nBless them if, bless them if it would\\n\\n\\n\\nStrange times are here\\n\\nStrange times are here\\n\\n\\n\\nSadie dry your tear\\n\\nI will be the one\\n\\nTo pull you through the mirror\\n\\nBefore you come, before you come undone\\n\\n\\n\\nStrange times are here\\n\\nStrange times are here\\n\\nStrange times are here\\n\\nStrange times are here"	1	\N
5	Psychotic Girl	"I heard you threw your man around\\nPick him up just to let him down\\nIt's a shame baby but I always knew\\n\\nJust the way you're gonna do, oh\\n\\nOh no, just a psychotic girl\\n\\nAnd I won't get lost in your world\\n\\n\\n\\nFriday night, the party light\\n\\nYou were acting like everything was alright\\n\\nTill later on with no one around\\n\\nHad me fighting for air, laying on the ground, oh no\\n\\n\\n\\nOh no, just a psychotic girl\\n\\nAnd I won't get lost in your world\\n\\n\\n\\nI thought you'd changed but I shoulda known\\n\\nYou'd play nice for a time and then you do me wrong\\n\\nI thought long and hard 'bout what I should say\\n\\nAnd when I was through it just came out this way, oh no\\n\\n\\n\\nOh no, just a psychotic girl\\n\\nAnd I won't get lost in your world"	1	\N
6	Lies	"Said the moon was ours\\r\\nYeah\\r\\nSaid the moon was ours\\r\\n\\nThe hell with the day\\r\\nThe sunlight is always\\r\\nGonna take love away\\nBrings up suspicions\\nAnd alibies\\nBut I can see blue\\nTear-blinded eyes\\nLies, lies, lies\\nOhh, lies\\n\\nI got a stone\\nWhere my heart should be\\nI got a stone\\nWhere my heart should be\\nAnd nothing I do\\nWill make you love me\\n\\nI'd leave this time\\nBreak all my ties\\nBe no more\\nUse for any disguise\\nLies, lies, lies\\nOhh, lies\\n\\nI wanna die\\nWithout pain\\nI wanna die\\nOh, without pain\\nAll this deception\\nI just can't maintain\\nThe sun, moon\\nThe stars in the sky\\nIt'd hurt me too bad\\nIf you said goodbye\\nLies, lies, lies\\nOhh, lies\\n\\n"	1	\N
7	Remember When (Side A)	"It happened when I heard her name\\r\\nSame old thought crept back again\\r\\nOhh no, let go\\r\\n\\nSomewhere in my sorry state\\r\\nLightning struck that old iron gate\\nOh it's true, yes it true\\n\\n(So no one told the winner wins)?\\nSmacks you on your cheeks again\\nIt's them, It's them\\nOhhhh ohh \\n"	1	\N
8	Remember When (Side B)	"It happened when I heard her name\\r\\nThe same 'ol thoughts crept back again\\r\\nOh they grew, yeah they grew\\r\\n\\nSomewhere in my sorry state\\r\\nThe lightn' struck that old iron gate\\nOh it's true, yeah it's true\\n\\nWith snow in tow, the winter winds\\nSmacks you on your cheeks again\\nOh it stings, oh it stings\\n\\nRemember how I held you near\\nAnd whispered in your precious ear\\nSweet things, yeah sweet things\\n\\nIt happened when I heard her name\\nThe same 'ol thoughts crept back again\\nOh they grew, yeah they grew, oh\\n"	1	\N
9	Same Old Thing	"It don't matter where you've been\\nThe people try to do you in\\nEvery day till dawn\\nThere's some thievin' goin' on\\n\\nOh, oh no\\nHurt me so\\n\\nJust the same old thing\\nJust the same old thing\\nNo matter how much love you try to bring\\nJust the same old thing\\n\\nYou got a callous heart\\nFrom being torn apart\\nNow you labor every day\\nLove life drifts away\\n\\nOh, oh no\\nIt hurts me so\\n\\nJust the same old thing\\nJust the same old thing\\nNo matter how much love you try to bring\\nJust the same old thing"	1	\N
10	So He Won't Break	"Gone like the wind\\r\\nAnd the state it put him in\\r\\nTo hold his head high\\r\\n\\nWhen he really wanted to die.\\r\\nAnd you know the difference it makes\\nAnd you know all that it takes\\nIs love, so he won't break.\\n\\nHe's crazy from the pain\\nAnd can't get hurt again\\nIf he ever falls\\nI'd be sorry for us all.\\n\\nAnd you know the difference it makes\\nAnd you know all that it takes\\nIs love, so he won't break.\\n\\nRight around the way\\nIs where they go to pay\\nFor remedies and pills\\nTo ease their ills.\\n\\nAnd you know the difference it makes\\nAnd you know all that it takes\\nIs love, so he won't break."	1	\N
11	Oceans and Streams	"With guilt that no man should carry\\r\\nHeavy enough for me to get buried\\r\\nI feel death on the road tonight\\r\\n\\nIt's got me to where I wanna run and hide\\r\\nOh I used to dream of oceans and streams\\nFlowing and growing strong\\nWhere have all\\nThose days gone\\n\\nThese days I'm so slow\\nAll these thoughts and no where to go\\nMy aim used to be so true\\nAnd my world had a place in it just for you\\n\\nOh I used to dream of oceans and streams\\nFlowing and growing strong\\nWhere have all\\nThose days gone\\n\\nExcuse me I gotta go\\nCan't stand to be here anymore, no\\nI'm sick and I gotta go to bed\\nIf I stay here I'm better off dead\\n\\nOh I used to dream of oceans and streams\\nFlowing and growing strong\\nWhere have all\\nThose days gone"	1	\N
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: joshnothum
--

COPY public.users (id, username, password) FROM stdin;
1	josh	$2a$10$eNWkzPQrx3eJdhBSquGTL.Ttwu5HJQTVu5KPM6LQBjUZBZrKQsIH.
\.


--
-- Name: album_id_seq; Type: SEQUENCE SET; Schema: public; Owner: joshnothum
--

SELECT pg_catalog.setval('public.album_id_seq', 1, false);


--
-- Name: untitled_table_id_seq; Type: SEQUENCE SET; Schema: public; Owner: joshnothum
--

SELECT pg_catalog.setval('public.untitled_table_id_seq', 1, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: joshnothum
--

SELECT pg_catalog.setval('public.users_id_seq', 1, true);


--
-- Name: album album_pkey; Type: CONSTRAINT; Schema: public; Owner: joshnothum
--

ALTER TABLE ONLY public.album
    ADD CONSTRAINT album_pkey PRIMARY KEY (id);


--
-- Name: tracks untitled_table_pkey; Type: CONSTRAINT; Schema: public; Owner: joshnothum
--

ALTER TABLE ONLY public.tracks
    ADD CONSTRAINT untitled_table_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: joshnothum
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: joshnothum
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: tracks tracks_album_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: joshnothum
--

ALTER TABLE ONLY public.tracks
    ADD CONSTRAINT tracks_album_id_fkey FOREIGN KEY (album_id) REFERENCES public.album(id);


--
-- PostgreSQL database dump complete
--

