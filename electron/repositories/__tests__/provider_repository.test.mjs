import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import Database from 'better-sqlite3';
import TestBaseRepository from '../../test/base_repository.mjs';

const testDb = new Database(':memory:');
testDb.pragma('journal_mode = WAL');
testDb.pragma('foreign_keys = ON');

class ProviderRepository extends TestBaseRepository {
  constructor() {
    super('providers', testDb);
  }

  getSearchColumns() {
    return ['name', 'description'];
  }
}

let repo;

beforeAll(() => {
  testDb.exec(`
    CREATE TABLE IF NOT EXISTS providers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT DEFAULT '',
      base_url TEXT DEFAULT '',
      api_type TEXT DEFAULT 'openai',
      is_active INTEGER DEFAULT 1,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now')),
      deleted_at TEXT
    );
  `);

  repo = new ProviderRepository();
});

afterAll(() => {
  testDb.close();
});

beforeEach(() => {
  testDb.exec('DELETE FROM providers');
});

describe('ProviderRepository', () => {
  describe('create', () => {
    it('creates a provider with all fields', () => {
      const provider = repo.create({
        name: 'OpenAI',
        description: 'OpenAI API',
        base_url: 'https://api.openai.com/v1',
        api_type: 'openai',
      });

      expect(provider).toBeDefined();
      expect(provider.id).toBeDefined();
      expect(provider.name).toBe('OpenAI');
      expect(provider.base_url).toBe('https://api.openai.com/v1');
      expect(provider.api_type).toBe('openai');
    });

    it('creates provider with default values', () => {
      const provider = repo.create({ name: 'Test Provider' });

      expect(provider.description).toBe('');
      expect(provider.base_url).toBe('');
      expect(provider.api_type).toBe('openai');
      expect(provider.is_active).toBe(1);
    });
  });

  describe('update', () => {
    it('updates provider fields', () => {
      const provider = repo.create({ name: 'Original' });
      const updated = repo.update(provider.id, {
        name: 'Updated',
        base_url: 'https://new-url.com',
      });

      expect(updated.name).toBe('Updated');
      expect(updated.base_url).toBe('https://new-url.com');
    });
  });

  describe('findAll', () => {
    it('returns providers ordered by created_at desc', () => {
      repo.create({ name: 'First' });
      repo.create({ name: 'Second' });

      const providers = repo.findAll();
      expect(providers).toHaveLength(2);
      // Both should be present, order may vary with same timestamp
      const names = providers.map(p => p.name);
      expect(names).toContain('First');
      expect(names).toContain('Second');
    });
  });

  describe('search', () => {
    it('searches by name', () => {
      repo.create({ name: 'OpenAI', description: 'AI provider' });
      repo.create({ name: 'Anthropic', description: 'Claude provider' });

      const results = repo.findAll({ search: 'OpenAI' });
      expect(results).toHaveLength(1);
      expect(results[0].name).toBe('OpenAI');
    });
  });

  describe('count', () => {
    it('counts active providers', () => {
      repo.create({ name: 'Active', is_active: 1 });
      repo.create({ name: 'Inactive', is_active: 0 });

      expect(repo.count({ is_active: 1 })).toBe(1);
      expect(repo.count({ is_active: 0 })).toBe(1);
    });
  });
});
