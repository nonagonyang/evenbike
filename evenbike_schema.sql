

CREATE TABLE eco_levels (
    eco_level SERIAL PRIMARY KEY,
    level_limit INTEGER NOT NULL
);

CREATE TABLE active_levels (
    active_level SERIAL PRIMARY KEY,
    level_limit INTEGER NOT NULL
);

CREATE TABLE overall_levels (
    overall_level SERIAL PRIMARY KEY,
    level_limit INTEGER NOT NULL
);

CREATE TABLE users (
  username VARCHAR(25) PRIMARY KEY,
  email TEXT NOT NULL
    CHECK (position('@' IN email) > 1),
  password TEXT NOT NULL,
  weight FLOAT NOT NULL,
  height FLOAT NOT NULL,
  is_admin BOOLEAN NOT NULL DEFAULT FALSE,
  eco_level INTEGER REFERENCES eco_levels ON DELETE CASCADE,
  active_level INTEGER REFERENCES active_levels ON DELETE CASCADE,
  overall_level INTEGER REFERENCES overall_levels ON DELETE CASCADE
);

CREATE TABLE trips (
  id SERIAL PRIMARY KEY,
  username VARCHAR(25)
    REFERENCES users ON DELETE CASCADE,
  start_dock TEXT NOT NULL,
  end_dock TEXT,
  distance FLOAT NOT NULL DEFAULT 0,
  start_time TIMESTAMP NOT NULL DEFAULT '2004-10-19 10:23:54',
  end_time TIMESTAMP NOT NULL DEFAULT '2004-10-19 20:23:54',
  eco_points INTEGER NOT NULL DEFAULT 0,
  active_points INTEGER NOT NULL DEFAULT 0
);




