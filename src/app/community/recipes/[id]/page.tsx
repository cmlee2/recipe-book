import { notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function CommunityRecipePage({ params }: Props) {
  const { id } = await params;
  const supabase = createClient();

  const { data: recipe } = await supabase
    .from("recipes")
    .select("*, profiles(display_name, image_url)")
    .eq("id", id)
    .eq("is_public", true)
    .single();

  if (!recipe) {
    notFound();
  }

  const ingredients = (recipe.ingredients || []) as { name: string; measure: string }[];
  const profile = recipe.profiles as { display_name: string; image_url: string | null } | null;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <Link
        href="/community"
        className="mb-6 inline-block text-sm text-orange-500 hover:text-orange-600"
      >
        &larr; Community
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
          <h1 className="text-3xl font-bold text-gray-900">{recipe.name}</h1>

          <div className="mt-2 flex items-center gap-3">
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
          </div>

          {profile && (
            <p className="mt-3 text-sm text-gray-500">
              Shared by {profile.display_name || "Anonymous"}
            </p>
          )}

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
