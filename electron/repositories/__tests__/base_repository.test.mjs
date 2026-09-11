import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import Database from 'better-sqlite3';
import TestBaseRepository from '../../test/base_repository.mjs';

const testDb = new Database(':memory:');
testDb.pragma('journal_mode = WAL');
testDb.pragma('foreign_keys = ON');

let repo;

class TestRepository extends TestBaseRepository {
  constructor() {
    super('test_entities', testDb);
  }

  getSearchColumns() {
    return ['name', 'description'];
  }
}

beforeAll(() => {
  testDb.exec(`
    CREATE TABLE IF NOT EXISTS test_entities (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT DEFAULT '',
      is_active INTEGER DEFAULT 1,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now')),
      deleted_at TEXT
    );
  `);

  repo = new TestRepository();
});

afterAll(() => {
  testDb.close();
});

beforeEach(() => {
  testDb.exec('DELETE FROM test_entities');
});

describe('BaseRepository', () => {
  describe('create', () => {
    it('creates a new record and returns it', () => {
      const data = { name: 'Test Entity', description: 'A test' };
      const result = repo.create(data);

      expect(result).toBeDefined();
      expect(result.id).toBeDefined();
      expect(result.name).toBe('Test Entity');
      expect(result.description).toBe('A test');
      expect(result.created_at).toBeDefined();
    });

    it('auto-generates id', () => {
      const first = repo.create({ name: 'First' });
      const second = repo.create({ name: 'Second' });

      expect(second.id).toBeGreaterThan(first.id);
    });
  });

  describe('findById', () => {
    it('finds a record by id', () => {
      const created = repo.create({ name: 'Find Me' });
      const found = repo.findById(created.id);

      expect(found).toBeDefined();
      expect(found.id).toBe(created.id);
      expect(found.name).toBe('Find Me');
    });

    it('returns undefined for non-existent id', () => {
      const found = repo.findById(99999);
      expect(found).toBeUndefined();
    });

    it('does not find soft-deleted records', () => {
      const created = repo.create({ name: 'Deleted' });
      repo.delete(created.id);
      const found = repo.findById(created.id);

      expect(found).toBeUndefined();
    });
  });

  describe('findAll', () => {
    it('returns all non-deleted records', () => {
      repo.create({ name: 'Active' });
      repo.create({ name: 'Also Active' });
      const deleted = repo.create({ name: 'Deleted' });
      repo.delete(deleted.id);

      const results = repo.findAll();
      expect(results).toHaveLength(2);
    });

    it('filters by search term', () => {
      repo.create({ name: 'Apple', description: 'Fruit' });
      repo.create({ name: 'Banana', description: 'Fruit' });
      repo.create({ name: 'Carrot', description: 'Vegetable' });

      const results = repo.findAll({ search: 'Apple' });
      expect(results).toHaveLength(1);
      expect(results[0].name).toBe('Apple');
    });

    it('filters by is_active', () => {
      repo.create({ name: 'Active', is_active: 1 });
      repo.create({ name: 'Inactive', is_active: 0 });

      const active = repo.findAll({ is_active: 1 });
      expect(active).toHaveLength(1);
      expect(active[0].name).toBe('Active');

      const inactive = repo.findAll({ is_active: 0 });
      expect(inactive).toHaveLength(1);
      expect(inactive[0].name).toBe('Inactive');
    });

    it('supports limit and offset', () => {
      for (let i = 0; i < 10; i++) {
        repo.create({ name: `Item ${i}` });
      }

      const page1 = repo.findAll({ limit: 3, offset: 0 });
      expect(page1).toHaveLength(3);

      const page2 = repo.findAll({ limit: 3, offset: 3 });
      expect(page2).toHaveLength(3);
      expect(page2[0].name).not.toBe(page1[0].name);
    });
  });

  describe('update', () => {
    it('updates a record', () => {
      const created = repo.create({ name: 'Original' });
      const updated = repo.update(created.id, { name: 'Updated' });

      expect(updated.name).toBe('Updated');
      expect(updated.id).toBe(created.id);
    });

    it('does not update soft-deleted records', () => {
      const created = repo.create({ name: 'Deleted' });
      repo.delete(created.id);
      const updated = repo.update(created.id, { name: 'Should Not Update' });

      expect(updated).toBeUndefined();
    });
  });

  describe('delete', () => {
    it('soft-deletes a record', () => {
      const created = repo.create({ name: 'To Delete' });
      repo.delete(created.id);
      const found = repo.findById(created.id);

      expect(found).toBeUndefined();
    });

    it('keeps record in database with deleted_at set', () => {
      const created = repo.create({ name: 'Soft Deleted' });
      repo.delete(created.id);
      const raw = testDb.prepare('SELECT * FROM test_entities WHERE id = ?').get(created.id);

      expect(raw).toBeDefined();
      expect(raw.deleted_at).not.toBeNull();
    });
  });

  describe('hardDelete', () => {
    it('permanently removes a record', () => {
      const created = repo.create({ name: 'Hard Delete' });
      repo.hardDelete(created.id);
      const raw = testDb.prepare('SELECT * FROM test_entities WHERE id = ?').get(created.id);

      expect(raw).toBeUndefined();
    });
  });

  describe('count', () => {
    it('counts all non-deleted records', () => {
      repo.create({ name: 'One' });
      repo.create({ name: 'Two' });
      repo.create({ name: 'Three' });

      expect(repo.count()).toBe(3);
    });

    it('counts by is_active', () => {
      repo.create({ name: 'Active', is_active: 1 });
      repo.create({ name: 'Inactive', is_active: 0 });

      expect(repo.count({ is_active: 1 })).toBe(1);
      expect(repo.count({ is_active: 0 })).toBe(1);
    });

    it('excludes soft-deleted records', () => {
      repo.create({ name: 'Keep' });
      const toDelete = repo.create({ name: 'Delete' });
      repo.delete(toDelete.id);

      expect(repo.count()).toBe(1);
    });
  });
});
