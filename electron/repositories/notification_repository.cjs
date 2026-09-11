const BaseRepository = require('./base_repository.cjs');

class NotificationRepository extends BaseRepository {
  constructor() {
    super('notifications');
  }

  getSearchColumns() {
    return ['title', 'message'];
  }

  findAllWithFilters(filters = {}) {
    let sql = `SELECT * FROM notifications WHERE deleted_at IS NULL`;
    const params = [];

    if (filters.isRead !== undefined) {
      sql += ` AND is_read = ?`;
      params.push(filters.isRead);
    }

    if (filters.notificationType) {
      sql += ` AND notification_type = ?`;
      params.push(filters.notificationType);
    }

    if (filters.entityType) {
      sql += ` AND entity_type = ?`;
      params.push(filters.entityType);
    }

    if (filters.search) {
      sql += ` AND (title LIKE ? OR message LIKE ?)`;
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

  getUnread() {
    return this.db.prepare(
      `SELECT * FROM notifications WHERE is_read = 0 AND deleted_at IS NULL ORDER BY created_at DESC`
    ).all();
  }

  getUnreadCount() {
    return this.db.prepare(
      `SELECT COUNT(*) as count FROM notifications WHERE is_read = 0 AND deleted_at IS NULL`
    ).get().count;
  }

  markAsRead(id) {
    this.db.prepare(
      `UPDATE notifications SET is_read = 1 WHERE id = ? AND deleted_at IS NULL`
    ).run(id);
    return this.findById(id);
  }

  markAllAsRead() {
    this.db.prepare(
      `UPDATE notifications SET is_read = 1 WHERE is_read = 0 AND deleted_at IS NULL`
    ).run();
  }

  createNotification(data) {
    return this.create({
      title: data.title,
      message: data.message,
      notification_type: data.notification_type || 'info',
      entity_type: data.entity_type || null,
      entity_id: data.entity_id || null,
      action_url: data.action_url || null,
    });
  }

  deleteOlderThan(date) {
    return this.db.prepare(
      `UPDATE notifications SET deleted_at = datetime('now') WHERE created_at < ? AND deleted_at IS NULL`
    ).run(date);
  }
}

module.exports = NotificationRepository;
