const Database = require('better-sqlite3');
const path = require('path');
const { app } = require('electron');

const dbPath = path.join(app.getPath('userData'), 'ai-resource-manager.db');
const db = new Database(dbPath);

db.pragma('journal_mode = WAL');
db.pragma('busy_timeout = 5000');
db.pragma('synchronous = NORMAL');
db.pragma('cache_size = -64000');
db.pragma('page_size = 4096');
db.pragma('mmap_size = 268435456');
db.pragma('foreign_keys = ON');

// Run migrations
db.exec(`
  CREATE TABLE IF NOT EXISTS activity_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    entity_type TEXT NOT NULL,
    entity_id INTEGER,
    entity_name TEXT DEFAULT '',
    action TEXT NOT NULL,
    details TEXT DEFAULT '',
    created_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS usage_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    agent_id INTEGER,
    provider_id INTEGER,
    model_id INTEGER,
    project_id INTEGER,
    input_tokens INTEGER DEFAULT 0,
    output_tokens INTEGER DEFAULT 0,
    cost REAL DEFAULT 0,
    timestamp TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (agent_id) REFERENCES agents(id) ON DELETE SET NULL,
    FOREIGN KEY (provider_id) REFERENCES providers(id) ON DELETE SET NULL,
    FOREIGN KEY (model_id) REFERENCES models(id) ON DELETE SET NULL,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE SET NULL
  );

  CREATE INDEX IF NOT EXISTS idx_activity_entity ON activity_logs(entity_type, entity_id);
  CREATE INDEX IF NOT EXISTS idx_activity_action ON activity_logs(action);
  CREATE INDEX IF NOT EXISTS idx_activity_created ON activity_logs(created_at);
  CREATE INDEX IF NOT EXISTS idx_usage_agent ON usage_logs(agent_id);
  CREATE INDEX IF NOT EXISTS idx_usage_provider ON usage_logs(provider_id);
  CREATE INDEX IF NOT EXISTS idx_usage_model ON usage_logs(model_id);
  CREATE INDEX IF NOT EXISTS idx_usage_project ON usage_logs(project_id);
  CREATE INDEX IF NOT EXISTS idx_usage_timestamp ON usage_logs(timestamp);

  CREATE TABLE IF NOT EXISTS quotas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    provider_id INTEGER,
    account_id INTEGER,
    name TEXT NOT NULL,
    quota_type TEXT NOT NULL DEFAULT 'daily',
    limit_value INTEGER NOT NULL DEFAULT 0,
    used_value INTEGER NOT NULL DEFAULT 0,
    unit TEXT DEFAULT 'tokens',
    reset_interval TEXT DEFAULT 'daily',
    next_reset_at TEXT,
    is_active INTEGER DEFAULT 1,
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now')),
    deleted_at TEXT,
    FOREIGN KEY (provider_id) REFERENCES providers(id) ON DELETE SET NULL,
    FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE SET NULL
  );

  CREATE TABLE IF NOT EXISTS favorites (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    entity_type TEXT NOT NULL,
    entity_id INTEGER NOT NULL,
    entity_name TEXT DEFAULT '',
    notes TEXT DEFAULT '',
    created_at TEXT DEFAULT (datetime('now')),
    UNIQUE(entity_type, entity_id)
  );

  CREATE TABLE IF NOT EXISTS templates (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT DEFAULT '',
    template_type TEXT NOT NULL DEFAULT 'agent',
    config_json TEXT DEFAULT '{}',
    is_active INTEGER DEFAULT 1,
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now')),
    deleted_at TEXT
  );

  CREATE TABLE IF NOT EXISTS notifications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    notification_type TEXT DEFAULT 'info',
    entity_type TEXT,
    entity_id INTEGER,
    is_read INTEGER DEFAULT 0,
    action_url TEXT,
    created_at TEXT DEFAULT (datetime('now')),
    deleted_at TEXT
  );

  CREATE INDEX IF NOT EXISTS idx_quotas_provider ON quotas(provider_id);
  CREATE INDEX IF NOT EXISTS idx_quotas_account ON quotas(account_id);
  CREATE INDEX IF NOT EXISTS idx_quotas_next_reset ON quotas(next_reset_at);
  CREATE INDEX IF NOT EXISTS idx_favorites_entity ON favorites(entity_type, entity_id);
  CREATE INDEX IF NOT EXISTS idx_templates_type ON templates(template_type);
  CREATE INDEX IF NOT EXISTS idx_notifications_read ON notifications(is_read);
  CREATE INDEX IF NOT EXISTS idx_notifications_created ON notifications(created_at);
`);

module.exports = db;
