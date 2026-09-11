const { ipcMain } = require('electron');
const NotificationService = require('../services/notification_service.cjs');

function registerNotificationHandlers() {
  const service = new NotificationService();

  ipcMain.handle('notifications:list', async (event, filters = {}) => {
    try {
      const data = service.list(filters);
      return { success: true, data };
    } catch (error) {
      console.error('notifications:list failed:', error);
      return { success: false, error: error.message };
    }
  });

  ipcMain.handle('notifications:getUnread', async () => {
    try {
      const data = service.getUnread();
      return { success: true, data };
    } catch (error) {
      console.error('notifications:getUnread failed:', error);
      return { success: false, error: error.message };
    }
  });

  ipcMain.handle('notifications:unreadCount', async () => {
    try {
      const data = service.getUnreadCount();
      return { success: true, data };
    } catch (error) {
      console.error('notifications:unreadCount failed:', error);
      return { success: false, error: error.message };
    }
  });

  ipcMain.handle('notifications:markAsRead', async (event, id) => {
    try {
      const data = service.markAsRead(id);
      return { success: true, data };
    } catch (error) {
      console.error('notifications:markAsRead failed:', error);
      return { success: false, error: error.message };
    }
  });

  ipcMain.handle('notifications:markAllAsRead', async () => {
    try {
      service.markAllAsRead();
      return { success: true, data: null };
    } catch (error) {
      console.error('notifications:markAllAsRead failed:', error);
      return { success: false, error: error.message };
    }
  });

  ipcMain.handle('notifications:create', async (event, data) => {
    try {
      const created = service.create(data);
      return { success: true, data: created };
    } catch (error) {
      console.error('notifications:create failed:', error);
      return { success: false, error: error.message };
    }
  });

  ipcMain.handle('notifications:checkQuotas', async () => {
    try {
      const data = service.checkQuotaWarnings();
      return { success: true, data };
    } catch (error) {
      console.error('notifications:checkQuotas failed:', error);
      return { success: false, error: error.message };
    }
  });

  ipcMain.handle('notifications:deleteOlderThan', async (event, date) => {
    try {
      service.deleteOlderThan(date);
      return { success: true, data: null };
    } catch (error) {
      console.error('notifications:deleteOlderThan failed:', error);
      return { success: false, error: error.message };
    }
  });
}

module.exports = { registerNotificationHandlers };
