# Architecture

## Overview

AI Resource Manager v2 is an Electron desktop application with a React frontend and SQLite database backend.

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Electron Main Process                     │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐ │
│  │  Database    │  │  IPC        │  │  Services           │ │
│  │  (SQLite)   │  │  Handlers   │  │  (Business Logic)   │ │
│  └─────────────┘  └─────────────┘  └─────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ IPC
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                   Electron Renderer Process                  │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐ │
│  │  React      │  │  Hooks      │  │  Components         │ │
│  │  Router     │  │  (TanStack) │  │  (UI)               │ │
│  └─────────────┘  └─────────────┘  └─────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## Data Flow

### IPC Communication

```
Renderer → preload.cjs → ipc.js → IPC Handler → Repository → SQLite
```

1. **Renderer Process** calls `window.api.entity.method()`
2. **preload.cjs** exposes API via `contextBridge`
3. **ipc.js** wraps IPC calls with error handling
4. **IPC Handler** validates input and calls repository
5. **Repository** performs database operations
6. **SQLite** stores data

### Example: Creating an Agent

```javascript
// 1. Component calls hook
const { create } = useAgents();
await create.mutateAsync({ name: 'My Agent' });

// 2. Hook calls IPC
const result = await ipc.agents.create({ name: 'My Agent' });

// 3. IPC calls preload
const result = await window.api.agents.create({ name: 'My Agent' });

// 4. Preload invokes IPC handler
ipcRenderer.invoke('agents:create', { name: 'My Agent' });

// 5. IPC handler validates and calls repository
const agent = agentRepository.create({ name: 'My Agent' });

// 6. Repository inserts into SQLite
db.prepare('INSERT INTO agents (name) VALUES (?)').run('My Agent');
```

## Directory Structure

```
ai-resource-manager/
├── electron/                    # Main process
│   ├── main.cjs                # Entry point
│   ├── preload.cjs             # Context bridge
│   ├── database.cjs            # Database setup
│   ├── health.cjs              # Health check
│   ├── ipc/                    # IPC handlers
│   │   ├── agents.ipc.cjs
│   │   ├── providers.ipc.cjs
│   │   └── ...
│   ├── repositories/           # Data access
│   │   ├── base_repository.cjs
│   │   ├── agent_repository.cjs
│   │   └── ...
│   └── services/               # Business logic
│       └── notification_service.cjs
├── src/                        # Renderer process
│   ├── App.jsx                 # Root component
│   ├── main.jsx                # Entry point
│   ├── components/             # UI components
│   │   ├── ui/                 # shadcn/ui
│   │   ├── common/             # Shared components
│   │   ├── features/           # Feature components
│   │   └── layout/             # Layout components
│   ├── hooks/                  # React hooks
│   ├── lib/                    # Utilities
│   │   ├── ipc.js              # IPC client
│   │   ├── config.js           # Configuration
│   │   └── utils.js            # Utilities
│   └── pages/                  # Route pages
├── docs/                       # Documentation
├── package.json
└── vite.config.js
```

## Technology Stack

### Frontend

- **React 19** — UI library
- **React Router 7** — Routing
- **TanStack Query** — Server state management
- **Zustand** — Client state management
- **Tailwind CSS 4** — Styling
- **shadcn/ui** — UI components
- **Lucide** — Icons
- **Motion** — Animations

### Backend

- **Electron 44** — Desktop framework
- **better-sqlite3** — SQLite driver
- **Node.js** — Runtime

### Build Tools

- **Vite 8** — Build tool
- **electron-builder** — Packaging
- **Vitest** — Testing

## Database Schema

### Core Tables

```sql
-- Agents
CREATE TABLE agents (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT DEFAULT '',
  status TEXT DEFAULT 'active',
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now')),
  deleted_at TEXT
);

-- Providers
CREATE TABLE providers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT DEFAULT '',
  api_endpoint TEXT DEFAULT '',
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now')),
  deleted_at TEXT
);

-- Models
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

### Soft Delete Pattern

All entities use soft delete:

```sql
-- Deleted items have deleted_at set
UPDATE agents SET deleted_at = datetime('now') WHERE id = 1;

-- Queries filter out deleted items
SELECT * FROM agents WHERE deleted_at IS NULL;
```

## Design Patterns

### Repository Pattern

All database access goes through repositories:

```javascript
// Base Repository
class BaseRepository {
  findAll(filters) { /* ... */ }
  findById(id) { /* ... */ }
  create(data) { /* ... */ }
  update(id, data) { /* ... */ }
  delete(id) { /* ... */ }
}

// Entity Repository
class AgentRepository extends BaseRepository {
  // Entity-specific methods
}
```

### Hook Pattern

React hooks wrap IPC calls:

```javascript
function useAgents() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['agents'],
    queryFn: () => ipc.agents.list(),
  });

  const create = useMutation({
    mutationFn: (data) => ipc.agents.create(data),
    onSuccess: () => queryClient.invalidateQueries(['agents']),
  });

  return { data, isLoading, create };
}
```

### Component Pattern

Components follow single responsibility:

```javascript
// Container component
function AgentList() {
  const { data, isLoading } = useAgents();
  
  if (isLoading) return <LoadingSpinner />;
  
  return (
    <div>
      {data.map(agent => (
        <AgentCard key={agent.id} agent={agent} />
      ))}
    </div>
  );
}

// Presentation component
function AgentCard({ agent }) {
  return (
    <Card>
      <h3>{agent.name}</h3>
      <p>{agent.description}</p>
    </Card>
  );
}
```

## State Management

### Server State (TanStack Query)

- Automatic caching
- Background refetching
- Optimistic updates
- Error handling

### Client State (Zustand)

- UI state
- Form state
- Theme preferences

## Testing Strategy

### Unit Tests

- Repository methods
- Utility functions
- Custom hooks

### Component Tests

- Component rendering
- User interactions
- Error states

### Integration Tests

- IPC handlers
- End-to-end flows

## Performance

### Code Splitting

- Lazy load routes
- Dynamic imports
- Bundle analysis

### Caching

- React Query cache
- SQLite WAL mode
- Electron cache

### Optimization

- Virtual scrolling
- Memoization
- Debounced search
