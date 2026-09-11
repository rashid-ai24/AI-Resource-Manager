const { ipcMain } = require('electron');
const repositories = require('../repositories/index.cjs');

function registerActivityHandlers() {
  const repo = repositories.activity;

  ipcMain.handle('activity:list', async (event, filters = {}) => {
    try {
      const data = repo.findAllWithFilters(filters);
      return { success: true, data };
    } catch (error) {
      console.error('activity:list failed:', error);
      return { success: false, error: error.message };
    }
  });

  ipcMain.handle('activity:getByEntity', async (event, entityType, entityId) => {
    try {
      const data = repo.findByEntity(entityType, entityId);
      return { success: true, data };
    } catch (error) {
      console.error('activity:getByEntity failed:', error);
      return { success: false, error: error.message };
    }
  });

  ipcMain.handle('activity:getRecent', async (event, limit = 10) => {
    try {
      const data = repo.getRecent(limit);
      return { success: true, data };
    } catch (error) {
      console.error('activity:getRecent failed:', error);
      return { success: false, error: error.message };
    }
  });

  ipcMain.handle('activity:getStats', async () => {
    try {
      const data = repo.getStats();
      return { success: true, data };
    } catch (error) {
      console.error('activity:getStats failed:', error);
      return { success: false, error: error.message };
    }
  });
}

module.exports = { registerActivityHandlers };
