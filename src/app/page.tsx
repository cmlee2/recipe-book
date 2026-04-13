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
    <div className="mx-auto max-w-7xl px-4 py-8">
      <section className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-gray-900">Recipe Book</h1>
        <p className="mt-2 text-gray-600">
          Search, save, and share your favorite recipes
        </p>
        <div className="mx-auto mt-6 max-w-xl">
          <SearchBar />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold text-gray-900">
          Random Pick
        </h2>
        <Link
          href={`/meals/${randomMeal.idMeal}`}
          className="group flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm sm:flex-row"
        >
          <div className="relative aspect-video sm:w-80 sm:shrink-0">
            <Image
              src={randomMeal.strMealThumb}
              alt={randomMeal.strMeal}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 320px"
            />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 group-hover:text-orange-500">
              {randomMeal.strMeal}
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {randomMeal.strCategory} &middot; {randomMeal.strArea}
            </p>
            <p className="mt-3 line-clamp-3 text-sm text-gray-600">
              {randomMeal.strInstructions}
            </p>
          </div>
        </Link>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-semibold text-gray-900">
          Categories
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {categories.slice(0, 8).map((cat) => (
            <Link
              key={cat.idCategory}
              href={`/categories/${cat.strCategory}`}
              className="group overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
            >
              <div className="relative aspect-video">
                <Image
                  src={cat.strCategoryThumb}
                  alt={cat.strCategory}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, 25vw"
                />
              </div>
              <div className="p-3">
                <h3 className="text-sm font-medium text-gray-900">
                  {cat.strCategory}
                </h3>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-4 text-center">
          <Link
            href="/categories"
            className="text-sm font-medium text-orange-500 hover:text-orange-600"
          >
            View all categories &rarr;
          </Link>
        </div>
      </section>
    </div>
  );
}
