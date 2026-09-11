// Test-specific BaseRepository that accepts db as constructor parameter
class TestBaseRepository {
  constructor(tableName, db) {
    this.tableName = tableName;
    this.db = db;
  }

  findAll(filters = {}) {
    let sql = `SELECT * FROM ${this.tableName}`;
    const params = [];
    const conditions = [];

    if (filters.deleted_at) {
      conditions.push('deleted_at IS NOT NULL');
    } else {
      conditions.push('deleted_at IS NULL');
    }

    if (filters.search) {
      const columns = this.getSearchColumns();
      if (columns.length > 0) {
        const searchConditions = columns.map(col => `${col} LIKE ?`);
        conditions.push(`(${searchConditions.join(' OR ')})`);
        columns.forEach(() => params.push(`%${filters.search}%`));
      }
    }

    if (filters.is_active !== undefined) {
      conditions.push('is_active = ?');
      params.push(filters.is_active);
    }

    if (conditions.length > 0) {
      sql += ' WHERE ' + conditions.join(' AND ');
    }

    sql += ' ORDER BY created_at DESC';

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

  findById(id) {
    return this.db.prepare(`SELECT * FROM ${this.tableName} WHERE id = ? AND deleted_at IS NULL`).get(id);
  }

  create(data) {
    const columns = Object.keys(data);
    const values = Object.values(data);
    const placeholders = columns.map(() => '?').join(', ');

    const sql = `INSERT INTO ${this.tableName} (${columns.join(', ')}) VALUES (${placeholders})`;
    const result = this.db.prepare(sql).run(...values);

    return this.findById(result.lastInsertRowid);
  }

  update(id, data) {
    const columns = Object.keys(data);
    const values = Object.values(data);
    const setClause = columns.map(col => `${col} = ?`).join(', ');

    const sql = `UPDATE ${this.tableName} SET ${setClause}, updated_at = datetime('now') WHERE id = ? AND deleted_at IS NULL`;
    this.db.prepare(sql).run(...values, id);

    return this.findById(id);
  }

  delete(id) {
    return this.db.prepare(`UPDATE ${this.tableName} SET deleted_at = datetime('now') WHERE id = ?`).run(id);
  }

  hardDelete(id) {
    return this.db.prepare(`DELETE FROM ${this.tableName} WHERE id = ?`).run(id);
  }

  count(filters = {}) {
    let sql = `SELECT COUNT(*) as count FROM ${this.tableName}`;
    const params = [];
    const conditions = [];

    conditions.push('deleted_at IS NULL');

    if (filters.is_active !== undefined) {
      conditions.push('is_active = ?');
      params.push(filters.is_active);
    }

    if (conditions.length > 0) {
      sql += ' WHERE ' + conditions.join(' AND ');
    }

    return this.db.prepare(sql).get(...params).count;
  }

  getSearchColumns() {
    return ['name', 'description'];
  }
}

export default TestBaseRepository;
