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
    <div className="rounded-lg border border-gray-200 bg-white p-3">
      <h3 className="mb-2 text-xs font-semibold uppercase text-gray-500">
        {day}
      </h3>
      {entry ? (
        <div>
          {entry.meal_thumb && (
            <img
              src={entry.meal_thumb}
              alt={entry.meal_name || ""}
              className="mb-2 aspect-square w-full rounded object-cover"
            />
          )}
          <p className="text-xs font-medium text-gray-900 line-clamp-2">
            {entry.meal_name || "Unnamed"}
          </p>
          <button
            onClick={() => onRemove(entry.id)}
            className="mt-2 text-xs text-red-500 hover:text-red-600"
          >
            Remove
          </button>
        </div>
      ) : (
        <button
          onClick={onAdd}
          className="flex h-20 w-full items-center justify-center rounded border-2 border-dashed border-gray-200 text-xs text-gray-400 hover:border-orange-300 hover:text-orange-500"
        >
          + Add meal
        </button>
      )}
    </div>
  );
}
