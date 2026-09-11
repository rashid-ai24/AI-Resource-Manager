import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import Database from 'better-sqlite3';
import TestBaseRepository from '../../test/base_repository.mjs';

const testDb = new Database(':memory:');
testDb.pragma('journal_mode = WAL');
testDb.pragma('foreign_keys = ON');

class FavoriteRepository extends TestBaseRepository {
  constructor() {
    super('favorites', testDb);
  }

  getSearchColumns() {
    return ['entity_name', 'notes'];
  }

  findByEntity(entityType, entityId) {
    return this.db.prepare(
      `SELECT * FROM favorites WHERE entity_type = ? AND entity_id = ?`
    ).get(entityType, entityId);
  }

  findByType(entityType) {
    return this.db.prepare(
      `SELECT * FROM favorites WHERE entity_type = ? ORDER BY created_at DESC`
    ).all(entityType);
  }

  toggle(entityType, entityId, entityName = '', notes = '') {
    const existing = this.findByEntity(entityType, entityId);
    if (existing) {
      this.db.prepare(`DELETE FROM favorites WHERE id = ?`).run(existing.id);
      return { action: 'removed', id: existing.id };
    } else {
      const result = this.db.prepare(
        `INSERT INTO favorites (entity_type, entity_id, entity_name, notes) VALUES (?, ?, ?, ?)`
      ).run(entityType, entityId, entityName, notes);
      return { action: 'added', id: result.lastInsertRowid };
    }
  }

  isFavorited(entityType, entityId) {
    const fav = this.findByEntity(entityType, entityId);
    return !!fav;
  }

  getCount(entityType) {
    const sql = entityType
      ? `SELECT COUNT(*) as count FROM favorites WHERE entity_type = ?`
      : `SELECT COUNT(*) as count FROM favorites`;
    const params = entityType ? [entityType] : [];
    return this.db.prepare(sql).get(...params).count;
  }
}

let repo;

beforeAll(() => {
  testDb.exec(`
    CREATE TABLE IF NOT EXISTS favorites (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      entity_type TEXT NOT NULL,
      entity_id INTEGER NOT NULL,
      entity_name TEXT DEFAULT '',
      notes TEXT DEFAULT '',
      created_at TEXT DEFAULT (datetime('now')),
      UNIQUE(entity_type, entity_id)
    );
  `);

  repo = new FavoriteRepository();
});

afterAll(() => {
  testDb.close();
});

beforeEach(() => {
  testDb.exec('DELETE FROM favorites');
});

describe('FavoriteRepository', () => {
  describe('toggle', () => {
    it('adds a favorite when not exists', () => {
      const result = repo.toggle('agent', 1, 'My Agent', 'Important');

      expect(result.action).toBe('added');
      expect(result.id).toBeDefined();

      const fav = repo.findByEntity('agent', 1);
      expect(fav).toBeDefined();
      expect(fav.entity_name).toBe('My Agent');
      expect(fav.notes).toBe('Important');
    });

    it('removes a favorite when exists', () => {
      repo.toggle('agent', 1, 'My Agent');
      const result = repo.toggle('agent', 1);

      expect(result.action).toBe('removed');

      const fav = repo.findByEntity('agent', 1);
      expect(fav).toBeUndefined();
    });
  });

  describe('isFavorited', () => {
    it('returns true when favorited', () => {
      repo.toggle('agent', 1, 'My Agent');
      expect(repo.isFavorited('agent', 1)).toBe(true);
    });

    it('returns false when not favorited', () => {
      expect(repo.isFavorited('agent', 1)).toBe(false);
    });
  });

  describe('findByType', () => {
    it('returns favorites for a specific entity type', () => {
      repo.toggle('agent', 1, 'Agent 1');
      repo.toggle('agent', 2, 'Agent 2');
      repo.toggle('provider', 1, 'Provider 1');

      const agents = repo.findByType('agent');
      expect(agents).toHaveLength(2);

      const providers = repo.findByType('provider');
      expect(providers).toHaveLength(1);
    });
  });

  describe('getCount', () => {
    it('counts all favorites', () => {
      repo.toggle('agent', 1, 'Agent 1');
      repo.toggle('agent', 2, 'Agent 2');
      repo.toggle('provider', 1, 'Provider 1');

      expect(repo.getCount()).toBe(3);
    });

    it('counts favorites by entity type', () => {
      repo.toggle('agent', 1, 'Agent 1');
      repo.toggle('agent', 2, 'Agent 2');
      repo.toggle('provider', 1, 'Provider 1');

      expect(repo.getCount('agent')).toBe(2);
      expect(repo.getCount('provider')).toBe(1);
    });
  });
});
