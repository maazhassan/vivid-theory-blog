CREATE DATABASE vivid;

\c vivid;

CREATE TABLE Blogs
(
    id SERIAL PRIMARY KEY NOT NULL,
    title varchar(256) NOT NULL,
    slug varchar(256) NOT NULL UNIQUE,
    content text NOT NULL,
    image text NOT NULL,
    published_at date,
    created_at date NOT NULL,
    updated_at date NOT NULL,
    deleted_at date
);