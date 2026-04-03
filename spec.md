# Synapse Finance — Premium Financial Analytics Dashboard

## Current State

New project. Empty Motoko backend (scaffold only). No frontend code yet.

## Requested Changes (Diff)

### Add

**Backend (Motoko)**
- Transaction CRUD operations: create, read, update, delete
- Transaction fields: id, date, category, amount, description, type (income/expense)
- Persist transactions in stable storage
- Role-based access: Admin (full CRUD + export), User (read-only)
- Query methods: list all, filter by category, filter by date range, filter by amount range, search by description
- Analytics queries: spending by category, monthly totals, spending trend by month
- Export: return all or filtered transactions as structured data

**Frontend (React + TypeScript)**
- Full SPA dashboard with sidebar navigation
- Pages: Dashboard (overview/hero), Transactions, Analytics, Settings
- Zustand store: transactions, filters, sorting, role, theme, UI states
- 3D hero scene (React Three Fiber): floating glass polyhedron with orbiting nodes, ambient particles
- Stat cards with animated count-up numbers and glow effects
- Insight cards: highest spending category, monthly comparison, unusual spikes, spending trend
- Recharts charts: area/line chart (portfolio performance / spending over time), bar chart (category breakdown), pie chart (category distribution)
- TransactionTable: search, multi-select category filter, date range, amount range, sort by date/amount
- Animated empty states
- Skeleton loaders for initial data fetch simulation
- RBAC UI: role switcher (Admin / User), dynamic show/hide of add/edit/delete/export controls
- Export to CSV and JSON
- Toast notifications for add/edit/delete/export
- Dark mode as default (beautiful dark theme, localStorage persistence)
- localStorage persistence for transactions and preferences
- Framer Motion: staggered card entrance, hover lift + glow, page transitions, filter panel animation, count-up stats
- Fully responsive: mobile, tablet, laptop, large desktop
- README.md documentation

### Modify
- N/A (new project)

### Remove
- N/A (new project)

## Implementation Plan

1. Generate Motoko backend with transaction CRUD, analytics queries, RBAC-aware methods, and stable storage
2. Select `authorization` component for ICP auth integration
3. Build frontend:
   - Set up Zustand stores (transactions, filters, role, theme, UI)
   - Seed data (50+ realistic mock transactions across 6+ categories)
   - 3D hero scene with React Three Fiber + Drei
   - Animated stat cards and insight cards
   - Recharts area/line chart, bar chart, pie chart
   - Transactions page with full filter/sort/search
   - RBAC role switcher
   - Export functionality (CSV + JSON)
   - Toast notifications
   - Skeleton loaders
   - Responsive layout
   - README.md
