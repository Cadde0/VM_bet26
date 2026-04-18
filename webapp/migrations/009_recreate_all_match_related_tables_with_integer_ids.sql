-- Migration: Drop and recreate matches, guesses, and comments_emotes tables with integer match IDs

-- 1. Drop dependent tables first
DROP TABLE IF EXISTS guesses;
DROP TABLE IF EXISTS comments_emotes;
DROP TABLE IF EXISTS matches;

-- 2. Recreate matches with integer PK (Football-Data.org IDs)
CREATE TABLE matches (
  id INTEGER PRIMARY KEY,
  team1 VARCHAR(100) NOT NULL,
  team2 VARCHAR(100) NOT NULL,
  start_time TIMESTAMP NOT NULL,
  result VARCHAR(20),
  status VARCHAR(20) NOT NULL
);

-- 3. Recreate guesses with integer FK
CREATE TABLE guesses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  match_id INTEGER REFERENCES matches(id) ON DELETE CASCADE,
  predicted_result VARCHAR(20) NOT NULL,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Recreate comments_emotes with integer FK
CREATE TABLE comments_emotes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  match_id INTEGER REFERENCES matches(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  type VARCHAR(10) NOT NULL CHECK (type IN ('text', 'emoji')),
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
