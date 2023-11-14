import { checkIsAdmin } from "@/functions/admin/checkIsAdmin";
import { supabase } from "@/functions/supabase";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const isAdmin = await checkIsAdmin(request);
  if (!isAdmin) return NextResponse.json({}, { status: 404 });

  const { data: usersincircle } = await supabase()
    .from("usersincircle")
    .select("user");

  const { data: targets } = await supabase()
    .from("targets")
    .select("murderer,target");

  if (!usersincircle || !targets) {
    return NextResponse.json({ status: "Missing rows" }, { status: 500 });
  }

  const murderSet: Set<number> = new Set();
  const targetSet: Set<number> = new Set();

  targets.forEach((target) => {
    murderSet.add(target.murderer);
    targetSet.add(target.target);
  });

  const problems: Set<number> = new Set();

  usersincircle.map((user) => {
    if (!targetSet.has(user.user)) {
      problems.add(user.user);
    } else if (!murderSet.has(user.user)) {
      problems.add(user.user);
    }
  });

  return NextResponse.json(Array.from(problems));
};
