import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import RecipeForm from "@/components/recipes/RecipeForm";

export default async function NewRecipePage() {
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">New Recipe</h1>
      <RecipeForm />
    </div>
  );
}
