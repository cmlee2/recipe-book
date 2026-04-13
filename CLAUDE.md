# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start dev server on localhost:3000
npm run build        # Production build
npm run lint         # ESLint
npx playwright test  # Run all E2E tests (expects dev server running or starts one)
npx playwright test tests/app.spec.ts --grep "Home Page"  # Run specific test
```

## Architecture

This is a Next.js 16 recipe app using App Router with server components, Clerk for auth, Supabase for data, and TheMealDB as an external recipe API.

**Next.js 16 breaking change:** Middleware is renamed to `proxy.ts` (not `middleware.ts`). See `node_modules/next/dist/docs/` for docs.

### Auth & Data Flow

**Clerk** handles all authentication (sign-in, sign-up, sessions). **Supabase** is used only as a Postgres database — no Supabase auth. They connect through `clerk_user_id`:

- `src/proxy.ts` — Clerk middleware (`clerkMiddleware()` exported as `proxy`)
- `src/lib/supabase/profile.ts` — `ensureProfile()` upserts a `profiles` row from Clerk user data on first authenticated API call
- API routes call `auth()` from Clerk to get `userId`, then query Supabase with it

### Server vs Client Pattern

- **Server components** (default) fetch MealDB API data directly — pages render with data, no loading spinners
- **Client components** (`"use client"`) handle interactivity: search bar, favorite toggle, meal planner, recipe form
- **API routes** (`src/app/api/`) are the only path to Supabase — they verify Clerk auth, then use the service role client

### Key Modules

- `src/lib/mealdb/api.ts` — Typed wrappers for TheMealDB (search, lookup, random, categories, filter by area/category). Normalizes `strIngredient1-20` / `strMeasure1-20` into a clean array.
- `src/lib/supabase/server.ts` — Creates Supabase client using legacy JWT anon key (RLS is disabled). Falls back to service role key.
- `src/lib/utils.ts` — `getWeekStart()`, `addWeeks()`, `DAYS` constant for meal planner

### Supabase Schema

Four tables in `supabase/schema.sql`, all FK to `profiles.clerk_user_id` with cascade delete:

- **profiles** — cached Clerk user info (display_name, image_url)
- **favorites** — saved MealDB meals (unique on clerk_user_id + meal_id)
- **recipes** — user-created recipes (ingredients as JSONB, is_public flag)
- **meal_plans** — weekly slots (unique on clerk_user_id + week_start + day_of_week, meal_type is 'mealdb' or 'custom')

MealDB data is never stored in Supabase — only `meal_id`, `meal_name`, and `meal_thumb` are cached for display. Full detail is always fetched fresh from MealDB.

### Environment Variables

See `.env.example`. The app needs: Supabase URL + publishable key + service role key (or anon JWT key as `SUPABASE_ANON_KEY`), Clerk publishable + secret keys.

### Supabase MCP

`.mcp.json` configures the Supabase MCP server for direct database access from Claude Code. Run schema changes via `mcp__supabase__apply_migration`.
