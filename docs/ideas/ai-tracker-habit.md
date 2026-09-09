# AI Habit Tracker — Electron Desktop App

## Problem Statement

How might we build a lightweight personal tool that makes tracking AI tool usage feel effortless and insightful — like a habit tracker for your AI stack?

## Recommended Direction

**Electron Habit Tracker** — a desktop app with gamified UX (streaks, heatmaps) backed by SQLite (via better-sqlite3). No Python backend. No server. One runtime, one language. The core insight: AI tool usage tracking is a *behavior* problem, not a data problem. Make logging feel like checking off a habit, not filling a form.

The app has three screens:
1. **Log** — Quick daily check-in: which AI tools did you use? Toggle on/off, optional note.
2. **History** — Table of all entries with inline edit/delete. Searchable, filterable.
3. **Dashboard** — Usage frequency bar chart, current streak, calendar-grid heatmap.

**Tech stack:** Electron + Vite + React + better-sqlite3 + Tailwind CSS + Recharts + React Router

## Color System (60-30-10 Rule)

| Role | Color | Hex | Usage |
|------|-------|-----|-------|
| **60% Base** | Warm Off-White | `#F7F6F3` | Backgrounds, cards, main surface |
| **30% Secondary** | Muted Slate | `#64748B` | Text, borders, secondary elements |
| **10% Accent** | Soft Teal | `#5EEAD4` | Active states, streak highlights, chart accents |

**Avoid:** Pure white `#FFFFFF`, pure black `#000000`, saturated/flashy colors (bright red, neon green, electric blue). Think calm, muted, professional — closer to Linear or Raycast than a toy dashboard.

Additional palette:
- **Error/Danger:** Muted Rose `#FDA4AF` (not bright red)
- **Success/Streak:** Muted Green `#86EFAC` (not neon)
- **Borders:** `#E2E0DC` (warm gray, not harsh)
- **Card Background:** `#FDFCFA` (barely warmer than base)

## Key Assumptions to Validate

- [ ] **You'll open the desktop app daily** — Test: commit to 7 days of logging. If you skip 3+, the format needs changing.
- [ ] **Gamification motivates you** — Test: do streaks/heatmaps actually make you log, or is it novel for a week?
- [ ] **3 pages is right** — Log, History, Dashboard. Simple, no bloat.
- [ ] **better-sqlite3 works cleanly on Windows** — Test during scaffolding.

## MVP Scope

**In:**
- Log page: Add tool (custom name, no pre-populated list), toggle used/not, optional note, date auto-set
- History page: Table with edit/delete, search filter
- Dashboard: Bar chart (usage frequency), streak counter, calendar-grid heatmap
- Electron shell (React frontend + better-sqlite3 in main process)
- PowerShell scripts: `setup.ps1` (npm install), `start.ps1` (dev mode)
- Color system: warm off-white `#F7F6F3` base, muted slate `#64748B` text, soft teal `#5EEAD4` accents
- Tailwind CSS with custom theme matching palette

**Out:**
- Email/user field (single user — not needed)
- Pre-populated AI tools (start empty, add as you go)
- Separate "Maintain" page (merged into History)
- Real-time updates (personal tool, no multi-user sync)
- Advanced charts (pie, trends, time-series — add later)
- Authentication / login
- Export/import (add later)
- Mobile companion
- TypeScript (plain JS + React for speed)

## Not Doing (and Why)

- **No email/user field** — You're the only user. Tool + date + used is enough.
- **No team/multi-user features** — Personal tool. Don't architect for scale you won't use.
- **No cloud sync** — Single machine. Keep it simple.
- **No authentication** — Desktop app on your machine. No login screen needed.
- **No flashy UI** — Muted, professional palette. Calm > exciting.
- **No Python backend** — Electron + better-sqlite3 handles everything. One runtime.
- **No Electron auto-updater** — Manual updates are fine for a personal tool.
- **No TypeScript** — Plain JS + React. Faster to ship, less boilerplate.

## Resolved Questions

- ~~Python backend~~ → Dropped. better-sqlite3 in Electron main process.
- ~~Pre-populated tools~~ → Start empty. User adds tools manually.
- ~~Heatmap style~~ → Calendar grid (not GitHub squares).
- ~~Note field~~ → Optional. Tool + date + used is the minimum; note is bonus.
