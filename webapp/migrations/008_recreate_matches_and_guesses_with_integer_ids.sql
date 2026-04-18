-- Migration: Drop and recreate matches and guesses tables with integer IDs

-- 1. Drop guesses first (due to FK)
DROP TABLE IF EXISTS guesses;

-- 2. Drop matches
DROP TABLE IF EXISTS matches;

-- 3. Recreate matches with integer PK (Football-Data.org IDs)
CREATE TABLE matches (
  id INTEGER PRIMARY KEY,
  team1 VARCHAR(100) NOT NULL,
  team2 VARCHAR(100) NOT NULL,
  start_time TIMESTAMP NOT NULL,
  result VARCHAR(20),
  status VARCHAR(20) NOT NULL
);

-- 4. Recreate guesses with integer FK
CREATE TABLE guesses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  match_id INTEGER REFERENCES matches(id) ON DELETE CASCADE,
  predicted_result VARCHAR(20) NOT NULL,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
