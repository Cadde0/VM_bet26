-- Migration: Create match_cache table for Football-Data.org API caching
CREATE TABLE IF NOT EXISTS match_cache (
  id SERIAL PRIMARY KEY,
  data JSONB NOT NULL,
  fetched_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
