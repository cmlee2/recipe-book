import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getMealById } from "@/lib/mealdb/api";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function MealDetailPage({ params }: Props) {
  const { id } = await params;
  const meal = await getMealById(id);

  if (!meal) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <Link
        href="/meals"
        className="mb-6 inline-block text-sm text-orange-500 hover:text-orange-600"
      >
        &larr; Back to search
      </Link>

      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
        <div className="relative aspect-video">
          <Image
            src={meal.strMealThumb}
            alt={meal.strMeal}
            fill
            className="object-cover"
            sizes="(max-width: 896px) 100vw, 896px"
            priority
          />
        </div>

        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-900">{meal.strMeal}</h1>
          <div className="mt-2 flex gap-3">
            <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-700">
              {meal.strCategory}
            </span>
            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
              {meal.strArea}
            </span>
            {meal.strTags &&
              meal.strTags.split(",").map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700"
                >
                  {tag.trim()}
                </span>
              ))}
          </div>

          <div className="mt-8 grid gap-8 md:grid-cols-3">
            <div className="md:col-span-1">
              <h2 className="mb-3 text-lg font-semibold text-gray-900">
                Ingredients
              </h2>
              <ul className="space-y-2">
                {meal.ingredients.map((item, i) => (
                  <li key={i} className="flex justify-between text-sm">
                    <span className="text-gray-700">{item.ingredient}</span>
                    <span className="text-gray-500">{item.measure}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-2">
              <h2 className="mb-3 text-lg font-semibold text-gray-900">
                Instructions
              </h2>
              <div className="space-y-3 text-sm leading-relaxed text-gray-700">
                {meal.strInstructions.split("\n").filter(Boolean).map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          </div>

          {meal.strYoutube && (
            <div className="mt-8">
              <a
                href={meal.strYoutube}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-orange-500 hover:text-orange-600"
              >
                Watch on YouTube &rarr;
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
