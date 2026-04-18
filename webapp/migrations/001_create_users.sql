-- Migration: Create users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  points INTEGER DEFAULT 0,
  registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  profile_picture_url TEXT
);
