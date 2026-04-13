import { createClient as createSupabaseClient } from "@supabase/supabase-js";

export function createClient() {
  // Use the legacy JWT anon key since supabase-js v2 requires JWT format.
  // RLS is disabled so the anon key has full access.
  const key =
    process.env.SUPABASE_ANON_KEY ||
    process.env.SUPABASE_SERVICE_ROLE_KEY!;

  return createSupabaseClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, key);
}
