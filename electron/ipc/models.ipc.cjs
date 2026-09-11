const { ipcMain } = require('electron');
const repositories = require('../repositories/index.cjs');
const { ModelCreateSchema, ModelUpdateSchema, ListFilterSchema } = require('../lib/validators.cjs');

function registerModelHandlers() {
  const repo = repositories.models;

  ipcMain.handle('models:list', async (event, filters = {}) => {
    try {
      const validatedFilters = ListFilterSchema.parse(filters);
      const data = repo.findAllWithRelations(validatedFilters);
      return { success: true, data };
    } catch (error) {
      console.error('models:list failed:', error);
      return { success: false, error: error.message };
    }
  });

  ipcMain.handle('models:get', async (event, id) => {
    try {
      const data = repo.findByIdWithRelations(id);
      if (!data) {
        return { success: false, error: 'Model not found' };
      }
      return { success: true, data };
    } catch (error) {
      console.error('models:get failed:', error);
      return { success: false, error: error.message };
    }
  });

  ipcMain.handle('models:create', async (event, data) => {
    try {
      const validated = ModelCreateSchema.parse(data);
      const model = repo.create(validated);
      const modelData = repo.findByIdWithRelations(model.id);
      repositories.activity.log('model', model.id, model.name, 'created', '');
      return { success: true, data: modelData };
    } catch (error) {
      console.error('models:create failed:', error);
      return { success: false, error: error.message };
    }
  });

  ipcMain.handle('models:update', async (event, id, data) => {
    try {
      const validated = ModelUpdateSchema.parse(data);
      repo.update(id, validated);
      const model = repo.findByIdWithRelations(id);
      if (!model) {
        return { success: false, error: 'Model not found' };
      }
      repositories.activity.log('model', id, model.name, 'updated', '');
      return { success: true, data: model };
    } catch (error) {
      console.error('models:update failed:', error);
      return { success: false, error: error.message };
    }
  });

  ipcMain.handle('models:delete', async (event, id) => {
    try {
      const model = repo.findById(id);
      if (!model) {
        return { success: false, error: 'Model not found' };
      }
      repo.delete(id);
      repositories.activity.log('model', id, model.name, 'deleted', '');
      return { success: true, data: { id } };
    } catch (error) {
      console.error('models:delete failed:', error);
      return { success: false, error: error.message };
    }
  });
}

module.exports = { registerModelHandlers };
