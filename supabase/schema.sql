-- Profiles: cached Clerk user info for community display
create table if not exists profiles (
  id uuid primary key default gen_random_uuid(),
  clerk_user_id text unique not null,
  display_name text,
  image_url text,
  created_at timestamptz default now()
);

-- Favorites: saved meals (MealDB or custom)
create table if not exists favorites (
  id uuid primary key default gen_random_uuid(),
  clerk_user_id text not null references profiles(clerk_user_id) on delete cascade,
  meal_id text not null,
  meal_name text,
  meal_thumb text,
  created_at timestamptz default now(),
  unique(clerk_user_id, meal_id)
);

-- Recipes: user-created recipes
create table if not exists recipes (
  id uuid primary key default gen_random_uuid(),
  clerk_user_id text not null references profiles(clerk_user_id) on delete cascade,
  name text not null,
  category text,
  area text,
  instructions text,
  image_url text,
  ingredients jsonb default '[]'::jsonb,
  is_public boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Meal plans: weekly meal assignments
create table if not exists meal_plans (
  id uuid primary key default gen_random_uuid(),
  clerk_user_id text not null references profiles(clerk_user_id) on delete cascade,
  day_of_week smallint not null check (day_of_week between 0 and 6),
  week_start date not null,
  meal_type text not null check (meal_type in ('mealdb', 'custom')),
  meal_id text,
  recipe_id uuid references recipes(id) on delete set null,
  meal_name text,
  meal_thumb text,
  created_at timestamptz default now(),
  unique(clerk_user_id, week_start, day_of_week)
);

-- Indexes for common queries
create index if not exists idx_favorites_clerk_user_id on favorites(clerk_user_id);
create index if not exists idx_recipes_clerk_user_id on recipes(clerk_user_id);
create index if not exists idx_recipes_is_public on recipes(is_public) where is_public = true;
create index if not exists idx_meal_plans_clerk_user_id_week on meal_plans(clerk_user_id, week_start);
