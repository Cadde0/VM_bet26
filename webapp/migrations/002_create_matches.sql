-- Migration: Create matches table
CREATE TABLE IF NOT EXISTS matches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team1 VARCHAR(100) NOT NULL,
  team2 VARCHAR(100) NOT NULL,
  start_time TIMESTAMP NOT NULL,
  result VARCHAR(20),
  status VARCHAR(20) NOT NULL
);
