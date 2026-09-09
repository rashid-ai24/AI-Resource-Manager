import { BaseRepository } from './BaseRepository.js';

export class SettingsRepository extends BaseRepository {
  constructor() {
    super('settings');
  }

  get(key) {
    const setting = this.db.prepare('SELECT * FROM settings WHERE key = ?').get(key);
    return setting ? setting.value : null;
  }

  set(key, value, description = '') {
    return this.db.prepare(`
      INSERT INTO settings (key, value, description, updated_at) 
      VALUES (?, ?, ?, datetime('now'))
      ON CONFLICT(key) DO UPDATE SET value = ?, updated_at = datetime('now')
    `).run(key, value, description, value);
  }

  getAll() {
    const settings = this.db.prepare('SELECT * FROM settings ORDER BY key').all();
    const result = {};
    for (const setting of settings) {
      result[setting.key] = setting.value;
    }
    return result;
  }

  delete(key) {
    return this.db.prepare('DELETE FROM settings WHERE key = ?').run(key);
  }

  getDefaults() {
    return this.db.prepare('SELECT * FROM settings WHERE key LIKE \'%default%\'').all();
  }
}
