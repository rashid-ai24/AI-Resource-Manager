const { app } = require('electron');
const path = require('path');

function getHealthStatus(database) {
  const status = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: app.getVersion(),
    platform: process.platform,
    arch: process.arch,
    uptime: process.uptime(),
    memory: process.memoryUsage(),
  };

  if (database) {
    try {
      database.prepare('SELECT 1').get();
      status.database = 'connected';
    } catch (error) {
      status.database = 'disconnected';
      status.status = 'degraded';
    }
  } else {
    status.database = 'not_initialized';
    status.status = 'degraded';
  }

  return status;
}

function registerHealthHandlers(database) {
  const { ipcMain } = require('electron');
  
  ipcMain.handle('health:status', () => {
    return getHealthStatus(database);
  });
}

module.exports = { getHealthStatus, registerHealthHandlers };
