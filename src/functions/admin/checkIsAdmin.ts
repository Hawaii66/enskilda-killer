import { NextRequest } from "next/server";
import { supabase } from "../supabase";
import { VerifyEmail } from "../verifyUser";

export const checkIsAdmin = async (request: NextRequest) => {
  const email = await VerifyEmail();
  if (email === undefined) return false;

  const { data } = await supabase()
    .from("admins")
    .select("*")
    .eq("email", email)
    .single();
  if (data === null) return false;

  return true;
};
