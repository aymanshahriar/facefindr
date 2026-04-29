-- Run this schema against an existing database (for local dev, usually `facefindr`).
-- The setup script creates the database and role before importing this file.

CREATE TABLE users (
	id serial PRIMARY KEY,
	name VARCHAR(100),
	email text UNIQUE NOT NULL,
	entries bigint DEFAULT 0,
	joined timestamp NOT NULL
);

CREATE TABLE login (
id serial PRIMARY KEY,
	email text UNIQUE NOT NULL,
  	hash varchar(100) NOT NULL               -- bcrypt always takes a password and gives a hash of a 100 characters
);

