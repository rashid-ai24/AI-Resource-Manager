import { BaseRepository } from './BaseRepository.js';

export class ModelRepository extends BaseRepository {
  constructor() {
    super('models');
  }

  getSearchColumns() {
    return ['name', 'description'];
  }

  findAllWithProvider(filters = {}) {
    let sql = `
      SELECT m.*, p.name as provider_name
      FROM models m
      LEFT JOIN providers p ON m.provider_id = p.id
    `;
    const params = [];
    const conditions = [];

    if (filters.search) {
      conditions.push('(m.name LIKE ? OR m.description LIKE ?)');
      params.push(`%${filters.search}%`, `%${filters.search}%`);
    }

    if (filters.provider_id) {
      conditions.push('m.provider_id = ?');
      params.push(filters.provider_id);
    }

    if (filters.is_active !== undefined) {
      conditions.push('m.is_active = ?');
      params.push(filters.is_active);
    }

    if (conditions.length > 0) {
      sql += ' WHERE ' + conditions.join(' AND ');
    }

    sql += ' ORDER BY m.name ASC';

    return this.db.prepare(sql).all(...params);
  }

  findByIdWithProvider(id) {
    return this.db.prepare(`
      SELECT m.*, p.name as provider_name
      FROM models m
      LEFT JOIN providers p ON m.provider_id = p.id
      WHERE m.id = ?
    `).get(id);
  }
}
