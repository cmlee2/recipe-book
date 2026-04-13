import Link from "next/link";

interface RecipeCardProps {
  id: string;
  name: string;
  category: string | null;
  area: string | null;
  imageUrl: string | null;
  href?: string;
}

export default function RecipeCard({
  id,
  name,
  category,
  area,
  imageUrl,
  href,
}: RecipeCardProps) {
  const link = href || `/my-recipes/${id}`;

  return (
    <Link
      href={link}
      className="group overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
    >
      <div className="relative aspect-video bg-gray-100">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            className="h-full w-full object-cover transition group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-3xl text-gray-300">
            🍽
          </div>
        )}
      </div>
      <div className="p-3">
        <h3 className="truncate text-sm font-medium text-gray-900">{name}</h3>
        {(category || area) && (
          <p className="mt-1 truncate text-xs text-gray-500">
            {[category, area].filter(Boolean).join(" · ")}
          </p>
        )}
      </div>
    </Link>
  );
}
