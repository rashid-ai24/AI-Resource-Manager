import { BaseRepository } from './BaseRepository.js';

export class ProviderRepository extends BaseRepository {
  constructor() {
    super('providers');
  }

  getSearchColumns() {
    return ['name', 'description', 'base_url'];
  }

  findAllWithStats(filters = {}) {
    let sql = `
      SELECT p.*,
        (SELECT COUNT(*) FROM models WHERE provider_id = p.id) as model_count,
        (SELECT COUNT(*) FROM accounts WHERE provider_id = p.id) as account_count,
        (SELECT COUNT(*) FROM api_keys WHERE provider_id = p.id) as api_key_count
      FROM providers p
    `;
    const params = [];
    const conditions = [];

    if (filters.search) {
      conditions.push('(p.name LIKE ? OR p.description LIKE ?)');
      params.push(`%${filters.search}%`, `%${filters.search}%`);
    }

    if (filters.is_active !== undefined) {
      conditions.push('p.is_active = ?');
      params.push(filters.is_active);
    }

    if (conditions.length > 0) {
      sql += ' WHERE ' + conditions.join(' AND ');
    }

    sql += ' ORDER BY p.name ASC';

    return this.db.prepare(sql).all(...params);
  }

  findByIdWithStats(id) {
    const provider = this.db.prepare('SELECT * FROM providers WHERE id = ?').get(id);

    if (provider) {
      provider.models = this.db.prepare('SELECT * FROM models WHERE provider_id = ?').all(id);
      provider.accounts = this.db.prepare('SELECT * FROM accounts WHERE provider_id = ?').all(id);
      provider.api_keys = this.db.prepare('SELECT * FROM api_keys WHERE provider_id = ?').all(id);
    }

    return provider;
  }
}
