const { ipcMain } = require('electron');
const repositories = require('../repositories/index.cjs');
const { ProviderCreateSchema, ProviderUpdateSchema, ListFilterSchema } = require('../lib/validators.cjs');

function registerProviderHandlers() {
  const repo = repositories.providers;

  ipcMain.handle('providers:list', async (event, filters = {}) => {
    try {
      const validatedFilters = ListFilterSchema.parse(filters);
      const data = repo.findAll(validatedFilters);
      return { success: true, data };
    } catch (error) {
      console.error('providers:list failed:', error);
      return { success: false, error: error.message };
    }
  });

  ipcMain.handle('providers:get', async (event, id) => {
    try {
      const data = repo.findById(id);
      if (!data) {
        return { success: false, error: 'Provider not found' };
      }
      return { success: true, data };
    } catch (error) {
      console.error('providers:get failed:', error);
      return { success: false, error: error.message };
    }
  });

  ipcMain.handle('providers:create', async (event, data) => {
    try {
      const validated = ProviderCreateSchema.parse(data);
      const provider = repo.create(validated);
      repositories.activity.log('provider', provider.id, provider.name, 'created', '');
      return { success: true, data: provider };
    } catch (error) {
      console.error('providers:create failed:', error);
      return { success: false, error: error.message };
    }
  });

  ipcMain.handle('providers:update', async (event, id, data) => {
    try {
      const validated = ProviderUpdateSchema.parse(data);
      const provider = repo.update(id, validated);
      if (!provider) {
        return { success: false, error: 'Provider not found' };
      }
      repositories.activity.log('provider', id, provider.name, 'updated', '');
      return { success: true, data: provider };
    } catch (error) {
      console.error('providers:update failed:', error);
      return { success: false, error: error.message };
    }
  });

  ipcMain.handle('providers:delete', async (event, id) => {
    try {
      const provider = repo.findById(id);
      if (!provider) {
        return { success: false, error: 'Provider not found' };
      }
      repo.delete(id);
      repositories.activity.log('provider', id, provider.name, 'deleted', '');
      return { success: true, data: { id } };
    } catch (error) {
      console.error('providers:delete failed:', error);
      return { success: false, error: error.message };
    }
  });
}

module.exports = { registerProviderHandlers };
