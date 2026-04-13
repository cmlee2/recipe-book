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
    .from("recipes")
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
  const { name, category, area, instructions, image_url, ingredients, is_public } = body;

  if (!name) {
    return Response.json({ error: "name is required" }, { status: 400 });
  }

  const supabase = createClient();
  const { data, error } = await supabase
    .from("recipes")
    .insert({
      clerk_user_id: userId,
      name,
      category: category || null,
      area: area || null,
      instructions: instructions || null,
      image_url: image_url || null,
      ingredients: ingredients || [],
      is_public: is_public !== false,
    })
    .select()
    .single();

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json(data, { status: 201 });
}
