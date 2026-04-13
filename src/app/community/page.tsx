import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import MealCard from "@/components/meals/MealCard";
import RecipeCard from "@/components/recipes/RecipeCard";

export const dynamic = "force-dynamic";

export default async function CommunityPage() {
  const supabase = createClient();

  const [favoritesRes, recipesRes] = await Promise.all([
    supabase
      .from("favorites")
      .select("*, profiles(display_name)")
      .order("created_at", { ascending: false })
      .limit(12),
    supabase
      .from("recipes")
      .select("*, profiles(display_name)")
      .eq("is_public", true)
      .order("created_at", { ascending: false })
      .limit(12),
  ]);

  const favorites = favoritesRes.data || [];
  const recipes = recipesRes.data || [];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-8 text-2xl font-bold text-gray-900">Community</h1>

      <section className="mb-12">
        <h2 className="mb-4 text-xl font-semibold text-gray-900">
          Recently Favorited
        </h2>
        {favorites.length === 0 ? (
          <p className="py-8 text-center text-gray-500">
            No community favorites yet.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {favorites.map((fav) => (
              <div key={fav.id} className="relative">
                <MealCard
                  id={fav.meal_id}
                  name={fav.meal_name || "Unknown"}
                  thumb={fav.meal_thumb || ""}
                />
                <p className="mt-1 text-xs text-gray-400">
                  by {(fav.profiles as { display_name: string } | null)?.display_name || "Anonymous"}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold text-gray-900">
          Shared Recipes
        </h2>
        {recipes.length === 0 ? (
          <p className="py-8 text-center text-gray-500">
            No shared recipes yet. <Link href="/my-recipes/new" className="text-orange-500 hover:text-orange-600">Create one!</Link>
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {recipes.map((recipe) => (
              <div key={recipe.id} className="relative">
                <RecipeCard
                  id={recipe.id}
                  name={recipe.name}
                  category={recipe.category}
                  area={recipe.area}
                  imageUrl={recipe.image_url}
                  href={`/community/recipes/${recipe.id}`}
                />
                <p className="mt-1 text-xs text-gray-400">
                  by {(recipe.profiles as { display_name: string } | null)?.display_name || "Anonymous"}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
