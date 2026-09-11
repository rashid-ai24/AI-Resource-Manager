const { ipcMain } = require('electron');
const repositories = require('../repositories/index.cjs');
const { AgentCreateSchema, AgentUpdateSchema, ListFilterSchema } = require('../lib/validators.cjs');

function registerAgentHandlers() {
  const repo = repositories.agents;

  ipcMain.handle('agents:list', async (event, filters = {}) => {
    try {
      const validatedFilters = ListFilterSchema.parse(filters);
      const data = repo.findAllWithRelations(validatedFilters);
      return { success: true, data };
    } catch (error) {
      console.error('agents:list failed:', error);
      return { success: false, error: error.message };
    }
  });

  ipcMain.handle('agents:get', async (event, id) => {
    try {
      const data = repo.findByIdWithRelations(id);
      if (!data) {
        return { success: false, error: 'Agent not found' };
      }
      return { success: true, data };
    } catch (error) {
      console.error('agents:get failed:', error);
      return { success: false, error: error.message };
    }
  });

  ipcMain.handle('agents:create', async (event, data) => {
    try {
      const validated = AgentCreateSchema.parse(data);
      const agent = repo.createWithRelations(validated);
      repositories.activity.log('agent', agent.id, agent.name, 'created', '');
      return { success: true, data: agent };
    } catch (error) {
      console.error('agents:create failed:', error);
      return { success: false, error: error.message };
    }
  });

  ipcMain.handle('agents:update', async (event, id, data) => {
    try {
      const validated = AgentUpdateSchema.parse(data);
      const agent = repo.updateWithRelations(id, validated);
      if (!agent) {
        return { success: false, error: 'Agent not found' };
      }
      repositories.activity.log('agent', id, agent.name, 'updated', '');
      return { success: true, data: agent };
    } catch (error) {
      console.error('agents:update failed:', error);
      return { success: false, error: error.message };
    }
  });

  ipcMain.handle('agents:delete', async (event, id) => {
    try {
      const agent = repo.findById(id);
      if (!agent) {
        return { success: false, error: 'Agent not found' };
      }
      repo.delete(id);
      repositories.activity.log('agent', id, agent.name, 'deleted', '');
      return { success: true, data: { id } };
    } catch (error) {
      console.error('agents:delete failed:', error);
      return { success: false, error: error.message };
    }
  });
}

module.exports = { registerAgentHandlers };
