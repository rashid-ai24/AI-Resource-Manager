import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import Database from 'better-sqlite3';
import TestBaseRepository from '../../test/base_repository.mjs';

const testDb = new Database(':memory:');
testDb.pragma('journal_mode = WAL');
testDb.pragma('foreign_keys = ON');

class ModelRepository extends TestBaseRepository {
  constructor() {
    super('models', testDb);
  }

  getSearchColumns() {
    return ['name', 'description', 'model_id'];
  }

  findByProvider(providerId) {
    return this.db.prepare(
      `SELECT * FROM models WHERE provider_id = ? AND deleted_at IS NULL ORDER BY name`
    ).all(providerId);
  }
}

let repo;

beforeAll(() => {
  testDb.exec(`
    CREATE TABLE IF NOT EXISTS models (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      provider_id INTEGER,
      model_id TEXT NOT NULL,
      description TEXT DEFAULT '',
      context_window INTEGER DEFAULT 0,
      max_output INTEGER DEFAULT 0,
      supports_vision INTEGER DEFAULT 0,
      supports_tools INTEGER DEFAULT 0,
      cost_input REAL DEFAULT 0,
      cost_output REAL DEFAULT 0,
      is_active INTEGER DEFAULT 1,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now')),
      deleted_at TEXT
    );
  `);

  repo = new ModelRepository();
});

afterAll(() => {
  testDb.close();
});

beforeEach(() => {
  testDb.exec('DELETE FROM models');
});

describe('ModelRepository', () => {
  describe('create', () => {
    it('creates a model with all fields', () => {
      const model = repo.create({
        name: 'GPT-4',
        provider_id: 1,
        model_id: 'gpt-4',
        description: 'GPT-4 model',
        context_window: 128000,
        max_output: 4096,
        supports_vision: 1,
        supports_tools: 1,
        cost_input: 0.03,
        cost_output: 0.06,
      });

      expect(model).toBeDefined();
      expect(model.id).toBeDefined();
      expect(model.name).toBe('GPT-4');
      expect(model.model_id).toBe('gpt-4');
      expect(model.context_window).toBe(128000);
      expect(model.supports_vision).toBe(1);
    });

    it('creates model with default values', () => {
      const model = repo.create({ name: 'Test Model', model_id: 'test' });

      expect(model.context_window).toBe(0);
      expect(model.max_output).toBe(0);
      expect(model.supports_vision).toBe(0);
      expect(model.supports_tools).toBe(0);
      expect(model.cost_input).toBe(0);
      expect(model.cost_output).toBe(0);
    });
  });

  describe('findByProvider', () => {
    it('returns models for a specific provider', () => {
      repo.create({ name: 'GPT-4', provider_id: 1, model_id: 'gpt-4' });
      repo.create({ name: 'GPT-3.5', provider_id: 1, model_id: 'gpt-3.5' });
      repo.create({ name: 'Claude', provider_id: 2, model_id: 'claude-2' });

      const models = repo.findByProvider(1);
      expect(models).toHaveLength(2);
    });
  });

  describe('search', () => {
    it('searches by model_id', () => {
      repo.create({ name: 'GPT-4', model_id: 'gpt-4' });
      repo.create({ name: 'Claude', model_id: 'claude-2' });

      const results = repo.findAll({ search: 'gpt' });
      expect(results).toHaveLength(1);
      expect(results[0].model_id).toBe('gpt-4');
    });
  });
});
