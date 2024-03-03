\echo 'Delete and recreate the database vivid_blog_challenge?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE IF EXISTS vivid_blog_challenge;
CREATE DATABASE vivid_blog_challenge;

\c vivid_blog_challenge;

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