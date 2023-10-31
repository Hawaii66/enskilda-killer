import { checkIsAdmin } from "@/functions/admin/checkIsAdmin";
import { supabase } from "@/functions/supabase";
import { ConstantKey } from "@/interfaces/Constants";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const isAdmin = await checkIsAdmin(request);
  if (!isAdmin) return NextResponse.json({}, { status: 404 });

  const groups: string[] = await request.json();

  const key: ConstantKey = "Groups";
  await supabase()
    .from("constants")
    .update({ data: JSON.stringify(groups) })
    .eq("query", key);

  return NextResponse.json({});
};
