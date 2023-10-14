import { emailToId } from "@/functions/emailToId";
import { supabase } from "@/functions/supabase";
import { VerifyWithEmail } from "@/functions/verifyToken";
import { Kills } from "@/interfaces/Profile";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const email = await VerifyWithEmail(request);
  const id = await emailToId(email);
  if (!email || !id) return NextResponse.json({}, { status: 400 });

  const kills: Kills = await request.json();

  await supabase()
    .from("kills")
    .delete()
    .eq("murderer", id)
    .not("target", "in", `(${kills.map((i) => i.target.id)})`);

  return NextResponse.json({});
};
