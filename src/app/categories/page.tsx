import Image from "next/image";
import Link from "next/link";
import { getCategories } from "@/lib/mealdb/api";

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Categories</h1>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {categories.map((cat) => (
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
              <p className="mt-1 line-clamp-2 text-xs text-gray-500">
                {cat.strCategoryDescription}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
