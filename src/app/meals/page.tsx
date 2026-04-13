import { searchMealsByName } from "@/lib/mealdb/api";
import MealGrid from "@/components/meals/MealGrid";
import SearchBar from "@/components/meals/SearchBar";

interface Props {
  searchParams: Promise<{ q?: string }>;
}

export default async function MealsPage({ searchParams }: Props) {
  const { q } = await searchParams;
  const query = q || "";
  const meals = query ? await searchMealsByName(query) : [];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Search Recipes</h1>
      <div className="mb-8 max-w-xl">
        <SearchBar defaultValue={query} />
      </div>
      {query ? (
        <>
          <p className="mb-4 text-sm text-gray-500">
            {meals.length} result{meals.length !== 1 ? "s" : ""} for &ldquo;{query}&rdquo;
          </p>
          <MealGrid meals={meals} />
        </>
      ) : (
        <p className="py-12 text-center text-gray-500">
          Enter a search term to find recipes.
        </p>
      )}
    </div>
  );
}
