import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getMealById } from "@/lib/mealdb/api";
import FavoriteButton from "@/components/meals/FavoriteButton";

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
    <div className="mx-auto max-w-4xl px-5 py-10">
      <Link
        href="/meals"
        className="mb-6 inline-flex items-center gap-1.5 font-body text-sm font-medium text-warm transition-colors hover:text-accent"
      >
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M13 8H3M7 4L3 8l4 4"/></svg>
        Back to search
      </Link>

      <article className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/[0.04] animate-fade-up">
        <div className="relative aspect-[16/9]">
          <Image
            src={meal.strMealThumb}
            alt={meal.strMeal}
            fill
            className="object-cover"
            sizes="(max-width: 896px) 100vw, 896px"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="rounded-full bg-white/20 backdrop-blur-sm px-3 py-1 font-body text-xs font-semibold text-white">
                {meal.strCategory}
              </span>
              <span className="rounded-full bg-white/20 backdrop-blur-sm px-3 py-1 font-body text-xs font-semibold text-white">
                {meal.strArea}
              </span>
              {meal.strTags &&
                meal.strTags.split(",").map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-white/20 backdrop-blur-sm px-3 py-1 font-body text-xs font-semibold text-white"
                  >
                    {tag.trim()}
                  </span>
                ))}
            </div>
            <h1 className="font-display text-4xl font-bold text-white drop-shadow-md sm:text-5xl">
              {meal.strMeal}
            </h1>
          </div>
        </div>

        <div className="p-8">
          <div className="mb-8 flex justify-end">
            <FavoriteButton
              mealId={meal.idMeal}
              mealName={meal.strMeal}
              mealThumb={meal.strMealThumb}
            />
          </div>

          <div className="grid gap-10 md:grid-cols-3">
            <div className="md:col-span-1">
              <h2 className="mb-4 font-display text-xl font-bold text-bark">
                Ingredients
              </h2>
              <ul className="space-y-2.5">
                {meal.ingredients.map((item, i) => (
                  <li key={i} className="flex items-center justify-between border-b border-warm-lighter pb-2.5">
                    <span className="font-body text-sm font-medium text-bark">{item.ingredient}</span>
                    <span className="font-body text-sm text-warm">{item.measure}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-2">
              <h2 className="mb-4 font-display text-xl font-bold text-bark">
                Instructions
              </h2>
              <div className="space-y-4 font-body text-[15px] leading-[1.8] text-bark-light">
                {meal.strInstructions.split("\n").filter(Boolean).map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          </div>

          {meal.strYoutube && (
            <div className="mt-10 border-t border-warm-lighter pt-6">
              <a
                href={meal.strYoutube}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-body text-sm font-semibold text-accent transition-colors hover:text-accent-dark"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8zM9.5 15.6V8.4l6.3 3.6-6.3 3.6z"/></svg>
                Watch on YouTube
              </a>
            </div>
          )}
        </div>
      </article>
    </div>
  );
}
