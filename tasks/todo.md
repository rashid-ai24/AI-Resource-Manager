# Task List: AI Habit Tracker

## Phase 1: Foundation

### Task 1: Project Scaffolding

**Description:** Initialize the Electron + Vite + React project. Install all dependencies, configure Tailwind CSS with the custom color palette, set up the Electron main process and preload script, and verify the app launches.

**Acceptance criteria:**
- [ ] `package.json` created with all dependencies (react, react-dom, react-router-dom, electron, better-sqlite3, tailwindcss, @tailwindcss/vite, recharts, vite, vite-plugin-electron)
- [ ] `vite.config.js` configured with React plugin and electron plugin
- [ ] `tailwind.config.js` created with custom color palette (base, secondary, accent, border, success, danger)
- [ ] `index.html` entry point exists
- [ ] `src/main.jsx` renders a placeholder React app
- [ ] `src/index.css` imports Tailwind directives
- [ ] `electron/main.js` creates a BrowserWindow and loads the Vite dev server
- [ ] `electron/preload.js` sets up empty contextBridge
- [ ] `npm run dev` launches Electron window showing the React app

**Verification:**
- [ ] Build succeeds: `npm run dev` without errors
- [ ] Manual check: Electron window opens, shows React placeholder content
- [ ] Tailwind classes work (test with a utility class in placeholder)

**Dependencies:** None

**Files likely touched:**
- `package.json`
- `vite.config.js`
- `tailwind.config.js`
- `index.html`
- `src/main.jsx`
- `src/index.css`
- `electron/main.js`
- `electron/preload.js`

**Estimated scope:** Medium (3-5 files)

---

### Task 2: Database + IPC Layer

**Description:** Create the SQLite database module with schema initialization and all CRUD operations. Wire up the IPC bridge in the preload script and create a React hook for the renderer to call database methods.

**Acceptance criteria:**
- [ ] `electron/database.js` creates `tools` and `entries` tables on first run
- [ ] `addTool(name)` inserts a tool and returns its ID
- [ ] `getTools()` returns all tools sorted by name
- [ ] `deleteTool(id)` removes a tool and cascades to entries
- [ ] `addEntry({tool_id, date, used, note})` inserts an entry
- [ ] `getEntries(filters)` returns entries with tool names (JOIN), supports search filter
- [ ] `updateEntry(id, {used, note})` updates an entry
- [ ] `deleteEntry(id)` removes an entry
- [ ] `getUsageStats()` returns aggregated stats (total entries, active days, most used tool)
- [ ] `getStreak()` returns current streak (consecutive days with entries)
- [ ] `getHeatmapData(year, month)` returns entry counts grouped by date
- [ ] `electron/preload.js` exposes all DB methods via `contextBridge.exposeInMainWorld('db', {...})`
- [ ] `src/hooks/useDatabase.js` wraps IPC calls in React hooks with loading/error states

**Verification:**
- [ ] Tests pass: manual test via console — call `window.db.addTool('test')` in renderer DevTools
- [ ] Build succeeds: `npm run dev` without errors
- [ ] Manual check: can add a tool and retrieve it via the hook

**Dependencies:** Task 1

**Files likely touched:**
- `electron/database.js` (new)
- `electron/preload.js` (update)
- `src/hooks/useDatabase.js` (new)

**Estimated scope:** Medium (3 files, but critical path)

---

## Checkpoint: Foundation

After Tasks 1-2, verify:
- [ ] App launches without errors
- [ ] SQLite database is created (check file exists next to `main.js`)
- [ ] Can add a tool via IPC and retrieve it
- [ ] All IPC methods are exposed and callable from renderer

---

## Phase 2: Core Features

### Task 3: Layout + Navigation + Log Page

**Description:** Build the app shell (Layout with Sidebar) and the Log page — the primary daily check-in screen. Users can add tools, toggle usage, add notes, and save entries for any date.

**Acceptance criteria:**
- [ ] `Layout.jsx` renders sidebar + content area in a flex row
- [ ] `Sidebar.jsx` shows nav links (Log, History, Dashboard) with active state highlighting
- [ ] Clicking nav links routes to correct page (React Router)
- [ ] `Log.jsx` shows a date picker (defaults to today)
- [ ] `Log.jsx` shows all tools as rows with toggle switches
- [ ] "Add new tool" button expands to a text input
- [ ] Adding a tool updates the list immediately
- [ ] Toggling a tool creates/updates an entry for the selected date
- [ ] Optional note textarea is available per tool row
- [ ] Existing entries for the selected date are pre-filled on load
- [ ] Save feedback is shown (brief success message)

**Verification:**
- [ ] Build succeeds: `npm run dev` without errors
- [ ] Manual check: can add a tool, toggle it on, add a note, and see the entry in the DB
- [ ] Manual check: changing date loads correct entries

**Dependencies:** Task 2

**Files likely touched:**
- `src/App.jsx` (update — add Router)
- `src/components/Layout.jsx` (new)
- `src/components/Sidebar.jsx` (new)
- `src/components/ToolSelector.jsx` (new)
- `src/components/Toggle.jsx` (new)
- `src/pages/Log.jsx` (new)

**Estimated scope:** Large (6 files) — but most are small components

---

### Task 4: History Page

**Description:** Build the History page — a table of all entries with search, inline editing, and delete functionality.

**Acceptance criteria:**
- [ ] `History.jsx` displays entries in a table: Date | Tool | Used | Note | Actions
- [ ] Entries are sorted by date descending (most recent first)
- [ ] Search bar filters entries by tool name or note content (client-side)
- [ ] Clicking the note cell enables inline editing (text input)
- [ ] Pressing Enter or blurring saves the edited note
- [ ] Toggle in the table updates the entry's `used` field
- [ ] Delete button shows a confirmation dialog
- [ ] Confirming delete removes the entry from DB and UI
- [ ] Empty state message when no entries exist

**Verification:**
- [ ] Build succeeds: `npm run dev` without errors
- [ ] Manual check: entries from Log page appear in History
- [ ] Manual check: search filters correctly
- [ ] Manual check: edit and delete work

**Dependencies:** Task 2, Task 3 (for tool data to exist)

**Files likely touched:**
- `src/pages/History.jsx` (new)
- `src/components/EntryRow.jsx` (new)

**Estimated scope:** Medium (2-3 files)

---

### Task 5: Dashboard Page

**Description:** Build the Dashboard page — stat cards, bar chart, streak counter, and calendar heatmap for visualizing usage patterns.

**Acceptance criteria:**
- [ ] `Dashboard.jsx` shows 4 StatCards: Total Entries, Active Days, Most Used Tool, Current Streak
- [ ] `UsageChart.jsx` renders a bar chart (Recharts) with tool names on X-axis, entry count on Y-axis
- [ ] `StreakCounter.jsx` displays the current streak as a large number
- [ ] `Heatmap.jsx` renders a calendar grid for the current month
- [ ] Heatmap cells are colored by entry count (0 = empty, 1 = light, 2-3 = medium, 4+ = dark)
- [ ] Month navigation (prev/next arrows) changes the heatmap month
- [ ] All data loads from DB on page mount
- [ ] Empty state when no data exists (friendly message, not errors)

**Verification:**
- [ ] Build succeeds: `npm run dev` without errors
- [ ] Manual check: stat cards show correct numbers
- [ ] Manual check: bar chart renders with data from entries
- [ ] Manual check: heatmap shows colored cells for days with entries
- [ ] Manual check: streak count is accurate

**Dependencies:** Task 2, Task 3 (entries must exist)

**Files likely touched:**
- `src/pages/Dashboard.jsx` (new)
- `src/components/Heatmap.jsx` (new)
- `src/components/StreakCounter.jsx` (new)
- `src/components/UsageChart.jsx` (new)
- `src/components/StatCard.jsx` (new)

**Estimated scope:** Large (5 files)

---

## Checkpoint: Core Features

After Tasks 3-5, verify:
- [ ] All three pages render correctly
- [ ] Can add a tool, log usage, see it in history, see it on dashboard
- [ ] Charts and heatmap display real data
- [ ] No console errors
- [ ] Navigation between pages works

---

## Phase 3: Polish

### Task 6: PowerShell Scripts

**Description:** Create PowerShell scripts for setup and launch. Create `package.json` scripts for dev and build.

**Acceptance criteria:**
- [ ] `powershell/setup.ps1` checks Node.js, runs `npm install`, verifies better-sqlite3
- [ ] `powershell/start.ps1` runs `npm run dev`
- [ ] `package.json` has `dev`, `build`, `preview` scripts
- [ ] `dev` script runs Vite and Electron concurrently
- [ ] Scripts handle errors gracefully (exit codes, colored output)

**Verification:**
- [ ] Manual check: `.\powershell\setup.ps1` completes without errors
- [ ] Manual check: `.\powershell\start.ps1` launches the app
- [ ] Build succeeds: `npm run build` produces output (if electron-builder configured)

**Dependencies:** Tasks 1-5

**Files likely touched:**
- `powershell/setup.ps1` (new)
- `powershell/start.ps1` (new)
- `package.json` (update scripts)

**Estimated scope:** Small (1-2 files)

---

### Task 7: UI Polish + Color System

**Description:** Apply the full color system across all components. Ensure consistent styling, spacing, and the muted palette. Add hover states, focus rings, and transitions.

**Acceptance criteria:**
- [ ] All backgrounds use `base` colors (no pure white `#FFFFFF`)
- [ ] All text uses `secondary` colors (no pure black `#000000`)
- [ ] Active/interactive elements use `accent` color
- [ ] Borders use `border` color (`#E2E0DC`)
- [ ] Toggle switch has smooth transition animation
- [ ] Buttons have hover and focus states
- [ ] No flashy/saturated colors anywhere
- [ ] Font is Inter or system sans-serif

**Verification:**
- [ ] Manual check: app looks consistent across all pages
- [ ] Manual check: no pure white or pure black backgrounds/text
- [ ] Manual check: toggle animations are smooth
- [ ] Manual check: focus states are visible (keyboard navigation)

**Dependencies:** Tasks 3-5

**Files likely touched:**
- `src/index.css` (update theme)
- `tailwind.config.js` (update if needed)
- `src/components/Toggle.jsx` (update styles)
- `src/components/Sidebar.jsx` (update styles)
- `src/pages/*.jsx` (update styles)

**Estimated scope:** Medium (3-5 files)

---

## Checkpoint: Polish

After Tasks 6-7, verify:
- [ ] App launches via PowerShell scripts
- [ ] Color system is applied consistently
- [ ] All interactive elements have proper states
- [ ] No styling inconsistencies

---

## Phase 4: Final Verification

### Task 8: Integration Testing + Bug Fixes

**Description:** End-to-end testing of all features. Fix any bugs found. Verify data persistence across app restarts.

**Acceptance criteria:**
- [ ] Full flow: add tool → log usage → view in history → see on dashboard
- [ ] Data persists after closing and reopening the app
- [ ] Deleting a tool removes its entries (cascade)
- [ ] Search in History works correctly
- [ ] Heatmap navigation works for different months
- [ ] Streak calculation is accurate
- [ ] No console errors or warnings
- [ ] App handles empty states gracefully (no tools, no entries)

**Verification:**
- [ ] Build succeeds: `npm run dev` without errors
- [ ] Manual check: complete user flow works end-to-end
- [ ] Manual check: restart app, data is still there
- [ ] Manual check: all edge cases handled (empty states, long tool names, etc.)

**Dependencies:** Tasks 1-7

**Files likely touched:**
- Various (bug fixes)

**Estimated scope:** Small (bug fixes only)

---

## Final Checkpoint: Complete

After all tasks:
- [ ] App runs without errors
- [ ] All three pages function correctly
- [ ] Data persists in SQLite
- [ ] Color system matches spec (warm, muted, no pure white/black)
- [ ] PowerShell scripts work
- [ ] Ready for daily use
