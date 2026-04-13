# Recipe Book

A full-stack recipe web app for searching, saving, planning, and sharing meals.

**Live:** [recipe-book-rho-snowy.vercel.app](https://recipe-book-rho-snowy.vercel.app/)

## What It Does

- **Search recipes** from thousands of meals via TheMealDB API
- **Browse by category** — Seafood, Desserts, Chicken, Pasta, and more
- **Save favorites** — bookmark any recipe to your personal collection
- **Weekly meal planner** — assign meals to each day of the week with week-by-week navigation
- **Create your own recipes** — add custom recipes with ingredients, instructions, and images
- **Community** — see what others have favorited and browse shared user-created recipes

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, Server Components) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Authentication | Clerk |
| Database | Supabase (PostgreSQL) |
| Recipe Data | TheMealDB API |
| Testing | Playwright |
| Deployment | Vercel |

## Getting Started

### Prerequisites

- Node.js 20+
- A [Clerk](https://clerk.com) account
- A [Supabase](https://supabase.com) project

### Setup

1. Clone the repo and install dependencies:
   ```bash
   git clone https://github.com/cmlee2/recipe-book.git
   cd recipe-book
   npm install
   ```

2. Copy `.env.example` to `.env` and fill in your keys:
   ```bash
   cp .env.example .env
   ```

3. Run the database schema in your Supabase SQL editor:
   ```
   supabase/schema.sql
   ```

4. Start the dev server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000)

### Running Tests

```bash
npx playwright test
```

## Architecture

Recipes from TheMealDB are fetched server-side and rendered as complete pages — no loading spinners for initial page loads. User data (favorites, recipes, meal plans) is stored in Supabase and accessed through API routes that verify authentication via Clerk.

```
Browser ──→ Next.js Server ──→ TheMealDB API (read-only, public)
              │
              └──→ API Routes ──→ Supabase (user data)
                     │
                     └──→ Clerk (authentication)
```
