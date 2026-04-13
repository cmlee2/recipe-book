import Image from "next/image";
import Link from "next/link";
import { getRandomMeal, getCategories } from "@/lib/mealdb/api";
import SearchBar from "@/components/meals/SearchBar";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [randomMeal, categories] = await Promise.all([
    getRandomMeal(),
    getCategories(),
  ]);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-bark pb-20 pt-16">
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
        <div className="relative mx-auto max-w-3xl px-5 text-center">
          <p className="mb-3 font-body text-xs font-semibold uppercase tracking-[0.25em] text-terra-light animate-fade-up">
            Your kitchen companion
          </p>
          <h1 className="font-display text-5xl font-bold leading-tight text-cream sm:text-6xl animate-fade-up" style={{ animationDelay: '0.1s' }}>
            Every great meal<br />
            <span className="italic text-terra-light">starts here</span>
          </h1>
          <p className="mx-auto mt-5 max-w-md font-body text-base text-warm-light animate-fade-up" style={{ animationDelay: '0.2s' }}>
            Discover thousands of recipes, save your favorites, plan your week, and share your own creations.
          </p>
          <div className="mx-auto mt-8 max-w-xl animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <SearchBar />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-5">
        {/* Random Pick — editorial card */}
        <section className="-mt-10 mb-16 animate-fade-up" style={{ animationDelay: '0.4s' }}>
          <Link
            href={`/meals/${randomMeal.idMeal}`}
            className="group relative block overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-black/[0.04] transition-shadow hover:shadow-xl sm:flex"
          >
            <div className="relative aspect-[4/3] sm:aspect-auto sm:w-[45%] sm:shrink-0">
              <Image
                src={randomMeal.strMealThumb}
                alt={randomMeal.strMeal}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, 45vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent sm:bg-gradient-to-r" />
              <span className="absolute left-4 top-4 rounded-full bg-terra px-3 py-1 font-body text-xs font-semibold text-white shadow-sm">
                Today&apos;s Pick
              </span>
            </div>
            <div className="flex flex-col justify-center p-7 sm:p-10">
              <p className="font-body text-xs font-semibold uppercase tracking-widest text-warm">
                {randomMeal.strCategory} &middot; {randomMeal.strArea}
              </p>
              <h2 className="mt-2 font-display text-3xl font-bold text-bark transition-colors group-hover:text-terra sm:text-4xl">
                {randomMeal.strMeal}
              </h2>
              <p className="mt-4 line-clamp-3 font-body text-sm leading-relaxed text-bark-light">
                {randomMeal.strInstructions}
              </p>
              <span className="mt-6 inline-flex items-center gap-1.5 font-body text-sm font-semibold text-terra transition-all group-hover:gap-3">
                View recipe
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
              </span>
            </div>
          </Link>
        </section>

        {/* Categories */}
        <section className="mb-16">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <h2 className="font-display text-3xl font-bold text-bark">
                Explore by category
              </h2>
              <p className="mt-1 font-body text-sm text-warm">
                From seafood to desserts, find your next creation
              </p>
            </div>
            <Link
              href="/categories"
              className="hidden font-body text-sm font-semibold text-terra transition-colors hover:text-terra-dark sm:inline-flex sm:items-center sm:gap-1"
            >
              View all
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {categories.slice(0, 8).map((cat, i) => (
              <Link
                key={cat.idCategory}
                href={`/categories/${cat.strCategory}`}
                className="group relative overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black/[0.04] transition-all hover:shadow-md hover:-translate-y-0.5 animate-fade-up"
                style={{ animationDelay: `${0.05 * i}s` }}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={cat.strCategoryThumb}
                    alt={cat.strCategory}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 640px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <h3 className="absolute bottom-3 left-3 font-display text-lg font-bold text-white drop-shadow-sm">
                    {cat.strCategory}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-5 text-center sm:hidden">
            <Link
              href="/categories"
              className="font-body text-sm font-semibold text-terra hover:text-terra-dark"
            >
              View all categories &rarr;
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
