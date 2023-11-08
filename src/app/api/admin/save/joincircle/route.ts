import { checkIsAdmin } from "@/functions/admin/checkIsAdmin";
import { supabase } from "@/functions/supabase";
import { ConstantKey } from "@/interfaces/Constants";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const isAdmin = await checkIsAdmin(request);
  if (!isAdmin) return NextResponse.json({}, { status: 404 });

  const { circle }: { circle: number | undefined } = await request.json();

  const key: ConstantKey = "JoinCircle";
  await supabase()
    .from("constants")
    .update({
      data: circle === undefined ? "-1" : circle.toString(),
    })
    .eq("query", key);

  return NextResponse.json({}, { status: 200 });
};
