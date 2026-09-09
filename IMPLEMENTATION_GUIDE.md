# AI Resource Manager v2 — Implementation Guide

> **Source of Truth:** `AI_Resource_Manager_v2_Master_Blueprint.md`  
> **Last Updated:** 2026-09-10  
> **Purpose:** Phase-by-phase implementation roadmap for AI coding agents

---

## Overview

This guide breaks the implementation of AI Resource Manager v2 into 17 logical phases. Each phase contains clear objectives, tasks, dependencies, deliverables, acceptance criteria, and testing requirements.

**Prerequisite:** Read `AI_Resource_Manager_v2_Master_Blueprint.md` completely before beginning any phase.

---

## Phase 0: Project Cleanup ✅

### Objectives
- Clean existing project structure
- Remove legacy code
- Establish fresh foundation

### Tasks
- [x] Remove old Habit Tracker code
- [x] Clean package.json dependencies
- [x] Remove unused config files
- [x] Reset .gitignore
- [x] Update README.md

### Dependencies
None

### Deliverables
- Clean project structure
- Updated package.json
- Fresh .gitignore

### Acceptance Criteria
- [x] No legacy code remains
- [x] package.json contains only required dependencies
- [x] Project builds without errors

### Estimated Complexity
Low

### Recommended Commit Size
Small (1-2 files per commit)

### Branch Strategy
`main` — single branch for cleanup

### Testing Requirements
- [x] Clean install works
- [x] No lint errors

### Definition of Done
- Project structure matches Section 11 of Master Blueprint
- All old files removed
- New directory structure ready

### Suggested Milestone
"Fresh Start" — project ready for infrastructure

### Completion Status
**Completed:** 2026-09-10
**Summary:** Removed Habit Tracker code, updated package.json, created .gitignore, updated all component titles and navigation.

---

## Phase 1: Infrastructure ✅

### Objectives
- Set up Electron + Vite + React
- Configure build pipeline
- Establish development environment

### Tasks
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

### Dependencies
Phase 0

### Deliverables
- Electron app shell
- Vite dev server working
- React rendering in Electron

### Acceptance Criteria
- [x] `npm run dev` launches Electron window
- [x] React renders inside Electron
- [x] Hot reload works
- [x] Build pipeline works (`npm run build`)

### Estimated Complexity
Medium

### Recommended Commit Size
Medium (config files together, source files separate)

### Branch Strategy
`feature/phase-1-infrastructure` → merge to `main`

### Testing Requirements
- [ ] App launches without errors
- [ ] Dev server starts
- [ ] Build completes

### Definition of Done
- Electron + Vite + React working
- Dev environment fully configured
- Section 6 of Master Blueprint implemented

### Suggested Milestone
"Foundation" — development environment ready

---

## Phase 2: Database ✅

### Objectives
- Set up SQLite database
- Implement migration system
- Create all database tables
- Seed initial data

### Tasks
- [x] Create database connection (`electron/database.cjs`)
- [x] Implement PRAGMA configuration (WAL, foreign keys, etc.)
- [x] Create migration runner (`src/database/init.js`)
- [x] Create StatementCache class
- [x] Write initial schema migration (`src/database/migrations/001_initial_schema.sql`)
- [x] Write seed data migration (`src/database/seeds/001_default_data.sql`)
- [x] Create all database tables
- [x] Create all indexes
- [x] Implement seed data: 5 providers, 10+ models, default settings
- [x] Create database utilities
- [x] Test migration runner
- [x] Verify PRAGMA settings

### Dependencies
Phase 1

### Deliverables
- Database connection module
- Migration system
- Complete schema
- Seed data

### Acceptance Criteria
- [x] Database creates on first launch
- [x] All migrations run successfully
- [x] Seed data inserted on first launch
- [x] All indexes created
- [x] WAL mode enabled
- [x] Foreign keys enforced

### Estimated Complexity
Medium

### Recommended Commit Size
Medium (database files together)

### Branch Strategy
`feature/phase-2-database` → merge to `main`

### Testing Requirements
- [x] Database creates without errors
- [x] Migrations run forward
- [x] Seed data correct
- [x] Queries execute fast

### Definition of Done
- All tables created per Master Blueprint
- Migration system working
- Seed data populated

### Suggested Milestone
"Data Layer" — database ready for repositories

### Completion Status
**Completed:** 2026-09-10
**Summary:** Created database schema with 10 tables, migration system, seed data for providers and models.

---

## Phase 3: Repositories ✅

### Objectives
- Implement BaseRepository
- Create all entity repositories
- Establish data access patterns

### Tasks
- [x] Create BaseRepository class (`src/database/repositories/BaseRepository.js`)
- [x] Implement CRUD methods (findAll, findById, create, update, delete, count)
- [x] Implement search support
- [x] Create AgentRepository
- [x] Create ProviderRepository
- [x] Create ModelRepository
- [x] Create AccountRepository
- [x] Create ApiKeyRepository
- [x] Create ProjectRepository
- [x] Create NoteRepository
- [x] Create TagRepository
- [x] Create SettingsRepository
- [x] Test each repository

### Dependencies
Phase 2

### Deliverables
- BaseRepository class
- 9 entity repositories
- Repository tests

### Acceptance Criteria
- [x] BaseRepository provides all CRUD operations
- [x] Each repository extends BaseRepository
- [x] List operations support filtering, sorting, pagination
- [x] Search operations work across fields
- [x] All repositories tested

### Estimated Complexity
Medium

### Recommended Commit Size
Small (one repository per commit)

### Branch Strategy
`feature/phase-3-repositories` → merge to `main`

### Testing Requirements
- [x] Unit tests for BaseRepository
- [x] Unit tests for each entity repository
- [x] Integration tests with real database

### Definition of Done
- All repositories implemented
- Each repository follows BaseRepository pattern
- All CRUD operations working

### Suggested Milestone
"Data Access" — repositories ready for services

### Completion Status
**Completed:** 2026-09-10
**Summary:** Created BaseRepository and 9 entity repositories with filtering, sorting, pagination, and relations support.

---

## Phase 4: Services ✅

### Objectives
- Implement BaseService
- Create all entity services
- Establish business logic patterns

### Tasks
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

### Dependencies
Phase 3

### Deliverables
- BaseService class
- 9 entity services

### Acceptance Criteria
- [x] BaseService provides all CRUD operations
- [x] Each service extends BaseService
- [x] Services use repositories for data access
- [x] Business logic implemented in services

### Estimated Complexity
Medium

### Recommended Commit Size
Small (one service per commit)

### Branch Strategy
`feature/phase-4-services` → merge to `main`

### Testing Requirements
- [x] Unit tests for BaseService
- [x] Unit tests for each entity service

### Definition of Done
- All services implemented
- Each service follows BaseService pattern
- All business logic working

### Suggested Milestone
"Business Logic" — services ready for IPC

### Completion Status
**Completed:** 2026-09-10
**Summary:** Created BaseService and 9 entity services with repository integration.

---

## Phase 5: IPC Layer

### Objectives
- Implement IPC handlers
- Create preload script
- Build IPC client for renderer

### Tasks
- [ ] Create IPC handlers for agents (`electron/ipc/agents.ipc.cjs`)
- [ ] Create IPC handlers for providers (`electron/ipc/providers.ipc.cjs`)
- [ ] Create IPC handlers for models (`electron/ipc/models.ipc.cjs`)
- [ ] Create IPC handlers for accounts (`electron/ipc/accounts.ipc.cjs`)
- [ ] Create IPC handlers for api-keys (`electron/ipc/api-keys.ipc.cjs`)
- [ ] Create IPC handlers for projects (`electron/ipc/projects.ipc.cjs`)
- [ ] Create IPC handlers for notes (`electron/ipc/notes.ipc.cjs`)
- [ ] Create IPC handlers for tags (`electron/ipc/tags.ipc.cjs`)
- [ ] Create IPC handlers for usage (`electron/ipc/usage.ipc.cjs`)
- [ ] Create IPC handlers for activity (`electron/ipc/activity.ipc.cjs`)
- [ ] Create IPC handlers for settings (`electron/ipc/settings.ipc.cjs`)
- [ ] Create IPC handlers for backup (`electron/ipc/backup.ipc.cjs`)
- [ ] Create IPC handlers for search (`electron/ipc/search.ipc.cjs`)
- [ ] Create IPC handlers for favorites (`electron/ipc/favorites.ipc.cjs`)
- [ ] Create IPC handlers for templates (`electron/ipc/templates.ipc.cjs`)
- [ ] Implement Zod validation (`electron/lib/validators.cjs`)
- [ ] Create constants (`electron/lib/constants.cjs`)
- [ ] Create file helpers (`electron/utils/file_helpers.cjs`)
- [ ] Create preload script (`electron/preload.cjs`)
- [ ] Create IPC client (`src/lib/ipc.js`)
- [ ] Register all handlers in main.cjs
- [ ] Test IPC roundtrip

### Dependencies
Phase 3

### Deliverables
- 15+ IPC handler files
- Preload script
- IPC client
- Zod validators

### Acceptance Criteria
- [ ] All IPC channels registered
- [ ] Preload script exposes window.api
- [ ] IPC client wraps all API calls
- [ ] Input validation on all handlers
- [ ] Error handling returns { success, data/error }
- [ ] Roundtrip test passes

### Estimated Complexity
High

### Recommended Commit Size
Small (one handler file per commit)

### Branch Strategy
`feature/phase-4-ipc` → merge to `main`

### Testing Requirements
- [ ] Unit tests for validators
- [ ] Integration tests for IPC handlers
- [ ] End-to-end roundtrip tests

### Definition of Done
- All IPC handlers implemented per Master Blueprint Section 8
- Preload script working
- IPC client working
- Validation on all inputs

### Suggested Milestone
"IPC Complete" — renderer can talk to database

---

## Phase 6: React Foundation

### Objectives
- Set up React app shell
- Create layout components
- Implement routing
- Set up state management

### Tasks
- [ ] Create App.jsx with routing
- [ ] Create Layout component
- [ ] Create Sidebar component
- [ ] Create TitleBar component
- [ ] Create StatusBar component
- [ ] Create QueryClient configuration (`src/lib/query-client.js`)
- [ ] Create validators (`src/lib/validators.js`)
- [ ] Create constants (`src/lib/constants.js`)
- [ ] Create utilities (`src/lib/utils.js`)
- [ ] Create sidebar store (`src/stores/sidebar-store.js`)
- [ ] Create command palette store (`src/stores/command-palette-store.js`)
- [ ] Create all page components (skeleton)
- [ ] Implement ThemeProvider
- [ ] Set up keyboard shortcuts
- [ ] Create index.css with design tokens

### Dependencies
Phase 4

### Deliverables
- App shell with layout
- Routing working
- Theme system
- State stores

### Acceptance Criteria
- [ ] App renders with sidebar, titlebar, content, statusbar
- [ ] Navigation between routes works
- [ ] Theme toggles between light/dark
- [ ] Zustand stores functional
- [ ] React Query configured

### Estimated Complexity
Medium

### Recommended Commit Size
Medium (layout components together)

### Branch Strategy
`feature/phase-5-react-foundation` → merge to `main`

### Testing Requirements
- [ ] Layout renders correctly
- [ ] Navigation works
- [ ] Theme toggles

### Definition of Done
- App shell per Master Blueprint Section 9
- All routes defined
- Layout components complete

### Suggested Milestone
"UI Shell" — application skeleton ready

---

## Phase 7: Shared Components

### Objectives
- Build reusable UI components
- Create DataTable system
- Implement dialogs

### Tasks
- [ ] Create all shadcn/ui components
- [ ] Create DataTable component
- [ ] Create DataTableColumnHeader
- [ ] Create DataTablePagination
- [ ] Create DataTableToolbar
- [ ] Create DataTableRowActions
- [ ] Create DataTableEmpty
- [ ] Create DataTableSkeleton
- [ ] Create EntityDialog
- [ ] Create ConfirmDialog
- [ ] Create ExportDialog
- [ ] Create ImportDialog
- [ ] Create BackupDialog
- [ ] Create EmptyState
- [ ] Create ErrorState
- [ ] Create LoadingState
- [ ] Create PageHeader
- [ ] Create SearchInput
- [ ] Create FilterBar
- [ ] Create BulkActions
- [ ] Create SortableList
- [ ] Create VirtualList
- [ ] Create EntityHeader
- [ ] Create EntityInfo
- [ ] Create EntityMetadata
- [ ] Create EntityActions
- [ ] Create EntityTags

### Dependencies
Phase 5

### Deliverables
- 20+ shared components
- DataTable system
- Dialog system

### Acceptance Criteria
- [ ] All shadcn/ui components installed
- [ ] DataTable supports sorting, filtering, pagination
- [ ] DataTable supports bulk selection
- [ ] Dialogs open/close correctly
- [ ] All components use design tokens
- [ ] All components accessible

### Estimated Complexity
High

### Recommended Commit Size
Small (one component per commit)

### Branch Strategy
`feature/phase-6-shared-components` → merge to `main`

### Testing Requirements
- [ ] Component rendering tests
- [ ] Interaction tests
- [ ] Accessibility tests

### Definition of Done
- All shared components per Master Blueprint Sections 36-38
- DataTable working with all features
- Dialogs functional

### Suggested Milestone
"Component Library" — reusable UI ready

---

## Phase 8: Form Engine and Autocomplete

### Objectives
- Build generic form system
- Implement autocomplete

### Tasks
- [ ] Create GenericForm component
- [ ] Create FormFieldRenderer
- [ ] Implement all field types (text, textarea, number, select, autocomplete, checkbox, switch, slider, date, tags)
- [ ] Create useAutocomplete hook
- [ ] Create AutocompleteInput component
- [ ] Create AutocompleteList component
- [ ] Create AutocompleteItem component
- [ ] Create AutocompleteGroup component
- [ ] Create AutocompleteEmpty component
- [ ] Implement debounce (150ms)
- [ ] Test form validation
- [ ] Test autocomplete search

### Dependencies
Phase 6

### Deliverables
- Generic form system
- Autocomplete system

### Acceptance Criteria
- [ ] Forms render from field definitions
- [ ] Validation works with Zod
- [ ] All field types render correctly
- [ ] Autocomplete searches entities
- [ ] Autocomplete keyboard navigation works
- [ ] Autocomplete debounce works

### Estimated Complexity
Medium

### Recommended Commit Size
Medium (form engine + autocomplete)

### Branch Strategy
`feature/phase-7-form-engine` → merge to `main`

### Testing Requirements
- [ ] Form submission tests
- [ ] Validation error tests
- [ ] Autocomplete search tests

### Definition of Done
- Generic form engine per Master Blueprint Section 16
- Autocomplete system per Master Blueprint Section 15

### Suggested Milestone
"Forms Ready" — form system complete

---

## Phase 9: Dashboard

### Objectives
- Build dashboard with 5 widgets
- Implement widget system

### Tasks
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

### Dependencies
Phase 7

### Deliverables
- Dashboard page
- 5 widgets
- Widget grid system

### Acceptance Criteria
- [ ] Dashboard renders 5 widgets
- [ ] StatsWidget shows key metrics
- [ ] QuickActionsWidget provides actions
- [ ] UsageChartWidget shows chart
- [ ] RecentActivityWidget shows activity
- [ ] UpcomingResetsWidget shows resets
- [ ] Grid layout responsive

### Estimated Complexity
Medium

### Recommended Commit Size
Medium (dashboard + widgets)

### Branch Strategy
`feature/phase-8-dashboard` → merge to `main`

### Testing Requirements
- [ ] Widget rendering tests
- [ ] Data display tests

### Definition of Done
- Dashboard per Master Blueprint Section 17
- All 5 widgets functional

### Suggested Milestone
"Dashboard" — home page complete

---

## Phase 10: Core Entities (Providers, Models, Projects)

### Objectives
- Implement providers, models, projects
- Full CRUD for each

### Tasks
- [ ] Create Providers page
- [ ] Create provider-list component
- [ ] Create provider-card component
- [ ] Create provider-detail component
- [ ] Create provider-form component
- [ ] Create provider-columns
- [ ] Create useProviders hook
- [ ] Create Models page
- [ ] Create model-list component
- [ ] Create model-card component
- [ ] Create model-detail component
- [ ] Create model-form component
- [ ] Create model-columns
- [ ] Create useModels hook
- [ ] Create Projects page
- [ ] Create project-list component
- [ ] Create project-card component
- [ ] Create project-detail component
- [ ] Create project-form component
- [ ] Create project-columns
- [ ] Create useProjects hook

### Dependencies
Phase 8

### Deliverables
- Providers module
- Models module
- Projects module

### Acceptance Criteria
- [ ] CRUD operations work for providers
- [ ] CRUD operations work for models
- [ ] CRUD operations work for projects
- [ ] List views with sorting/filtering
- [ ] Detail views with all info
- [ ] Forms with validation

### Estimated Complexity
Medium

### Recommended Commit Size
Small (one entity per commit)

### Branch Strategy
`feature/phase-9-core-entities` → merge to `main`

### Testing Requirements
- [ ] CRUD operation tests
- [ ] List view tests
- [ ] Detail view tests
- [ ] Form validation tests

### Definition of Done
- Providers per Master Blueprint Section 19
- Models per Master Blueprint Section 20
- Projects per Master Blueprint Section 23

### Suggested Milestone
"Core Entities" — main entities complete

---

## Phase 11: Agents

### Objectives
- Implement agents module
- Full CRUD with relationships

### Tasks
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

### Dependencies
Phase 9

### Deliverables
- Agents module
- Relationship handling

### Acceptance Criteria
- [ ] CRUD operations work for agents
- [ ] Model relationship displays
- [ ] Account relationship displays
- [ ] Project relationship displays
- [ ] Tags can be added/removed
- [ ] Notes can be created

### Estimated Complexity
Medium

### Recommended Commit Size
Medium (agents module)

### Branch Strategy
`feature/phase-10-agents` → merge to `main`

### Testing Requirements
- [ ] CRUD operation tests
- [ ] Relationship tests
- [ ] Tag operation tests

### Definition of Done
- Agents per Master Blueprint Section 18
- All relationships working

### Suggested Milestone
"Agents" — agent management complete

---

## Phase 12: Accounts and API Keys

### Objectives
- Implement accounts and API keys
- Security model for keys

### Tasks
- [ ] Create Accounts page
- [ ] Create account-list component
- [ ] Create account-card component
- [ ] Create account-detail component
- [ ] Create account-form component
- [ ] Create account-columns
- [ ] Create useAccounts hook
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

### Dependencies
Phase 10

### Deliverables
- Accounts module
- API Keys module
- Security implementation

### Acceptance Criteria
- [ ] CRUD operations work for accounts
- [ ] CRUD operations work for API keys
- [ ] Keys are hashed with SHA-256
- [ ] Only prefix displayed
- [ ] Full key NOT stored
- [ ] Expiration warnings work

### Estimated Complexity
Medium

### Recommended Commit Size
Small (accounts + api-keys)

### Branch Strategy
`feature/phase-11-accounts-api-keys` → merge to `main`

### Testing Requirements
- [ ] CRUD operation tests
- [ ] Hashing tests
- [ ] Security tests

### Definition of Done
- Accounts per Master Blueprint Section 21
- API Keys per Master Blueprint Section 22

### Suggested Milestone
"Accounts & Keys" — security model complete

---

## Phase 13: Search, Command Palette, Notes, Tags

### Objectives
- Implement search system
- Build command palette
- Add notes and tags

### Tasks
- [ ] Create Search page
- [ ] Implement global search engine
- [ ] Create search results display
- [ ] Create Command Palette component
- [ ] Implement command categories
- [ ] Add keyboard shortcuts (Cmd+K)
- [ ] Create Notes page
- [ ] Create note-editor component
- [ ] Create useNotes hook
- [ ] Create Tags management
- [ ] Create useTags hook
- [ ] Implement entity tag assignment
- [ ] Implement tag filtering

### Dependencies
Phase 11

### Deliverables
- Search system
- Command palette
- Notes module
- Tags module

### Acceptance Criteria
- [ ] Search works across all entities
- [ ] Command palette opens with Cmd+K
- [ ] Command palette navigates to pages
- [ ] Command palette creates entities
- [ ] Notes can be created/edited
- [ ] Tags can be created/assigned

### Estimated Complexity
Medium

### Recommended Commit Size
Medium (search + command palette + notes + tags)

### Branch Strategy
`feature/phase-12-search-features` → merge to `main`

### Testing Requirements
- [ ] Search tests
- [ ] Command palette tests
- [ ] Note CRUD tests
- [ ] Tag assignment tests

### Definition of Done
- Search per Master Blueprint Section 29
- Command Palette per Master Blueprint Section 30
- Notes per Master Blueprint Section 24
- Tags per Master Blueprint Section 25

### Suggested Milestone
"Search & Organization" — find and organize everything

---

## Phase 14: Analytics and Activity

### Objectives
- Build analytics dashboard
- Implement activity tracking

### Tasks
- [ ] Create Analytics page
- [ ] Create usage-trends component
- [ ] Create cost-analysis component
- [ ] Create model-performance component
- [ ] Implement Recharts integration
- [ ] Create activity history display
- [ ] Implement activity logging in repositories
- [ ] Create activity filtering

### Dependencies
Phase 12

### Deliverables
- Analytics page
- Activity tracking system

### Acceptance Criteria
- [ ] Usage trends chart works
- [ ] Cost analysis charts work
- [ ] Model performance charts work
- [ ] Activity history displays
- [ ] Activity logging automatic

### Estimated Complexity
High

### Recommended Commit Size
Medium (analytics + activity)

### Branch Strategy
`feature/phase-13-analytics` → merge to `main`

### Testing Requirements
- [ ] Chart rendering tests
- [ ] Activity logging tests

### Definition of Done
- Analytics per Master Blueprint Section 28
- Activity per Master Blueprint Section 26

### Suggested Milestone
"Analytics" — insights and tracking

---

## Phase 15: Settings, Backup, Import/Export

### Objectives
- Implement settings page
- Build backup/restore system
- Create import/export

### Tasks
- [ ] Create Settings page
- [ ] Create settings categories (Appearance, Data, Notifications, About)
- [ ] Create useSettings hook
- [ ] Create BackupDialog
- [ ] Implement backup service (`electron/services/backup_service.cjs`)
- [ ] Implement export service (`electron/services/export_service.cjs`)
- [ ] Implement import service (`electron/services/import_service.cjs`)
- [ ] Create notification service (`electron/services/notification_service.cjs`)
- [ ] Implement JSON export
- [ ] Implement CSV export
- [ ] Implement JSON import
- [ ] Implement CSV import
- [ ] Implement auto-backup

### Dependencies
Phase 13

### Deliverables
- Settings page
- Backup/restore system
- Import/export system

### Acceptance Criteria
- [ ] Settings save/load correctly
- [ ] Theme toggles work
- [ ] Backup creates file
- [ ] Restore recovers data
- [ ] Export generates JSON/CSV
- [ ] Import loads JSON/CSV
- [ ] Auto-backup runs

### Estimated Complexity
Medium

### Recommended Commit Size
Medium (settings + backup + import/export)

### Branch Strategy
`feature/phase-14-settings-backup` → merge to `main`

### Testing Requirements
- [ ] Settings persistence tests
- [ ] Backup/restore tests
- [ ] Import/export tests

### Definition of Done
- Settings per Master Blueprint Section 52
- Backup/Restore per Master Blueprint Section 50
- Import/Export per Master Blueprint Section 49

### Suggested Milestone
"System Features" — settings and data management

---

## Phase 16: Quotas, Notifications, Favorites, Templates

### Objectives
- Implement quota tracking
- Build notification system
- Add favorites and templates

### Tasks
- [ ] Implement quota tracking
- [ ] Create quota reset logic
- [ ] Create UpcomingResetsWidget
- [ ] Implement notification service
- [ ] Create notification display
- [ ] Create favorites system
- [ ] Create templates system
- [ ] Create saved searches

### Dependencies
Phase 14

### Deliverables
- Quota system
- Notification system
- Favorites system
- Templates system

### Acceptance Criteria
- [ ] Quotas track usage
- [ ] Quotas reset correctly
- [ ] Notifications display
- [ ] Favorites save/load
- [ ] Templates create entities

### Estimated Complexity
Medium

### Recommended Commit Size
Medium (quotas + notifications + favorites + templates)

### Branch Strategy
`feature/phase-15-productivity` → merge to `main`

### Testing Requirements
- [ ] Quota calculation tests
- [ ] Notification tests
- [ ] Favorite persistence tests

### Definition of Done
- Quotas per Master Blueprint Section 27
- Notifications per Master Blueprint Section 51
- Favorites per Master Blueprint Section 54
- Templates per Master Blueprint Section 54

### Suggested Milestone
"Productivity Features" — power user features

---

## Phase 17: Polish and Performance

### Objectives
- Polish UI
- Optimize performance
- Add animations
- Ensure accessibility

### Tasks
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

### Dependencies
Phase 15

### Deliverables
- Polished UI
- Performance optimization
- Accessibility compliance

### Acceptance Criteria
- [ ] Animations smooth (60fps)
- [ ] Large lists performant (1000+ items)
- [ ] All keyboard shortcuts work
- [ ] WCAG 2.1 AA compliant
- [ ] No accessibility violations
- [ ] Performance targets met

### Estimated Complexity
Medium

### Recommended Commit Size
Small (one improvement per commit)

### Branch Strategy
`feature/phase-16-polish` → merge to `main`

### Testing Requirements
- [ ] Performance tests
- [ ] Accessibility tests
- [ ] Animation tests

### Definition of Done
- Animations per Master Blueprint Section 43
- Accessibility per Master Blueprint Section 44
- Performance per Master Blueprint Section 45
- Keyboard shortcuts per Master Blueprint Section 48

### Suggested Milestone
"Polish" — production-ready quality

---

## Phase 18: Testing

### Objectives
- Write comprehensive tests
- Ensure quality

### Tasks
- [ ] Write unit tests for all repositories
- [ ] Write unit tests for all hooks
- [ ] Write integration tests for IPC handlers
- [ ] Write component tests
- [ ] Write E2E tests for critical workflows
- [ ] Achieve 80%+ coverage
- [ ] Fix all failing tests

### Dependencies
Phase 16

### Deliverables
- Complete test suite
- Test coverage report

### Acceptance Criteria
- [ ] All unit tests pass
- [ ] All integration tests pass
- [ ] All E2E tests pass
- [ ] 80%+ coverage
- [ ] No flaky tests

### Estimated Complexity
High

### Recommended Commit Size
Small (test files)

### Branch Strategy
`feature/phase-17-testing` → merge to `main`

### Testing Requirements
- [ ] All tests pass
- [ ] Coverage targets met

### Definition of Done
- Testing per Master Blueprint Section 56
- All acceptance criteria from Section 63 met

### Suggested Milestone
"Quality Assurance" — production ready

---

## Summary

| Phase | Name | Complexity | Dependencies |
|-------|------|------------|--------------|
| 0 | Project Cleanup | Low | None |
| 1 | Infrastructure | Medium | Phase 0 |
| 2 | Database | Medium | Phase 1 |
| 3 | Repositories | Medium | Phase 2 |
| 4 | IPC Layer | High | Phase 3 |
| 5 | React Foundation | Medium | Phase 4 |
| 6 | Shared Components | High | Phase 5 |
| 7 | Form Engine & Autocomplete | Medium | Phase 6 |
| 8 | Dashboard | Medium | Phase 7 |
| 9 | Core Entities | Medium | Phase 8 |
| 10 | Agents | Medium | Phase 9 |
| 11 | Accounts & API Keys | Medium | Phase 10 |
| 12 | Search, Commands, Notes, Tags | Medium | Phase 11 |
| 13 | Analytics & Activity | High | Phase 12 |
| 14 | Settings, Backup, Import/Export | Medium | Phase 13 |
| 15 | Quotas, Notifications, Favorites, Templates | Medium | Phase 14 |
| 16 | Polish & Performance | Medium | Phase 15 |
| 17 | Testing | High | Phase 16 |

---

*This guide complements the Master Blueprint. Always refer to `AI_Resource_Manager_v2_Master_Blueprint.md` for detailed specifications.*
