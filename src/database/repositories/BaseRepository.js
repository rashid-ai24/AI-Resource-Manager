import db from '../init.js';

export class BaseRepository {
  constructor(tableName) {
    this.tableName = tableName;
    this.db = db;
  }

  findAll(filters = {}) {
    let sql = `SELECT * FROM ${this.tableName}`;
    const params = [];
    const conditions = [];

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
    return this.db.prepare(`SELECT * FROM ${this.tableName} WHERE id = ?`).get(id);
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

    const sql = `UPDATE ${this.tableName} SET ${setClause}, updated_at = datetime('now') WHERE id = ?`;
    this.db.prepare(sql).run(...values, id);

    return this.findById(id);
  }

  delete(id) {
    return this.db.prepare(`DELETE FROM ${this.tableName} WHERE id = ?`).run(id);
  }

  count(filters = {}) {
    let sql = `SELECT COUNT(*) as count FROM ${this.tableName}`;
    const params = [];
    const conditions = [];

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
