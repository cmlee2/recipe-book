import Image from "next/image";
import Link from "next/link";

interface MealCardProps {
  id: string;
  name: string;
  thumb: string;
}

export default function MealCard({ id, name, thumb }: MealCardProps) {
  return (
    <Link
      href={`/meals/${id}`}
      className="group relative overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black/[0.04] transition-all hover:shadow-md hover:-translate-y-0.5"
    >
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={thumb}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      </div>
      <div className="p-3.5">
        <h3 className="truncate font-display text-base font-semibold text-bark group-hover:text-terra transition-colors">
          {name}
        </h3>
      </div>
    </Link>
  );
}
