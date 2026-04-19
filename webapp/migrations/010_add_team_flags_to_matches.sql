-- Migration: Add home_team_flag and away_team_flag to matches table
ALTER TABLE matches ADD COLUMN IF NOT EXISTS home_team_flag TEXT;
ALTER TABLE matches ADD COLUMN IF NOT EXISTS away_team_flag TEXT;