DROP TABLE IF EXISTS games;
DROP TABLE IF EXISTS players;

CREATE TABLE games(
  id SERIAL PRIMARY KEY,
  name varchar(255) NOT NULL,
  rate int,
  genre varchar(255) NOT NULL
);

CREATE TABLE players(
  id SERIAL PRIMARY KEY,
  name varchar(255) NOT NULL,
  games varchar(255) NOT NULL
);