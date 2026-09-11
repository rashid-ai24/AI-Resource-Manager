const BaseRepository = require('./base_repository.cjs');

class FavoriteRepository extends BaseRepository {
  constructor() {
    super('favorites');
  }

  getSearchColumns() {
    return ['entity_name', 'notes'];
  }

  findByEntity(entityType, entityId) {
    return this.db.prepare(
      `SELECT * FROM favorites WHERE entity_type = ? AND entity_id = ?`
    ).get(entityType, entityId);
  }

  findByType(entityType) {
    return this.db.prepare(
      `SELECT * FROM favorites WHERE entity_type = ? ORDER BY created_at DESC`
    ).all(entityType);
  }

  findAllWithFilters(filters = {}) {
    let sql = `SELECT * FROM favorites WHERE 1=1`;
    const params = [];

    if (filters.entityType) {
      sql += ` AND entity_type = ?`;
      params.push(filters.entityType);
    }

    if (filters.search) {
      sql += ` AND (entity_name LIKE ? OR notes LIKE ?)`;
      params.push(`%${filters.search}%`, `%${filters.search}%`);
    }

    sql += ` ORDER BY created_at DESC`;

    if (filters.limit) {
      sql += ` LIMIT ?`;
      params.push(filters.limit);
    }

    return this.db.prepare(sql).all(...params);
  }

  isFavorited(entityType, entityId) {
    const fav = this.findByEntity(entityType, entityId);
    return !!fav;
  }

  toggle(entityType, entityId, entityName = '', notes = '') {
    const existing = this.findByEntity(entityType, entityId);
    if (existing) {
      this.db.prepare(`DELETE FROM favorites WHERE id = ?`).run(existing.id);
      return { action: 'removed', id: existing.id };
    } else {
      const result = this.db.prepare(
        `INSERT INTO favorites (entity_type, entity_id, entity_name, notes) VALUES (?, ?, ?, ?)`
      ).run(entityType, entityId, entityName, notes);
      return { action: 'added', id: result.lastInsertRowid };
    }
  }

  getCount(entityType) {
    const sql = entityType
      ? `SELECT COUNT(*) as count FROM favorites WHERE entity_type = ?`
      : `SELECT COUNT(*) as count FROM favorites`;
    const params = entityType ? [entityType] : [];
    return this.db.prepare(sql).get(...params).count;
  }
}

module.exports = FavoriteRepository;
