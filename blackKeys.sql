--
-- PostgreSQL database dump
--

-- Dumped from database version 10.1
-- Dumped by pg_dump version 10.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: album; Type: TABLE; Schema: public; Owner: joshnothum
--

CREATE TABLE album (
    id integer NOT NULL,
    title character varying(80),
    year numeric,
    album_art character varying(240)
);


ALTER TABLE album OWNER TO joshnothum;

--
-- Name: album_id_seq; Type: SEQUENCE; Schema: public; Owner: joshnothum
--

CREATE SEQUENCE album_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE album_id_seq OWNER TO joshnothum;

--
-- Name: album_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: joshnothum
--

ALTER SEQUENCE album_id_seq OWNED BY album.id;


--
-- Name: tracks; Type: TABLE; Schema: public; Owner: joshnothum
--

CREATE TABLE tracks (
    id integer NOT NULL,
    title character varying,
    lyrics json,
    album_id integer,
    genius_id integer
);


ALTER TABLE tracks OWNER TO joshnothum;

--
-- Name: untitled_table_id_seq; Type: SEQUENCE; Schema: public; Owner: joshnothum
--

CREATE SEQUENCE untitled_table_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE untitled_table_id_seq OWNER TO joshnothum;

--
-- Name: untitled_table_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: joshnothum
--

ALTER SEQUENCE untitled_table_id_seq OWNED BY tracks.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: joshnothum
--

CREATE TABLE users (
    id integer NOT NULL,
    username character varying(80) NOT NULL,
    password character varying(240) NOT NULL
);


ALTER TABLE users OWNER TO joshnothum;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: joshnothum
--

CREATE SEQUENCE users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE users_id_seq OWNER TO joshnothum;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: joshnothum
--

ALTER SEQUENCE users_id_seq OWNED BY users.id;


--
-- Name: album id; Type: DEFAULT; Schema: public; Owner: joshnothum
--

ALTER TABLE ONLY album ALTER COLUMN id SET DEFAULT nextval('album_id_seq'::regclass);


--
-- Name: tracks id; Type: DEFAULT; Schema: public; Owner: joshnothum
--

ALTER TABLE ONLY tracks ALTER COLUMN id SET DEFAULT nextval('untitled_table_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: joshnothum
--

ALTER TABLE ONLY users ALTER COLUMN id SET DEFAULT nextval('users_id_seq'::regclass);


--
-- Data for Name: album; Type: TABLE DATA; Schema: public; Owner: joshnothum
--

COPY album (id, title, year, album_art) FROM stdin;
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

COPY tracks (id, title, lyrics, album_id, genius_id) FROM stdin;
3	Things Ain't Like They Used to Be	"I went around the way for you\\nDid all those things you asked me to\\nI thought it was the perfect day\\nTill she just opened up to say\\n\\nIt doesn't mean a thing to me\\nIt doesn't mean a thing to me\\nAnd it's about time you see\\nThings ain't like they used to be\\n\\nI headed out to Lester Hill\\nBut that just made me weaker still\\nShe's got the kind of love I need\\nThe kind that's never good on me\\n\\nIt doesn't mean a thing to me\\nIt doesn't mean a thing to me\\nAnd it's about time you see\\nThings ain't like they used to be\\n\\nI walked into the battle blind\\nIt happens almost all the time\\nThe yard is kind of overgrown\\nAnd all those happy times are gone\\n\\nIt doesn't mean a thing to me\\nIt doesn't mean a thing to me\\nAnd it's about time you see\\nThat things ain't like they used to be\\n\\nIt doesn't mean a thing to me, oh\\nIt doesn't mean a thing to me\\nAnd it's about time you see\\nThings ain't like they used to be"	1	194715
2	I Got Mine	"I was a movin' man\\nIn my younger days\\nBut I've grown out\\n\\nOf my ramblin' ways\\n\\nI left that road\\n\\nSo far behind\\n\\nAnd now I know\\n\\nI got mine I got mine I got mine I got mine\\n\\n\\n\\nSo baby when I rolled\\n\\nI rolled deep\\n\\nSo much so\\n\\nI couldn't get no sleep\\n\\n\\n\\nRock and roll hustle\\n\\nAll the time\\n\\nAnd now I know baby\\n\\nI got mine\\n\\n\\n\\nI got mine\\n\\nI got mine, oh baby I got mine\\n\\nI got mine"	1	\N
1	I'll Be Your Man	"Little black submarines\\nOperator please\\nPut me back on the line\\nTold my girl I'd be back\\nOperator please\\nThis is wrecking my mind\\n\\nOh, can it be\\nThe voices calling me\\nThey get lost and out of time\\nI should've seen it glow\\nBut everybody knows\\nThat a broken heart is blind\\nThat a broken heart is blind\\n\\nPick you up, let you down\\nWhen I wanna go\\nTo a place I can hide\\nYou know me, I had plans\\nBut they just disappeared\\n\\n\\n\\n\\nTo the back of my mind\\n\\nOh, can it be\\nThe voices calling me\\nThey get lost and out of time\\nI should've seen it glow\\nBut everybody knows\\nThat a broken heart is blind\\nThat a broken heart is blind\\n\\nTreasure maps, falling trees\\nOperator please\\nCall me back when it's time\\nStolen friends and disease\\nOperator please\\nPass me back to my mind\\n\\nOh, can it be\\nThe voices calling me\\nThey get lost and out of time\\nI should've seen it go\\nBut everybody knows\\nThat a broken heart is blind\\nThat a broken heart is blind\\nThat a broken heart is blind"	2	194640
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: joshnothum
--

COPY users (id, username, password) FROM stdin;
1	josh	$2a$10$eNWkzPQrx3eJdhBSquGTL.Ttwu5HJQTVu5KPM6LQBjUZBZrKQsIH.
\.


--
-- Name: album_id_seq; Type: SEQUENCE SET; Schema: public; Owner: joshnothum
--

SELECT pg_catalog.setval('album_id_seq', 1, false);


--
-- Name: untitled_table_id_seq; Type: SEQUENCE SET; Schema: public; Owner: joshnothum
--

SELECT pg_catalog.setval('untitled_table_id_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: joshnothum
--

SELECT pg_catalog.setval('users_id_seq', 1, true);


--
-- Name: album album_pkey; Type: CONSTRAINT; Schema: public; Owner: joshnothum
--

ALTER TABLE ONLY album
    ADD CONSTRAINT album_pkey PRIMARY KEY (id);


--
-- Name: tracks untitled_table_pkey; Type: CONSTRAINT; Schema: public; Owner: joshnothum
--

ALTER TABLE ONLY tracks
    ADD CONSTRAINT untitled_table_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: joshnothum
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: joshnothum
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: tracks tracks_album_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: joshnothum
--

ALTER TABLE ONLY tracks
    ADD CONSTRAINT tracks_album_id_fkey FOREIGN KEY (album_id) REFERENCES album(id);


--
-- PostgreSQL database dump complete
--

