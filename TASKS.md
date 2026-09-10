# AI Resource Manager v2 — Tasks

> **Source of Truth:** `AI_Resource_Manager_v2_Master_Blueprint.md`
> **Last Updated:** 2026-09-10
> **Purpose:** Complete development checklist

---

## Phase 0: Project Cleanup ✅

- [x] Remove old Habit Tracker code
- [x] Clean package.json dependencies
- [x] Remove unused config files
- [x] Reset .gitignore
- [x] Update README.md

---

## Phase 1: Infrastructure ✅

- [x] Initialize Electron main process (`electron/main.cjs`)
- [x] Configure Vite (`vite.config.js`)
- [x] Set up React entry point (`src/main.jsx`)
- [x] Configure Tailwind CSS v4 (`tailwind.config.js`)
- [x] Set up shadcn/ui (`components.json`)
- [ ] Configure ESLint (`.eslintrc.cjs`)
- [ ] Configure Prettier (`.prettierrc`)
- [x] Set up PostCSS (`postcss.config.js`)
- [ ] Configure electron-builder (`electron-builder.yml`)
- [ ] Set up forge config (`forge.config.cjs`)
- [x] Create jsconfig.json
- [ ] Create .env.example

---

## Phase 2: Database ✅

- [x] Create database connection (`electron/database.cjs`)
- [x] Implement PRAGMA configuration (WAL, foreign keys, etc.)
- [x] Create migration runner (`src/database/init.js`)
- [x] Create StatementCache class
- [x] Write initial schema migration (`src/database/migrations/001_initial_schema.sql`)
- [x] Write seed data migration (`src/database/seeds/001_default_data.sql`)
- [x] Create providers table
- [x] Create models table
- [x] Create accounts table
- [x] Create api_keys table
- [x] Create agents table
- [x] Create projects table
- [x] Create notes table
- [x] Create tags table
- [x] Create entity_tags junction tables
- [x] Create settings table
- [x] Create all indexes
- [x] Implement seed data: OpenAI provider
- [x] Implement seed data: Anthropic provider
- [x] Implement seed data: Google AI provider
- [x] Implement seed data: Mistral AI provider
- [x] Implement seed data: Local provider
- [x] Implement seed data: OpenAI models (GPT-4o, GPT-4o Mini, GPT-4 Turbo)
- [x] Implement seed data: Anthropic models (Claude 3.5 Sonnet, Claude 3.5 Haiku, Claude 3 Opus)
- [x] Implement seed data: Google models (Gemini 2.0 Flash, Gemini 1.5 Pro)
- [x] Implement seed data: Mistral models (Mistral Large, Mistral Small)
- [x] Implement seed data: default settings

---

## Phase 3: Repositories ✅

- [x] Create BaseRepository class (`src/database/repositories/BaseRepository.js`)
- [x] Implement getById method
- [x] Implement findAll method with filtering
- [x] Implement findAll method with sorting
- [x] Implement findAll method with pagination
- [x] Implement create method
- [x] Implement update method
- [x] Implement delete method
- [x] Implement count method
- [x] Implement search method
- [x] Create AgentRepository
- [x] Create ProviderRepository
- [x] Create ModelRepository
- [x] Create AccountRepository
- [x] Create ApiKeyRepository
- [x] Create ProjectRepository
- [x] Create NoteRepository
- [x] Create TagRepository
- [x] Create SettingsRepository

---

## Phase 4: Services ✅

- [x] Create BaseService class (`src/services/BaseService.js`)
- [x] Create AgentService
- [x] Create ProviderService
- [x] Create ModelService
- [x] Create AccountService
- [x] Create ApiKeyService
- [x] Create ProjectService
- [x] Create NoteService
- [x] Create TagService
- [x] Create SettingsService

---

## Phase 6: IPC Layer ✅

- [x] Create IPC handlers for agents (`electron/ipc/agents.ipc.cjs`)
- [x] Create IPC handlers for providers (`electron/ipc/providers.ipc.cjs`)
- [x] Create IPC handlers for models (`electron/ipc/models.ipc.cjs`)
- [x] Create IPC handlers for accounts (`electron/ipc/accounts.ipc.cjs`)
- [x] Create IPC handlers for api-keys (`electron/ipc/api-keys.ipc.cjs`)
- [x] Create IPC handlers for projects (`electron/ipc/projects.ipc.cjs`)
- [x] Create IPC handlers for notes (`electron/ipc/notes.ipc.cjs`)
- [x] Create IPC handlers for tags (`electron/ipc/tags.ipc.cjs`)
- [x] Create IPC handlers for settings (`electron/ipc/settings.ipc.cjs`)
- [x] Implement Zod validation (`electron/lib/validators.cjs`)
- [x] Create constants (`electron/lib/constants.cjs`)
- [x] Create repositories for main process (`electron/repositories/`)
- [x] Update preload script (`electron/preload.cjs`)
- [x] Create IPC client (`src/lib/ipc.js`)
- [x] Register all handlers in main.cjs

---

## Phase 7: React Foundation ✅

- [x] Create App.jsx with routing
- [x] Create Layout component
- [x] Create Sidebar component
- [x] Create TitleBar component
- [x] Create StatusBar component
- [x] Create QueryClient configuration (`src/lib/query-client.js`)
- [x] Create validators (`src/lib/validators.js`)
- [x] Create constants (`src/lib/constants.js`)
- [x] Create utilities (`src/lib/utils.js`)
- [x] Create sidebar store (`src/stores/sidebar-store.js`)
- [x] Create command palette store (`src/stores/command-palette-store.js`)
- [x] Create Dashboard page (skeleton)
- [x] Create Agents page (skeleton)
- [x] Create Providers page (skeleton)
- [x] Create Models page (skeleton)
- [x] Create Accounts page (skeleton)
- [x] Create API Keys page (skeleton)
- [x] Create Projects page (skeleton)
- [x] Create Notes page (skeleton)
- [x] Create Settings page (skeleton)
- [x] Implement ThemeProvider
- [x] Set up keyboard shortcuts
- [x] Create index.css with design tokens

---

## Phase 7: Shared Components (UI Foundation) ✅

### Layout Components
- [x] AppLayout
- [x] PageContainer
- [x] PageHeader
- [x] Breadcrumbs
- [x] StatusBar

### Navigation Components
- [x] SidebarGroup
- [x] SearchEntry
- [x] RecentItems
- [x] Favorites
- [x] NavigationRail

### Card Components
- [x] StatCard
- [x] EntityCard
- [x] MetricCard
- [x] EmptyCard
- [x] ActivityCard
- [x] DashboardCard

### Feedback Components
- [x] LoadingSpinner
- [x] Skeleton
- [x] EmptyState
- [x] ErrorState
- [x] SuccessState

### Badge Components
- [x] StatusBadge
- [x] ProviderBadge
- [x] AgentBadge
- [x] ModelBadge

### Button Components
- [x] CopyButton
- [x] IconButton
- [x] ActionButton
- [x] SplitButton

### Dialog Components
- [x] BaseDialog
- [x] ConfirmDialog
- [x] DeleteDialog
- [x] SettingsDialog

### Utility Components
- [x] ContextMenu
- [x] KeyboardShortcut

### Theme Components
- [x] ThemeProvider (enhanced)
- [x] ThemeSwitcher

### shadcn/ui Components
- [ ] alert-dialog
- [x] badge
- [x] button
- [ ] calendar
- [x] card
- [x] checkbox
- [ ] command
- [x] dialog
- [ ] dropdown-menu
- [ ] form
- [x] input
- [x] label
- [ ] popover
- [x] scroll-area
- [x] select
- [x] separator
- [ ] sheet
- [x] skeleton
- [x] table
- [x] tabs
- [x] textarea
- [ ] toast
- [x] tooltip

### DataTable Components
- [ ] DataTable
- [ ] DataTableColumnHeader
- [ ] DataTablePagination
- [ ] DataTableToolbar
- [ ] DataTableRowActions
- [ ] DataTableEmpty
- [ ] DataTableSkeleton

---

## Phase 8: Form Engine and Autocomplete ✅

- [x] Create GenericForm component
- [x] Create FormFieldRenderer
- [x] Implement text field type
- [x] Implement textarea field type
- [x] Implement number field type
- [x] Implement select field type
- [x] Implement autocomplete field type
- [x] Implement checkbox field type
- [x] Implement switch field type
- [x] Implement slider field type
- [x] Implement date field type
- [x] Implement tags field type
- [x] Create useAutocomplete hook
- [x] Create AutocompleteInput component
- [x] Create AutocompleteList component
- [x] Create AutocompleteItem component
- [x] Create AutocompleteGroup component
- [x] Create AutocompleteEmpty component
- [x] Implement debounce (150ms)
- [x] Test form validation
- [ ] Test autocomplete search

---

## Phase 9: Dashboard

- [ ] Create Dashboard page
- [ ] Create StatsWidget
- [ ] Create QuickActionsWidget
- [ ] Create UsageChartWidget
- [ ] Create RecentActivityWidget
- [ ] Create UpcomingResetsWidget
- [ ] Create dashboard columns
- [ ] Implement widget grid layout
- [ ] Connect widgets to data sources
- [ ] Test widget rendering

---

## Phase 10: Core Entities (Providers, Models, Projects)

### Providers
- [ ] Create Providers page
- [ ] Create provider-list component
- [ ] Create provider-card component
- [ ] Create provider-detail component
- [ ] Create provider-form component
- [ ] Create provider-columns
- [ ] Create useProviders hook

### Models
- [ ] Create Models page
- [ ] Create model-list component
- [ ] Create model-card component
- [ ] Create model-detail component
- [ ] Create model-form component
- [ ] Create model-columns
- [ ] Create useModels hook

### Projects
- [ ] Create Projects page
- [ ] Create project-list component
- [ ] Create project-card component
- [ ] Create project-detail component
- [ ] Create project-form component
- [ ] Create project-columns
- [ ] Create useProjects hook

---

## Phase 11: Agents

- [ ] Create Agents page
- [ ] Create agent-list component
- [ ] Create agent-card component
- [ ] Create agent-detail component
- [ ] Create agent-form component
- [ ] Create agent-columns
- [ ] Create useAgents hook
- [ ] Implement agent-model relationship
- [ ] Implement agent-account relationship
- [ ] Implement agent-project relationship
- [ ] Implement agent tags
- [ ] Implement agent notes

---

## Phase 12: Accounts and API Keys

### Accounts
- [ ] Create Accounts page
- [ ] Create account-list component
- [ ] Create account-card component
- [ ] Create account-detail component
- [ ] Create account-form component
- [ ] Create account-columns
- [ ] Create useAccounts hook

### API Keys
- [ ] Create API Keys page
- [ ] Create api-key-list component
- [ ] Create api-key-card component
- [ ] Create api-key-detail component
- [ ] Create api-key-form component
- [ ] Create api-key-columns
- [ ] Create useApiKeys hook
- [ ] Implement SHA-256 hashing
- [ ] Implement key prefix display
- [ ] Implement expiration tracking

---

## Phase 13: Search, Command Palette, Notes, Tags

### Search
- [ ] Create Search page
- [ ] Implement global search engine
- [ ] Create search results display
- [ ] Create useSearch hook

### Command Palette
- [ ] Create Command Palette component
- [ ] Implement command categories
- [ ] Add keyboard shortcuts (Cmd+K)
- [ ] Implement navigation commands
- [ ] Implement create commands
- [ ] Implement action commands

### Notes
- [ ] Create Notes page
- [ ] Create note-editor component
- [ ] Create useNotes hook
- [ ] Implement auto-save

### Tags
- [ ] Create Tags management
- [ ] Create useTags hook
- [ ] Implement entity tag assignment
- [ ] Implement tag filtering

---

## Phase 14: Analytics and Activity

### Analytics
- [ ] Create Analytics page
- [ ] Create usage-trends component
- [ ] Create cost-analysis component
- [ ] Create model-performance component
- [ ] Implement Recharts integration

### Activity
- [ ] Create activity history display
- [ ] Implement activity logging in repositories
- [ ] Create activity filtering

---

## Phase 15: Settings, Backup, Import/Export

### Settings
- [ ] Create Settings page
- [ ] Create Appearance settings
- [ ] Create Data settings
- [ ] Create Notification settings
- [ ] Create About settings
- [ ] Create useSettings hook

### Backup/Restore
- [ ] Create BackupDialog
- [ ] Implement backup service (`electron/services/backup_service.cjs`)
- [ ] Implement auto-backup
- [ ] Implement restore

### Import/Export
- [ ] Implement export service (`electron/services/export_service.cjs`)
- [ ] Implement import service (`electron/services/import_service.cjs`)
- [ ] Implement JSON export
- [ ] Implement CSV export
- [ ] Implement JSON import
- [ ] Implement CSV import

---

## Phase 16: Quotas, Notifications, Favorites, Templates

### Quotas
- [ ] Implement quota tracking
- [ ] Create quota reset logic
- [ ] Create UpcomingResetsWidget

### Notifications
- [ ] Implement notification service (`electron/services/notification_service.cjs`)
- [ ] Create notification display
- [ ] Implement notification types

### Favorites
- [ ] Create favorites system
- [ ] Create useFavorites hook

### Templates
- [ ] Create templates system
- [ ] Create useTemplates hook

### Saved Searches
- [ ] Create saved searches system

---

## Phase 17: Polish and Performance

- [ ] Add page transition animations
- [ ] Add dialog animations
- [ ] Add hover effects
- [ ] Implement virtualization for large lists
- [ ] Optimize React Query caching
- [ ] Optimize database queries
- [ ] Add keyboard shortcuts
- [ ] Test WCAG 2.1 AA compliance
- [ ] Add ARIA labels
- [ ] Test color contrast
- [ ] Test screen reader compatibility
- [ ] Performance profiling
- [ ] Bundle size optimization

---

## Phase 18: Testing

- [ ] Write unit tests for BaseRepository
- [ ] Write unit tests for AgentRepository
- [ ] Write unit tests for ProviderRepository
- [ ] Write unit tests for ModelRepository
- [ ] Write unit tests for AccountRepository
- [ ] Write unit tests for ApiKeyRepository
- [ ] Write unit tests for ProjectRepository
- [ ] Write unit tests for NoteRepository
- [ ] Write unit tests for TagRepository
- [ ] Write unit tests for SettingsRepository
- [ ] Write unit tests for useAgents hook
- [ ] Write unit tests for useProviders hook
- [ ] Write unit tests for useModels hook
- [ ] Write unit tests for useAccounts hook
- [ ] Write unit tests for useApiKeys hook
- [ ] Write unit tests for useProjects hook
- [ ] Write unit tests for useTags hook
- [ ] Write unit tests for useNotes hook
- [ ] Write unit tests for useSettings hook
- [ ] Write integration tests for IPC handlers
- [ ] Write component tests for shared components
- [ ] Write E2E tests for critical workflows
- [ ] Achieve 80%+ coverage
- [ ] Fix all failing tests

---

*This checklist complements the Master Blueprint. Always refer to `AI_Resource_Manager_v2_Master_Blueprint.md` for detailed specifications.*
