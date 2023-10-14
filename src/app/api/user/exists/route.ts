import { emailToId } from "@/functions/emailToId";
import { supabase } from "@/functions/supabase";
import { VerifyWithEmail } from "@/functions/verifyToken";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const email = await VerifyWithEmail(request);
  const id = await emailToId(email);

  if (id === undefined) {
    ("No user");
    return NextResponse.json({ exists: false });
  }

  return NextResponse.json({ exists: true });
};
