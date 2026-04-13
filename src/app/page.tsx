import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-24">
      <h1 className="text-5xl font-bold text-gray-900">Recipe Book</h1>
      <p className="mt-4 text-lg text-gray-600">
        Search, save, and share your favorite recipes
      </p>
      <div className="mt-8 flex gap-4">
        <Link
          href="/meals"
          className="rounded-md bg-orange-500 px-6 py-3 text-sm font-medium text-white hover:bg-orange-600"
        >
          Search Recipes
        </Link>
        <Link
          href="/categories"
          className="rounded-md border border-gray-300 px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Browse Categories
        </Link>
      </div>
    </div>
  );
}
