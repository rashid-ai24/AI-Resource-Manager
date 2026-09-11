# AI Resource Manager v2

A premium, offline-first desktop application for personal management of all AI-related resources.

## Features

- **Agent Management** — Track and manage AI agents with full CRUD operations
- **Provider Management** — Organize AI service providers (OpenAI, Anthropic, etc.)
- **Model Management** — Track AI models with metadata and capabilities
- **Account Management** — Manage API accounts and billing
- **API Key Management** — Securely store and manage API keys
- **Project Management** — Organize resources by project
- **Notes & Tags** — Add notes and tags to any entity
- **Analytics** — Track usage, costs, and performance
- **Search** — Global search across all entities
- **Command Palette** — Quick access to all features (Ctrl+K)
- **Keyboard Shortcuts** — Navigate efficiently with keyboard

## Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/rashid-ai24/AI-Resource-Manager.git
cd AI-Resource-Manager

# Install dependencies
npm install

# Start development
npm run dev
```

### Building

```bash
# Build for current platform
npm run electron:build

# Build for specific platform
npm run electron:build:win
npm run electron:build:mac
npm run electron:build:linux
```

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| Ctrl+K | Open Command Palette |
| Ctrl+/ | Show Keyboard Shortcuts |
| Ctrl+1-9 | Navigate to pages |
| Ctrl+N | Create new entity |
| Ctrl+F | Focus search |
| Escape | Close modals/palette |

## Documentation

- [User Guide](./user-guide/getting-started.md)
- [Developer Guide](./developer/architecture.md)
- [API Documentation](./developer/api.md)
- [Contributing](./developer/contributing.md)

## Technology Stack

- Electron 44
- React 19
- Vite 8
- Tailwind CSS v4
- shadcn/ui
- Zustand
- TanStack Query
- better-sqlite3
- Lucide Icons

## License

MIT
