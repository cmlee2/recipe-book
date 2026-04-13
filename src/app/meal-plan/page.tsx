import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import WeekView from "@/components/meal-plan/WeekView";

export default async function MealPlanPage() {
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">
        Weekly Meal Plan
      </h1>
      <WeekView />
    </div>
  );
}
