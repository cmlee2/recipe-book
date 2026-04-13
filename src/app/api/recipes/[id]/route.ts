import { auth } from "@clerk/nextjs/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = createClient();

  const { data, error } = await supabase
    .from("recipes")
    .select("*, profiles(display_name, image_url)")
    .eq("id", id)
    .single();

  if (error || !data) {
    return Response.json({ error: "Recipe not found" }, { status: 404 });
  }

  return Response.json(data);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { userId } = await auth();
  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();
  const { name, category, area, instructions, image_url, ingredients, is_public } = body;

  const supabase = createClient();
  const { data, error } = await supabase
    .from("recipes")
    .update({
      name,
      category: category || null,
      area: area || null,
      instructions: instructions || null,
      image_url: image_url || null,
      ingredients: ingredients || [],
      is_public: is_public !== false,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .eq("clerk_user_id", userId)
    .select()
    .single();

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json(data);
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { userId } = await auth();
  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const supabase = createClient();

  const { error } = await supabase
    .from("recipes")
    .delete()
    .eq("id", id)
    .eq("clerk_user_id", userId);

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return new Response(null, { status: 204 });
}
