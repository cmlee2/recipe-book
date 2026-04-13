"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";

interface FavoriteButtonProps {
  mealId: string;
  mealName: string;
  mealThumb: string;
}

export default function FavoriteButton({
  mealId,
  mealName,
  mealThumb,
}: FavoriteButtonProps) {
  const { isSignedIn } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isSignedIn) return;
    fetch("/api/favorites")
      .then((res) => res.json())
      .then((favorites) => {
        if (Array.isArray(favorites)) {
          setIsFavorite(favorites.some((f: { meal_id: string }) => f.meal_id === mealId));
        }
      })
      .catch(() => {});
  }, [isSignedIn, mealId]);

  if (!isSignedIn) return null;

  async function toggleFavorite() {
    setLoading(true);
    try {
      if (isFavorite) {
        await fetch(`/api/favorites/${mealId}`, { method: "DELETE" });
        setIsFavorite(false);
      } else {
        await fetch("/api/favorites", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ meal_id: mealId, meal_name: mealName, meal_thumb: mealThumb }),
        });
        setIsFavorite(true);
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={toggleFavorite}
      disabled={loading}
      className={`group flex items-center gap-2 rounded-full px-5 py-2.5 font-body text-sm font-semibold transition-all active:scale-[0.95] disabled:opacity-50 ${
        isFavorite
          ? "bg-terra-wash text-terra ring-1 ring-terra/20 hover:bg-terra hover:text-white"
          : "bg-cream-dark text-bark-light ring-1 ring-black/[0.06] hover:bg-terra-wash hover:text-terra hover:ring-terra/20"
      }`}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill={isFavorite ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
      {isFavorite ? "Saved" : "Save"}
    </button>
  );
}
