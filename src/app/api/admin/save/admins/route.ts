import { checkIsAdmin } from "@/functions/admin/checkIsAdmin";
import { emailToId } from "@/functions/emailToId";
import { supabase } from "@/functions/supabase";
import { VerifyWithEmail } from "@/functions/verifyToken";
import { Circle } from "@/interfaces/Circle";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const isAdmin = await checkIsAdmin(request);
  if (!isAdmin) return NextResponse.json({}, { status: 404 });

  var admins: string[] = await request.json();

  const e = await supabase().from("admins").delete().neq("id", -1);
  await supabase()
    .from("admins")
    .insert(admins.map((i) => ({ email: i })));

  console.log(e, admins);

  return NextResponse.json({});
};
