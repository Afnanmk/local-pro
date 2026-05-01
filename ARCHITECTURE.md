# Project Architecture (App Router)
## Directory Map
- /app: Main routes and layouts.
  - /(auth): Grouped routes for login/signup.
  - /(dashboard): Protected user interface.
  - /api: External integration endpoints only.
- /components:
  - /ui: Atomic shadcn components (unmodified).
  - /shared: Reusable business components (Cards, Headers).
  - /forms: Complex form logic using React Hook Form + Zod.
- /lib:
  - supabase/: server.ts, client.ts, middleware.ts, and admin.ts.
  - utils.ts: Tailwind merge and general helpers.
- /types: Database definitions (generated) and application-wide interfaces.
- /services: Complex business logic that spans multiple actions or tables.

## State Management
- Use URL state for filters/pagination (Server-side).
- Use React Context only for global UI state (e.g., Modals).
- Use Supabase Realtime for live data updates.