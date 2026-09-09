# Implementation Plan: AI Habit Tracker — Electron Desktop App

## Overview

A personal desktop application for tracking AI tool usage, built as a habit tracker. The app runs locally on Windows via Electron, stores data in SQLite (via better-sqlite3), and presents a gamified interface with streaks, heatmaps, and usage analytics. No Python backend, no server, no authentication — a single-runtime, single-user tool focused on making AI usage tracking effortless and insightful.

**Reference document:** `docs/ideas/ai-tracker-habit.md`

---

## Architecture Decisions

### 1. Electron + better-sqlite3 (No Python Backend)

**Decision:** Drop the Python backend entirely. Use better-sqlite3 directly in Electron's main process.

**Rationale:**
- Python adds a second runtime, venv management, IPC complexity, and startup overhead
- better-sqlite3 is synchronous, fast, and has zero native dependency issues on Windows
- Electron's main process already runs Node.js — SQLite access is a `require()` away
- For a single-user desktop app, there is no need for a separate server process

**Trade-off:** No REST API means no easy path to web/mobile clients later. Accepted — this is a personal tool, not a platform.

### 2. Vite as Bundler

**Decision:** Use Vite (not webpack, not CRA) for bundling the React renderer.

**Rationale:**
- Fast dev server with HMR
- Native ESM support
- Simple config, especially with the `@tailwindcss/vite` plugin
- Electron-vite or vite-plugin-electron can bridge main/renderer builds

### 3. Tailwind CSS (Not CSS Modules, Not Styled Components)

**Decision:** Tailwind CSS with a custom theme matching the 60-30-10 color palette.

**Rationale:**
- The muted color palette maps cleanly to Tailwind's `extend.colors`
- Utility-first CSS is faster for building UI without a design system
- No runtime CSS-in-JS overhead
- `@tailwindcss/vite` plugin integrates natively with Vite

### 4. React Router (Not Electron Navigation)

**Decision:** Use react-router-dom for in-app page navigation, not Electron's BrowserWindow navigation.

**Rationale:**
- Single-window app with sidebar nav — standard SPA routing
- Keeps URL state (which page you're on) without Electron complexity
- Back/forward button support out of the box

### 5. Recharts (Not Chart.js, Not D3)

**Decision:** Recharts for the bar chart on the Dashboard.

**Rationale:**
- React-native charting — components, not imperative canvas API
- Declarative API fits React patterns
- Good enough for a single bar chart; D3 would be overkill
- Chart.js would require a wrapper or imperative integration

### 6. Plain JavaScript (No TypeScript)

**Decision:** No TypeScript.

**Rationale:**
- Personal tool, no team to catch type errors
- Faster to ship, less boilerplate
- Electron + React + SQLite is already a lot of surface area

### 7. File Structure

```
tracking/
├── electron/
│   ├── main.js              # Electron main process: window, lifecycle, IPC handlers
│   ├── preload.js           # contextBridge: exposes DB methods to renderer
│   └── database.js          # better-sqlite3: schema, CRUD, queries
├── src/
│   ├── main.jsx             # React entry point
│   ├── App.jsx              # Router, Layout wrapper
│   ├── index.css            # Tailwind imports + custom theme
│   ├── hooks/
│   │   └── useDatabase.js   # React hook wrapping IPC calls
│   ├── pages/
│   │   ├── Log.jsx          # Daily check-in page
│   │   ├── History.jsx      # Entry table with search/edit/delete
│   │   └── Dashboard.jsx    # Charts, streak, heatmap
│   └── components/
│       ├── Layout.jsx       # Shell: sidebar nav + content area
│       ├── Sidebar.jsx      # Navigation sidebar
│       ├── ToolSelector.jsx # Dropdown to pick/add AI tools
│       ├── Toggle.jsx       # Used/not toggle switch
│       ├── Heatmap.jsx      # Calendar-grid heatmap component
│       ├── StreakCounter.jsx # Current streak display
│       ├── UsageChart.jsx   # Bar chart (recharts)
│       ├── EntryRow.jsx     # Single row in History table
│       └── StatCard.jsx     # Dashboard stat card
├── tailwind.config.js
├── vite.config.js
├── package.json
├── index.html              # Vite entry HTML
├── powershell/
│   ├── setup.ps1           # npm install + verify
│   └── start.ps1           # npm run dev (vite + electron)
└── docs/
    └── ideas/
        └── ai-tracker-habit.md  # Original one-pager
```

---

## Database Schema

```sql
-- AI tools the user tracks
CREATE TABLE IF NOT EXISTS tools (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    created_at TEXT DEFAULT (datetime('now'))
);

-- Daily usage entries
CREATE TABLE IF NOT EXISTS entries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tool_id INTEGER NOT NULL,
    date TEXT NOT NULL,              -- YYYY-MM-DD format
    used INTEGER NOT NULL DEFAULT 1, -- 0 = not used, 1 = used
    note TEXT,                       -- Optional note
    created_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (tool_id) REFERENCES tools(id) ON DELETE CASCADE
);

-- Index for fast lookups
CREATE INDEX IF NOT EXISTS idx_entries_date ON entries(date);
CREATE INDEX IF NOT EXISTS idx_entries_tool ON entries(tool_id);
CREATE INDEX IF NOT EXISTS idx_entries_date_tool ON entries(date, tool_id);
```

**Key design decisions:**
- `date` is stored as `YYYY-MM-DD` TEXT (SQLite has no native date type, but date functions work on ISO strings)
- `used` is INTEGER (0/1) because SQLite has no native BOOLEAN
- `ON DELETE CASCADE` ensures deleting a tool removes its entries
- Composite index on `(date, tool_id)` for fast "did I log tool X today?" queries

---

## IPC Contract (Main ↔ Renderer)

The renderer process cannot access Node.js APIs directly. Communication happens through Electron's IPC bridge.

### Preload Script Exposes:

```javascript
// electron/preload.js
contextBridge.exposeInMainWorld('db', {
    // Tools
    getTools: () => ipcRenderer.invoke('db:getTools'),
    addTool: (name) => ipcRenderer.invoke('db:addTool', name),
    deleteTool: (id) => ipcRenderer.invoke('db:deleteTool', id),

    // Entries
    getEntries: (filters) => ipcRenderer.invoke('db:getEntries', filters),
    addEntry: (entry) => ipcRenderer.invoke('db:addEntry', entry),
    updateEntry: (id, updates) => ipcRenderer.invoke('db:updateEntry', id, updates),
    deleteEntry: (id) => ipcRenderer.invoke('db:deleteEntry', id),

    // Dashboard
    getUsageStats: () => ipcRenderer.invoke('db:getUsageStats'),
    getStreak: () => ipcRenderer.invoke('db:getStreak'),
    getHeatmapData: (year, month) => ipcRenderer.invoke('db:getHeatmapData', year, month),
});
```

### Main Process IPC Handlers:

Each `ipcMain.handle` calls the corresponding function in `database.js` and returns the result. Errors are caught and returned as `{ error: string }`.

---

## Color System (Tailwind Config)

```javascript
// tailwind.config.js
module.exports = {
    theme: {
        extend: {
            colors: {
                base: {
                    DEFAULT: '#F7F6F3',  // 60% - main background
                    50: '#FDFCFA',       // Card background
                    100: '#F0EFEC',      // Slightly darker variant
                },
                secondary: {
                    DEFAULT: '#64748B',  // 30% - text, icons
                    50: '#94A3B8',       // Lighter variant (muted text)
                    100: '#475569',      // Darker variant (headings)
                },
                accent: {
                    DEFAULT: '#5EEAD4',  // 10% - active states, highlights
                    50: '#99F6E4',       // Lighter accent
                    100: '#2DD4BF',      // Darker accent
                },
                border: '#E2E0DC',       // Warm gray borders
                success: '#86EFAC',      // Streaks, positive
                danger: '#FDA4AF',       // Errors, delete
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
        },
    },
};
```

---

## Page Specifications

### Page 1: Log (`/`)

**Purpose:** Daily check-in. Select tools, mark usage, save.

**Layout:**
- Date picker at top (defaults to today, can select past dates)
- "Add New Tool" button → inline text input → save to DB
- List of all tools as cards/rows with toggle switches
- Optional note textarea per tool
- "Save" button at bottom

**Behavior:**
- On load: fetch all tools from DB, fetch today's entries (pre-fill toggles)
- Toggle ON → entry with `used=1` created/updated for that date
- Toggle OFF → entry with `used=0` (or delete the entry)
- Note is saved when toggle is flipped or "Save" is clicked
- After save: brief success feedback (toast or inline message)

**Acceptance criteria:**
- [ ] Can add a new tool by typing a name and pressing Enter
- [ ] All added tools appear as toggleable rows
- [ ] Toggling a tool saves an entry for the selected date
- [ ] Can add an optional note to any entry
- [ ] Date picker changes which day's entries are shown
- [ ] Existing entries for the selected date are pre-filled on load

### Page 2: History (`/history`)

**Purpose:** View, search, edit, and delete past entries.

**Layout:**
- Search bar at top (filters by tool name or note text)
- Table: Date | Tool | Used (toggle) | Note | Actions (edit/delete)
- Entries sorted by date descending (most recent first)
- Inline editing: click a cell to edit note or toggle

**Behavior:**
- On load: fetch all entries with tool names (JOIN query)
- Search filters client-side (entries are already loaded)
- Edit: click note cell → becomes editable input → blur or Enter saves
- Delete: click delete → confirmation dialog → removes entry
- Toggle in table: click → updates `used` field

**Acceptance criteria:**
- [ ] All entries display in a table with correct tool names
- [ ] Search filters entries by tool name or note content
- [ ] Clicking note text enables inline editing
- [ ] Editing a note and pressing Enter saves the change
- [ ] Delete button shows confirmation before removing
- [ ] Toggle in table updates the entry's `used` field
- [ ] Entries are sorted by date (most recent first)

### Page 3: Dashboard (`/dashboard`)

**Purpose:** Visualize usage patterns, streaks, and activity.

**Layout:**
- Top row: StatCards (Total Entries, Active Days, Most Used Tool, Current Streak)
- Middle: UsageChart (bar chart — entries per tool, all time)
- Bottom: Heatmap (calendar grid for selected month)

**Behavior:**
- On load: fetch aggregated stats from DB
- Bar chart: X-axis = tool names, Y-axis = entry count
- Streak: consecutive days with at least one `used=1` entry
- Heatmap: 7 columns (Mon-Sun), rows = weeks, color intensity = entry count

**Acceptance criteria:**
- [ ] StatCards show correct totals
- [ ] Bar chart renders with correct data per tool
- [ ] Streak counter calculates correctly (consecutive days)
- [ ] Calendar heatmap displays for current month
- [ ] Heatmap cells are colored by activity intensity
- [ ] Can navigate to previous/next month on heatmap

---

## Component Specifications

### Layout.jsx
- Full viewport height, flex row
- Left: Sidebar (fixed width ~240px)
- Right: Content area (flex-1, scrollable)

### Sidebar.jsx
- App title/logo at top
- Nav links: Log, History, Dashboard
- Active link highlighted with accent color
- Muted background (`base-100`)

### ToolSelector.jsx
- Dropdown showing all tools
- "Add new tool" option at bottom → expands to text input
- On add: calls `db.addTool()`, refreshes list

### Toggle.jsx
- Custom toggle switch (not native checkbox)
- ON: accent color background, white circle
- OFF: border color background, gray circle
- Smooth transition animation

### Heatmap.jsx
- Calendar grid: 7 columns (Mon-Sun), up to 6 rows
- Each cell = one day, colored by entry count:
  - 0 entries: `base-100` (empty)
  - 1 entry: `accent-50`
  - 2-3 entries: `accent` (default)
  - 4+ entries: `accent-100`
- Month/year navigation (prev/next arrows)
- Day labels (Mon, Tue, ...) at top

### StreakCounter.jsx
- Large number display: current streak in days
- Subtitle: "day streak" or "days"
- Accent color for the number

### UsageChart.jsx
- Recharts `BarChart` component
- X-axis: tool names (rotated if many)
- Y-axis: entry count
- Bar color: accent
- Tooltip showing exact count on hover

### EntryRow.jsx
- Single table row for History page
- Renders: date, tool name, toggle, note (editable), delete button
- Handles inline edit state

### StatCard.jsx
- Card with title, value, optional subtitle
- Used for: Total Entries, Active Days, Most Used Tool, Current Streak
- Base-50 background, secondary text, accent value

---

## PowerShell Scripts

### `powershell/setup.ps1`

```powershell
# Check Node.js
$nodeVersion = node --version 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "Node.js not found. Install from https://nodejs.org" -ForegroundColor Red
    exit 1
}

# Install dependencies
Write-Host "Installing dependencies..." -ForegroundColor Cyan
npm install

# Verify better-sqlite3 native build
Write-Host "Verifying better-sqlite3..." -ForegroundColor Cyan
node -e "require('better-sqlite3')" 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "better-sqlite3 failed to load. Try: npm rebuild better-sqlite3" -ForegroundColor Red
    exit 1
}

Write-Host "Setup complete!" -ForegroundColor Green
```

### `powershell/start.ps1`

```powershell
Write-Host "Starting AI Habit Tracker..." -ForegroundColor Cyan
npm run dev
```

`package.json` scripts:
```json
{
    "scripts": {
        "dev": "concurrently \"vite\" \"wait-on http://localhost:5173 && electron .\"",
        "build": "vite build && electron-builder",
        "preview": "vite preview"
    }
}
```

---

## Risks and Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| better-sqlite3 fails to build on Windows | High | Test during Task 1. Fallback: use `sql.js` (WASM, no native deps) |
| Electron + Vite integration issues | Medium | Use `vite-plugin-electron` for seamless main/renderer builds |
| Heatmap calendar logic is complex | Medium | Build as a pure component first, integrate later |
| Tailwind `@tailwindcss/vite` plugin issues | Low | Fallback: use PostCSS plugin (`@tailwindcss/postcss`) |
| IPC errors hard to debug | Medium | Add error logging in preload, console.error in renderer |
| Date handling across timezones | Low | Always store/use `YYYY-MM-DD` strings, never Date objects in DB |

---

## Open Questions

1. **Should the Log page show all tools with toggles, or only tools used on that day?** → Show all tools always (consistent UX, easier to toggle off)
2. **What happens when a tool is deleted?** → CASCADE deletes all entries. Confirm with dialog.
3. **Should History show entries for all dates or just the selected date?** → All dates by default, filterable by date picker.
4. **How many pre-populated tools?** → None. Start empty.
5. **Should the app auto-launch on system startup?** → Not in MVP. Add later if desired.

---

## Implementation Phases

### Phase 1: Foundation (Tasks 1-2)
Project scaffolding and database layer. The app compiles and connects to SQLite.

### Phase 2: Core Features (Tasks 3-5)
The three pages: Log, History, Dashboard. Each is a vertical slice (UI + DB queries).

### Phase 3: Polish (Tasks 6-7)
PowerShell scripts and final integration testing. App is usable end-to-end.

### Checkpoint: Complete (Task 8)
Final verification, bug fixes, and handoff.
