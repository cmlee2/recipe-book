import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import WeekView from "@/components/meal-plan/WeekView";

export default async function MealPlanPage() {
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <div className="mx-auto max-w-7xl px-5 py-10">
      <h1 className="mb-1 font-display text-3xl font-bold text-bark">
        Weekly Meal Plan
      </h1>
      <p className="mb-8 font-body text-sm text-warm">
        Plan your meals for the week ahead
      </p>
      <WeekView />
    </div>
  );
}
