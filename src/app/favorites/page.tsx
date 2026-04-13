import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
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
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">My Favorites</h1>
      {meals.length === 0 ? (
        <p className="py-12 text-center text-gray-500">
          No favorites yet. Browse recipes and save the ones you love!
        </p>
      ) : (
        <MealGrid meals={meals} />
      )}
    </div>
  );
}
