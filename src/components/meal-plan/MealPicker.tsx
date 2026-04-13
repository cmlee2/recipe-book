"use client";

import { useState } from "react";

interface PickedMeal {
  meal_type: string;
  meal_id?: string;
  recipe_id?: string;
  meal_name: string;
  meal_thumb: string;
}

interface MealPickerProps {
  day: string;
  onPick: (meal: PickedMeal) => void;
  onClose: () => void;
}

interface SearchResult {
  id: string;
  name: string;
  thumb: string;
  type: "mealdb" | "custom";
}

export default function MealPicker({ day, onPick, onClose }: MealPickerProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [searching, setSearching] = useState(false);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;

    setSearching(true);
    try {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`
      );
      const data = await res.json();
      const mealdbResults: SearchResult[] = (data.meals || []).map(
        (m: { idMeal: string; strMeal: string; strMealThumb: string }) => ({
          id: m.idMeal,
          name: m.strMeal,
          thumb: m.strMealThumb,
          type: "mealdb" as const,
        })
      );

      const recipesRes = await fetch("/api/recipes");
      const recipes = await recipesRes.json();
      const customResults: SearchResult[] = (Array.isArray(recipes) ? recipes : [])
        .filter((r: { name: string }) =>
          r.name.toLowerCase().includes(query.toLowerCase())
        )
        .map((r: { id: string; name: string; image_url: string | null }) => ({
          id: r.id,
          name: r.name,
          thumb: r.image_url || "",
          type: "custom" as const,
        }));

      setResults([...customResults, ...mealdbResults]);
    } catch {
      // ignore
    } finally {
      setSearching(false);
    }
  }

  function handleSelect(result: SearchResult) {
    onPick({
      meal_type: result.type,
      meal_id: result.type === "mealdb" ? result.id : undefined,
      recipe_id: result.type === "custom" ? result.id : undefined,
      meal_name: result.name,
      meal_thumb: result.thumb,
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-bark/60 backdrop-blur-sm animate-fade-in">
      <div className="mx-4 w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl ring-1 ring-black/[0.06]">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-display text-xl font-bold text-bark">
            Pick a meal for {day}
          </h2>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-warm transition-colors hover:bg-cream-dark hover:text-bark"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>

        <form onSubmit={handleSearch} className="mb-5 flex gap-2">
          <div className="relative flex-1">
            <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 text-warm" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search meals..."
              className="w-full rounded-xl border-0 bg-cream py-3 pl-10 pr-4 font-body text-sm text-bark ring-1 ring-black/[0.06] placeholder:text-warm-light focus:outline-none focus:ring-2 focus:ring-accent/40"
              autoFocus
            />
          </div>
          <button
            type="submit"
            disabled={searching}
            className="rounded-xl bg-accent px-5 py-3 font-body text-sm font-semibold text-white transition-all hover:bg-accent-dark disabled:opacity-50"
          >
            Search
          </button>
        </form>

        <div className="max-h-80 overflow-y-auto">
          {results.length === 0 && !searching && (
            <div className="flex flex-col items-center py-8">
              <div className="text-3xl mb-2">🍽️</div>
              <p className="font-body text-sm text-warm">
                Search for a meal to add to your plan.
              </p>
            </div>
          )}
          {searching && (
            <div className="flex justify-center py-8">
              <div className="h-6 w-6 animate-spin rounded-full border-3 border-warm-lighter border-t-accent" />
            </div>
          )}
          <div className="space-y-1">
            {results.map((result) => (
              <button
                key={`${result.type}-${result.id}`}
                onClick={() => handleSelect(result)}
                className="flex w-full items-center gap-3 rounded-xl p-2.5 text-left transition-colors hover:bg-accent-light"
              >
                {result.thumb ? (
                  <img
                    src={result.thumb}
                    alt={result.name}
                    className="h-12 w-12 rounded-lg object-cover"
                  />
                ) : (
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-cream-dark text-lg">
                    🍽
                  </div>
                )}
                <div>
                  <p className="font-body text-sm font-semibold text-bark">
                    {result.name}
                  </p>
                  <p className="font-body text-xs text-warm">
                    {result.type === "custom" ? "Your recipe" : "TheMealDB"}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
