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
          body: JSON.stringify({
            meal_id: mealId,
            meal_name: mealName,
            meal_thumb: mealThumb,
          }),
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
      className={`rounded-md px-4 py-2 text-sm font-medium transition ${
        isFavorite
          ? "bg-red-100 text-red-700 hover:bg-red-200"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
      } disabled:opacity-50`}
    >
      {isFavorite ? "♥ Saved" : "♡ Save"}
    </button>
  );
}
