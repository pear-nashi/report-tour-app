import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export function createSupabaseServerClient(): SupabaseClient {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Supabase environment variables are missing. Copy .env.local.example to .env.local and set your project credentials.",
    );
  }

  return createClient(supabaseUrl, supabaseAnonKey);
}
