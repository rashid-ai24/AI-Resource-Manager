const { ipcMain } = require('electron');
const repositories = require('../repositories/index.cjs');

function registerAnalyticsHandlers() {
  const repo = repositories.usage;

  ipcMain.handle('analytics:usageOverTime', async (event, timeRange = 30, filters = {}) => {
    try {
      const data = repo.getUsageOverTime(timeRange, filters);
      return { success: true, data };
    } catch (error) {
      console.error('analytics:usageOverTime failed:', error);
      return { success: false, error: error.message };
    }
  });

  ipcMain.handle('analytics:costOverTime', async (event, timeRange = 30, filters = {}) => {
    try {
      const data = repo.getCostOverTime(timeRange, filters);
      return { success: true, data };
    } catch (error) {
      console.error('analytics:costOverTime failed:', error);
      return { success: false, error: error.message };
    }
  });

  ipcMain.handle('analytics:costByProvider', async (event, timeRange = 30) => {
    try {
      const data = repo.getCostByProvider(timeRange);
      return { success: true, data };
    } catch (error) {
      console.error('analytics:costByProvider failed:', error);
      return { success: false, error: error.message };
    }
  });

  ipcMain.handle('analytics:costByModel', async (event, timeRange = 30) => {
    try {
      const data = repo.getCostByModel(timeRange);
      return { success: true, data };
    } catch (error) {
      console.error('analytics:costByModel failed:', error);
      return { success: false, error: error.message };
    }
  });

  ipcMain.handle('analytics:costByProject', async (event, timeRange = 30) => {
    try {
      const data = repo.getCostByProject(timeRange);
      return { success: true, data };
    } catch (error) {
      console.error('analytics:costByProject failed:', error);
      return { success: false, error: error.message };
    }
  });

  ipcMain.handle('analytics:usageByModel', async (event, timeRange = 30) => {
    try {
      const data = repo.getUsageByModel(timeRange);
      return { success: true, data };
    } catch (error) {
      console.error('analytics:usageByModel failed:', error);
      return { success: false, error: error.message };
    }
  });

  ipcMain.handle('analytics:tokenDistribution', async (event, timeRange = 30) => {
    try {
      const data = repo.getTokenDistribution(timeRange);
      return { success: true, data };
    } catch (error) {
      console.error('analytics:tokenDistribution failed:', error);
      return { success: false, error: error.message };
    }
  });
}

module.exports = { registerAnalyticsHandlers };
