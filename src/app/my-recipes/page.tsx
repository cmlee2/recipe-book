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
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">My Recipes</h1>
        <Link
          href="/my-recipes/new"
          className="rounded-md bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600"
        >
          + New Recipe
        </Link>
      </div>

      {!recipes || recipes.length === 0 ? (
        <p className="py-12 text-center text-gray-500">
          You haven&apos;t created any recipes yet.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              id={recipe.id}
              name={recipe.name}
              category={recipe.category}
              area={recipe.area}
              imageUrl={recipe.image_url}
            />
          ))}
        </div>
      )}
    </div>
  );
}
