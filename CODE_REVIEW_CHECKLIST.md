# AI Resource Manager v2 — Code Review Checklist

> **Source of Truth:** `AI_Resource_Manager_v2_Master_Blueprint.md`  
> **Last Updated:** 2026-09-10  
> **Purpose:** Comprehensive checklist for reviewing completed work

---

## Progress Summary

| Phase | Status | Key Deliverables |
|-------|--------|------------------|
| Phase 0: Project Cleanup | ✅ Completed | Clean project structure, updated package.json |
| Phase 1: Infrastructure | ✅ Completed | Electron, Vite, React configured |
| Phase 2: Database | ✅ Completed | SQLite schema, migrations, seed data |
| Phase 3: Repositories | ✅ Completed | BaseRepository + 9 entity repositories |
| Phase 4: Services | ✅ Completed | BaseService + 9 entity services |
| Phase 5: UI Foundation | ✅ Completed | 30+ reusable UI components, design system |
| Phase 6: IPC Layer | ✅ Completed | IPC handlers, validators, preload, ipc client |
| Phase 7: React Foundation | ✅ Completed | QueryClient, stores, validators, constants, page skeletons |
| Phase 8: Form Engine | ✅ Completed | GenericForm, FormFieldRenderer, autocomplete, form-schemas |
| Phase 9: Dashboard | ✅ Completed | 5 dashboard widgets, responsive grid layout |
| Phase 10: Core Entities | ✅ Completed | Providers, Models, Projects |
| Phase 11: Agents | ✅ Completed | Agent management |
| Phase 12: Accounts/API Keys | ✅ Completed | Account and API key management |
| Phase 13: Search/Commands | ✅ Completed | Search, command palette, notes, tags |
| Phase 14: Analytics | ✅ Complete | Charts, activity |
| Phase 15: Settings/Backup | ✅ Complete | Settings, backup/restore |
| Phase 16: Quotas/Notifications | ✅ Complete | Quotas, notifications, favorites, templates |
| Phase 17: Polish | ✅ Complete | Animations, keyboard shortcuts, ARIA, code splitting |
| Phase 18: Testing | ✅ Complete | 76 tests passing (40 backend + 36 frontend) |
| Phase 19: Deployment Prep | ✅ Complete | Error boundaries, performance monitoring, health check |

---

## Overview

Use this checklist when reviewing code before merging. Every item must be checked.

---

## 1. Architecture

- [ ] Repository pattern followed
- [ ] No direct database access from React
- [ ] IPC layer properly implemented
- [ ] Preload script exposes window.api
- [ ] Error handling returns { success, data/error }
- [ ] Zod validation on all IPC handlers
- [ ] Feature-based folder structure
- [ ] One component per file
- [ ] Barrel exports via index.js

---

## 2. Components

- [ ] Components use design tokens
- [ ] No hardcoded colors
- [ ] No hardcoded spacing
- [ ] No hardcoded border radius
- [ ] Uses shadcn/ui components
- [ ] Uses shared components
- [ ] Uses feature-specific components
- [ ] One component per file
- [ ] Maximum 200 lines per component
- [ ] No business logic in components
- [ ] Proper prop types defined
- [ ] Default props handled
- [ ] Loading states implemented
- [ ] Error states implemented
- [ ] Empty states implemented

---

## 3. Hooks

- [ ] Uses useEntity pattern
- [ ] Uses React Query for server state
- [ ] Uses Zustand for UI state
- [ ] Uses React Hook Form for forms
- [ ] Query keys consistent
- [ ] Cache invalidation on mutations
- [ ] Loading states returned
- [ ] Error states returned
- [ ] No duplicated hook logic
- [ ] Hooks focused and small

---

## 4. Repositories

- [ ] Extends BaseRepository
- [ ] CRUD operations implemented
- [ ] Filtering supported
- [ ] Sorting supported
- [ ] Pagination supported
- [ ] Search implemented
- [ ] Soft delete used
- [ ] Transactions for batch operations
- [ ] Prepared statements cached
- [ ] Indexes used for queries
- [ ] No N+1 queries
- [ ] No SELECT *

---

## 5. Services

- [ ] Backup service implemented
- [ ] Export service implemented
- [ ] Import service implemented
- [ ] Notification service implemented
- [ ] Error handling in all services
- [ ] Logging in all services
- [ ] No business logic in UI

---

## 6. Database

- [ ] Schema matches Master Blueprint
- [ ] All tables created
- [ ] All indexes created
- [ ] Foreign keys enforced
- [ ] WAL mode enabled
- [ ] Foreign keys enabled
- [ ] Busy timeout configured
- [ ] Cache size configured
- [ ] Page size configured
- [ ] Seed data correct
- [ ] Migrations work forward
- [ ] Migrations reversible

---

## 7. Performance

- [ ] Loading states for async operations
- [ ] Skeleton loading for lists
- [ ] Virtualization for large lists (>100 items)
- [ ] React Query caching configured
- [ ] StaleTime appropriate
- [ ] No unnecessary re-renders
- [ ] No expensive computations in render
- [ ] Database queries optimized
- [ ] Indexes used
- [ ] No N+1 queries
- [ ] Bundle size reasonable

---

## 8. Accessibility

- [ ] All interactive elements focusable
- [ ] All inputs have labels
- [ ] All images have alt text
- [ ] All dialogs have aria-modal
- [ ] All navigation has aria-label
- [ ] Color contrast 4.5:1 minimum
- [ ] Tab order logical
- [ ] Focus visible
- [ ] Escape closes dialogs
- [ ] Keyboard navigation works
- [ ] Screen reader compatible
- [ ] WCAG 2.1 AA compliant

---

## 9. Security

- [ ] API keys hashed with SHA-256
- [ ] Only prefix stored
- [ ] Full key NOT stored
- [ ] All inputs validated with Zod
- [ ] No SQL injection
- [ ] Parameterized queries used
- [ ] No XSS vulnerabilities
- [ ] No dangerouslySetInnerHTML
- [ ] No secrets in code
- [ ] No keys in logs

---

## 10. Styling

- [ ] Uses Tailwind CSS
- [ ] Uses design tokens
- [ ] Uses cn() for conditional classes
- [ ] Uses tailwind-merge
- [ ] No inline styles
- [ ] No hardcoded colors
- [ ] No hardcoded spacing
- [ ] Consistent with existing patterns
- [ ] Responsive design
- [ ] Dark mode works
- [ ] Light mode works

---

## 11. State Management

- [ ] UI state in Zustand
- [ ] Server state in React Query
- [ ] Form state in React Hook Form
- [ ] No prop drilling
- [ ] No unnecessary state
- [ ] Selectors used for performance
- [ ] Stores small and focused
- [ ] Query keys consistent

---

## 12. Documentation

- [ ] Complex logic commented
- [ ] WHY commented, not WHAT
- [ ] Types documented
- [ ] README updated
- [ ] API documented
- [ ] Setup steps documented

---

## 13. Testing

- [ ] Unit tests for repositories
- [ ] Unit tests for hooks
- [ ] Integration tests for IPC handlers
- [ ] Component tests for UI
- [ ] E2E tests for workflows
- [ ] All tests pass
- [ ] 80%+ coverage
- [ ] No flaky tests
- [ ] Edge cases tested
- [ ] Error states tested

---

## 14. Build

- [ ] No lint errors
- [ ] No TypeScript errors
- [ ] No build errors
- [ ] No warnings
- [ ] Build completes
- [ ] App launches
- [ ] Dev server starts
- [ ] Hot reload works

---

## 15. Git

- [ ] Conventional commit messages
- [ ] One logical change per commit
- [ ] No secrets committed
- [ ] No large files committed
- [ ] .gitignore updated
- [ ] Branch follows naming convention

---

## 16. Master Blueprint Alignment

- [ ] Follows Section 6 (Technology Stack)
- [ ] Follows Section 7 (Architecture Overview)
- [ ] Follows Section 8 (Electron Architecture)
- [ ] Follows Section 9 (React Architecture)
- [ ] Follows Section 10 (Database Architecture)
- [ ] Follows Section 11 (Folder Structure)
- [ ] Follows Section 13 (Entity System)
- [ ] Follows Section 14 (Generic CRUD Strategy)
- [ ] Follows Section 15 (Autocomplete System)
- [ ] Follows Section 16 (Generic Form Engine)
- [ ] Follows Section 33 (Repositories)
- [ ] Follows Section 34 (Services)
- [ ] Follows Section 35 (Shared Hooks)
- [ ] Follows Section 36 (Shared Components)
- [ ] Follows Section 37 (Shared Tables)
- [ ] Follows Section 38 (Shared Dialogs)
- [ ] Follows Section 42 (Design Tokens)
- [ ] Follows Section 43 (Animations)
- [ ] Follows Section 44 (Accessibility)
- [ ] Follows Section 45 (Performance)
- [ ] Follows Section 46 (Security)
- [ ] Follows Section 47 (SQLite Optimization)
- [ ] Follows Section 48 (Keyboard Shortcuts)
- [ ] Follows Section 55 (Coding Standards)

---

*This checklist complements the Master Blueprint. Always refer to `AI_Resource_Manager_v2_Master_Blueprint.md` for detailed specifications.*
