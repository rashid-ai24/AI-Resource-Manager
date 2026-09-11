const { ipcMain, dialog, BrowserWindow } = require('electron');
const BackupService = require('../services/backup_service.cjs');
const db = require('../database.cjs');

function registerBackupHandlers() {
  const backupService = new BackupService(db);

  ipcMain.handle('db:backup', async (event) => {
    try {
      const result = backupService.createBackup();
      return { success: true, data: result };
    } catch (error) {
      console.error('db:backup failed:', error);
      return { success: false, error: error.message };
    }
  });

  ipcMain.handle('db:restore', async (event, backupPath) => {
    try {
      const win = BrowserWindow.fromWebContents(event.sender);
      const result = backupService.restoreBackup(backupPath);
      return { success: true, data: result };
    } catch (error) {
      console.error('db:restore failed:', error);
      return { success: false, error: error.message };
    }
  });

  ipcMain.handle('db:listBackups', async (event) => {
    try {
      const backups = backupService.listBackups();
      return { success: true, data: backups };
    } catch (error) {
      console.error('db:listBackups failed:', error);
      return { success: false, error: error.message };
    }
  });

  ipcMain.handle('db:deleteBackup', async (event, backupPath) => {
    try {
      const result = backupService.deleteBackup(backupPath);
      return { success: true, data: result };
    } catch (error) {
      console.error('db:deleteBackup failed:', error);
      return { success: false, error: error.message };
    }
  });
}

module.exports = { registerBackupHandlers };
