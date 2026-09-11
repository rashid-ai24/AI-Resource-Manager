import { vi } from 'vitest';

// Mock Electron's app module before importing database
vi.mock('electron', () => ({
  app: {
    getPath: () => ':memory:',
  },
}));

// Mock better-sqlite3 to use in-memory database
vi.mock('better-sqlite3', () => {
  const Database = vi.fn().mockImplementation((path) => {
    const actual = require('better-sqlite3');
    return new actual(':memory:');
  });
  return { default: Database };
});

export { vi };
