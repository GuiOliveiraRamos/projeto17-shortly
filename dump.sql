--
-- PostgreSQL database dump
--

-- Dumped from database version 14.8 (Ubuntu 14.8-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.8 (Ubuntu 14.8-0ubuntu0.22.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: urls; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.urls (
    id integer NOT NULL,
    url character varying(255) NOT NULL,
    "shortUrl" character varying(8) NOT NULL,
    views integer DEFAULT 0,
    createdat timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- Name: urls_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.urls_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: urls_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.urls_id_seq OWNED BY public.urls.id;


--
-- Name: usuarios; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.usuarios (
    id integer NOT NULL,
    uuid uuid DEFAULT public.uuid_generate_v4(),
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    token text
);


--
-- Name: usuarios_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.usuarios_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: usuarios_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.usuarios_id_seq OWNED BY public.usuarios.id;


--
-- Name: urls id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls ALTER COLUMN id SET DEFAULT nextval('public.urls_id_seq'::regclass);


--
-- Name: usuarios id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.usuarios ALTER COLUMN id SET DEFAULT nextval('public.usuarios_id_seq'::regclass);


--
-- Data for Name: urls; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.urls VALUES (2, 'https://cruzeiro.com.br', '9Y6iZpH5', 0, '2023-08-03 13:04:44.303427');
INSERT INTO public.urls VALUES (3, 'https://cruzeiro.com.br', 'LwPH9rZC', 0, '2023-08-03 13:47:13.845683');
INSERT INTO public.urls VALUES (4, 'https://cruzeiro.com.br', '40YdyWTz', 0, '2023-08-03 13:47:15.989156');
INSERT INTO public.urls VALUES (5, 'https://cruzeiro.com.br', 'eQQtktlD', 0, '2023-08-03 13:47:16.532151');
INSERT INTO public.urls VALUES (6, 'https://cruzeiro.com.br', 'bhnd3dtq', 0, '2023-08-03 13:47:16.972057');


--
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.usuarios VALUES (1, '513168ee-233a-4f04-80e2-3b43f25fc9f9', 'João', 'joao@driven.com.br', 'driven', '2023-08-02 12:28:18.643046', NULL);
INSERT INTO public.usuarios VALUES (2, '12e089a1-ea3b-4c9a-bb78-2110847bd9f9', 'Joãozin', 'joao@driven.com', '$2b$10$biKf1/qCjb0Vi6uxGTtOtOpWVeIp7NNxit/BOOgKuLIJ0IjgBI7ta', '2023-08-02 14:54:54.313413', NULL);
INSERT INTO public.usuarios VALUES (3, 'ebc0c0f7-68a7-4ce4-b513-4ebb2409e0fd', 'gui', 'gui@gmail.com', '$2b$10$i06N1OKiW9eedOlA/pSEzu9iAuclSd1qcbGy7P0FCXMuns1QetgQy', '2023-08-02 14:56:41.856725', NULL);
INSERT INTO public.usuarios VALUES (4, '853628e7-eb7a-4cbb-993f-31694620b0e0', 'guii', 'gui@driven.com.br', '$2b$10$QPWN1BmiwcHeHTXaeVX2.eGKNWngs6mGgLgp1Muh2IzBQOBU49CoW', '2023-08-03 13:03:08.176343', NULL);


--
-- Name: urls_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.urls_id_seq', 6, true);


--
-- Name: usuarios_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.usuarios_id_seq', 4, true);


--
-- Name: urls urls_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_pkey PRIMARY KEY (id);


--
-- Name: usuarios usuarios_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_email_key UNIQUE (email);


--
-- Name: usuarios usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

