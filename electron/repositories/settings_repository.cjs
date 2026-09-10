const db = require('../database.cjs');

class SettingsRepository {
  constructor() {
    this.db = db;
    this.tableName = 'settings';
  }

  get(key) {
    const row = this.db.prepare(`SELECT * FROM ${this.tableName} WHERE key = ?`).get(key);
    if (row && row.value) {
      try {
        row.value = JSON.parse(row.value);
      } catch {
        // Keep as string if not valid JSON
      }
    }
    return row;
  }

  getAll() {
    const rows = this.db.prepare(`SELECT * FROM ${this.tableName}`).all();
    const settings = {};
    for (const row of rows) {
      try {
        settings[row.key] = JSON.parse(row.value);
      } catch {
        settings[row.key] = row.value;
      }
    }
    return settings;
  }

  set(key, value, description = '') {
    const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
    const sql = `
      INSERT INTO ${this.tableName} (key, value, description, updated_at) 
      VALUES (?, ?, ?, datetime('now'))
      ON CONFLICT(key) DO UPDATE SET 
        value = excluded.value,
        description = excluded.description,
        updated_at = datetime('now')
    `;
    return this.db.prepare(sql).run(key, stringValue, description);
  }

  delete(key) {
    return this.db.prepare(`DELETE FROM ${this.tableName} WHERE key = ?`).run(key);
  }
}

module.exports = SettingsRepository;
