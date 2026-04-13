export interface Profile {
  id: string;
  clerk_user_id: string;
  display_name: string | null;
  image_url: string | null;
  created_at: string;
}

export interface Favorite {
  id: string;
  clerk_user_id: string;
  meal_id: string;
  meal_name: string | null;
  meal_thumb: string | null;
  created_at: string;
}

export interface Recipe {
  id: string;
  clerk_user_id: string;
  name: string;
  category: string | null;
  area: string | null;
  instructions: string | null;
  image_url: string | null;
  ingredients: { name: string; measure: string }[];
  is_public: boolean;
  created_at: string;
  updated_at: string;
}

export interface MealPlan {
  id: string;
  clerk_user_id: string;
  day_of_week: number;
  week_start: string;
  meal_type: "mealdb" | "custom";
  meal_id: string | null;
  recipe_id: string | null;
  meal_name: string | null;
  meal_thumb: string | null;
  created_at: string;
}
