import { checkIsAdmin } from "@/functions/admin/checkIsAdmin";
import { supabase } from "@/functions/supabase";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (request: NextRequest) => {
  const isAdmin = await checkIsAdmin(request);
  if (!isAdmin) return NextResponse.json({}, { status: 404 });

  const url = new URL(request.url);
  const litigationId = parseInt(url.searchParams.get("litigation") || "-1");

  if (isNaN(litigationId) || litigationId === -1)
    return NextResponse.json({}, { status: 400 });

  await supabase().from("litigations").delete().eq("id", litigationId);

  return NextResponse.json({});
};

export const POST = async (request: NextRequest) => {
  const isAdmin = await checkIsAdmin(request);
  if (!isAdmin) return NextResponse.json({}, { status: 404 });

  const {
    helper,
    id,
    investigator,
  }: { id: number; helper?: string; investigator?: string } =
    await request.json();

  const admins = await supabase().from("admins").select("email,id");

  const toUpdate = {
    helper: helper
      ? admins.data?.find((i) => i.email === helper)?.id || null
      : null,
    investigator: investigator
      ? admins.data?.find((i) => i.email === investigator)?.id || null
      : null,
    id: id,
  };

  const t = await supabase()
    .from("litigations")
    .update(toUpdate)
    .eq("id", id)
    .select("*");

  return NextResponse.json({});
};
