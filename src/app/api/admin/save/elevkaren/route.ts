import { checkIsAdmin } from "@/functions/admin/checkIsAdmin";
import { emailToId } from "@/functions/emailToId";
import { supabase } from "@/functions/supabase";
import { VerifyWithEmail } from "@/functions/verifyToken";
import { ConstantKey } from "@/interfaces/Constants";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const isAdmin = await checkIsAdmin(request);
  if (!isAdmin) return NextResponse.json({}, { status: 404 });

  const elevkaren: string = await request.json();

  const key: ConstantKey = "Enskildakaren";

  await supabase()
    .from("constants")
    .update({ data: elevkaren })
    .eq("query", key);

  return NextResponse.json({});
};
