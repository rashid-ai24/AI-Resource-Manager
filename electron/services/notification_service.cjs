const repositories = require('../repositories/index.cjs');

class NotificationService {
  constructor() {
    this.notificationRepo = repositories.notifications;
    this.quotaRepo = repositories.quotas;
  }

  create(data) {
    return this.notificationRepo.createNotification(data);
  }

  checkQuotaWarnings() {
    const activeQuotas = this.quotaRepo.findActive();
    const warnings = [];

    for (const quota of activeQuotas) {
      if (quota.limit_value === 0) continue;

      const percentage = Math.round((quota.used_value / quota.limit_value) * 100);

      if (percentage >= 100) {
        this.create({
          title: `Quota Exceeded: ${quota.name}`,
          message: `You've exceeded your ${quota.quota_type} limit for ${quota.name}. Used ${quota.used_value.toLocaleString()} of ${quota.limit_value.toLocaleString()} ${quota.unit || 'units'}.`,
          notification_type: 'error',
          entity_type: 'quota',
          entity_id: quota.id,
        });
        warnings.push({ quota, type: 'exceeded', percentage });
      } else if (percentage >= 80) {
        this.create({
          title: `Quota Warning: ${quota.name}`,
          message: `You've used ${percentage}% of your ${quota.quota_type} limit for ${quota.name}. ${quota.used_value.toLocaleString()} of ${quota.limit_value.toLocaleString()} ${quota.unit || 'units'} used.`,
          notification_type: 'warning',
          entity_type: 'quota',
          entity_id: quota.id,
        });
        warnings.push({ quota, type: 'warning', percentage });
      }
    }

    return warnings;
  }

  getUnreadCount() {
    return this.notificationRepo.getUnreadCount();
  }

  markAsRead(id) {
    return this.notificationRepo.markAsRead(id);
  }

  markAllAsRead() {
    return this.notificationRepo.markAllAsRead();
  }

  list(filters = {}) {
    return this.notificationRepo.findAllWithFilters(filters);
  }

  getUnread() {
    return this.notificationRepo.getUnread();
  }

  deleteOlderThan(date) {
    return this.notificationRepo.deleteOlderThan(date);
  }
}

module.exports = NotificationService;
