import { auth } from "@clerk/nextjs/server";
import { createClient } from "@/lib/supabase/server";
import { ensureProfile } from "@/lib/supabase/profile";

export async function GET(request: Request) {
  const { userId } = await auth();
  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const weekStart = searchParams.get("week_start");

  if (!weekStart) {
    return Response.json({ error: "week_start is required" }, { status: 400 });
  }

  const supabase = createClient();
  const { data, error } = await supabase
    .from("meal_plans")
    .select("*")
    .eq("clerk_user_id", userId)
    .eq("week_start", weekStart)
    .order("day_of_week");

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json(data);
}

export async function POST(request: Request) {
  const { userId } = await auth();
  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  await ensureProfile(userId);

  const body = await request.json();
  const { day_of_week, week_start, meal_type, meal_id, recipe_id, meal_name, meal_thumb } = body;

  if (day_of_week === undefined || !week_start || !meal_type) {
    return Response.json(
      { error: "day_of_week, week_start, and meal_type are required" },
      { status: 400 }
    );
  }

  const supabase = createClient();
  const { data, error } = await supabase
    .from("meal_plans")
    .upsert(
      {
        clerk_user_id: userId,
        day_of_week,
        week_start,
        meal_type,
        meal_id: meal_id || null,
        recipe_id: recipe_id || null,
        meal_name: meal_name || null,
        meal_thumb: meal_thumb || null,
      },
      { onConflict: "clerk_user_id,week_start,day_of_week" }
    )
    .select()
    .single();

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json(data, { status: 201 });
}

export async function DELETE(request: Request) {
  const { userId } = await auth();
  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return Response.json({ error: "id is required" }, { status: 400 });
  }

  const supabase = createClient();
  const { error } = await supabase
    .from("meal_plans")
    .delete()
    .eq("id", id)
    .eq("clerk_user_id", userId);

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return new Response(null, { status: 204 });
}
