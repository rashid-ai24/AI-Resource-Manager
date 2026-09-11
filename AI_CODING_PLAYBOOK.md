# AI Resource Manager v2 — AI Coding Playbook

> **Source of Truth:** `AI_Resource_Manager_v2_Master_Blueprint.md`  
> **Last Updated:** 2026-09-10  
> **Purpose:** Operating manual for AI coding agents

---

## Progress Summary

| Phase | Status | Files Created |
|-------|--------|---------------|
| Phase 0: Project Cleanup | ✅ Completed | package.json, .gitignore, index.html |
| Phase 1: Infrastructure | ✅ Completed | main.cjs, preload.cjs, vite.config.js |
| Phase 2: Database | ✅ Completed | database.cjs, migrations/, seeds/, init.js |
| Phase 3: Repositories | ✅ Completed | BaseRepository + 9 entity repositories |
| Phase 4: Services | ✅ Completed | BaseService + 9 entity services |
| Phase 5: UI Foundation | ✅ Completed | 30+ reusable UI components |
| Phase 6: IPC Layer | ✅ Completed | IPC handlers, validators, preload, ipc client |
| Phase 7: React Foundation | ✅ Completed | QueryClient, stores, validators, constants, page skeletons |
| Phase 8: Form Engine | ✅ Completed | GenericForm, FormFieldRenderer, autocomplete, form-schemas |
| Phase 9: Dashboard | ✅ Completed | StatsWidget, QuickActionsWidget, UsageChartWidget, RecentActivityWidget, UpcomingResetsWidget |
| Phase 10: Core Entities | ✅ Completed | Providers, Models, Projects |
| Phase 11: Agents | ✅ Completed | Agent management |
| Phase 12: Accounts/API Keys | ✅ Completed | Account and API key management |
| Phase 13: Search/Commands | ✅ Completed | Search, command palette, notes, tags |
| Phase 14: Analytics | ✅ Complete | 2026-09-11 |
| Phase 15: Settings/Backup | ⏳ Pending | - |
| Phase 16: Quotas/Notifications | ⏳ Pending | - |
| Phase 17: Polish | ⏳ Pending | - |
| Phase 18: Testing | ⏳ Pending | - |

---

## 1. Project Philosophy

### 1.1 What We Build
AI Resource Manager v2 is a premium, offline-first desktop application for personal management of all AI-related resources.

### 1.2 Core Principles
- **Offline-first:** SQLite is the single source of truth.
- **Database-driven:** Zero hardcoded values.
- **Keyboard-first:** Every action accessible via keyboard.
- **Premium feel:** Inspired by Linear, Raycast, Cursor, Arc Browser, and Notion.
- **Simple architecture:** 2-layer renderer stack, generic systems, minimal abstraction.

### 1.3 Technology
Electron 44, React 19, Vite 8, Tailwind CSS v4, shadcn/ui, Zustand, TanStack Query, TanStack Table, TanStack Virtual, React Hook Form, Zod, Recharts, better-sqlite3, Lucide, Motion.

---

## 2. Development Workflow

### 2.1 Before Starting
1. Read `AI_Resource_Manager_v2_Master_Blueprint.md`
2. Read `AGENT_RULES.md`
3. Read `IMPLEMENTATION_GUIDE.md`
4. Understand the current phase
5. Understand dependencies

### 2.2 During Implementation
1. Follow the phase plan
2. Implement one feature at a time
3. Test as you go
4. Commit frequently
5. Follow coding standards

### 2.3 After Implementation
1. Run all tests
2. Run lint
3. Run build
4. Update documentation

---

## 3. Naming Conventions

### 3.1 Files
| Type | Convention | Example |
|------|------------|---------|
| Components | kebab-case | `agent-list.jsx` |
| Hooks | kebab-case with `use-` | `use-agents.js` |
| Services | kebab-case with `-service` | `backup-service.cjs` |
| Repositories | kebab-case with `-repository` | `agent-repository.cjs` |
| IPC | kebab-case with `.ipc` | `agents.ipc.cjs` |
| Utilities | kebab-case | `utils.js` |
| Config | kebab-case | `vite.config.js` |

### 3.2 Code
| Type | Convention | Example |
|------|------------|---------|
| Variables | camelCase | `agentList` |
| Functions | camelCase | `getAgent` |
| Components | PascalCase | `AgentList` |
| Constants | UPPER_SNAKE_CASE | `API_TIMEOUT` |
| Types | PascalCase | `AgentType` |

### 3.3 CSS
| Type | Convention | Example |
|------|------------|---------|
| Classes | kebab-case | `agent-list` |
| Tailwind | Utility classes | `flex items-center` |
| BEM | block__element--modifier | `card__header--active` |

---

## 4. Folder Conventions

### 4.1 Feature Folders
```
features/agents/
  index.js          # Barrel export
  agents.jsx        # Page component
  agent-list.jsx    # List component
  agent-card.jsx    # Card component
  agent-detail.jsx  # Detail component
  agent-form.jsx    # Form component
  agent-columns.jsx # DataTable column definitions
```

### 4.2 Shared Folders
```
components/shared/
  layout/           # Layout components
  data-table/       # DataTable components
  dialogs/          # Dialog components
  shared/           # Shared components
  entity/           # Entity components
```

### 4.3 Hook Folders
```
hooks/
  index.js          # Barrel export
  use-agents.js     # Agent hook
  use-providers.js  # Provider hook
  ...
```

---

## 5. Component Conventions

### 5.1 Component Structure
```jsx
// Component definition
function ComponentName({ prop1, prop2 }) {
  // Hooks
  // State
  // Handlers
  // Render
}

// Export
export default ComponentName
```

### 5.2 Component Rules
- One component per file
- Maximum 200 lines
- Use composition over inheritance
- Use shared components
- Use design tokens
- Handle loading states
- Handle error states
- Handle empty states

### 5.3 Component Template
```jsx
import { useEntity } from '../../hooks/use-entity'
import { PageHeader } from '../shared/PageHeader'
import { DataTable } from '../shared/data-table/DataTable'
import { EmptyState } from '../shared/EmptyState'

function EntityPage() {
  const { data, isLoading, error } = useEntity('entities')

  if (isLoading) return <LoadingState />
  if (error) return <ErrorState error={error} />
  if (!data?.length) return <EmptyState />

  return (
    <div>
      <PageHeader title="Entities" />
      <DataTable data={data} columns={columns} />
    </div>
  )
}

export default EntityPage
```

---

## 6. Repository Conventions

### 6.1 Repository Structure
```javascript
const BaseRepository = require('./base_repository')

class EntityRepository extends BaseRepository {
  constructor(db) {
    super(db, 'entities')
  }

  // Custom queries here
}

module.exports = EntityRepository
```

### 6.2 Repository Rules
- Extend BaseRepository
- Override methods only when needed
- Use prepared statements
- Use parameterized queries
- Use transactions for batch operations
- Support filtering, sorting, pagination

### 6.3 Repository Template
```javascript
const BaseRepository = require('./base_repository')

class EntityRepository extends BaseRepository {
  constructor(db) {
    super(db, 'entities')
  }

  list(filters = {}) {
    let sql = `
      SELECT e.*, 
        r.name as related_name
      FROM entities e
      LEFT JOIN related r ON e.related_id = r.id
      WHERE e.deleted_at IS NULL
    `
    const params = []

    if (filters.status) {
      sql += ` AND e.status = ?`
      params.push(filters.status)
    }

    if (filters.search) {
      sql += ` AND (e.name LIKE ? OR e.description LIKE ?)`
      params.push(`%${filters.search}%`, `%${filters.search}%`)
    }

    sql += ` ORDER BY e.created_at DESC`
    return this.db.prepare(sql).all(...params)
  }
}

module.exports = EntityRepository
```

---

## 7. Hook Conventions

### 7.1 Hook Structure
```javascript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/ipc'

export function useEntities(filters) {
  const queryClient = useQueryClient()

  const query = useQuery({
    queryKey: ['entities', filters],
    queryFn: () => api.entities.list(filters),
  })

  const create = useMutation({
    mutationFn: (data) => api.entities.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['entities'] })
    },
  })

  const update = useMutation({
    mutationFn: ({ id, ...data }) => api.entities.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['entities'] })
    },
  })

  const remove = useMutation({
    mutationFn: (id) => api.entities.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['entities'] })
    },
  })

  return {
    data: query.data,
    isLoading: query.isLoading,
    error: query.error,
    create,
    update,
    remove,
  }
}
```

### 7.2 Hook Rules
- Use React Query for server state
- Use Zustand for UI state
- Use React Hook Form for forms
- Query keys must be consistent
- Invalidate cache on mutations
- Return loading and error states

---

## 8. Service Conventions

### 8.1 Service Structure
```javascript
class EntityService {
  constructor(db) {
    this.db = db
  }

  async doSomething() {
    try {
      // Business logic
      return { success: true, data }
    } catch (error) {
      console.error('Service error:', error)
      return { success: false, error: error.message }
    }
  }
}

module.exports = EntityService
```

### 8.2 Service Rules
- Handle errors
- Log errors
- Return { success, data/error }
- No UI logic
- No database access (use repositories)

---

## 9. Database Conventions

### 9.1 Table Rules
- Use snake_case for table names
- Use snake_case for column names
- Include id, created_at, updated_at, deleted_at
- Use foreign keys
- Use indexes for common queries
- Use soft delete

### 9.2 Migration Rules
- Use YYYYMMDDHHMMSS_description.sql naming
- One migration per file
- Include rollback logic
- Test migrations

### 9.3 Query Rules
- Use parameterized queries
- Use prepared statements
- Use transactions for batch operations
- Use indexes
- Avoid N+1 queries
- Avoid SELECT *

---

## 10. Commit Conventions

### 10.1 Commit Messages
```
type(scope): description

[optional body]

[optional footer]
```

### 10.2 Types
- feat: New feature
- fix: Bug fix
- refactor: Code refactor
- test: Adding tests
- docs: Documentation
- style: Code style
- chore: Build process
- perf: Performance

### 10.3 Examples
```
feat(agents): add agent list page
fix(api-keys): fix key hashing
refactor(repositories): extract base repository
test(agents): add unit tests
docs(readme): update setup instructions
```

---

## 11. Pull Request Expectations

### 11.1 PR Title
- Follow commit message format
- Reference issue if applicable

### 11.2 PR Description
- What changed
- Why changed
- How to test
- Screenshots if UI changed

### 11.3 PR Checklist
- [ ] Code follows style guidelines
- [ ] Tests pass
- [ ] Lint passes
- [ ] Build passes
- [ ] Documentation updated
- [ ] No breaking changes
- [ ] Accessibility checked

---

## 12. Definition of Done

### 12.1 Feature Done
- [ ] Code complete
- [ ] Tests written
- [ ] Tests pass
- [ ] Lint clean
- [ ] Build passes
- [ ] Documentation updated
- [ ] PR created
- [ ] Review approved
- [ ] Merged

### 12.2 Phase Done
- [ ] All tasks complete
- [ ] All acceptance criteria met
- [ ] All tests pass
- [ ] Documentation complete
- [ ] Milestone reached

---

## 13. Refactoring Strategy

### 13.1 When to Refactor
- Code duplication
- Complex functions
- Poor naming
- Missing tests
- Performance issues

### 13.2 How to Refactor
1. Understand current behavior
2. Write tests for current behavior
3. Make small changes
4. Run tests after each change
5. Commit after each successful change

### 13.3 Refactoring Rules
- Never change behavior
- Extract before you abstract
- Test before and after
- Make small, incremental changes

---

## 14. Performance Strategy

### 14.1 Frontend
- Use React Query caching
- Use virtualization for large lists
- Use lazy loading for routes
- Use memoization for expensive computations
- Use debouncing for search

### 14.2 Backend
- Use prepared statements
- Use indexes
- Use transactions
- Use WAL mode
- Use batch operations

### 14.3 Database
- Use WAL mode
- Use foreign keys
- Use busy timeout
- Use cache size
- Use page size

---

## 15. Error Handling Strategy

### 15.1 IPC Errors
```javascript
// Main process
try {
  const data = await repository.getById(id)
  return { success: true, data }
} catch (error) {
  console.error('Handler error:', error)
  return { success: false, error: error.message }
}

// Renderer
try {
  const result = await window.api.entities.get(id)
  if (!result.success) throw new Error(result.error)
  return result.data
} catch (error) {
  console.error('IPC error:', error)
  throw error
}
```

### 15.2 Component Errors
```jsx
function Component() {
  const { data, isLoading, error } = useEntity()

  if (isLoading) return <LoadingState />
  if (error) return <ErrorState error={error} />
  if (!data) return <EmptyState />

  return <div>{/* ... */}</div>
}
```

### 15.3 Form Errors
```jsx
function Form() {
  const form = useForm({
    resolver: zodResolver(schema),
  })

  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </Form>
  )
}
```

---

## 16. Testing Expectations

### 16.1 Unit Tests
- Test individual functions
- Test repositories
- Test hooks
- Mock external dependencies

### 16.2 Integration Tests
- Test IPC handlers
- Test database operations
- Test service logic

### 16.3 Component Tests
- Test component rendering
- Test user interactions
- Test error states
- Test loading states

### 16.4 E2E Tests
- Test critical workflows
- Test user journeys
- Test edge cases

---

## 17. Documentation Expectations

### 17.1 Code Documentation
- Comment WHY, not WHAT
- Document complex logic
- Document non-obvious decisions
- Use JSDoc for public APIs

### 17.2 Project Documentation
- Keep README updated
- Document setup steps
- Document commands
- Document architecture

### 17.3 Type Documentation
- Document complex types
- Use TypeScript interfaces
- Export types from shared locations

---

## 18. Best Practices

### 18.1 Always
- ✅ Use design tokens
- ✅ Use repository pattern
- ✅ Use generic solutions
- ✅ Validate inputs
- ✅ Show loading states
- ✅ Handle errors
- ✅ Test thoroughly
- ✅ Document decisions
- ✅ Follow conventions
- ✅ Reuse existing code

### 18.2 Never
- ❌ Hardcode values
- ❌ Access database from React
- ❌ Bypass repositories
- ❌ Create duplicate code
- ❌ Skip validation
- ❌ Ignore accessibility
- ❌ Skip loading states
- ❌ Use any type
- ❌ Comment obvious code
- ❌ Skip tests

---

## 19. Anti-Patterns to Avoid

### 19.1 Common Mistakes
- Hardcoding colors instead of using design tokens
- Creating new components instead of reusing existing ones
- Creating new hooks instead of extending existing ones
- Accessing database directly from React
- Bypassing repositories
- Skipping validation
- Ignoring accessibility
- Skipping loading states
- Using any type
- Commenting obvious code

### 19.2 How to Avoid
- Always check for existing components
- Always check for existing hooks
- Always use the repository pattern
- Always validate inputs
- Always check accessibility
- Always show loading states
- Always use TypeScript types
- Always comment WHY, not WHAT

---

## 20. AI Coding Workflow

### 20.1 Task Execution Order
1. Read the task
2. Read relevant Master Blueprint sections
3. Read AGENT_RULES.md
4. Check for existing code
5. Plan implementation
6. Implement
7. Test
8. Lint
9. Build
10. Commit

### 20.2 Feature Implementation Template
1. Create repository
2. Create IPC handler
3. Create preload method
4. Create IPC client method
5. Create hook
6. Create form schema
7. Create form fields
8. Create components
9. Create page
10. Add route
11. Add to sidebar
12. Test
13. Document

### 20.3 Debugging Workflow
1. Read error message
2. Check console
3. Check network
4. Check database
5. Check IPC
6. Check repository
7. Check service
8. Fix root cause
9. Test fix
10. Commit fix

### 20.4 Review Workflow
1. Run all tests
2. Run lint
3. Run build
4. Check accessibility
5. Check performance
6. Check security
7. Check documentation
8. Create PR
9. Respond to feedback
10. Merge

---

## 21. Future Maintenance

### 21.1 Adding a New Entity
1. Migration SQL file
2. Repository class
3. IPC handler file
4. Preload API methods
5. React hook
6. Page component
7. List component
8. Card component
9. Detail component
10. Form component
11. Column definitions
12. Route in App.jsx
13. Sidebar navigation item
14. Entity type definition

### 21.2 Modifying an Existing Entity
1. Understand current implementation
2. Check for dependencies
3. Make changes
4. Test changes
5. Update documentation
6. Create PR

### 21.3 Fixing a Bug
1. Reproduce the bug
2. Understand the root cause
3. Write a test for the bug
4. Fix the bug
5. Run all tests
6. Create PR

---

*This playbook complements the Master Blueprint. Always refer to `AI_Resource_Manager_v2_Master_Blueprint.md` for detailed specifications.*
