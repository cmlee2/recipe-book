import { createClient } from "./server";
import { currentUser } from "@clerk/nextjs/server";

export async function ensureProfile(clerkUserId: string) {
  const supabase = createClient();
  const user = await currentUser();

  const displayName =
    user?.firstName && user?.lastName
      ? `${user.firstName} ${user.lastName}`
      : user?.firstName || "Anonymous";
  const imageUrl = user?.imageUrl || null;

  await supabase.from("profiles").upsert(
    {
      clerk_user_id: clerkUserId,
      display_name: displayName,
      image_url: imageUrl,
    },
    { onConflict: "clerk_user_id" }
  );
}
