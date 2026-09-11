const { ipcMain } = require('electron');
const repositories = require('../repositories/index.cjs');

function registerFavoriteHandlers() {
  const repo = repositories.favorites;

  ipcMain.handle('favorites:list', async (event, filters = {}) => {
    try {
      const data = repo.findAllWithFilters(filters);
      return { success: true, data };
    } catch (error) {
      console.error('favorites:list failed:', error);
      return { success: false, error: error.message };
    }
  });

  ipcMain.handle('favorites:get', async (event, id) => {
    try {
      const data = repo.findById(id);
      return { success: true, data };
    } catch (error) {
      console.error('favorites:get failed:', error);
      return { success: false, error: error.message };
    }
  });

  ipcMain.handle('favorites:toggle', async (event, entityType, entityId, entityName, notes) => {
    try {
      const data = repo.toggle(entityType, entityId, entityName, notes);
      return { success: true, data };
    } catch (error) {
      console.error('favorites:toggle failed:', error);
      return { success: false, error: error.message };
    }
  });

  ipcMain.handle('favorites:isFavorited', async (event, entityType, entityId) => {
    try {
      const data = repo.isFavorited(entityType, entityId);
      return { success: true, data };
    } catch (error) {
      console.error('favorites:isFavorited failed:', error);
      return { success: false, error: error.message };
    }
  });

  ipcMain.handle('favorites:findByType', async (event, entityType) => {
    try {
      const data = repo.findByType(entityType);
      return { success: true, data };
    } catch (error) {
      console.error('favorites:findByType failed:', error);
      return { success: false, error: error.message };
    }
  });

  ipcMain.handle('favorites:count', async (event, entityType) => {
    try {
      const data = repo.getCount(entityType);
      return { success: true, data };
    } catch (error) {
      console.error('favorites:count failed:', error);
      return { success: false, error: error.message };
    }
  });

  ipcMain.handle('favorites:delete', async (event, id) => {
    try {
      repo.hardDelete(id);
      return { success: true, data: { id } };
    } catch (error) {
      console.error('favorites:delete failed:', error);
      return { success: false, error: error.message };
    }
  });
}

module.exports = { registerFavoriteHandlers };
