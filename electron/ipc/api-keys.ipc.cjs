const { ipcMain } = require('electron');
const crypto = require('crypto');
const repositories = require('../repositories/index.cjs');
const { ApiKeyCreateSchema, ApiKeyUpdateSchema, ListFilterSchema } = require('../lib/validators.cjs');

function hashKey(key) {
  return crypto.createHash('sha256').update(key).digest('hex');
}

function getKeyPrefix(key) {
  return key.substring(0, 8) + '...';
}

function registerApiKeyHandlers() {
  const repo = repositories.apiKeys;

  ipcMain.handle('api-keys:list', async (event, filters = {}) => {
    try {
      const validatedFilters = ListFilterSchema.parse(filters);
      const data = repo.findAllWithRelations(validatedFilters);
      return { success: true, data };
    } catch (error) {
      console.error('api-keys:list failed:', error);
      return { success: false, error: error.message };
    }
  });

  ipcMain.handle('api-keys:get', async (event, id) => {
    try {
      const data = repo.findByIdWithRelations(id);
      if (!data) {
        return { success: false, error: 'API Key not found' };
      }
      return { success: true, data };
    } catch (error) {
      console.error('api-keys:get failed:', error);
      return { success: false, error: error.message };
    }
  });

  ipcMain.handle('api-keys:create', async (event, data) => {
    try {
      const validated = ApiKeyCreateSchema.parse(data);
      const { key, ...keyData } = validated;
      const key_hash = hashKey(key);
      const key_prefix = getKeyPrefix(key);
      const apiKey = repo.create({ ...keyData, key_hash, key_prefix });
      return { success: true, data: repo.findByIdWithRelations(apiKey.id) };
    } catch (error) {
      console.error('api-keys:create failed:', error);
      return { success: false, error: error.message };
    }
  });

  ipcMain.handle('api-keys:update', async (event, id, data) => {
    try {
      const validated = ApiKeyUpdateSchema.parse(data);
      const { key, ...keyData } = validated;
      if (key) {
        keyData.key_hash = hashKey(key);
        keyData.key_prefix = getKeyPrefix(key);
      }
      repo.update(id, keyData);
      const apiKey = repo.findByIdWithRelations(id);
      if (!apiKey) {
        return { success: false, error: 'API Key not found' };
      }
      return { success: true, data: apiKey };
    } catch (error) {
      console.error('api-keys:update failed:', error);
      return { success: false, error: error.message };
    }
  });

  ipcMain.handle('api-keys:delete', async (event, id) => {
    try {
      const apiKey = repo.findById(id);
      if (!apiKey) {
        return { success: false, error: 'API Key not found' };
      }
      repo.delete(id);
      return { success: true, data: { id } };
    } catch (error) {
      console.error('api-keys:delete failed:', error);
      return { success: false, error: error.message };
    }
  });
}

module.exports = { registerApiKeyHandlers };
