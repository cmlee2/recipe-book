"use client";

import { useEffect, useState } from "react";
import { DAYS, getWeekStart, addWeeks } from "@/lib/utils";
import DaySlot from "./DaySlot";
import MealPicker from "./MealPicker";

interface MealPlanEntry {
  id: string;
  day_of_week: number;
  meal_type: string;
  meal_id: string | null;
  recipe_id: string | null;
  meal_name: string | null;
  meal_thumb: string | null;
}

export default function WeekView() {
  const [weekStart, setWeekStart] = useState(() => getWeekStart());
  const [entries, setEntries] = useState<MealPlanEntry[]>([]);
  const [pickerDay, setPickerDay] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/meal-plan?week_start=${weekStart}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setEntries(data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [weekStart]);

  function getEntryForDay(day: number): MealPlanEntry | undefined {
    return entries.find((e) => e.day_of_week === day);
  }

  async function handleRemove(id: string) {
    await fetch(`/api/meal-plan?id=${id}`, { method: "DELETE" });
    setEntries(entries.filter((e) => e.id !== id));
  }

  async function handlePickMeal(meal: {
    meal_type: string;
    meal_id?: string;
    recipe_id?: string;
    meal_name: string;
    meal_thumb: string;
  }) {
    if (pickerDay === null) return;

    const res = await fetch("/api/meal-plan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        day_of_week: pickerDay,
        week_start: weekStart,
        ...meal,
      }),
    });

    if (res.ok) {
      const entry = await res.json();
      setEntries((prev) => {
        const filtered = prev.filter((e) => e.day_of_week !== pickerDay);
        return [...filtered, entry].sort((a, b) => a.day_of_week - b.day_of_week);
      });
    }

    setPickerDay(null);
  }

  const weekDate = new Date(weekStart + "T00:00:00");
  const weekLabel = weekDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={() => setWeekStart(addWeeks(weekStart, -1))}
          className="rounded-md border border-gray-300 px-3 py-1 text-sm hover:bg-gray-50"
        >
          &larr; Prev
        </button>
        <span className="text-sm font-medium text-gray-700">
          Week of {weekLabel}
        </span>
        <button
          onClick={() => setWeekStart(addWeeks(weekStart, 1))}
          className="rounded-md border border-gray-300 px-3 py-1 text-sm hover:bg-gray-50"
        >
          Next &rarr;
        </button>
      </div>

      {loading ? (
        <p className="py-8 text-center text-gray-500">Loading...</p>
      ) : (
        <div className="grid gap-3 sm:grid-cols-7">
          {DAYS.map((day, i) => (
            <DaySlot
              key={day}
              day={day}
              entry={getEntryForDay(i)}
              onAdd={() => setPickerDay(i)}
              onRemove={handleRemove}
            />
          ))}
        </div>
      )}

      {pickerDay !== null && (
        <MealPicker
          day={DAYS[pickerDay]}
          onPick={handlePickMeal}
          onClose={() => setPickerDay(null)}
        />
      )}
    </div>
  );
}
