import { emailToId } from "@/functions/emailToId";
import { supabase } from "@/functions/supabase";
import { VerifyWithEmail } from "@/functions/verifyToken";
import { Circle } from "@/interfaces/Circle";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const email = await VerifyWithEmail(request);
  const id = await emailToId(email);
  if (!email || !id) return NextResponse.json({}, { status: 400 });

  var admins: string[] = await request.json();

  const e = await supabase().from("admins").delete().neq("id", -1);
  await supabase()
    .from("admins")
    .insert(admins.map((i) => ({ email: i })));

  console.log(e, admins);

  return NextResponse.json({});
};
