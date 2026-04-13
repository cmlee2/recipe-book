import { auth } from "@clerk/nextjs/server";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import DeleteRecipeButton from "./DeleteRecipeButton";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function RecipeDetailPage({ params }: Props) {
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }

  const { id } = await params;
  const supabase = createClient();
  const { data: recipe } = await supabase
    .from("recipes")
    .select("*")
    .eq("id", id)
    .eq("clerk_user_id", userId)
    .single();

  if (!recipe) {
    notFound();
  }

  const ingredients = (recipe.ingredients || []) as { name: string; measure: string }[];

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <Link
        href="/my-recipes"
        className="mb-6 inline-block text-sm text-orange-500 hover:text-orange-600"
      >
        &larr; My Recipes
      </Link>

      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
        {recipe.image_url && (
          <div className="relative aspect-video">
            <img
              src={recipe.image_url}
              alt={recipe.name}
              className="h-full w-full object-cover"
            />
          </div>
        )}

        <div className="p-6">
          <div className="flex items-center justify-between gap-4">
            <h1 className="text-3xl font-bold text-gray-900">{recipe.name}</h1>
            <div className="flex gap-2">
              <Link
                href={`/my-recipes/${recipe.id}/edit`}
                className="rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
              >
                Edit
              </Link>
              <DeleteRecipeButton recipeId={recipe.id} />
            </div>
          </div>

          <div className="mt-2 flex gap-3">
            {recipe.category && (
              <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-700">
                {recipe.category}
              </span>
            )}
            {recipe.area && (
              <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                {recipe.area}
              </span>
            )}
            <span
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                recipe.is_public
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {recipe.is_public ? "Public" : "Private"}
            </span>
          </div>

          {ingredients.length > 0 && (
            <div className="mt-8">
              <h2 className="mb-3 text-lg font-semibold text-gray-900">
                Ingredients
              </h2>
              <ul className="space-y-2">
                {ingredients.map((item, i) => (
                  <li key={i} className="flex justify-between text-sm">
                    <span className="text-gray-700">{item.name}</span>
                    <span className="text-gray-500">{item.measure}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {recipe.instructions && (
            <div className="mt-8">
              <h2 className="mb-3 text-lg font-semibold text-gray-900">
                Instructions
              </h2>
              <div className="space-y-3 text-sm leading-relaxed text-gray-700">
                {recipe.instructions.split("\n").filter(Boolean).map((p: string, i: number) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
