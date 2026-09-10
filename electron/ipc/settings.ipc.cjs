const { ipcMain } = require('electron');
const repositories = require('../repositories/index.cjs');

function registerSettingsHandlers() {
  const repo = repositories.settings;

  ipcMain.handle('settings:get', async (event, key) => {
    try {
      const data = repo.get(key);
      return { success: true, data };
    } catch (error) {
      console.error('settings:get failed:', error);
      return { success: false, error: error.message };
    }
  });

  ipcMain.handle('settings:getAll', async (event) => {
    try {
      const data = repo.getAll();
      return { success: true, data };
    } catch (error) {
      console.error('settings:getAll failed:', error);
      return { success: false, error: error.message };
    }
  });

  ipcMain.handle('settings:set', async (event, key, value, description = '') => {
    try {
      repo.set(key, value, description);
      return { success: true };
    } catch (error) {
      console.error('settings:set failed:', error);
      return { success: false, error: error.message };
    }
  });

  ipcMain.handle('settings:delete', async (event, key) => {
    try {
      repo.delete(key);
      return { success: true };
    } catch (error) {
      console.error('settings:delete failed:', error);
      return { success: false, error: error.message };
    }
  });
}

module.exports = { registerSettingsHandlers };
