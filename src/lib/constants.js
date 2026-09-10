export const ENTITY_TYPES = {
  AGENT: 'agent',
  PROVIDER: 'provider',
  MODEL: 'model',
  ACCOUNT: 'account',
  API_KEY: 'api_key',
  PROJECT: 'project',
  NOTE: 'note',
  TAG: 'tag',
  SETTINGS: 'settings',
};

export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/',
  AGENTS: '/agents',
  AGENT_DETAIL: '/agents/:id',
  PROVIDERS: '/providers',
  PROVIDER_DETAIL: '/providers/:id',
  MODELS: '/models',
  MODEL_DETAIL: '/models/:id',
  ACCOUNTS: '/accounts',
  ACCOUNT_DETAIL: '/accounts/:id',
  API_KEYS: '/api-keys',
  API_KEY_DETAIL: '/api-keys/:id',
  PROJECTS: '/projects',
  PROJECT_DETAIL: '/projects/:id',
  NOTES: '/notes',
  NOTE_DETAIL: '/notes/:id',
  SETTINGS: '/settings',
  SEARCH: '/search',
  ANALYTICS: '/analytics',
};

export const NAV_ITEMS = [
  { path: ROUTES.DASHBOARD, label: 'Dashboard', icon: 'LayoutDashboard' },
  { path: ROUTES.AGENTS, label: 'Agents', icon: 'Bot' },
  { path: ROUTES.PROVIDERS, label: 'Providers', icon: 'Server' },
  { path: ROUTES.MODELS, label: 'Models', icon: 'Cpu' },
  { path: ROUTES.ACCOUNTS, label: 'Accounts', icon: 'Users' },
  { path: ROUTES.API_KEYS, label: 'API Keys', icon: 'Key' },
  { path: ROUTES.PROJECTS, label: 'Projects', icon: 'FolderOpen' },
  { path: ROUTES.NOTES, label: 'Notes', icon: 'FileText' },
  { path: ROUTES.ANALYTICS, label: 'Analytics', icon: 'BarChart3' },
  { path: ROUTES.SETTINGS, label: 'Settings', icon: 'Settings' },
];

export const THEME_OPTIONS = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
  { value: 'system', label: 'System' },
];

export const PAGINATION = {
  DEFAULT_LIMIT: 20,
  MAX_LIMIT: 100,
  DEFAULT_OFFSET: 0,
};

export const STATUS_COLORS = {
  active: 'text-green-600 dark:text-green-400',
  inactive: 'text-gray-500 dark:text-gray-400',
  error: 'text-red-600 dark:text-red-400',
  warning: 'text-yellow-600 dark:text-yellow-400',
};
