import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import RecipeForm from "@/components/recipes/RecipeForm";

export default async function NewRecipePage() {
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <div className="mx-auto max-w-2xl px-5 py-10">
      <Link
        href="/my-recipes"
        className="mb-6 inline-flex items-center gap-1.5 font-body text-sm font-medium text-warm transition-colors hover:text-terra"
      >
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M13 8H3M7 4L3 8l4 4"/></svg>
        My Recipes
      </Link>
      <h1 className="mb-8 font-display text-3xl font-bold text-bark">New Recipe</h1>
      <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-black/[0.04]">
        <RecipeForm />
      </div>
    </div>
  );
}
