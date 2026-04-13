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
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <button
          onClick={() => setWeekStart(addWeeks(weekStart, -1))}
          className="flex items-center gap-1.5 rounded-full bg-white px-4 py-2 font-body text-sm font-semibold text-bark shadow-sm ring-1 ring-black/[0.06] transition-all hover:shadow-md active:scale-[0.97]"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M13 8H3M7 4L3 8l4 4"/></svg>
          Prev
        </button>
        <div className="text-center">
          <p className="font-display text-lg font-bold text-bark">
            Week of {weekLabel}
          </p>
        </div>
        <button
          onClick={() => setWeekStart(addWeeks(weekStart, 1))}
          className="flex items-center gap-1.5 rounded-full bg-white px-4 py-2 font-body text-sm font-semibold text-bark shadow-sm ring-1 ring-black/[0.06] transition-all hover:shadow-md active:scale-[0.97]"
        >
          Next
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-warm-lighter border-t-terra" />
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-7">
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
