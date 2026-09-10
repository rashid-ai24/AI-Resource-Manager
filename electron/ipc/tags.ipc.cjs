const { ipcMain } = require('electron');
const repositories = require('../repositories/index.cjs');
const { TagCreateSchema, TagUpdateSchema, ListFilterSchema } = require('../lib/validators.cjs');

function registerTagHandlers() {
  const repo = repositories.tags;

  ipcMain.handle('tags:list', async (event, filters = {}) => {
    try {
      const validatedFilters = ListFilterSchema.parse(filters);
      const data = repo.findAll(validatedFilters);
      return { success: true, data };
    } catch (error) {
      console.error('tags:list failed:', error);
      return { success: false, error: error.message };
    }
  });

  ipcMain.handle('tags:get', async (event, id) => {
    try {
      const data = repo.findById(id);
      if (!data) {
        return { success: false, error: 'Tag not found' };
      }
      return { success: true, data };
    } catch (error) {
      console.error('tags:get failed:', error);
      return { success: false, error: error.message };
    }
  });

  ipcMain.handle('tags:create', async (event, data) => {
    try {
      const validated = TagCreateSchema.parse(data);
      const tag = repo.create(validated);
      return { success: true, data: tag };
    } catch (error) {
      console.error('tags:create failed:', error);
      return { success: false, error: error.message };
    }
  });

  ipcMain.handle('tags:update', async (event, id, data) => {
    try {
      const validated = TagUpdateSchema.parse(data);
      const tag = repo.update(id, validated);
      if (!tag) {
        return { success: false, error: 'Tag not found' };
      }
      return { success: true, data: tag };
    } catch (error) {
      console.error('tags:update failed:', error);
      return { success: false, error: error.message };
    }
  });

  ipcMain.handle('tags:delete', async (event, id) => {
    try {
      const tag = repo.findById(id);
      if (!tag) {
        return { success: false, error: 'Tag not found' };
      }
      repo.delete(id);
      return { success: true, data: { id } };
    } catch (error) {
      console.error('tags:delete failed:', error);
      return { success: false, error: error.message };
    }
  });

  ipcMain.handle('tags:getByEntity', async (event, entityType, entityId) => {
    try {
      const data = repo.findByEntity(entityType, entityId);
      return { success: true, data };
    } catch (error) {
      console.error('tags:getByEntity failed:', error);
      return { success: false, error: error.message };
    }
  });

  ipcMain.handle('tags:addToEntity', async (event, entityType, entityId, tagId) => {
    try {
      repo.addToEntity(entityType, entityId, tagId);
      return { success: true };
    } catch (error) {
      console.error('tags:addToEntity failed:', error);
      return { success: false, error: error.message };
    }
  });

  ipcMain.handle('tags:removeFromEntity', async (event, entityType, entityId, tagId) => {
    try {
      repo.removeFromEntity(entityType, entityId, tagId);
      return { success: true };
    } catch (error) {
      console.error('tags:removeFromEntity failed:', error);
      return { success: false, error: error.message };
    }
  });
}

module.exports = { registerTagHandlers };
