// Entity types
const ENTITY_TYPES = {
  AGENT: 'agent',
  PROVIDER: 'provider',
  MODEL: 'model',
  ACCOUNT: 'account',
  API_KEY: 'api_key',
  PROJECT: 'project',
  NOTE: 'note',
  TAG: 'tag',
};

// IPC channel namespaces
const IPC_CHANNELS = {
  AGENTS: 'agents',
  PROVIDERS: 'providers',
  MODELS: 'models',
  ACCOUNTS: 'accounts',
  API_KEYS: 'api-keys',
  PROJECTS: 'projects',
  NOTES: 'notes',
  TAGS: 'tags',
  SETTINGS: 'settings',
  DB: 'db',
  WINDOW: 'window',
  APP: 'app',
};

// IPC actions
const IPC_ACTIONS = {
  LIST: 'list',
  GET: 'get',
  CREATE: 'create',
  UPDATE: 'update',
  DELETE: 'delete',
  GET_ALL: 'getAll',
  SET: 'set',
  BACKUP: 'backup',
  RESTORE: 'restore',
  EXPORT: 'export',
  IMPORT: 'import',
};

// Default pagination
const DEFAULT_PAGE_SIZE = 50;
const MAX_PAGE_SIZE = 100;

// Date formats
const DATE_FORMATS = {
  ISO: 'YYYY-MM-DDTHH:mm:ss.sssZ',
  DATE: 'YYYY-MM-DD',
  DATETIME: 'YYYY-MM-DD HH:mm:ss',
};

module.exports = {
  ENTITY_TYPES,
  IPC_CHANNELS,
  IPC_ACTIONS,
  DEFAULT_PAGE_SIZE,
  MAX_PAGE_SIZE,
  DATE_FORMATS,
};
