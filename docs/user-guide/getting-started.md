# Getting Started

## Installation

### From Source

1. **Prerequisites**
   - Node.js 18 or higher
   - npm or yarn package manager

2. **Clone the repository**
   ```bash
   git clone https://github.com/rashid-ai24/AI-Resource-Manager.git
   cd AI-Resource-Manager
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Start the application**
   ```bash
   npm run dev
   ```

### From Release

1. Download the latest release for your platform from [Releases](https://github.com/rashid-ai24/AI-Resource-Manager/releases)
2. Run the installer
3. Launch AI Resource Manager

## First Launch

On first launch, the application will:

1. Create a local SQLite database in your user data directory
2. Open to the Dashboard view
3. Show quick actions to add your first resources

## Basic Workflow

### 1. Add a Provider

1. Click **Providers** in the sidebar
2. Click **Add Provider** button
3. Enter provider details (name, description, etc.)
4. Save

### 2. Add a Model

1. Click **Models** in the sidebar
2. Click **Add Model** button
3. Select the provider
4. Enter model details
5. Save

### 3. Add an Account

1. Click **Accounts** in the sidebar
2. Click **Add Account** button
3. Select the provider
4. Enter account details
5. Save

### 4. Track Usage

1. Click **Analytics** in the sidebar
2. View usage statistics
3. Track costs by provider/model

## Navigation

### Sidebar Navigation

- **Dashboard** — Overview of all resources
- **Agents** — Manage AI agents
- **Providers** — Manage service providers
- **Models** — Track AI models
- **Accounts** — Manage API accounts
- **API Keys** — Store API keys
- **Projects** — Organize by project
- **Notes** — Add notes to entities
- **Tags** — Categorize resources
- **Search** — Find anything quickly
- **Analytics** — View statistics
- **Activity** — Recent activity log
- **Settings** — Application settings

### Keyboard Navigation

- Use **Ctrl+K** to open the Command Palette
- Use **Ctrl+1-9** to quickly navigate to pages
- Use **Tab** to move between fields
- Use **Enter** to confirm actions
- Use **Escape** to close modals

## Features

### Command Palette

Press **Ctrl+K** to open the command palette. From here you can:

- Navigate to any page
- Create new entities
- Search across all data
- Access recent items

### Global Search

Use the search icon or **Ctrl+F** to search across all entities:

- Agents
- Providers
- Models
- Accounts
- Projects
- Notes

### Tags

Organize your resources with tags:

1. Create tags in the Tags section
2. Add tags to any entity
3. Filter by tags in list views

### Notes

Add notes to any entity:

1. Open an entity detail view
2. Click the Notes tab
3. Add your note
4. Notes are automatically saved

## Data Storage

All data is stored locally in a SQLite database:

- **Location:** `~/.config/ai-resource-manager/` (Linux), `~/Library/Application Support/ai-resource-manager/` (macOS), `%APPDATA%/ai-resource-manager/` (Windows)
- **Format:** SQLite 3
- **Backup:** Use Settings > Backup to create backups

## Troubleshooting

### Application won't start

1. Check Node.js version: `node --version`
2. Reinstall dependencies: `rm -rf node_modules && npm install`
3. Check for errors in console

### Data not saving

1. Check disk space
2. Check database permissions
3. Restart the application

### Performance issues

1. Close other applications
2. Check system resources
3. Restart the application

## Next Steps

- Read the [Features Guide](./features.md) for detailed feature documentation
- Check the [Troubleshooting Guide](./troubleshooting.md) for common issues
- Read the [Developer Guide](../developer/architecture.md) to understand the architecture
