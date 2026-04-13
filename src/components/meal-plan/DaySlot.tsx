interface MealPlanEntry {
  id: string;
  meal_name: string | null;
  meal_thumb: string | null;
}

interface DaySlotProps {
  day: string;
  entry?: MealPlanEntry;
  onAdd: () => void;
  onRemove: (id: string) => void;
}

export default function DaySlot({ day, entry, onAdd, onRemove }: DaySlotProps) {
  return (
    <div className="rounded-xl bg-white p-3.5 shadow-sm ring-1 ring-black/[0.04]">
      <h3 className="mb-3 font-display text-xs font-bold uppercase tracking-widest text-bark">
        {day}
      </h3>
      {entry ? (
        <div>
          {entry.meal_thumb && (
            <img
              src={entry.meal_thumb}
              alt={entry.meal_name || ""}
              className="mb-2.5 aspect-square w-full rounded-lg object-cover"
            />
          )}
          <p className="font-body text-sm font-semibold text-bark line-clamp-2">
            {entry.meal_name || "Unnamed"}
          </p>
          <button
            onClick={() => onRemove(entry.id)}
            className="mt-2 font-body text-xs font-medium text-warm transition-colors hover:text-accent"
          >
            Remove
          </button>
        </div>
      ) : (
        <button
          onClick={onAdd}
          className="flex h-24 w-full items-center justify-center rounded-lg border-2 border-dashed border-warm-lighter font-body text-xs font-medium text-warm transition-all hover:border-accent/30 hover:bg-accent-light hover:text-accent"
        >
          + Add meal
        </button>
      )}
    </div>
  );
}
