import { BaseRepository } from './BaseRepository.js';

export class ApiKeyRepository extends BaseRepository {
  constructor() {
    super('api_keys');
  }

  getSearchColumns() {
    return ['name', 'description', 'key_prefix'];
  }

  findAllWithRelations(filters = {}) {
    let sql = `
      SELECT ak.*, 
        p.name as provider_name,
        a.name as account_name
      FROM api_keys ak
      LEFT JOIN providers p ON ak.provider_id = p.id
      LEFT JOIN accounts a ON ak.account_id = a.id
    `;
    const params = [];
    const conditions = [];

    if (filters.search) {
      conditions.push('(ak.name LIKE ? OR ak.description LIKE ? OR ak.key_prefix LIKE ?)');
      params.push(`%${filters.search}%`, `%${filters.search}%`, `%${filters.search}%`);
    }

    if (filters.provider_id) {
      conditions.push('ak.provider_id = ?');
      params.push(filters.provider_id);
    }

    if (filters.account_id) {
      conditions.push('ak.account_id = ?');
      params.push(filters.account_id);
    }

    if (filters.is_active !== undefined) {
      conditions.push('ak.is_active = ?');
      params.push(filters.is_active);
    }

    if (conditions.length > 0) {
      sql += ' WHERE ' + conditions.join(' AND ');
    }

    sql += ' ORDER BY ak.created_at DESC';

    return this.db.prepare(sql).all(...params);
  }

  findByIdWithRelations(id) {
    return this.db.prepare(`
      SELECT ak.*, 
        p.name as provider_name,
        a.name as account_name
      FROM api_keys ak
      LEFT JOIN providers p ON ak.provider_id = p.id
      LEFT JOIN accounts a ON ak.account_id = a.id
      WHERE ak.id = ?
    `).get(id);
  }

  updateLastUsed(id) {
    return this.db.prepare('UPDATE api_keys SET last_used_at = datetime(\'now\') WHERE id = ?').run(id);
  }
}
