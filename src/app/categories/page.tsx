import Image from "next/image";
import Link from "next/link";
import { getCategories } from "@/lib/mealdb/api";

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="mx-auto max-w-7xl px-5 py-10">
      <h1 className="font-display text-3xl font-bold text-bark">Categories</h1>
      <p className="mt-1 font-body text-sm text-warm">Browse recipes by type</p>
      <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
        {categories.map((cat, i) => (
          <Link
            key={cat.idCategory}
            href={`/categories/${cat.strCategory}`}
            className="group relative overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black/[0.04] transition-all hover:shadow-md hover:-translate-y-0.5 animate-fade-up"
            style={{ animationDelay: `${0.04 * i}s` }}
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
            <div className="p-3.5">
              <p className="line-clamp-2 font-body text-xs leading-relaxed text-warm">
                {cat.strCategoryDescription}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
