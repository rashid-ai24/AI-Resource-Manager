// Renderer IPC Client
// This module provides a centralized way to communicate with the main process

const api = window.api;

// Helper function to handle IPC responses
function handleResponse(result) {
  if (!result.success) {
    throw new Error(result.error || 'Operation failed');
  }
  return result.data;
}

// Agents API
export const agentsApi = {
  list: async (filters = {}) => {
    const result = await api.agents.list(filters);
    return handleResponse(result);
  },
  get: async (id) => {
    const result = await api.agents.get(id);
    return handleResponse(result);
  },
  create: async (data) => {
    const result = await api.agents.create(data);
    return handleResponse(result);
  },
  update: async (id, data) => {
    const result = await api.agents.update(id, data);
    return handleResponse(result);
  },
  delete: async (id) => {
    const result = await api.agents.delete(id);
    return handleResponse(result);
  },
};

// Providers API
export const providersApi = {
  list: async (filters = {}) => {
    const result = await api.providers.list(filters);
    return handleResponse(result);
  },
  get: async (id) => {
    const result = await api.providers.get(id);
    return handleResponse(result);
  },
  create: async (data) => {
    const result = await api.providers.create(data);
    return handleResponse(result);
  },
  update: async (id, data) => {
    const result = await api.providers.update(id, data);
    return handleResponse(result);
  },
  delete: async (id) => {
    const result = await api.providers.delete(id);
    return handleResponse(result);
  },
};

// Models API
export const modelsApi = {
  list: async (filters = {}) => {
    const result = await api.models.list(filters);
    return handleResponse(result);
  },
  get: async (id) => {
    const result = await api.models.get(id);
    return handleResponse(result);
  },
  create: async (data) => {
    const result = await api.models.create(data);
    return handleResponse(result);
  },
  update: async (id, data) => {
    const result = await api.models.update(id, data);
    return handleResponse(result);
  },
  delete: async (id) => {
    const result = await api.models.delete(id);
    return handleResponse(result);
  },
};

// Accounts API
export const accountsApi = {
  list: async (filters = {}) => {
    const result = await api.accounts.list(filters);
    return handleResponse(result);
  },
  get: async (id) => {
    const result = await api.accounts.get(id);
    return handleResponse(result);
  },
  create: async (data) => {
    const result = await api.accounts.create(data);
    return handleResponse(result);
  },
  update: async (id, data) => {
    const result = await api.accounts.update(id, data);
    return handleResponse(result);
  },
  delete: async (id) => {
    const result = await api.accounts.delete(id);
    return handleResponse(result);
  },
};

// API Keys API
export const apiKeysApi = {
  list: async (filters = {}) => {
    const result = await api.apiKeys.list(filters);
    return handleResponse(result);
  },
  get: async (id) => {
    const result = await api.apiKeys.get(id);
    return handleResponse(result);
  },
  create: async (data) => {
    const result = await api.apiKeys.create(data);
    return handleResponse(result);
  },
  update: async (id, data) => {
    const result = await api.apiKeys.update(id, data);
    return handleResponse(result);
  },
  delete: async (id) => {
    const result = await api.apiKeys.delete(id);
    return handleResponse(result);
  },
};

// Projects API
export const projectsApi = {
  list: async (filters = {}) => {
    const result = await api.projects.list(filters);
    return handleResponse(result);
  },
  get: async (id) => {
    const result = await api.projects.get(id);
    return handleResponse(result);
  },
  create: async (data) => {
    const result = await api.projects.create(data);
    return handleResponse(result);
  },
  update: async (id, data) => {
    const result = await api.projects.update(id, data);
    return handleResponse(result);
  },
  delete: async (id) => {
    const result = await api.projects.delete(id);
    return handleResponse(result);
  },
};

// Notes API
export const notesApi = {
  list: async (filters = {}) => {
    const result = await api.notes.list(filters);
    return handleResponse(result);
  },
  get: async (id) => {
    const result = await api.notes.get(id);
    return handleResponse(result);
  },
  create: async (data) => {
    const result = await api.notes.create(data);
    return handleResponse(result);
  },
  update: async (id, data) => {
    const result = await api.notes.update(id, data);
    return handleResponse(result);
  },
  delete: async (id) => {
    const result = await api.notes.delete(id);
    return handleResponse(result);
  },
};

// Tags API
export const tagsApi = {
  list: async (filters = {}) => {
    const result = await api.tags.list(filters);
    return handleResponse(result);
  },
  get: async (id) => {
    const result = await api.tags.get(id);
    return handleResponse(result);
  },
  create: async (data) => {
    const result = await api.tags.create(data);
    return handleResponse(result);
  },
  update: async (id, data) => {
    const result = await api.tags.update(id, data);
    return handleResponse(result);
  },
  delete: async (id) => {
    const result = await api.tags.delete(id);
    return handleResponse(result);
  },
  getByEntity: async (entityType, entityId) => {
    const result = await api.tags.getByEntity(entityType, entityId);
    return handleResponse(result);
  },
  addToEntity: async (entityType, entityId, tagId) => {
    const result = await api.tags.addToEntity(entityType, entityId, tagId);
    return handleResponse(result);
  },
  removeFromEntity: async (entityType, entityId, tagId) => {
    const result = await api.tags.removeFromEntity(entityType, entityId, tagId);
    return handleResponse(result);
  },
};

// Settings API
export const settingsApi = {
  get: async (key) => {
    const result = await api.settings.get(key);
    return handleResponse(result);
  },
  getAll: async () => {
    const result = await api.settings.getAll();
    return handleResponse(result);
  },
  set: async (key, value, description = '') => {
    const result = await api.settings.set(key, value, description);
    return handleResponse(result);
  },
  delete: async (key) => {
    const result = await api.settings.delete(key);
    return handleResponse(result);
  },
};

// Database API
export const dbApi = {
  backup: async (path) => {
    const result = await api.db.backup(path);
    return handleResponse(result);
  },
  restore: async (path) => {
    const result = await api.db.restore(path);
    return handleResponse(result);
  },
  export: async (format, filters) => {
    const result = await api.db.export(format, filters);
    return handleResponse(result);
  },
  import: async (path) => {
    const result = await api.db.import(path);
    return handleResponse(result);
  },
};

// Window API
export const windowApi = {
  minimize: () => api.window.minimize(),
  maximize: () => api.window.maximize(),
  close: () => api.window.close(),
};

// App API
export const appApi = {
  version: async () => {
    const result = await api.app.version();
    return handleResponse(result);
  },
  path: async () => {
    const result = await api.app.path();
    return handleResponse(result);
  },
};

// Activity API
export const activityApi = {
  list: async (filters = {}) => {
    const result = await api.activity.list(filters);
    return handleResponse(result);
  },
  getByEntity: async (entityType, entityId) => {
    const result = await api.activity.getByEntity(entityType, entityId);
    return handleResponse(result);
  },
  getRecent: async (limit = 10) => {
    const result = await api.activity.getRecent(limit);
    return handleResponse(result);
  },
  getStats: async () => {
    const result = await api.activity.getStats();
    return handleResponse(result);
  },
};

// Analytics API
export const analyticsApi = {
  usageOverTime: async (timeRange = 30, filters = {}) => {
    const result = await api.analytics.usageOverTime(timeRange, filters);
    return handleResponse(result);
  },
  costOverTime: async (timeRange = 30, filters = {}) => {
    const result = await api.analytics.costOverTime(timeRange, filters);
    return handleResponse(result);
  },
  costByProvider: async (timeRange = 30) => {
    const result = await api.analytics.costByProvider(timeRange);
    return handleResponse(result);
  },
  costByModel: async (timeRange = 30) => {
    const result = await api.analytics.costByModel(timeRange);
    return handleResponse(result);
  },
  costByProject: async (timeRange = 30) => {
    const result = await api.analytics.costByProject(timeRange);
    return handleResponse(result);
  },
  usageByModel: async (timeRange = 30) => {
    const result = await api.analytics.usageByModel(timeRange);
    return handleResponse(result);
  },
  tokenDistribution: async (timeRange = 30) => {
    const result = await api.analytics.tokenDistribution(timeRange);
    return handleResponse(result);
  },
};

// Combined API export
export const ipc = {
  agents: agentsApi,
  providers: providersApi,
  models: modelsApi,
  accounts: accountsApi,
  apiKeys: apiKeysApi,
  projects: projectsApi,
  notes: notesApi,
  tags: tagsApi,
  settings: settingsApi,
  db: dbApi,
  window: windowApi,
  app: appApi,
  activity: activityApi,
  analytics: analyticsApi,
};

export default ipc;
