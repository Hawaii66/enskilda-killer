import { checkIsAdmin } from "@/functions/admin/checkIsAdmin";
import { supabase } from "@/functions/supabase";
import { Kills } from "@/interfaces/Profile";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const isAdmin = await checkIsAdmin(request);
  if (!isAdmin) return NextResponse.json({}, { status: 404 });

  const body: { kills: Kills; user: number } = await request.json();

  await supabase()
    .from("kills")
    .delete()
    .eq("murderer", body.user)
    .not("target", "in", `(${body.kills.map((i) => i.target.id)})`);

  return NextResponse.json({});
};
