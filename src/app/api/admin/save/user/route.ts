import { checkIsAdmin } from "@/functions/admin/checkIsAdmin";
import { supabase } from "@/functions/supabase";
import { User } from "@/interfaces/User";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const isAdmin = await checkIsAdmin(request);
  if (!isAdmin) return NextResponse.json({}, { status: 404 });

  const user: User = await request.json();

  await supabase()
    .from("users")
    .update({
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      group: user.group,
      phone: user.phone,
      isMember: user.isMember,
      show_murderer: user.showMurderer,
    })
    .eq("id", user.id);

  if (user.target) {
    const hasTarget = await supabase()
      .from("targets")
      .select("*")
      .eq("murderer", user.id)
      .single();
    if (hasTarget.data) {
      await supabase()
        .from("targets")
        .update({
          target: user.target.id,
        })
        .eq("murderer", user.id);
    } else {
      await supabase().from("targets").insert({
        murderer: user.id,
        target: user.target.id,
      });
    }
  } else {
    await supabase().from("targets").delete().eq("murderer", user.id);
  }

  if (user.circle) {
    const inActiveCircle = await supabase()
      .from("usersincircle")
      .select("id")
      .eq("user", user.id)
      .single();
    if (inActiveCircle.data) {
      await supabase()
        .from("usersincircle")
        .update({ circle: user.circle.id })
        .eq("id", inActiveCircle.data.id);
    } else {
      await supabase()
        .from("usersincircle")
        .insert({ circle: user.circle.id, user: user.id });
    }
  } else {
    await supabase().from("usersincircle").delete().eq("user", user.id);
  }

  return NextResponse.json({});
};
