const BaseRepository = require('./base_repository.cjs');

class NoteRepository extends BaseRepository {
  constructor() {
    super('notes');
  }

  getSearchColumns() {
    return ['title', 'content'];
  }

  findAllWithRelations(filters = {}) {
    let sql = `
      SELECT n.*, 
        a.name as agent_name,
        p.name as project_name
      FROM notes n
      LEFT JOIN agents a ON n.agent_id = a.id
      LEFT JOIN projects p ON n.project_id = p.id
      WHERE n.deleted_at IS NULL
    `;
    const params = [];

    if (filters.search) {
      sql += ` AND (n.title LIKE ? OR n.content LIKE ?)`;
      params.push(`%${filters.search}%`, `%${filters.search}%`);
    }

    if (filters.agent_id) {
      sql += ` AND n.agent_id = ?`;
      params.push(filters.agent_id);
    }

    if (filters.project_id) {
      sql += ` AND n.project_id = ?`;
      params.push(filters.project_id);
    }

    sql += ` ORDER BY n.created_at DESC`;

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
      SELECT n.*, 
        a.name as agent_name,
        p.name as project_name
      FROM notes n
      LEFT JOIN agents a ON n.agent_id = a.id
      LEFT JOIN projects p ON n.project_id = p.id
      WHERE n.id = ? AND n.deleted_at IS NULL
    `;
    return this.db.prepare(sql).get(id);
  }
}

module.exports = NoteRepository;
