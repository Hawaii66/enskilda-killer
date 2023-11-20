import { getTargetUsers } from "@/functions/getTargetUser";
import { supabase } from "@/functions/supabase";
import { trackWithUser } from "@/functions/tracking";
import { VerifyUser } from "@/functions/verifyUser";
import { Litigation } from "@/interfaces/Profile";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const { email, id } = await VerifyUser();
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
      with: withs[idx] ?? { firstname: "", group: "", id: -1, lastname: "" },
      witness: litigation.witness === null ? undefined : witnesses[idx],
      id: litigation.id,
      reason: litigation.reason,
    })) || [];

  return NextResponse.json(litigations);
};

export const DELETE = async (request: NextRequest) => {
  const { email, id } = await VerifyUser();
  if (!email || !id) return NextResponse.json({}, { status: 400 });

  const url = new URL(request.url);
  const litigationId = parseInt(url.searchParams.get("litigation") || "-1");

  if (isNaN(litigationId) || litigationId === -1)
    return NextResponse.json({}, { status: 400 });

  await supabase().from("litigations").delete().eq("id", litigationId);

  return NextResponse.json({});
};

export const POST = async (request: NextRequest) => {
  const { email, id } = await VerifyUser();
  if (!email || !id) return NextResponse.json({}, { status: 400 });

  const data: {
    text: string;
    with: number;
    witness: number | undefined;
    reason: string;
  } = await request.json();

  await trackWithUser("Tvistemål", id, data);

  await supabase().from("litigations").insert({
    text: data.text,
    user: id,
    with: data.with,
    witness: data.witness,
    reason: data.reason,
  });

  return NextResponse.json({});
};
