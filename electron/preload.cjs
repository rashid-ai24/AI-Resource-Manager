const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  agents: {
    list: (filters) => ipcRenderer.invoke('agents:list', filters),
    get: (id) => ipcRenderer.invoke('agents:get', id),
    create: (data) => ipcRenderer.invoke('agents:create', data),
    update: (id, data) => ipcRenderer.invoke('agents:update', id, data),
    delete: (id) => ipcRenderer.invoke('agents:delete', id),
  },
  providers: {
    list: (filters) => ipcRenderer.invoke('providers:list', filters),
    get: (id) => ipcRenderer.invoke('providers:get', id),
    create: (data) => ipcRenderer.invoke('providers:create', data),
    update: (id, data) => ipcRenderer.invoke('providers:update', id, data),
    delete: (id) => ipcRenderer.invoke('providers:delete', id),
  },
  models: {
    list: (filters) => ipcRenderer.invoke('models:list', filters),
    get: (id) => ipcRenderer.invoke('models:get', id),
    create: (data) => ipcRenderer.invoke('models:create', data),
    update: (id, data) => ipcRenderer.invoke('models:update', id, data),
    delete: (id) => ipcRenderer.invoke('models:delete', id),
  },
  accounts: {
    list: (filters) => ipcRenderer.invoke('accounts:list', filters),
    get: (id) => ipcRenderer.invoke('accounts:get', id),
    create: (data) => ipcRenderer.invoke('accounts:create', data),
    update: (id, data) => ipcRenderer.invoke('accounts:update', id, data),
    delete: (id) => ipcRenderer.invoke('accounts:delete', id),
  },
  apiKeys: {
    list: (filters) => ipcRenderer.invoke('api-keys:list', filters),
    get: (id) => ipcRenderer.invoke('api-keys:get', id),
    create: (data) => ipcRenderer.invoke('api-keys:create', data),
    update: (id, data) => ipcRenderer.invoke('api-keys:update', id, data),
    delete: (id) => ipcRenderer.invoke('api-keys:delete', id),
  },
  projects: {
    list: (filters) => ipcRenderer.invoke('projects:list', filters),
    get: (id) => ipcRenderer.invoke('projects:get', id),
    create: (data) => ipcRenderer.invoke('projects:create', data),
    update: (id, data) => ipcRenderer.invoke('projects:update', id, data),
    delete: (id) => ipcRenderer.invoke('projects:delete', id),
  },
  notes: {
    list: (filters) => ipcRenderer.invoke('notes:list', filters),
    get: (id) => ipcRenderer.invoke('notes:get', id),
    create: (data) => ipcRenderer.invoke('notes:create', data),
    update: (id, data) => ipcRenderer.invoke('notes:update', id, data),
    delete: (id) => ipcRenderer.invoke('notes:delete', id),
  },
  tags: {
    list: (filters) => ipcRenderer.invoke('tags:list', filters),
    get: (id) => ipcRenderer.invoke('tags:get', id),
    create: (data) => ipcRenderer.invoke('tags:create', data),
    update: (id, data) => ipcRenderer.invoke('tags:update', id, data),
    delete: (id) => ipcRenderer.invoke('tags:delete', id),
  },
  settings: {
    get: (key) => ipcRenderer.invoke('settings:get', key),
    set: (key, value) => ipcRenderer.invoke('settings:set', key, value),
    getAll: () => ipcRenderer.invoke('settings:getAll'),
  },
  db: {
    backup: (path) => ipcRenderer.invoke('db:backup', path),
    restore: (path) => ipcRenderer.invoke('db:restore', path),
    export: (format, filters) => ipcRenderer.invoke('db:export', format, filters),
    import: (path) => ipcRenderer.invoke('db:import', path),
  },
  window: {
    minimize: () => ipcRenderer.invoke('window:minimize'),
    maximize: () => ipcRenderer.invoke('window:maximize'),
    close: () => ipcRenderer.invoke('window:close'),
  },
});
