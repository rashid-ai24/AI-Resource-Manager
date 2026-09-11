import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import Database from 'better-sqlite3';
import TestBaseRepository from '../../test/base_repository.mjs';

const testDb = new Database(':memory:');
testDb.pragma('journal_mode = WAL');
testDb.pragma('foreign_keys = ON');

class AgentRepository extends TestBaseRepository {
  constructor() {
    super('agents', testDb);
  }

  getSearchColumns() {
    return ['name', 'description', 'system_prompt'];
  }

  findAllWithRelations(filters = {}) {
    let sql = `
      SELECT a.*, 
        p.name as provider_name,
        m.name as model_name
      FROM agents a
      LEFT JOIN providers p ON a.provider_id = p.id
      LEFT JOIN models m ON a.model_id = m.id
      WHERE a.deleted_at IS NULL
    `;
    const params = [];

    if (filters.search) {
      sql += ` AND (a.name LIKE ? OR a.description LIKE ?)`;
      params.push(`%${filters.search}%`, `%${filters.search}%`);
    }

    if (filters.provider_id) {
      sql += ` AND a.provider_id = ?`;
      params.push(filters.provider_id);
    }

    if (filters.model_id) {
      sql += ` AND a.model_id = ?`;
      params.push(filters.model_id);
    }

    if (filters.is_active !== undefined) {
      sql += ` AND a.is_active = ?`;
      params.push(filters.is_active);
    }

    sql += ` ORDER BY a.created_at DESC`;

    if (filters.limit) {
      sql += ` LIMIT ?`;
      params.push(filters.limit);
    }

    if (filters.offset) {
      sql += ` OFFSET ?`;
      params.push(filters.offset);
    }

    return this.db.prepare(sql).all(...params);
  }

  findByIdWithRelations(id) {
    const sql = `
      SELECT a.*, 
        p.name as provider_name,
        m.name as model_name
      FROM agents a
      LEFT JOIN providers p ON a.provider_id = p.id
      LEFT JOIN models m ON a.model_id = m.id
      WHERE a.id = ? AND a.deleted_at IS NULL
    `;
    return this.db.prepare(sql).get(id);
  }
}

let repo;

beforeAll(() => {
  testDb.exec(`
    CREATE TABLE IF NOT EXISTS agents (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT DEFAULT '',
      system_prompt TEXT DEFAULT '',
      provider_id INTEGER,
      model_id INTEGER,
      is_active INTEGER DEFAULT 1,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now')),
      deleted_at TEXT
    );

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

  repo = new AgentRepository();
});

afterAll(() => {
  testDb.close();
});

beforeEach(() => {
  testDb.exec('DELETE FROM agents');
  testDb.exec('DELETE FROM providers');
  testDb.exec('DELETE FROM models');
});

describe('AgentRepository', () => {
  describe('create', () => {
    it('creates an agent with required fields', () => {
      const agent = repo.create({
        name: 'Test Agent',
        description: 'A test agent',
        system_prompt: 'You are a test agent',
      });

      expect(agent).toBeDefined();
      expect(agent.id).toBeDefined();
      expect(agent.name).toBe('Test Agent');
      expect(agent.description).toBe('A test agent');
      expect(agent.system_prompt).toBe('You are a test agent');
      expect(agent.is_active).toBe(1);
    });
  });

  describe('findAllWithRelations', () => {
    it('returns agents with provider and model names', () => {
      // Create provider
      const provider = testDb.prepare(
        'INSERT INTO providers (name) VALUES (?)'
      ).run('Test Provider');

      // Create model
      const model = testDb.prepare(
        'INSERT INTO models (name, provider_id, model_id) VALUES (?, ?, ?)'
      ).run('Test Model', provider.lastInsertRowid, 'gpt-4');

      // Create agent with relations
      repo.create({
        name: 'Agent with Relations',
        provider_id: provider.lastInsertRowid,
        model_id: model.lastInsertRowid,
      });

      const agents = repo.findAllWithRelations();
      expect(agents).toHaveLength(1);
      expect(agents[0].provider_name).toBe('Test Provider');
      expect(agents[0].model_name).toBe('Test Model');
    });

    it('filters by provider_id', () => {
      const provider1 = testDb.prepare(
        'INSERT INTO providers (name) VALUES (?)'
      ).run('Provider 1');
      const provider2 = testDb.prepare(
        'INSERT INTO providers (name) VALUES (?)'
      ).run('Provider 2');

      repo.create({ name: 'Agent 1', provider_id: provider1.lastInsertRowid });
      repo.create({ name: 'Agent 2', provider_id: provider2.lastInsertRowid });

      const filtered = repo.findAllWithRelations({ provider_id: provider1.lastInsertRowid });
      expect(filtered).toHaveLength(1);
      expect(filtered[0].name).toBe('Agent 1');
    });
  });

  describe('findByIdWithRelations', () => {
    it('returns agent with provider and model names', () => {
      const provider = testDb.prepare(
        'INSERT INTO providers (name) VALUES (?)'
      ).run('Test Provider');

      const model = testDb.prepare(
        'INSERT INTO models (name, provider_id, model_id) VALUES (?, ?, ?)'
      ).run('Test Model', provider.lastInsertRowid, 'gpt-4');

      const agent = repo.create({
        name: 'Agent with Relations',
        provider_id: provider.lastInsertRowid,
        model_id: model.lastInsertRowid,
      });

      const found = repo.findByIdWithRelations(agent.id);
      expect(found).toBeDefined();
      expect(found.provider_name).toBe('Test Provider');
      expect(found.model_name).toBe('Test Model');
    });
  });

  describe('search', () => {
    it('searches by name', () => {
      repo.create({ name: 'Chat Agent', description: 'For chatting' });
      repo.create({ name: 'Code Agent', description: 'For coding' });

      const results = repo.findAll({ search: 'Chat' });
      expect(results).toHaveLength(1);
      expect(results[0].name).toBe('Chat Agent');
    });

    it('searches by description', () => {
      repo.create({ name: 'Agent 1', description: 'Helpful assistant' });
      repo.create({ name: 'Agent 2', description: 'Code generator' });

      const results = repo.findAll({ search: 'assistant' });
      expect(results).toHaveLength(1);
      expect(results[0].name).toBe('Agent 1');
    });
  });
});
