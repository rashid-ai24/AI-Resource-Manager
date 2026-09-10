const { ipcMain } = require('electron');
const repositories = require('../repositories/index.cjs');
const { AccountCreateSchema, AccountUpdateSchema, ListFilterSchema } = require('../lib/validators.cjs');

function registerAccountHandlers() {
  const repo = repositories.accounts;

  ipcMain.handle('accounts:list', async (event, filters = {}) => {
    try {
      const validatedFilters = ListFilterSchema.parse(filters);
      const data = repo.findAllWithRelations(validatedFilters);
      return { success: true, data };
    } catch (error) {
      console.error('accounts:list failed:', error);
      return { success: false, error: error.message };
    }
  });

  ipcMain.handle('accounts:get', async (event, id) => {
    try {
      const data = repo.findByIdWithRelations(id);
      if (!data) {
        return { success: false, error: 'Account not found' };
      }
      return { success: true, data };
    } catch (error) {
      console.error('accounts:get failed:', error);
      return { success: false, error: error.message };
    }
  });

  ipcMain.handle('accounts:create', async (event, data) => {
    try {
      const validated = AccountCreateSchema.parse(data);
      const account = repo.create(validated);
      return { success: true, data: repo.findByIdWithRelations(account.id) };
    } catch (error) {
      console.error('accounts:create failed:', error);
      return { success: false, error: error.message };
    }
  });

  ipcMain.handle('accounts:update', async (event, id, data) => {
    try {
      const validated = AccountUpdateSchema.parse(data);
      repo.update(id, validated);
      const account = repo.findByIdWithRelations(id);
      if (!account) {
        return { success: false, error: 'Account not found' };
      }
      return { success: true, data: account };
    } catch (error) {
      console.error('accounts:update failed:', error);
      return { success: false, error: error.message };
    }
  });

  ipcMain.handle('accounts:delete', async (event, id) => {
    try {
      const account = repo.findById(id);
      if (!account) {
        return { success: false, error: 'Account not found' };
      }
      repo.delete(id);
      return { success: true, data: { id } };
    } catch (error) {
      console.error('accounts:delete failed:', error);
      return { success: false, error: error.message };
    }
  });
}

module.exports = { registerAccountHandlers };
