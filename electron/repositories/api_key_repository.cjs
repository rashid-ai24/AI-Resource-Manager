const BaseRepository = require('./base_repository.cjs');

class ApiKeyRepository extends BaseRepository {
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
      WHERE ak.deleted_at IS NULL
    `;
    const params = [];

    if (filters.search) {
      sql += ` AND (ak.name LIKE ? OR ak.description LIKE ? OR ak.key_prefix LIKE ?)`;
      params.push(`%${filters.search}%`, `%${filters.search}%`, `%${filters.search}%`);
    }

    if (filters.provider_id) {
      sql += ` AND ak.provider_id = ?`;
      params.push(filters.provider_id);
    }

    if (filters.account_id) {
      sql += ` AND ak.account_id = ?`;
      params.push(filters.account_id);
    }

    if (filters.is_active !== undefined) {
      sql += ` AND ak.is_active = ?`;
      params.push(filters.is_active);
    }

    sql += ` ORDER BY ak.created_at DESC`;

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
      SELECT ak.*, 
        p.name as provider_name,
        a.name as account_name
      FROM api_keys ak
      LEFT JOIN providers p ON ak.provider_id = p.id
      LEFT JOIN accounts a ON ak.account_id = a.id
      WHERE ak.id = ? AND ak.deleted_at IS NULL
    `;
    return this.db.prepare(sql).get(id);
  }
}

module.exports = ApiKeyRepository;
