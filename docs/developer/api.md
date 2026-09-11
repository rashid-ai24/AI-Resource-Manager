# API Documentation

## Overview

AI Resource Manager v2 uses IPC (Inter-Process Communication) for communication between the renderer and main processes.

## IPC Architecture

```
Renderer Process → preload.cjs → ipc.js → IPC Handler → Repository → SQLite
```

## API Structure

### Window API

```javascript
window.api.agents.list(filters)
window.api.agents.get(id)
window.api.agents.create(data)
window.api.agents.update(id, data)
window.api.agents.delete(id)
```

## Entity APIs

### Agents API

```javascript
// List agents
const agents = await window.api.agents.list({
  search: 'search term',
  limit: 10,
  offset: 0
});

// Get agent by ID
const agent = await window.api.agents.get(1);

// Create agent
const newAgent = await window.api.agents.create({
  name: 'Agent Name',
  description: 'Description'
});

// Update agent
const updated = await window.api.agents.update(1, {
  name: 'Updated Name'
});

// Delete agent
const deleted = await window.api.agents.delete(1);
```

### Providers API

```javascript
// List providers
const providers = await window.api.providers.list();

// Get provider
const provider = await window.api.providers.get(1);

// Create provider
const newProvider = await window.api.providers.create({
  name: 'OpenAI',
  description: 'OpenAI API'
});

// Update provider
const updated = await window.api.providers.update(1, {
  name: 'Updated Name'
});

// Delete provider
const deleted = await window.api.providers.delete(1);
```

### Models API

```javascript
// List models
const models = await window.api.models.list({
  provider_id: 1
});

// Get model
const model = await window.api.models.get(1);

// Create model
const newModel = await window.api.models.create({
  name: 'GPT-4',
  provider_id: 1,
  model_id: 'gpt-4',
  context_window: 128000
});

// Update model
const updated = await window.api.models.update(1, {
  name: 'Updated Name'
});

// Delete model
const deleted = await window.api.models.delete(1);
```

### Accounts API

```javascript
// List accounts
const accounts = await window.api.accounts.list();

// Get account
const account = await window.api.accounts.get(1);

// Create account
const newAccount = await window.api.accounts.create({
  name: 'My Account',
  provider_id: 1
});

// Update account
const updated = await window.api.accounts.update(1, {
  name: 'Updated Name'
});

// Delete account
const deleted = await window.api.accounts.delete(1);
```

### API Keys API

```javascript
// List API keys
const keys = await window.api.apiKeys.list();

// Get API key
const key = await window.api.apiKeys.get(1);

// Create API key
const newKey = await window.api.apiKeys.create({
  name: 'My Key',
  account_id: 1,
  key: 'sk-...'
});

// Update API key
const updated = await window.api.apiKeys.update(1, {
  name: 'Updated Name'
});

// Delete API key
const deleted = await window.api.apiKeys.delete(1);
```

### Projects API

```javascript
// List projects
const projects = await window.api.projects.list();

// Get project
const project = await window.api.projects.get(1);

// Create project
const newProject = await window.api.projects.create({
  name: 'My Project',
  description: 'Project description'
});

// Update project
const updated = await window.api.projects.update(1, {
  name: 'Updated Name'
});

// Delete project
const deleted = await window.api.projects.delete(1);
```

### Notes API

```javascript
// List notes
const notes = await window.api.notes.list({
  entity_type: 'agent',
  entity_id: 1
});

// Get note
const note = await window.api.notes.get(1);

// Create note
const newNote = await window.api.notes.create({
  entity_type: 'agent',
  entity_id: 1,
  content: 'Note content'
});

// Update note
const updated = await window.api.notes.update(1, {
  content: 'Updated content'
});

// Delete note
const deleted = await window.api.notes.delete(1);
```

### Tags API

```javascript
// List tags
const tags = await window.api.tags.list();

// Get tag
const tag = await window.api.tags.get(1);

// Create tag
const newTag = await window.api.tags.create({
  name: 'Important',
  color: '#ff0000'
});

// Update tag
const updated = await window.api.tags.update(1, {
  name: 'Updated Name'
});

// Delete tag
const deleted = await window.api.tags.delete(1);

// Get tags for entity
const entityTags = await window.api.tags.getByEntity('agent', 1);

// Add tag to entity
await window.api.tags.addToEntity('agent', 1, 1);

// Remove tag from entity
await window.api.tags.removeFromEntity('agent', 1, 1);
```

### Settings API

```javascript
// Get setting
const value = await window.api.settings.get('theme');

// Get all settings
const settings = await window.api.settings.getAll();

// Set setting
await window.api.settings.set('theme', 'dark', 'UI Theme');

// Delete setting
await window.api.settings.delete('theme');
```

### Activity API

```javascript
// List activity
const activity = await window.api.activity.list({
  limit: 10
});

// Get activity by entity
const entityActivity = await window.api.activity.getByEntity('agent', 1);

// Get recent activity
const recent = await window.api.activity.getRecent(10);

// Get activity stats
const stats = await window.api.activity.getStats();
```

### Analytics API

```javascript
// Usage over time
const usage = await window.api.analytics.usageOverTime(30, {
  provider_id: 1
});

// Cost over time
const costs = await window.api.analytics.costOverTime(30);

// Cost by provider
const costByProvider = await window.api.analytics.costByProvider(30);

// Cost by model
const costByModel = await window.api.analytics.costByModel(30);

// Cost by project
const costByProject = await window.api.analytics.costByProject(30);

// Usage by model
const usageByModel = await window.api.analytics.usageByModel(30);

// Token distribution
const tokens = await window.api.analytics.tokenDistribution(30);
```

### Quotas API

```javascript
// List quotas
const quotas = await window.api.quotas.list();

// Get quota
const quota = await window.api.quotas.get(1);

// Create quota
const newQuota = await window.api.quotas.create({
  name: 'Monthly Limit',
  limit_value: 1000,
  reset_period: 'monthly'
});

// Update quota
const updated = await window.api.quotas.update(1, {
  name: 'Updated Name'
});

// Delete quota
const deleted = await window.api.quotas.delete(1);

// Get active quotas
const active = await window.api.quotas.active();

// Get upcoming resets
const upcoming = await window.api.quotas.upcomingResets(10);

// Get expired quotas
const expired = await window.api.quotas.expired();

// Update usage
await window.api.quotas.updateUsage(1, 500);

// Increment usage
await window.api.quotas.incrementUsage(1, 10);

// Reset usage
await window.api.quotas.resetUsage(1);
```

### Notifications API

```javascript
// List notifications
const notifications = await window.api.notifications.list();

// Get unread notifications
const unread = await window.api.notifications.getUnread();

// Get unread count
const count = await window.api.notifications.unreadCount();

// Mark as read
await window.api.notifications.markAsRead(1);

// Mark all as read
await window.api.notifications.markAllAsRead();

// Create notification
const newNotification = await window.api.notifications.create({
  title: 'Notification Title',
  message: 'Notification message',
  type: 'info'
});

// Check quotas
await window.api.notifications.checkQuotas();

// Delete old notifications
await window.api.notifications.deleteOlderThan('2024-01-01');
```

### Favorites API

```javascript
// List favorites
const favorites = await window.api.favorites.list();

// Get favorite
const favorite = await window.api.favorites.get(1);

// Toggle favorite
const result = await window.api.favorites.toggle('agent', 1, 'Agent Name', 'Notes');

// Check if favorited
const isFavorited = await window.api.favorites.isFavorited('agent', 1);

// Find by type
const agentFavorites = await window.api.favorites.findByType('agent');

// Get count
const count = await window.api.favorites.count('agent');

// Delete favorite
const deleted = await window.api.favorites.delete(1);
```

### Templates API

```javascript
// List templates
const templates = await window.api.templates.list();

// Get template
const template = await window.api.templates.get(1);

// Get template config
const config = await window.api.templates.getConfig(1);

// Create template
const newTemplate = await window.api.templates.create({
  name: 'My Template',
  template_type: 'agent',
  config: { /* template config */ }
});

// Update template
const updated = await window.api.templates.update(1, {
  name: 'Updated Name'
});

// Delete template
const deleted = await window.api.templates.delete(1);

// Find by type
const agentTemplates = await window.api.templates.findByType('agent');

// Duplicate template
const duplicate = await window.api.templates.duplicate(1);
```

### Health API

```javascript
// Get health status
const health = await window.api.health.status();
// Returns: { status, timestamp, version, platform, arch, uptime, memory, database }
```

## Error Handling

All API calls return a response object:

```javascript
{
  success: true,
  data: { /* result data */ }
}

// or

{
  success: false,
  error: 'Error message'
}
```

## Database Schema

### Agents

```sql
CREATE TABLE agents (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT DEFAULT '',
  status TEXT DEFAULT 'active',
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now')),
  deleted_at TEXT
);
```

### Providers

```sql
CREATE TABLE providers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT DEFAULT '',
  api_endpoint TEXT DEFAULT '',
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now')),
  deleted_at TEXT
);
```

### Models

```sql
CREATE TABLE models (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  provider_id INTEGER,
  model_id TEXT NOT NULL,
  description TEXT DEFAULT '',
  context_window INTEGER DEFAULT 0,
  max_output INTEGER DEFAULT 0,
  supports_vision INTEGER DEFAULT 0,
  supports_tools INTEGER DEFAULT 0,
  cost_input REAL DEFAULT 0,
  cost_output REAL DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now')),
  deleted_at TEXT,
  FOREIGN KEY (provider_id) REFERENCES providers(id)
);
```
