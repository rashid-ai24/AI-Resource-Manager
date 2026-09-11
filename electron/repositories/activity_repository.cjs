const BaseRepository = require('./base_repository.cjs');

class ActivityRepository extends BaseRepository {
  constructor() {
    super('activity_logs');
  }

  getSearchColumns() {
    return ['entity_name', 'details'];
  }

  log(entityType, entityId, entityName, action, details = '') {
    try {
      const sql = `INSERT INTO activity_logs (entity_type, entity_id, entity_name, action, details) VALUES (?, ?, ?, ?, ?)`;
      this.db.prepare(sql).run(entityType, entityId, entityName, action, details);
    } catch (error) {
      console.error('Activity logging failed:', error);
    }
  }

  findAllWithFilters(filters = {}) {
    let sql = `SELECT * FROM activity_logs WHERE 1=1`;
    const params = [];

    if (filters.entityType) {
      sql += ` AND entity_type = ?`;
      params.push(filters.entityType);
    }

    if (filters.action) {
      sql += ` AND action = ?`;
      params.push(filters.action);
    }

    if (filters.startDate) {
      sql += ` AND created_at >= ?`;
      params.push(filters.startDate);
    }

    if (filters.endDate) {
      sql += ` AND created_at <= ?`;
      params.push(filters.endDate);
    }

    if (filters.search) {
      sql += ` AND (entity_name LIKE ? OR details LIKE ?)`;
      params.push(`%${filters.search}%`, `%${filters.search}%`);
    }

    sql += ` ORDER BY created_at DESC`;

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

  findByEntity(entityType, entityId) {
    const sql = `SELECT * FROM activity_logs WHERE entity_type = ? AND entity_id = ? ORDER BY created_at DESC`;
    return this.db.prepare(sql).all(entityType, entityId);
  }

  getRecent(limit = 10) {
    const sql = `SELECT * FROM activity_logs ORDER BY created_at DESC LIMIT ?`;
    return this.db.prepare(sql).all(limit);
  }

  getStats() {
    const byEntityType = this.db.prepare(`
      SELECT entity_type, COUNT(*) as count
      FROM activity_logs
      GROUP BY entity_type
    `).all();

    const byAction = this.db.prepare(`
      SELECT action, COUNT(*) as count
      FROM activity_logs
      GROUP BY action
    `).all();

    const total = this.db.prepare(`SELECT COUNT(*) as count FROM activity_logs`).get().count;

    return { total, byEntityType, byAction };
  }

  deleteOlderThan(date) {
    return this.db.prepare(`DELETE FROM activity_logs WHERE created_at < ?`).run(date);
  }
}

module.exports = ActivityRepository;
