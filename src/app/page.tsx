import Image from "next/image";
import Link from "next/link";
import {
  getRandomMeal,
  getCategories,
  getMealsByCategory,
  getMealsByArea,
} from "@/lib/mealdb/api";
import MealCard from "@/components/meals/MealCard";

export const dynamic = "force-dynamic";

function SectionHeader({
  title,
  subtitle,
  href,
}: {
  title: string;
  subtitle?: string;
  href?: string;
}) {
  return (
    <div className="mb-6 flex items-end justify-between border-b-2 border-bark pb-3">
      <div>
        <h2 className="font-display text-2xl font-bold text-bark">{title}</h2>
        {subtitle && (
          <p className="mt-0.5 font-body text-sm text-warm">{subtitle}</p>
        )}
      </div>
      {href && (
        <Link
          href={href}
          className="font-body text-sm font-semibold text-accent hover:text-accent-dark"
        >
          See All &rarr;
        </Link>
      )}
    </div>
  );
}

export default async function Home() {
  const [featured, categories, seafood, italian, desserts, mexican, chicken] =
    await Promise.all([
      getRandomMeal(),
      getCategories(),
      getMealsByArea("Canadian"),
      getMealsByArea("Italian"),
      getMealsByCategory("Dessert"),
      getMealsByArea("Mexican"),
      getMealsByCategory("Chicken"),
    ]);

  return (
    <div className="mx-auto max-w-[1200px] px-5">
      {/* Hero — Featured Recipe */}
      <section className="py-8 border-b border-border">
        <Link
          href={`/meals/${featured.idMeal}`}
          className="group grid gap-8 md:grid-cols-[1.3fr_1fr]"
        >
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
            <Image
              src={featured.strMealThumb}
              alt={featured.strMeal}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              sizes="(max-width: 768px) 100vw, 60vw"
              priority
            />
          </div>
          <div className="flex flex-col justify-center">
            <span className="font-body text-xs font-bold uppercase tracking-widest text-accent">
              Featured Recipe
            </span>
            <h1 className="mt-2 font-display text-4xl font-bold leading-[1.15] text-bark md:text-5xl">
              {featured.strMeal}
            </h1>
            <p className="mt-4 font-body text-[15px] leading-[1.7] text-bark-light line-clamp-4">
              {featured.strInstructions}
            </p>
            <div className="mt-5 flex items-center gap-3 font-body text-sm text-warm">
              <span className="rounded bg-cream px-2.5 py-1 font-semibold text-bark-light">
                {featured.strCategory}
              </span>
              <span className="rounded bg-cream px-2.5 py-1 font-semibold text-bark-light">
                {featured.strArea}
              </span>
            </div>
          </div>
        </Link>
      </section>

      {/* Italian */}
      <section className="py-10">
        <SectionHeader title="Italian Favorites" subtitle="Classic dishes from the heart of Italy" href="/categories/Pasta" />
        <div className="grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
          {italian.slice(0, 5).map((meal, i) => (
            <div key={meal.idMeal} className="animate-fade-up" style={{ animationDelay: `${0.04 * i}s` }}>
              <MealCard id={meal.idMeal} name={meal.strMeal} thumb={meal.strMealThumb} />
            </div>
          ))}
        </div>
      </section>

      {/* Categories Strip */}
      <section className="py-10 border-t border-border">
        <SectionHeader title="Browse by Category" href="/categories" />
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-4 lg:grid-cols-4">
          {categories.slice(0, 8).map((cat, i) => (
            <Link
              key={cat.idCategory}
              href={`/categories/${cat.strCategory}`}
              className="group animate-fade-up"
              style={{ animationDelay: `${0.04 * i}s` }}
            >
              <div className="relative aspect-[3/2] overflow-hidden rounded-lg">
                <Image
                  src={cat.strCategoryThumb}
                  alt={cat.strCategory}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <h3 className="absolute bottom-3 left-3 font-display text-lg font-bold text-white">
                  {cat.strCategory}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Chicken */}
      <section className="py-10 border-t border-border">
        <SectionHeader title="Chicken Recipes" subtitle="Weeknight staples and crowd-pleasers" href="/categories/Chicken" />
        <div className="grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
          {chicken.slice(0, 5).map((meal, i) => (
            <div key={meal.idMeal} className="animate-fade-up" style={{ animationDelay: `${0.04 * i}s` }}>
              <MealCard id={meal.idMeal} name={meal.strMeal} thumb={meal.strMealThumb} />
            </div>
          ))}
        </div>
      </section>

      {/* Desserts */}
      <section className="py-10 border-t border-border">
        <SectionHeader title="Desserts" subtitle="Sweet endings for every occasion" href="/categories/Dessert" />
        <div className="grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
          {desserts.slice(0, 5).map((meal, i) => (
            <div key={meal.idMeal} className="animate-fade-up" style={{ animationDelay: `${0.04 * i}s` }}>
              <MealCard id={meal.idMeal} name={meal.strMeal} thumb={meal.strMealThumb} />
            </div>
          ))}
        </div>
      </section>

      {/* Canadian */}
      <section className="py-10 border-t border-border">
        <SectionHeader title="Canadian Cuisine" subtitle="Hearty dishes from the north" />
        <div className="grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
          {seafood.slice(0, 5).map((meal, i) => (
            <div key={meal.idMeal} className="animate-fade-up" style={{ animationDelay: `${0.04 * i}s` }}>
              <MealCard id={meal.idMeal} name={meal.strMeal} thumb={meal.strMealThumb} />
            </div>
          ))}
        </div>
      </section>

      {/* Mexican */}
      <section className="py-10 border-t border-border">
        <SectionHeader title="Mexican Recipes" subtitle="Bold flavors and vibrant dishes" />
        <div className="grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
          {mexican.slice(0, 5).map((meal, i) => (
            <div key={meal.idMeal} className="animate-fade-up" style={{ animationDelay: `${0.04 * i}s` }}>
              <MealCard id={meal.idMeal} name={meal.strMeal} thumb={meal.strMealThumb} />
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-14 border-t border-border text-center">
        <h2 className="font-display text-3xl font-bold text-bark">
          Ready to start cooking?
        </h2>
        <p className="mt-2 font-body text-base text-warm">
          Search thousands of recipes or create your own.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link
            href="/meals"
            className="rounded-lg bg-accent px-6 py-3 font-body text-sm font-semibold text-white transition-colors hover:bg-accent-dark"
          >
            Browse Recipes
          </Link>
          <Link
            href="/my-recipes/new"
            className="rounded-lg border border-bark px-6 py-3 font-body text-sm font-semibold text-bark transition-colors hover:bg-bark hover:text-white"
          >
            Create Your Own
          </Link>
        </div>
      </section>
    </div>
  );
}
