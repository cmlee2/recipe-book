import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import RecipeCard from "@/components/recipes/RecipeCard";

export default async function MyRecipesPage() {
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }

  const supabase = createClient();
  const { data: recipes } = await supabase
    .from("recipes")
    .select("*")
    .eq("clerk_user_id", userId)
    .order("created_at", { ascending: false });

  return (
    <div className="mx-auto max-w-7xl px-5 py-10">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-bark">My Recipes</h1>
          <p className="mt-1 font-body text-sm text-warm">Your personal collection</p>
        </div>
        <Link
          href="/my-recipes/new"
          className="rounded-full bg-terra px-5 py-2.5 font-body text-sm font-semibold text-white shadow-sm transition-all hover:bg-terra-dark hover:shadow-md active:scale-[0.97]"
        >
          + New Recipe
        </Link>
      </div>

      {!recipes || recipes.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="text-5xl mb-4">📝</div>
          <p className="font-display text-lg text-warm">No recipes yet.</p>
          <Link href="/my-recipes/new" className="mt-4 font-body text-sm font-semibold text-terra hover:text-terra-dark">
            Create your first recipe &rarr;
          </Link>
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
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
