const { ipcMain, dialog } = require('electron');
const fs = require('fs');
const ImportExportService = require('../services/import_export_service.cjs');
const db = require('../database.cjs');

function registerImportExportHandlers() {
  const service = new ImportExportService(db);

  ipcMain.handle('db:export', async (event, format, options = {}) => {
    try {
      if (format === 'json') {
        const data = service.exportJSON();
        const { filePath } = await dialog.showSaveDialog({
          title: 'Export Data',
          defaultPath: `ai-resource-manager-export-${new Date().toISOString().split('T')[0]}.json`,
          filters: [{ name: 'JSON Files', extensions: ['json'] }],
        });
        if (!filePath) return { success: false, error: 'Export cancelled' };
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        return { success: true, data: { path: filePath } };
      }

      if (format === 'csv') {
        const table = options.table || 'providers';
        const csv = service.exportCSV(table);
        if (!csv) return { success: false, error: 'No data to export' };
        const { filePath } = await dialog.showSaveDialog({
          title: 'Export CSV',
          defaultPath: `${table}-export-${new Date().toISOString().split('T')[0]}.csv`,
          filters: [{ name: 'CSV Files', extensions: ['csv'] }],
        });
        if (!filePath) return { success: false, error: 'Export cancelled' };
        fs.writeFileSync(filePath, csv);
        return { success: true, data: { path: filePath } };
      }

      return { success: false, error: `Unsupported export format: ${format}` };
    } catch (error) {
      console.error('db:export failed:', error);
      return { success: false, error: error.message };
    }
  });

  ipcMain.handle('db:import', async (event, options = {}) => {
    try {
      const { filePaths } = await dialog.showOpenDialog({
        title: 'Import Data',
        filters: [
          { name: 'JSON Files', extensions: ['json'] },
          { name: 'CSV Files', extensions: ['csv'] },
        ],
        properties: ['openFile'],
      });

      if (!filePaths || filePaths.length === 0) {
        return { success: false, error: 'Import cancelled' };
      }

      const filePath = filePaths[0];
      const ext = filePath.split('.').pop().toLowerCase();

      if (ext === 'json') {
        const content = fs.readFileSync(filePath, 'utf8');
        const json = JSON.parse(content);
        const imported = service.importJSON(json);
        return { success: true, data: { imported, format: 'json' } };
      }

      if (ext === 'csv') {
        const table = options.table || 'providers';
        const content = fs.readFileSync(filePath, 'utf8');
        const count = service.importCSV(table, content);
        return { success: true, data: { imported: { [table]: count }, format: 'csv' } };
      }

      return { success: false, error: 'Unsupported file format' };
    } catch (error) {
      console.error('db:import failed:', error);
      return { success: false, error: error.message };
    }
  });
}

module.exports = { registerImportExportHandlers };
