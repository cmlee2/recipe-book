import Link from "next/link";
import { getMealsByCategory } from "@/lib/mealdb/api";
import MealGrid from "@/components/meals/MealGrid";

interface Props {
  params: Promise<{ category: string }>;
}

export default async function CategoryMealsPage({ params }: Props) {
  const { category } = await params;
  const decoded = decodeURIComponent(category);
  const meals = await getMealsByCategory(decoded);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <Link
        href="/categories"
        className="mb-6 inline-block text-sm text-orange-500 hover:text-orange-600"
      >
        &larr; All categories
      </Link>
      <h1 className="mb-6 text-2xl font-bold text-gray-900">{decoded}</h1>
      <MealGrid meals={meals} />
    </div>
  );
}
