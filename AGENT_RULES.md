# AI Resource Manager v2 — Agent Rules

> **Source of Truth:** `AI_Resource_Manager_v2_Master_Blueprint.md`  
> **Last Updated:** 2026-09-10  
> **Purpose:** Mandatory rules for AI coding agents

---

## Progress Summary

| Phase | Status | Completion Date |
|-------|--------|-----------------|
| Phase 0: Project Cleanup | ✅ Completed | 2026-09-10 |
| Phase 1: Infrastructure | ✅ Completed | 2026-09-10 |
| Phase 2: Database | ✅ Completed | 2026-09-10 |
| Phase 3: Repositories | ✅ Completed | 2026-09-10 |
| Phase 4: Services | ✅ Completed | 2026-09-10 |
| Phase 5: UI Foundation | ✅ Completed | 2026-09-10 |
| Phase 6: IPC Layer | ✅ Completed | 2026-09-10 |
| Phase 7: React Foundation | ✅ Completed | 2026-09-10 |
| Phase 8: Form Engine | ✅ Completed | 2026-09-10 |
| Phase 9: Dashboard | ✅ Completed | 2026-09-11 |
| Phase 10: Core Entities | ✅ Completed | 2026-09-11 |
| Phase 11: Agents | ✅ Completed | 2026-09-11 |
| Phase 12: Accounts/API Keys | ✅ Completed | 2026-09-11 |
| Phase 13: Search/Commands | ✅ Completed | 2026-09-11 |
| Phase 14: Analytics | ✅ Complete | 2026-09-11 |
| Phase 15: Settings/Backup | ✅ Complete | 2026-09-11 |
| Phase 16: Quotas/Notifications | ✅ Complete | Quotas, notifications, favorites, templates |
| Phase 17: Polish | ✅ Complete | Animations, keyboard shortcuts, ARIA, code splitting |
| Phase 18: Testing | ✅ Complete | 76 tests passing (40 backend + 36 frontend) |
| Phase 19: Deployment Prep | ✅ Complete | Error boundaries, performance monitoring, health check |
| Phase 20: Documentation | ✅ Complete | User docs, dev docs, code signing, auto-update, CI/CD |
| Phase 21: Final Polish | ✅ Complete | E2E testing, changelog, release preparation |

---

## Overview

These rules are non-negotiable. Every AI coding agent working on this project must follow them. Violations will result in rejected code.

---

## 1. Architecture Principles

### 1.1 Database-Driven
- **NEVER** hardcode values. Everything comes from SQLite.
- All dropdown options come from the database.
- All labels, colors, icons reference database values.
- Zero hardcoded strings in the UI.

### 1.2 Repository Pattern
- **NEVER** access SQLite directly from React.
- **NEVER** bypass repositories.
- Always go through: `Repository → IPC Handler → Preload → IPC Client → Hook → Component`.
- All database operations happen in the main process.

### 1.3 Single Source of Truth
- The Master Blueprint is the ONLY source of truth.
- **NEVER** contradict the Master Blueprint.
- If the Master Blueprint says X, implement X.

### 1.4 Feature-Based Architecture
- Group by feature, not by type.
- Each feature gets its own folder.
- One component per file.
- Barrel exports via index.js.

### 1.5 Composition Over Inheritance
- Use composition for component reuse.
- Pass components as props when needed.
- Avoid deep component hierarchies.

---

## 2. Coding Principles

### 2.1 TypeScript
- Use strict TypeScript throughout.
- No `any` types.
- Always define interfaces/types.
- Export types from shared locations.

### 2.2 No Duplicated Code
- Extract shared logic into hooks.
- Extract shared UI into components.
- Extract shared utilities into lib/.
- If you write it twice, extract it.

### 2.3 No Business Logic in UI
- Components render data.
- Hooks manage state and data fetching.
- Services handle business logic.
- Repositories handle data access.

### 2.4 Reuse Existing Components
- **ALWAYS** check for existing components before creating new ones.
- Use shadcn/ui components.
- Use shared components.
- Use feature-specific components.

### 2.5 Reuse Existing Hooks
- **ALWAYS** check for existing hooks before creating new ones.
- Use the useEntity pattern.
- Extend hooks rather than creating new ones.

### 2.6 Keep Files Focused
- One component per file.
- One hook per file.
- One repository per entity.
- One IPC handler per entity.

### 2.7 Keep Components Modular
- Small, focused components.
- Maximum 200 lines per component.
- Extract sub-components.
- Use render props or composition.

---

## 3. Refactoring Principles

### 3.1 Before Writing New Code
1. Check if similar code exists.
2. Check if a generic solution exists.
3. Check if a shared component exists.
4. Check if a shared hook exists.

### 3.2 When Refactoring
1. Never change behavior.
2. Extract before you abstract.
3. Test before and after.
4. Make small, incremental changes.

### 3.3 Prefer Generic Solutions
- Generic CRUD over entity-specific.
- Generic form over entity-specific forms.
- Generic table over entity-specific tables.
- Generic dialog over entity-specific dialogs.

---

## 4. Performance Principles

### 4.1 Loading States
- Always show loading states for async operations.
- Use skeleton loading for lists.
- Use spinner for buttons.
- Minimum 100ms debounce for search.

### 4.2 Caching
- Use React Query for all server state.
- Configure staleTime appropriately.
- Invalidate caches on mutations.
- Use optimistic updates where appropriate.

### 4.3 Virtualization
- Use TanStack Virtual for lists > 100 items.
- Never render 1000+ DOM nodes.
- Always paginate large datasets.

### 4.4 Database
- Use prepared statements.
- Use indexes for common queries.
- Use transactions for batch operations.
- Use WAL mode for concurrent reads.

---

## 5. Accessibility Principles

### 5.1 WCAG 2.1 AA
- All interactive elements must be focusable.
- All inputs must have labels.
- All images must have alt text.
- All dialogs must have aria-modal.
- All navigation must have aria-label.
- Color contrast must be 4.5:1 minimum.

### 5.2 Keyboard Navigation
- All actions accessible via keyboard.
- Tab order must be logical.
- Focus must be visible.
- Escape must close dialogs.

### 5.3 Screen Readers
- Use semantic HTML.
- Use ARIA labels.
- Use live regions for dynamic content.
- Test with screen reader.

---

## 6. Security Principles

### 6.1 API Keys
- **NEVER** store full API keys.
- Hash with SHA-256 on save.
- Only store prefix (first 8 chars).
- Display as `sk-...xxxx`.

### 6.2 Input Validation
- Validate ALL inputs with Zod.
- Never trust user input.
- Sanitize output.
- Use parameterized queries.

### 6.3 SQL Injection
- **NEVER** concatenate user input into SQL.
- **ALWAYS** use parameterized queries.
- Use prepared statements.

### 6.4 XSS
- React escapes by default.
- Never use dangerouslySetInnerHTML.
- Sanitize any HTML output.

---

## 7. Styling Principles

### 7.1 Design Tokens
- **ALWAYS** use design tokens.
- **NEVER** hardcode colors.
- **NEVER** hardcode spacing.
- **NEVER** hardcode border radius.

### 7.2 Tailwind CSS
- Use Tailwind utility classes.
- Use cn() for conditional classes.
- Use tailwind-merge for conflicts.
- Follow the spacing scale.

### 7.3 Consistent Patterns
- Follow existing component patterns.
- Use the same spacing.
- Use the same colors.
- Use the same typography.

---

## 8. State Management Principles

### 8.1 UI State (Zustand)
- Use Zustand for UI state only.
- Keep stores small and focused.
- Use selectors for performance.
- Avoid nested state.

### 8.2 Server State (React Query)
- Use React Query for all server state.
- Use query keys consistently.
- Invalidate on mutations.
- Use staleTime appropriately.

### 8.3 Form State (React Hook Form)
- Use React Hook Form for all forms.
- Use Zod for validation.
- Use controlled components.
- Handle errors properly.

---

## 9. Documentation Principles

### 9.1 Code Comments
- Comment WHY, not WHAT.
- Comment complex logic.
- Comment non-obvious decisions.
- Never comment obvious code.

### 9.2 README
- Keep README updated.
- Document setup steps.
- Document commands.
- Document architecture.

### 9.3 Type Documentation
- Document complex types.
- Use JSDoc for public APIs.
- Document return types.

---

## 10. Testing Principles

### 10.1 Test Strategy
- Unit tests for repositories.
- Unit tests for hooks.
- Integration tests for IPC handlers.
- Component tests for UI.
- E2E tests for workflows.

### 10.2 Test Quality
- Test behavior, not implementation.
- Use descriptive test names.
- Test edge cases.
- Test error states.

### 10.3 Test Coverage
- Minimum 80% coverage.
- 100% for critical paths.
- 100% for security code.

---

## 11. Git Principles

### 11.1 Commit Messages
- Use conventional commits.
- One logical change per commit.
- Reference issues when applicable.

### 11.2 Branch Strategy
- Feature branches for phases.
- Merge to main after review.
- Delete branches after merge.

---

## 12. Anti-Patterns to Avoid

### 12.1 Never Do This
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

### 12.2 Always Do This
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

---

## 13. Review Checklist

Before submitting code, verify:
- [ ] No hardcoded values
- [ ] Repository pattern followed
- [ ] TypeScript clean (no any)
- [ ] ESLint clean
- [ ] Build passes
- [ ] Uses shared components
- [ ] Uses design tokens
- [ ] Accessible
- [ ] Tested
- [ ] Documented

---

*These rules complement the Master Blueprint. Always refer to `AI_Resource_Manager_v2_Master_Blueprint.md` for detailed specifications.*
