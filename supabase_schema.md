# Database Schema (Initial)
## Tables
### profiles
- id: uuid, references auth.users (Primary Key)
- username: text, unique
- avatar_url: text
- updated_at: timestamp with time zone

### performance_logs
- id: bigint (Primary Key)
- user_id: uuid, references profiles.id
- metric_type: text (e.g., 'LCP', 'CLS')
- value: float8
- page_url: text
- created_at: timestamp with time zone

## Core Policies (RLS)
1. Profiles:
   - SELECT: Public (or Authenticated only).
   - UPDATE/INSERT: auth.uid() == id.
2. Logs:
   - INSERT: Authenticated users only.
   - SELECT: User can only see their own logs (auth.uid() == user_id).