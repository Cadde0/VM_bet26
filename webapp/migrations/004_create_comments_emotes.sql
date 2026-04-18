-- Migration: Create comments_emotes table
CREATE TABLE IF NOT EXISTS comments_emotes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  match_id UUID REFERENCES matches(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  type VARCHAR(10) NOT NULL CHECK (type IN ('text', 'emoji')),
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
