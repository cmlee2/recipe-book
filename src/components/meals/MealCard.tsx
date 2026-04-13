import Image from "next/image";
import Link from "next/link";

interface MealCardProps {
  id: string;
  name: string;
  thumb: string;
}

export default function MealCard({ id, name, thumb }: MealCardProps) {
  return (
    <Link href={`/meals/${id}`} className="group">
      <div className="relative aspect-square overflow-hidden rounded-lg">
        <Image
          src={thumb}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
        />
      </div>
      <h3 className="mt-2 font-body text-sm font-semibold leading-snug text-bark group-hover:text-accent transition-colors">
        {name}
      </h3>
    </Link>
  );
}
