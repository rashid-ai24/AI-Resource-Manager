const BaseRepository = require('./base_repository.cjs');

class QuotaRepository extends BaseRepository {
  constructor() {
    super('quotas');
  }

  getSearchColumns() {
    return ['name'];
  }

  findByProvider(providerId) {
    return this.db.prepare(
      `SELECT * FROM quotas WHERE provider_id = ? AND deleted_at IS NULL ORDER BY created_at DESC`
    ).all(providerId);
  }

  findByAccount(accountId) {
    return this.db.prepare(
      `SELECT * FROM quotas WHERE account_id = ? AND deleted_at IS NULL ORDER BY created_at DESC`
    ).all(accountId);
  }

  findActive() {
    return this.db.prepare(
      `SELECT * FROM quotas WHERE is_active = 1 AND deleted_at IS NULL ORDER BY next_reset_at ASC`
    ).all();
  }

  findUpcomingResets(limit = 10) {
    return this.db.prepare(
      `SELECT * FROM quotas WHERE is_active = 1 AND deleted_at IS NULL AND next_reset_at IS NOT NULL AND next_reset_at >= datetime('now') ORDER BY next_reset_at ASC LIMIT ?`
    ).all(limit);
  }

  findExpired() {
    return this.db.prepare(
      `SELECT * FROM quotas WHERE is_active = 1 AND deleted_at IS NULL AND next_reset_at IS NOT NULL AND next_reset_at < datetime('now')`
    ).all();
  }

  updateUsage(id, usedValue) {
    this.db.prepare(
      `UPDATE quotas SET used_value = ?, updated_at = datetime('now') WHERE id = ? AND deleted_at IS NULL`
    ).run(usedValue, id);
    return this.findById(id);
  }

  incrementUsage(id, amount = 1) {
    this.db.prepare(
      `UPDATE quotas SET used_value = used_value + ?, updated_at = datetime('now') WHERE id = ? AND deleted_at IS NULL`
    ).run(amount, id);
    return this.findById(id);
  }

  resetUsage(id) {
    this.db.prepare(
      `UPDATE quotas SET used_value = 0, updated_at = datetime('now') WHERE id = ? AND deleted_at IS NULL`
    ).run(id);
    return this.findById(id);
  }

  getUsagePercentage(id) {
    const quota = this.findById(id);
    if (!quota || quota.limit_value === 0) return 0;
    return Math.round((quota.used_value / quota.limit_value) * 100);
  }
}

module.exports = QuotaRepository;
