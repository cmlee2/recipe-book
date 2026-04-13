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
    <div className="mx-auto max-w-7xl px-5 py-10">
      <Link
        href="/categories"
        className="mb-6 inline-flex items-center gap-1.5 font-body text-sm font-medium text-warm transition-colors hover:text-terra"
      >
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M13 8H3M7 4L3 8l4 4"/></svg>
        All categories
      </Link>
      <h1 className="mb-8 font-display text-3xl font-bold text-bark">{decoded}</h1>
      <MealGrid meals={meals} />
    </div>
  );
}
