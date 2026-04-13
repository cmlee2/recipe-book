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
    <div className="mx-auto max-w-7xl px-5 py-10">
      <h1 className="font-display text-3xl font-bold text-bark">Community</h1>
      <p className="mt-1 font-body text-sm text-warm">See what others are cooking and sharing</p>

      <section className="mt-10 mb-14">
        <h2 className="mb-5 font-display text-2xl font-bold text-bark">
          Recently Favorited
        </h2>
        {favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="text-4xl mb-3">🌍</div>
            <p className="font-body text-sm text-warm">No community favorites yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {favorites.map((fav, i) => (
              <div key={fav.id} className="animate-fade-up" style={{ animationDelay: `${0.04 * i}s` }}>
                <MealCard
                  id={fav.meal_id}
                  name={fav.meal_name || "Unknown"}
                  thumb={fav.meal_thumb || ""}
                />
                <p className="mt-1.5 font-body text-xs text-warm">
                  by {(fav.profiles as { display_name: string } | null)?.display_name || "Anonymous"}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="mb-5 font-display text-2xl font-bold text-bark">
          Shared Recipes
        </h2>
        {recipes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="text-4xl mb-3">📖</div>
            <p className="font-body text-sm text-warm">
              No shared recipes yet.{" "}
              <Link href="/my-recipes/new" className="font-semibold text-accent hover:text-accent-dark">
                Create one!
              </Link>
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {recipes.map((recipe, i) => (
              <div key={recipe.id} className="animate-fade-up" style={{ animationDelay: `${0.04 * i}s` }}>
                <RecipeCard
                  id={recipe.id}
                  name={recipe.name}
                  category={recipe.category}
                  area={recipe.area}
                  imageUrl={recipe.image_url}
                  href={`/community/recipes/${recipe.id}`}
                />
                <p className="mt-1.5 font-body text-xs text-warm">
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
