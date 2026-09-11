const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

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
    win.loadURL('http://localhost:5173');
  } else {
    win.loadFile(path.join(__dirname, '..', 'dist', 'index.html'));
  }
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

  console.log('All IPC handlers registered successfully');
}

app.whenReady().then(() => {
  registerAllHandlers();
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
