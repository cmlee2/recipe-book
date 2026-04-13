import { auth } from "@clerk/nextjs/server";
import { createClient } from "@/lib/supabase/server";
import { ensureProfile } from "@/lib/supabase/profile";

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createClient();
  const { data, error } = await supabase
    .from("favorites")
    .select("*")
    .eq("clerk_user_id", userId)
    .order("created_at", { ascending: false });

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
  const { meal_id, meal_name, meal_thumb } = body;

  if (!meal_id) {
    return Response.json({ error: "meal_id is required" }, { status: 400 });
  }

  const supabase = createClient();
  const { data, error } = await supabase
    .from("favorites")
    .upsert(
      {
        clerk_user_id: userId,
        meal_id,
        meal_name: meal_name || null,
        meal_thumb: meal_thumb || null,
      },
      { onConflict: "clerk_user_id,meal_id" }
    )
    .select()
    .single();

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json(data, { status: 201 });
}
