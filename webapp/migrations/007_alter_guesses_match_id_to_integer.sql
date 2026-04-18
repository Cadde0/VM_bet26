
-- 0. Remove all existing guesses to avoid UUID to integer cast error
TRUNCATE TABLE guesses;

-- 1. Drop existing foreign key constraint (if any)
ALTER TABLE guesses DROP CONSTRAINT IF EXISTS guesses_match_id_fkey;

-- 2. Alter match_id column to integer
ALTER TABLE guesses ALTER COLUMN match_id TYPE integer USING match_id::integer;

-- 3. Add new foreign key constraint to matches(id)
ALTER TABLE guesses ADD CONSTRAINT guesses_match_id_fkey FOREIGN KEY (match_id) REFERENCES matches(id) ON DELETE CASCADE;
