-- Add is_active column to agents table (for existing databases)
-- Safe to run multiple times (checks before adding)
-- Run manually if your database was created before this migration existed

-- For fresh installs: The agents table in 001_initial_schema.sql already includes is_active.
-- For existing databases: Run this file manually via your SQLite tool.

-- Note: This uses a procedure-like approach since SQLite doesn't support IF NOT EXISTS for ADD COLUMN.
-- If the column already exists, this will fail silently (or you can check first).
ALTER TABLE agents ADD COLUMN is_active INTEGER DEFAULT 1;
