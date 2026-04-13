import type { MealDetail, MealSummary, Category, RawMeal } from "./types";

const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

function parseIngredients(
  raw: RawMeal
): { ingredient: string; measure: string }[] {
  const ingredients: { ingredient: string; measure: string }[] = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = raw[`strIngredient${i}`]?.trim();
    const measure = raw[`strMeasure${i}`]?.trim();
    if (ingredient) {
      ingredients.push({ ingredient, measure: measure || "" });
    }
  }
  return ingredients;
}

function toMealDetail(raw: RawMeal): MealDetail {
  return {
    idMeal: raw.idMeal,
    strMeal: raw.strMeal,
    strMealThumb: raw.strMealThumb,
    strCategory: raw.strCategory,
    strArea: raw.strArea,
    strInstructions: raw.strInstructions,
    strTags: raw.strTags,
    strYoutube: raw.strYoutube,
    strSource: raw.strSource,
    ingredients: parseIngredients(raw),
  };
}

export async function searchMealsByName(name: string): Promise<MealDetail[]> {
  const res = await fetch(`${BASE_URL}/search.php?s=${encodeURIComponent(name)}`);
  const data = await res.json();
  if (!data.meals) return [];
  return (data.meals as RawMeal[]).map(toMealDetail);
}

export async function getMealById(id: string): Promise<MealDetail | null> {
  const res = await fetch(`${BASE_URL}/lookup.php?i=${encodeURIComponent(id)}`);
  const data = await res.json();
  if (!data.meals || data.meals.length === 0) return null;
  return toMealDetail(data.meals[0] as RawMeal);
}

export async function getRandomMeal(): Promise<MealDetail> {
  const res = await fetch(`${BASE_URL}/random.php`, { cache: "no-store" });
  const data = await res.json();
  return toMealDetail(data.meals[0] as RawMeal);
}

export async function getCategories(): Promise<Category[]> {
  const res = await fetch(`${BASE_URL}/categories.php`);
  const data = await res.json();
  return data.categories as Category[];
}

export async function getMealsByCategory(
  category: string
): Promise<MealSummary[]> {
  const res = await fetch(
    `${BASE_URL}/filter.php?c=${encodeURIComponent(category)}`
  );
  const data = await res.json();
  if (!data.meals) return [];
  return data.meals as MealSummary[];
}

export async function getMealsByArea(area: string): Promise<MealSummary[]> {
  const res = await fetch(
    `${BASE_URL}/filter.php?a=${encodeURIComponent(area)}`
  );
  const data = await res.json();
  if (!data.meals) return [];
  return data.meals as MealSummary[];
}
