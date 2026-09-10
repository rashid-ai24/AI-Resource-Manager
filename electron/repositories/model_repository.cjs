const BaseRepository = require('./base_repository.cjs');

class ModelRepository extends BaseRepository {
  constructor() {
    super('models');
  }

  getSearchColumns() {
    return ['name', 'description'];
  }

  findAllWithRelations(filters = {}) {
    let sql = `
      SELECT m.*, 
        p.name as provider_name
      FROM models m
      LEFT JOIN providers p ON m.provider_id = p.id
      WHERE m.deleted_at IS NULL
    `;
    const params = [];

    if (filters.search) {
      sql += ` AND (m.name LIKE ? OR m.description LIKE ?)`;
      params.push(`%${filters.search}%`, `%${filters.search}%`);
    }

    if (filters.provider_id) {
      sql += ` AND m.provider_id = ?`;
      params.push(filters.provider_id);
    }

    if (filters.is_active !== undefined) {
      sql += ` AND m.is_active = ?`;
      params.push(filters.is_active);
    }

    sql += ` ORDER BY m.created_at DESC`;

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
      SELECT m.*, 
        p.name as provider_name
      FROM models m
      LEFT JOIN providers p ON m.provider_id = p.id
      WHERE m.id = ? AND m.deleted_at IS NULL
    `;
    return this.db.prepare(sql).get(id);
  }
}

module.exports = ModelRepository;
