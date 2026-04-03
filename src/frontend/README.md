# Synapse Finance 📊

> A world-class, premium financial analytics dashboard built with React, Three.js, Framer Motion, and Zustand.

![Synapse Finance Preview](./public/assets/design-preview.png)

---

## 🚀 Overview

Synapse Finance is a production-quality fintech dashboard that combines elegant data visualization, smooth micro-interactions, and tasteful 3D visuals. It is designed to feel like a real SaaS fintech product — premium, modern, and immersive.

---

## ✨ Features

### 📊 Analytics & Insights
- Real-time financial analytics computed from transaction data
- Monthly income vs expense comparison (area chart)
- Category spending breakdown (pie chart)
- Net savings trend (line chart)
- Monthly bar charts for side-by-side comparison
- Smart insights: top category, biggest expense, spending trend, unusual spikes
- Animated count-up statistics

### 💳 Transaction Management
- 60 realistic seed transactions across 9 categories
- Add, edit, delete transactions (admin only)
- Search, multi-select category filter, date range, amount range
- Sort by date or amount (ascending/descending)
- Responsive table (desktop) / card list (mobile)
- Graceful empty states
- Pagination

### 🔐 Role-Based Access Control (RBAC)
- **Admin**: Full CRUD + export functionality
- **User**: Read-only, no add/edit/delete, no export
- Instant role switching with toast feedback
- Role persisted in localStorage

### 🌌 3D Visuals
- React Three Fiber glass icosahedron with wireframe overlay
- Orbiting colored nodes (cyan, purple, teal, amber)
- Floating particles and stars
- Soft ambient + point lighting
- Smooth auto-rotation with Float animation

### 🎨 Design System
- Deep navy glassmorphism UI
- OKLCH color tokens
- Custom utility classes (glass-card, gradient-text, glow-*)
- Framer Motion page transitions and staggered reveals
- Micro-interactions: hover lift, scale, glow intensification

### ⚡ Performance
- localStorage persistence for transactions and role
- React.memo and useMemo for analytics computations
- Lazy-loaded 3D scene (Suspense)
- Efficient Zustand store updates

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React 19 + TypeScript | UI framework |
| Vite | Build tool |
| Tailwind CSS | Styling |
| `motion/react` (Framer Motion v12) | Animations |
| `@react-three/fiber` + Three.js | 3D scene |
| `@react-three/drei` | 3D helpers |
| Zustand | State management |
| Recharts | Data visualization |
| Lucide React | Icons |
| Sonner | Toast notifications |
| date-fns | Date utilities |
| shadcn/ui | UI components |

---

## 📂 Folder Structure

```
src/frontend/src/
├── data/
│   └── transactions.ts          # 60 seed transactions
├── store/
│   ├── useTransactionStore.ts   # Transaction CRUD + localStorage
│   ├── useFilterStore.ts        # Filters & sorting
│   ├── useRoleStore.ts          # Role management
│   └── useUIStore.ts            # Modal & UI states
├── hooks/
│   ├── useCountUp.ts            # IntersectionObserver count-up
│   └── useAnalytics.ts          # Computed analytics (useMemo)
├── utils/
│   └── exportData.ts            # CSV + JSON export
├── three/
│   └── HeroScene.tsx            # R3F 3D hero scene
├── components/
│   ├── Sidebar.tsx
│   ├── Navbar.tsx
│   ├── StatCard.tsx
│   ├── InsightCard.tsx
│   ├── AnimatedChartCard.tsx
│   ├── TransactionTable.tsx
│   ├── FiltersPanel.tsx
│   ├── RoleSwitcher.tsx
│   ├── EmptyState.tsx
│   ├── ExportButton.tsx
│   └── AddTransactionModal.tsx
├── pages/
│   ├── DashboardPage.tsx
│   ├── TransactionsPage.tsx
│   └── AnalyticsPage.tsx
└── App.tsx
```

---

## 🧠 State Management

Zustand stores are modular and logically separated:

- **useTransactionStore**: CRUD operations + localStorage hydration/persistence
- **useFilterStore**: All filter/sort state with individual setters + reset
- **useRoleStore**: Role switching + localStorage persistence + isAdmin selector
- **useUIStore**: Transient UI state (modals, loading, exporting)

Analytics are computed with `useMemo` in `useAnalytics.ts` — no redundant state.

---

## 🎬 Animation & 3D

### Framer Motion
- Page entrance: `initial={{ opacity: 0, y: 20 }}` on every page
- Cards: staggered reveal with `staggerChildren: 0.08`
- Hover: `whileHover={{ y: -5 }}` lift + glow on StatCards
- Modals: spring scale-in `{ type: 'spring', damping: 20, stiffness: 280 }`
- AnimatePresence for page transitions and list item add/remove

### React Three Fiber
- Icosahedron with MeshPhysicalMaterial (glass) + wireframe overlay
- 4 orbiting nodes at varying radii and speeds
- Star field and particle system
- Float helper for gentle bobbing
- Wrapped in `<Suspense>` for lazy loading

---

## 🔐 RBAC Explanation

```
Admin → Full access: add, edit, delete transactions, export data
User  → Read-only: view dashboard, analytics, filter transactions
```

The role is stored in Zustand + localStorage. Components conditionally render:
- Add/Edit/Delete buttons: `{isAdmin && <Button />}`
- Export button: hidden for user role
- Role switcher in sidebar for instant switching

---

## 🔮 Future Improvements

- [ ] Backend integration with Motoko canister
- [ ] Internet Identity authentication
- [ ] Multi-user support with per-user data isolation
- [ ] Budget tracking with goal setting
- [ ] Recurring transactions support
- [ ] Currency conversion with live rates
- [ ] Advanced AI spending predictions
- [ ] Notification system for budget alerts
- [ ] Mobile app (React Native)
- [ ] Dark/light theme toggle

---

Built with ♥ using [caffeine.ai](https://caffeine.ai)
