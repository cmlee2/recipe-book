import { auth } from "@clerk/nextjs/server";
import { redirect, notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import RecipeForm from "@/components/recipes/RecipeForm";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditRecipePage({ params }: Props) {
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

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Edit Recipe</h1>
      <RecipeForm
        initialData={{
          id: recipe.id,
          name: recipe.name,
          category: recipe.category || "",
          area: recipe.area || "",
          instructions: recipe.instructions || "",
          image_url: recipe.image_url || "",
          ingredients: recipe.ingredients || [],
          is_public: recipe.is_public,
        }}
      />
    </div>
  );
}
