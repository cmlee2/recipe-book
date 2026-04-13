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
      // Search MealDB
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

      // Search user recipes
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="mx-4 w-full max-w-lg rounded-lg bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            Pick a meal for {day}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSearch} className="mb-4 flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search meals..."
            className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
            autoFocus
          />
          <button
            type="submit"
            disabled={searching}
            className="rounded-md bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600 disabled:opacity-50"
          >
            Search
          </button>
        </form>

        <div className="max-h-80 overflow-y-auto">
          {results.length === 0 && !searching && (
            <p className="py-4 text-center text-sm text-gray-500">
              Search for a meal to add to your plan.
            </p>
          )}
          {searching && (
            <p className="py-4 text-center text-sm text-gray-500">
              Searching...
            </p>
          )}
          {results.map((result) => (
            <button
              key={`${result.type}-${result.id}`}
              onClick={() => handleSelect(result)}
              className="flex w-full items-center gap-3 rounded-md p-2 text-left hover:bg-gray-50"
            >
              {result.thumb ? (
                <img
                  src={result.thumb}
                  alt={result.name}
                  className="h-10 w-10 rounded object-cover"
                />
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded bg-gray-100 text-gray-400">
                  🍽
                </div>
              )}
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {result.name}
                </p>
                <p className="text-xs text-gray-500">
                  {result.type === "custom" ? "Your recipe" : "TheMealDB"}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
