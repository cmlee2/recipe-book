"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Ingredient {
  name: string;
  measure: string;
}

interface RecipeFormProps {
  initialData?: {
    id?: string;
    name: string;
    category: string;
    area: string;
    instructions: string;
    image_url: string;
    ingredients: Ingredient[];
    is_public: boolean;
  };
}

export default function RecipeForm({ initialData }: RecipeFormProps) {
  const router = useRouter();
  const isEditing = !!initialData?.id;

  const [name, setName] = useState(initialData?.name || "");
  const [category, setCategory] = useState(initialData?.category || "");
  const [area, setArea] = useState(initialData?.area || "");
  const [instructions, setInstructions] = useState(initialData?.instructions || "");
  const [imageUrl, setImageUrl] = useState(initialData?.image_url || "");
  const [isPublic, setIsPublic] = useState(initialData?.is_public !== false);
  const [ingredients, setIngredients] = useState<Ingredient[]>(
    initialData?.ingredients?.length ? initialData.ingredients : [{ name: "", measure: "" }]
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function addIngredient() {
    setIngredients([...ingredients, { name: "", measure: "" }]);
  }

  function removeIngredient(index: number) {
    setIngredients(ingredients.filter((_, i) => i !== index));
  }

  function updateIngredient(index: number, field: keyof Ingredient, value: string) {
    const updated = [...ingredients];
    updated[index] = { ...updated[index], [field]: value };
    setIngredients(updated);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const filteredIngredients = ingredients.filter((ing) => ing.name.trim());

    const payload = {
      name,
      category,
      area,
      instructions,
      image_url: imageUrl,
      ingredients: filteredIngredients,
      is_public: isPublic,
    };

    try {
      const url = isEditing ? `/api/recipes/${initialData!.id}` : "/api/recipes";
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const data = await res.json();
        router.push(`/my-recipes/${data.id}`);
        router.refresh();
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.error || `Failed to save recipe (${res.status})`);
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  const inputBase =
    "rounded-lg border border-border bg-white px-4 py-3 font-body text-sm text-bark placeholder:text-warm-light focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30";
  const inputClass = `w-full ${inputBase}`;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-xl bg-red-50 p-4 font-body text-sm text-red-700 ring-1 ring-red-100">
          {error}
        </div>
      )}

      <div>
        <label className="mb-1.5 block font-body text-sm font-semibold text-bark">
          Recipe Name *
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className={inputClass}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block font-body text-sm font-semibold text-bark">
            Category
          </label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="e.g., Dessert, Seafood"
            className={inputClass}
          />
        </div>
        <div>
          <label className="mb-1.5 block font-body text-sm font-semibold text-bark">
            Cuisine / Area
          </label>
          <input
            type="text"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            placeholder="e.g., Italian, Japanese"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block font-body text-sm font-semibold text-bark">
          Image URL
        </label>
        <input
          type="url"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="https://..."
          className={inputClass}
        />
      </div>

      <div>
        <label className="mb-2 block font-body text-sm font-semibold text-bark">
          Ingredients
        </label>
        <div className="space-y-2">
          {ingredients.map((ing, i) => (
            <div key={i} className="flex gap-2">
              <input
                type="text"
                value={ing.name}
                onChange={(e) => updateIngredient(i, "name", e.target.value)}
                placeholder="Ingredient"
                className={`flex-1 min-w-0 ${inputBase}`}
              />
              <input
                type="text"
                value={ing.measure}
                onChange={(e) => updateIngredient(i, "measure", e.target.value)}
                placeholder="Amount"
                className={`w-36 shrink-0 ${inputBase}`}
              />
              {ingredients.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeIngredient(i)}
                  className="rounded-xl px-3 font-body text-sm text-warm transition-colors hover:bg-red-50 hover:text-red-600"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
                </button>
              )}
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addIngredient}
          className="mt-3 font-body text-sm font-semibold text-accent transition-colors hover:text-accent-dark"
        >
          + Add ingredient
        </button>
      </div>

      <div>
        <label className="mb-1.5 block font-body text-sm font-semibold text-bark">
          Instructions
        </label>
        <textarea
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          rows={8}
          className={`${inputClass} resize-none`}
        />
      </div>

      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="is_public"
          checked={isPublic}
          onChange={(e) => setIsPublic(e.target.checked)}
          className="h-4.5 w-4.5 rounded border-warm-light text-accent accent-accent focus:ring-accent"
        />
        <label htmlFor="is_public" className="font-body text-sm text-bark-light">
          Share with the community
        </label>
      </div>

      <button
        type="submit"
        disabled={saving || !name.trim()}
        className="rounded-full bg-accent px-8 py-3 font-body text-sm font-semibold text-white shadow-sm transition-all hover:bg-accent-dark hover:shadow-md active:scale-[0.97] disabled:opacity-50"
      >
        {saving ? "Saving..." : isEditing ? "Update Recipe" : "Create Recipe"}
      </button>
    </form>
  );
}
