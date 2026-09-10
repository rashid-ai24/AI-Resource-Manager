const BaseRepository = require('./base_repository.cjs');

class TagRepository extends BaseRepository {
  constructor() {
    super('tags');
  }

  getSearchColumns() {
    return ['name'];
  }

  findAll(filters = {}) {
    let sql = `SELECT * FROM ${this.tableName}`;
    const params = [];
    const conditions = [];

    if (filters.search) {
      conditions.push('name LIKE ?');
      params.push(`%${filters.search}%`);
    }

    if (conditions.length > 0) {
      sql += ' WHERE ' + conditions.join(' AND ');
    }

    sql += ' ORDER BY name ASC';

    if (filters.limit) {
      sql += ' LIMIT ?';
      params.push(filters.limit);
    }

    if (filters.offset) {
      sql += ' OFFSET ?';
      params.push(filters.offset);
    }

    return this.db.prepare(sql).all(...params);
  }

  findByEntity(entityType, entityId) {
    const junctionTable = `${entityType}_tags`;
    const entityColumn = `${entityType}_id`;

    const sql = `
      SELECT t.*
      FROM tags t
      INNER JOIN ${junctionTable} jt ON t.id = jt.tag_id
      WHERE jt.${entityColumn} = ?
      ORDER BY t.name ASC
    `;
    return this.db.prepare(sql).all(entityId);
  }

  addToEntity(entityType, entityId, tagId) {
    const junctionTable = `${entityType}_tags`;
    const entityColumn = `${entityType}_id`;

    const sql = `INSERT OR IGNORE INTO ${junctionTable} (${entityColumn}, tag_id) VALUES (?, ?)`;
    return this.db.prepare(sql).run(entityId, tagId);
  }

  removeFromEntity(entityType, entityId, tagId) {
    const junctionTable = `${entityType}_tags`;
    const entityColumn = `${entityType}_id`;

    const sql = `DELETE FROM ${junctionTable} WHERE ${entityColumn} = ? AND tag_id = ?`;
    return this.db.prepare(sql).run(entityId, tagId);
  }
}

module.exports = TagRepository;
