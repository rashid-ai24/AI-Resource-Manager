const BaseRepository = require('./base_repository.cjs');

class AccountRepository extends BaseRepository {
  constructor() {
    super('accounts');
  }

  getSearchColumns() {
    return ['name', 'email', 'description'];
  }

  findAllWithRelations(filters = {}) {
    let sql = `
      SELECT a.*, 
        p.name as provider_name
      FROM accounts a
      LEFT JOIN providers p ON a.provider_id = p.id
      WHERE a.deleted_at IS NULL
    `;
    const params = [];

    if (filters.search) {
      sql += ` AND (a.name LIKE ? OR a.email LIKE ? OR a.description LIKE ?)`;
      params.push(`%${filters.search}%`, `%${filters.search}%`, `%${filters.search}%`);
    }

    if (filters.provider_id) {
      sql += ` AND a.provider_id = ?`;
      params.push(filters.provider_id);
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
        p.name as provider_name
      FROM accounts a
      LEFT JOIN providers p ON a.provider_id = p.id
      WHERE a.id = ? AND a.deleted_at IS NULL
    `;
    return this.db.prepare(sql).get(id);
  }
}

module.exports = AccountRepository;
