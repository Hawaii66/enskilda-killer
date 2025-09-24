import { Database } from "@/interfaces/database";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

const configureSupabase = () => {
  _supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
  );
  return _supabase;
};
let _supabase: SupabaseClient<Database> | null = null;

export const supabase = () => {
  if (_supabase) {
    console.log(
      "reusing supabase - ---------------------------------------------------"
    );
    return _supabase;
  }

  return configureSupabase();
};
