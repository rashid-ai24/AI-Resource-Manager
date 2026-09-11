const { ipcMain } = require('electron');
const repositories = require('../repositories/index.cjs');

function registerQuotaHandlers() {
  const repo = repositories.quotas;

  ipcMain.handle('quotas:list', async (event, filters = {}) => {
    try {
      const data = repo.findAllWithFilters(filters);
      return { success: true, data };
    } catch (error) {
      console.error('quotas:list failed:', error);
      return { success: false, error: error.message };
    }
  });

  ipcMain.handle('quotas:get', async (event, id) => {
    try {
      const data = repo.findById(id);
      return { success: true, data };
    } catch (error) {
      console.error('quotas:get failed:', error);
      return { success: false, error: error.message };
    }
  });

  ipcMain.handle('quotas:create', async (event, data) => {
    try {
      const created = repo.create(data);
      return { success: true, data: created };
    } catch (error) {
      console.error('quotas:create failed:', error);
      return { success: false, error: error.message };
    }
  });

  ipcMain.handle('quotas:update', async (event, id, data) => {
    try {
      const updated = repo.update(id, data);
      return { success: true, data: updated };
    } catch (error) {
      console.error('quotas:update failed:', error);
      return { success: false, error: error.message };
    }
  });

  ipcMain.handle('quotas:delete', async (event, id) => {
    try {
      repo.delete(id);
      return { success: true, data: { id } };
    } catch (error) {
      console.error('quotas:delete failed:', error);
      return { success: false, error: error.message };
    }
  });

  ipcMain.handle('quotas:active', async () => {
    try {
      const data = repo.findActive();
      return { success: true, data };
    } catch (error) {
      console.error('quotas:active failed:', error);
      return { success: false, error: error.message };
    }
  });

  ipcMain.handle('quotas:upcomingResets', async (event, limit = 10) => {
    try {
      const data = repo.findUpcomingResets(limit);
      return { success: true, data };
    } catch (error) {
      console.error('quotas:upcomingResets failed:', error);
      return { success: false, error: error.message };
    }
  });

  ipcMain.handle('quotas:expired', async () => {
    try {
      const data = repo.findExpired();
      return { success: true, data };
    } catch (error) {
      console.error('quotas:expired failed:', error);
      return { success: false, error: error.message };
    }
  });

  ipcMain.handle('quotas:updateUsage', async (event, id, usedValue) => {
    try {
      const data = repo.updateUsage(id, usedValue);
      return { success: true, data };
    } catch (error) {
      console.error('quotas:updateUsage failed:', error);
      return { success: false, error: error.message };
    }
  });

  ipcMain.handle('quotas:incrementUsage', async (event, id, amount = 1) => {
    try {
      const data = repo.incrementUsage(id, amount);
      return { success: true, data };
    } catch (error) {
      console.error('quotas:incrementUsage failed:', error);
      return { success: false, error: error.message };
    }
  });

  ipcMain.handle('quotas:resetUsage', async (event, id) => {
    try {
      const data = repo.resetUsage(id);
      return { success: true, data };
    } catch (error) {
      console.error('quotas:resetUsage failed:', error);
      return { success: false, error: error.message };
    }
  });
}

module.exports = { registerQuotaHandlers };
