import { checkIsAdmin } from "@/functions/admin/checkIsAdmin";
import { supabase } from "@/functions/supabase";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const isAdmin = await checkIsAdmin(request);
  if (!isAdmin) return NextResponse.json({}, { status: 404 });

  var admins: { email: string; name: string }[] = await request.json();

  await supabase().from("admins").delete().neq("id", -1);
  await supabase()
    .from("admins")
    .insert(admins.map((i) => ({ email: i.email, name: i.name })));

  return NextResponse.json({});
};
