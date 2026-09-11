import { vi } from 'vitest';
import Database from 'better-sqlite3';

// Create in-memory database
const testDb = new Database(':memory:');
testDb.pragma('journal_mode = WAL');
testDb.pragma('foreign_keys = ON');

// Mock the database module
vi.mock('../../database.cjs', () => ({
  default: testDb,
}));

export { testDb, vi };
