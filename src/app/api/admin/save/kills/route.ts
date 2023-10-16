import { emailToId } from "@/functions/emailToId";
import { supabase } from "@/functions/supabase";
import { VerifyWithEmail } from "@/functions/verifyToken";
import { Kills } from "@/interfaces/Profile";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const email = await VerifyWithEmail(request);
  const id = await emailToId(email);
  if (!email || !id) return NextResponse.json({}, { status: 400 });

  const body: { kills: Kills; user: number } = await request.json();

  await supabase()
    .from("kills")
    .delete()
    .eq("murderer", body.user)
    .not("target", "in", `(${body.kills.map((i) => i.target.id)})`);

  return NextResponse.json({});
};
