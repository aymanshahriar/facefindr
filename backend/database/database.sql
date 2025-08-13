CREATE DATABASE image_recognition_db;

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

