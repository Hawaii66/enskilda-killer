import { supabase } from "./supabase";

export const emailToId = async (email: string | undefined) => {
  if (!email) return undefined;

  const id = await supabase()
    .from("users")
    .select("id")
    .eq("email", email)
    .single();

  return id.data?.id;
};
