import Image from "next/image";
import Link from "next/link";
import { getRandomMeal, getCategories } from "@/lib/mealdb/api";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [randomMeal, categories] = await Promise.all([
    getRandomMeal(),
    getCategories(),
  ]);

  return (
    <div className="mx-auto max-w-[1280px] px-5">
      {/* Featured Recipe — NYT style hero */}
      <section className="py-8">
        <Link
          href={`/meals/${randomMeal.idMeal}`}
          className="group grid gap-6 sm:grid-cols-[1.2fr_1fr] sm:gap-10"
        >
          <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
            <Image
              src={randomMeal.strMealThumb}
              alt={randomMeal.strMeal}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 100vw, 60vw"
              priority
            />
          </div>
          <div className="flex flex-col justify-center">
            <h1 className="font-display text-4xl font-bold leading-[1.15] text-bark sm:text-5xl">
              {randomMeal.strMeal}
            </h1>
            <p className="mt-4 font-body text-[15px] leading-relaxed text-bark-light line-clamp-4">
              {randomMeal.strInstructions}
            </p>
            <div className="mt-5 flex items-center gap-4">
              <span className="font-body text-sm text-warm">
                {randomMeal.strCategory}
              </span>
              <span className="text-warm-light">|</span>
              <span className="font-body text-sm text-warm">
                {randomMeal.strArea}
              </span>
            </div>
          </div>
        </Link>
      </section>

      {/* Divider */}
      <div className="border-t-[3px] border-bark" />

      {/* Categories as editorial sections */}
      <section className="py-10">
        <h2 className="font-display text-2xl font-bold text-bark">
          Explore Categories
        </h2>
        <p className="mt-1 font-body text-sm text-warm">
          Find something delicious for every occasion.
        </p>

        <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {categories.slice(0, 8).map((cat, i) => (
            <Link
              key={cat.idCategory}
              href={`/categories/${cat.strCategory}`}
              className="group animate-fade-up"
              style={{ animationDelay: `${0.05 * i}s` }}
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
                <Image
                  src={cat.strCategoryThumb}
                  alt={cat.strCategory}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, 25vw"
                />
              </div>
              <h3 className="mt-2.5 font-display text-lg font-bold text-bark group-hover:text-terra transition-colors">
                {cat.strCategory}
              </h3>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/categories"
            className="inline-block rounded-full border border-bark px-6 py-2.5 font-body text-sm font-semibold text-bark transition-colors hover:bg-bark hover:text-white"
          >
            View all categories
          </Link>
        </div>
      </section>
    </div>
  );
}
