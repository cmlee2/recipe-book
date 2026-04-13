import { auth } from "@clerk/nextjs/server";
import { createClient } from "@/lib/supabase/server";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ mealId: string }> }
) {
  const { userId } = await auth();
  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { mealId } = await params;
  const supabase = createClient();

  const { error } = await supabase
    .from("favorites")
    .delete()
    .eq("clerk_user_id", userId)
    .eq("meal_id", mealId);

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return new Response(null, { status: 204 });
}
