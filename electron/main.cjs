const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { autoUpdater } = require('electron-updater');

// Import IPC handler registration functions
const { registerAgentHandlers } = require('./ipc/agents.ipc.cjs');
const { registerProviderHandlers } = require('./ipc/providers.ipc.cjs');
const { registerModelHandlers } = require('./ipc/models.ipc.cjs');
const { registerAccountHandlers } = require('./ipc/accounts.ipc.cjs');
const { registerApiKeyHandlers } = require('./ipc/api-keys.ipc.cjs');
const { registerProjectHandlers } = require('./ipc/projects.ipc.cjs');
const { registerNoteHandlers } = require('./ipc/notes.ipc.cjs');
const { registerTagHandlers } = require('./ipc/tags.ipc.cjs');
const { registerSettingsHandlers } = require('./ipc/settings.ipc.cjs');
const { registerActivityHandlers } = require('./ipc/activity.ipc.cjs');
const { registerAnalyticsHandlers } = require('./ipc/analytics.ipc.cjs');
const { registerBackupHandlers } = require('./ipc/backup.ipc.cjs');
const { registerImportExportHandlers } = require('./ipc/import-export.ipc.cjs');
const { registerQuotaHandlers } = require('./ipc/quotas.ipc.cjs');
const { registerNotificationHandlers } = require('./ipc/notifications.ipc.cjs');
const { registerFavoriteHandlers } = require('./ipc/favorites.ipc.cjs');
const { registerTemplateHandlers } = require('./ipc/templates.ipc.cjs');
const { registerHealthHandlers } = require('./health.cjs');

// Configure auto-updater
autoUpdater.autoDownload = true;
autoUpdater.autoInstallOnAppQuit = true;

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    frame: false,
    titleBarStyle: 'hidden',
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  if (process.env.NODE_ENV === 'development' || !app.isPackaged) {
    win.loadURL('http://localhost:3557');
  } else {
    win.loadFile(path.join(__dirname, '..', 'dist', 'index.html'));
  }

  return win;
}

// Auto-updater events
function setupAutoUpdater(mainWindow) {
  autoUpdater.on('checking-for-update', () => {
    console.log('Checking for update...');
    mainWindow.webContents.send('update:checking');
  });

  autoUpdater.on('update-available', (info) => {
    console.log('Update available:', info.version);
    mainWindow.webContents.send('update:available', info);
  });

  autoUpdater.on('update-not-available', () => {
    console.log('Update not available');
    mainWindow.webContents.send('update:not-available');
  });

  autoUpdater.on('download-progress', (progress) => {
    console.log(`Download progress: ${progress.percent}%`);
    mainWindow.webContents.send('update:progress', progress);
  });

  autoUpdater.on('update-downloaded', (info) => {
    console.log('Update downloaded:', info.version);
    mainWindow.webContents.send('update:downloaded', info);
  });

  autoUpdater.on('error', (error) => {
    console.error('Auto-updater error:', error);
    mainWindow.webContents.send('update:error', error.message);
  });
}

// Register all IPC handlers
function registerAllHandlers() {
  // Entity handlers
  registerAgentHandlers();
  registerProviderHandlers();
  registerModelHandlers();
  registerAccountHandlers();
  registerApiKeyHandlers();
  registerProjectHandlers();
  registerNoteHandlers();
  registerTagHandlers();
  registerSettingsHandlers();
  registerActivityHandlers();
  registerAnalyticsHandlers();
  registerBackupHandlers();
  registerImportExportHandlers();
  registerQuotaHandlers();
  registerNotificationHandlers();
  registerFavoriteHandlers();
  registerTemplateHandlers();
  registerHealthHandlers();

  // Window handlers
  ipcMain.handle('window:minimize', (event) => BrowserWindow.fromWebContents(event.sender)?.minimize());
  ipcMain.handle('window:maximize', (event) => {
    const win = BrowserWindow.fromWebContents(event.sender);
    if (win?.isMaximized()) win.unmaximize();
    else win?.maximize();
  });
  ipcMain.handle('window:close', (event) => BrowserWindow.fromWebContents(event.sender)?.close());

  // App info handlers
  ipcMain.handle('app:version', () => app.getVersion());
  ipcMain.handle('app:path', () => app.getPath('userData'));

  // Update handlers
  ipcMain.handle('update:check', () => autoUpdater.checkForUpdates());
  ipcMain.handle('update:install', () => autoUpdater.quitAndInstall());

  console.log('All IPC handlers registered successfully');
}

app.whenReady().then(() => {
  registerAllHandlers();
  const mainWindow = createWindow();
  
  if (!process.env.NODE_ENV === 'development' && app.isPackaged) {
    setupAutoUpdater(mainWindow);
    autoUpdater.checkForUpdates();
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
