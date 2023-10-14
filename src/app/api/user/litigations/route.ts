import { emailToId } from "@/functions/emailToId";
import { getTargetUser, getTargetUsers } from "@/functions/getTargetUser";
import { supabase } from "@/functions/supabase";
import { VerifyWithEmail } from "@/functions/verifyToken";
import { Litigation } from "@/interfaces/Profile";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const email = await VerifyWithEmail(request);
  const id = await emailToId(email);
  if (!email || !id) return NextResponse.json({}, { status: 400 });

  const result = await supabase()
    .from("litigations")
    .select("*")
    .eq("user", id);

  const withs = await getTargetUsers(result.data?.map((i) => i.with) || []);
  const witnesses = await getTargetUsers(
    result.data?.map((i) => i.witness || -1) || []
  );

  const litigations: Litigation[] =
    result.data?.map((litigation, idx) => ({
      text: litigation.text,
      with: withs[idx],
      witness: litigation.witness === null ? undefined : witnesses[idx],
      id: litigation.id,
    })) || [];

  return NextResponse.json(litigations);
};

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
