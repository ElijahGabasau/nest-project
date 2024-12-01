CREATE USER postgres WITH PASSWORD 'postgres';

CREATE DATABASE "auto-ria-project";

GRANT CONNECT ON DATABASE "auto-ria-project" TO postgres;

GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO postgres;