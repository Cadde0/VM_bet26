-- Migration: Remove email column from users table and make name unique
ALTER TABLE users DROP COLUMN IF EXISTS email;
CREATE UNIQUE INDEX IF NOT EXISTS users_name_unique ON users(name);
