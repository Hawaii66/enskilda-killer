import { NextRequest } from "next/server";
import { VerifyWithEmail } from "../verifyToken";
import { supabase } from "../supabase";

export const checkIsAdmin = async (request: NextRequest) => {
  const email = await VerifyWithEmail(request);
  if (email === undefined) return false;

  const { data } = await supabase()
    .from("admins")
    .select("*")
    .eq("email", email)
    .single();
  if (data === null) return false;

  return true;
};
