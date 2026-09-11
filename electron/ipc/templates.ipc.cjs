const { ipcMain } = require('electron');
const repositories = require('../repositories/index.cjs');

function registerTemplateHandlers() {
  const repo = repositories.templates;

  ipcMain.handle('templates:list', async (event, filters = {}) => {
    try {
      const data = repo.findAllWithFilters(filters);
      return { success: true, data };
    } catch (error) {
      console.error('templates:list failed:', error);
      return { success: false, error: error.message };
    }
  });

  ipcMain.handle('templates:get', async (event, id) => {
    try {
      const data = repo.findById(id);
      return { success: true, data };
    } catch (error) {
      console.error('templates:get failed:', error);
      return { success: false, error: error.message };
    }
  });

  ipcMain.handle('templates:getConfig', async (event, id) => {
    try {
      const data = repo.getConfig(id);
      return { success: true, data };
    } catch (error) {
      console.error('templates:getConfig failed:', error);
      return { success: false, error: error.message };
    }
  });

  ipcMain.handle('templates:create', async (event, data) => {
    try {
      const created = repo.createWithConfig(data);
      return { success: true, data: created };
    } catch (error) {
      console.error('templates:create failed:', error);
      return { success: false, error: error.message };
    }
  });

  ipcMain.handle('templates:update', async (event, id, data) => {
    try {
      const updated = repo.updateWithConfig(id, data);
      return { success: true, data: updated };
    } catch (error) {
      console.error('templates:update failed:', error);
      return { success: false, error: error.message };
    }
  });

  ipcMain.handle('templates:delete', async (event, id) => {
    try {
      repo.delete(id);
      return { success: true, data: { id } };
    } catch (error) {
      console.error('templates:delete failed:', error);
      return { success: false, error: error.message };
    }
  });

  ipcMain.handle('templates:findByType', async (event, templateType) => {
    try {
      const data = repo.findByType(templateType);
      return { success: true, data };
    } catch (error) {
      console.error('templates:findByType failed:', error);
      return { success: false, error: error.message };
    }
  });

  ipcMain.handle('templates:duplicate', async (event, id) => {
    try {
      const data = repo.duplicate(id);
      return { success: true, data };
    } catch (error) {
      console.error('templates:duplicate failed:', error);
      return { success: false, error: error.message };
    }
  });
}

module.exports = { registerTemplateHandlers };
