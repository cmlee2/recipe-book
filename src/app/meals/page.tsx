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
    <div className="mx-auto max-w-7xl px-5 py-10">
      <h1 className="font-display text-3xl font-bold text-bark">Search Recipes</h1>
      <p className="mt-1 font-body text-sm text-warm">Find your next favorite dish</p>
      <div className="mt-6 mb-10 max-w-xl">
        <SearchBar defaultValue={query} />
      </div>
      {query ? (
        <>
          <p className="mb-5 font-body text-sm text-warm">
            {meals.length} result{meals.length !== 1 ? "s" : ""} for &ldquo;
            <span className="font-medium text-bark">{query}</span>&rdquo;
          </p>
          <MealGrid meals={meals} />
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="text-5xl mb-4">🔍</div>
          <p className="font-display text-lg text-warm">
            Enter a search term to find recipes.
          </p>
        </div>
      )}
    </div>
  );
}
