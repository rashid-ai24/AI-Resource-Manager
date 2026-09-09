import { BaseRepository } from './BaseRepository.js';

export class AccountRepository extends BaseRepository {
  constructor() {
    super('accounts');
  }

  getSearchColumns() {
    return ['name', 'email', 'description'];
  }

  findAllWithProvider(filters = {}) {
    let sql = `
      SELECT a.*, p.name as provider_name
      FROM accounts a
      LEFT JOIN providers p ON a.provider_id = p.id
    `;
    const params = [];
    const conditions = [];

    if (filters.search) {
      conditions.push('(a.name LIKE ? OR a.email LIKE ? OR a.description LIKE ?)');
      params.push(`%${filters.search}%`, `%${filters.search}%`, `%${filters.search}%`);
    }

    if (filters.provider_id) {
      conditions.push('a.provider_id = ?');
      params.push(filters.provider_id);
    }

    if (filters.is_active !== undefined) {
      conditions.push('a.is_active = ?');
      params.push(filters.is_active);
    }

    if (conditions.length > 0) {
      sql += ' WHERE ' + conditions.join(' AND ');
    }

    sql += ' ORDER BY a.name ASC';

    return this.db.prepare(sql).all(...params);
  }

  findByIdWithProvider(id) {
    return this.db.prepare(`
      SELECT a.*, p.name as provider_name
      FROM accounts a
      LEFT JOIN providers p ON a.provider_id = p.id
      WHERE a.id = ?
    `).get(id);
  }
}
