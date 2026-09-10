const BaseRepository = require('./base_repository.cjs');

class AgentRepository extends BaseRepository {
  constructor() {
    super('agents');
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

  createWithRelations(data) {
    const agent = this.create(data);
    return this.findByIdWithRelations(agent.id);
  }

  updateWithRelations(id, data) {
    this.update(id, data);
    return this.findByIdWithRelations(id);
  }
}

module.exports = AgentRepository;
