import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import MealGrid from "@/components/meals/MealGrid";

export default async function FavoritesPage() {
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }

  const supabase = createClient();
  const { data: favorites } = await supabase
    .from("favorites")
    .select("*")
    .eq("clerk_user_id", userId)
    .order("created_at", { ascending: false });

  const meals = (favorites || []).map((f) => ({
    idMeal: f.meal_id,
    strMeal: f.meal_name || "Unknown",
    strMealThumb: f.meal_thumb || "",
  }));

  return (
    <div className="mx-auto max-w-7xl px-5 py-10">
      <h1 className="font-display text-3xl font-bold text-bark">My Favorites</h1>
      <p className="mt-1 font-body text-sm text-warm">Recipes you&apos;ve saved for later</p>
      <div className="mt-8">
        {meals.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="text-5xl mb-4">❤️</div>
            <p className="font-display text-lg text-warm">No favorites yet.</p>
            <Link href="/meals" className="mt-4 font-body text-sm font-semibold text-accent hover:text-accent-dark">
              Browse recipes &rarr;
            </Link>
          </div>
        ) : (
          <MealGrid meals={meals} />
        )}
      </div>
    </div>
  );
}
