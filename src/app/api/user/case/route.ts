import { supabase } from "@/functions/supabase";
import { trackWithUser } from "@/functions/tracking";
import { VerifyUser } from "@/functions/verifyUser";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const { email, id } = await VerifyUser();
  if (!email || !id) return NextResponse.json({}, { status: 400 });

  const hasMurdererCase = await supabase()
    .from("pendingkills")
    .select()
    .eq("murderer", id)
    .eq("orderdBy", "Murderer")
    .single();

  if (hasMurdererCase.data !== null) {
    return NextResponse.json({ hasCase: true });
  }

  const hasTargetCase = await supabase()
    .from("pendingkills")
    .select()
    .eq("target", id)
    .eq("orderdBy", "Target")
    .single();

  if (hasTargetCase.data !== null) {
    return NextResponse.json({ hasCase: true });
  }

  return NextResponse.json({ hasCase: false });
};

export const DELETE = async (request: NextRequest) => {
  const { email, id } = await VerifyUser();
  if (!email || !id) return NextResponse.json({}, { status: 400 });

  await trackWithUser("Case", id, "Tar bort cases med sig i");

  await supabase()
    .from("pendingkills")
    .delete()
    .eq("murderer", id)
    .eq("orderdBy", "Murderer");
  await supabase()
    .from("pendingkills")
    .delete()
    .eq("target", id)
    .eq("orderdBy", "Target");

  return NextResponse.json({});
};
