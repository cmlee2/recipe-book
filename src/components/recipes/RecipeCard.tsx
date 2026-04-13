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
    <Link href={link} className="group">
      <div className="relative aspect-video overflow-hidden rounded-sm bg-cream-dark">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-4xl">
            🍽
          </div>
        )}
      </div>
      <h3 className="mt-2.5 font-display text-base font-bold leading-snug text-bark group-hover:text-accent transition-colors">
        {name}
      </h3>
      {(category || area) && (
        <p className="mt-0.5 font-body text-xs text-warm">
          {[category, area].filter(Boolean).join(" · ")}
        </p>
      )}
    </Link>
  );
}
