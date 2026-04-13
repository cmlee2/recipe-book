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
    <div className="mx-auto max-w-[1280px] px-5 py-10">
      <h1 className="font-display text-3xl font-bold text-bark">What to Cook</h1>
      <div className="mt-6 mb-10 max-w-lg">
        <SearchBar defaultValue={query} />
      </div>
      {query ? (
        <>
          <p className="mb-6 font-body text-sm text-warm">
            {meals.length} result{meals.length !== 1 ? "s" : ""} for &ldquo;
            <span className="font-semibold text-bark">{query}</span>&rdquo;
          </p>
          <MealGrid meals={meals} />
        </>
      ) : (
        <div className="py-20 text-center">
          <p className="font-display text-lg text-warm">
            Search above to find recipes.
          </p>
        </div>
      )}
    </div>
  );
}
