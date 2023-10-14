import { emailToId } from "@/functions/emailToId";
import { supabase } from "@/functions/supabase";
import { VerifyWithEmail } from "@/functions/verifyToken";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const email = await VerifyWithEmail(request);
  const id = await emailToId(email);
  if (!email || !id) return NextResponse.json({}, { status: 400 });

  const hasMurdererCase = await supabase()
    .from("pendingkills")
    .select()
    .eq("murderer", id)
    .single();

  if (hasMurdererCase.data !== null) {
    return NextResponse.json({ hasCase: true });
  }

  const hasTargetCase = await supabase()
    .from("pendingkills")
    .select()
    .eq("target", id)
    .single();

  if (hasTargetCase.data !== null) {
    return NextResponse.json({ hasCase: true });
  }

  return NextResponse.json({ hasCase: false });
};

export const DELETE = async (request: NextRequest) => {
  const email = await VerifyWithEmail(request);
  const id = await emailToId(email);
  if (!email || !id) return NextResponse.json({}, { status: 400 });

  await supabase().from("pendingkills").delete().eq("murderer", id);
  await supabase().from("pendingkills").delete().eq("target", id);

  return NextResponse.json({});
};
