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
      className="group overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black/[0.04] transition-all hover:shadow-md hover:-translate-y-0.5"
    >
      <div className="relative aspect-video overflow-hidden bg-cream-dark">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-4xl">
            🍽
          </div>
        )}
      </div>
      <div className="p-3.5">
        <h3 className="truncate font-display text-base font-semibold text-bark group-hover:text-terra transition-colors">
          {name}
        </h3>
        {(category || area) && (
          <p className="mt-1 truncate font-body text-xs text-warm">
            {[category, area].filter(Boolean).join(" · ")}
          </p>
        )}
      </div>
    </Link>
  );
}
