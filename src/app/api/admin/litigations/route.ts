import { emailToId } from "@/functions/emailToId";
import { supabase } from "@/functions/supabase";
import { VerifyWithEmail } from "@/functions/verifyToken";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (request: NextRequest) => {
  const email = await VerifyWithEmail(request);
  const id = await emailToId(email);
  if (!email || !id) return NextResponse.json({}, { status: 400 });

  const url = new URL(request.url);
  const litigationId = parseInt(url.searchParams.get("litigation") || "-1");

  if (isNaN(litigationId) || litigationId === -1)
    return NextResponse.json({}, { status: 400 });

  await supabase().from("litigations").delete().eq("id", litigationId);

  return NextResponse.json({});
};
