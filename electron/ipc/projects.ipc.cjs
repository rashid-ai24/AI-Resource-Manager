const { ipcMain } = require('electron');
const repositories = require('../repositories/index.cjs');
const { ProjectCreateSchema, ProjectUpdateSchema, ListFilterSchema } = require('../lib/validators.cjs');

function registerProjectHandlers() {
  const repo = repositories.projects;

  ipcMain.handle('projects:list', async (event, filters = {}) => {
    try {
      const validatedFilters = ListFilterSchema.parse(filters);
      const data = repo.findAll(validatedFilters);
      return { success: true, data };
    } catch (error) {
      console.error('projects:list failed:', error);
      return { success: false, error: error.message };
    }
  });

  ipcMain.handle('projects:get', async (event, id) => {
    try {
      const data = repo.findById(id);
      if (!data) {
        return { success: false, error: 'Project not found' };
      }
      return { success: true, data };
    } catch (error) {
      console.error('projects:get failed:', error);
      return { success: false, error: error.message };
    }
  });

  ipcMain.handle('projects:create', async (event, data) => {
    try {
      const validated = ProjectCreateSchema.parse(data);
      const project = repo.create(validated);
      return { success: true, data: project };
    } catch (error) {
      console.error('projects:create failed:', error);
      return { success: false, error: error.message };
    }
  });

  ipcMain.handle('projects:update', async (event, id, data) => {
    try {
      const validated = ProjectUpdateSchema.parse(data);
      const project = repo.update(id, validated);
      if (!project) {
        return { success: false, error: 'Project not found' };
      }
      return { success: true, data: project };
    } catch (error) {
      console.error('projects:update failed:', error);
      return { success: false, error: error.message };
    }
  });

  ipcMain.handle('projects:delete', async (event, id) => {
    try {
      const project = repo.findById(id);
      if (!project) {
        return { success: false, error: 'Project not found' };
      }
      repo.delete(id);
      return { success: true, data: { id } };
    } catch (error) {
      console.error('projects:delete failed:', error);
      return { success: false, error: error.message };
    }
  });
}

module.exports = { registerProjectHandlers };
