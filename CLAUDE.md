@AGENTS.md
# CLAUDE.md — Local Service Finder

Rules of the road for this project. Read this before touching any file.

---

## Build & Development

```bash
npm install                                                                 # Install dependencies
npm run dev                                                                 # Start dev server
npm run build                                                               # Production build
npx supabase gen types typescript --project-id YOUR_PROJECT_ID > types/supabase.ts 
You MUST use the @supabase/ssr package for client creation to ensure cookies are synced between Server Components, Server Actions, and the browser. # Sync DB types
```

---

## Tech Stack

| Layer     | Choice                                              |
|-----------|-----------------------------------------------------|
| Frontend  | Next.js 15+ (App Router), TypeScript, Tailwind CSS 4 |
| Backend   | Supabase + @supabase/ssr — Auth, Database, Storage             |
| Icons     | `react-icons`                                       |
| Rendering | Server Components by default; Client Components only when interactivity is required |

> **No custom backend logic.** Supabase handles everything server-side. Do not introduce Express, tRPC, or any custom API layer.

---

## Project Structure (Root Level)

There is **no `/src` folder**. All directories live at the root.

```
/
├── app/                        # Routes and Server Actions
├── components/
│   ├── ui/                     # Atomic, reusable UI elements (Button, Input, Badge…)
│   └── features/               # Domain-specific components (ServiceCard, BookingModal…)
├── lib/
│   └── supabase/               # Supabase client initialization only
├── services/                   # All database query logic — keep queries out of UI files
├── types/                      # Generated Supabase types + custom TypeScript definitions
└── public/                     # Static assets
```

### Rules per directory

- **`/app`** — Routes and Server Actions only. No inline query logic; call `/services` functions instead.
- **`/components/ui`** — Purely presentational. No Supabase calls, no business logic.
- **`/components/features`** — May accept typed props from server components or server actions; should not call Supabase directly.
- **`/lib/supabase`** — Client init only (`createClient`, `createServerClient`). Nothing else lives here.
- **`/services`** — Every database query lives here, grouped by domain (e.g., `services/listings.ts`, `services/bookings.ts`). Functions are async and return typed results.
- **`/types`** — `supabase.ts` is always generated (never hand-edited). Add custom types in separate files (e.g., `types/app.ts`).

---

## Architecture Patterns

### Components

- Default to **Server Components**. Only add `"use client"` when you need browser APIs, event handlers, or React state/effects.
- Co-locate a Client Component inside a Server Component file when the interactive surface is small; extract to `/components/features` when it grows.

### Data Fetching

- Fetch data in **Server Components or Server Actions** — never in Client Components unless unavoidable.
- All Supabase queries go through `/services`. UI files import service functions, not the Supabase client directly.

### Server Actions

- Place actions in `app/<route>/actions.ts` or a shared `app/actions/` directory.
- All mutations must live in @/app/actions/. Use domain-specific files (e.g., auth-actions.ts, service-actions.ts). Never define actions directly inside a page file.
- Always validate and sanitize inputs before passing to a service function.

---

## Security

- **RLS is mandatory.** Every table must have Row Level Security policies enabled in Supabase before any client-facing feature ships.
- **Never expose `service_role` keys on the client.** The `service_role` key is for server-only contexts (e.g., admin scripts, edge functions). Use the `anon` key on the client.
- Environment variables:
  - `NEXT_PUBLIC_SUPABASE_URL` — safe to expose
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY` — safe to expose
  - `SUPABASE_SERVICE_ROLE_KEY` — **server only, never `NEXT_PUBLIC_`**

---

## Design & Styling

- Visual reference: **https://smudge-march-20670051.figma.site/** — match its aesthetic (spacing, type scale, color language, card styles) unless a specific screen deviates by design decision.
- Use **Tailwind CSS 4** modern engine features: CSS-first config (`@theme`), `@layer`, and native cascade layers. Avoid the old `tailwind.config.js` patterns unless required for a plugin.
- Prefer Tailwind utility classes over custom CSS. Extract repeated class groups into components, not into `@apply` chains.
- Responsive-first: design for mobile, scale up with `sm:`, `md:`, `lg:` breakpoints.
- All styling config happens in app/globals.css using CSS variables and @theme. Do not create or edit tailwind.config.js.

---

## Coding Standards

### Naming

| Thing | Convention |
|---|---|
| Files & folders | `kebab-case` (e.g., `service-card.tsx`, `use-booking.ts`) |
| React components | `PascalCase` (e.g., `ServiceCard`, `BookingModal`) |
| Functions & variables | `camelCase` |
| Supabase table names | `snake_case` (match DB exactly) |
| Constants | `SCREAMING_SNAKE_CASE` |

### TypeScript

- **Strict mode on.** No `any` — use `unknown` and narrow, or derive types from Supabase generated types.
- Always use generated types from `types/supabase.ts` for DB rows. Example:

```ts
import type { Database } from '@/types/supabase'

type Listing = Database['public']['Tables']['listings']['Row']
```

- Prefer `type` over `interface` for object shapes; use `interface` only when you need declaration merging.

### General

- No commented-out code committed to `main`.
- Prefer explicit returns in async functions for clarity.
- Keep files under ~200 lines; split by responsibility when they grow beyond that.