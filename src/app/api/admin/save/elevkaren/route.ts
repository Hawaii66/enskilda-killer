import { emailToId } from "@/functions/emailToId";
import { supabase } from "@/functions/supabase";
import { VerifyWithEmail } from "@/functions/verifyToken";
import { ConstantKey } from "@/interfaces/Constants";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const email = await VerifyWithEmail(request);
  const id = await emailToId(email);
  if (!email || !id) return NextResponse.json({}, { status: 400 });

  const elevkaren: string = await request.json();

  const key: ConstantKey = "Enskildakaren";

  await supabase()
    .from("constants")
    .update({ data: elevkaren })
    .eq("query", key);

  return NextResponse.json({});
};
